import { Box } from "@mui/material";
import Skills from "../components/Skills";
import OctaPrism from "../components/OctaPrism";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const CanvasShell = lazy(() => import("../components/CanvasShell"));

function ConditionalCanvas() {
  const [enabled, setEnabled] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const isDesktop = window.matchMedia?.("(min-width: 900px)").matches ?? true;
    if (prefersReduced || !isDesktop) {
      setEnabled(false);
      return;
    }
    const el = hostRef.current ?? document.body;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setEnabled(true);
      }
    }, { root: null, threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} style={{ position: "absolute", inset: 0 }}>
      {enabled && (
        <Suspense fallback={null}>
          <CanvasShell />
        </Suspense>
      )}
    </div>
  );
}

// Idle prefetch for heavy routes/chunks
const onIdle = (cb: () => void) =>
  "requestIdleCallback" in window
    ? (window as any).requestIdleCallback(cb, { timeout: 2000 })
    : setTimeout(cb, 1200);

// Prefetch Projects and r3f scene in idle time
useEffect(() => {
  onIdle(() => import("../components/Projects"));
  onIdle(() => import("../three/InnerThreeScene"));
}, []);

export default function Body() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: 3,
        width: "100%",
        background: "transparent",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
          gap: { xs: 3, md: 3 },
          alignItems: "start",
          background: "transparent",
          position: "relative",
        }}
      >
        {/** Carga condicional del Canvas solo en desktop, visible y sin reduced-motion */}
        <ConditionalCanvas />
        <OctaPrism />
        <Skills />
      </Box>
    </Box>
  );
}
