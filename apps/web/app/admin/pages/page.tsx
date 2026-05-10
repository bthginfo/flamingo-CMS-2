import { AdminMetric, AdminPageHeader, AdminPanel, StatusPill } from "../../../components/admin/AdminUi";
import { pages, sections } from "../../../lib/seed";

export default function AdminPages() {
  return (
    <div className="grid gap-6">
      <AdminPageHeader
        eyebrow="Pages"
        title="Seitenstruktur mit Preview und Publish-Kontrolle."
        description="Slugs, Seitentypen, SEO, Section-Anzahl und Status werden auf einen Blick sichtbar."
        action={
          <a className="showcase-button showcase-button-light" href="/admin/pages/new">
            Neue Seite
          </a>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminMetric label="Seiten" value={pages.length} detail="publizierte Routen" />
        <AdminMetric label="Homepage" value="/" detail="aktive Root Route" />
        <AdminMetric label="Sections" value={sections.length} detail="gesamt im Seed" />
      </div>

      <AdminPanel title="Page Inventory">
        <div className="overflow-hidden rounded-lg border border-black/10">
          {pages.map((page) => {
            const pageSections = sections.filter((section) => section.pageId === page.id);
            return (
              <a
                key={page.id}
                className="grid gap-4 border-b border-black/5 bg-white p-5 transition last:border-0 hover:bg-paper md:grid-cols-[1fr_150px_120px_120px_110px]"
                href={`/admin/pages/${page.id}`}
              >
                <div>
                  <p className="text-lg font-black">{page.title}</p>
                  <p className="mt-1 text-sm text-black/50">{page.fullPath}</p>
                </div>
                <p className="text-sm font-bold text-black/60">{page.type}</p>
                <p className="text-sm font-bold text-black/60">{pageSections.length} Sections</p>
                <StatusPill tone={page.status === "published" ? "live" : "draft"}>{page.status}</StatusPill>
                <p className="text-sm font-black text-black/45">Bearbeiten</p>
              </a>
            );
          })}
        </div>
      </AdminPanel>
    </div>
  );
}
