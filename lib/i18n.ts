export const supportedLocales = [
  "fr",
  "en",
  "es",
  "de",
  "it",
  "pt",
  "nl",
  "ja",
  "zh-CN",
  "ko",
  "ar-SA",
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
  "zh-CN": "简体中文",
  ko: "한국어",
  "ar-SA": "العربية",
};

export type MessageCatalog = {
  nav: { product: string; studio: string; pricing: string; login: string; startFree: string };
  hero: { title: string; subtitle: string; create: string; demo: string; trust: string };
  cta: string;
  pages: {
    dashboard: string;
    projects: string;
    history: string;
    viewer: string;
    settings: string;
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
  nav: { product: "Produit", studio: "Studio", pricing: "Tarifs", login: "Connexion", startFree: "Commencer" },
  hero: {
    title: "Transformez n’importe quelle pièce avec l’IA en quelques secondes",
    subtitle: "Téléchargez une photo. Notre IA la redesign dans votre style, instantanément.",
    create: "Commencer à créer",
    demo: "Voir la démo",
    trust: "✦ Déjà adopté par 2 400+ designers & architectes",
  },
  cta: "Créer votre première pièce",
  pages: {
    dashboard: "Tableau de bord",
    projects: "Projets",
    history: "Historique",
    viewer: "Visionneuse 3D",
    settings: "Paramètres",
    newProject: "Nouveau projet",
    logout: "Déconnexion",
    usage: "générations utilisées",
    greeting: "Bonjour, Camille 👋",
    upgrade: "Passer en Premium",
    projectsCreated: "Projets créés",
    generationsLeft: "Générations restantes",
    storageUsed: "Stockage utilisé",
  },
};

const en: MessageCatalog = {
  nav: { product: "Product", studio: "Studio", pricing: "Pricing", login: "Login", startFree: "Start Free" },
  hero: {
    title: "Transform any room with AI in seconds",
    subtitle: "Upload a photo. Our AI redesigns it in your style. Instantly.",
    create: "Start Creating",
    demo: "Watch Demo",
    trust: "✦ Trusted by 2,400+ designers & architects",
  },
  cta: "Create your first room",
  pages: {
    dashboard: "Dashboard",
    projects: "Projects",
    history: "History",
    viewer: "3D Viewer",
    settings: "Settings",
    newProject: "New Project",
    logout: "Logout",
    usage: "generations used",
    greeting: "Hello, Camille 👋",
    upgrade: "Upgrade Plan",
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
  "zh-CN": en,
  ko: en,
  "ar-SA": en,
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
  if (normalized.startsWith("zh")) return "zh-CN";
  if (normalized.startsWith("ko")) return "ko";
  if (normalized.startsWith("ar")) return "ar-SA";

  return defaultLocale;
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}
