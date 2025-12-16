import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sections from "./components/Sections";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Sections />
      </main>
      <Analytics />
    </div>
  );
}
