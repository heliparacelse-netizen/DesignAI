"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import AppSidebar from "@/components/AppSidebar";
import LanguageSelector from "@/components/LanguageSelector";

type ProtectedShellProps = {
  userName: string;
  plan: "free" | "premium";
  children: React.ReactNode;
};

export default function ProtectedShell({ userName, plan, children }: ProtectedShellProps) {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="flex">
        <AppSidebar userName={userName} plan={plan} />
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-6 flex items-center justify-between gap-4">
              <div className="text-sm text-white/70">Authenticated workspace</div>
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <Link href="/studio" className="rounded-full border border-white/20 px-4 py-2 text-sm">New Project</Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </header>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
