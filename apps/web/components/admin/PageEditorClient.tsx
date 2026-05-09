"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Page, Section, SectionCategory } from "@flamingo/cms-core";
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
};

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
    <div className="grid gap-5 xl:grid-cols-[280px_1fr_360px]">
      <aside className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Sections</p>
        <div className="mt-4 grid gap-2">
          {initialSections.map((section) => (
            <a
              key={section.id}
              className="rounded-xl bg-black/[0.04] p-3 text-left text-sm font-bold"
              href={`#${section.id}`}
            >
              {section.label}
              <span className="mt-1 block text-xs font-normal text-black/45">{section.type}</span>
            </a>
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
          {initialSections.map((section) => (
            <div id={section.id} key={section.id} className="mb-3 rounded-xl bg-white p-4 shadow-sm">
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
      <aside id="section-library" className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Section Library</p>
        <input
          className="mt-4 w-full rounded-xl border border-black/10 p-3 text-sm"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Suchen..."
          value={query}
        />
        <div className="mt-4 grid gap-3">
          {filteredLibrary.map((section) => (
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
          ))}
        </div>
      </aside>
    </div>
  );
}
