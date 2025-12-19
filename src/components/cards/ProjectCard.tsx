import useInView from "../hooks/useInView";
import type { Project } from "../data/projects";

export default function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className={[
        "card-3d card-glass",
        "group rounded-3xl p-5 shadow-sm backdrop-blur transition",
        "will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      style={{ transitionDuration: "500ms", transitionDelay: `${i * 90}ms` }}
    >
      <div className="mb-4 overflow-hidden rounded-2xl border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/5">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-[16/10] w-full" />
        )}
      </div>

      <div className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {p.title}
      </div>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {p.desc}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className={[
              "rounded-full px-3 py-1 text-xs",
              "border border-black/10 bg-white/60 text-slate-700",
              "dark:border-white/10 dark:bg-white/10 dark:text-slate-100",
            ].join(" ")}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-slate-500 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
        Open live project →
      </div>

      <div className="mt-2 break-all text-[11px] text-slate-400 dark:text-slate-400">
        {p.link}
      </div>
    </a>
  );
}
