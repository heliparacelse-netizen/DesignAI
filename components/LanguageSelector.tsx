"use client";

import { localeLabel, supportedLocales, type SupportedLocale } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <label className="rounded-xl bg-white/5 px-4 py-2 backdrop-blur hover:bg-white/10">
      <span className="sr-only">Language selector</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as SupportedLocale)}
        className="bg-transparent text-sm text-white outline-none"
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
