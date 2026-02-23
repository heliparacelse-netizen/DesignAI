"use client";

import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/components/I18nProvider";

const projects = [
  { name: "Salon Moderne", updated: "2026-02-20", style: "Modern" },
  { name: "Cuisine Minimal", updated: "2026-02-18", style: "Minimal" },
  { name: "Suite Premium", updated: "2026-02-14", style: "Luxury" },
];

export default function DashboardPage() {
  const { messages } = useI18n();

  return (
    <div className="min-h-screen bg-midnight text-white">
      <nav className="px-8 py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold">DesignAI</Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/login" className="rounded-full border border-white/20 px-4 py-2 text-sm text-gray-200">
              {messages.pages.logout}
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">{messages.pages.greeting}</h1>
          <button className="rounded-full bg-electric px-5 py-2 text-sm font-semibold">{messages.pages.newProject}</button>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          3/10 {messages.pages.usage}
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="mt-2 text-sm text-white/70">Style: {project.style}</p>
              <p className="text-xs text-white/50">Updated: {project.updated}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
