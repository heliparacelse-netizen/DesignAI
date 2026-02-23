"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/components/I18nProvider";

const howSteps = [
  { icon: "📸", title: "Upload your room photo", text: "Drop a room image in seconds and let AI understand your existing layout." },
  { icon: "🎨", title: "Choose your style", text: "Pick your aesthetic, mood, and constraints to guide generation precisely." },
  { icon: "✨", title: "Get your AI redesign instantly", text: "Receive polished concepts optimized for style, flow and client presentation." },
];

const features = [
  { icon: "🧠", title: "AI Layout Intelligence", text: "Smart room composition based on circulation and spatial logic." },
  { icon: "🌀", title: "Style Blending Engine", text: "Mix influences into one coherent visual identity." },
  { icon: "🧊", title: "3D Viewer", text: "Explore generated concepts from every angle.", premium: true },
  { icon: "📤", title: "Client-ready Exports", text: "Share polished visuals instantly with stakeholders." },
  { icon: "💶", title: "Budget Mode", text: "Keep proposals aligned with realistic budget targets." },
];

const styleTabs = {
  modern: { title: "Modern", text: "Clean lines, functional spaces, neutral tones with refined contrast.", points: ["Minimal clutter", "Matte black accents", "Open circulation"] },
  minimal: { title: "Minimal", text: "Calm and balanced spaces with intentional furniture choices.", points: ["Soft neutrals", "Low visual noise", "Natural light focus"] },
  scandinavian: { title: "Scandinavian", text: "Warm woods and bright materials for cozy everyday living.", points: ["Wood textures", "Textile layering", "Airy composition"] },
  luxury: { title: "Luxury", text: "Premium finishes and dramatic contrast for statement interiors.", points: ["Marble accents", "Warm metallics", "Hotel-inspired look"] },
} as const;

const testimonials = [
  { avatar: "AL", name: "Alicia Laurent", role: "Interior Designer, Paris", quote: "DesignAI cuts my concept phase by half while improving quality." },
  { avatar: "MR", name: "Marco Rossi", role: "Architect, Milan", quote: "Clients approve faster because visual communication is crystal clear." },
  { avatar: "KS", name: "Kenji Sato", role: "Studio Lead, Tokyo", quote: "The speed-to-iteration is unmatched for fast-paced interior projects." },
];

const pricing = [
  { name: "Starter", price: "9€", features: ["5 projects", "Watermark", "Standard resolution"] },
  { name: "Pro", price: "19€", features: ["15 projects", "No watermark", "HD export"], popular: true },
  { name: "Studio", price: "39€", features: ["40 projects", "Custom watermark", "GLB export + 3D viewer"] },
];

const faqs = [
  ["How does the AI redesign work?", "DesignAI analyzes your room photo, style choices, and constraints to generate multiple polished redesign concepts in seconds."],
  ["Is my photo stored on your servers?", "Your uploads are encrypted in transit and storage policies can be configured per workspace policy."],
  ["What is the difference between free and premium?", "Premium unlocks higher generation limits, HD exports, watermark removal, and advanced 3D capabilities."],
  ["Can I use DesignAI for commercial projects?", "Yes. Paid plans include commercial usage rights for studio and client work."],
  ["How do tokens work?", "Each generation consumes tokens based on quality settings; your dashboard tracks usage in real time."],
];

export default function MarketingPage() {
  const { messages } = useI18n();
  const [tab, setTab] = useState<keyof typeof styleTabs>("modern");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeStyle = useMemo(() => styleTabs[tab], [tab]);

  return (
    <div className="noise-overlay min-h-screen bg-[#0b0f19] text-white [background-image:radial-gradient(circle_at_10%_20%,rgba(124,92,255,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.15),transparent_30%)]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f19]/70 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            DesignAI <span className="h-2.5 w-2.5 rounded-full bg-electric" />
          </Link>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <Link href="/produit" className="hover:text-white">Product</Link>
            <Link href="/studio" className="hover:text-white">Studio</Link>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSelector />
            <Link href="/login" className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 hover:border-white/40">Login</Link>
            <Link href="/register" className="rounded-full bg-electric px-5 py-2 text-sm font-semibold shadow-glow hover:brightness-110">Start Free</Link>
          </div>

          <button className="rounded-xl border border-white/20 px-3 py-2 md:hidden" onClick={() => setMenuOpen((v) => !v)} type="button">☰</button>
        </nav>
        {menuOpen ? (
          <div className="mx-auto mb-4 w-full max-w-6xl space-y-2 px-8 md:hidden">
            <Link href="/produit" className="block rounded-xl bg-white/5 px-4 py-2">Product</Link>
            <Link href="/studio" className="block rounded-xl bg-white/5 px-4 py-2">Studio</Link>
            <a href="#pricing" className="block rounded-xl bg-white/5 px-4 py-2">Pricing</a>
            <Link href="/login" className="block rounded-xl bg-white/5 px-4 py-2">Login</Link>
            <Link href="/register" className="block rounded-xl bg-electric px-4 py-2 text-center font-semibold">Start Free</Link>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl px-8">
        <Reveal>
          <section className="grid min-h-[88vh] items-center gap-10 py-16 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-semibold leading-tight md:text-6xl">Transform any room with AI in seconds</h1>
              <p className="mt-6 max-w-xl text-lg text-gray-400">Upload a photo. Our AI redesigns it in your style. Instantly.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/studio" className="rounded-full bg-electric px-6 py-3 text-sm font-semibold shadow-glow hover:brightness-110">Start Creating</Link>
                <Link href="/produit" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:border-white/60">Watch Demo</Link>
              </div>
              <p className="mt-6 text-sm text-white/70">✦ Trusted by 2,400+ designers & architects</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d2540] via-[#111a2e] to-[#0b0f19] p-4">
                <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs">Modern</div>
                <div className="absolute right-4 top-12 rounded-full bg-white/10 px-3 py-1 text-xs">Scandinavian</div>
                <div className="absolute bottom-4 left-10 rounded-full bg-white/10 px-3 py-1 text-xs">Luxury</div>
                <div className="relative h-60 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-slate-800 to-slate-500">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#101726] to-[#312054]" />
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
              {howSteps.map((step, i) => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg hover:-translate-y-1 hover:border-white/30">
                  <p className="text-4xl font-semibold text-white/20">0{i + 1}</p>
                  <p className="mt-2 text-2xl">{step.icon}</p>
                  <p className="mt-3 font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-white/70">{step.text}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20">
            <h2 className="text-3xl font-semibold">Features built for serious design teams</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {features.map((f, idx) => (
                <article key={f.title} className={`rounded-2xl border border-white/10 p-5 shadow-lg ${idx === 0 ? "md:col-span-2 bg-gradient-to-br from-indigo-500/20 to-transparent" : "bg-white/5"}`}>
                  <p className="text-2xl">{f.icon}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <p className="font-semibold">{f.title}</p>
                    {f.premium ? <span className="rounded-full bg-electric/30 px-2 py-0.5 text-[10px]">Premium</span> : null}
                  </div>
                  <p className="mt-2 text-sm text-white/70">{f.text}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-semibold">Live preview / Demo</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(styleTabs) as Array<keyof typeof styleTabs>).map((key) => (
                <button key={key} onClick={() => setTab(key)} className={`rounded-full px-4 py-2 text-sm ${tab === key ? "bg-electric" : "border border-white/20 bg-white/5"}`} type="button">
                  {styleTabs[key].title}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#171e32] to-[#0b0f19] p-6">
              <h3 className="text-2xl font-semibold">{activeStyle.title}</h3>
              <p className="mt-2 text-white/70">{activeStyle.text}</p>
              <ul className="mt-4 space-y-1 text-sm text-white/70">
                {activeStyle.points.map((p) => <li key={p}>• {p}</li>)}
              </ul>
            </div>
            <Link href="/studio" className="mt-5 inline-flex text-sm text-aurora hover:underline">Try it yourself →</Link>
          </section>
        </Reveal>

        <Reveal>
          <section id="pricing" className="mt-20">
            <h2 className="text-3xl font-semibold">Pricing</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pricing.map((plan) => (
                <article key={plan.name} className={`rounded-2xl border p-6 shadow-lg ${plan.popular ? "border-electric bg-electric/10" : "border-white/10 bg-white/5"}`}>
                  {plan.popular ? <span className="mb-3 inline-flex rounded-full bg-electric px-3 py-1 text-xs">Most Popular</span> : null}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-4xl font-semibold">{plan.price}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/75">
                    {plan.features.map((f) => <li key={f}>✓ {f}</li>)}
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/40 text-sm font-semibold">{t.avatar}</div>
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
              {faqs.map(([q, a]) => (
                <details key={q} className="mobile-collapse rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="cursor-pointer list-none font-medium">{q}</summary>
                  <p className="mt-3 text-sm text-white/70">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-20 rounded-3xl bg-gradient-to-r from-electric/60 to-aurora/40 p-10 text-center">
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
            <p className="mt-2 text-sm text-white/60">AI interior design platform for faster concept delivery.</p>
          </div>
          <div><p className="font-medium">Product</p><p className="mt-2 text-sm text-white/60">Features</p><p className="text-sm text-white/60">Pricing</p></div>
          <div><p className="font-medium">Company</p><p className="mt-2 text-sm text-white/60">About</p><p className="text-sm text-white/60">Contact</p></div>
          <div><p className="font-medium">Legal</p><p className="mt-2 text-sm text-white/60">Terms</p><p className="text-sm text-white/60">Privacy</p></div>
          <div>
            <p className="font-medium">Newsletter</p>
            <div className="mt-3 flex rounded-xl border border-white/15 bg-white/5 p-1">
              <input placeholder="Email" className="w-full bg-transparent px-2 text-sm outline-none" />
              <button className="rounded-lg bg-electric px-3 py-1 text-xs">Join</button>
            </div>
            <p className="mt-3 text-sm text-white/70">X · Instagram · LinkedIn</p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-sm text-white/50">© 2026 DesignAI. All rights reserved.</div>
      </footer>
    </div>
  );
}
