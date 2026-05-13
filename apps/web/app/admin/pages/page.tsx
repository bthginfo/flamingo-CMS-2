import { AdminMetric, AdminPageHeader, AdminPanel } from "../../../components/admin/AdminUi";
import { AdminPagesClient } from "../../../components/admin/AdminPagesClient";
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
        <AdminPagesClient
          pages={pages.map((page) => ({
            ...page,
            sectionCount: sections.filter((section) => section.pageId === page.id).length
          }))}
        />
      </AdminPanel>
    </div>
  );
}
