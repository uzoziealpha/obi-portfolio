import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs",
        "border border-black/10 bg-white/70 text-slate-900 backdrop-blur",
        "hover:bg-white transition",
        "dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
        "focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20",
      ].join(" ")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="text-base">{isDark ? "🌙" : "☀️"}</span>
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
