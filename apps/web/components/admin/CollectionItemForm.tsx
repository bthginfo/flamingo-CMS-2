"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch } from "./api-client";
import { createEmptyCollectionData } from "./collection-field-schema";

export function CollectionItemForm({
  collectionKey,
  schema
}: {
  collectionKey: string;
  schema: Record<string, unknown>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [hasDetailPage, setHasDetailPage] = useState(true);
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const response = await adminFetch(`/api/admin/collections/${collectionKey}/items`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        description,
        hasDetailPage,
        status,
        data: { ...createEmptyCollectionData(schema), description }
      })
    });
    const result = await response.json();

    setPending(false);
    if (!response.ok) {
      setError(result.error ?? "Item konnte nicht erstellt werden.");
      return;
    }

    setTitle("");
    setSlug("");
    setDescription("");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black">Neues Item</h2>
      <label className="grid gap-2 text-sm font-bold">
        Titel
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => {
            setTitle(event.target.value);
            if (!slug) {
              setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
            }
          }}
          required
          value={title}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Slug
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setSlug(event.target.value)}
          required
          value={slug}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Beschreibung
        <textarea
          className="min-h-28 rounded-xl border border-black/10 p-3"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
      </label>
      <label className="flex items-center gap-3 text-sm font-bold">
        <input
          checked={hasDetailPage}
          onChange={(event) => setHasDetailPage(event.target.checked)}
          type="checkbox"
        />
        Detailseite erzeugen
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Status
        <select
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button
        className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Wird erstellt..." : "Item erstellen"}
      </button>
    </form>
  );
}
