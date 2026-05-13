"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Page } from "@flamingo/cms-core";
import { adminFetch } from "./api-client";
import { StatusPill } from "./AdminUi";

type PageRow = Page & {
  sectionCount: number;
};

type RowState = {
  title: string;
  slug: string;
  status: Page["status"];
};

export function AdminPagesClient({ pages }: { pages: PageRow[] }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(
      pages.map((page) => [
        page.id,
        {
          title: page.title,
          slug: page.slug,
          status: page.status
        }
      ])
    )
  );

  function updateDraft(pageId: string, patch: Partial<RowState>) {
    setDrafts((current) => ({ ...current, [pageId]: { ...current[pageId], ...patch } }));
  }

  async function mutate(label: string, url: string, body?: unknown, method = "POST") {
    setPending(label);
    setMessage(null);
    setError(null);
    const response = await adminFetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    const result = await response.json();

    if (!response.ok) {
      setPending(null);
      setError(result.error ?? "Aktion fehlgeschlagen.");
      return;
    }

    setPending(null);
    setMessage(label);
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      {message ? <p className="rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{message}</p> : null}
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <div className="overflow-hidden rounded-lg border border-black/10">
        {pages.map((page) => {
          const draft = drafts[page.id] ?? { title: page.title, slug: page.slug, status: page.status };
          const dirty =
            draft.title !== page.title || draft.slug !== page.slug || draft.status !== page.status;

          return (
            <article
              key={page.id}
              className="grid gap-4 border-b border-black/5 bg-white p-5 last:border-0 xl:grid-cols-[1.2fr_0.9fr_150px_120px_220px]"
            >
              <div className="grid gap-2">
                <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-black/40">
                  Titel
                  <input
                    className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-bold normal-case tracking-normal text-black"
                    value={draft.title}
                    onChange={(event) => updateDraft(page.id, { title: event.target.value })}
                  />
                </label>
                <p className="text-xs font-bold text-black/42">{page.fullPath}</p>
              </div>

              <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-black/40">
                Slug
                <input
                  className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-bold normal-case tracking-normal text-black"
                  disabled={page.isHomepage}
                  value={draft.slug}
                  onChange={(event) => updateDraft(page.id, { slug: event.target.value })}
                />
              </label>

              <label className="grid gap-1 text-xs font-black uppercase tracking-[0.14em] text-black/40">
                Status
                <select
                  className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-bold normal-case tracking-normal text-black"
                  value={draft.status}
                  onChange={(event) => updateDraft(page.id, { status: event.target.value as Page["status"] })}
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </label>

              <div className="grid content-start gap-2">
                <StatusPill tone={page.status === "published" ? "live" : "draft"}>{page.status}</StatusPill>
                <p className="text-sm font-bold text-black/55">{page.sectionCount} Sections</p>
                <p className="text-sm font-bold text-black/55">{page.type}</p>
              </div>

              <div className="flex flex-wrap content-start gap-2">
                <a
                  className="rounded-full border border-black/10 px-3 py-2 text-xs font-black"
                  href={`/admin/pages/${page.id}`}
                >
                  Editor
                </a>
                <button
                  className="rounded-full bg-ink px-3 py-2 text-xs font-black text-white disabled:opacity-40"
                  disabled={!dirty || pending !== null}
                  onClick={() =>
                    mutate(
                      "Seite gespeichert",
                      `/api/admin/pages/${page.id}`,
                      { title: draft.title, slug: draft.slug, status: draft.status },
                      "PATCH"
                    )
                  }
                >
                  Speichern
                </button>
                <button
                  className="rounded-full bg-black/[0.06] px-3 py-2 text-xs font-black disabled:opacity-40"
                  disabled={pending !== null}
                  onClick={() => mutate("Seite dupliziert", `/api/admin/pages/${page.id}/duplicate`)}
                >
                  Duplizieren
                </button>
                <button
                  className="rounded-full bg-red-50 px-3 py-2 text-xs font-black text-red-700 disabled:opacity-40"
                  disabled={pending !== null || page.isHomepage}
                  onClick={() => mutate("Seite geloescht", `/api/admin/pages/${page.id}`, undefined, "DELETE")}
                >
                  Loeschen
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
