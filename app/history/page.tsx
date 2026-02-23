import Link from "next/link";
import ProtectedShell from "@/components/ProtectedShell";
import { requireAuth } from "@/lib/requireAuth";

const events = [
  { date: "2026-03-04 14:22", room: "Living room", style: "Modern", tokens: 2, preview: "from-purple-700 to-indigo-500" },
  { date: "2026-03-03 10:05", room: "Kitchen", style: "Scandinavian", tokens: 1, preview: "from-teal-600 to-cyan-500" },
  { date: "2026-03-01 19:10", room: "Bedroom", style: "Luxury", tokens: 3, preview: "from-amber-600 to-orange-500" },
];

export default async function HistoryPage() {
  const user = await requireAuth();

  return (
    <ProtectedShell userName={user.name} plan={user.plan}>
      <h1 className="text-3xl font-semibold">History</h1>
      <div className="mt-6 space-y-4">
        {events.map((event) => (
          <article key={event.date} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[160px_1fr_auto]">
            <div className={`h-24 rounded-xl bg-gradient-to-r ${event.preview}`} />
            <div>
              <p className="font-medium">{event.room} • {event.style}</p>
              <p className="mt-1 text-sm text-white/65">{event.date}</p>
              <p className="text-sm text-white/65">Tokens spent: {event.tokens}</p>
            </div>
            <Link href="/viewer" className="self-center rounded-full border border-white/20 px-4 py-2 text-sm">View</Link>
          </article>
        ))}
      </div>
    </ProtectedShell>
  );
}
