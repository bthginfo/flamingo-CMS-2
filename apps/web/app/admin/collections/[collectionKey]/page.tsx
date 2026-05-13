import { notFound } from "next/navigation";
import { CollectionItemsEditor } from "../../../../components/admin/CollectionItemsEditor";
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
        <div className="mt-8">
          <CollectionItemsEditor collectionKey={collection.key} items={collection.items} />
        </div>
      </section>
      <aside>
        <CollectionItemForm collectionKey={collection.key} />
      </aside>
    </div>
  );
}
