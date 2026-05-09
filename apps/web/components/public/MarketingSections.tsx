import { PublicContactForm } from "./PublicContactForm";

const steps = [
  {
    title: "Template waehlen",
    body: "Branche, Stil und Seitenstruktur werden als startklarer Blueprint ausgewaehlt."
  },
  {
    title: "Inhalte einsetzen",
    body: "Texte, Bilder, Collections, SEO und Formulare wandern in die CMS-Struktur."
  },
  {
    title: "Preview freigeben",
    body: "Du pruefst die Live-Vorschau, wir schleifen Look, Copy und mobile Details."
  },
  {
    title: "Launch & Pflege",
    body: "Deployment, Vercel, Blob, Datenbank und kleine Pflege laufen als sauberer Betrieb."
  }
];

const packages = [
  {
    name: "Template",
    price: "ab 1.490",
    body: "Fuer schnelle, hochwertige Websites auf Basis einer Branchen-Preview.",
    items: ["1 Branche / 1 Style", "CMS-Seiten & Sections", "SEO-Basis", "Deployment"]
  },
  {
    name: "Growth",
    price: "ab 2.900",
    body: "Fuer lokale Marken, die Content, Bilder und Conversion ernster nehmen.",
    items: ["Mehrere Subpages", "Collections", "Formulare", "Feinschliff & Analytics"]
  },
  {
    name: "Custom",
    price: "auf Anfrage",
    body: "Fuer Sonderlogik, komplexe Integrationen oder ein staerker individuelles Design.",
    items: ["Custom Sections", "DB-Workflows", "Medien/Blob", "API-Integrationen"]
  }
];

const devices = [
  {
    label: "Template Preview",
    href: "/templates/restaurant/classic",
    title: "Restaurant Classic",
    body: "Hero, Module, Collection und CTA als komplette Vorschau."
  },
  {
    label: "Admin Demo",
    href: "/admin-demo",
    title: "CMS Editor",
    body: "Template wechseln, Headline editieren und Sections togglen."
  },
  {
    label: "Funding",
    href: "/foerderung",
    title: "Foerdercheck",
    body: "Lead-Strecke fuer Tiroler Digitalisierungsfoerderung."
  }
];

export function DeviceShowcase() {
  return (
    <section className="showcase-band bg-[#0b0810] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">In Aktion</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] md:text-7xl">
              Templates, Admin und Funnel als Produktgefuehl.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/70">
            Die neue Plattform zeigt nicht nur statische Seiten. Sie verbindet Template-Preview,
            Admin-Demo, Medien und Lead-Strecken in einem konsistenten Erlebnis.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <a
            className="group relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-5"
            href={devices[0].href}
          >
            <div className="h-full rounded-md border border-white/10 bg-white p-4 text-black shadow-soft">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-black/45">
                  {devices[0].label}
                </span>
                <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">
                  Live
                </span>
              </div>
              <div className="mt-5 grid min-h-[410px] content-end rounded-md bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-6 text-white">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white/70">
                  {devices[0].title}
                </p>
                <h3 className="mt-3 max-w-lg text-5xl font-black leading-[0.95]">
                  Eine Preview, die sich wie eine echte Kundenseite anfuehlt.
                </h3>
              </div>
            </div>
          </a>
          <div className="grid gap-5">
            {devices.slice(1).map((device) => (
              <a
                key={device.href}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
                href={device.href}
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                  {device.label}
                </p>
                <h3 className="mt-5 text-3xl font-black">{device.title}</h3>
                <p className="mt-4 leading-7 text-white/65">{device.body}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="showcase-band bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="showcase-eyebrow">Ablauf</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-5xl font-black text-flamingo">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
              <p className="mt-4 leading-7 text-black/60">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="showcase-band bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="showcase-eyebrow">Angebot</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.96] md:text-7xl">
              Pakete, die schnell starten und sauber wachsen.
            </h1>
          </div>
          <p className="text-lg leading-8 text-black/60">
            Preise bleiben bewusst einfach: Template als schneller Start, Growth fuer mehr
            Content und Custom fuer alles, was eigene Logik braucht.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="rounded-lg border border-black/10 bg-paper p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">{item.name}</p>
              <p className="mt-5 text-5xl font-black">{item.price}</p>
              <p className="mt-4 leading-7 text-black/60">{item.body}</p>
              <ul className="mt-6 grid gap-2">
                {item.items.map((entry) => (
                  <li key={entry} className="rounded-md bg-white px-3 py-2 text-sm font-bold">
                    {entry}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="showcase-band bg-ink px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="showcase-eyebrow text-white/70">Kontakt</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.96] md:text-7xl">
            Erzaehl kurz, welche Website du brauchst.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Wir melden uns mit einer konkreten Einschaetzung zu Template, Umfang, Foerderoptionen
            und naechstem sinnvollen Schritt.
          </p>
          <div className="mt-8 grid gap-2 text-white/70">
            <a href="mailto:hello@flamingomedia.online">hello@flamingomedia.online</a>
            <span>Innsbruck / Muenchen / DACH</span>
          </div>
        </div>
        <PublicContactForm />
      </div>
    </section>
  );
}
