import { CONTACT } from "../data/contact";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 py-12">
      <div className="rounded-3xl border border-black/10 bg-black p-8 text-white">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Let’s build something
        </h2>
        <p className="mt-2 max-w-2xl text-white/80">
          Email, LinkedIn, and a one-click CV download.
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
  );
}
