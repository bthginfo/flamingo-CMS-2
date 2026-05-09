"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminFetch } from "./api-client";

export type AdminSectionOption = {
  type: string;
  label: string;
};

export function NewPageForm({ sections }: { sections: AdminSectionOption[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("standard");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const response = await adminFetch("/api/admin/pages", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, slug, type, addToNavigation: false })
    });
    const result = await response.json();

    setPending(false);
    if (!response.ok) {
      setError(result.error ?? "Seite konnte nicht erstellt werden.");
      return;
    }

    router.push(`/admin/pages/${result.page.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5 rounded-2xl bg-white p-6 shadow-sm">
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
          placeholder="z.B. Hochzeiten"
          required
          value={title}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Slug
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setSlug(event.target.value)}
          placeholder="/hochzeiten"
          required
          value={slug}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Page Type
        <select
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setType(event.target.value)}
          value={type}
        >
          <option value="standard">standard</option>
          <option value="landing">landing</option>
          <option value="collection_index">collection_index</option>
          <option value="legal">legal</option>
        </select>
      </label>
      <div>
        <p className="text-sm font-black">Verfügbare Start-Sections</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sections.map((section) => (
            <span key={section.type} className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-bold">
              {section.label}
            </span>
          ))}
        </div>
      </div>
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button
        className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Draft wird erstellt..." : "Draft erstellen"}
      </button>
    </form>
  );
}
