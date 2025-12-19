import Header from "./components/Header";
import Hero from "./components/Hero";
import Sections from "./components/sections/Sections";


export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Sections />
      </main>
    </div>
  );
}
