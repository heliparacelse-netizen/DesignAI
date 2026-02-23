import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { locales, type Locale } from "@/data/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocalePage({
  params,
}: {
  params: { locale: Locale };
}) {
  if (!locales.includes(params.locale)) {
    redirect("/en");
  }

  return <LandingPage locale={params.locale} />;
}
