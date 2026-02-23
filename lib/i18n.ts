export const supportedLocales = [
  "fr",
  "en",
  "es",
  "de",
  "it",
  "pt",
  "nl",
  "ar-SA",
  "ko",
  "zh-CN",
  "ja",
  "tr",
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const storageKey = "designai-language";
export const defaultLocale: SupportedLocale = "fr";

export const localeLabel: Record<SupportedLocale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  "ar-SA": "العربية (السعودية)",
  ko: "한국어",
  "zh-CN": "简体中文",
  ja: "日本語",
  tr: "Türkçe",
};

export type MessageCatalog = {
  nav: { produit: string; studio: string; processus: string; connexion: string };
  hero: { title: string; subtitle: string; create: string; demo: string };
  cta: string;
  pages: {
    studio: string;
    processus: string;
    produit: string;
    login: string;
    register: string;
    dashboard: string;
    newProject: string;
    logout: string;
    usage: string;
    greeting: string;
  };
};

const catalogs: Record<"fr" | "en", MessageCatalog> = {
  fr: {
    nav: { produit: "Produit", studio: "Studio", processus: "Processus", connexion: "Connexion" },
    hero: {
      title: "Des intérieurs propulsés par l’IA, pensés pour l’excellence.",
      subtitle: "DesignAI transforme chaque espace en concept premium grâce à l’IA.",
      create: "Commencer à créer",
      demo: "Voir la démo",
    },
    cta: "Créer votre première pièce",
    pages: {
      studio: "Studio",
      processus: "Processus",
      produit: "Produit",
      login: "Connexion",
      register: "Inscription",
      dashboard: "Tableau de bord",
      newProject: "Nouveau projet",
      logout: "Déconnexion",
      usage: "générations utilisées",
      greeting: "Bonjour, Camille 👋",
    },
  },
  en: {
    nav: { produit: "Product", studio: "Studio", processus: "Process", connexion: "Login" },
    hero: {
      title: "AI-powered interiors, premium by design.",
      subtitle: "DesignAI transforms every room into a premium concept in seconds.",
      create: "Start Creating",
      demo: "Watch Demo",
    },
    cta: "Create your first room",
    pages: {
      studio: "Studio",
      processus: "Process",
      produit: "Product",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      newProject: "New Project",
      logout: "Logout",
      usage: "generations used",
      greeting: "Hello, Camille 👋",
    },
  },
};

export function getMessages(locale: SupportedLocale): MessageCatalog {
  return locale === "fr" ? catalogs.fr : catalogs.en;
}

export function detectBrowserLocale(browserLocale?: string): SupportedLocale {
  if (!browserLocale) return defaultLocale;
  const normalized = browserLocale.toLowerCase();

  if (normalized.startsWith("fr")) return "fr";
  if (normalized.startsWith("en")) return "en";
  if (normalized.startsWith("es")) return "es";
  if (normalized.startsWith("de")) return "de";
  if (normalized.startsWith("it")) return "it";
  if (normalized.startsWith("pt")) return "pt";
  if (normalized.startsWith("nl")) return "nl";
  if (normalized.startsWith("ar")) return "ar-SA";
  if (normalized.startsWith("ko")) return "ko";
  if (normalized.startsWith("zh")) return "zh-CN";
  if (normalized.startsWith("ja")) return "ja";
  if (normalized.startsWith("tr")) return "tr";

  return defaultLocale;
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}
