export const supportedLocales = [
  "fr",
  "en",
  "es",
  "de",
  "it",
  "pt",
  "nl",
  "ja",
  "zh",
  "ko",
  "ar",
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
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  ar: "العربية",
};

export type MessageCatalog = {
  nav: { produit: string; studio: string; processus: string; connexion: string };
  hero: { title: string; subtitle: string; create: string; demo: string; badge: string };
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
    upgrade: string;
    projectsCreated: string;
    generationsLeft: string;
    storageUsed: string;
  };
};

const fr: MessageCatalog = {
  nav: { produit: "Produit", studio: "Studio", processus: "Processus", connexion: "Connexion" },
  hero: {
    title: "Le design intérieur IA qui impressionne vos clients.",
    subtitle: "DesignAI transforme n’importe quelle pièce en concept premium grâce à une génération rapide, 3D et collaborative.",
    create: "Commencer à créer",
    demo: "Voir la démo",
    badge: "AI powered",
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
    upgrade: "Passer au plan supérieur",
    projectsCreated: "Projets créés",
    generationsLeft: "Générations restantes",
    storageUsed: "Stockage utilisé",
  },
};

const en: MessageCatalog = {
  nav: { produit: "Product", studio: "Studio", processus: "Process", connexion: "Login" },
  hero: {
    title: "AI interior design that wins clients faster.",
    subtitle: "DesignAI turns any room into a premium concept with fast generation, live 3D and collaborative workflows.",
    create: "Start Creating",
    demo: "Watch Demo",
    badge: "AI powered",
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
    upgrade: "Upgrade plan",
    projectsCreated: "Projects created",
    generationsLeft: "Generations left",
    storageUsed: "Storage used",
  },
};

const catalogs: Record<SupportedLocale, MessageCatalog> = {
  fr,
  en,
  es: en,
  de: en,
  it: en,
  pt: en,
  nl: en,
  ja: en,
  zh: en,
  ko: en,
  ar: en,
};

export function getMessages(locale: SupportedLocale): MessageCatalog {
  return catalogs[locale] ?? catalogs[defaultLocale];
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
  if (normalized.startsWith("ja")) return "ja";
  if (normalized.startsWith("zh")) return "zh";
  if (normalized.startsWith("ko")) return "ko";
  if (normalized.startsWith("ar")) return "ar";

  return defaultLocale;
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}
