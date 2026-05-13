import Image from "next/image";
import { PublicContactForm } from "./PublicContactForm";
import { Marquee, Reveal } from "./ShowcaseFx";

const branches = [
  "Restaurants",
  "Hotels",
  "Tourismus",
  "Salons",
  "Handwerk",
  "Praxen",
  "Beratung",
  "Fitness",
  "Immobilien",
  "Hochzeiten"
];

const services = [
  {
    title: "Branchen-Templates",
    body: "Mehrseitige, animierte Websites fuer lokale Marken. Nicht generisch, sondern mit echter Informationsarchitektur pro Branche.",
    tag: "01"
  },
  {
    title: "Custom Design",
    body: "Wenn ein Template nicht reicht, entsteht ein eigenes visuelles System mit passenden Sections, Bildsprache und Dramaturgie.",
    tag: "02"
  },
  {
    title: "Foto & Video",
    body: "Auf Wunsch produzieren wir Bilder und kurze Filme vor Ort, damit die Website nicht nach Stockmaterial aussieht.",
    tag: "03"
  },
  {
    title: "Hosting & Pflege",
    body: "Launch, Hosting, kleine Anpassungen und ein Admin, den Kundinnen und Kunden wirklich bedienen koennen.",
    tag: "04"
  }
];

const processSteps = [
  {
    n: "01",
    meta: "Tag 1",
    title: "Kennenlernen",
    body: "30 Minuten Call. Wir verstehen Betrieb, Konkurrenz, Zielgruppe und Stil. Danach bekommst du eine ehrliche Empfehlung.",
    bullets: ["Branche & Wettbewerb", "Ziele & Zielgruppe", "Erste Richtung"]
  },
  {
    n: "02",
    meta: "Tag 2",
    title: "Briefing & Auswahl",
    body: "Template, Paket, Module und Content-Bedarf werden festgelegt. Danach gibt es ein verbindliches Angebot.",
    bullets: ["Template & Stil", "Module", "Festpreis"]
  },
  {
    n: "03",
    meta: "Optional",
    title: "Foto & Video",
    body: "Wenn Bildmaterial fehlt, produzieren wir vor Ort passende Fotos, kurze Clips und Detailaufnahmen.",
    bullets: ["Shooting", "Bildauswahl", "Web-ready Export"]
  },
  {
    n: "04",
    meta: "Tag 3-7",
    title: "Aufbau",
    body: "Wir richten Seiten, Sections, Farben, Inhalte, SEO-Basis und Formulare ein. Du bekommst einen privaten Preview-Link.",
    bullets: ["Template Setup", "Inhalte", "SEO"]
  },
  {
    n: "05",
    meta: "Tag 8",
    title: "Feedback",
    body: "Eine klare Feedback-Runde. Du kommentierst, wir schaerfen Layout, Texte, Bilder und Details.",
    bullets: ["Preview", "Korrektur", "Feinschliff"]
  },
  {
    n: "06",
    meta: "Tag 9-10",
    title: "Live",
    body: "Domain, SSL, Admin-Zugang und Uebergabe. Danach ist die Website online und pflegbar.",
    bullets: ["Domain", "Admin", "Launch"]
  }
];

const tiers = [
  {
    name: "Template",
    price: "1.490 EUR",
    sub: "einmalig",
    monthly: "+ 29 EUR / Monat Hosting & Pflege",
    features: [
      "Ein Branchen-Template",
      "Classic, Modern oder Bold",
      "Admin-Bereich zum selbst Pflegen",
      "Basis-SEO und Kontaktformular",
      "Online in wenigen Tagen"
    ]
  },
  {
    name: "Mit Content Kit",
    price: "3.180 EUR",
    sub: "einmalig",
    monthly: "+ 29 EUR / Monat Hosting & Pflege",
    featured: true,
    features: [
      "Alles aus Template",
      "Foto- und Video-Produktion",
      "Team, Location und Details",
      "50 bearbeitete Bilder",
      "3 kurze Clips fuer Web und Social"
    ]
  },
  {
    name: "Custom",
    price: "auf Anfrage",
    sub: "individuell",
    monthly: "Hosting individuell",
    features: [
      "Eigenes Designsystem",
      "Spezielle Inhaltsfunktionen",
      "Mehrsprachigkeit und Integrationen",
      "Persoenliche Projektsteuerung",
      "Zeitplan nach Absprache"
    ]
  }
];

const addons = [
  { title: "Mehrsprachigkeit", price: "ab 290 EUR", body: "DE + EN inklusive Sprachumschalter. Weitere Sprachen nach Umfang." },
  { title: "Online-Reservierung", price: "ab 390 EUR", body: "Anbindung an bestehende Buchungs-, Termin- oder Reservierungstools." },
  { title: "Texte & SEO", price: "ab 490 EUR", body: "Wir schreiben Inhalte, Meta-Texte und suchnahe Landingpage-Copy." },
  { title: "Newsletter Setup", price: "290 EUR", body: "Anbindung an Brevo, Mailerlite oder Mailchimp." },
  { title: "Logo Refresh", price: "ab 590 EUR", body: "Modernisierung eines bestehenden Logos mit Web-Varianten." },
  { title: "Nachshooting", price: "890 EUR", body: "Saisonale Bilder, neue Produkte, Teamwechsel oder frische Reels." }
];

export function ClientLogosSection() {
  return (
    <section id="mehr" className="border-y border-black/10 bg-paper py-12">
      <div className="mx-auto mb-6 max-w-7xl px-5 md:px-8">
        <p className="showcase-eyebrow">Branchen, die wir verstehen</p>
      </div>
      <Marquee items={[...branches, ...branches, "und viele mehr"]} speed={40} className="text-black/48" />
    </section>
  );
}

export function ServicesStudioSection() {
  return (
    <section className="agency-band bg-ink px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">Was wir machen</p>
            <h2 className="mt-5 max-w-4xl text-6xl font-black leading-[0.88] md:text-8xl">
              Studio fuer lokale Marken.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/72">
            Vier Leistungen, ein Team: Wir bauen, gestalten, fotografieren, hosten und pflegen,
            damit aus einer Website ein brauchbares Werkzeug fuer den Betrieb wird.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.04}
              className={`agency-card min-h-[280px] p-7 ${
                index === 0 ? "md:col-span-4 bg-white text-ink" : "md:col-span-2 bg-white/[0.07] text-white"
              } ${index > 1 ? "md:col-span-3" : ""}`}
            >
              <p className={`font-mono text-xs uppercase tracking-[0.18em] ${index === 0 ? "text-black/45" : "text-white/45"}`}>
                {service.tag}
              </p>
              <h3 className="mt-10 text-4xl font-black leading-tight">{service.title}</h3>
              <p className={`mt-5 max-w-xl leading-7 ${index === 0 ? "text-black/62" : "text-white/68"}`}>
                {service.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DeviceShowcase() {
  return (
    <section className="agency-band bg-[#090c16] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">Produktgefuehl</p>
            <h2 className="mt-5 text-6xl font-black leading-[0.9] md:text-8xl">
              Website und Admin fuehlen sich wie ein System an.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/70">
            Besucher sehen eine fertige Marke. Kunden sehen im Admin dieselben Bausteine:
            Seiten, Sections, Medien, Leads und Collections.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="agency-device">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">live preview</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">cms driven</span>
            </div>
            <div className="agency-device-screen">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/55">Casa Flamingo</p>
              <h3 className="max-w-xl text-6xl font-black leading-[0.88]">
                Menue, Reservierung, Events.
              </h3>
              <div className="grid gap-2 md:grid-cols-3">
                {["Menu", "Booking", "Gallery"].map((item) => (
                  <span key={item} className="rounded-md bg-white px-3 py-3 text-sm font-black text-black">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {["Sections", "Media Library", "Lead Inbox", "SEO", "Templates"].map((item, index) => (
              <Reveal key={item} delay={index * 0.035} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">0{index + 1}</p>
                <h3 className="mt-3 text-3xl font-black">{item}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="agency-band bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="showcase-eyebrow">Ablauf</p>
            <h2 className="mt-5 text-6xl font-black leading-[0.9] md:text-8xl">
              Online in wenigen Tagen.
            </h2>
          </div>
          <p className="text-lg leading-8 text-black/62">
            Vom ersten Anruf bis zur Live-Schaltung: ein klarer Ablauf ohne Agentur-Theater.
            Du weisst jederzeit, was passiert und was als naechstes kommt.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {processSteps.slice(0, 6).map((step, index) => (
            <Reveal key={step.n} delay={index * 0.04} className="agency-card bg-white p-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/42">{step.n} / {step.meta}</p>
              <h3 className="mt-8 text-3xl font-black">{step.title}</h3>
              <p className="mt-4 leading-7 text-black/62">{step.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {step.bullets.map((bullet) => (
                  <span key={bullet} className="rounded-full border border-black/10 bg-paper px-3 py-1 text-xs font-bold text-black/58">
                    {bullet}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="agency-band bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="showcase-eyebrow">Preise</p>
            <h2 className="mt-5 text-6xl font-black leading-[0.9] md:text-8xl">
              Faire Preise. Keine Ueberraschungen.
            </h2>
          </div>
          <p className="text-lg leading-8 text-black/62">
            Drei klare Pakete, Festpreise und monatliche Pflege ohne Lock-in. Erweiterungen
            bleiben transparent und koennen spaeter nachgeruestet werden.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal
              key={tier.name}
              delay={index * 0.05}
              className={`agency-card flex min-h-[620px] flex-col p-8 ${
                tier.featured ? "bg-ink text-white" : "bg-paper text-ink"
              }`}
            >
              <p className={`font-mono text-xs uppercase tracking-[0.18em] ${tier.featured ? "text-white/45" : "text-black/42"}`}>
                / {tier.name}
              </p>
              <p className={`mt-5 text-6xl font-black leading-none ${tier.featured ? "text-flamingo" : ""}`}>
                {tier.price}
              </p>
              <p className={`mt-3 text-sm font-bold ${tier.featured ? "text-white/60" : "text-black/52"}`}>
                {tier.sub} · {tier.monthly}
              </p>
              <ul className="mt-8 grid gap-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2 leading-6">
                    <span className="text-flamingo">+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a className={tier.featured ? "showcase-button showcase-button-light mt-auto" : "showcase-button mt-auto"} href="/kontakt">
                Anfragen
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AddonsSection() {
  return (
    <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="showcase-eyebrow">Add-ons</p>
          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.94] md:text-7xl">
            Wer mehr braucht, bekommt mehr.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addons.map((addon, index) => (
            <Reveal key={addon.title} delay={index * 0.035} className="agency-card bg-white p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-3xl font-black">{addon.title}</h3>
                <span className="font-mono text-sm">{addon.price}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-black/62">{addon.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductionSection() {
  const cards = [
    {
      title: "Foto-Shooting",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80",
      lines: ["Halber bis ganzer Tag", "20-40 bearbeitete Bilder", "Web- und Social-Nutzung"]
    },
    {
      title: "Imagefilm",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
      lines: ["30-60 Sekunden", "Musik und Schnitt", "Web-Export"]
    },
    {
      title: "Foto + Film",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
      lines: ["Ein Produktionstag", "Kombi-Konditionen", "Beste Wirkung"]
    }
  ];

  return (
    <section className="agency-band bg-ink px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">Optional</p>
            <h2 className="mt-5 text-6xl font-black leading-[0.9] md:text-8xl">
              Bilder und kurzer Film.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/72">
            Buchbar als Add-on, wenn vorhandenes Bildmaterial nicht zum Anspruch passt.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05} className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06]">
              <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} />
              <div className="p-7">
                <h3 className="text-3xl font-black">{card.title}</h3>
                <ul className="mt-5 grid gap-2 text-sm text-white/70">
                  {card.lines.map((line) => <li key={line}>+ {line}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NumbersSection() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <h2 className="text-6xl font-black leading-[0.9] md:text-8xl">In Zahlen.</h2>
          <p className="text-lg leading-8 text-black/62">
            Zehn Branchen, drei Stile je Branche und ein CMS, das Inhalte nicht nur zeigt,
            sondern pflegbar macht.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            ["10", "Branchen"],
            ["3", "Stile je Branche"],
            ["22+", "Section-Typen"],
            ["7", "Tage bis Preview"]
          ].map(([value, label]) => (
            <Reveal key={label} className="border-l border-black/10 pl-6">
              <p className="text-7xl font-black leading-none md:text-8xl">{value}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-black/45">{label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const quotes = [
    ["Anfragen kommen jetzt vorbereitet rein, nicht als loses Bauchgefuehl.", "Salon Kundin"],
    ["Die Seite fuehlt sich wie unser Betrieb an, nur klarer und schneller.", "Hotel Preview"],
    ["Wir koennen Inhalte selbst pflegen, ohne jedes Mal ein Ticket zu schreiben.", "Handwerk Kunde"]
  ];
  return (
    <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="showcase-eyebrow">Stimmen</p>
          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.94] md:text-7xl">
            Was Kundinnen und Kunden spueren sollen.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {quotes.map(([quote, author], index) => (
            <Reveal key={author} delay={index * 0.05} className="agency-card bg-white p-8">
              <p className="text-3xl font-black leading-tight">&quot;{quote}&quot;</p>
              <p className="mt-8 border-t border-black/10 pt-5 text-sm font-bold text-black/50">{author}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <>
      <section className="px-5 pb-16 pt-32 md:px-8 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="showcase-eyebrow">Ueber uns</p>
            <h1 className="mt-5 max-w-5xl text-6xl font-black leading-[0.86] md:text-9xl">
              Ein kleines Studio. Ein klarer Anspruch.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-black/62">
              FlamingoMedia ist eine Werkstatt fuer Websites, Foto und Video. Kurze Wege,
              klare Entscheidungen und Handwerk vor Marketing-Sprech.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src="/team/mario.webp" alt="Mario Schubert" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.05} className="flex flex-col justify-center">
            <h2 className="text-5xl font-black leading-[0.95] md:text-7xl">
              Studio in Innsbruck. Kunden in der DACH-Region.
            </h2>
            <p className="mt-6 text-lg leading-8 text-black/62">
              Wir arbeiten fuer Restaurants, Salons, Handwerksbetriebe, Praxen, Kanzleien,
              Studios, Hotels und viele weitere inhabergefuehrte Marken.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-white px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-5xl font-black md:text-7xl">Das Team.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Mario Schubert",
                role: "CEO · Foto & Video",
                img: "/team/mario.webp",
                bio: "Der Blick fuer Bildausschnitte, Licht und Material, das nach echtem Betrieb aussieht."
              },
              {
                name: "Julius von Ingelheim",
                role: "CTO · Web · UX",
                img: "/team/julius.jpg",
                bio: "UX, Designsysteme, schnelle Websites und CMS-Architektur, die langfristig tragfaehig bleibt."
              }
            ].map((member, index) => (
              <Reveal key={member.name} delay={index * 0.05} className="agency-card overflow-hidden bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image src={member.img} alt={member.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-black/42">/ 0{index + 1}</p>
                  <h3 className="mt-3 text-4xl font-black">{member.name}</h3>
                  <p className="mt-1 text-sm font-bold text-black/48">{member.role}</p>
                  <p className="mt-5 leading-7 text-black/62">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactSection() {
  return (
    <section className="agency-band bg-ink px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <p className="showcase-eyebrow text-white/70">Kontakt</p>
          <h1 className="mt-5 text-6xl font-black leading-[0.9] md:text-8xl">
            Lass uns reden.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
            Schreib uns deine Idee. Wir antworten mit einer ehrlichen Einschaetzung,
            auch wenn wir nicht der richtige Partner sind.
          </p>
          <div className="mt-10 grid gap-5 text-white/78">
            <a href="mailto:hello@flamingomedia.online" className="text-2xl font-black hover:text-flamingo">
              hello@flamingomedia.online
            </a>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">Erreichbarkeit</p>
              <p className="mt-1 text-xl">Mo-Fr · 09:00-18:00</p>
              <p className="mt-1 text-sm text-white/50">Innsbruck · Muenchen · Ingolstadt · DACH-weit remote</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <PublicContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export function RegionSection() {
  return (
    <section className="bg-paper px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="showcase-eyebrow">Wo wir arbeiten</p>
            <h2 className="mt-5 text-5xl font-black leading-[0.95] md:text-7xl">
              DACH-Region. Mit Fokus auf drei Staedte.
            </h2>
          </div>
          <p className="text-lg leading-8 text-black/62">
            Remote-first fuer Deutschland, Oesterreich und die Schweiz. Persoenliche Termine
            vor Ort nach Absprache.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {["Innsbruck & Tirol", "Muenchen & Oberbayern", "Ingolstadt & Region"].map((region) => (
            <Reveal key={region} className="agency-card bg-white p-7">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-black/42">/ Schwerpunkt</p>
              <h3 className="mt-3 text-3xl font-black">{region}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CalloutFooter() {
  return (
    <section className="agency-band bg-ink px-5 py-28 text-center text-white md:px-8 md:py-44">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="showcase-eyebrow justify-center text-white/70">Bereit?</p>
          <h2 className="mt-5 text-6xl font-black leading-[0.86] md:text-9xl">
            Bauen wir deine Website.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/72">
            Wir antworten innerhalb von 24 Stunden mit einer konkreten Einschaetzung.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="/kontakt" className="showcase-button showcase-button-light">Beratung anfragen</a>
            <a href="/beispiele" className="showcase-button showcase-button-ghost-dark">Templates ansehen</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
