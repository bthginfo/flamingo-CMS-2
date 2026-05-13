"use client";

import { useEffect, useState } from "react";
import type { MediaAsset } from "@flamingo/cms-core";
import { adminFetch } from "./api-client";

export function MediaLibraryClient({ initialAssets = [] }: { initialAssets?: MediaAsset[] }) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [selected, setSelected] = useState<MediaAsset | null>(initialAssets[0] ?? null);
  const [alt, setAlt] = useState(selected?.alt ?? "");
  const [caption, setCaption] = useState(selected?.caption ?? "");
  const [focalPointX, setFocalPointX] = useState(selected?.focalPointX ?? 50);
  const [focalPointY, setFocalPointY] = useState(selected?.focalPointY ?? 50);
  const [message, setMessage] = useState<string | null>(null);

  async function loadAssets() {
    const response = await adminFetch("/api/admin/media");
    if (!response.ok) {
      setMessage("Assets konnten nicht geladen werden.");
      return;
    }
    const result = (await response.json()) as { assets: MediaAsset[] };
    setAssets(result.assets);
    setSelected((current) => current ?? result.assets[0] ?? null);
  }

  useEffect(() => {
    void loadAssets();
  }, []);

  useEffect(() => {
    setAlt(selected?.alt ?? "");
    setCaption(selected?.caption ?? "");
    setFocalPointX(selected?.focalPointX ?? 50);
    setFocalPointY(selected?.focalPointY ?? 50);
  }, [selected]);

  async function saveSelected() {
    if (!selected) {
      return;
    }

    const response = await adminFetch(`/api/admin/media/${selected.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ alt, caption, focalPointX, focalPointY })
    });

    if (!response.ok) {
      setMessage("Metadaten konnten nicht gespeichert werden.");
      return;
    }

    setMessage("Metadaten gespeichert.");
    await loadAssets();
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div className="grid gap-3 md:grid-cols-2">
        {assets.length === 0 ? (
          <div className="rounded-lg border border-dashed border-black/20 bg-paper p-8 text-sm font-bold text-black/45">
            Noch keine Uploads in der Media Library.
          </div>
        ) : null}
        {assets.map((asset) => (
          <button
            key={asset.id}
            className={`overflow-hidden rounded-lg border bg-paper text-left ${
              selected?.id === asset.id ? "border-ink ring-2 ring-ink" : "border-black/10"
            }`}
            onClick={() => setSelected(asset)}
          >
            {asset.type === "image" ? (
              <div
                className="min-h-[220px] bg-cover"
                style={{
                  backgroundImage: `url(${asset.url})`,
                  backgroundPosition: `${asset.focalPointX ?? 50}% ${asset.focalPointY ?? 50}%`
                }}
              />
            ) : (
              <div className="grid min-h-[220px] place-items-center bg-black/[0.04] font-black">
                {asset.type}
              </div>
            )}
            <div className="p-4">
              <p className="font-black">{asset.filename}</p>
              <p className="mt-1 text-sm text-black/55">{asset.alt ?? "Alt-Text fehlt"}</p>
            </div>
          </button>
        ))}
      </div>

      <aside className="rounded-lg border border-black/10 bg-white p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Asset Inspector</p>
        {selected ? (
          <div className="mt-4 grid gap-4">
            <p className="font-black">{selected.filename}</p>
            <label className="grid gap-2 text-sm font-bold">
              Alt Text
              <input className="rounded-xl border border-black/10 p-3" value={alt} onChange={(event) => setAlt(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Caption
              <input className="rounded-xl border border-black/10 p-3" value={caption} onChange={(event) => setCaption(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Focal Point X
              <input type="range" min="0" max="100" value={focalPointX} onChange={(event) => setFocalPointX(Number(event.target.value))} />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Focal Point Y
              <input type="range" min="0" max="100" value={focalPointY} onChange={(event) => setFocalPointY(Number(event.target.value))} />
            </label>
            <button className="rounded-full bg-ink px-4 py-3 text-sm font-black text-white" onClick={saveSelected}>
              Metadaten speichern
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm font-bold text-black/45">Asset auswählen.</p>
        )}
        {message ? <p className="mt-4 rounded-xl bg-black/[0.04] p-3 text-sm font-bold">{message}</p> : null}
      </aside>
    </div>
  );
}
