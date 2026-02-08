"use client";

import { useEffect, useState } from "react";

type ThemeOption = "midnight" | "light" | "graphite";

const themeLabels: Record<ThemeOption, string> = {
  midnight: "Midnight",
  light: "Light",
  graphite: "Graphite",
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeOption>("midnight");

  useEffect(() => {
    const stored = window.localStorage.getItem("designai-theme") as ThemeOption | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
    } else {
      document.documentElement.dataset.theme = "midnight";
    }
  }, []);

  const updateTheme = (nextTheme: ThemeOption) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("designai-theme", nextTheme);
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs">
      <span className="text-white/60">Theme</span>
      <div className="flex gap-1">
        {(Object.keys(themeLabels) as ThemeOption[]).map((option) => (
          <button
            key={option}
            onClick={() => updateTheme(option)}
            className={`rounded-full px-2 py-1 transition ${
              theme === option
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white"
            }`}
            type="button"
          >
            {themeLabels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
