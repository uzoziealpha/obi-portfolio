import ProjectsSection from "./ProjectsSection";
import VideosSection from "./VideosSection";
import FiverrSection from "./FiverrSection";
import ContactSection from "./ContactSection";

export default function Sections() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <ProjectsSection />
      <VideosSection />
      <FiverrSection />
      <ContactSection />
    </div>
  );
}
