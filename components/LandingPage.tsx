"use client";

import { useMemo, useState } from "react";
import { type Locale } from "@/data/content";

type Project = {
  id: number;
  roomName: string;
  style: string;
  lastEdited: string;
};

const seedProjects: Project[] = [
  {
    id: 1,
    roomName: "Loft Living Room",
    style: "Modern",
    lastEdited: "Feb 21, 2026",
  },
  {
    id: 2,
    roomName: "Master Bedroom",
    style: "Scandinavian",
    lastEdited: "Feb 18, 2026",
  },
  {
    id: 3,
    roomName: "Open Kitchen",
    style: "Minimal",
    lastEdited: "Feb 14, 2026",
  },
  {
    id: 4,
    roomName: "Home Office",
    style: "Industrial",
    lastEdited: "Feb 10, 2026",
  },
  {
    id: 5,
    roomName: "Guest Bathroom",
    style: "Luxury",
    lastEdited: "Feb 05, 2026",
  },
  {
    id: 6,
    roomName: "Dining Space",
    style: "Classic",
    lastEdited: "Jan 30, 2026",
  },
];

export default function LandingPage({ locale }: { locale: Locale }) {
  const [projects, setProjects] = useState<Project[]>(seedProjects);

  const labels = useMemo(
    () => ({
      title: locale === "fr" ? "Vos projets" : "Your Projects",
      newRoom: locale === "fr" ? "Nouvelle pièce" : "New Room",
      open: locale === "fr" ? "Ouvrir" : "Open",
      emptyTitle:
        locale === "fr"
          ? "Aucun projet pour le moment"
          : "No projects yet",
      emptyDescription:
        locale === "fr"
          ? "Créez votre première pièce pour commencer à concevoir avec DesignAI."
          : "Create your first room to start designing with DesignAI.",
      firstRoom:
        locale === "fr" ? "Créer votre première pièce" : "Create your first room",
    }),
    [locale]
  );

  const handleNewRoom = () => {
    const newProject: Project = {
      id: Date.now(),
      roomName: locale === "fr" ? "Nouvelle pièce" : "New Room Concept",
      style: "Modern",
      lastEdited: new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="mx-auto w-full max-w-7xl px-8 py-10">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold md:text-4xl">{labels.title}</h1>
          <button
            onClick={handleNewRoom}
            className="rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
            type="button"
          >
            {labels.newRoom}
          </button>
        </header>

        {projects.length > 0 ? (
          <section className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl bg-white/5 p-6 transition hover:scale-105"
              >
                <h2 className="text-xl font-semibold">{project.roomName}</h2>
                <p className="mt-3 text-sm text-white/70">Style: {project.style}</p>
                <p className="mt-1 text-sm text-white/50">Last edited: {project.lastEdited}</p>
                <button
                  className="mt-6 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-white/40 hover:text-white"
                  type="button"
                >
                  {labels.open}
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className="mt-16 flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-center">
            <div className="text-6xl">🧩</div>
            <h2 className="mt-5 text-2xl font-semibold">{labels.emptyTitle}</h2>
            <p className="mt-3 max-w-xl text-white/65">{labels.emptyDescription}</p>
            <button
              onClick={handleNewRoom}
              className="mt-8 rounded-full bg-electric px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
              type="button"
            >
              {labels.firstRoom}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
