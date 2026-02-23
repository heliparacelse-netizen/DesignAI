"use client";

import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/components/I18nProvider";

const projects = [
  { name: "Salon Moderne", updated: "Today · 14:22", style: "Modern" },
  { name: "Cuisine Minimal", updated: "Yesterday · 18:05", style: "Minimal" },
  { name: "Suite Premium", updated: "2 days ago", style: "Luxury" },
];

const timeline = [
  "Generated 3 new room variations",
  "Shared 'Cuisine Minimal' with team",
  "Exported client preview in HD",
];

export default function DashboardPage() {
  const { messages } = useI18n();

  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="flex">
        <aside className="hidden h-screen w-64 flex-col border-r border-white/10 bg-white/5 p-5 backdrop-blur md:flex">
          <p className="text-lg font-semibold">DesignAI</p>
          <nav className="mt-6 space-y-2 text-sm">
            <Link href="/dashboard" className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">🏠 Dashboard</Link>
            <Link href="/studio" className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10">✨ Studio</Link>
            <Link href="/produit" className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10">📊 Product</Link>
            <Link href="/processus" className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10">📁 Process</Link>
          </nav>
          <button className="mt-auto rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm">{messages.pages.upgrade}</button>
        </aside>

        <main className="flex-1 p-8">
          <div className="mx-auto w-full max-w-7xl">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-semibold">{messages.pages.greeting}</h1>
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <button className="rounded-full border border-white/20 p-2">🔔</button>
                <details className="relative">
                  <summary className="list-none cursor-pointer rounded-full border border-white/20 bg-white/5 p-2">👤</summary>
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#101727] p-2">
                    <Link href="/login" className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10">{messages.pages.logout}</Link>
                  </div>
                </details>
              </div>
            </header>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"><p className="text-sm text-white/60">{messages.pages.projectsCreated}</p><p className="mt-2 text-2xl font-semibold">24</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"><p className="text-sm text-white/60">{messages.pages.generationsLeft}</p><p className="mt-2 text-2xl font-semibold">7</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"><p className="text-sm text-white/60">{messages.pages.storageUsed}</p><p className="mt-2 text-2xl font-semibold">4.8 GB</p></div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">3/10 {messages.pages.usage}</p>
              <button className="inline-flex items-center gap-2 rounded-full bg-electric px-4 py-2 text-sm font-semibold">➕ {messages.pages.newProject}</button>
            </div>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold">Projects</h2>
                <div className="mt-4 space-y-3">
                  {projects.map((project) => (
                    <article key={project.name} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-white/65">Style: {project.style}</p>
                      <p className="text-xs text-white/45">{project.updated}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold">Activity timeline</h2>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  {timeline.map((item) => (
                    <li key={item} className="rounded-xl border border-white/10 bg-black/20 p-3">{item}</li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/60">☁️ Cloud sync active</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
