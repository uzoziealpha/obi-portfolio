import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "videos", label: "9:16 Videos" },
  { id: "fiverr", label: "Freelance" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [active, setActive] = useState<string>("top");
  const ids = useMemo(() => LINKS.map((l) => l.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.7] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div
          className={[
            "flex items-center justify-between rounded-2xl px-4 py-3 shadow-sm backdrop-blur",
            "border border-black/10 bg-white/70",
            "dark:border-white/10 dark:bg-white/10",
          ].join(" ")}
        >
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            {/* Avatar / logo image */}
            <div className="h-9 w-9 overflow-hidden rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/10">
              <img
                src="/avatar.jpg"
                alt="Obi Uzozie"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            <div className="leading-tight">
              <div className="font-semibold text-slate-900 dark:text-white">
                Obi Uzozie
              </div>
              <div className="text-xs text-slate-600 dark:text-white/70">
                Design • Full-Stack • Brand • Data Analyst
              </div>
            </div>
          </div>

          {/* Center: nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const isActive = active === l.id;

              return (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={[
                    "rounded-full px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-slate-700 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10",
                  ].join(" ")}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>

          {/* Right: CTAs + theme toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo("projects")}
              className={[
                "rounded-full px-4 py-2 text-sm transition",
                "border border-black/10 bg-white hover:bg-black/5",
                "dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
              ].join(" ")}
            >
              View Work
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className={[
                "rounded-full px-4 py-2 text-sm transition",
                "bg-black text-white hover:opacity-90",
                "dark:bg-white dark:text-black",
              ].join(" ")}
            >
              Hire Me
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
