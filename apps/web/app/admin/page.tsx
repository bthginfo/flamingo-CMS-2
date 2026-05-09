import { AlertTriangle, CheckCircle2, Clock, FilePlus2 } from "lucide-react";
import { pages, sections } from "../../lib/seed";

const cards = [
  { label: "Published Pages", value: pages.length, icon: CheckCircle2 },
  { label: "Aktive Sections", value: sections.filter((item) => item.visible).length, icon: FilePlus2 },
  { label: "Unveröffentlichte Drafts", value: 0, icon: Clock },
  { label: "SEO Hinweise", value: 2, icon: AlertTriangle }
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Dashboard</h1>
          <p className="mt-2 text-black/60">
            Status, Drafts, Formulareingänge, SEO-Hinweise und Schnellaktionen.
          </p>
        </div>
        <a className="rounded-full bg-flamingo px-5 py-3 text-sm font-black text-white" href="/admin/pages/new">
          Neue Seite
        </a>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <Icon className="text-flamingo" size={22} />
              <p className="mt-5 text-3xl font-black">{card.value}</p>
              <p className="mt-1 text-sm text-black/55">{card.label}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Letzte Änderungen</h2>
          <div className="mt-5 grid gap-3">
            {sections.slice(0, 5).map((section) => (
              <div key={section.id} className="flex items-center justify-between rounded-xl bg-black/[0.03] p-4">
                <div>
                  <p className="font-bold">{section.label}</p>
                  <p className="text-sm text-black/50">Section auf {section.pageId}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  published
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-ink p-6 text-white shadow-sm">
          <h2 className="text-xl font-black">Schnellaktionen</h2>
          <div className="mt-5 grid gap-3">
            {["Hero bearbeiten", "Section hinzufügen", "Navigation bearbeiten", "Design ändern"].map((item) => (
              <button key={item} className="rounded-xl bg-white/10 p-4 text-left text-sm font-bold transition hover:bg-white/15">
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
