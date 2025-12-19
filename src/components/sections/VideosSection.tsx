import { useMemo } from "react";
import { VIDEOS } from "../data/videos";
import VideoPosterWall from "../cards/VideoPosterWall";

export default function VideosSection() {
  const videos = useMemo(() => VIDEOS.slice(0, 6), []);

  return (
    <section id="videos" className="scroll-mt-28 py-12">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-slate-900 dark:text-slate-50">
        9:16 Social Videos
      </h2>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        Tap arrows or swipe on mobile. Hover to preview.
      </p>

      <div className="mt-6">
        <VideoPosterWall items={videos} />
      </div>
    </section>
  );
}
