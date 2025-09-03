import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";

function KickOnLifecycle() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const id = requestAnimationFrame(() => invalidate());
    const onResize = () => invalidate();
    const onVisibility = () => { if (!document.hidden) invalidate(); };
    window.addEventListener("resize", onResize, { passive: true } as any);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize as any);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [invalidate]);
  return null;
}

export default function InnerThreeScene() {
  const [low, setLow] = useState(false);
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.15]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true, stencil: false, depth: true, premultipliedAlpha: false }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      onCreated={({ invalidate }) => requestAnimationFrame(() => invalidate())}
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <AdaptiveDpr pixelated={low} />
      <KickOnLifecycle />

      {/* Luces básicas */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 8]} intensity={0.9} castShadow />
      <directionalLight position={[-4, -2, -6]} intensity={0.3} />

      {/** Mesh retirado para mantener el look original */}
    </Canvas>
  );
}
