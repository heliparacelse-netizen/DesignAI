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
  const [loading, setLoading] = useState(true);

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
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";

    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  const setLocale = (nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
  };

  const value = useMemo(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale]
  );

  return (
    <I18nContext.Provider value={value}>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <p className="text-sm text-white/80">DesignAI is loading…</p>
          </div>
        </div>
      ) : null}
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
