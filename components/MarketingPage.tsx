"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/I18nProvider";

const steps = [
  { icon: "📸", title: "Upload your room photo", description: "Capture your space and send it to DesignAI in one click." },
  { icon: "🎨", title: "Choose your style", description: "Select mood, materials and preferred visual identity." },
  { icon: "✨", title: "Get your AI redesign instantly", description: "Receive polished concepts optimized for flow and aesthetics." },
];

const featureCards = [
  { icon: "🧠", title: "AI Layout Intelligence", desc: "Smart room composition based on architecture and furniture spacing." },
  { icon: "🌀", title: "Style Blending Engine", desc: "Blend modern, minimal and luxury references in one coherent output." },
  { icon: "🧊", title: "3D Viewer", desc: "Explore your redesigned room from multiple camera angles.", premium: true },
  { icon: "📤", title: "Client-ready Exports", desc: "Send high-quality visual concepts to clients instantly." },
  { icon: "💳", title: "Budget Mode", desc: "Keep projects aligned with realistic spending constraints." },
];

const styleData = {
  modern: { label: "Modern", description: "Bold contrast, clean lines and curated textures.", bullets: ["Matte accents", "Open space", "Balanced lighting"] },
  minimal: { label: "Minimal", description: "Calm palettes and reduction of visual noise.", bullets: ["Neutral tones", "Soft shadows", "Simple furniture"] },
  scandinavian: { label: "Scandinavian", description: "Warm materials and bright natural ambiance.", bullets: ["Wood + white", "Soft textiles", "Airy volumes"] },
  luxury: { label: "Luxury", description: "Premium finishes and striking visual composition.", bullets: ["Marble hints", "Metal touches", "Elegant focal points"] },
} as const;

const pricing = [
  { name: "Starter", price: "9€", features: ["5 projects", "Watermark", "Standard resolution"] },
  { name: "Pro", price: "19€", features: ["15 projects", "No watermark", "HD export"], popular: true },
  { name: "Studio", price: "39€", features: ["40 projects", "Custom watermark", "GLB export", "3D viewer"] },
];

const testimonials = [
  { initials: "AL", name: "Amélie Laurent", role: "Interior Designer, Paris", quote: "DesignAI helps me ship high-quality concepts in record time." },
  { initials: "DV", name: "David Vega", role: "Architect, Barcelona", quote: "Clients understand the vision immediately thanks to realistic previews." },
  { initials: "KT", name: "Kei Tanaka", role: "Studio Lead, Tokyo", quote: "The blend of speed and quality transformed our production workflow." },
];

const faq = [
  ["How does the AI redesign work?", "DesignAI analyzes your room photo, style settings and constraints, then generates complete redesign proposals."],
  ["Is my photo stored on your servers?", "Uploads are encrypted and handled with strict workspace-level privacy controls."],
  ["What is the difference between free and premium?", "Premium unlocks more projects, HD exports, watermark control and advanced viewer options."],
  ["Can I use DesignAI for commercial projects?", "Yes, commercial use is available for paid plans for client and agency work."],
  ["How do tokens work?", "Each generation consumes tokens depending on quality level and output complexity."],
];

export default function MarketingPage() {
  const { messages } = useI18n();
  const [tab, setTab] = useState<keyof typeof styleData>("modern");
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = useMemo(() => styleData[tab], [tab]);

  return (
    <div className="noise-overlay min-h-screen bg-[#0b0f19] text-white [background-image:radial-gradient(circle_at_10%_20%,rgba(124,92,255,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.16),transparent_35%)]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/75 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            DesignAI <span className="h-2.5 w-2.5 rounded-full bg-electric" />
          </Link>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <Link href="/product" className="hover:text-white">{messages.nav.product}</Link>
            <Link href="/studio" className="hover:text-white">{messages.nav.studio}</Link>
            <a href="#pricing" className="hover:text-white">{messages.nav.pricing}</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSelector />
            <Link href="/login" className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 hover:border-white/40">{messages.nav.login}</Link>
            <Link href="/register" className="rounded-full bg-electric px-5 py-2 text-sm font-semibold shadow-glow hover:brightness-110">{messages.nav.startFree}</Link>
          </div>

          <button className="rounded-xl border border-white/20 px-3 py-2 md:hidden" onClick={() => setMobileOpen((v) => !v)} type="button">☰</button>
        </nav>
        {mobileOpen ? (
          <div className="mx-auto mb-4 w-full max-w-6xl space-y-2 px-8 md:hidden">
            <Link href="/product" className="block rounded-xl bg-white/5 px-4 py-2">{messages.nav.product}</Link>
            <Link href="/studio" className="block rounded-xl bg-white/5 px-4 py-2">{messages.nav.studio}</Link>
            <a href="#pricing" className="block rounded-xl bg-white/5 px-4 py-2">{messages.nav.pricing}</a>
            <Link href="/login" className="block rounded-xl bg-white/5 px-4 py-2">{messages.nav.login}</Link>
            <Link href="/register" className="block rounded-xl bg-electric px-4 py-2 text-center font-semibold">{messages.nav.startFree}</Link>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl px-8">
        <Reveal>
          <section className="grid min-h-[88vh] items-center gap-10 py-16 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-semibold leading-tight md:text-6xl">{messages.hero.title}</h1>
              <p className="mt-6 max-w-xl text-lg text-gray-400">{messages.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/studio" className="rounded-full bg-electric px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-110">{messages.hero.create}</Link>
                <Link href="/product" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:border-white/60">{messages.hero.demo}</Link>
              </div>
              <p className="mt-6 text-sm text-white/70">{messages.hero.trust}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d2540] via-[#111a2e] to-[#0b0f19] p-4">
                <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs">Modern</div>
                <div className="absolute right-4 top-11 rounded-full bg-white/10 px-3 py-1 text-xs">Scandinavian</div>
                <div className="absolute bottom-4 left-10 rounded-full bg-white/10 px-3 py-1 text-xs">Luxury</div>
                <div className="h-60 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-slate-700 to-slate-500">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[#0f172a] to-[#312e81]" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3"><CountUp to={12} suffix="k" /> rooms generated</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3"><CountUp to={94} suffix="%" /> satisfaction</div>
                </div>
                <div className="mt-3 inline-flex rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-300">AI powered</div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-8">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps.map((s, idx) => (
                <article key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg hover:-translate-y-1 hover:border-white/30">
                  <p className="text-4xl font-semibold text-white/20">0{idx + 1}</p>
                  <p className="mt-2 text-2xl">{s.icon}</p>
                  <p className="mt-3 font-semibold">{s.title}</p>
                  <p className="mt-2 text-sm text-white/70">{s.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20">
            <h2 className="text-3xl font-semibold">Why DesignAI is different</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
                  <p className="text-2xl">{card.icon}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <p className="font-semibold">{card.title}</p>
                    {card.premium ? <span className="rounded-full bg-electric/25 px-2 py-0.5 text-[10px]">Premium</span> : null}
                  </div>
                  <p className="mt-2 text-sm text-white/70">{card.desc}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg">
            <h2 className="text-3xl font-semibold">Live Preview</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(styleData) as Array<keyof typeof styleData>).map((key) => (
                <button key={key} onClick={() => setTab(key)} className={`rounded-full px-4 py-2 text-sm ${tab === key ? "bg-electric" : "border border-white/20 bg-white/5"}`} type="button">
                  {styleData[key].label}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#171e32] to-[#0b0f19] p-6">
              <h3 className="text-2xl font-semibold">{active.label}</h3>
              <p className="mt-2 text-white/70">{active.description}</p>
              <ul className="mt-4 space-y-1 text-sm text-white/70">
                {active.bullets.map((b) => <li key={b}>• {b}</li>)}
              </ul>
            </div>
            <Link href="/studio" className="mt-5 inline-flex text-sm text-aurora hover:underline">Try it yourself →</Link>
          </section>
        </Reveal>

        <Reveal>
          <section id="pricing" className="mt-20">
            <h2 className="text-3xl font-semibold">Pricing</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pricing.map((p) => (
                <article key={p.name} className={`rounded-2xl border p-6 shadow-lg ${p.popular ? "border-electric bg-electric/10" : "border-white/10 bg-white/5"}`}>
                  {p.popular ? <span className="mb-3 inline-flex rounded-full bg-electric px-3 py-1 text-xs">Most Popular</span> : null}
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-4xl font-semibold">{p.price}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/75">
                    {p.features.map((f) => <li key={f}>✓ {f}</li>)}
                  </ul>
                  <Link href="/register" className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">Choose plan</Link>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20">
            <h2 className="text-3xl font-semibold">Loved by designers worldwide</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <article key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/35 text-sm font-semibold">{t.initials}</div>
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-white/60">{t.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-amber-300">★★★★★</p>
                  <p className="mt-2 text-sm text-white/75">“{t.quote}”</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20">
            <h2 className="text-3xl font-semibold">Frequently asked questions</h2>
            <div className="mt-6 space-y-3">
              {faq.map(([q, a]) => (
                <details key={q} className="mobile-collapse rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="cursor-pointer list-none font-medium">{q}</summary>
                  <p className="mt-3 text-sm text-white/70">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20 rounded-3xl bg-gradient-to-r from-electric/65 to-aurora/45 p-10 text-center">
            <h2 className="text-4xl font-semibold">Ready to redesign your space?</h2>
            <p className="mt-3 text-white/85">Join thousands of designers using AI to work faster.</p>
            <Link href="/register" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-midnight">Start for free</Link>
          </section>
        </Reveal>
      </main>

      <footer className="mt-20 border-t border-white/10 bg-black/30 px-8 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-5">
          <div>
            <p className="text-lg font-semibold">DesignAI<span className="ml-1 text-electric">●</span></p>
            <p className="mt-2 text-sm text-white/60">AI platform for high-end interior redesign.</p>
          </div>
          <div><p className="font-medium">Product</p><p className="mt-2 text-sm text-white/60">Features</p><p className="text-sm text-white/60">Pricing</p></div>
          <div><p className="font-medium">Company</p><p className="mt-2 text-sm text-white/60">About</p><p className="text-sm text-white/60">Careers</p></div>
          <div><p className="font-medium">Legal</p><p className="mt-2 text-sm text-white/60">Terms</p><p className="text-sm text-white/60">Privacy</p></div>
          <div>
            <p className="font-medium">Newsletter</p>
            <div className="mt-3 flex rounded-xl border border-white/15 bg-white/5 p-1">
              <input placeholder="Email" className="w-full bg-transparent px-2 text-sm outline-none" />
              <button className="rounded-lg bg-electric px-3 py-1 text-xs">Join</button>
            </div>
            <p className="mt-3 text-sm text-white/70">Twitter/X · Instagram · LinkedIn</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
