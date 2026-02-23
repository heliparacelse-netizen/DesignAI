"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

const ViewerScene = lazy(() => import("@/components/ViewerScene"));

interface ThreeDPreviewProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

export default function ThreeDPreview({
  autoRotate,
  onToggleAutoRotate,
}: ThreeDPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleScreenshot = () => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    setSnapshotUrl(dataUrl);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "designai-room.png";
    link.click();
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-end gap-3">
        <button
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-electric hover:text-white hover:shadow-glow"
          type="button"
        >
          Orbit
        </button>
        <button
          onClick={onToggleAutoRotate}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-electric hover:text-white hover:shadow-glow"
          type="button"
        >
          {autoRotate ? "Auto-rotation on" : "Auto-rotation off"}
        </button>
        <button
          onClick={handleFullscreen}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-electric hover:text-white hover:shadow-glow"
          type="button"
        >
          {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        </button>
        <button
          onClick={handleScreenshot}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-electric hover:text-white hover:shadow-glow"
          type="button"
        >
          Screenshot
        </button>
      </div>

      <div
        ref={containerRef}
        className={`relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f19] transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [7.5, 5.2, 8.8], fov: 48 }}
          onCreated={() => setIsReady(true)}
        >
          <Suspense fallback={null}>
            <ViewerScene autoRotate={autoRotate} />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        <div className="absolute bottom-4 right-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
          Orbit · Zoom · Pan
        </div>
      </div>

      {snapshotUrl ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
          Screenshot saved locally. Preview ready below.
          <img
            src={snapshotUrl}
            alt="DesignAI room snapshot"
            className="mt-3 rounded-2xl border border-white/10"
          />
        </div>
      ) : null}
    </div>
  );
}
