export const locales = [
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

export type Locale = (typeof locales)[number];

export const languageLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
  de: "DE",
  it: "IT",
  pt: "PT",
  nl: "NL",
  ja: "JA",
  zh: "ZH",
  ko: "KO",
  ar: "AR",
};

type CopyBlock = {
  nav: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  featuresTitle: string;
  features: { title: string; description: string }[];
  uploadTitle: string;
  uploadDescription: string;
  uploadHint: string;
  roomTitle: string;
  roomDescription: string;
  styleTitle: string;
  viewerTitle: string;
  viewerDescription: string;
  controls: { title: string; description: string }[];
  footer: string;
};

const baseCopy: Record<"en" | "fr", CopyBlock> = {
  en: {
    nav: ["Product", "Studio", "Process", "Contact"],
    heroTitle: "Design your dream room with DesignAI.",
    heroSubtitle:
      "Transform any space instantly with AI-guided styling, spatial intelligence, and immersive 3D previews.",
    heroCtaPrimary: "Start a new room",
    heroCtaSecondary: "Watch demo",
    featuresTitle: "Why creators choose DesignAI",
    features: [
      {
        title: "AI layout intelligence",
        description: "Predictive layout suggestions optimized for flow, lighting, and comfort.",
      },
      {
        title: "Style blending",
        description: "Fuse modern, minimal, and classic palettes into curated design presets.",
      },
      {
        title: "Client-ready exports",
        description: "Generate shareable previews, storyboards, and moodboards in seconds.",
      },
    ],
    uploadTitle: "Upload your space",
    uploadDescription:
      "Drop a photo or 3D scan of your room to start exploring new designs.",
    uploadHint: "Supported: JPG, PNG, HEIC · Up to 25MB",
    roomTitle: "Pick a room type",
    roomDescription: "Tailor lighting and furnishings to the right space.",
    styleTitle: "Choose a style direction",
    viewerTitle: "Live 3D Room Preview",
    viewerDescription:
      "Inspect proportions, materials, and lighting with interactive orbit controls.",
    controls: [
      {
        title: "Orbit, zoom, pan",
        description: "Precise camera control for every angle and perspective.",
      },
      {
        title: "Auto-rotation",
        description: "Let DesignAI rotate the room for a cinematic showcase.",
      },
      {
        title: "Fullscreen capture",
        description: "Expand to immersive view and capture high-res screenshots.",
      },
    ],
    footer: "DesignAI © 2024. Built for visionary interior teams.",
  },
  fr: {
    nav: ["Produit", "Studio", "Processus", "Contact"],
    heroTitle: "Imaginez votre pièce idéale avec DesignAI.",
    heroSubtitle:
      "Transformez chaque espace grâce à l’IA, des styles guidés et des aperçus 3D immersifs.",
    heroCtaPrimary: "Créer une nouvelle pièce",
    heroCtaSecondary: "Voir la démo",
    featuresTitle: "Pourquoi les créateurs choisissent DesignAI",
    features: [
      {
        title: "IA pour l’agencement",
        description: "Des propositions d’aménagement optimisées pour la lumière et le confort.",
      },
      {
        title: "Fusion des styles",
        description: "Mélangez moderne, minimal et classique dans des presets premium.",
      },
      {
        title: "Exports clients",
        description: "Générez des moodboards et des storyboards en quelques secondes.",
      },
    ],
    uploadTitle: "Téléchargez votre espace",
    uploadDescription:
      "Déposez une photo ou un scan 3D de votre pièce pour commencer.",
    uploadHint: "Formats : JPG, PNG, HEIC · Jusqu’à 25 Mo",
    roomTitle: "Choisissez un type de pièce",
    roomDescription: "Adaptez la lumière et le mobilier à votre espace.",
    styleTitle: "Choisissez un style",
    viewerTitle: "Aperçu 3D en direct",
    viewerDescription:
      "Explorez les volumes, matériaux et lumières avec des contrôles interactifs.",
    controls: [
      {
        title: "Orbit, zoom, pan",
        description: "Contrôle précis pour chaque angle et perspective.",
      },
      {
        title: "Rotation automatique",
        description: "Laissez DesignAI tourner la pièce en mode cinéma.",
      },
      {
        title: "Capture plein écran",
        description: "Passez en immersion et capturez des screenshots HD.",
      },
    ],
    footer: "DesignAI © 2024. Conçu pour les studios visionnaires.",
  },
};

export const copy: Record<Locale, CopyBlock> = locales.reduce(
  (acc, locale) => {
    acc[locale] = baseCopy[locale as "en" | "fr"] ?? baseCopy.en;
    return acc;
  },
  {} as Record<Locale, CopyBlock>
);

export const roomTypes = [
  "Salon",
  "Chambre",
  "Cuisine",
  "Salle de bain",
  "Bureau",
  "Loft",
  "Entrée",
];

export const styleOptions = [
  "Modern",
  "Minimal",
  "Scandinavian",
  "Industrial",
  "Luxury",
  "Classic",
];
