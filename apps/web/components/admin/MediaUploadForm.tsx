"use client";

import { useState } from "react";
import { adminFetch } from "./api-client";

export function MediaUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Bitte eine Datei auswählen.");
      return;
    }

    setPending(true);
    setError(null);
    setMessage(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("alt", alt);
    formData.set("caption", caption);

    const response = await adminFetch("/api/admin/media", {
      method: "POST",
      body: formData
    });
    const result = await response.json();

    setPending(false);
    if (!response.ok) {
      setError(result.error ?? "Upload fehlgeschlagen.");
      return;
    }

    setFile(null);
    setAlt("");
    setCaption("");
    setMessage(`Upload gespeichert: ${result.asset.filename}`);
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-5 rounded-2xl bg-white p-6 shadow-sm">
      <label className="grid gap-2 text-sm font-bold">
        Datei
        <input
          accept="image/*,application/pdf"
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          type="file"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Alt Text
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setAlt(event.target.value)}
          value={alt}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Caption
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
      </label>
      {message ? <p className="rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{message}</p> : null}
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button
        className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Upload läuft..." : "Upload"}
      </button>
    </form>
  );
}
