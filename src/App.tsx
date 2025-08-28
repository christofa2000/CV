import { useEffect, useMemo, useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Body from "./layout/Body";
import WarpSpeedBackground from "./components/WarpSpeedBackground";
// 👈 nuevo import

// Hook: animación escalonada con soporte reduced-motion
const useAnimatedSections = (count: number) => {
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    Array(count).fill(false)
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setLoaded(Array(count).fill(true));
      return;
    }

    const timers = Array.from({ length: count }).map((_, index) =>
      setTimeout(() => {
        setLoaded((prev) => {
          if (prev[index]) return prev;
          const next = prev.slice();
          next[index] = true;
          return next;
        });
      }, index * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [count]);

  return loaded;
};

function App() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sections = useMemo(
    () => [
      { id: "about", node: <AboutMe /> },
      { id: "skills", node: <Body /> },
      { id: "projects", node: <Projects /> },
      { id: "contact", node: <Contact /> },
    ],
    []
  );

  const loadedSections = useAnimatedSections(sections.length);

  return (
    <>
      {/* Fondo hipervelocidad detrás de todo */}
      <WarpSpeedBackground
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
        speed={0.05} // aún más lento
        density={1 / 1900} // subí a 1/1400 si querés más partículas
      />

      {/* Tu contenido por encima */}
      <Box
        sx={{
          minHeight: "100vh",
          pb: 4,
          background: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Header />
          <Box component="main">
            {sections.map((section, index) => {
              const inProp = loadedSections[index];
              return (
                <Fade
                  in={inProp}
                  timeout={prefersReduced ? 250 : 1000}
                  key={section.id}
                >
                  <div>{section.node}</div>
                </Fade>
              );
            })}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
