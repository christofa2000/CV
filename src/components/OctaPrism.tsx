import React, { useEffect, useMemo, useRef, useState } from "react";

type IconItem = { label: string; url: string };

interface OctaPrismProps {
  size?: number;
  radius?: number;
  autoRotate?: boolean;
  showLabels?: boolean;
  icons?: IconItem[];
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const DEFAULT_ICONS: IconItem[] = [
  { label: "React", url: "https://cdn.simpleicons.org/react/FFFFFF" },
  { label: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { label: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/FFFFFF" },
  {
    label: "Tailwind CSS",
    url: "https://cdn.simpleicons.org/tailwindcss/FFFFFF",
  },
  { label: "Material UI", url: "https://cdn.simpleicons.org/mui/FFFFFF" },
  { label: "Bootstrap", url: "https://cdn.simpleicons.org/bootstrap/FFFFFF" },
  { label: "Zustand", url: "https://cdn.simpleicons.org/zustand/FFFFFF" },
  {
    label: "React Query",
    url: "https://cdn.simpleicons.org/reactquery/FFFFFF",
  },
];

export default function OctaPrism({
  size = 240,
  radius,
  autoRotate = true,
  showLabels = true,
  icons = DEFAULT_ICONS,
}: OctaPrismProps) {
  if (icons.length !== 8) {
    icons = DEFAULT_ICONS;
  }

  const R = radius ?? Math.max(120, size * 0.45);
  const panelW = 2 * R * Math.tan(Math.PI / 8);
  const panelH = size;

  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const rotRef = useRef<{ x: number; y: number }>({ x: -10, y: 20 });
  const baseRotRef = useRef(rotRef.current);
  const zoomRef = useRef(1);
  const playingRef = useRef<boolean>(autoRotate);
  const reducedRef = useRef<boolean>(false);
  const visibleRef = useRef<boolean>(true);
  const rafRef = useRef<number | null>(null);
  const cameraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    reducedRef.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    playingRef.current = autoRotate && !reducedRef.current;

    const apply = () => {
      const el = cameraRef.current;
      if (!el) return;
      const { x, y } = rotRef.current;
      const z = zoomRef.current;
      el.style.transform = `scale(${z}) rotateX(${x}deg) rotateY(${y}deg)`;
    };

    // Establece transform inicial para tests/JSDOM y primera pintura
    apply();

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(33, now - last);
      last = now;
      if (visibleRef.current && playingRef.current && !dragging) {
        // rotación suave sin tocar el estado de React
        rotRef.current = { x: rotRef.current.x, y: rotRef.current.y + 0.35 * (dt / 16) };
        apply();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onVis = () => {
      visibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [autoRotate, dragging]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    baseRotRef.current = { ...rotRef.current };
    draggingRef.current = true;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    const speed = 0.35;
    rotRef.current = {
      x: clamp(baseRotRef.current.x - dy * speed, -80, 80),
      y: baseRotRef.current.y + dx * speed,
    };
    // aplicar sin re-render
    if (cameraRef.current) {
      const { x, y } = rotRef.current;
      const z = zoomRef.current;
      cameraRef.current.style.transform = `scale(${z}) rotateX(${x}deg) rotateY(${y}deg)`;
    }
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    draggingRef.current = false;
    setDragging(false);
  };
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    zoomRef.current = clamp(zoomRef.current + (e.deltaY > 0 ? -0.08 : 0.08), 0.6, 2);
    if (cameraRef.current) {
      const { x, y } = rotRef.current;
      const z = zoomRef.current;
      cameraRef.current.style.transform = `scale(${z}) rotateX(${x}deg) rotateY(${y}deg)`;
    }
  };

  const faces = useMemo(
    () => new Array(8).fill(0).map((_, i) => ({ rotY: i * 45, translateZ: R })),
    [R]
  );

  return (
    <div
      className="octa-root dark transparent"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onWheel={onWheel}
    >
      <div className="scene" style={{ perspective: `${900}px` }}>
        <div
          className="camera"
          ref={cameraRef}
          data-dragging={dragging ? "1" : "0"}
        >
          <div className="ring" style={{ width: panelW, height: panelH }}>
            {faces.map((f, i) => (
              <div
                key={i}
                className="face"
                style={{
                  width: panelW,
                  height: panelH,
                  transform: `rotateY(${f.rotY}deg) translateZ(${f.translateZ}px)`,
                }}
              >
                <img
                  src={icons[i].url}
                  alt={icons[i].label}
                  className="icon"
                  draggable={false}
                />
                {showLabels && <span className="flabel">{icons[i].label}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .octa-root { position: relative; width: 100%; min-height: 420px; display: grid; place-items: center; user-select: none; padding: 16px; box-sizing: border-box; cursor: grab; }
        .octa-root.dark.transparent { background: transparent; }
        .scene { width: 100%; max-width: 880px; height: 360px; display: grid; place-items: center; }
        .camera { transform-style: preserve-3d; transition: transform 220ms ease; will-change: transform; }
        .camera[data-dragging="1"] { transition: none; cursor: grabbing; }
        .ring { position: relative; transform-style: preserve-3d; }
        .face { position: absolute; top: 50%; left: 50%; transform-style: preserve-3d; translate: -50% -50%; display: grid; place-items: center; border-radius: 14px; box-shadow: inset 0 0 22px rgba(255,255,255,0.08), 0 10px 26px rgba(0,0,0,0.45); }
        .icon { width: 42%; max-width: 160px; aspect-ratio: 1/1; object-fit: contain; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }
        .flabel { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font: 600 12px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial; color: rgba(255,255,255,0.9); text-shadow: 0 1px 8px rgba(0,0,0,0.45); }
        @media (max-width: 520px) { .scene { height: 320px; } .icon { width: 48%; } }
      `}</style>
    </div>
  );
}
