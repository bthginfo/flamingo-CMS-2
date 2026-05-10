import { AlertTriangle, CheckCircle2, Clock, FilePlus2 } from "lucide-react";
import { AdminMetric, AdminPageHeader, AdminPanel, StatusPill } from "../../components/admin/AdminUi";
import { collections, pages, sections } from "../../lib/seed";

const cards = [
  { label: "Published Pages", value: pages.length, detail: "inkl. Legal und Funding", icon: CheckCircle2 },
  { label: "Aktive Sections", value: sections.filter((item) => item.visible).length, detail: "aus Seed und CMS Runtime", icon: FilePlus2 },
  { label: "Collections", value: collections.length, detail: "Referenzen, Items, Detailseiten", icon: Clock },
  { label: "SEO Hinweise", value: 2, detail: "Meta-Längen und OG Bilder", icon: AlertTriangle }
];

export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <AdminPageHeader
        eyebrow="Tenant Admin"
        title="Content, Design und Launch an einem Ort."
        description="Dashboard fuer Seiten, Sections, Medien, SEO, Formulare und schnelle Publish-Entscheidungen."
        action={
          <a className="showcase-button showcase-button-light" href="/admin/pages/new">
            Neue Seite
          </a>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <Icon className="text-flamingo" size={22} />
              <p className="mt-5 text-4xl font-black">{card.value}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-black/40">{card.label}</p>
              <p className="mt-3 text-sm text-black/55">{card.detail}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <AdminPanel title="Letzte Aenderungen">
          <div className="grid gap-3">
            {sections.slice(0, 6).map((section, index) => (
              <div key={section.id} className="grid gap-4 rounded-md border border-black/10 bg-paper p-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                <span className="font-mono text-xs text-black/35">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-black">{section.label}</p>
                  <p className="text-sm text-black/50">{section.type} auf {section.pageId}</p>
                </div>
                <StatusPill>published</StatusPill>
              </div>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel title="Launch Readiness" tone="dark">
          <div className="grid gap-3">
            <AdminMetric label="Build" value="Ready" detail="Next.js Production Build gruen" dark />
            <AdminMetric label="Database" value="Neon" detail="Seeds und Form Submissions aktiv" dark />
            <AdminMetric label="Storage" value="Blob" detail="Media Upload API verbunden" dark />
          </div>
        </AdminPanel>
      </div>
    </div>
  );
}
