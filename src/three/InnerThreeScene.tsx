import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

function OctaPrismR3F() {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [hover, setHover] = useState(false);
  const inViewRef = useRef(true);

  useEffect(() => {
    const target = (gl as any)?.domElement as HTMLElement | undefined;
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) inViewRef.current = e.isIntersecting;
    });
    io.observe(target);
    return () => io.disconnect();
  }, [gl]);

  const geom = useMemo(() => new THREE.OctahedronGeometry(1.2, 0), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.15, roughness: 0.35 }), []);
  useEffect(() => () => { geom.dispose(); mat.dispose(); }, [geom, mat]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!inViewRef.current && !hover) return;
    const dt = Math.min(delta, 1 / 30);
    if (hover) {
      meshRef.current.rotation.y += 0.8 * dt;
      meshRef.current.rotation.x += 0.4 * dt;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geom}
      material={mat}
      onPointerOver={() => { setHover(true); invalidate(); }}
      onPointerOut={() => { setHover(false); invalidate(); }}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
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
