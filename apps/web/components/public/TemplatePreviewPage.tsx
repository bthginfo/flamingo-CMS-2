import { styles, type StyleKey } from "@flamingo/shared";
import type { TemplatePreviewData } from "./template-preview-data";

const styleCopy: Record<StyleKey, string> = {
  classic: "Ruhig, hochwertig und mit viel Raum fuer Bilder und Vertrauen.",
  modern: "Modular, schnell erfassbar und perfekt fuer Besucher mit wenig Zeit.",
  bold: "Kontrastreich, direkt und gebaut fuer starke erste Eindruecke."
};

export function TemplatePreviewPage({ data }: { data: TemplatePreviewData }) {
  return (
    <div
      className={`template-preview tpl-style-${data.style} tpl-variant-${data.industry}`}
      style={{ ["--tpl-accent" as string]: data.accent, ["--tpl-dark" as string]: data.dark }}
    >
      <TemplateNav data={data} />
      <TemplateHero data={data} />
      <TemplateModules data={data} />
      <TemplateSignature data={data} />
      <TemplateGallery data={data} />
      <TemplateProcess data={data} />
      <TemplateCta data={data} />
    </div>
  );
}

function TemplateNav({ data }: { data: TemplatePreviewData }) {
  return (
    <div className="sticky top-[93px] z-30 border-b border-black/10 bg-white/88 px-5 py-3 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a className="text-lg font-black tracking-[-0.03em]" href="/beispiele">
          {data.brand}
        </a>
        <nav className="hidden items-center gap-5 text-sm font-bold text-black/60 md:flex">
          {data.nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-black">
              {item}
            </a>
          ))}
        </nav>
        <a className="showcase-button showcase-button-compact" href="/kontakt">
          {data.nav[1] ?? "Anfragen"}
        </a>
      </div>
    </div>
  );
}

function TemplateHero({ data }: { data: TemplatePreviewData }) {
  return (
    <section className="relative min-h-[82vh] overflow-hidden bg-[#101317] px-5 py-20 text-white md:px-8 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="showcase-eyebrow text-white/70">{data.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
            {data.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-white/75">{data.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="showcase-button showcase-button-light" href="/kontakt">
              {data.nav[1] ?? "Termin anfragen"}
            </a>
            <a
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black"
              href="#module"
            >
              Angebot ansehen
            </a>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.08] p-3 backdrop-blur">
          <div className="rounded-md bg-white p-5 text-black">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/50">
              Heute verfuegbar
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {data.metrics.map((metric) => (
                <div key={metric.label} className="rounded-md bg-black/[0.04] p-4">
                  <p className="text-2xl font-black">{metric.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/50">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-md p-4 text-sm font-bold leading-6 text-white" style={{ background: data.dark }}>
              {styleCopy[data.style]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplateModules({ data }: { data: TemplatePreviewData }) {
  return (
    <section id="module" className="showcase-band px-5 py-20 md:px-8 md:py-28" style={{ background: data.surface }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="showcase-eyebrow">Angebot</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.96] md:text-6xl">
              Genau die Inhalte, nach denen Besucher wirklich suchen.
            </h2>
          </div>
          <p className="text-lg leading-8 text-black/60">
            Preise, Leistungen, Verfuegbarkeit, Team, Lage und Kontaktwege sind nicht Deko. Sie
            werden als echte CMS-Inhalte gefuehrt und koennen spaeter sauber gepflegt werden.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {data.modules.map((module, index) => (
            <article key={module.title} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
              <p className="font-mono text-xs text-black/40">/ {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-2xl font-black">{module.title}</h3>
              <p className="mt-4 leading-7 text-black/60">{module.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateSignature({ data }: { data: TemplatePreviewData }) {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="showcase-eyebrow">{data.nav[0] ?? "Highlights"}</p>
          <h2 className="mt-4 text-5xl font-black leading-[0.96] md:text-6xl">
            Ausgewaehlte Highlights.
          </h2>
          <p className="mt-5 text-lg leading-8 text-black/60">
            Diese Liste ist exemplarisch, aber nicht abstrakt: genau solche Inhalte liegen spaeter
            in Collections und koennen im Admin erweitert werden.
          </p>
        </div>
        <div className="grid gap-3">
          {data.signature.map((item) => (
            <article
              key={item.title}
              className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-2 text-black/60">{item.detail}</p>
              </div>
              {item.price ? (
                <p className="rounded-full px-4 py-2 text-sm font-black text-white" style={{ background: data.dark }}>
                  {item.price}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateGallery({ data }: { data: TemplatePreviewData }) {
  return (
    <section className="bg-ink px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">Atmosphaere</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.96] md:text-6xl">
              Eine Bildwelt, die nach echter Marke aussieht.
            </h2>
          </div>
          <p className="max-w-md leading-7 text-white/70">
            Grosse Bilder, klare Kontraste und passende Schnitte machen aus einer Template-Struktur
            eine Seite mit eigenem Charakter.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {data.gallery.map((image, index) => (
            <div
              key={image}
              className={`min-h-[360px] rounded-lg border border-white/10 bg-cover bg-center ${
                index === 1 ? "md:mt-10" : ""
              }`}
              style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,.45), transparent), url(${image})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateProcess({ data }: { data: TemplatePreviewData }) {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="showcase-eyebrow">Besucherweg</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.process.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-5xl font-black" style={{ color: data.accent }}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
              <p className="mt-4 leading-7 text-black/60">{step.body}</p>
            </article>
          ))}
        </div>
        <blockquote className="mt-12 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
          <span aria-hidden>&quot;</span>
          {data.quote}
          <span aria-hidden>&quot;</span>
        </blockquote>
      </div>
    </section>
  );
}

function TemplateCta({ data }: { data: TemplatePreviewData }) {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto rounded-lg p-8 text-white md:p-12" style={{ background: data.dark }}>
        <div className="grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
              {data.label} / {data.style}
            </p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.96] md:text-6xl">
              Dieses Look & Feel fuer eine echte Marke starten.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="showcase-button showcase-button-light" href="/kontakt">
              Angebot anfragen
            </a>
            <a
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black"
              href="/beispiele"
            >
              Zur Galerie
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-2">
        {styles.map((style) => (
          <a
            key={style}
            className={`rounded-full border px-4 py-2 text-sm font-black ${
              style === data.style
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white text-black hover:border-black/30"
            }`}
            href={`/templates/${data.industry}/${style}`}
          >
            {style}
          </a>
        ))}
      </div>
    </section>
  );
}
