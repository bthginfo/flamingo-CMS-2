"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CollectionItem } from "@flamingo/cms-core";
import { adminFetch } from "./api-client";
import { CmsFieldEditor } from "./CmsFieldEditor";
import { collectionSchemaToAdminFields } from "./collection-field-schema";

type Draft = {
  title: string;
  slug: string;
  status: CollectionItem["status"];
  hasDetailPage: boolean;
  data: Record<string, unknown>;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
};

function makeDraft(item: CollectionItem): Draft {
  return {
    title: item.title,
    slug: item.slug,
    status: item.status,
    hasDetailPage: item.hasDetailPage,
    data: item.data,
    metaTitle: item.seo.metaTitle ?? "",
    metaDescription: item.seo.metaDescription ?? "",
    ogImage: item.seo.ogImage ?? ""
  };
}

export function CollectionItemsEditor({
  collectionKey,
  schema,
  items
}: {
  collectionKey: string;
  schema: Record<string, unknown>;
  items: CollectionItem[];
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() =>
    Object.fromEntries(items.map((item) => [item.id, makeDraft(item)]))
  );
  const [pending, setPending] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const draft = selected ? drafts[selected.id] ?? makeDraft(selected) : null;
  const fields = collectionSchemaToAdminFields(schema);

  function updateDraft(itemId: string, patch: Partial<Draft>) {
    setDrafts((current) => ({ ...current, [itemId]: { ...current[itemId], ...patch } }));
  }

  async function save(item: CollectionItem, draft: Draft) {
    setPending("save");
    setError(null);
    setMessage(null);
    const response = await adminFetch(`/api/admin/collections/${collectionKey}/items/${item.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: draft.title,
        slug: draft.slug,
        status: draft.status,
        hasDetailPage: draft.hasDetailPage,
        data: draft.data,
        seo: {
          metaTitle: draft.metaTitle,
          metaDescription: draft.metaDescription,
          ogImage: draft.ogImage
        }
      })
    });
    const result = await response.json();

    setPending(null);
    if (!response.ok) {
      setError(result.error ?? "Item konnte nicht gespeichert werden.");
      return;
    }

    setMessage("Item gespeichert.");
    router.refresh();
  }

  async function remove(item: CollectionItem) {
    setPending("delete");
    setError(null);
    setMessage(null);
    const response = await adminFetch(`/api/admin/collections/${collectionKey}/items/${item.id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    });
    const result = await response.json();

    setPending(null);
    if (!response.ok) {
      setError(result.error ?? "Item konnte nicht geloescht werden.");
      return;
    }

    setMessage("Item geloescht.");
    setSelectedId("");
    router.refresh();
  }

  if (!items.length || !selected || !draft) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="font-black">Noch keine Items.</p>
        <p className="mt-2 text-sm leading-6 text-black/55">
          Erstelle rechts das erste Collection Item. Danach kann es hier mit SEO, Detailseite und Daten bearbeitet werden.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
      <aside className="grid content-start gap-2 rounded-2xl bg-white p-4 shadow-sm">
        {items.map((item) => (
          <button
            key={item.id}
            className={`rounded-xl p-3 text-left text-sm font-bold ${
              item.id === selected.id ? "bg-ink text-white" : "bg-black/[0.04]"
            }`}
            onClick={() => setSelectedId(item.id)}
          >
            {item.title}
            <span className={`mt-1 block text-xs font-normal ${item.id === selected.id ? "text-white/55" : "text-black/45"}`}>
              {item.status} · {item.hasDetailPage ? "Detailseite" : "Liste"}
            </span>
          </button>
        ))}
      </aside>

      <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Item Editor</p>
            <h2 className="mt-2 text-2xl font-black">{selected.title}</h2>
            <a className="mt-1 block text-sm font-bold text-flamingo" href={`/${collectionKey}/${selected.slug}`} target="_blank">
              /{collectionKey}/{selected.slug}
            </a>
          </div>
          <button
            className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700 disabled:opacity-50"
            disabled={pending !== null}
            onClick={() => remove(selected)}
          >
            Loeschen
          </button>
        </div>

        {message ? <p className="rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{message}</p> : null}
        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Titel
            <input className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3" value={draft.title} onChange={(event) => updateDraft(selected.id, { title: event.target.value })} />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Slug
            <input className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3" value={draft.slug} onChange={(event) => updateDraft(selected.id, { slug: event.target.value })} />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Status
            <select className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3" value={draft.status} onChange={(event) => updateDraft(selected.id, { status: event.target.value as CollectionItem["status"] })}>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </label>
          <label className="flex items-center justify-between rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-bold">
            Detailseite aktiv
            <input type="checkbox" checked={draft.hasDetailPage} onChange={(event) => updateDraft(selected.id, { hasDetailPage: event.target.checked })} />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">
            Meta Title
            <input className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3" value={draft.metaTitle} onChange={(event) => updateDraft(selected.id, { metaTitle: event.target.value })} />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Meta Image
            <input className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3" value={draft.ogImage} onChange={(event) => updateDraft(selected.id, { ogImage: event.target.value })} />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-bold">
          Meta Description
          <textarea className="min-h-[90px] rounded-xl border border-black/10 bg-[#fbfaf8] p-3" value={draft.metaDescription} onChange={(event) => updateDraft(selected.id, { metaDescription: event.target.value })} />
        </label>
        <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Collection Daten</p>
            <h3 className="mt-1 text-lg font-black">Felder aus dem Collection-Schema</h3>
          </div>
          {fields.map((field) => (
            <CmsFieldEditor
              key={field.name}
              field={field}
              value={draft.data[field.name]}
              onChange={(value) =>
                updateDraft(selected.id, {
                  data: { ...draft.data, [field.name]: value }
                })
              }
            />
          ))}
        </div>
        <button className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white disabled:opacity-50" disabled={pending !== null} onClick={() => save(selected, draft)}>
          Speichern
        </button>
      </section>
    </div>
  );
}
