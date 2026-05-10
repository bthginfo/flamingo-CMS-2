"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Eye,
  FileText,
  Globe2,
  ImageIcon,
  LayoutGrid,
  Palette,
  Plus,
  Save,
  Search,
  Settings,
  Sparkles
} from "lucide-react";
import { industries, styles, type IndustryKey, type StyleKey } from "@flamingo/shared";
import { getTemplatePreview, type TemplatePreviewData } from "./template-preview-data";

type DemoSection = {
  id: string;
  label: string;
  type: string;
  visible: boolean;
  status: "draft" | "ready" | "live";
};

type InspectorTab = "content" | "design" | "seo" | "media";

const initialSections: DemoSection[] = [
  { id: "hero", label: "Rich Hero", type: "hero", visible: true, status: "live" },
  { id: "booking", label: "Booking Panel", type: "lead_panel", visible: true, status: "ready" },
  { id: "signature", label: "Industry Signature", type: "industry_signature", visible: true, status: "live" },
  { id: "modules", label: "Service Bento", type: "service_bento", visible: true, status: "ready" },
  { id: "collection", label: "Collection List", type: "collection_grid", visible: true, status: "live" },
  { id: "gallery", label: "Gallery Mosaic", type: "gallery_mosaic", visible: true, status: "draft" },
  { id: "journey", label: "Visitor Journey", type: "timeline", visible: true, status: "ready" },
  { id: "cta", label: "Conversion CTA", type: "cta", visible: true, status: "live" }
];

const library = [
  { label: "FAQ Accordion", type: "faq", description: "SEO-Fragen, Einwaende und Support-Antworten." },
  { label: "Team Grid", type: "team_grid", description: "Profile, Rollen, Bio, Sprachen und Kontaktwege." },
  { label: "Pricing Cards", type: "pricing_cards", description: "Pakete, Angebote, Mitgliedschaften oder Zimmerpreise." },
  { label: "Location Hours", type: "location_hours", description: "Adresse, Map, Oeffnungszeiten und Direktkontakt." },
  { label: "Testimonials", type: "testimonial_wall", description: "Stimmen, Bewertungen und Trust-Statements." },
  { label: "Foerdercheck", type: "funding_calculator", description: "Lead-Modul fuer Tirol-Digitalisierung." }
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

const workspaceNav = [
  { label: "Pages", icon: FileText },
  { label: "Sections", icon: LayoutGrid },
  { label: "Media", icon: ImageIcon },
  { label: "Design", icon: Palette },
  { label: "SEO", icon: Globe2 },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings }
];

export function AdminDemoClient() {
  const [industry, setIndustry] = useState<IndustryKey>("restaurant");
  const [style, setStyle] = useState<StyleKey>("classic");
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState("hero");
  const [tab, setTab] = useState<InspectorTab>("content");
  const baseData = getTemplatePreview(industry, style) as TemplatePreviewData;
  const [headline, setHeadline] = useState(baseData.headline);
  const [description, setDescription] = useState(baseData.description);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const data = useMemo(
    () => ({
      ...baseData,
      headline: headline.trim() ? headline : baseData.headline,
      description: description.trim() ? description : baseData.description
    }),
    [baseData, description, headline]
  );

  const selected = sections.find((section) => section.id === selectedId) ?? sections[0];
  const visibleCount = sections.filter((section) => section.visible).length;
  const readyCount = sections.filter((section) => section.status !== "draft").length;

  function switchTemplate(nextIndustry: IndustryKey, nextStyle = style) {
    setIndustry(nextIndustry);
    const nextData = getTemplatePreview(nextIndustry, nextStyle);
    if (nextData) {
      setHeadline(nextData.headline);
      setDescription(nextData.description);
    }
  }

  function switchStyle(nextStyle: StyleKey) {
    setStyle(nextStyle);
    const nextData = getTemplatePreview(industry, nextStyle);
    if (nextData) {
      setHeadline(nextData.headline);
      setDescription(nextData.description);
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
    setSections((current) => [...current, { id, type, label, visible: true, status: "draft" }]);
    setSelectedId(id);
    setTab("content");
  }

  function fakeSave() {
    setSavedAt(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
    window.setTimeout(() => setSavedAt(null), 3500);
  }

  return (
    <div className="min-h-screen bg-[#111114] text-white">
      <header className="border-b border-white/10 bg-[#09090c] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-md bg-flamingo text-sm font-black" href="/">
              F
            </a>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Flamingo CMS</p>
              <h1 className="text-xl font-black">Template Workspace</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white/60 md:flex">
              <Search className="h-3.5 w-3.5" />
              Suche Seiten, Medien, Fields
            </div>
            <a className="showcase-button showcase-button-ghost-dark showcase-button-compact" href={`/templates/${industry}/${style}`}>
              <Eye className="mr-2 h-4 w-4" />
              Vollpreview
            </a>
            <button className="showcase-button showcase-button-light showcase-button-compact" onClick={fakeSave}>
              <Save className="mr-2 h-4 w-4" />
              Speichern
            </button>
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-65px)] lg:grid-cols-[76px_330px_minmax(520px,1fr)_390px]">
        <aside className="hidden border-r border-white/10 bg-[#09090c] p-3 lg:block">
          <nav className="grid gap-2">
            {workspaceNav.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`grid h-12 place-items-center rounded-md transition ${
                    index === 1 ? "bg-white text-black" : "text-white/45 hover:bg-white/10 hover:text-white"
                  }`}
                  title={item.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </nav>
        </aside>

        <aside className="border-r border-white/10 bg-[#111114] p-4">
          <PanelDark title="Projekt">
            <div className="grid gap-3">
              <label className="grid gap-2 text-sm font-bold text-white/75">
                Branche
                <select
                  className="rounded-md border border-white/10 bg-white/[0.06] p-3 text-white"
                  value={industry}
                  onChange={(event) => switchTemplate(event.target.value as IndustryKey)}
                >
                  {industries.map((item) => (
                    <option key={item} value={item} className="text-black">
                      {industryLabels[item]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((item) => (
                  <button
                    key={item}
                    className={`rounded-md border px-3 py-2 text-xs font-black uppercase ${
                      item === style
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/[0.04] text-white/65 hover:text-white"
                    }`}
                    onClick={() => switchStyle(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </PanelDark>

          <PanelDark title="Status">
            <div className="grid grid-cols-3 gap-2">
              <MetricDark label="Visible" value={`${visibleCount}`} />
              <MetricDark label="Ready" value={`${readyCount}`} />
              <MetricDark label="Routes" value="27" />
            </div>
            {savedAt ? (
              <div className="mt-3 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3 text-xs font-black text-emerald-200">
                Gespeichert um {savedAt}
              </div>
            ) : null}
          </PanelDark>

          <PanelDark title="Sections">
            <div className="grid gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`rounded-md border p-3 text-left transition ${
                    section.id === selectedId
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.045] text-white hover:border-white/25"
                  }`}
                  onClick={() => setSelectedId(section.id)}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs opacity-55">
                      {String(index + 1).padStart(2, "0")} / {section.type}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        section.status === "live"
                          ? "bg-emerald-400"
                          : section.status === "ready"
                            ? "bg-amber-300"
                            : "bg-white/30"
                      }`}
                    />
                  </span>
                  <span className="mt-2 block font-black">{section.label}</span>
                  <span className="mt-1 block text-xs opacity-60">
                    {section.visible ? "sichtbar" : "ausgeblendet"}
                  </span>
                </button>
              ))}
            </div>
          </PanelDark>
        </aside>

        <section className="grid content-start gap-4 bg-[#f6f5f2] p-4 text-ink md:p-5">
          <div className="grid gap-4 xl:grid-cols-[1fr_0.72fr]">
            <PanelLight title="Field Inspector">
              <div className="flex flex-wrap gap-2 border-b border-black/10 pb-4">
                {(["content", "design", "seo", "media"] as InspectorTab[]).map((item) => (
                  <button
                    key={item}
                    className={`rounded-full px-3 py-2 text-xs font-black uppercase ${
                      tab === item ? "bg-black text-white" : "bg-black/[0.05] text-black/55"
                    }`}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <InspectorPanel
                tab={tab}
                selected={selected}
                data={data}
                headline={headline}
                description={description}
                setHeadline={setHeadline}
                setDescription={setDescription}
                toggleSection={toggleSection}
              />
            </PanelLight>

            <PanelLight title="Section Library">
              <div className="grid gap-3">
                {library.map((item) => (
                  <article key={item.type} className="rounded-md border border-black/10 bg-paper p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black">{item.label}</p>
                        <p className="mt-2 text-sm leading-6 text-black/60">{item.description}</p>
                      </div>
                      <button
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-black text-white"
                        onClick={() => addSection(item.type, item.label)}
                        title={`${item.label} hinzufuegen`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </PanelLight>
          </div>

          <PanelLight title="CMS Data Model">
            <div className="grid gap-3 md:grid-cols-4">
              <MetricLight label="Hero Fields" value="8" />
              <MetricLight label="Collections" value="4" />
              <MetricLight label="Forms" value="2" />
              <MetricLight label="Media Assets" value="36" />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {["headline", "primaryCta", "image", "stats", "seo", "animation"].map((field) => (
                <span key={field} className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-bold text-black/60">
                  {field}
                </span>
              ))}
            </div>
          </PanelLight>
        </section>

        <aside className="border-l border-white/10 bg-[#111114] p-4">
          <LivePreview data={data} sections={sections} />
        </aside>
      </main>
    </div>
  );
}

function InspectorPanel({
  tab,
  selected,
  data,
  headline,
  description,
  setHeadline,
  setDescription,
  toggleSection
}: {
  tab: InspectorTab;
  selected: DemoSection;
  data: TemplatePreviewData;
  headline: string;
  description: string;
  setHeadline: (value: string) => void;
  setDescription: (value: string) => void;
  toggleSection: (id: string) => void;
}) {
  if (tab === "design") {
    return (
      <div className="mt-5 grid gap-5">
        <div className="grid gap-3 md:grid-cols-3">
          <Swatch label="Accent" value={data.accent} />
          <Swatch label="Dark" value={data.dark} />
          <Swatch label="Surface" value={data.surface} />
        </div>
        <Range label="Spacing" value="72" />
        <Range label="Motion intensity" value="64" />
        <Toggle label="Reduced-motion safe" checked />
      </div>
    );
  }

  if (tab === "seo") {
    return (
      <div className="mt-5 grid gap-4">
        <InputLike label="Meta title" value={`${data.brand} - ${data.label} Website`} />
        <InputLike label="Meta description" value={data.description} />
        <InputLike label="Canonical" value={`/templates/${data.industry}/${data.style}`} />
        <Toggle label="Index, follow" checked />
      </div>
    );
  }

  if (tab === "media") {
    return (
      <div className="mt-5 grid gap-4">
        <div
          className="min-h-[220px] rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,.45), transparent), url(${data.image})` }}
        />
        <div className="grid grid-cols-3 gap-2">
          {data.gallery.map((image) => (
            <div key={image} className="min-h-[92px] rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          ))}
        </div>
        <button className="rounded-md border border-black/10 bg-paper px-4 py-3 text-sm font-black">
          Medien aus Blob auswaehlen
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-5">
      <div className="rounded-md border border-black/10 bg-paper p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">Aktive Section</p>
        <p className="mt-2 text-2xl font-black">{selected.label}</p>
        <p className="mt-1 text-sm text-black/55">{selected.type}</p>
      </div>
      <label className="grid gap-2 text-sm font-bold">
        Hero Headline
        <textarea
          className="min-h-[128px] rounded-md border border-black/10 bg-white p-4 text-2xl font-black leading-tight"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Beschreibung
        <textarea
          className="min-h-[96px] rounded-md border border-black/10 bg-white p-4 leading-7"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <button className="rounded-md bg-black px-4 py-3 text-sm font-black text-white" onClick={() => toggleSection(selected.id)}>
        {selected.visible ? "Section ausblenden" : "Section einblenden"}
      </button>
    </div>
  );
}

function PanelDark({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-white/40">{title}</p>
      {children}
    </section>
  );
}

function PanelLight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-black/45">{title}</p>
      {children}
    </section>
  );
}

function MetricDark({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white/[0.06] p-3">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-white/35">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function MetricLight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-black/10 bg-paper p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-black/40">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}

function Swatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-black/10 bg-paper p-4">
      <span className="block h-12 rounded-md" style={{ background: value }} />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-black/45">{label}</p>
      <p className="mt-1 font-mono text-xs text-black/55">{value}</p>
    </div>
  );
}

function Range({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input type="range" min="0" max="100" value={value} readOnly className="accent-black" />
    </label>
  );
}

function Toggle({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-black/10 bg-paper p-4 text-sm font-bold">
      <span>{label}</span>
      <span className={`h-6 w-11 rounded-full p-1 ${checked ? "bg-black" : "bg-black/20"}`}>
        <span className={`block h-4 w-4 rounded-full bg-white ${checked ? "ml-5" : ""}`} />
      </span>
    </div>
  );
}

function InputLike({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <div className="rounded-md border border-black/10 bg-paper p-3 text-sm font-normal leading-6 text-black/65">
        {value}
      </div>
    </label>
  );
}

function LivePreview({ data, sections }: { data: TemplatePreviewData; sections: DemoSection[] }) {
  const visible = new Set(sections.filter((section) => section.visible).map((section) => section.id));

  return (
    <div className="h-full overflow-hidden rounded-lg border border-white/10 bg-white text-black shadow-soft">
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3">
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-black/45">Live Preview</p>
      </div>
      <div className="h-[calc(100vh-142px)] overflow-auto">
        {visible.has("hero") ? (
          <section className="relative min-h-[520px] overflow-hidden p-8 text-white" style={{ background: data.dark }}>
            <div aria-hidden className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${data.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
            <div className="relative flex min-h-[456px] flex-col justify-end">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">{data.eyebrow}</p>
              <h2 className="mt-4 text-6xl font-black leading-[0.88]">{data.headline}</h2>
              <p className="mt-5 max-w-md leading-7 text-white/75">{data.description}</p>
            </div>
          </section>
        ) : null}

        {visible.has("booking") ? (
          <section className="grid gap-3 p-5" style={{ background: data.surface }}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">Conversion Panel</p>
            <div className="rounded-md p-4 text-white" style={{ background: data.dark }}>
              <p className="text-2xl font-black">Naechste Aktion direkt sichtbar.</p>
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-black text-black">
                {data.nav[1] ?? "Anfragen"}
              </button>
            </div>
          </section>
        ) : null}

        {visible.has("signature") ? (
          <section className="grid gap-3 p-5">
            {data.signature.slice(0, 3).map((item) => (
              <article key={item.title} className="rounded-md border border-black/10 bg-white p-4 shadow-sm">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-sm text-black/60">{item.detail}</p>
              </article>
            ))}
          </section>
        ) : null}

        {visible.has("modules") ? (
          <section className="p-5" style={{ background: data.surface }}>
            <div className="grid gap-3">
              {data.modules.map((module) => (
                <article key={module.title} className="rounded-md bg-white p-4 shadow-sm">
                  <p className="font-black">{module.title}</p>
                  <p className="mt-2 text-sm leading-6 text-black/60">{module.body}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {visible.has("collection") ? (
          <section className="p-5">
            <div className="grid grid-cols-3 gap-2">
              {data.metrics.map((metric) => (
                <div key={metric.label} className="rounded-md bg-black/[0.04] p-3">
                  <p className="text-xl font-black">{metric.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-black/45">{metric.label}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {visible.has("gallery") ? (
          <section className="grid grid-cols-3 gap-2 p-5">
            {data.gallery.map((image) => (
              <div key={image} className="min-h-[128px] rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            ))}
          </section>
        ) : null}

        {visible.has("journey") ? (
          <section className="p-5">
            <div className="grid gap-2">
              {data.process.map((step, index) => (
                <div key={step.title} className="rounded-md bg-black/[0.04] p-4">
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
            <button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-black text-black">Angebot anfragen</button>
          </section>
        ) : null}
      </div>
    </div>
  );
}
