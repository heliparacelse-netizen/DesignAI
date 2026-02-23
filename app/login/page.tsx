"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";
const appleEnabled = process.env.NEXT_PUBLIC_APPLE_ENABLED === "true";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.ok) {
      window.location.href = result.url || "/dashboard";
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="mt-2 text-sm text-white/70">Sign in to access your workspace.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-white/80">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-[#101726] px-3 py-2 outline-none ring-electric/40 focus:ring"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-white/80">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-[#101726] px-3 py-2 outline-none ring-electric/40 focus:ring"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-electric px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Continue with email"}
          </button>
        </form>

        {(googleEnabled || appleEnabled) ? (
          <div className="mt-5">
            <div className="mb-3 text-center text-xs text-white/60">or continue with</div>
            <div className="space-y-2">
              {googleEnabled ? (
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm"
                >
                  Continue with Google
                </button>
              ) : null}

              {appleEnabled ? (
                <button
                  type="button"
                  onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm"
                >
                  Continue with Apple
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        <p className="mt-6 text-center text-sm text-white/70">
          Don&apos;t have an account? <Link href="/register" className="text-aurora hover:underline">Create one</Link>
        </p>
      </section>
    </main>
  );
}
