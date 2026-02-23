"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  defaultLocale,
  detectBrowserLocale,
  isSupportedLocale,
  storageKey,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n";

const labels: Record<SupportedLocale, string> = {
  en: "English",
  fr: "Français",
};

function getLocaleFromPath(pathname: string): SupportedLocale | null {
  const segment = pathname.split("/")[1];
  return isSupportedLocale(segment) ? segment : null;
}

export default function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<SupportedLocale>(defaultLocale);

  const resolvedPathLocale = useMemo(
    () => getLocaleFromPath(pathname),
    [pathname]
  );

  useEffect(() => {
    if (resolvedPathLocale) {
      setLocale(resolvedPathLocale);
      window.localStorage.setItem(storageKey, resolvedPathLocale);
      return;
    }

    const stored = window.localStorage.getItem(storageKey);
    const storedLocale = isSupportedLocale(stored ?? "") ? stored : null;
    const detected = detectBrowserLocale(navigator.language);
    const initialLocale = storedLocale ?? detected;

    setLocale(initialLocale);
    window.localStorage.setItem(storageKey, initialLocale);

    if (pathname === "/") {
      router.replace(`/${initialLocale}`);
    }
  }, [pathname, resolvedPathLocale, router]);

  const handleLocaleChange = (nextLocale: SupportedLocale) => {
    setLocale(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);

    if (resolvedPathLocale) {
      router.push(pathname.replace(`/${resolvedPathLocale}`, `/${nextLocale}`));
      return;
    }

    if (pathname === "/") {
      router.push(`/${nextLocale}`);
    }
  };

  return (
    <label className="rounded-xl bg-white/5 px-4 py-2 backdrop-blur hover:bg-white/10">
      <span className="sr-only">Language selector</span>
      <select
        value={locale}
        onChange={(event) => handleLocaleChange(event.target.value as SupportedLocale)}
        className="bg-transparent text-sm text-white outline-none"
      >
        {supportedLocales.map((item) => (
          <option
            key={item}
            value={item}
            className={item === locale ? "font-semibold" : "font-normal"}
          >
            {labels[item]}{item === locale ? " ✓" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
