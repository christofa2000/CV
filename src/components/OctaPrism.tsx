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
  {
    label: "Zustand",
    url: "data:image/svg+xml,%3csvg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M139.083 256.001C139.083 188.634 193.249 134.468 260.616 134.468C327.983 134.468 382.149 188.634 382.149 256.001C382.149 323.368 327.983 377.534 260.616 377.534C193.249 377.534 139.083 323.368 139.083 256.001Z' stroke='white' stroke-width='20'/%3e%3cpath d='M260.615 256.001C260.615 222.317 287.481 195.451 321.165 195.451' stroke='white' stroke-width='20'/%3e%3c/svg%3e",
  },
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

  const [rot, setRot] = useState<{ x: number; y: number }>({ x: -10, y: 20 });
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(autoRotate);
  const [dragging, setDragging] = useState(false);

  const startRef = useRef<{ x: number; y: number } | null>(null);
  const baseRotRef = useRef(rot);

  useEffect(() => {
    if (!playing || dragging) return;
    const id = window.setInterval(
      () => setRot((r) => ({ x: r.x, y: r.y + 0.35 })),
      16
    );
    return () => window.clearInterval(id);
  }, [playing, dragging]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    baseRotRef.current = { ...rot };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    const speed = 0.35;
    setRot({
      x: clamp(baseRotRef.current.x - dy * speed, -80, 80),
      y: baseRotRef.current.y + dx * speed,
    });
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setDragging(false);
  };
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) =>
    setZoom(clamp(zoom + (e.deltaY > 0 ? -0.08 : 0.08), 0.6, 2));

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
          style={{
            transform: `scale(${zoom}) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          }}
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
        .octa-root { position: relative; width: 100%; min-height: 420px; display: grid; place-items: center; user-select: none; padding: 16px; box-sizing: border-box; cursor: ${
          dragging ? "grabbing" : "grab"
        }; }
        .octa-root.dark.transparent { background: transparent; }
        .scene { width: 100%; max-width: 880px; height: 360px; display: grid; place-items: center; }
        .camera { transform-style: preserve-3d; transition: transform ${
          dragging ? 0 : 220
        }ms ease; }
        .ring { position: relative; transform-style: preserve-3d; }
        .face { position: absolute; top: 50%; left: 50%; transform-style: preserve-3d; translate: -50% -50%; display: grid; place-items: center; border-radius: 14px; box-shadow: inset 0 0 22px rgba(255,255,255,0.08), 0 10px 26px rgba(0,0,0,0.45); }
        .icon { width: 42%; max-width: 160px; aspect-ratio: 1/1; object-fit: contain; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45)); }
        .flabel { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font: 600 12px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial; color: rgba(255,255,255,0.9); text-shadow: 0 1px 8px rgba(0,0,0,0.45); }
        @media (max-width: 520px) { .scene { height: 320px; } .icon { width: 48%; } }
      `}</style>
    </div>
  );
}
