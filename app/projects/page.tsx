import Link from "next/link";
import ProtectedShell from "@/components/ProtectedShell";
import { requireAuth } from "@/lib/requireAuth";

const styles = {
  Modern: "bg-purple-500/25 text-purple-200",
  Minimal: "bg-slate-500/25 text-slate-200",
  Luxury: "bg-amber-500/25 text-amber-200",
  Scandinavian: "bg-cyan-500/25 text-cyan-200",
} as const;

const projects = [
  { id: "p1", name: "Sunset Living", style: "Modern", date: "2026-03-04", gradient: "from-purple-700 to-indigo-500" },
  { id: "p2", name: "Nordic Office", style: "Scandinavian", date: "2026-03-01", gradient: "from-teal-600 to-cyan-500" },
  { id: "p3", name: "Quiet Bedroom", style: "Minimal", date: "2026-02-27", gradient: "from-slate-600 to-zinc-500" },
  { id: "p4", name: "Royal Suite", style: "Luxury", date: "2026-02-20", gradient: "from-amber-600 to-orange-500" },
];

export default async function ProjectsPage() {
  const user = await requireAuth();

  return (
    <ProtectedShell userName={user.name} plan={user.plan}>
      <h1 className="text-3xl font-semibold">Projects</h1>
      {projects.length ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/30">
              <div className={`h-28 rounded-xl bg-gradient-to-r ${project.gradient}`} />
              <div className="mt-3 flex items-center justify-between">
                <p className="font-medium">{project.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs ${styles[project.style as keyof typeof styles]}`}>{project.style}</span>
              </div>
              <p className="mt-1 text-xs text-white/60">Created: {project.date}</p>
              <details className="relative mt-3">
                <summary className="list-none cursor-pointer rounded-lg border border-white/15 px-2 py-1 text-xs">⋯ Actions</summary>
                <div className="absolute right-0 z-10 mt-2 w-32 rounded-lg border border-white/10 bg-[#101726] p-1 text-xs">
                  <button className="block w-full rounded px-2 py-1 text-left hover:bg-white/10" type="button">Rename</button>
                  <button className="block w-full rounded px-2 py-1 text-left hover:bg-white/10" type="button">Delete</button>
                  <button className="block w-full rounded px-2 py-1 text-left hover:bg-white/10" type="button">Export</button>
                </div>
              </details>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-5xl">🖼️</p>
          <p className="mt-3 text-lg">No project yet</p>
          <Link href="/studio" className="mt-5 inline-flex rounded-full bg-electric px-5 py-2 text-sm font-semibold">Create your first project</Link>
        </div>
      )}
    </ProtectedShell>
  );
}
