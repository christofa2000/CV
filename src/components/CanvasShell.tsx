import { Suspense, lazy } from "react";

const InnerThreeScene = lazy(() => import("../three/InnerThreeScene"));

export default function CanvasShell() {
  return (
    <Suspense fallback={<div style={{ height: 360 }} />}> 
      <InnerThreeScene />
    </Suspense>
  );
}
