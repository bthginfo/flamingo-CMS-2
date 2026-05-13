"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

const AGENCY = {
  name: "FlamingoMedia",
  fullName: "FlamingoMedia - Websites fuer lokale Marken",
  tagline: "Websites mit Pop fuer lokale Marken · Innsbruck · DACH",
  email: "hello@flamingomedia.online",
  phone: "+49 1515 5338029",
  phoneAt: "+43 677 6368 1543",
  logoMarkSrc: "/brand/flamingo-icon.png",
  logoFullSrc: "/brand/flamingo-full.png",
  logoFullBesideSrc: "/brand/flamingo-full-beside.png"
};

const marqueeItems = [
  "Passend fuer jede Branche",
  "Foto- & Videoshooting optional als Add-on",
  "Online in wenigen Tagen",
  "Innsbruck · Muenchen · Ingolstadt · DACH",
  "Hosting & kleine Pflege inklusive"
];

const processSteps = [
  { d: "Tag 1", t: "Kennenlernen", icon: "01", body: "30-Minuten Online-Call oder Telefon. Wir verstehen Deinen Betrieb, Deine Konkurrenz, Deine Ziele. Du bekommst unsere ehrliche Einschaetzung.", bullets: ["Branche & Wettbewerb", "Ziele & Zielgruppe", "Erste Empfehlung"] },
  { d: "Tag 2", t: "Briefing & Auswahl", icon: "02", body: "Du waehlst Template und Paket. Wir senden ein verbindliches Angebot. Anzahlung 50 %.", bullets: ["Template & Stil", "Module & Features", "Verbindliches Angebot"] },
  { d: "Optional", t: "Foto- & Videoshooting", icon: "03", body: "Add-on, kein Standard. Auf Wunsch kommen wir mit kleinem Team vor Ort und produzieren Bild- und Filmmaterial. Auch nachtraeglich oder separat buchbar.", bullets: ["Halber oder ganzer Tag", "Bildauswahl mit Dir", "Druckreife Lieferung"] },
  { d: "Tag 3-7", t: "Aufbau", icon: "04", body: "Wir richten das Template ein, importieren Deine Inhalte, optimieren Bilder, schreiben SEO-Texte vor.", bullets: ["Template-Setup", "Inhalte & Bilder", "SEO-Vorlagen"] },
  { d: "Tag 8", t: "Feedback-Schleife", icon: "05", body: "Du schaust Dir den Preview-Link an. Eine Korrektur-Runde ist inkludiert. Du sendest Anmerkungen, wir setzen um.", bullets: ["Privater Preview-Link", "1x Korrektur-Runde inkl.", "Schnelle Umsetzung"] },
  { d: "Tag 9-10", t: "Live-Schaltung", icon: "06", body: "Wir verbinden Deine Domain und uebergeben den Admin-Bereich. Du bist online.", bullets: ["Domain & SSL", "Admin-Zugang & Schulung", "Online - fertig"] },
  { d: "Laufend", t: "Pflege & Support", icon: "07", body: "Du pflegst Inhalte selbst. Wir kuemmern uns um den Hosting-Teil und kleine Anpassungen. 29 EUR/Monat.", bullets: ["Du pflegst Inhalte selbst", "Hosting inklusive", "Kleine Anpassungen on demand"] }
];

const tiers = [
  {
    name: "Template",
    price: "1.490 EUR",
    sub: "einmalig",
    monthly: "+ 29 EUR / Monat Hosting & Pflege",
    features: [
      "Eines unserer Branchen-Templates (6 Branchen, 3 Stile)",
      "6 Farbschemas pro Branche - jederzeit per Klick umstellbar",
      "Admin-Bereich zum selbst pflegen",
      "Hosting & Pflege inklusive",
      "1 Stunde Einrichtungs-Support",
      "Online in wenigen Tagen - je nach Verfuegbarkeit Deiner Inhalte"
    ]
  },
  {
    name: "Mit Content Kit (Foto + Video)",
    price: "3.180 EUR",
    sub: "einmalig",
    monthly: "+ 29 EUR / Monat Hosting & Pflege",
    featured: true,
    badge: "Content Kit",
    features: [
      "Alles aus Template",
      "2 Drehtage bei Dir vor Ort",
      "Teamfotos bis 20 Personen (Einzel + Gruppe)",
      "Location komplett: Raeume, Atmosphaere, Details",
      "Food-, Produkt- und Servicemomente inklusive",
      "50 bearbeitete Bilder + 3 Reels (je 30 Sek.)",
      "Beratung zu Bildsprache, Story und Einsatz auf Web & Social"
    ]
  },
  {
    name: "Custom",
    price: "auf Anfrage",
    sub: "individuell",
    monthly: "Hosting individuell",
    features: [
      "Individuelles Design ohne Template-Bindung",
      "Beliebige Inhalts-Funktionen",
      "Persoenlicher Projektmanager",
      "Iterative Design-Schleifen mit Style-Guide",
      "API-Anbindungen moeglich",
      "Zeitplan nach Absprache"
    ]
  }
];

const addons = [
  { t: "Mehrsprachigkeit", p: "ab 290 EUR", d: "DE + EN, weitere Sprachen auf Anfrage. Inkl. Sprach-Switcher." },
  { t: "Online-Reservierung", p: "ab 390 EUR", d: "Anbindung an Tools wie Quandoo, OpenTable, Treatwell." },
  { t: "Foto-/Video-Nachshooting", p: "890 EUR", d: "1 Drehtag light fuer saisonale Updates, neue Produkte oder Teamwechsel." },
  { t: "Newsletter-Setup", p: "290 EUR", d: "Anbindung an Mailerlite, Brevo oder Mailchimp." },
  { t: "Texte & SEO", p: "ab 490 EUR", d: "Schreiben aller Inhalte durch unsere Copywriter:innen, inkl. SEO-Recherche." },
  { t: "Logo-Refresh", p: "ab 590 EUR", d: "Modernisierung Deines bestehenden Logos. Drei Iterationen." }
];

const templateCards = [
  { label: "Restaurant", tag: "Gastronomie · Trattoria · Cafe", href: "/templates/restaurant/classic", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80" },
  { label: "Hotels", tag: "Hotel · Pension · Resort", href: "/templates/hotel/classic", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=80" },
  { label: "Tourismus", tag: "Touren · Guides · Erlebnisse", href: "/templates/tourism/classic", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80" },
  { label: "Salon & Beauty", tag: "Friseur · Spa · Kosmetik", href: "/templates/salon/classic", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80" },
  { label: "Handwerk", tag: "Installateur · Bau · Service", href: "/templates/trades/classic", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80" },
  { label: "Wedding Website", tag: "Einladung · Programm · RSVP", href: "/templates/wedding/classic", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80" }
];

export function AgencyShell({ active, children }: { active?: string; children: ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const nav = [
    { href: "/beispiele", label: "Templates", id: "templates" },
    { href: "/prozess", label: "Ablauf", id: "prozess" },
    { href: "/preise", label: "Preise", id: "preise" },
    { href: "/ueber-uns", label: "Über uns", id: "ueber-uns" },
    { href: "/admin-demo", label: "Admin-Demo", id: "admin-demo" },
    { href: "/kontakt", label: "Kontakt", id: "kontakt" }
  ];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-color", "#14111a");
    root.style.setProperty("--brand-fg", "#ffffff");
    root.style.setProperty("--accent-color", "#F24171");
    root.style.setProperty("--accent-color-2", "#FFB347");
    root.style.setProperty("--accent-fg", "#ffffff");
    root.style.setProperty("--surface-color", "#fce7ef");
    root.style.setProperty("--bg-color", "#fff8fa");
    root.style.setProperty("--text-color", "#14111a");
  }, []);

  return (
    <div className="showcase-root min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-color)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Zum Hauptinhalt springen
      </a>
      <div className="fixed left-0 right-0 top-0 z-50 bg-brand py-2.5 text-xs uppercase tracking-[0.18em] text-white">
        <MarketingMarquee items={[...marqueeItems, ...marqueeItems]} />
      </div>
      <header className="fixed left-0 right-0 top-[36px] z-40 border-b border-white/10 bg-[#0b0810]/95 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="container-x flex items-center justify-between py-4">
          <a href="/" className="flex items-center leading-none" aria-label={AGENCY.fullName}>
            <Image src={AGENCY.logoFullBesideSrc} alt={AGENCY.name} width={260} height={90} className="h-11 w-auto md:h-14" priority />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a key={item.id} href={item.href} className={`link-underline px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white ${active === item.id ? "is-active" : ""}`}>
                {item.label}
              </a>
            ))}
            <a href="/kontakt" className="btn-accent ml-4 !px-5 !py-2.5 text-sm">Beratung <span aria-hidden>→</span></a>
          </nav>
          <button onClick={() => setMobile(true)} className="rounded-full border border-white/30 p-2 text-white md:hidden" aria-label="Menü öffnen">
            <span className="block h-[2px] w-5 bg-current" />
            <span className="mt-1.5 block h-[2px] w-5 bg-current" />
            <span className="mt-1.5 block h-[2px] w-5 bg-current" />
          </button>
        </div>
      </header>
      {mobile ? (
        <div className="fixed inset-0 z-[60] bg-[var(--bg-color)]">
          <div className="container-x flex items-center justify-between py-5">
            <Image src={AGENCY.logoFullBesideSrc} alt={AGENCY.name} width={240} height={90} className="h-12 w-auto" />
            <button onClick={() => setMobile(false)} className="p-2 text-3xl" aria-label="Schließen">×</button>
          </div>
          <nav className="container-x mt-8 flex flex-col gap-1">
            {nav.map((item) => (
              <a key={item.id} href={item.href} onClick={() => setMobile(false)} className="border-b border-line py-5 text-5xl font-display text-slate-800">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
      <main id="main" className="flex-1">{children}</main>
      <AgencyFooter />
    </div>
  );
}

function MarketingMarquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" data-speed="slow">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="whitespace-nowrap inline-flex items-center gap-3 pr-12">
            <span className="opacity-80">{item}</span>
            <span aria-hidden className="opacity-40">✦</span>
          </span>
        ))}
      </div>
      <div className="marquee-track" aria-hidden>
        {items.map((item, index) => (
          <span key={`copy-${item}-${index}`} className="whitespace-nowrap inline-flex items-center gap-3 pr-12">
            <span className="opacity-80">{item}</span>
            <span aria-hidden className="opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function AgencyHomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogosSection />
      <ServicesSection />
      <TemplatesPreviewSection />
      <DeviceShowcaseSection />
      <ManifestoSection />
      <ProcessTimelineSection compact />
      <ProductionSection />
      <NumbersSection />
      <TestimonialsSection />
      <CalloutFooter />
    </>
  );
}

function HeroSection() {
  return (
    <section className="group/hero grain relative flex min-h-screen items-end overflow-hidden bg-[#0b1020] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_34rem_at_18%_10%,rgba(242,65,113,.26),transparent_70%),radial-gradient(46rem_32rem_at_88%_0%,rgba(124,58,237,.22),transparent_70%),#0b1020]" />
      <div className="hero-brand-mark pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center" aria-hidden>
        <Image src={AGENCY.logoMarkSrc} alt="" width={520} height={520} className="hero-brand-mark__img w-[70%] max-w-[520px] md:w-[44%] lg:w-[38%]" priority />
      </div>
      <div className="container-x relative z-10 pb-24 pt-44 md:pb-32">
        <p className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/80">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-color)]" />
          {AGENCY.tagline}
        </p>
        <h1 className="headline-xl max-w-6xl">
          Websites für
          <br />
          <em className="italic-pop text-[var(--accent-color)]">
            <RotatingWords words={["Restaurants.", "Salons.", "Handwerk.", "Cafés.", "Praxen.", "Beratungen.", "Studios.", "Hotels."]} />
          </em>
        </h1>
        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <p className="md:col-span-7 text-lg leading-relaxed text-white/85 md:text-2xl">
            Wir gestalten und betreuen Websites für inhabergeführte Betriebe in der DACH-Region.
            Editorial-Design, das mit dem Tempo Deiner Marke gehen kann. Inhalte, die Du selbst pflegst.
            Foto und Video von unserem eigenen Team.
          </p>
          <div className="self-end md:col-span-5 md:border-l md:border-white/15 md:pl-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/60">/ Website live in wenigen Tagen</p>
            <div className="flex flex-wrap gap-3">
              <a href="/beispiele" className="btn-accent">Templates ansehen <span aria-hidden>→</span></a>
              <a href="/preise" className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-slate-900">Preise & Pakete</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RotatingWords({ words }: { words: string[] }) {
  return (
    <span className="rotating-word inline-grid">
      {words.map((word, index) => (
        <span key={word} style={{ ["--word-index" as string]: index }}>{word}</span>
      ))}
    </span>
  );
}

function ClientLogosSection() {
  const items = ["Restaurants", "Salons & Beauty", "Handwerk", "Cafés", "Bäckereien", "Hotels & Pensionen", "Praxen & Ärzte", "Beratung & Kanzleien", "Studios & Coaching", "Ateliers", "Werkstätten", "Boutiquen"];
  return (
    <section className="surface border-y border-line py-12 md:py-16" id="mehr">
      <div className="container-x mb-6"><p className="eyebrow">Branchen, die wir verstehen</p></div>
      <MarketingMarquee items={[...items, ...items, "und viele mehr"]} />
    </section>
  );
}

function ServicesSection() {
  const cards = [
    { n: "01", t: "Branchen-Templates", d: "Mehrseitige, animierte Templates für Restaurant, Salon, Handwerk, Praxen, Beratung, Studios und viele mehr. Live-Vorschau im Browser, Farbschema in Sekunden.", big: true },
    { n: "02", t: "Custom Design", d: "Wenn Template nicht reicht: individuell entworfen, eigene Funktionen, eigene Bibliothek. Wie ein Maßanzug.", accent: true },
    { n: "03", t: "Foto & Video", d: "Eigenes Team kommt zu Dir ins Lokal, in die Praxis, in den Salon oder auf die Baustelle. Bilder, die nach Dir aussehen." },
    { n: "04", t: "Hosting & Pflege", d: "Unkompliziertes Hosting und kleine Anpassungen zum Pauschalpreis. 29 EUR/Monat." }
  ];
  return (
    <section className="bg-brand py-24 text-white md:py-32">
      <div className="container-x">
        <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 !text-white/70">Was wir machen</p>
            <h2 className="headline-lg text-white">Studio<br /><em className="italic-pop text-[var(--accent-color)]">für lokale Marken.</em></h2>
          </div>
          <p className="md:col-span-5 text-lg leading-relaxed text-white/75">Vier Leistungen. Ein Team. Wir bauen, fotografieren, hosten und kümmern uns, damit Du Dich um Deinen Betrieb kümmern kannst.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          {cards.map((card) => (
            <article key={card.n} className={`${card.big ? "md:col-span-4 min-h-[320px] bg-white text-slate-900" : card.accent ? "md:col-span-2 min-h-[320px] bg-[var(--accent-color)] text-white" : "md:col-span-3 min-h-[280px] bg-slate-900 text-white"} rounded-3xl p-8 md:p-10 hover-lift`}>
              <span className="font-mono text-xs opacity-70">{card.n}</span>
              <h3 className="mt-12 font-display text-3xl leading-[1.05] md:text-5xl">{card.t}</h3>
              <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-75 md:text-base">{card.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesPreviewSection() {
  return (
    <section className="surface py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7"><p className="eyebrow mb-5">Templates</p><h2 className="headline-lg">Sechs Branchen.<br /><em className="italic-pop">Endlos viele Welten.</em></h2></div>
          <p className="md:col-span-5 text-lg text-muted">Drei Templates sind sofort live klickbar, weitere Branchen zeigen, wie sich der Studio-Stil anpassen lässt.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {templateCards.map((card) => (
            <a key={card.label} href={card.href} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl hover-lift">
              <Image src={card.image} alt={card.label} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8 text-white">
                <p className="mb-2 text-xs uppercase tracking-widest text-white/90">{card.tag}</p>
                <h3 className="font-display text-4xl md:text-5xl">{card.label}</h3>
                <div className="mt-6 inline-flex items-center gap-2 border-t border-white/20 pt-4 text-sm font-medium">Live-Vorschau ansehen <span className="transition-transform group-hover:translate-x-2">→</span></div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-14 text-center"><a href="/beispiele" className="btn-outline">Alle Details zu den Templates <span aria-hidden>→</span></a></div>
      </div>
    </section>
  );
}

function DeviceShowcaseSection() {
  return (
    <section className="bg-black py-24 text-white md:py-32">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7"><p className="eyebrow mb-5 !text-white/60">Live-System</p><h2 className="headline-lg text-white">Website, Admin<br /><em className="italic-pop text-[var(--accent-color)]">und Content im Flow.</em></h2></div>
          <p className="md:col-span-5 text-lg leading-relaxed text-white/70">Die Seiten wirken wie echte Markenauftritte. Dahinter liegen editierbare Inhalte, Medien und klare Strukturen.</p>
        </div>
        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><span className="font-mono text-xs uppercase tracking-widest text-white/45">live preview</span><span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">cms driven</span></div>
          <div className="agency-device-screen"><p className="font-mono text-xs uppercase tracking-[0.18em] text-white/55">Casa Flamingo</p><h3 className="max-w-xl text-6xl font-black leading-[0.88]">Menü, Reservierung, Events.</h3></div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="grain relative overflow-hidden bg-brand py-32 text-white md:py-44">
      <div className="container-x relative">
        <p className="eyebrow mb-6 !text-white/60">Was uns wichtig ist</p>
        <h2 className="headline-lg max-w-5xl"><span className="text-white/40">Wir bauen keine Templates.</span> Wir bauen <em className="italic-pop text-[var(--accent-color)]">Werkzeuge</em>, mit denen Du weiterarbeiten kannst.</h2>
        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {[
            ["Inhalt vor Effekt.", "Eine Website soll zeigen, was Du wirklich machst. Animationen sind die Würze, nicht das Hauptgericht."],
            ["Eigentum, nicht Miete.", "Du hast Zugriff auf Deinen Code, Deine Inhalte und Deine Bilder. Keine Geiselhaft, kein Lock-in."],
            ["Geschwindigkeit ist Respekt.", "Schnelle Ladezeiten, sauberes Mobile-Design, gute Auffindbarkeit bei Google."]
          ].map(([t, d], i) => (
            <article key={t} className="border-t border-white/15 pt-8"><p className="font-mono text-xs text-white/40">/ {String(i + 1).padStart(2, "0")}</p><h3 className="headline-md mt-4 text-white">{t}</h3><p className="mt-5 leading-relaxed text-white/70">{d}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgencyProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-44">
        <div className="container-x"><p className="eyebrow mb-5">Ablauf</p><h1 className="headline-xl max-w-5xl">Von der Idee bis live.<br /><em className="italic-pop">In sieben Schritten.</em></h1><p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">Klare Stationen, transparente Kosten, kein Agentur-Theater. Du weißt jederzeit, wo wir stehen und was als nächstes kommt.</p></div>
      </section>
      <ProcessTimelineSection />
      <CalloutFooter />
    </>
  );
}

function ProcessTimelineSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-24 md:py-28" : "py-16 md:py-24"}>
      <div className="container-tight">
        <ol className="space-y-10 md:space-y-12">
          {(compact ? processSteps.slice(0, 4) : processSteps).map((step, index) => (
            <li key={step.t} className="grid gap-5 md:grid-cols-[160px_1fr] md:items-start">
              <div className="sticky top-28 hidden md:block"><span className="grid h-16 w-16 place-items-center rounded-full bg-accent font-mono text-sm text-white shadow-[0_0_28px_rgba(242,65,113,.35)]">{step.icon}</span></div>
              <article className="rounded-3xl border border-line bg-white p-7 shadow-sm hover-lift md:p-9">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">Schritt {String(index + 1).padStart(2, "0")} · {step.d}</p>
                <h3 className="headline-md mt-4">{step.t}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted">{step.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">{step.bullets.map((b) => <span key={b} className="rounded-full border border-line bg-slate-50 px-3 py-1.5 text-xs text-slate-700">{b}</span>)}</div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProductionSection() {
  return (
    <section className="surface py-24 md:py-28">
      <div className="container-x">
        <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end"><h2 className="headline-lg md:col-span-7">Foto & Video.<br /><em className="italic-pop">Optional, aber stark.</em></h2><p className="md:col-span-5 text-lg text-muted">Wenn vorhandenes Material nicht reicht, produzieren wir Bilder und kurze Clips direkt vor Ort.</p></div>
        <div className="grid gap-4 md:grid-cols-3">{["Foto-Shooting", "Imagefilm", "Foto + Film"].map((title) => <article key={title} className="rounded-3xl border border-line bg-white p-7 hover-lift"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-relaxed text-muted">Halber bis ganzer Tag, webfertige Auswahl und klare Nutzungsrechte.</p></article>)}</div>
      </div>
    </section>
  );
}

function NumbersSection() {
  return (
    <section className="py-20 md:py-28"><div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">{[["10", "Branchen"], ["3", "Stile je Branche"], ["22+", "Section-Typen"], ["7", "Tage bis Preview"]].map(([v, l]) => <div key={l} className="border-l border-line pl-6"><p className="num-display text-7xl leading-none md:text-8xl">{v}</p><p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">{l}</p></div>)}</div></section>
  );
}

function TestimonialsSection() {
  return (
    <section className="surface py-20 md:py-28"><div className="container-x"><p className="eyebrow mb-5">Stimmen</p><h2 className="headline-lg max-w-4xl">Was Kundinnen und Kunden spüren sollen.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{[["Anfragen kommen jetzt vorbereitet rein, nicht als loses Bauchgefühl.", "Salon Kundin"], ["Die Seite fühlt sich wie unser Betrieb an, nur klarer und schneller.", "Hotel Preview"], ["Wir können Inhalte selbst pflegen, ohne jedes Mal ein Ticket zu schreiben.", "Handwerk Kunde"]].map(([q, a]) => <article key={a} className="rounded-3xl border border-line bg-white p-8 hover-lift"><p className="font-display text-3xl leading-tight"><span aria-hidden>&ldquo;</span>{q}<span aria-hidden>&rdquo;</span></p><p className="mt-8 border-t border-line pt-5 text-sm text-muted">{a}</p></article>)}</div></div></section>
  );
}

export function AgencyPricingPage() {
  return (
    <>
      <section className="pb-12 pt-44"><div className="container-x"><p className="eyebrow mb-5">Preise</p><h1 className="headline-xl max-w-5xl">Faire Preise.<br /><em className="italic-pop">Keine Überraschungen.</em></h1><p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">Drei klare Pakete. Ein transparenter Festpreis, einmalig zahlbar. Hosting und Pflege auf Wunsch monatlich, kündbar jederzeit.</p></div></section>
      <section className="py-12 md:py-16"><div className="container-x grid gap-5 md:grid-cols-3">{tiers.map((tier) => <article key={tier.name} className={`relative flex flex-col rounded-3xl p-8 md:p-10 ${tier.featured ? "bg-brand text-white" : "border border-line bg-white"} hover-lift`}>{tier.badge ? <span className="absolute -top-3 left-8 rounded-full bg-[var(--accent-color)] px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand">{tier.badge}</span> : null}<h3 className="font-mono text-xs uppercase tracking-widest text-muted">/ {tier.name}</h3><p className={`headline-lg mt-4 ${tier.featured ? "text-[var(--accent-color)]" : ""}`}>{tier.price}</p><p className={`mt-1 text-sm ${tier.featured ? "text-white/70" : "text-muted"}`}>{tier.sub}</p><p className={`mt-2 text-sm ${tier.featured ? "text-white/70" : "text-muted"}`}>{tier.monthly}</p><ul className="mt-8 flex-1 space-y-3 text-sm">{tier.features.map((f) => <li key={f} className="flex gap-2"><span className={tier.featured ? "text-[var(--accent-color)]" : "text-brand"}>✓</span><span>{f}</span></li>)}</ul><a href="/kontakt" className={`mt-10 ${tier.featured ? "btn-accent" : "btn-outline"}`}>Anfragen <span aria-hidden>→</span></a></article>)}</div></section>
      <section className="surface py-24 md:py-28"><div className="container-x"><div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end"><h2 className="headline-lg md:col-span-7">Add-ons.<br /><em className="italic-pop">Wer mehr braucht, bekommt mehr.</em></h2><p className="md:col-span-5 text-lg text-muted">Buchbar einzeln oder als Paket. Auf Wunsch zu jedem Zeitpunkt nachrüstbar.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{addons.map((a) => <article key={a.t} className="rounded-3xl border border-line bg-white p-7 hover-lift"><div className="mb-4 flex items-start justify-between"><h3 className="font-display text-2xl">{a.t}</h3><span className="font-mono text-sm">{a.p}</span></div><p className="text-sm leading-relaxed text-muted">{a.d}</p></article>)}</div></div></section>
      <FaqSection />
      <CalloutFooter />
    </>
  );
}

function FaqSection() {
  const faqs = [
    ["Wie lange dauert die Erstellung?", "Bei Template-Projekten typischerweise wenige Tage nach Inhalts-Übergabe. Wie schnell es real geht, hängt vor allem davon ab, wie zügig Texte und Fotos von Deiner Seite kommen."],
    ["Kann ich Inhalte selbst pflegen?", "Ja. Du bekommst einen einfachen Admin-Bereich. Texte, Bilder, Speisekarte und Öffnungszeiten änderst Du ohne Vorkenntnisse direkt im Browser."],
    ["Wem gehört die Website?", "Dir. Du kannst den Quellcode jederzeit anfordern, das Hosting wechseln und mit anderen Agenturen weiterarbeiten."]
  ];
  return <section className="py-24 md:py-28"><div className="container-tight"><h2 className="headline-lg mb-12">Häufige <em className="italic-pop">Fragen.</em></h2><div className="divide-y divide-line rounded-3xl border border-line bg-white">{faqs.map(([q, a]) => <details key={q} className="group p-6"><summary className="cursor-pointer font-display text-2xl">{q}</summary><p className="mt-4 leading-relaxed text-muted">{a}</p></details>)}</div></div></section>;
}

export function AgencyAboutPage() {
  return (
    <>
      <section className="pb-16 pt-44"><div className="container-x"><p className="eyebrow mb-5">Über uns</p><h1 className="headline-xl max-w-5xl">Ein kleines Studio.<br /><em className="italic-pop">Ein klarer Anspruch.</em></h1><p className="mt-8 max-w-2xl text-lg text-muted md:text-xl">FlamingoMedia ist eine Werkstatt für Websites, Foto und Video. Zwei Menschen, ein Hund, viel Kaffee. Wir glauben an Handwerk vor Marketing-Sprech.</p></div></section>
      <section className="surface py-16 md:py-24"><div className="container-x grid gap-10 md:grid-cols-12"><div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:col-span-6"><Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80" alt="Team FlamingoMedia" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /></div><div className="flex flex-col justify-center md:col-span-6"><h2 className="headline-md">Studio in Innsbruck.<br /><em className="italic-pop">Kunden in der DACH-Region.</em></h2><p className="mt-6 text-lg leading-relaxed text-muted">Wir sind ein kleines, unkompliziertes Team aus Tech-Enthusiast:innen und Gestalter:innen. Lieber kurze Wege als lange Briefings.</p><p className="mt-4 text-lg leading-relaxed text-muted">Unsere Kunden sind Restaurants, Salons, Handwerksbetriebe, Praxen, Kanzleien, Studios und viele mehr.</p></div></div></section>
      <section className="py-20 md:py-28"><div className="container-x"><h2 className="headline-md mb-16 max-w-3xl">Das Team.</h2><div className="grid gap-6 md:grid-cols-3">{[{ n: "Mario Schubert", r: "CEO · Foto & Video", img: "/team/mario.webp", bio: "Der Mann für alles Visuelle. Packt die Kamera aus, denkt in Bildausschnitten und liefert Material, das nach Dir aussieht." }, { n: "Julius von Ingelheim", r: "CTO · Web · UX", img: "/team/julius.jpg", bio: "Gelernter UX-Designer und Tech-Nerd. Liebt saubere Design-Systeme, schnelle Ladezeiten und gute Struktur." }, { n: "Nikey", r: "Chief Happiness Officer", img: "/team/nikey.jpg", bio: "Unser Hund. Begrüßt Besucher:innen, testet Sofakomfort und sorgt dafür, dass keiner zu lange am Schreibtisch sitzt." }].map((m, i) => <article key={m.n} className="overflow-hidden rounded-3xl border border-line bg-white hover-lift"><div className="relative aspect-[4/5]"><Image src={m.img} alt={m.n} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div><div className="p-7"><p className="font-mono text-xs text-muted">/ {String(i + 1).padStart(2, "0")}</p><h3 className="mt-2 font-display text-3xl">{m.n}</h3><p className="mt-1 text-sm text-muted">{m.r}</p><p className="mt-5 text-sm leading-relaxed">{m.bio}</p></div></article>)}</div></div></section>
      <ManifestoSection />
      <CalloutFooter />
    </>
  );
}

export function AgencyContactPage() {
  return (
    <>
      <section className="pb-12 pt-44"><div className="container-x grid gap-10 md:grid-cols-12"><div className="md:col-span-6"><p className="eyebrow mb-5">Kontakt</p><h1 className="headline-xl">Lass<br /><em className="italic-pop">uns reden.</em></h1><p className="mt-8 max-w-md text-lg text-muted md:text-xl">Schreib uns Deine Idee. Wir antworten innerhalb von 24 Stunden mit einer ehrlichen Einschätzung, auch wenn wir nicht der richtige Partner sind.</p><div className="mt-12 space-y-6"><a href={`mailto:${AGENCY.email}`} className="block group"><p className="text-xs uppercase tracking-widest text-muted">E-Mail</p><p className="mt-1 break-all font-display text-xl transition-transform group-hover:translate-x-1 sm:text-2xl md:text-3xl">{AGENCY.email}</p></a><a href={`tel:${AGENCY.phone}`} className="block group"><p className="text-xs uppercase tracking-widest text-muted">Telefon</p><p className="mt-1 font-display text-3xl transition-transform group-hover:translate-x-1">{AGENCY.phone}</p></a><div><p className="text-xs uppercase tracking-widest text-muted">Erreichbarkeit</p><p className="mt-1 text-xl">Mo-Fr · 09:00 - 18:00</p><p className="mt-1 text-sm text-muted">DACH-weit remote · Termine vor Ort nach Absprache.</p></div></div></div><div className="min-w-0 md:col-span-6"><AgencyContactForm /></div></div></section>
      <section className="surface py-16"><div className="container-x"><div className="mb-10 grid gap-8 md:grid-cols-12 md:items-end"><div className="md:col-span-7"><p className="eyebrow mb-5">Wo wir arbeiten</p><h2 className="headline-md">DACH-Region.<br /><em className="italic-pop">Mit Fokus auf drei Städte.</em></h2></div><p className="md:col-span-5 text-base leading-relaxed text-muted">Wir arbeiten remote-first für inhabergeführte Betriebe in Deutschland, Österreich und der Schweiz. Persönliche Termine vor Ort vereinbaren wir gerne nach Absprache.</p></div><div className="grid gap-6 md:grid-cols-3">{["Innsbruck & Tirol", "München & Oberbayern", "Ingolstadt & Region"].map((region) => <article key={region} className="rounded-3xl border border-line bg-white p-7"><p className="font-mono text-xs text-muted">/ Schwerpunkt-Region</p><h3 className="mt-2 font-display text-3xl">{region}</h3></article>)}</div><p className="mt-8 text-sm text-muted">Du sitzt woanders? Schreib uns trotzdem, wir arbeiten DACH-weit remote.</p></div></section>
    </>
  );
}

function AgencyContactForm() {
  const brancheOptions = [
    "Restaurant / Gastro",
    "Salon / Beauty",
    "Handwerk / Service",
    "Praxis / Ärzte",
    "Beratung / Kanzlei",
    "Studio / Coaching",
    "Hotel / Pension",
    "Café / Bäckerei",
    "Andere"
  ];
  const paketOptions = [
    "Template (1.490 EUR)",
    "Mit Content Kit (Foto + Video) (3.180 EUR)",
    "Custom (auf Anfrage)",
    "Noch unentschieden"
  ];

  return (
    <form className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input className="rounded-2xl border border-line px-4 py-3 font-normal outline-none transition focus:border-[var(--accent-color)]" placeholder="Dein Name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          E-Mail
          <input type="email" className="rounded-2xl border border-line px-4 py-3 font-normal outline-none transition focus:border-[var(--accent-color)]" placeholder="name@betrieb.de" />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Branche
            <select className="rounded-2xl border border-line bg-white px-4 py-3 font-normal outline-none transition focus:border-[var(--accent-color)]">
              {brancheOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Paket
            <select className="rounded-2xl border border-line bg-white px-4 py-3 font-normal outline-none transition focus:border-[var(--accent-color)]">
              {paketOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold">
          Nachricht
          <textarea className="min-h-40 rounded-2xl border border-line px-4 py-3 font-normal outline-none transition focus:border-[var(--accent-color)]" placeholder="Worum geht es? Was soll die neue Website können?" />
        </label>
        <button type="submit" className="btn-accent w-full">Anfrage senden <span aria-hidden>→</span></button>
      </div>
    </form>
  );
}

function CalloutFooter() {
  return (
    <section className="bg-brand py-28 text-center text-white md:py-44">
      <div className="container-tight">
        <p className="eyebrow justify-center !text-white/60">Bereit?</p>
        <h2 className="headline-xl mt-5">Bauen wir<br />Deine Website.</h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/75">Wir antworten innerhalb von 24 Stunden mit einer konkreten Einschätzung.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3"><a href="/kontakt" className="btn-accent">Beratung anfragen</a><a href="/beispiele" className="btn-outline !border-white/60 !text-white hover:!bg-white hover:!text-slate-900">Templates ansehen</a></div>
      </div>
    </section>
  );
}

function AgencyFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-black pb-10 pt-24 text-white">
      <div className="container-x">
        <div className="grid gap-10 border-b border-white/10 pb-14 pt-4 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src={AGENCY.logoFullSrc} alt={AGENCY.name} width={260} height={130} className="h-20 w-auto md:h-24" />
            <p className="mt-4 max-w-sm text-sm text-white/70">{AGENCY.tagline}</p>
            <div className="mt-6 flex flex-col gap-1.5 text-sm"><a href={`mailto:${AGENCY.email}`} className="hover:text-accent">{AGENCY.email}</a><a href={`tel:${AGENCY.phone.replace(/\s/g, "")}`} className="hover:text-accent">{AGENCY.phone}</a><a href={`tel:${AGENCY.phoneAt.replace(/\s/g, "")}`} className="hover:text-accent">{AGENCY.phoneAt}</a><span className="text-white/60">Innsbruck · München · Ingolstadt</span></div>
          </div>
        </div>
        <div className="grid gap-8 py-14 text-sm md:grid-cols-4">
          <FooterList title="Studio" items={[["Templates", "/beispiele"], ["Ablauf", "/prozess"], ["Preise", "/preise"], ["Über uns", "/ueber-uns"]]} />
          <FooterList title="Templates" items={[["Restaurant", "/templates/restaurant/classic"], ["Salon & Beauty", "/templates/salon/classic"], ["Handwerk", "/templates/trades/classic"]]} />
          <div><p className="mb-4 text-xs uppercase tracking-widest text-white/50">Region</p><ul className="space-y-2 text-white/70"><li>Innsbruck</li><li>München</li><li>Ingolstadt</li><li>DACH-weit auf Anfrage</li></ul></div>
          <FooterList title="Rechtliches" items={[["Impressum", "/impressum"], ["Datenschutz", "/datenschutz"]]} />
        </div>
        <MarketingMarquee items={["FLAMINGOMEDIA · FLAMINGOMEDIA · FLAMINGOMEDIA ·"]} />
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row"><span>© {new Date().getFullYear()} {AGENCY.name}. Alle Rechte vorbehalten.</span><span className="font-mono">Made with care · Innsbruck</span></div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: Array<[string, string]> }) {
  return <div><p className="mb-4 text-xs uppercase tracking-widest text-white/50">{title}</p><ul className="space-y-2">{items.map(([label, href]) => <li key={href}><a href={href} className="hover:text-accent">{label}</a></li>)}</ul></div>;
}
