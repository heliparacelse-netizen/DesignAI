"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  defaultLocale,
  detectBrowserLocale,
  getMessages,
  isSupportedLocale,
  storageKey,
  type MessageCatalog,
  type SupportedLocale,
} from "@/lib/i18n";

type I18nContextValue = {
  locale: SupportedLocale;
  messages: MessageCatalog;
  setLocale: (locale: SupportedLocale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<SupportedLocale>(defaultLocale);

  useEffect(() => {
    const pathSegment = pathname.split("/")[1];
    const pathLocale = isSupportedLocale(pathSegment) ? pathSegment : null;
    const stored = window.localStorage.getItem(storageKey);
    const storedLocale = stored && isSupportedLocale(stored) ? stored : null;
    const detected = detectBrowserLocale(navigator.language);
    const nextLocale = pathLocale ?? storedLocale ?? detected;

    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
    document.documentElement.lang = nextLocale;
  }, [pathname]);

  const setLocale = (nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
