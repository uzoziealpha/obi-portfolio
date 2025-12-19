import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";
import type { VideoItem } from "../data/videos";

export default function VideoPosterWall({ items }: { items: VideoItem[] }) {
  const [active, setActive] = useState<number>(Math.min(2, items.length - 1));
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  }
  function onTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current == null) return;
    const x = e.touches[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  }
  function onTouchEnd() {
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    if (dx > 40) go(-1);
    if (dx < -40) go(1);
  }

  const step = useMemo(() => (isMobile ? 120 : 175), [isMobile]);

  return (
    <div
      className={[
        "relative isolate z-0 overflow-hidden rounded-3xl",
        "border border-black/10 bg-black p-6 text-white shadow-sm md:p-10",
      ].join(" ")}
    >
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_35%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_40%,rgba(239,68,68,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_65%_45%,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_100%,rgba(0,0,0,0.55),transparent_55%)]" />
      </div>

      <div className="relative">
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

        {/* stage */}
        <div
          className="relative mt-6 h-[520px] md:h-[560px] overflow-hidden touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((v, idx) => {
              const offset = idx - active;
              const abs = Math.abs(offset);

              const translateX = offset * step;
              const scale = 1 - abs * 0.12;
              const rotateY = offset * -10;
              const opacity = abs > 3 ? 0 : 1;

              // keep below sticky header by keeping zIndex small inside isolate context
              const zIndex = 20 - abs;

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
                    zIndex,
                    opacity,
                  }}
                >
                  <div className="overflow-hidden rounded-[26px]">
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

        <div className="mt-8 text-center">
          <div className="text-[22px] font-extrabold tracking-[0.22em] text-white/90 md:text-[26px]">
            RECAP • VIDEO WORK
          </div>
        </div>
      </div>
    </div>
  );
}
