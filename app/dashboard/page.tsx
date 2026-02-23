import ProtectedShell from "@/components/ProtectedShell";
import { requireAuth } from "@/lib/requireAuth";

const projects = [
  { name: "Paris Loft", style: "Modern", date: "2026-03-01", gradient: "from-violet-600 to-indigo-500" },
  { name: "Nordic Kitchen", style: "Scandinavian", date: "2026-02-27", gradient: "from-cyan-500 to-teal-500" },
  { name: "Hotel Suite", style: "Luxury", date: "2026-02-25", gradient: "from-amber-500 to-orange-500" },
];

const activity = [
  "Generated 4 AI variations for Paris Loft",
  "Exported HD preview for client review",
  "Updated style blend preset to Modern + Luxury",
];

export default async function DashboardPage() {
  const user = await requireAuth();
  const max = user.plan === "free" ? 4 : 20;
  const used = Math.max(0, max - user.tokens);
  const percent = Math.min(100, Math.round((used / max) * 100));
  const color = percent > 80 ? "bg-red-500" : percent > 55 ? "bg-orange-400" : "bg-emerald-400";

  return (
    <ProtectedShell userName={user.name} plan={user.plan}>
      <h1 className="text-3xl font-semibold">Welcome back, {user.name}</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/60">Projects created</p><p className="mt-2 text-2xl font-semibold">24</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/60">Generations left</p><p className="mt-2 text-2xl font-semibold">{user.tokens}</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-white/60">Storage used</p><p className="mt-2 text-2xl font-semibold">4.8 GB</p></div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-2 flex items-center justify-between text-sm"><span>{used}/{max} generations used</span><span>{percent}%</span></div>
        <div className="h-3 rounded-full bg-white/10"><div className={`h-3 rounded-full ${color}`} style={{ width: `${percent}%` }} /></div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.name} className="rounded-xl border border-white/10 bg-black/20 p-4 hover:border-white/30">
                <div className={`h-24 rounded-lg bg-gradient-to-r ${project.gradient}`} />
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-medium">{project.name}</p>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{project.style}</span>
                </div>
                <p className="mt-1 text-xs text-white/55">Created: {project.date}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold">Activity timeline</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {activity.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-black/20 p-3">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </ProtectedShell>
  );
}
