"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { AdminFieldDefinition, Page, Section, SectionCategory } from "@flamingo/cms-core";
import { adminFetch } from "./api-client";

type ActionState = {
  pending: string | null;
  message: string | null;
  error: string | null;
};

export type AdminSectionLibraryItem = {
  type: string;
  label: string;
  description: string;
  category: SectionCategory;
  tags: string[];
  adminFields: AdminFieldDefinition[];
};

type InspectorTab = "content" | "design" | "seo" | "animation";
type DesignSpacing = NonNullable<Section["design"]["spacing"]>;
type DesignBackground = NonNullable<Section["design"]["background"]>;
type DesignContainer = NonNullable<Section["design"]["container"]>;
type AnimationPreset = NonNullable<Section["animation"]["preset"]>;

export function PageEditorClient({
  page,
  initialSections,
  library
}: {
  page: Page;
  initialSections: Section[];
  library: AdminSectionLibraryItem[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialSections[0]?.id ?? "");
  const [tab, setTab] = useState<InspectorTab>("content");
  const selectedSection = initialSections.find((section) => section.id === selectedId) ?? initialSections[0];
  const [state, setState] = useState<ActionState>({
    pending: null,
    message: null,
    error: null
  });

  const filteredLibrary = useMemo(
    () =>
      library.filter((section) => {
        const haystack = `${section.label} ${section.description} ${section.category} ${section.tags.join(" ")}`;
        return haystack.toLowerCase().includes(query.toLowerCase());
      }),
    [library, query]
  );
  const groupedLibrary = useMemo(
    () =>
      filteredLibrary.reduce<Record<string, AdminSectionLibraryItem[]>>((groups, section) => {
        groups[section.category] = groups[section.category] ?? [];
        groups[section.category].push(section);
        return groups;
      }, {}),
    [filteredLibrary]
  );

  async function mutate(label: string, url: string, body?: unknown, method = "POST") {
    setState({ pending: label, message: null, error: null });
    const response = await adminFetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    const result = await response.json();

    if (!response.ok) {
      setState({ pending: null, message: null, error: result.error ?? "Aktion fehlgeschlagen." });
      return;
    }

    setState({ pending: null, message: label, error: null });
    router.refresh();
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_420px]">
      <aside className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Sections</p>
        <div className="mt-4 grid gap-2">
          {initialSections.map((section) => (
            <button
              key={section.id}
              className={`rounded-xl p-3 text-left text-sm font-bold ${
                section.id === selectedSection?.id ? "bg-ink text-white" : "bg-black/[0.04]"
              }`}
              onClick={() => setSelectedId(section.id)}
            >
              {section.label}
              <span className={`mt-1 block text-xs font-normal ${section.id === selectedSection?.id ? "text-white/55" : "text-black/45"}`}>
                {section.type}
              </span>
            </button>
          ))}
        </div>
        <a
          className="mt-4 block w-full rounded-full bg-flamingo px-4 py-3 text-center text-sm font-black text-white"
          href="#section-library"
        >
          Section hinzufügen
        </a>
      </aside>
      <section className="min-h-[620px] rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <div>
            <h1 className="text-2xl font-black">{page.title}</h1>
            <p className="text-sm text-black/50">{page.fullPath}</p>
          </div>
          <div className="flex gap-2">
            <a
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-bold"
              href={page.fullPath}
              target="_blank"
            >
              Preview
            </a>
            <button
              className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
              disabled={state.pending !== null}
              onClick={() => mutate("Page veröffentlicht", `/api/admin/pages/${page.id}/publish`)}
            >
              Publish
            </button>
          </div>
        </div>
        {state.message ? (
          <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
            {state.message}
          </p>
        ) : null}
        {state.error ? (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{state.error}</p>
        ) : null}
        <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-[#fbfaf8] p-5">
          {initialSections.map((section, index) => (
            <div
              id={section.id}
              key={section.id}
              className={`mb-3 rounded-xl bg-white p-4 shadow-sm ${section.id === selectedSection?.id ? "ring-2 ring-ink" : ""}`}
              onClick={() => setSelectedId(section.id)}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-black">{section.label}</p>
                  <p className="text-sm text-black/50">
                    Reihenfolge {section.order + 1} · {section.visible ? "sichtbar" : "ausgeblendet"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold">
                  <button
                    className="rounded-full bg-black/[0.06] px-3 py-2 disabled:opacity-50"
                    disabled={state.pending !== null || index === 0}
                    onClick={() =>
                      mutate(
                        "Section nach oben verschoben",
                        `/api/admin/sections/${section.id}`,
                        { order: index - 1 },
                        "PATCH"
                      )
                    }
                  >
                    Hoch
                  </button>
                  <button
                    className="rounded-full bg-black/[0.06] px-3 py-2 disabled:opacity-50"
                    disabled={state.pending !== null || index === initialSections.length - 1}
                    onClick={() =>
                      mutate(
                        "Section nach unten verschoben",
                        `/api/admin/sections/${section.id}`,
                        { order: index + 1 },
                        "PATCH"
                      )
                    }
                  >
                    Runter
                  </button>
                  <button
                    className="rounded-full bg-black/[0.06] px-3 py-2 disabled:opacity-50"
                    disabled={state.pending !== null}
                    onClick={() =>
                      mutate("Section dupliziert", `/api/admin/sections/${section.id}/duplicate`)
                    }
                  >
                    Duplizieren
                  </button>
                  <button
                    className="rounded-full bg-black/[0.06] px-3 py-2 disabled:opacity-50"
                    disabled={state.pending !== null}
                    onClick={() =>
                      mutate(
                        section.visible ? "Section ausgeblendet" : "Section eingeblendet",
                        `/api/admin/sections/${section.id}`,
                        { visible: !section.visible },
                        "PATCH"
                      )
                    }
                  >
                    {section.visible ? "Ausblenden" : "Einblenden"}
                  </button>
                  <button
                    className="rounded-full bg-red-50 px-3 py-2 text-red-700 disabled:opacity-50"
                    disabled={state.pending !== null}
                    onClick={() => mutate("Section gelöscht", `/api/admin/sections/${section.id}/delete`)}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="grid gap-5">
        {selectedSection ? (
          <>
            <SectionInspector
              mutate={mutate}
              page={page}
              section={selectedSection}
              tab={tab}
              setTab={setTab}
            />
            <LivePreviewPanel page={page} />
          </>
        ) : null}
        <div id="section-library" className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Section Library</p>
        <input
          className="mt-4 w-full rounded-xl border border-black/10 p-3 text-sm"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Suchen..."
          value={query}
        />
        <div className="mt-4 grid gap-3">
          {Object.entries(groupedLibrary).flatMap(([category, sections]) => [
            <p key={category} className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-black/35">
              {category}
            </p>,
            ...sections.map((section) => (
            <article key={section.type} className="rounded-xl border border-black/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-black">{section.label}</p>
                <span className="rounded-full bg-black/[0.05] px-2 py-1 text-xs font-bold">
                  {section.category}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-black/55">{section.description}</p>
              <button
                className="mt-3 rounded-full bg-ink px-3 py-2 text-xs font-black text-white disabled:opacity-50"
                disabled={state.pending !== null}
                onClick={() =>
                  mutate("Section hinzugefügt", `/api/admin/pages/${page.id}/sections`, {
                    type: section.type
                  })
                }
              >
                Hinzufügen
              </button>
            </article>
            ))
          ])}
        </div>
        </div>
      </aside>
    </div>
  );
}

function SectionInspector({
  page,
  section,
  tab,
  setTab,
  mutate
}: {
  page: Page;
  section: Section;
  tab: InspectorTab;
  setTab: (tab: InspectorTab) => void;
  mutate: (label: string, url: string, body?: unknown, method?: string) => Promise<void>;
}) {
  const [dataJson, setDataJson] = useState(() => JSON.stringify(section.data, null, 2));
  const [seoJson, setSeoJson] = useState(() => JSON.stringify(page.seo, null, 2));
  const [design, setDesign] = useState({
    spacing: section.design.spacing ?? "standard",
    background: section.design.background ?? "paper",
    container: section.design.container ?? "default"
  });
  const [animation, setAnimation] = useState({
    preset: section.animation.preset ?? "fade-up",
    reducedMotionSafe: section.animation.reducedMotionSafe ?? true
  });

  useEffect(() => {
    setDataJson(JSON.stringify(section.data, null, 2));
    setSeoJson(JSON.stringify(page.seo, null, 2));
    setDesign({
      spacing: section.design.spacing ?? "standard",
      background: section.design.background ?? "paper",
      container: section.design.container ?? "default"
    });
    setAnimation({
      preset: section.animation.preset ?? "fade-up",
      reducedMotionSafe: section.animation.reducedMotionSafe ?? true
    });
  }, [page.seo, section]);

  function parseJson(value: string) {
    try {
      return JSON.parse(value) as unknown;
    } catch {
      return null;
    }
  }

  const parsedData = parseJson(dataJson);
  const parsedSeo = parseJson(seoJson);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Inspector</p>
      <h2 className="mt-2 text-xl font-black">{section.label}</h2>
      <p className="mt-1 text-sm text-black/50">{section.type}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["content", "design", "seo", "animation"] as InspectorTab[]).map((item) => (
          <button
            key={item}
            className={`rounded-full px-3 py-2 text-xs font-black uppercase ${
              tab === item ? "bg-ink text-white" : "bg-black/[0.05] text-black/55"
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "content" ? (
        <div className="mt-4 grid gap-3">
          <label className="grid gap-2 text-sm font-bold">
            Section data
            <textarea
              className="min-h-[260px] rounded-xl border border-black/10 bg-[#fbfaf8] p-3 font-mono text-xs leading-5"
              value={dataJson}
              onChange={(event) => setDataJson(event.target.value)}
            />
          </label>
          <button
            className="rounded-full bg-ink px-4 py-3 text-sm font-black text-white disabled:opacity-50"
            disabled={!parsedData}
            onClick={() =>
              mutate("Content gespeichert", `/api/admin/sections/${section.id}`, { data: parsedData }, "PATCH")
            }
          >
            Content speichern
          </button>
        </div>
      ) : null}

      {tab === "design" ? (
        <div className="mt-4 grid gap-3">
          <SelectField label="Spacing" value={design.spacing} options={["compact", "standard", "generous"]} onChange={(value) => setDesign({ ...design, spacing: value as DesignSpacing })} />
          <SelectField label="Background" value={design.background} options={["paper", "ink", "brand", "muted"]} onChange={(value) => setDesign({ ...design, background: value as DesignBackground })} />
          <SelectField label="Container" value={design.container} options={["narrow", "default", "wide", "full"]} onChange={(value) => setDesign({ ...design, container: value as DesignContainer })} />
          <button
            className="rounded-full bg-ink px-4 py-3 text-sm font-black text-white"
            onClick={() =>
              mutate("Design gespeichert", `/api/admin/sections/${section.id}`, { design }, "PATCH")
            }
          >
            Design speichern
          </button>
        </div>
      ) : null}

      {tab === "seo" ? (
        <div className="mt-4 grid gap-3">
          <textarea
            className="min-h-[220px] rounded-xl border border-black/10 bg-[#fbfaf8] p-3 font-mono text-xs leading-5"
            value={seoJson}
            onChange={(event) => setSeoJson(event.target.value)}
          />
          <button
            className="rounded-full bg-ink px-4 py-3 text-sm font-black text-white disabled:opacity-50"
            disabled={!parsedSeo}
            onClick={() =>
              mutate("SEO gespeichert", `/api/admin/pages/${page.id}`, { seo: parsedSeo }, "PATCH")
            }
          >
            SEO speichern
          </button>
        </div>
      ) : null}

      {tab === "animation" ? (
        <div className="mt-4 grid gap-3">
          <SelectField label="Preset" value={animation.preset} options={["none", "fade-up", "reveal", "parallax"]} onChange={(value) => setAnimation({ ...animation, preset: value as AnimationPreset })} />
          <label className="flex items-center justify-between rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-bold">
            Reduced-motion safe
            <input
              type="checkbox"
              checked={animation.reducedMotionSafe}
              onChange={(event) => setAnimation({ ...animation, reducedMotionSafe: event.target.checked })}
            />
          </label>
          <button
            className="rounded-full bg-ink px-4 py-3 text-sm font-black text-white"
            onClick={() =>
              mutate("Animation gespeichert", `/api/admin/sections/${section.id}`, { animation }, "PATCH")
            }
          >
            Animation speichern
          </button>
        </div>
      ) : null}
    </section>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <select
        className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LivePreviewPanel({ page }: { page: Page }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Live Preview</p>
          <p className="mt-1 text-sm font-bold text-black/55">{page.fullPath}</p>
        </div>
        <a
          className="rounded-full border border-black/10 px-3 py-2 text-xs font-black"
          href={page.fullPath}
          target="_blank"
        >
          Öffnen
        </a>
      </div>
      <iframe
        className="mt-4 h-[420px] w-full rounded-xl border border-black/10 bg-white"
        src={page.fullPath}
        title={`Live Preview ${page.title}`}
      />
    </section>
  );
}
