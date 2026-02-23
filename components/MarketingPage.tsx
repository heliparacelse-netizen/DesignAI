import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import { defaultLocale, getMessages, type SupportedLocale } from "@/lib/i18n";

const links = ["product", "studio", "process"] as const;

type MarketingPageProps = {
  locale?: SupportedLocale;
};

export default function MarketingPage({ locale = defaultLocale }: MarketingPageProps) {
  const messages = getMessages(locale);

  const features = [
    messages.features.aiLayout,
    messages.features.styleBlending,
    messages.features.exports,
  ];

  return (
    <div className="min-h-screen bg-midnight text-white">
      <nav className="px-8 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 font-semibold">
              D
            </div>
            <span className="text-lg font-semibold">DesignAI</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            {links.map((item) => (
              <Link key={item} href="#" className="transition hover:text-white">
                {messages.navbar[item]}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 transition hover:border-white/40 hover:text-white">
              {messages.navbar.login}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-8">
        <section className="min-h-[80vh] pt-20">
          <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
            {messages.hero.titleLine1}
            <br className="hidden md:block" /> {messages.hero.titleLine2}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-400">{messages.hero.subtitle}</p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-midnight">
              {messages.hero.primaryCta}
            </button>
            <button className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white">
              {messages.hero.secondaryCta}
            </button>
          </div>
        </section>

        <section className="mt-24">
          <div className="h-[420px] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#171e32] via-[#101827] to-[#0b0f19] p-8">
            <div className="h-full rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(124,92,255,0.35),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.25),transparent_40%)]" />
          </div>
        </section>

        <section className="mt-24 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-24 pb-24 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{messages.cta.headline}</h2>
          <p className="mt-4 text-gray-400">{messages.cta.subtitle}</p>
          <button className="mt-8 rounded-full bg-electric px-8 py-4 text-sm font-semibold text-white shadow-glow">
            {messages.cta.button}
          </button>
        </section>
      </main>
    </div>
  );
}
