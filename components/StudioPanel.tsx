"use client";

import { useMemo, useState } from "react";
import { copy, roomTypes, styleOptions, type Locale } from "@/data/content";
import ThreeViewer from "@/components/ThreeViewer";

const styleLabels = styleOptions.map((style) => style.toLowerCase());

export default function StudioPanel({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [selectedStyle, setSelectedStyle] = useState(styleLabels[0]);
  const [autoRotate, setAutoRotate] = useState(true);

  const activeStyleLabel = useMemo(() => {
    const index = styleLabels.indexOf(selectedStyle);
    return styleOptions[index] ?? styleOptions[0];
  }, [selectedStyle]);

  return (
    <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
      <div className="space-y-8">
        <div className="card p-6">
          <p className="text-lg font-semibold">{text.uploadTitle}</p>
          <p className="mt-2 text-sm text-white/70">
            {text.uploadDescription}
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-white/30 bg-white/5 px-4 py-6 text-center">
            <p className="text-sm font-semibold">Drag & drop</p>
            <p className="text-xs text-white/60">{text.uploadHint}</p>
            <button className="mt-4 rounded-full border border-white/30 px-4 py-2 text-xs">
              Browse files
            </button>
          </div>
        </div>

        <div className="card p-6">
          <p className="text-lg font-semibold">{text.roomTitle}</p>
          <p className="mt-2 text-sm text-white/70">
            {text.roomDescription}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {roomTypes.map((room) => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`rounded-full px-4 py-2 text-xs transition ${
                  selectedRoom === room
                    ? "bg-white text-midnight"
                    : "border border-white/20 text-white/70 hover:text-white"
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <p className="text-lg font-semibold">{text.styleTitle}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {styleLabels.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm capitalize transition ${
                  selectedStyle === style
                    ? "border-electric bg-electric/20 text-white"
                    : "border-white/10 text-white/70 hover:border-white/40"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
            Active style: <span className="font-semibold text-white">{activeStyleLabel}</span>
          </div>
        </div>
      </div>

      <div className="card flex flex-col gap-6 p-6">
        <div>
          <p className="text-lg font-semibold">{text.viewerTitle}</p>
          <p className="mt-2 text-sm text-white/70">
            {text.viewerDescription}
          </p>
        </div>
        <ThreeViewer
          selectedRoom={selectedRoom}
          selectedStyle={activeStyleLabel}
          autoRotate={autoRotate}
          onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
        />
      </div>
    </section>
  );
}
