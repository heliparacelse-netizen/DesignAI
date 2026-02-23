"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AppSidebarProps = {
  userName: string;
  plan: "free" | "premium";
};

const items = [
  { href: "/dashboard", label: "🏠 Dashboard" },
  { href: "/projects", label: "📁 Projects" },
  { href: "/history", label: "🕐 History" },
  { href: "/viewer", label: "🎮 3D Viewer" },
  { href: "/settings", label: "⚙️ Settings" },
];

export default function AppSidebar({ userName, plan }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-white/5 p-6 backdrop-blur md:flex md:flex-col">
      <p className="text-xl font-semibold">DesignAI</p>

      <nav className="mt-6 space-y-2">
        {items.map((item) => {
          const locked = item.href === "/viewer" && plan === "free";
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                active ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <span>{item.label}</span>
              {locked ? <span>🔒</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/40 font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-white/60">{plan === "premium" ? "Premium" : "Free"} plan</p>
          </div>
        </div>
        {plan === "free" ? (
          <Link href="/product#pricing" className="mt-4 block rounded-xl bg-electric px-4 py-2 text-center text-sm font-semibold">
            Upgrade Plan
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
