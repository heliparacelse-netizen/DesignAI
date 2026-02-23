import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export const supportedLocales = ["en", "fr"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en";
export const storageKey = "designai-language";

const dictionaries = {
  en,
  fr,
} as const;

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export function detectBrowserLocale(browserLocale: string | undefined): SupportedLocale {
  if (!browserLocale) return defaultLocale;
  return browserLocale.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function getMessages(locale: string) {
  if (isSupportedLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}
