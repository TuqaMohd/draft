"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

type Theme = "dark" | "light" | "obsidian";

const ORDER: Theme[] = ["dark", "light", "obsidian"];

const META: Record<Theme, { icon: typeof Sun; next: string }> = {
  dark: { icon: Moon, next: "light" },
  light: { icon: Sun, next: "obsidian" },
  obsidian: { icon: Sparkles, next: "dark" },
};

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("amanah-theme", theme);
}

export default function ThemeToggle() {
  // Mirrors what ThemeScript already set on <html> before hydration.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" || current === "obsidian" ? current : "dark");
  }, []);

  function toggle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(next);
    applyTheme(next);
  }

  const { icon: Icon, next } = META[theme];

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-transparent text-text-2 transition-colors hover:border-border hover:text-text"
    >
      <Icon size={18} />
    </button>
  );
}
