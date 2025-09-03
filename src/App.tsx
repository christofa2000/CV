import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Box, Container, Fade } from "@mui/material";
import Header from "./components/Header";
import { LanguageProvider } from "./LanguageContext";

// Carga diferida de secciones pesadas para reducir JS inicial
const AboutMe = lazy(() => import("./components/AboutMe"));
const Body = lazy(() => import("./layout/Body"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const WarpSpeedBackground = lazy(() => import("./components/WarpSpeedBackground"));

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

  // Prefetch de chunks diferidos cuando el hilo esté libre
  useEffect(() => {
    const idle = (cb: () => void) =>
      (window as any).requestIdleCallback ? (window as any).requestIdleCallback(cb) : setTimeout(cb, 150);
    idle(() => {
      import('./components/Projects');
      import('./layout/Body');
      import('./components/Contact');
      import('./components/AboutMe');
    });
  }, []);

  return (
    <LanguageProvider>
      {/* Fondo hipervelocidad detrás de todo */}
      <Suspense fallback={null}>
        <WarpSpeedBackground
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
          speed={0.05}
          density={1 / 1900}
        />
      </Suspense>

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
            <Suspense fallback={<div />}> {/* Fallback mínimo para evitar CLS */}
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
            </Suspense>
          </Box>
        </Container>
      </Box>
    </LanguageProvider>
  );
}

export default App;
