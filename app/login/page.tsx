"use client";

import RoutePage from "@/components/RoutePage";

export default function LoginPage() {
  return (
    <RoutePage
      title="Connexion"
      description="Sign in to access your generated projects and continue designing."
      ctaHref="/dashboard"
      ctaLabel="Open Dashboard"
    />
  );
}
