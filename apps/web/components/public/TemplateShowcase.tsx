import { industries, styles, type IndustryKey, type StyleKey } from "@flamingo/shared";

type IndustryMeta = {
  key: IndustryKey;
  label: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  modules: string[];
};

const industryMeta: Record<IndustryKey, Omit<IndustryMeta, "key">> = {
  restaurant: {
    label: "Restaurant",
    tagline: "Speisekarte, Reservierung, Events",
    description: "Food-first Seiten mit Menu, Galerie, Buchungs-CTA und saisonalen Aktionen.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    accent: "#f06472",
    modules: ["Menu", "Reservierung", "Events"]
  },
  hotel: {
    label: "Hotel",
    tagline: "Zimmer, Angebote, Direktbuchung",
    description: "Mehrseitige Hotelstruktur mit Zimmern, Spa, Lage und Buchungsstrecke.",
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=80",
    accent: "#ff8a65",
    modules: ["Zimmer", "Angebote", "Spa"]
  },
  tourism: {
    label: "Tourismus",
    tagline: "Touren, Guides, Erlebnisse",
    description: "Kataloge fuer Touren, Regionen, Guides und buchbare Erlebnisse.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80",
    accent: "#7dd3c7",
    modules: ["Touren", "Guides", "Buchung"]
  },
  salon: {
    label: "Salon",
    tagline: "Treatments, Looks, Online-Termin",
    description: "Editoriale Beauty-Seiten mit Preislisten, Team und Buchungsintegration.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80",
    accent: "#f472b6",
    modules: ["Treatments", "Team", "Booking"]
  },
  trades: {
    label: "Handwerk",
    tagline: "Leistungen, Referenzen, Anfrage",
    description: "Lead-fokussierte Seiten fuer lokale Suche, Vertrauen und schnelle Anfragen.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80",
    accent: "#60a5fa",
    modules: ["Leistungen", "Referenzen", "Notdienst"]
  },
  consulting: {
    label: "Beratung",
    tagline: "Expertise, Cases, Termin",
    description: "Praezise B2B-Auftritte mit Team, Leistungen, Prozess und Kontaktstrecke.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    accent: "#a78bfa",
    modules: ["Expertise", "Cases", "Termin"]
  },
  medical: {
    label: "Praxis",
    tagline: "Leistungen, Sprechzeiten, Termin",
    description: "Ruhige Praxis-Websites mit klaren Wegen zu Leistungen und Online-Termin.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    accent: "#22d3ee",
    modules: ["Leistungen", "Team", "Termin"]
  },
  fitness: {
    label: "Fitness",
    tagline: "Kurse, Trainer, Probetraining",
    description: "Dynamische Studio-Seiten mit Kursplan, Programmen und Conversion-Funnel.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80",
    accent: "#facc15",
    modules: ["Kurse", "Trainer", "Preise"]
  },
  "real-estate": {
    label: "Immobilien",
    tagline: "Objekte, Bewertung, Vermarktung",
    description: "Makler-Auftritte mit Objektlisten, Bewertungs-CTA und starken Exposes.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    accent: "#34d399",
    modules: ["Objekte", "Bewertung", "Exposes"]
  }
};

const styleLabels: Record<StyleKey, string> = {
  classic: "Classic",
  modern: "Modern",
  bold: "Bold"
};

const cards = industries.map((key) => ({ key, ...industryMeta[key] }));

export function TemplateShowcase({ compact = false }: { compact?: boolean }) {
  const visibleCards = compact ? cards.slice(0, 6) : cards;

  return (
    <section className="showcase-band bg-ink px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">Templates</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Branchen-Templates mit eigenem Charakter.
            </h2>
          </div>
          <div className="grid gap-4 text-white/70">
            <p className="text-lg leading-8">
              Jede Branche hat eigene Module, eigene Bildsprache und drei Stilrichtungen. Die
              gleiche CMS-Struktur treibt Vorschau, Admin und Live-Seite.
            </p>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <span
                  key={style}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/75"
                >
                  {styleLabels[style]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((item, index) => (
            <a
              key={item.key}
              id={item.key}
              href={`/templates/${item.key}/classic`}
              className="group relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-1 hover:border-white/25"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="relative flex h-full min-h-[420px] flex-col justify-between p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/60">
                    / {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.accent }}
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    {item.tagline}
                  </p>
                  <h3 className="mt-3 text-4xl font-black tracking-tight">{item.label}</h3>
                  <p className="mt-4 max-w-sm leading-7 text-white/75">{item.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.modules.map((module) => (
                      <span
                        key={module}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <span
                        key={style}
                        className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-white/75"
                      >
                        {styleLabels[style]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {compact ? (
          <div className="mt-10">
            <a className="showcase-button showcase-button-light" href="/beispiele">
              Alle Templates ansehen
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AdminDemoShowcase() {
  const sections = ["Hero", "Angebote", "Galerie", "FAQ", "CTA"];

  return (
    <section className="showcase-band bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="showcase-eyebrow">Admin-Demo</p>
          <h2 className="mt-4 text-5xl font-black leading-[0.96] tracking-tight md:text-6xl">
            Sieht aus wie ein Produkt. Funktioniert wie ein CMS.
          </h2>
          <p className="mt-6 text-lg leading-8 text-black/60">
            Seiten, Sections, Medien und Collections werden nicht als Demo-Bild gefaked. Die
            Oberflaeche nutzt dieselben Datenmodelle wie die Live-Seite.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="showcase-button" href="/admin">
              Echtes Admin oeffnen
            </a>
            <a className="showcase-button showcase-button-secondary" href="/admin-demo">
              Admin-Demo starten
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-3 shadow-soft">
          <div className="rounded-md border border-black/10 bg-[#101317] p-4 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                  Flamingo CMS
                </p>
                <p className="mt-1 text-lg font-black">Startseite bearbeiten</p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                Live
              </span>
            </div>
            <div className="grid gap-4 pt-4 md:grid-cols-[220px_1fr]">
              <aside className="grid gap-2">
                {["Pages", "Sections", "Media", "Design", "SEO"].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-md px-3 py-2 text-sm ${
                      index === 1 ? "bg-white text-black" : "bg-white/5 text-white/70"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </aside>
              <div className="grid gap-3">
                {sections.map((section, index) => (
                  <div
                    key={section}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] p-3"
                  >
                    <span className="font-mono text-xs text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-bold">{section}</p>
                      <p className="text-xs text-white/50">Validiert, sortierbar, publish-ready</p>
                    </div>
                    <span className="text-xs font-bold text-white/50">Edit</span>
                  </div>
                ))}
                <div className="rounded-md bg-flamingo p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">Preview</p>
                  <p className="mt-2 text-2xl font-black">Aenderungen sind sofort sichtbar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
