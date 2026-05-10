import { AdminMetric, AdminPageHeader, AdminPanel, StatusPill } from "../../../components/admin/AdminUi";
import { pages } from "../../../lib/seed";

function score(pageTitle?: string, description?: string) {
  let value = 60;
  if (pageTitle && pageTitle.length >= 20 && pageTitle.length <= 62) value += 20;
  if (description && description.length >= 80 && description.length <= 160) value += 20;
  return Math.min(value, 100);
}

export default function SeoPage() {
  const scores = pages.map((page) => score(page.seo.metaTitle, page.seo.metaDescription));
  const average = Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length);

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        eyebrow="SEO"
        title="Search, Social Preview und strukturierte Daten pro Seite."
        description="Meta Titles, Descriptions, Canonicals, Robots und OG Assets werden als redaktioneller Workflow sichtbar."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <AdminMetric label="SEO Score" value={`${average}%`} detail="Durchschnitt aller Seiten" />
        <AdminMetric label="Indexable" value={pages.length} detail="Routen mit robots index" />
        <AdminMetric label="Warnings" value="2" detail="Lange oder kurze Snippets" />
        <AdminMetric label="Schema" value="3" detail="LocalBusiness, Website, FAQ" />
      </div>

      <AdminPanel title="Page SEO">
        <div className="grid gap-4">
          {pages.map((page) => {
            const pageScore = score(page.seo.metaTitle, page.seo.metaDescription);
            return (
              <article key={page.id} className="rounded-lg border border-black/10 bg-white p-5">
                <div className="grid gap-4 lg:grid-cols-[220px_1fr_110px] lg:items-start">
                  <div>
                    <p className="text-lg font-black">{page.title}</p>
                    <p className="mt-1 text-sm text-black/50">{page.fullPath}</p>
                    <div className="mt-3">
                      <StatusPill tone={pageScore > 85 ? "live" : "warn"}>{pageScore}%</StatusPill>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <label className="grid gap-2 text-sm font-bold">
                      Meta Title
                      <input className="rounded-md border border-black/10 bg-paper p-3" defaultValue={page.seo.metaTitle} />
                    </label>
                    <label className="grid gap-2 text-sm font-bold">
                      Meta Description
                      <textarea className="min-h-[88px] rounded-md border border-black/10 bg-paper p-3" defaultValue={page.seo.metaDescription} />
                    </label>
                  </div>
                  <div className="rounded-md bg-paper p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-black/40">Preview</p>
                    <p className="mt-3 text-sm font-black text-blue-700">{page.seo.metaTitle}</p>
                    <p className="mt-1 text-xs text-emerald-700">flamingomedia.online{page.fullPath}</p>
                    <p className="mt-2 text-xs leading-5 text-black/55">{page.seo.metaDescription}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </AdminPanel>
    </div>
  );
}
