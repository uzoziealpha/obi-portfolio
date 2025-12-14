import obiPhoto from "../assets/obi.jpg";
import midjourneyIcon from "../assets/midjourney.png";
import capcutIcon from "../assets/capcut.png";
import metamaskIcon from "../assets/metamask.png";
import powerBIIcon from "../assets/powerbi.png";
import tableauIcon from "../assets/tableau.png";
import adobeCCIcon from "../assets/adobecc.png";

type Skill = {
  name: string;
  icon?: string; // SimpleIcons slug
  localIcon?: string; // local asset import
};

const SKILLS: Skill[] = [
  { name: "React", icon: "react" },
  { name: "Figma", icon: "figma" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Python", icon: "python" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Shopify", icon: "shopify" },

  // local assets (your files)
  { name: "Power BI", localIcon: powerBIIcon },
  { name: "Tableau", localIcon: tableauIcon },
  { name: "Adobe CC", localIcon: adobeCCIcon },
  { name: "MetaMask", localIcon: metamaskIcon },


  { name: "Ethereum", icon: "ethereum" },
  { name: "Solidity", icon: "solidity" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },

  { name: "Midjourney", localIcon: midjourneyIcon },
  { name: "CapCut", localIcon: capcutIcon },
];

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`;
}

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-slate-700 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for roles + freelance (Fiverr)
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Build brands,
            <span className="text-slate-500"> ship products,</span>
            <br />
            tell stories that convert.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            I design and build modern web experiences (React + UI systems),
            produce high-performing social content, and develop Web3 verification
            tools (Vérité Sauvage). I also run Calm Candles Essential end-to-end:
            product, branding, and growth.
          </p>

         <div className="mt-6 flex flex-wrap gap-3">
  <a
    href="#projects"
    className={[
      "rounded-full px-5 py-3 text-sm transition",
      "bg-black text-white hover:opacity-90",
      "dark:bg-white dark:text-black dark:hover:opacity-90",
    ].join(" ")}
  >
    Explore Projects
  </a>

  <a
    href="#videos"
    className={[
      "rounded-full px-5 py-3 text-sm transition",
      "border border-black/10 bg-white text-slate-900 hover:bg-black/5",
      "dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
    ].join(" ")}
  >
    Watch 9:16 Videos
  </a>
</div>

          {/* Logo skills grid */}
          <div className="mt-8">
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-7">
              {SKILLS.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/70 p-3 text-center backdrop-blur"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/70">
                    <img
                      src={s.localIcon ?? (s.icon ? iconUrl(s.icon) : "")}
                      alt={s.name}
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[11px] leading-tight text-slate-600">
                    {s.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-xs text-slate-500">
              + Brand Systems • Web3 Verification • UI Systems • Storytelling • Data Analytics
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
            <img
              src={obiPhoto}
              alt="Obinna Uzozie"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="mt-4 text-sm text-slate-600">
              Brand • UI • Full-Stack • Growth
            </div>
          </div>

          {/* Floating cards */}
          <div className="pointer-events-none absolute -left-6 top-10 hidden w-40 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur md:block">
            <div className="text-xs font-semibold">UI Systems</div>
            <div className="mt-2 h-2 w-24 rounded-full bg-black/10" />
            <div className="mt-2 h-2 w-16 rounded-full bg-black/10" />
          </div>

          <div className="pointer-events-none absolute -right-6 bottom-12 hidden w-44 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur md:block">
            <div className="text-xs font-semibold">Growth Content</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="h-6 rounded-lg bg-black/10" />
              <div className="h-6 rounded-lg bg-black/10" />
              <div className="h-6 rounded-lg bg-black/10" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-black/10" />
    </section>
  );
}
