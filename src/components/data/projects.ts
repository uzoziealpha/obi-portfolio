import calmImg from "../../assets/projects/calm.jpg";
import vsImg from "../../assets/projects/vs.jpg";
import tabImg from "../../assets/projects/tableau.jpg";

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  image?: string | null;
};

export const PROJECTS: Project[] = [
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
