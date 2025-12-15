// src/components/Sections.tsx
import { useEffect, useMemo, useRef, useState } from "react";

import calmImg from "../assets/projects/calm.jpg";
import vsImg from "../assets/projects/vs.jpg";
import tabImg from "../assets/projects/tableau.jpg";
/** -------------------------------------------------------
 *  1) DATA
 *  ----------------------------------------------------- */

type Project = {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  image?: string | null;
};

const PROJECTS: Project[] = [
  {
    title: "Calm Candles Essential — E-commerce + Brand System",
    desc: "Website, product pages, bilingual content, launch assets, and social campaigns.",
    tags: ["Brand", "E-commerce", "Content", "Shopify"],
    link: "https://calmcandlessential.store/",
    image: calmImg,
  },
  {
    title: "Vérité Sauvage — Web3 Authenticity Portal",
    desc: "QR verification, product registry, admin tooling, and customer verification UI.",
    tags: ["React", "Web3", "Verification", "MetaMask"],
    link: "https://verite-sauvage-verify-frontend.vercel.app/",
    image: vsImg,
  },
  {
  title: "Tableau — HKMA Liquidity Monitor (Aggregate Balance)",
  desc: "Executive-ready dashboard built from HKMA Daily Monetary Statistics: Aggregate Balance level vs 20D MA, 1D liquidity change, and a 20D Z-score stress signal with latest-day KPI cards.",
  tags: ["Tableau", "FinTech", "Time Series", "KPIs", "Banking Analytics"],
  link: "https://public.tableau.com/app/profile/obinna.uzozie8626/viz/HKMALiquidityMonitorAggregateBalance/HKMALiquidityMonitorAggregateBalance?publish=yes",
  image: tabImg,
},
];

const CONTACT = {
  email: "mailto:uzozie.obi@icloud.com?subject=Hi%20Obi%20%E2%80%94%20Let%E2%80%99s%20talk",
  linkedin: "https://www.linkedin.com/in/obie-u-194942207/",
  cv: "/cv.pdf",
};

type VideoItem = {
  title: string;
  subtitle: string;
  previewMp4: string; // put in /public/videos/previews/
  poster?: string; // optional poster in /public/videos/posters/
  fullUrl: string; // youtube/vimeo/drive/ig link
};

const VIDEOS: VideoItem[] = [
  {
    title: "Calm Candles — Product Reveal",
    subtitle: "Reels / TikTok • 9:16 cut",
    previewMp4: "/videos/previews/v1.mp4",
    poster: "/videos/posters/v1.jpg",
    fullUrl: "https://www.instagram.com/reel/DR1YYm8EcSm/?igsh=empmeDFnaDQxenZx",
  },
  {
    title: "CCE — Luxury Closeups",
    subtitle: "Editorial • fast cuts",
    previewMp4: "/videos/previews/v2.mp4",
    poster: "/videos/posters/v2.jpg",
    fullUrl: "https://www.instagram.com/reel/DPUfsI3k6df/?igsh=aGRncHJqeDRkM2gx",
  },
  {
    title: "Vérité Sauvage — QR Verify",
    subtitle: "Demo • customer flow",
    previewMp4: "/videos/previews/v3.mp4",
    poster: "/videos/posters/v3.jpg",
    fullUrl: "https://www.instagram.com/reel/DSMgngpkyhY/?igsh=MWVuamIydXlhajRtNA%3D%3D",
  },
  {
    title: "AI Product Ad",
    subtitle: "UGC style • captions",
    previewMp4: "/videos/previews/v5.mp4",
    poster: "/videos/posters/v5.jpg",
    fullUrl: "https://www.instagram.com/reel/DRTyk3lkRUw/?igsh=MTBjNGFhcHRsdnV6dg%3D%3D",
  },
  {
    title: "Brand Montage",
    subtitle: "Highlights • best shots",
    previewMp4: "/videos/previews/v6.mp4",
    poster: "/videos/posters/v6.jpg",
    fullUrl: "https://YOUR-LINK-HERE",
  },
];

/** -------------------------------------------------------
 *  2) SMALL ANIMATION HOOK (IntersectionObserver)
 *  ----------------------------------------------------- */

function useInView<T extends HTMLElement>(rootMargin = "-10% 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

/** -------------------------------------------------------
 *  3) PROJECT CARD (as you already had)
 *  ----------------------------------------------------- */

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>();

  return (
    <a
      ref={ref}
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className={[
        "card-3d card-live",
        "group rounded-3xl p-5 shadow-sm backdrop-blur transition",
        "border border-black/10 bg-white/70 hover:bg-white",
        "dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15",
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
              "border border-black/10 bg-white text-slate-700",
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

/** -------------------------------------------------------
 *  4) VIDEO “POSTER WALL” (coverflow like your reference)
 *  ----------------------------------------------------- */

function VideoPosterWall({ items }: { items: VideoItem[] }) {
  const [active, setActive] = useState<number>(Math.min(2, items.length - 1));
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));
  const go = (dir: -1 | 1) => setActive((a) => clamp(a + dir));

  // keyboard arrows (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // swipe support (mobile)
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  }
  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const x = e.touches[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  }
  function onTouchEnd() {
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;

    // threshold
    if (dx > 40) go(-1);
    if (dx < -40) go(1);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black p-6 text-white shadow-sm md:p-10">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_35%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_40%,rgba(239,68,68,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_65%_45%,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_100%,rgba(0,0,0,0.55),transparent_55%)]" />
      </div>

      <div className="relative">
        {/* top pill */}
        <div className="flex justify-center">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] tracking-[0.22em] text-white/90">
            CLICK TO OPEN FULL VERSION
          </span>
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            className={[
              "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm",
              "border border-white/15 bg-white/10 backdrop-blur",
              "hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/10",
            ].join(" ")}
            aria-label="Previous video"
          >
            ←
          </button>

          <div className="text-xs text-white/70">
            {active + 1} / {items.length}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === items.length - 1}
            className={[
              "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm",
              "border border-white/15 bg-white/10 backdrop-blur",
              "hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/10",
            ].join(" ")}
            aria-label="Next video"
          >
            →
          </button>
        </div>

        {/* coverflow stage (CLIPPED + RESPONSIVE) */}
        <div
          className="relative mt-6 h-[520px] md:h-[560px] overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* This inner layer clips the 3D transforms so they don’t overlap the page */}
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((v, idx) => {
              const offset = idx - active;
              const abs = Math.abs(offset);

              // responsive spacing (smaller on mobile)
              const step =
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 120
                  : 175;

              const translateX = offset * step;
              const scale = 1 - abs * 0.12;
              const rotateY = offset * -10;
              const opacity = abs > 3 ? 0 : 1;

              return (
                <a
                  key={v.title}
                  href={v.fullUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className={[
                    "absolute rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur",
                    "transition-transform duration-300 ease-out",
                    "focus:outline-none focus:ring-2 focus:ring-white/30",
                  ].join(" ")}
                  style={{
                    width: "260px",
                    transform: `translateX(${translateX}px) perspective(1100px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex: 50 - abs,
                    opacity,
                  }}
                >
                  <div className="overflow-hidden rounded-[26px]">
                    {/* key={active===idx} forces clean reset when switching */}
                    <video
                      key={`${idx}-${active === idx ? "on" : "off"}`}
                      className="aspect-[9/16] w-full object-cover"
                      src={v.previewMp4}
                      poster={v.poster}
                      muted
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.currentTime = 0;
                        el.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.pause();
                        el.currentTime = 0;
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <div className="text-sm font-semibold text-white">{v.title}</div>
                    <div className="mt-1 text-xs text-white/70">{v.subtitle}</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                      Open full video →
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* dots */}
        <div className="mt-2 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === active ? "bg-white" : "bg-white/30 hover:bg-white/50",
              ].join(" ")}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>

        {/* bottom title */}
        <div className="mt-8 text-center">
          <div className="text-[22px] font-extrabold tracking-[0.22em] text-white/90 md:text-[26px]">
            RECAP • VIDEO WORK
          </div>
        </div>
      </div>
    </div>
  );
}


/** -------------------------------------------------------
 *  5) MAIN SECTIONS
 *  ----------------------------------------------------- */

export default function Sections() {
  const videos = useMemo(() => VIDEOS.slice(0, 6), []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      {/* Projects */}
      <section id="projects" className="scroll-mt-28 py-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-slate-900 dark:text-slate-50">
          Selected Projects
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          These cards open the live work.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>

      {/* Videos (poster wall layout, not grid) */}
      <section id="videos" className="scroll-mt-28 py-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-slate-900 dark:text-slate-50">
          9:16 Social Videos
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          
        </p>

        <div className="mt-6">
          <VideoPosterWall items={videos} />
        </div>
      </section>

      {/* Fiverr */}
      <section id="fiverr" className="scroll-mt-28 py-12">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-slate-900 dark:text-slate-50">
            Freelance (Fiverr + Direct)
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { t: "Brand + Landing Page", d: "Figma → React build, responsive, fast." },
              { t: "E-commerce Content Pack", d: "Product shots, ads, bilingual listings." },
              { t: "Web3 Verification UI", d: "QR flows, customer verify pages, dashboards." },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/10"
              >
                <div className="font-semibold text-slate-900 dark:text-slate-50">
                  {x.t}
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {x.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-28 py-12">
        <div className="rounded-3xl border border-black/10 bg-black p-8 text-white">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Let’s build something
          </h2>
          <p className="mt-2 max-w-2xl text-white/80">
            Add email, LinkedIn, and a one-click CV download.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-white px-5 py-3 text-sm text-black hover:opacity-90"
              href={CONTACT.email}
            >
              Email Me
            </a>
            <a
              className="rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:bg-white/10"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:bg-white/10"
              href={CONTACT.cv}
              download
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
