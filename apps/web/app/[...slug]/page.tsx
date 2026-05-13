import Image from "next/image";
import { notFound } from "next/navigation";
import { PageRenderer } from "../../components/public/PageRenderer";
import { SiteShell } from "../../components/public/SiteShell";
import { collections, getSiteContext } from "../../lib/seed";

type DetailCta = {
  label?: unknown;
  href?: unknown;
};

const RESERVED_DETAIL_KEYS = new Set([
  "eyebrow",
  "description",
  "teaserText",
  "excerpt",
  "richIntro",
  "featuredImage",
  "gallery",
  "features",
  "facts",
  "tags",
  "allergens",
  "ctas"
]);

function getString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getStringList(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function getCtas(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is DetailCta => typeof item === "object" && item !== null)
    .map((item) => ({
      label: getString(item.label),
      href: getString(item.href)
    }))
    .filter((item) => item.label && item.href);
}

function renderDetailValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(", ");
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return String(value);
}

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
  const eyebrow = getString(item.data.eyebrow) || collection.itemLabel;
  const description =
    getString(item.data.description) || getString(item.data.excerpt) || getString(item.data.teaserText);
  const teaserText = getString(item.data.teaserText) || getString(item.data.excerpt);
  const richIntro = getString(item.data.richIntro);
  const featuredImage = getString(item.data.featuredImage);
  const gallery = getStringList(item.data.gallery);
  const chips = [
    ...getStringList(item.data.features),
    ...getStringList(item.data.facts),
    ...getStringList(item.data.tags),
    ...getStringList(item.data.allergens)
  ];
  const ctas = getCtas(item.data.ctas);
  const detailEntries = Object.entries(item.data).filter(
    ([key, value]) => !RESERVED_DETAIL_KEYS.has(key) && value !== undefined && value !== null && value !== ""
  );

  return (
    <SiteShell context={shellContext}>
      <section className="bg-paper px-5 py-16 md:px-8 md:py-24">
        <article className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-flamingo">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              {item.title}
            </h1>
            {description ? (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/68 md:text-xl">
                {description}
              </p>
            ) : null}
            {teaserText && teaserText !== description ? (
              <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-black/78">
                {teaserText}
              </p>
            ) : null}
            {ctas.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {ctas.map((cta, index) => (
                  <a
                    key={`${cta.href}-${cta.label}`}
                    href={cta.href}
                    className={
                      index === 0
                        ? "rounded-md bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-flamingo"
                        : "rounded-md border border-black/15 px-5 py-3 text-sm font-black transition hover:border-black hover:bg-white"
                    }
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {featuredImage ? (
            <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white shadow-sm">
              <Image
                src={featuredImage}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </figure>
          ) : null}
        </article>

        <article className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div className="space-y-8">
            {richIntro ? (
              <div className="max-w-3xl text-lg leading-8 text-black/72">{richIntro}</div>
            ) : null}

            {chips.length ? (
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-black/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            {gallery.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {gallery.map((image) => (
                  <div key={image} className="relative aspect-[5/4] overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${item.title} Galerie`}
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {detailEntries.length ? (
            <dl className="grid content-start gap-4 rounded-lg bg-white p-6 shadow-sm">
              {detailEntries.map(([key, value]) => (
                <div key={key} className="border-b border-black/8 pb-4 last:border-0 last:pb-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-black/42">
                    {key}
                  </dt>
                  <dd className="mt-1 text-base font-black text-black/82">
                    {renderDetailValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </article>
      </section>
    </SiteShell>
  );
}
