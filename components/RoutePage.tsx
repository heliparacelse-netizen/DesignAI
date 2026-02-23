"use client";

import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/components/I18nProvider";

interface RoutePageProps {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function RoutePage({ title, description, ctaHref, ctaLabel }: RoutePageProps) {
  const { messages } = useI18n();

  return (
    <div className="min-h-screen bg-midnight text-white">
      <nav className="px-8 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold">DesignAI</Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/login" className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 transition hover:border-white/40 hover:text-white">
              {messages.nav.connexion}
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-8 py-16">
        <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg text-gray-400">{description}</p>
        {ctaHref && ctaLabel ? (
          <Link href={ctaHref} className="mt-8 inline-flex rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white">
            {ctaLabel}
          </Link>
        ) : null}
      </main>
    </div>
  );
}
