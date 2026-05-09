"use client";

import { useMemo, useState } from "react";
import { industries, styles, type IndustryKey, type StyleKey } from "@flamingo/shared";
import { getTemplatePreview, type TemplatePreviewData } from "./template-preview-data";

type DemoSection = {
  id: string;
  label: string;
  type: string;
  visible: boolean;
};

const initialSections: DemoSection[] = [
  { id: "hero", label: "Hero", type: "hero", visible: true },
  { id: "modules", label: "Module", type: "module_grid", visible: true },
  { id: "collection", label: "CMS Collection", type: "collection_list", visible: true },
  { id: "gallery", label: "Bildwelt", type: "media_gallery", visible: true },
  { id: "journey", label: "User Journey", type: "process", visible: true },
  { id: "cta", label: "CTA", type: "conversion", visible: true }
];

const library = [
  { label: "FAQ", type: "faq", description: "Haeufige Fragen mit SEO-Struktur." },
  { label: "Team", type: "team", description: "Profile, Rollen und Kontaktwege." },
  { label: "Testimonials", type: "testimonials", description: "Stimmen und Bewertungs-Auszug." },
  { label: "Foerdercheck", type: "funding_calculator", description: "Lead-Modul fuer Tirol-Foerderungen." }
];

const industryLabels: Record<IndustryKey, string> = {
  restaurant: "Restaurant",
  hotel: "Hotel",
  tourism: "Tourismus",
  salon: "Salon",
  trades: "Handwerk",
  consulting: "Beratung",
  medical: "Praxis",
  fitness: "Fitness",
  "real-estate": "Immobilien"
};

export function AdminDemoClient() {
  const [industry, setIndustry] = useState<IndustryKey>("restaurant");
  const [style, setStyle] = useState<StyleKey>("classic");
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState("hero");
  const baseData = getTemplatePreview(industry, style) as TemplatePreviewData;
  const [headline, setHeadline] = useState(baseData.headline);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const data = useMemo(
    () => ({
      ...baseData,
      headline: headline.trim() ? headline : baseData.headline
    }),
    [baseData, headline]
  );

  const selected = sections.find((section) => section.id === selectedId) ?? sections[0];
  const visibleCount = sections.filter((section) => section.visible).length;

  function switchTemplate(nextIndustry: IndustryKey, nextStyle = style) {
    setIndustry(nextIndustry);
    const nextData = getTemplatePreview(nextIndustry, nextStyle);
    if (nextData) {
      setHeadline(nextData.headline);
    }
  }

  function switchStyle(nextStyle: StyleKey) {
    setStyle(nextStyle);
    const nextData = getTemplatePreview(industry, nextStyle);
    if (nextData) {
      setHeadline(nextData.headline);
    }
  }

  function toggleSection(id: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section
      )
    );
  }

  function addSection(type: string, label: string) {
    const id = `${type}-${sections.length + 1}`;
    setSections((current) => [...current, { id, type, label, visible: true }]);
    setSelectedId(id);
  }

  function fakeSave() {
    setSavedAt(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
    window.setTimeout(() => setSavedAt(null), 3500);
  }

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-ink">
      <div className="border-b border-black/10 bg-ink px-5 py-3 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
              Public Admin Demo
            </p>
            <h1 className="text-2xl font-black">Flamingo CMS Editor</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="showcase-button showcase-button-light showcase-button-compact" href="/beispiele">
              Templates
            </a>
            <button className="showcase-button showcase-button-compact" onClick={fakeSave}>
              Demo speichern
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-[1500px] gap-5 p-5 xl:grid-cols-[280px_minmax(460px,1fr)_520px]">
        <aside className="grid content-start gap-5">
          <Panel title="Template">
            <label className="grid gap-2 text-sm font-bold">
              Branche
              <select
                className="rounded-lg border border-black/10 bg-white p-3"
                value={industry}
                onChange={(event) => switchTemplate(event.target.value as IndustryKey)}
              >
                {industries.map((item) => (
                  <option key={item} value={item}>
                    {industryLabels[item]}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {styles.map((item) => (
                <button
                  key={item}
                  className={`rounded-lg border px-3 py-2 text-xs font-black uppercase ${
                    item === style
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black"
                  }`}
                  onClick={() => switchStyle(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Sections">
            <div className="grid gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`rounded-lg border p-3 text-left transition ${
                    section.id === selectedId
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black hover:border-black/30"
                  }`}
                  onClick={() => setSelectedId(section.id)}
                >
                  <span className="font-mono text-xs opacity-60">
                    {String(index + 1).padStart(2, "0")} / {section.type}
                  </span>
                  <span className="mt-1 block font-black">{section.label}</span>
                  <span className="mt-1 block text-xs opacity-60">
                    {section.visible ? "sichtbar" : "ausgeblendet"}
                  </span>
                </button>
              ))}
            </div>
          </Panel>
        </aside>

        <section className="grid content-start gap-5">
          {savedAt ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-black text-emerald-700">
              Demo gespeichert um {savedAt}. Die echte Version wuerde jetzt publishen.
            </div>
          ) : null}

          <Panel title={`Bearbeiten: ${selected.label}`}>
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-bold">
                Hero Headline
                <textarea
                  className="min-h-[120px] rounded-lg border border-black/10 p-4 text-2xl font-black leading-tight"
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                />
              </label>

              <div className="grid gap-3 rounded-lg border border-black/10 bg-black/[0.03] p-4 md:grid-cols-3">
                <Metric label="Template" value={industryLabels[industry]} />
                <Metric label="Style" value={style} />
                <Metric label="Sichtbar" value={`${visibleCount}/${sections.length}`} />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  className="rounded-full bg-ink px-4 py-2 text-sm font-black text-white"
                  onClick={() => toggleSection(selected.id)}
                >
                  {selected.visible ? "Section ausblenden" : "Section einblenden"}
                </button>
                <a
                  className="rounded-full border border-black/10 px-4 py-2 text-sm font-black"
                  href={`/templates/${industry}/${style}`}
                  target="_blank"
                >
                  Vollpreview
                </a>
              </div>
            </div>
          </Panel>

          <Panel title="Section Library">
            <div className="grid gap-3 md:grid-cols-2">
              {library.map((item) => (
                <article key={item.type} className="rounded-lg border border-black/10 bg-white p-4">
                  <p className="font-black">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-black/60">{item.description}</p>
                  <button
                    className="mt-4 rounded-full bg-black px-3 py-2 text-xs font-black text-white"
                    onClick={() => addSection(item.type, item.label)}
                  >
                    Hinzufuegen
                  </button>
                </article>
              ))}
            </div>
          </Panel>
        </section>

        <aside className="xl:sticky xl:top-5 xl:h-[calc(100vh-40px)]">
          <LivePreview data={data} sections={sections} />
        </aside>
      </main>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-black/45">{title}</p>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-black/45">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function LivePreview({
  data,
  sections
}: {
  data: TemplatePreviewData;
  sections: DemoSection[];
}) {
  const visible = new Set(sections.filter((section) => section.visible).map((section) => section.id));

  return (
    <div className="h-full overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3">
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/45">Live Preview</p>
      </div>
      <div className="h-[calc(100%-45px)] overflow-auto">
        {visible.has("hero") ? (
          <section className="relative min-h-[460px] overflow-hidden p-8 text-white" style={{ background: data.dark }}>
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url(${data.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
            <div className="relative flex min-h-[400px] flex-col justify-end">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">
                {data.eyebrow}
              </p>
              <h2 className="mt-4 text-5xl font-black leading-[0.9]">{data.headline}</h2>
              <p className="mt-5 max-w-md leading-7 text-white/75">{data.description}</p>
            </div>
          </section>
        ) : null}

        {visible.has("modules") ? (
          <section className="p-6" style={{ background: data.surface }}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">Module</p>
            <div className="mt-4 grid gap-3">
              {data.modules.map((module) => (
                <article key={module.title} className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="font-black">{module.title}</p>
                  <p className="mt-2 text-sm leading-6 text-black/60">{module.body}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {visible.has("collection") ? (
          <section className="p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">Collection</p>
            <div className="mt-4 grid gap-2">
              {data.signature.map((item) => (
                <div key={item.title} className="rounded-lg border border-black/10 p-4">
                  <p className="font-black">{item.title}</p>
                  <p className="mt-1 text-sm text-black/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {visible.has("gallery") ? (
          <section className="grid grid-cols-3 gap-2 p-6">
            {data.gallery.map((image) => (
              <div
                key={image}
                className="min-h-[130px] rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </section>
        ) : null}

        {visible.has("journey") ? (
          <section className="p-6">
            <div className="grid gap-2">
              {data.process.map((step, index) => (
                <div key={step.title} className="rounded-lg bg-black/[0.04] p-4">
                  <p className="font-mono text-xs text-black/45">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-black">{step.title}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {visible.has("cta") ? (
          <section className="p-6 text-white" style={{ background: data.dark }}>
            <p className="text-3xl font-black leading-tight">Dieses Template live schalten.</p>
            <button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-black text-black">
              Angebot anfragen
            </button>
          </section>
        ) : null}
      </div>
    </div>
  );
}
