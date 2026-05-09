import { collections } from "../../../lib/seed";

export default function CollectionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Collections</h1>
      <p className="mt-2 text-black/60">
        Strukturierte Inhalte mit optionalen Detailseiten: News, Projekte, Zimmer, Speisen und mehr.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {collections.map((collection) => (
          <article key={collection.id} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-black/40">
              {collection.key}
            </p>
            <h2 className="mt-3 text-2xl font-black">{collection.label}</h2>
            <p className="mt-2 text-black/60">
              {collection.items.length} Items · Detailseiten{" "}
              {collection.detailPagesEnabled ? "aktiv" : "inaktiv"}
            </p>
            <a
              className="mt-5 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
              href={`/admin/collections/${collection.key}`}
            >
              Öffnen
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
