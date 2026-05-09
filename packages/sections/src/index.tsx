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
  tirol_funding_calculator: TirolFundingCalculatorSection
};

export function getSectionDefinition(type: string) {
  return sectionDefinitions.find((definition) => definition.type === type);
}
