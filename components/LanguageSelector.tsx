"use client";

import { localeLabel, supportedLocales, type SupportedLocale } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <label className="rounded-xl bg-white/5 px-4 py-2 backdrop-blur transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-glow">
      <span className="sr-only">Language selector</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as SupportedLocale)}
        className="bg-transparent text-sm text-white outline-none transition duration-200 ease-in-out"
      >
        {supportedLocales.map((item) => (
          <option key={item} value={item}>
            {localeLabel[item]}{item === locale ? " ✓" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
