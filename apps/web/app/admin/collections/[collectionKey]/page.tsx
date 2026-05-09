import { notFound } from "next/navigation";
import { CollectionItemForm } from "../../../../components/admin/CollectionItemForm";
import { collections } from "../../../../lib/seed";

export default function CollectionDetailPage({
  params
}: {
  params: { collectionKey: string };
}) {
  const collection = collections.find((item) => item.key === params.collectionKey);
  if (!collection) {
    notFound();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-black/40">
            Collection
          </p>
          <h1 className="mt-2 text-3xl font-black">{collection.label}</h1>
          <p className="mt-2 text-black/60">
            {collection.items.length} Items · Detailseiten{" "}
            {collection.detailPagesEnabled ? "aktiv" : "inaktiv"}
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          {collection.items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 border-b border-black/5 p-5 md:grid-cols-[1fr_160px_150px]"
            >
              <div>
                <p className="font-black">{item.title}</p>
                <p className="text-sm text-black/50">
                  /{collection.key}/{item.slug}
                </p>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  {String(item.data.description ?? "")}
                </p>
              </div>
              <span className="text-sm font-bold text-black/55">{item.status}</span>
              <span className="text-sm font-bold text-black/55">
                {item.hasDetailPage ? "Detailseite" : "Nur Liste"}
              </span>
            </article>
          ))}
        </div>
      </section>
      <aside>
        <CollectionItemForm collectionKey={collection.key} />
      </aside>
    </div>
  );
}
