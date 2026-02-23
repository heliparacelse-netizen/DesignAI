"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import CountUp from "@/components/CountUp";
import { useI18n } from "@/components/I18nProvider";

const howSteps = [
  { icon: "📤", title: "Upload your space", number: "01" },
  { icon: "🎨", title: "Choose style & mood", number: "02" },
  { icon: "✨", title: "Generate AI layout", number: "03" },
];

const differentiators = [
  { icon: "🧠", title: "AI layout intelligence" },
  { icon: "🧩", title: "Style fusion engine" },
  { icon: "🛰️", title: "Real-time 3D preview" },
  { icon: "📦", title: "Export for clients" },
  { icon: "👥", title: "Team collaboration" },
  { icon: "☁️", title: "Cloud workspace" },
];

const testimonials = [
  { name: "Maya Laurent", role: "Interior Freelancer", text: "DesignAI lets me deliver premium concepts twice as fast.", avatar: "M" },
  { name: "Tom Becker", role: "Creative Director", text: "Our team standardized quality and sped up client approvals.", avatar: "T" },
  { name: "Salma Noor", role: "Boutique Studio", text: "The 3D preview gives clients confidence from day one.", avatar: "S" },
];

const plans = [
  { name: "Starter", priceM: "€19", priceY: "€15", features: ["25 generations", "1 workspace", "Basic exports"] },
  { name: "Pro", priceM: "€49", priceY: "€39", features: ["120 generations", "Team sharing", "3D exports"], popular: true },
  { name: "Studio", priceM: "€99", priceY: "€79", features: ["Unlimited concepts", "Priority support", "Brand kit"] },
];

export default function MarketingPage() {
  const { messages } = useI18n();
  const [annual, setAnnual] = useState(true);
  const [slider, setSlider] = useState(56);

  return (
    <div className="min-h-screen bg-midnight text-white [background-image:radial-gradient(circle_at_10%_20%,rgba(124,92,255,0.20),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.14),transparent_30%),url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22 viewBox=%220 0 180 180%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22180%22 height=%22180%22 filter=%22url(%23n)%22 opacity=%220.03%22/%3E%3C/svg%3E')]">
      <nav className="px-8 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 font-semibold">D</div>
            <span className="text-lg font-semibold">DesignAI</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <Link href="/produit" className="transition duration-200 ease-in-out hover:text-white">{messages.nav.produit}</Link>
            <Link href="/studio" className="transition duration-200 ease-in-out hover:text-white">{messages.nav.studio}</Link>
            <Link href="/processus" className="transition duration-200 ease-in-out hover:text-white">{messages.nav.processus}</Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/login" className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 transition-all duration-200 ease-in-out hover:border-white/40 hover:text-white">{messages.nav.connexion}</Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-8">
        <section className="grid min-h-[88vh] items-center gap-10 py-16 lg:grid-cols-2">
          <div className="animate-[fadeInUp_0.7s_ease-in-out]">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">{messages.hero.badge}</p>
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">{messages.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-gray-400">{messages.hero.subtitle}</p>
            <div className="mt-8 flex gap-4">
              <Link href="/studio" className="inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold shadow-glow transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:brightness-110">
                {messages.hero.create} →
              </Link>
              <Link href="/produit" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:border-white/60 hover:bg-white/5">
                {messages.hero.demo}
              </Link>
            </div>
          </div>

          <div className="relative animate-[fadeInUp_0.9s_ease-in-out]">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d2540] via-[#111a2e] to-[#0b0f19] p-4">
                <div className="absolute right-3 top-3 rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-300">{messages.hero.badge}</div>
                <div className="h-60 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_70%_35%,rgba(124,92,255,0.45),transparent_45%)]" />
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3"><CountUp to={12} suffix="k" /> rooms generated</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3"><CountUp to={94} suffix="%" /> satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howSteps.map((step) => (
              <article key={step.number} className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-white/30">
                <p className="text-xs tracking-[0.2em] text-white/50">{step.number}</p>
                <p className="mt-3 text-2xl transition-transform duration-200 group-hover:scale-110">{step.icon}</p>
                <p className="mt-4 text-lg font-semibold">{step.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
          <h2 className="text-3xl font-semibold">Live preview</h2>
          <p className="mt-2 text-sm text-white/65">Before/after interactive concept preview</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="relative h-56 bg-gradient-to-r from-slate-800 to-slate-600">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-midnight to-indigo-900" style={{ width: `${slider}%` }} />
              <input type="range" min={10} max={90} value={slider} onChange={(e) => setSlider(Number(e.target.value))} className="absolute inset-x-6 bottom-6" />
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-semibold">Why DesignAI is different</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg transition-all duration-200 ease-in-out hover:border-white/30">
                <p className="text-2xl">{item.icon}</p>
                <p className="mt-3 font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-6 text-sm text-white/60">Used by 2,000+ creators</div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">{item.avatar}</div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-white/60">{item.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/75">{item.text}</p>
                <p className="mt-3 text-amber-300">★★★★★</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold">Pricing preview</h2>
            <button onClick={() => setAnnual((v) => !v)} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm transition duration-200 hover:bg-white/10" type="button">
              {annual ? "Annuel" : "Mensuel"}
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={`rounded-2xl border p-6 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 ${plan.popular ? "border-electric bg-electric/10" : "border-white/10 bg-white/5"}`}>
                {plan.popular ? <span className="mb-3 inline-flex rounded-full bg-electric px-2 py-1 text-xs">Most popular</span> : null}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-semibold">{annual ? plan.priceY : plan.priceM}<span className="text-sm text-white/60">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {plan.features.map((f) => <li key={f}>• {f}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 pb-24 text-center">
          <Link href="/register" className="inline-flex rounded-full bg-electric px-8 py-4 text-sm font-semibold text-white shadow-glow transition-all duration-200 ease-in-out hover:brightness-110">
            {messages.cta}
          </Link>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 px-8 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-5">
          <div>
            <p className="text-lg font-semibold">DesignAI</p>
            <p className="mt-2 text-sm text-white/60">AI SaaS for interior creators.</p>
          </div>
          <div><p className="font-medium">Product</p><p className="mt-2 text-sm text-white/60">Studio</p><p className="text-sm text-white/60">3D Preview</p></div>
          <div><p className="font-medium">Company</p><p className="mt-2 text-sm text-white/60">About</p><p className="text-sm text-white/60">Careers</p></div>
          <div><p className="font-medium">Legal</p><p className="mt-2 text-sm text-white/60">Terms</p><p className="text-sm text-white/60">Privacy</p></div>
          <div>
            <p className="font-medium">Newsletter</p>
            <div className="mt-3 flex rounded-xl border border-white/15 bg-white/5 p-1">
              <input placeholder="Email" className="w-full bg-transparent px-2 text-sm outline-none" />
              <button className="rounded-lg bg-electric px-3 py-1 text-xs">Join</button>
            </div>
            <div className="mt-3 text-sm text-white/70">Social: X • LinkedIn • Instagram</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
