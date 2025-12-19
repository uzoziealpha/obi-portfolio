export default function FiverrSection() {
  return (
    <section id="fiverr" className="scroll-mt-28 py-12">
      <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/10">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-slate-900 dark:text-slate-50">
          Freelance (Fiverr + Direct)
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300"></p>

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
  );
}
