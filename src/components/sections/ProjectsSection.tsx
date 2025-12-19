import { PROJECTS } from "../data/projects";
import ProjectCard from "../cards/ProjectCard";

export default function ProjectsSection() {
  return (
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
  );
}
