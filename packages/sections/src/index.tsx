import { z } from "zod";
import type { SectionDefinition, SectionDesignSettings } from "@flamingo/cms-core";
import type { SiteContext } from "@flamingo/cms-core";
import { calculateTirolFunding, tirolFundingConfig } from "@flamingo/funding";
import { cn } from "@flamingo/shared";

export const buttonSchema = z.object({
  label: z.string(),
  href: z.string()
});

export const heroSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  description: z.string(),
  primaryCta: buttonSchema,
  secondaryCta: buttonSchema.optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string()
    })
    .optional(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).default([])
});

export const contentSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string(),
  bullets: z.array(z.string()).default([])
});

export const ctaSchema = z.object({
  headline: z.string(),
  description: z.string(),
  primaryCta: buttonSchema,
  secondaryCta: buttonSchema.optional()
});

export const faqSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  items: z.array(z.object({ question: z.string(), answer: z.string() }))
});

export const collectionGridSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  collectionKey: z.string(),
  limit: z.number().min(1).max(24).default(6)
});

export const fundingCalculatorSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  description: z.string(),
  disclaimer: z.string(),
  rates: z.object({
    micro: z.number(),
    small: z.number(),
    mediumLarge: z.number()
  }),
  maxEligibleCosts: z.object({
    micro: z.number(),
    small: z.number(),
    mediumLarge: z.number()
  }),
  leadFormId: z.string(),
  resultCtaLabel: z.string(),
  resultCtaHref: z.string().optional()
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string()
});

export const serviceBentoSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  description: z.string().optional(),
  items: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      icon: z.string().optional(),
      href: z.string().optional(),
      image: imageSchema.optional()
    })
  )
});

export const galleryMosaicSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  description: z.string().optional(),
  images: z.array(imageSchema)
});

export const testimonialWallSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  testimonials: z.array(
    z.object({
      quote: z.string(),
      name: z.string(),
      role: z.string().optional()
    })
  )
});

export const pricingCardsSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  plans: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
      featured: z.boolean().default(false),
      features: z.array(z.string()).default([]),
      cta: buttonSchema
    })
  )
});

export const locationHoursSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  hours: z.array(z.object({ day: z.string(), value: z.string() }))
});

export const logoMarqueeSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string().optional(),
  logos: z.array(z.object({ name: z.string(), image: imageSchema.optional() }))
});

function SectionFrame({
  design,
  children
}: {
  design?: SectionDesignSettings;
  children: React.ReactNode;
}) {
  const background = design?.background ?? "paper";
  return (
    <section
      className={cn(
        "showcase-band px-5 py-20 md:px-8 md:py-28",
        background === "ink" && "bg-ink text-white",
        background === "brand" && "bg-flamingo text-white",
        background === "muted" && "bg-white",
        background === "paper" && "bg-paper"
      )}
    >
      <div
        className={cn(
          "mx-auto",
          design?.container === "narrow" && "max-w-3xl",
          (!design?.container || design.container === "default") && "max-w-6xl",
          design?.container === "wide" && "max-w-7xl",
          design?.container === "full" && "max-w-none"
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function HeroSection({
  data,
  design
}: {
  data: z.infer<typeof heroSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={{ ...design, background: "ink", container: "wide" }}>
      <div className="grid min-h-[74vh] items-end gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="showcase-eyebrow mb-5 text-white/70">
            {data.eyebrow}
          </p>
          <h1 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-tight text-white md:text-8xl">
            {data.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-white/75">
            {data.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="showcase-button showcase-button-light"
              href={data.primaryCta.href}
            >
              {data.primaryCta.label}
            </a>
            {data.secondaryCta ? (
              <a
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-ink"
                href={data.secondaryCta.href}
              >
                {data.secondaryCta.label}
              </a>
            ) : null}
          </div>
          {data.stats.length > 0 ? (
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {data.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-3xl font-black text-white">{stat.value}</dt>
                  <dd className="mt-1 text-sm text-white/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 text-white shadow-soft backdrop-blur">
          <div className="grid min-h-[420px] content-between rounded-md border border-white/10 bg-black/30 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-white/70">
              CMS Preview
            </p>
            <p className="mt-3 max-w-sm text-2xl font-black">
              Jede sichtbare Fläche wird aus validierten CMS-Daten gerendert.
            </p>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

export function ContentSection({
  data,
  design
}: {
  data: z.infer<typeof contentSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={design}>
      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          {data.eyebrow ? (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-flamingo">
              {data.eyebrow}
            </p>
          ) : null}
          <h2 className="text-5xl font-black leading-[0.98] tracking-tight md:text-6xl">{data.headline}</h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-black/70">{data.body}</p>
          {data.bullets.length > 0 ? (
            <ul className="mt-7 grid gap-3">
              {data.bullets.map((item) => (
                <li key={item} className="rounded-lg border border-black/10 bg-white p-4 font-bold shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </SectionFrame>
  );
}

export function CtaSection({
  data,
  design
}: {
  data: z.infer<typeof ctaSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={{ background: "ink", container: "default", ...design }}>
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-5xl font-black leading-[0.96] tracking-tight text-white md:text-6xl">
            {data.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            {data.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            className="showcase-button showcase-button-light"
            href={data.primaryCta.href}
          >
            {data.primaryCta.label}
          </a>
          {data.secondaryCta ? (
            <a
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-ink"
              href={data.secondaryCta.href}
            >
              {data.secondaryCta.label}
            </a>
          ) : null}
        </div>
      </div>
    </SectionFrame>
  );
}

export function FaqSection({
  data,
  design
}: {
  data: z.infer<typeof faqSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={design}>
      {data.eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-flamingo">
          {data.eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight md:text-6xl">
        {data.headline}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data.items.map((item) => (
          <article key={item.question} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <h3 className="font-black">{item.question}</h3>
            <p className="mt-3 leading-7 text-black/65">{item.answer}</p>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function CollectionGridSection({
  data,
  design,
  context
}: {
  data: z.infer<typeof collectionGridSchema>;
  design?: SectionDesignSettings;
  context: SiteContext;
}) {
  const collection = context.collections.find((item) => item.key === data.collectionKey);
  const items = collection?.items.filter((item) => item.status === "published").slice(0, data.limit) ?? [];

  return (
    <SectionFrame design={design}>
      {data.eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-flamingo">
          {data.eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight md:text-6xl">{data.headline}</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.id}
            className="group rounded-lg border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-black/20 hover:shadow-soft"
            href={item.hasDetailPage ? `/${collection?.key}/${item.slug}` : "#"}
          >
            <p className="text-sm uppercase tracking-[0.14em] text-black/45">
              {collection?.itemLabel}
            </p>
            <h3 className="mt-3 text-2xl font-black group-hover:text-flamingo">{item.title}</h3>
            <p className="mt-3 leading-7 text-black/65">{String(item.data.description ?? "")}</p>
          </a>
        ))}
      </div>
    </SectionFrame>
  );
}

export function TirolFundingCalculatorSection({
  data,
  design
}: {
  data: z.infer<typeof fundingCalculatorSchema>;
  design?: SectionDesignSettings;
}) {
  const example = calculateTirolFunding({
    locatedInTirol: true,
    companySize: "small",
    projectType: "booking_system",
    hasProcessConnection: true,
    projectBudget: 24000
  });

  return (
    <SectionFrame design={design}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-flamingo">
            {data.eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">{data.headline}</h1>
          <p className="mt-5 text-lg leading-8 text-black/70">{data.description}</p>
          <p className="mt-6 text-sm leading-6 text-black/50">{data.disclaimer}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Standort
              <select className="rounded-xl border border-black/10 p-3">
                <option>Tirol</option>
                <option>Außerhalb Tirols</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Unternehmensgröße
              <select className="rounded-xl border border-black/10 p-3">
                <option>Kleinunternehmen</option>
                <option>Kleinstunternehmen</option>
                <option>Mittleres/großes Unternehmen</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Projektbudget
              <input className="rounded-xl border border-black/10 p-3" defaultValue="24000" />
            </label>
          </div>
          <div className="mt-6 rounded-2xl bg-ink p-5 text-white">
            <p className="text-sm text-white/60">Beispielhafte Ersteinschätzung</p>
            <p className="mt-2 text-4xl font-black">
              {example.estimatedFunding.toLocaleString("de-AT")} EUR
            </p>
            <p className="mt-2 text-sm text-white/70">
              Status: {example.eligibility === "likely" ? "wahrscheinlich passend" : "zu prüfen"}
            </p>
          </div>
          <a
            href={data.resultCtaHref ?? "#lead"}
            className="mt-5 block rounded-full bg-flamingo px-5 py-3 text-center text-sm font-black text-white"
          >
            {data.resultCtaLabel}
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}

export function ServiceBentoSection({
  data,
  design
}: {
  data: z.infer<typeof serviceBentoSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={design}>
      {data.eyebrow ? <p className="showcase-eyebrow">{data.eyebrow}</p> : null}
      <div className="mt-4 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <h2 className="text-5xl font-black leading-[0.96] tracking-tight md:text-6xl">{data.headline}</h2>
        {data.description ? <p className="text-lg leading-8 text-black/65">{data.description}</p> : null}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, index) => (
          <article
            key={item.title}
            className={cn(
              "rounded-lg border border-black/10 bg-white p-6 shadow-sm",
              index === 0 && "md:col-span-2 lg:row-span-2"
            )}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/35">
              {item.icon ?? String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-8 text-2xl font-black">{item.title}</h3>
            <p className="mt-3 leading-7 text-black/60">{item.body}</p>
            {item.href ? (
              <a className="mt-6 inline-flex text-sm font-black text-flamingo" href={item.href}>
                Mehr erfahren
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function GalleryMosaicSection({
  data,
  design
}: {
  data: z.infer<typeof galleryMosaicSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={{ background: "ink", container: "wide", ...design }}>
      {data.eyebrow ? <p className="showcase-eyebrow text-white/70">{data.eyebrow}</p> : null}
      <div className="mt-4 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <h2 className="text-5xl font-black leading-[0.96] tracking-tight text-white md:text-6xl">{data.headline}</h2>
        {data.description ? <p className="text-lg leading-8 text-white/65">{data.description}</p> : null}
      </div>
      <div className="mt-10 grid auto-rows-[260px] gap-4 md:grid-cols-4">
        {data.images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className={cn(
              "overflow-hidden rounded-lg border border-white/10 bg-cover bg-center",
              index === 0 && "md:col-span-2 md:row-span-2",
              index === 3 && "md:col-span-2"
            )}
            style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,.42), transparent), url(${image.src})` }}
          >
            <figcaption className="sr-only">{image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </SectionFrame>
  );
}

export function TestimonialWallSection({
  data,
  design
}: {
  data: z.infer<typeof testimonialWallSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={design}>
      {data.eyebrow ? <p className="showcase-eyebrow">{data.eyebrow}</p> : null}
      <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.96] tracking-tight md:text-6xl">
        {data.headline}
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {data.testimonials.map((item) => (
          <blockquote key={item.quote} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-2xl font-black leading-tight">&quot;{item.quote}&quot;</p>
            <footer className="mt-6 text-sm font-bold text-black/55">
              {item.name}
              {item.role ? <span className="block font-normal">{item.role}</span> : null}
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionFrame>
  );
}

export function PricingCardsSection({
  data,
  design
}: {
  data: z.infer<typeof pricingCardsSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={design}>
      {data.eyebrow ? <p className="showcase-eyebrow">{data.eyebrow}</p> : null}
      <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.96] tracking-tight md:text-6xl">
        {data.headline}
      </h2>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {data.plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              "rounded-lg border p-6 shadow-sm",
              plan.featured ? "border-ink bg-ink text-white" : "border-black/10 bg-white"
            )}
          >
            <p className={cn("text-xs font-black uppercase tracking-[0.18em]", plan.featured ? "text-white/45" : "text-black/45")}>
              {plan.name}
            </p>
            <p className="mt-5 text-5xl font-black">{plan.price}</p>
            <p className={cn("mt-4 leading-7", plan.featured ? "text-white/65" : "text-black/60")}>{plan.description}</p>
            <ul className="mt-6 grid gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className={cn("rounded-md px-3 py-2 text-sm font-bold", plan.featured ? "bg-white/10" : "bg-paper")}>
                  {feature}
                </li>
              ))}
            </ul>
            <a className={cn("showcase-button mt-6", plan.featured && "showcase-button-light")} href={plan.cta.href}>
              {plan.cta.label}
            </a>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function LocationHoursSection({
  data,
  design
}: {
  data: z.infer<typeof locationHoursSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={design}>
      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          {data.eyebrow ? <p className="showcase-eyebrow">{data.eyebrow}</p> : null}
          <h2 className="mt-4 text-5xl font-black leading-[0.96] tracking-tight md:text-6xl">{data.headline}</h2>
          <div className="mt-6 grid gap-2 text-black/65">
            <p>{data.address}</p>
            {data.phone ? <a href={`tel:${data.phone}`}>{data.phone}</a> : null}
            {data.email ? <a href={`mailto:${data.email}`}>{data.email}</a> : null}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          {data.hours.map((row) => (
            <div key={row.day} className="flex justify-between gap-6 border-b border-black/10 py-3 last:border-0">
              <span className="font-bold">{row.day}</span>
              <span className="text-black/60">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

export function LogoMarqueeSection({
  data,
  design
}: {
  data: z.infer<typeof logoMarqueeSchema>;
  design?: SectionDesignSettings;
}) {
  return (
    <SectionFrame design={{ background: "muted", container: "wide", ...design }}>
      {data.eyebrow ? <p className="showcase-eyebrow">{data.eyebrow}</p> : null}
      {data.headline ? (
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">{data.headline}</h2>
      ) : null}
      <div className="mt-8 overflow-hidden border-y border-black/10 py-4">
        <div className="marquee text-black/55">
          <div className="marquee-track">
            {[...data.logos, ...data.logos, ...data.logos].map((logo, index) => (
              <span key={`${logo.name}-${index}`} className="marquee-item text-sm font-black uppercase tracking-[0.18em]">
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

export const sectionDefinitions: SectionDefinition[] = [
  {
    type: "hero",
    label: "Hero",
    description: "Starker Einstieg mit Headline, CTA und optionalen Kennzahlen.",
    category: "hero",
    icon: "Sparkles",
    tags: ["start", "conversion", "headline"],
    schema: heroSchema,
    defaultData: {
      eyebrow: "FlamingoMedia",
      headline: "Websites, die nicht nach Template aussehen.",
      description:
        "Ein CMS-getriebenes System für lokale Marken, Kampagnen und skalierbare Kunden-Websites.",
      primaryCta: { label: "Projekt starten", href: "/kontakt" },
      secondaryCta: { label: "Beispiele ansehen", href: "/beispiele" },
      stats: [
        { value: "9", label: "Branchen" },
        { value: "27", label: "Style Presets" },
        { value: "100%", label: "CMS Content" }
      ]
    },
    defaultDesign: { background: "paper", container: "wide", spacing: "generous" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", required: true },
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "description", label: "Beschreibung", type: "textarea", required: true },
      { name: "primaryCta", label: "Primärer CTA", type: "button-group", required: true }
    ]
  },
  {
    type: "content",
    label: "Content",
    description: "Editoriale Textsection mit Bulletpoints.",
    category: "content",
    icon: "Text",
    tags: ["text", "story", "seo"],
    schema: contentSchema,
    defaultData: {
      eyebrow: "CMS Core",
      headline: "Source of Truth bleibt das CMS.",
      body:
        "Seiten, Sections, Navigation, SEO, Design und Collections werden validiert gespeichert und vom Frontend nur gerendert.",
      bullets: ["Schema-basierte Felder", "Tenant Scope Enforcement", "Draft/Preview/Publish"]
    },
    defaultDesign: { background: "muted", container: "default", spacing: "standard" },
    defaultAnimation: { preset: "reveal", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "body", label: "Text", type: "richtext", required: true },
      { name: "bullets", label: "Bulletpoints", type: "repeater" }
    ]
  },
  {
    type: "collection_grid",
    label: "Collection Grid",
    description: "Rendert strukturierte Collection Items auf beliebigen Seiten.",
    category: "collection",
    icon: "LayoutGrid",
    tags: ["collections", "items", "detailseiten"],
    schema: collectionGridSchema,
    defaultData: {
      eyebrow: "Referenzen",
      headline: "Ausgewählte Arbeiten",
      collectionKey: "projects",
      limit: 6
    },
    defaultDesign: { background: "paper", container: "default", spacing: "standard" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "collectionKey", label: "Collection", type: "collection-picker", required: true },
      { name: "limit", label: "Limit", type: "number" }
    ],
    requiresCollection: true
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Häufige Fragen, auf jeder Seite nutzbar.",
    category: "trust",
    icon: "CircleHelp",
    tags: ["faq", "seo", "support"],
    schema: faqSchema,
    defaultData: {
      eyebrow: "FAQ",
      headline: "Fragen vor dem Start",
      items: [
        {
          question: "Kann jede Section auf jeder Seite genutzt werden?",
          answer: "Ja. Einschränkungen sind nur erlaubt, wenn sie technisch oder rechtlich nötig sind."
        },
        {
          question: "Sind neue Seiten ohne Entwickler möglich?",
          answer: "Ja. Der Page Editor erstellt Drafts, fügt Sections hinzu und veröffentlicht gezielt."
        }
      ]
    },
    defaultDesign: { background: "muted", container: "default", spacing: "standard" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "items", label: "Fragen", type: "repeater", required: true }
    ]
  },
  {
    type: "cta",
    label: "CTA",
    description: "Conversion-Section mit primärer Aktion.",
    category: "conversion",
    icon: "MousePointerClick",
    tags: ["lead", "kontakt", "conversion"],
    schema: ctaSchema,
    defaultData: {
      headline: "Bereit für eine Website, die sich weiterentwickeln kann?",
      description:
        "Neue Seiten, neue Sections, Collections und Veröffentlichungen laufen direkt im CMS.",
      primaryCta: { label: "Termin anfragen", href: "/kontakt" },
      secondaryCta: { label: "Förderung prüfen", href: "/foerderung" }
    },
    defaultDesign: { background: "ink", container: "default", spacing: "generous" },
    defaultAnimation: { preset: "reveal", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "description", label: "Beschreibung", type: "textarea", required: true },
      { name: "primaryCta", label: "CTA", type: "button-group", required: true }
    ]
  },
  {
    type: "service_bento",
    label: "Service Bento",
    description: "Flexible Leistungs- oder Feature-Kacheln mit starkem editorialem Einstieg.",
    category: "content",
    icon: "PanelsTopLeft",
    tags: ["leistungen", "features", "bento", "branchen"],
    schema: serviceBentoSchema,
    defaultData: {
      eyebrow: "Leistungen",
      headline: "Alles Wichtige auf einen Blick.",
      description: "Ideal fuer Branchen-Startseiten, Angebotsseiten und Landingpages.",
      items: [
        {
          title: "Beratung",
          body: "Ein klarer Einstieg fuer Besucher, die erst Orientierung brauchen.",
          icon: "01"
        },
        {
          title: "Umsetzung",
          body: "Konkrete Leistungen, Pakete oder Module werden schnell vergleichbar.",
          icon: "02"
        },
        {
          title: "Betreuung",
          body: "Support, Pflege oder laufende Angebote bleiben sichtbar.",
          icon: "03"
        }
      ]
    },
    defaultDesign: { background: "paper", container: "wide", spacing: "standard" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "description", label: "Beschreibung", type: "textarea" },
      { name: "items", label: "Kacheln", type: "repeater", required: true },
      { name: "icon", label: "Icons", type: "icon" }
    ]
  },
  {
    type: "gallery_mosaic",
    label: "Gallery Mosaic",
    description: "Grosszuegige Bildstrecke fuer Atmosphaere, Referenzen oder Lookbooks.",
    category: "media",
    icon: "Images",
    tags: ["bilder", "galerie", "lookbook", "portfolio"],
    schema: galleryMosaicSchema,
    defaultData: {
      eyebrow: "Galerie",
      headline: "Bilder, die den Charakter der Marke tragen.",
      description: "Eine visuelle Strecke fuer echte Fotos, Kampagnenbilder oder Referenzen.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
          alt: "Stimmungsvolles Interior"
        },
        {
          src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
          alt: "Hochwertiger Raum"
        },
        {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
          alt: "Landschaft und Erlebnis"
        }
      ]
    },
    defaultDesign: { background: "ink", container: "wide", spacing: "generous" },
    defaultAnimation: { preset: "reveal", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "description", label: "Beschreibung", type: "textarea" },
      { name: "images", label: "Bilder", type: "repeater", required: true },
      { name: "image", label: "Bild", type: "image" }
    ]
  },
  {
    type: "testimonial_wall",
    label: "Testimonial Wall",
    description: "Stimmen, Bewertungen oder kurze Trust-Zitate.",
    category: "trust",
    icon: "Quote",
    tags: ["bewertungen", "trust", "kunden"],
    schema: testimonialWallSchema,
    defaultData: {
      eyebrow: "Stimmen",
      headline: "Was Besucher nach dem ersten Eindruck spueren sollen.",
      testimonials: [
        { quote: "Sofort klar, hochwertig und einfach zu bedienen.", name: "Kundin" },
        { quote: "Die Seite beantwortet genau die Fragen vor der Anfrage.", name: "Besucher" },
        { quote: "Wir koennen Inhalte endlich selbst sauber pflegen.", name: "Team" }
      ]
    },
    defaultDesign: { background: "paper", container: "default", spacing: "standard" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "testimonials", label: "Testimonials", type: "repeater", required: true }
    ]
  },
  {
    type: "pricing_cards",
    label: "Pricing Cards",
    description: "Pakete, Angebote oder Mitgliedschaften mit CTA.",
    category: "conversion",
    icon: "BadgeEuro",
    tags: ["preise", "pakete", "angebote", "conversion"],
    schema: pricingCardsSchema,
    defaultData: {
      eyebrow: "Pakete",
      headline: "Klare Optionen fuer schnelle Entscheidungen.",
      plans: [
        {
          name: "Start",
          price: "ab 990",
          description: "Der schnelle Einstieg mit klarem Leistungsumfang.",
          featured: false,
          features: ["Landingpage", "Kontakt", "SEO-Basis"],
          cta: { label: "Anfragen", href: "/kontakt" }
        },
        {
          name: "Growth",
          price: "ab 1.900",
          description: "Mehr Seiten, mehr Content und bessere Lead-Strecken.",
          featured: true,
          features: ["Collections", "Formulare", "Galerie", "Preview"],
          cta: { label: "Growth starten", href: "/kontakt" }
        }
      ]
    },
    defaultDesign: { background: "muted", container: "default", spacing: "standard" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "plans", label: "Pakete", type: "repeater", required: true },
      { name: "featured", label: "Highlight", type: "boolean" }
    ]
  },
  {
    type: "location_hours",
    label: "Location & Hours",
    description: "Adresse, Kontakt und Oeffnungszeiten fuer lokale Unternehmen.",
    category: "contact",
    icon: "MapPin",
    tags: ["kontakt", "oeffnungszeiten", "local"],
    schema: locationHoursSchema,
    defaultData: {
      eyebrow: "Besuch",
      headline: "Adresse und Zeiten ohne Suchen.",
      address: "Musterstrasse 12, 6020 Innsbruck",
      phone: "+43 512 000000",
      email: "hello@example.com",
      hours: [
        { day: "Montag - Freitag", value: "09:00 - 18:00" },
        { day: "Samstag", value: "10:00 - 14:00" },
        { day: "Sonntag", value: "geschlossen" }
      ]
    },
    defaultDesign: { background: "paper", container: "default", spacing: "standard" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "address", label: "Adresse", type: "text", required: true },
      { name: "phone", label: "Telefon", type: "text" },
      { name: "email", label: "E-Mail", type: "text" },
      { name: "hours", label: "Oeffnungszeiten", type: "opening-hours", required: true },
      { name: "map", label: "Karte", type: "map" }
    ]
  },
  {
    type: "logo_marquee",
    label: "Logo Marquee",
    description: "Laufende Trust-Leiste fuer Kunden, Partner, Medien oder Branchen.",
    category: "trust",
    icon: "BadgeCheck",
    tags: ["logos", "partner", "trust", "marquee"],
    schema: logoMarqueeSchema,
    defaultData: {
      eyebrow: "Vertrauen",
      headline: "Passend fuer lokale Marken mit Anspruch.",
      logos: [
        { name: "Restaurant" },
        { name: "Hotel" },
        { name: "Praxis" },
        { name: "Studio" },
        { name: "Immobilien" }
      ]
    },
    defaultDesign: { background: "muted", container: "wide", spacing: "compact" },
    defaultAnimation: { preset: "none", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text" },
      { name: "logos", label: "Eintraege", type: "repeater", required: true },
      { name: "image", label: "Logo", type: "image" }
    ]
  },
  {
    type: "tirol_funding_calculator",
    label: "Tirol Förderrechner",
    description: "Unverbindlicher Fördercheck für Digitalisierungsprojekte in Tirol.",
    category: "showcase",
    icon: "Calculator",
    tags: ["foerderung", "tirol", "lead"],
    schema: fundingCalculatorSchema,
    defaultData: {
      eyebrow: "Digitalisierungsförderung Tirol",
      headline: "Förderpotenzial in wenigen Schritten einschätzen.",
      description:
        "Der Rechner prüft Standort, Projektart, Prozessbezug und Budget und leitet passende Leads direkt weiter.",
      disclaimer: tirolFundingConfig.disclaimer,
      rates: tirolFundingConfig.rates,
      maxEligibleCosts: tirolFundingConfig.maxEligibleCosts,
      leadFormId: "funding-lead",
      resultCtaLabel: "Kostenlose Einschätzung anfragen",
      resultCtaHref: "/kontakt"
    },
    defaultDesign: { background: "paper", container: "wide", spacing: "generous" },
    defaultAnimation: { preset: "fade-up", reducedMotionSafe: true },
    adminFields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "description", label: "Beschreibung", type: "textarea", required: true },
      { name: "leadFormId", label: "Lead Formular", type: "form-picker", required: true }
    ]
  }
];

export const sectionComponentMap = {
  hero: HeroSection,
  content: ContentSection,
  collection_grid: CollectionGridSection,
  faq: FaqSection,
  cta: CtaSection,
  service_bento: ServiceBentoSection,
  gallery_mosaic: GalleryMosaicSection,
  testimonial_wall: TestimonialWallSection,
  pricing_cards: PricingCardsSection,
  location_hours: LocationHoursSection,
  logo_marquee: LogoMarqueeSection,
  tirol_funding_calculator: TirolFundingCalculatorSection
};

export function getSectionDefinition(type: string) {
  return sectionDefinitions.find((definition) => definition.type === type);
}
