import React, { useEffect, useRef } from "react";

export type WarpProps = {
  /** 0.2 – 1.2 sugerido. Más chico = más lento */
  speed?: number;
  /** densidad por px^2. 1/2000 = menos, 1/1200 = más */
  density?: number;
  /** parallax con el mouse */
  interactive?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

type WarpStar = {
  x: number; // -1..1
  y: number; // -1..1
  z: number; // profundidad 0..1
  hue: number; // 0 → blanco, >0 → tinte
  brightness: number; // 0..1
};

export default function WarpSpeedBackground({
  speed = 0.3, // 🐢 más lento por defecto
  density = 1 / 1600, // densidad moderada
  interactive = true,
  style,
  className,
}: WarpProps) {
  const canvasRef = useCanvas2D();
  const animRef = useRef<number | null>(null);
  const starsRef = useRef<WarpStar[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const reducedRef = useRef<boolean>(false);
  const runningRef = useRef<boolean>(true);
  const visibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    reducedRef.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const resetStar = (s: WarpStar) => {
      s.x = (Math.random() * 2 - 1) * 0.6;
      s.y = (Math.random() * 2 - 1) * 0.6;
      s.z = Math.random() * 0.9 + 0.1;
      s.hue = Math.random() < 0.12 ? 200 + Math.random() * 80 : 0; // 12% celestes
      s.brightness = 0.75 + Math.random() * 0.25;
    };

    const init = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const count = Math.max(220, Math.floor(width * height * density));
      const arr: WarpStar[] = new Array(count).fill(0).map(() => ({
        x: 0,
        y: 0,
        z: 1,
        hue: 0,
        brightness: 1,
      }));
      for (const s of arr) resetStar(s);
      starsRef.current = arr;
    };

    init();

    let last = performance.now();
    const loop = (now: number) => {
      if (!runningRef.current || !visibleRef.current) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(33, now - last);
      last = now;

      const { width, height } = canvas.getBoundingClientRect();
      const cx = width * 0.5;
      const cy = height * 0.5;

      const mx =
        interactive && mouseRef.current.active
          ? (mouseRef.current.x - cx) * 0.05
          : 0;
      const my =
        interactive && mouseRef.current.active
          ? (mouseRef.current.y - cy) * 0.05
          : 0;

      // Fondo
      ctx.fillStyle = "#010109";
      ctx.fillRect(0, 0, width, height);

      // Proyección y estelas
      const scale = Math.min(width, height) * 0.6;
      const s = Math.max(0, speed); // permite 0.00+
      const step = s * (dt * 0.0012); // más lento que 0.0017
      // más lento que 0.0022

      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.globalCompositeOperation = "lighter";

      for (const star of starsRef.current) {
        if (!reducedRef.current) star.z -= step;
        if (star.z <= 0.05) {
          resetStar(star);
          continue;
        }

        const sx = cx + mx + (star.x / star.z) * scale;
        const sy = cy + my + (star.y / star.z) * scale;

        const pz = star.z + (reducedRef.current ? 0.0001 : step * 1.3);
        const psx = cx + mx + (star.x / pz) * scale;
        const psy = cy + my + (star.y / pz) * scale;

        if (sx < -50 || sx > width + 50 || sy < -50 || sy > height + 50) {
          resetStar(star);
          continue;
        }

        const alpha = Math.max(0.2, 1 - star.z);
        const lenBoost = Math.max(0.9, 1.4 - star.z * 1.2);

        ctx.strokeStyle = star.hue
          ? `hsla(${star.hue},90%,${70 * star.brightness}%,${alpha})`
          : `rgba(255,255,255,${alpha})`;

        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx + (sx - psx) * lenBoost, sy + (sy - psy) * lenBoost);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      const vignette = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(width, height) * 0.25,
        cx,
        cy,
        Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", onMove, { passive: true } as any);
    canvas.addEventListener("mouseleave", onLeave, { passive: true } as any);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    // Pausar cuando la pestaña no está visible
    const onVisibility = () => {
      runningRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pausar cuando el canvas sale de viewport
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibleRef.current = e.isIntersecting;
        }
      },
      { root: null, threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", onMove as any);
      canvas.removeEventListener("mouseleave", onLeave as any);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [interactive, density, speed]);

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

/** Canvas 2D escalado a DPR y responsive */
function useCanvas2D() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return ref;
}
