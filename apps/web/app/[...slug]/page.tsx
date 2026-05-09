import { notFound } from "next/navigation";
import { PageRenderer } from "../../components/public/PageRenderer";
import { SiteShell } from "../../components/public/SiteShell";
import { collections, getSiteContext } from "../../lib/seed";

export default function DynamicCmsPage({ params }: { params: { slug: string[] } }) {
  const path = `/${params.slug.join("/")}`;
  const context = getSiteContext(path);

  if (context) {
    return (
      <SiteShell context={context}>
        <PageRenderer context={context} />
      </SiteShell>
    );
  }

  const [collectionKey, itemSlug] = params.slug;
  const collection = collections.find((item) => item.key === collectionKey);
  const item = collection?.items.find(
    (candidate) =>
      candidate.slug === itemSlug &&
      candidate.status === "published" &&
      candidate.hasDetailPage
  );

  if (!collection || !item) {
    notFound();
  }

  const shellContext = getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={shellContext}>
      <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-flamingo">
            {collection.itemLabel}
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight">{item.title}</h1>
          <p className="mt-6 text-lg leading-8 text-black/65">
            {String(item.data.description ?? "")}
          </p>
          <dl className="mt-8 grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
            {Object.entries(item.data).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-bold uppercase tracking-[0.12em] text-black/40">
                  {key}
                </dt>
                <dd className="mt-1 font-bold">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>
    </SiteShell>
  );
}
