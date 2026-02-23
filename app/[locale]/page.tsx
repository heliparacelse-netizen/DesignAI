import { notFound } from "next/navigation";
import MarketingPage from "@/components/MarketingPage";
import { isSupportedLocale, supportedLocales, type SupportedLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  return <MarketingPage locale={params.locale as SupportedLocale} />;
}
