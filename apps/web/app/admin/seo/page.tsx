import { pages } from "../../../lib/seed";

export default function SeoPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">SEO</h1>
      <p className="mt-2 text-black/60">
        Globale SEO Defaults, Page SEO, OG Daten, Canonicals, Robots und Schema.org Overrides.
      </p>
      <div className="mt-8 grid gap-4">
        {pages.map((page) => (
          <article key={page.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[220px_1fr_1fr]">
              <div>
                <p className="font-black">{page.title}</p>
                <p className="text-sm text-black/50">{page.fullPath}</p>
              </div>
              <input className="rounded-xl border border-black/10 p-3" defaultValue={page.seo.metaTitle} />
              <input className="rounded-xl border border-black/10 p-3" defaultValue={page.seo.metaDescription} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
