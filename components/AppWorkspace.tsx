"use client";

import { useMemo, useState } from "react";
import { roomTypes, styleOptions } from "@/data/content";
import ThreeViewer from "@/components/ThreeViewer";

const styleLabels = styleOptions.map((style) => style.toLowerCase());

export default function AppWorkspace() {
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [selectedStyle, setSelectedStyle] = useState(styleLabels[0]);
  const [autoRotate, setAutoRotate] = useState(true);

  const activeStyleLabel = useMemo(() => {
    const index = styleLabels.indexOf(selectedStyle);
    return styleOptions[index] ?? styleOptions[0];
  }, [selectedStyle]);

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="flex">
        <aside className="h-screen w-72 shrink-0 overflow-y-auto border-r border-white/10 bg-white/5 p-6 backdrop-blur space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Room type selection</p>
            <div className="grid grid-cols-2 gap-2">
              {roomTypes.map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`rounded-xl px-3 py-2 text-left text-xs transition ${
                    selectedRoom === room
                      ? "bg-white text-midnight"
                      : "border border-white/20 bg-white/5 text-white/75 hover:text-white"
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Style selection</p>
            <div className="space-y-2">
              {styleLabels.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm capitalize transition ${
                    selectedStyle === style
                      ? "border-electric bg-electric/20 text-white"
                      : "border-white/20 bg-white/5 text-white/75 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">Active style indicator</p>
            <p className="mt-2 text-lg font-medium">{activeStyleLabel}</p>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 font-semibold">
                  D
                </div>
                <p className="text-base font-semibold">DesignAI Workspace</p>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm">
                UA
              </button>
            </header>

            <div className="rounded-2xl bg-black/40 p-6 min-h-[500px]">
              <div className="mb-4 flex justify-end gap-3">
                <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">Orbit</span>
                <button
                  onClick={() => setAutoRotate((prev) => !prev)}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80"
                  type="button"
                >
                  Auto-rotation
                </button>
                <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">Fullscreen</span>
                <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">Screenshot</span>
              </div>

              <ThreeViewer
                selectedRoom={selectedRoom}
                selectedStyle={activeStyleLabel}
                autoRotate={autoRotate}
                onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
