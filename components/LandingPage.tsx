import Link from "next/link";
import { copy, languageLabels, locales, type Locale } from "@/data/content";
import StudioPanel from "@/components/StudioPanel";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function LandingPage({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.25),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(45,212,191,0.2),_transparent_50%)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold">
            D
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">DesignAI</p>
            <p className="text-lg font-semibold">Interior Intelligence</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {text.nav.map((item) => (
            <Link key={item} href="#" className="transition hover:text-white">
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs">
            {locales.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className={`rounded-full px-2 py-1 transition ${
                  key === locale
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {languageLabels[key]}
              </Link>
            ))}
          </div>
          <ThemeSwitcher />
          <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-midnight">
            {text.heroCtaPrimary}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-12">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">
              Next-gen interior design
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              <span className="gradient-text">{text.heroTitle}</span>
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              {text.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="glow-ring rounded-full bg-electric px-6 py-3 text-sm font-semibold">
                {text.heroCtaPrimary}
              </button>
              <button className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/80">
                {text.heroCtaSecondary}
              </button>
            </div>
          </div>
          <div className="card relative overflow-hidden p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative space-y-6">
              <h2 className="text-xl font-semibold">{text.featuresTitle}</h2>
              <div className="space-y-4">
                {text.features.map((feature) => (
                  <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="text-sm text-white/70">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StudioPanel locale={locale} />

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-3">
          {text.controls.map((control) => (
            <div key={control.title}>
              <p className="text-lg font-semibold">{control.title}</p>
              <p className="mt-2 text-sm text-white/70">
                {control.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/60 md:flex-row">
          <p>{text.footer}</p>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/20 px-3 py-1">AI ready</span>
            <span className="rounded-full border border-white/20 px-3 py-1">Vercel deploy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
