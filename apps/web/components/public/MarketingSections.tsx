import { PublicContactForm } from "./PublicContactForm";
import { Marquee, Reveal } from "./ShowcaseFx";

const services = [
  {
    title: "Branchen-Templates",
    body: "Restaurant, Hotel, Praxis, Handwerk, Studio und Immobilien starten nicht mit Lorem Ipsum, sondern mit echten Seitentypen, echten Collections und realen Conversion-Strecken.",
    tag: "01"
  },
  {
    title: "CMS statt Demo-Fassade",
    body: "Hero, Menues, Zimmer, Kurse, Team, Referenzen, FAQs, Angebote und Formulare sind als strukturierte Sections geplant und im Admin editierbar.",
    tag: "02"
  },
  {
    title: "Launch-Infrastruktur",
    body: "Vercel, Neon, Blob Storage, Preview, Build Checks und Seeds sind Teil des Produkts, damit aus dem Look auch ein belastbarer Betrieb wird.",
    tag: "03"
  },
  {
    title: "Designsystem pro Marke",
    body: "Jedes Template bekommt eigene Tonalitaet, Bildwelt, Interaktionen und mobile Prioritaeten, ohne die CMS-Logik zu zerbrechen.",
    tag: "04"
  }
];

const steps = [
  {
    title: "Blueprint",
    body: "Branche, Style und wichtigste Conversion-Strecke werden als echter Seitenplan festgelegt."
  },
  {
    title: "Content-System",
    body: "Collections, Fields, Medien, Formulare und SEO werden so modelliert, dass Kundinnen sie wirklich pflegen koennen."
  },
  {
    title: "Visual Polish",
    body: "Animationen, Bilder, Microcopy, Mobile States und Template-Persoenlichkeit bekommen den letzten Schliff."
  },
  {
    title: "Launch",
    body: "Build, Migration, Seed, Preview und Live-Domain gehen sauber durch Vercel und bleiben wartbar."
  }
];

const packages = [
  {
    name: "Launch",
    price: "ab 1.490",
    body: "Fuer eine starke erste Version mit Branchen-Template, CMS-Seiten und sauberem Deployment.",
    items: ["1 Style-System", "Bis 5 Seiten", "CMS Sections", "Vercel Launch"]
  },
  {
    name: "Growth",
    price: "ab 2.900",
    body: "Fuer lokale Marken mit mehr Content, mehreren Landingpages und aktiver Lead-Gewinnung.",
    items: ["Collections", "Formulare", "Blob Medien", "SEO-Struktur"]
  },
  {
    name: "Signature",
    price: "Custom",
    body: "Fuer Projekte mit eigener Dramaturgie, komplexen CMS-Typen oder besonderer Bildsprache.",
    items: ["Custom Sections", "Integrationen", "Designsystem", "Redaktionelle QA"]
  }
];

const testimonials = [
  {
    quote: "Sieht nicht nach Template aus, ist aber so schnell pflegbar wie ein System.",
    name: "Restaurant Preview"
  },
  {
    quote: "Die Admin-Demo macht sofort klar, wie spaeter echte Inhalte entstehen.",
    name: "CMS Workflow"
  },
  {
    quote: "Das wirkt eher wie ein digitales Produkt als wie eine klassische Website.",
    name: "Template Engine"
  }
];

export function DeviceShowcase() {
  return (
    <section className="showcase-band bg-[#0b0810] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">Produktgefuehl</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.92] md:text-7xl">
              Website, Admin und Template-Galerie fuehlen sich wie ein System an.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/70">
            Der Besucher sieht eine fertige Marke. Der Kunde sieht im Admin dieselben Bausteine.
            Und Flamingo kann neue Branchen daraus schneller und besser ausrollen.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <Reveal className="group relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <a href="/templates/hotel/modern" className="block h-full rounded-md bg-white p-3 text-black shadow-soft">
              <div className="grid h-full min-h-[520px] overflow-hidden rounded-md bg-[#111] text-white md:grid-cols-[0.95fr_1.05fr]">
                <div className="grid content-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                      Alpine Nest
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                      direkt buchen
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Hotel Modern</p>
                    <h3 className="mt-3 max-w-sm text-5xl font-black leading-[0.92]">
                      Zimmer, Spa und Angebote als echte Story.
                    </h3>
                  </div>
                </div>
                <div className="min-h-[340px] bg-[url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center transition duration-700 group-hover:scale-[1.03]" />
              </div>
            </a>
          </Reveal>

          <div className="grid gap-5">
            {services.map((service, index) => (
              <Reveal
                key={service.title}
                delay={index * 0.04}
                className="rounded-lg border border-white/10 bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-flamingo">{service.tag}</p>
                <h3 className="mt-4 text-2xl font-black">{service.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{service.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 border-y border-white/10 py-4">
          <Marquee
            items={[
              "Speisekarten",
              "Zimmer",
              "Kursplan",
              "Objekte",
              "Team",
              "Referenzen",
              "Events",
              "Angebote",
              "Formulare"
            ]}
            speed={36}
            className="text-white/65"
          />
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="showcase-band bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="showcase-eyebrow">Ablauf</p>
          <h2 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">
            Von Branchenidee zu einer Seite, die nach echtem Betrieb aussieht.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-5xl font-black text-flamingo">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
              <p className="mt-4 leading-7 text-black/60">{step.body}</p>
            </Reveal>
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
        <Reveal className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="showcase-eyebrow">Angebot</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.96] md:text-7xl">
              Pakete mit genug Struktur fuer schnelle, hochwertige Launches.
            </h2>
          </div>
          <p className="text-lg leading-8 text-black/60">
            Die Pakete sind bewusst produktisiert, aber nicht steril: jedes Projekt bekommt echte
            Inhalte, passende Sections und ein klares CMS-Modell.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {packages.map((item, index) => (
            <Reveal
              key={item.name}
              delay={index * 0.05}
              className={`rounded-lg border p-6 shadow-sm ${
                index === 1 ? "border-black bg-ink text-white" : "border-black/10 bg-paper"
              }`}
            >
              <p className={`text-xs font-black uppercase tracking-[0.18em] ${index === 1 ? "text-white/45" : "text-black/45"}`}>
                {item.name}
              </p>
              <p className="mt-5 text-5xl font-black">{item.price}</p>
              <p className={`mt-4 leading-7 ${index === 1 ? "text-white/65" : "text-black/60"}`}>{item.body}</p>
              <ul className="mt-6 grid gap-2">
                {item.items.map((entry) => (
                  <li
                    key={entry}
                    className={`rounded-md px-3 py-2 text-sm font-bold ${
                      index === 1 ? "bg-white/10 text-white/80" : "bg-white text-black"
                    }`}
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.05} className="rounded-lg border border-black/10 bg-white p-6">
              <p className="text-2xl font-black leading-tight">&quot;{item.quote}&quot;</p>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-black/45">{item.name}</p>
            </Reveal>
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
        <Reveal>
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
        </Reveal>
        <Reveal delay={0.08}>
          <PublicContactForm />
        </Reveal>
      </div>
    </section>
  );
}
