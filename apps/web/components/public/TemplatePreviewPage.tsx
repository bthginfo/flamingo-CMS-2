import { styles, type StyleKey } from "@flamingo/shared";
import {
  BookingPanelSection,
  LeadFormSection,
  MenuSection,
  PropertyGridSection,
  RoomGridSection,
  TeamGridSection
} from "@flamingo/sections";
import type { TemplatePreviewData, TemplateSubpageData, TemplateSubpageSection } from "./template-preview-data";

const styleCopy: Record<StyleKey, string> = {
  classic: "Ruhig, hochwertig und mit viel Raum fuer Bilder und Vertrauen.",
  modern: "Modular, schnell erfassbar und perfekt fuer Besucher mit wenig Zeit.",
  bold: "Kontrastreich, direkt und gebaut fuer starke erste Eindruecke."
};

type TemplateBlock =
  | "live"
  | "signature"
  | "deepDive"
  | "modules"
  | "highlights"
  | "gallery"
  | "process";

const styleDramaturgy: Record<StyleKey, TemplateBlock[]> = {
  classic: ["signature", "deepDive", "highlights", "gallery", "process", "live", "modules"],
  modern: ["live", "modules", "deepDive", "signature", "process", "highlights", "gallery"],
  bold: ["deepDive", "live", "gallery", "modules", "signature", "highlights", "process"]
};

export function TemplatePreviewPage({ data, pageSlug }: { data: TemplatePreviewData; pageSlug?: string }) {
  const activePage = pageSlug ? data.pages.find((page) => page.slug === pageSlug) : null;

  return (
    <div
      className={`template-preview tpl-style-${data.style} tpl-variant-${data.industry}`}
      style={{ ["--tpl-accent" as string]: data.accent, ["--tpl-dark" as string]: data.dark }}
    >
      <TemplateNav data={data} activeSlug={activePage?.slug} />
      {activePage ? (
        <TemplateSubpage data={data} page={activePage} />
      ) : (
        <>
          <TemplateHero data={data} />
          {styleDramaturgy[data.style].map((block) => (
            <TemplateBlockRenderer key={block} block={block} data={data} />
          ))}
        </>
      )}
      <TemplateCta data={data} />
    </div>
  );
}

function TemplateBlockRenderer({
  block,
  data
}: {
  block: TemplateBlock;
  data: TemplatePreviewData;
}) {
  if (block === "live") {
    return <TemplateLivePanel data={data} />;
  }

  if (block === "signature") {
    return <TemplateIndustrySignature data={data} />;
  }

  if (block === "deepDive") {
    return <TemplateIndustryDeepDive data={data} />;
  }

  if (block === "modules") {
    return <TemplateModules data={data} />;
  }

  if (block === "highlights") {
    return <TemplateSignature data={data} />;
  }

  if (block === "gallery") {
    return <TemplateGallery data={data} />;
  }

  return <TemplateProcess data={data} />;
}

const industrySignatureData: Record<
  TemplatePreviewData["industry"],
  {
    title: string;
    eyebrow: string;
    lead: string;
    primary: Array<{ label: string; value: string; meta: string }>;
    secondary: string[];
    image: string;
  }
> = {
  restaurant: {
    eyebrow: "Menu Experience",
    title: "Speisekarte, Stimmung und Reservierung greifen ineinander.",
    lead: "Gerichte, Drinks, Oeffnungszeiten und Events werden nicht versteckt. Die Seite fuehrt direkt vom Appetit zur Buchung.",
    primary: [
      { label: "Antipasti", value: "Burrata & Pfirsich", meta: "14" },
      { label: "Pasta", value: "Truffle Tagliolini", meta: "24" },
      { label: "Dolce", value: "Amalfi Lemon Tart", meta: "11" }
    ],
    secondary: ["Heute: 18:00 - 23:00", "Terrasse offen", "Private Dining bis 18 Personen"],
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1300&q=85"
  },
  hotel: {
    eyebrow: "Booking Story",
    title: "Zimmer, Angebote und Erlebnis werden zur Direktbuchung.",
    lead: "Der Gast sieht nicht nur Ausstattung, sondern einen Aufenthalt: Zimmervergleich, Spa, Lage und Pakete mit klaren Anfragewegen.",
    primary: [
      { label: "Suite", value: "Panorama Suite", meta: "ab 219" },
      { label: "Offer", value: "Wellness Weekend", meta: "2 Naechte" },
      { label: "Extra", value: "Late Checkout", meta: "inklusive" }
    ],
    secondary: ["Keine Portalprovision", "Spa-Zugang sichtbar", "Saisonale Angebote"],
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1300&q=85"
  },
  tourism: {
    eyebrow: "Tour Planner",
    title: "Touren fuehlen sich schon vor der Anfrage buchbar an.",
    lead: "Level, Dauer, Treffpunkt, Guides und Saison werden als echte Entscheidungsdaten sichtbar.",
    primary: [
      { label: "Hike", value: "Sunrise Ridge", meta: "4h" },
      { label: "Guide", value: "Mara / EN DE", meta: "frei" },
      { label: "Level", value: "Mittel", meta: "ab 79" }
    ],
    secondary: ["Treffpunkt im Hero", "Guide-Profile", "Saisonale Verfuegbarkeit"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1300&q=85"
  },
  salon: {
    eyebrow: "Lookbook Booking",
    title: "Treatments, Looks und Artist-Profil machen den Termin greifbar.",
    lead: "Beauty-Seiten brauchen mehr als eine Preisliste: Lookbook, Dauer, Preis, Team und Buchung muessen direkt zusammenspielen.",
    primary: [
      { label: "Color", value: "Balayage Refresh", meta: "120 min" },
      { label: "Cut", value: "Signature Cut", meta: "ab 69" },
      { label: "Care", value: "Glow Facial", meta: "ab 89" }
    ],
    secondary: ["Artist-Auswahl", "Vorher/Nachher Galerie", "Online-Termin prominent"],
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1300&q=85"
  },
  trades: {
    eyebrow: "Lead Funnel",
    title: "Handwerk braucht Vertrauen, Referenzen und schnelle Anfragen.",
    lead: "Leistungsseiten, Referenz-Cases, Dringlichkeit und Anfrageformular qualifizieren Kontakte, bevor das Telefon klingelt.",
    primary: [
      { label: "Case", value: "Bad Sanierung", meta: "14 Tage" },
      { label: "Service", value: "Wartung", meta: "Fixpreis" },
      { label: "Lead", value: "Energie Upgrade", meta: "Foerdercheck" }
    ],
    secondary: ["Notdienst-CTA", "Regionale SEO-Seiten", "Referenzen mit Ergebnis"],
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1300&q=85"
  },
  consulting: {
    eyebrow: "B2B Clarity",
    title: "Expertise wird als Entscheidungsstrecke inszeniert.",
    lead: "Cases, Methoden, Branchen und Teamprofile werden so aufgebaut, dass Entscheider schnell Vertrauen und Relevanz erkennen.",
    primary: [
      { label: "Sprint", value: "Go-to-Market", meta: "2 Wochen" },
      { label: "Audit", value: "Operations", meta: "Roadmap" },
      { label: "Call", value: "30m Scope", meta: "kostenlos" }
    ],
    secondary: ["Case-Study Struktur", "Team mit Schwerpunkten", "Briefing vor dem Call"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1300&q=85"
  },
  medical: {
    eyebrow: "Patient Flow",
    title: "Praxis-Websites muessen beruhigen und sofort orientieren.",
    lead: "Leistungen, Sprechzeiten, Team, Notfall-Hinweise und Online-Termin sind barrierearm sortiert.",
    primary: [
      { label: "Termin", value: "Erstgespraech", meta: "online" },
      { label: "Info", value: "Sprechzeiten", meta: "2 Standorte" },
      { label: "Team", value: "4 Behandler", meta: "Profile" }
    ],
    secondary: ["Notfall-Hinweise", "Leistungsuebersicht", "Unterlagen vorab"],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1300&q=85"
  },
  fitness: {
    eyebrow: "Class Energy",
    title: "Kursplan, Programme und Trial-CTA pushen den Einstieg.",
    lead: "Fitness braucht Rhythmus: Kurse, Coaches, Level, Preis und Probetraining muessen in Sekunden scanbar sein.",
    primary: [
      { label: "Heute", value: "Strength Lab", meta: "18:00" },
      { label: "Coach", value: "Nina", meta: "Mobility" },
      { label: "Trial", value: "Intro Session", meta: "0 EUR" }
    ],
    secondary: ["Wochenplan", "Coach-Karten", "Probetraining Funnel"],
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1300&q=85"
  },
  "real-estate": {
    eyebrow: "Property Funnel",
    title: "Objekte, Regionen und Bewertung arbeiten zusammen.",
    lead: "Makler-Seiten brauchen Objektlogik, Eigentümer-Funnel und lokale Kompetenz auf einer klaren Oberfläche.",
    primary: [
      { label: "Neu", value: "Penthouse West", meta: "124 qm" },
      { label: "Region", value: "Innenstadt", meta: "Guide" },
      { label: "Lead", value: "Bewertung", meta: "48h" }
    ],
    secondary: ["Objektstatus", "Expose Anfrage", "Verkaufsbewertung"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1300&q=85"
  },
  wedding: {
    eyebrow: "Guest Journey",
    title: "Story, Ablauf und RSVP fuehlen sich persoenlich an.",
    lead: "Eine Hochzeitsseite fuehrt Gaeste emotional durch Geschichte, Location, Tagesplan und Antwortformular.",
    primary: [
      { label: "Story", value: "Mara & Leo", meta: "seit 2018" },
      { label: "Ablauf", value: "Freie Trauung", meta: "16:00" },
      { label: "RSVP", value: "Zusage", meta: "bis 12.07." }
    ],
    secondary: ["Countdown", "Dresscode", "Unterkunft & Anreise"],
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1300&q=85"
  }
};

function templateButton(label: string, href: string) {
  return {
    label,
    href,
    type: "external" as const,
    openInNewTab: false,
    styleVariant: "primary" as const
  };
}

function TemplateIndustrySignature({ data }: { data: TemplatePreviewData }) {
  const signature = industrySignatureData[data.industry];

  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="grid content-between rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <div>
            <p className="showcase-eyebrow">{signature.eyebrow}</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.94] md:text-6xl">{signature.title}</h2>
            <p className="mt-6 text-lg leading-8 text-black/60">{signature.lead}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {signature.secondary.map((item) => (
              <span key={item} className="rounded-full border border-black/10 bg-paper px-3 py-1 text-xs font-black text-black/60">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm lg:grid-cols-[1fr_0.92fr]">
          <div
            className="min-h-[420px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,.55), transparent 55%), url(${signature.image})`
            }}
          />
          <div className="grid content-between gap-5 p-5">
            <div className="grid gap-3">
              {signature.primary.map((item) => (
                <article key={item.value} className="rounded-md border border-black/10 bg-paper p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">{item.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <h3 className="text-2xl font-black leading-none">{item.value}</h3>
                    <span className="rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: data.dark }}>
                      {item.meta}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="rounded-md p-5 text-white" style={{ background: data.dark }}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                {data.label} / {data.style}
              </p>
              <p className="mt-3 text-3xl font-black leading-none">
                Ein Auftritt mit eigener Dramaturgie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplateIndustryDeepDive({ data }: { data: TemplatePreviewData }) {
  if (data.industry === "restaurant") {
    return (
      <MenuSection
        design={{ background: "paper", container: "wide", spacing: "generous" }}
        data={{
          eyebrow: "A la carte",
          headline: "Eine Karte, die nach Kueche klingt, nicht nach Datenbank.",
          description: "Kategorien, Preise, Allergene und saisonale Hinweise sind klar und aktuell.",
          categories: [
            {
              name: "Aus der Kueche",
              items: [
                { title: "Burrata & Pfirsich", description: "Basilikum, Olivenoel, geroestete Mandeln", price: "14", badges: ["vegetarisch"] },
                { title: "Truffle Tagliolini", description: "Hausgemachte Pasta, Pecorino, schwarzer Trueffel", price: "24", badges: ["Signature"] }
              ]
            },
            {
              name: "Am Abend",
              items: [
                { title: "Charred Octopus", description: "Zitrus, Fenchel, Chili-Oel", price: "28", badges: [] },
                { title: "Amalfi Lemon Tart", description: "Baiser, Basilikum, Meersalz", price: "11", badges: ["Dessert"] }
              ]
            }
          ]
        }}
      />
    );
  }

  if (data.industry === "hotel") {
    return (
      <RoomGridSection
        design={{ background: "muted", container: "wide", spacing: "generous" }}
        data={{
          eyebrow: "Zimmer",
          headline: "Zimmervergleich mit Atmosphaere und direktem Anfrageweg.",
          description: "Zimmer, Features, Preise und Bilder bleiben schnell vergleichbar.",
          rooms: [
            { title: "Panorama Suite", description: "Balkon, Bergblick, Spa-Zugang und Late Checkout.", price: "ab 219", features: ["Balkon", "Spa", "Dinner Option"], cta: templateButton("Suite anfragen", "/kontakt") },
            { title: "Garden Room", description: "Ruhige Terrasse, Naturmaterialien und Fruehstueck.", price: "ab 149", features: ["Terrasse", "Kingsize", "ruhig"], cta: templateButton("Zimmer anfragen", "/kontakt") },
            { title: "Family Studio", description: "Mehr Raum, flexible Betten und kurze Wege.", price: "ab 189", features: ["4 Personen", "Kitchenette", "Bergblick"], cta: templateButton("Verfuegbarkeit", "/kontakt") }
          ]
        }}
      />
    );
  }

  if (data.industry === "real-estate") {
    return (
      <PropertyGridSection
        design={{ background: "paper", container: "wide", spacing: "generous" }}
        data={{
          eyebrow: "Objekte",
          headline: "Objekte, Bewertung und Expose arbeiten in einem Funnel.",
          description: "Kaeufer sehen Fakten schnell, Eigentuemer finden direkt den Bewertungsweg.",
          properties: [
            { title: "Penthouse West", location: "Innenstadt", price: "auf Anfrage", facts: ["124 qm", "Dachterrasse", "Lift"], cta: templateButton("Expose anfragen", "/kontakt") },
            { title: "Townhouse Nord", location: "Familienlage", price: "890.000", facts: ["148 qm", "Garten", "4 Zimmer"], cta: templateButton("Besichtigung", "/kontakt") },
            { title: "Altbau Studio", location: "Kulturviertel", price: "420.000", facts: ["68 qm", "Stuck", "Balkon"], cta: templateButton("Details", "/kontakt") }
          ]
        }}
      />
    );
  }

  if (data.industry === "wedding") {
    return (
      <LeadFormSection
        design={{ background: "muted", container: "wide", spacing: "generous" }}
        data={{
          eyebrow: "RSVP",
          headline: "Zusage, Begleitung und Hinweise an einem Ort.",
          description: "Gaeste koennen direkt antworten, Allergien angeben und Songwuensche senden.",
          formKey: "funding-lead",
          fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "email", label: "E-Mail", type: "email", required: true },
            { name: "message", label: "Begleitung, Allergien oder Songwunsch", type: "textarea", required: false }
          ],
          submitLabel: "Zusage senden",
          privacyNote: "Die Angaben werden nur fuer die Hochzeitsplanung verwendet."
        }}
      />
    );
  }

  if (["salon", "medical", "consulting", "fitness"].includes(data.industry)) {
    return (
      <TeamGridSection
        design={{ background: "paper", container: "wide", spacing: "generous" }}
        data={{
          eyebrow: data.industry === "fitness" ? "Coaches" : "Team",
          headline: "Profile, die Vertrauen vor dem ersten Kontakt aufbauen.",
          description: "Rollen, Schwerpunkte und persoenliche Details machen die Wahl leichter.",
          members: [
            { name: "Mara Leitner", role: "Lead", bio: "Verbindet Beratung, Qualitaet und eine klare Kundenerfahrung.", specialties: ["Beratung", "Qualitaet"] },
            { name: "Jonas Berger", role: "Experte", bio: "Macht Leistungen greifbar und beantwortet die wichtigsten Fragen.", specialties: ["Service", "Ablauf"] },
            { name: "Nina Hofer", role: "Kontakt", bio: "Begleitet Anfragen schnell und persoenlich zum passenden Termin.", specialties: ["Termine", "Support"] }
          ]
        }}
      />
    );
  }

  return (
    <BookingPanelSection
      design={{ background: "ink", container: "wide", spacing: "generous" }}
      data={{
        eyebrow: "Anfrage",
        headline: "Aus Interesse wird eine klare naechste Aktion.",
        description: "Leistung, Zeitraum, Dringlichkeit und Kontaktweg werden sichtbar gefuehrt.",
        primaryCta: templateButton("Anfrage starten", "/kontakt"),
        secondaryCta: {
          label: "Referenzen ansehen",
          href: "#module",
          type: "pageSection",
          sectionReference: "module",
          openInNewTab: false,
          styleVariant: "secondary"
        },
        highlights: ["schnelle Rueckmeldung", "qualifizierte Anfrage", "lokaler Kontext"]
      }}
    />
  );
}

const industryPanelCopy: Record<
  TemplatePreviewData["industry"],
  { title: string; kicker: string; left: string; right: string; cta: string }
> = {
  restaurant: {
    title: "Heute Abend noch freie Tische.",
    kicker: "Reservierung",
    left: "2 Personen · 19:30 Uhr · Terrasse",
    right: "Wochenkarte: Trueffel, Amalfi, Naturwein",
    cta: "Tisch sichern"
  },
  hotel: {
    title: "Direkt buchen statt Provision zahlen.",
    kicker: "Aufenthalt",
    left: "2 Naechte · Panorama Suite · Spa inklusive",
    right: "Sommerangebot mit Dinner und Late Checkout",
    cta: "Zimmer anfragen"
  },
  tourism: {
    title: "Tour auswaehlen, Guide kennenlernen, Termin sichern.",
    kicker: "Erlebnis",
    left: "Sunrise Ridge · mittel · 4 Stunden",
    right: "Treffpunkt, Level und freie Termine direkt sichtbar",
    cta: "Tour buchen"
  },
  salon: {
    title: "Look finden und Termin ohne Umwege buchen.",
    kicker: "Booking",
    left: "Balayage Refresh · 120 Minuten · Studio Bloom",
    right: "Preise, Dauer und Artist-Profil sind sofort klar",
    cta: "Termin buchen"
  },
  trades: {
    title: "Aus Interesse wird eine qualifizierte Anfrage.",
    kicker: "Leadflow",
    left: "Bad Sanierung · Innsbruck · Budget vorhanden",
    right: "Referenzen, Notdienst und Prozess senken Rueckfragen",
    cta: "Anfrage starten"
  },
  consulting: {
    title: "B2B-Kompetenz ohne Buzzword-Fassade.",
    kicker: "Erstgespraech",
    left: "30 Minuten · Scope Check · klare naechste Schritte",
    right: "Cases, Methoden und Team zeigen Substanz",
    cta: "Termin buchen"
  },
  medical: {
    title: "Patientinnen finden schnell den richtigen Weg.",
    kicker: "Praxis",
    left: "Sprechzeiten · Leistungen · Online-Termin",
    right: "Ruhige Navigation und klare Hinweise reduzieren Stress",
    cta: "Termin vereinbaren"
  },
  fitness: {
    title: "Kursplan, Coaches und Probetraining mit Energie.",
    kicker: "Trial",
    left: "Strength Lab · Donnerstag · 18:00 Uhr",
    right: "Level, Coach und Einstieg sind sofort sichtbar",
    cta: "Probetraining"
  },
  "real-estate": {
    title: "Objekte und Bewertung in einem starken Funnel.",
    kicker: "Immobilien",
    left: "Penthouse West · 124 qm · Dachterrasse",
    right: "Expose, Region und Bewertungs-CTA arbeiten zusammen",
    cta: "Expose anfragen"
  },
  wedding: {
    title: "Alle Gaeste wissen, wo sie wann sein sollen.",
    kicker: "RSVP",
    left: "Freie Trauung · 16:00 Uhr · Villa Rosengold",
    right: "Zusage, Allergien, Songwuensche und Unterkunftshinweise laufen sauber zusammen",
    cta: "Jetzt zusagen"
  }
};

function TemplateLivePanel({ data }: { data: TemplatePreviewData }) {
  const copy = industryPanelCopy[data.industry];

  return (
    <section className="px-5 py-16 md:px-8 md:py-20" style={{ background: data.surface }}>
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <p className="showcase-eyebrow">{copy.kicker}</p>
          <h2 className="mt-4 text-5xl font-black leading-[0.94] md:text-6xl">{copy.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
            Besucher sehen sofort die naechste sinnvolle Aktion und finden ohne Umwege zum passenden Angebot.
          </p>
        </div>
        <div className="grid gap-4 rounded-lg p-4 text-white" style={{ background: data.dark }}>
          <div className="rounded-md border border-white/10 bg-white/[0.07] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Auswahl</p>
            <p className="mt-3 text-3xl font-black">{copy.left}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <p className="rounded-md border border-white/10 bg-white/[0.07] p-5 leading-7 text-white/72">
              {copy.right}
            </p>
            <a className="showcase-button showcase-button-light whitespace-nowrap" href="/kontakt">
              {copy.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplateSubpage({ data, page }: { data: TemplatePreviewData; page: TemplateSubpageData }) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink px-5 py-20 text-white md:px-8 md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url(${page.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="showcase-eyebrow text-white/70">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
              {page.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/75">{page.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="showcase-button showcase-button-light" href="/kontakt">
                {page.ctaLabel}
              </a>
              <a
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black"
                href={`/templates/${data.industry}/${data.style}`}
              >
                Startseite
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.08] p-4 backdrop-blur">
            <div className="grid gap-3 rounded-md bg-white p-4 text-black">
              {page.sections.flatMap((section) => section.items).slice(0, 3).map((item) => (
                <article key={item.title} className="rounded-md bg-black/[0.04] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-black">{item.title}</h2>
                    {item.meta ? (
                      <span className="rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: data.dark }}>
                        {item.meta}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm font-bold leading-6 text-black/55">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      {page.sections.map((section, index) => (
        <TemplateSubpageSectionView key={`${page.slug}-${section.eyebrow}-${index}`} data={data} section={section} index={index} />
      ))}
    </>
  );
}

function TemplateSubpageSectionView({
  data,
  section,
  index
}: {
  data: TemplatePreviewData;
  section: TemplateSubpageSection;
  index: number;
}) {
  const dark = section.type === "lead" || section.type === "gallery";

  return (
    <section
      className={`px-5 py-20 md:px-8 md:py-28 ${dark ? "text-white" : ""}`}
      style={{ background: dark ? data.dark : index % 2 ? data.surface : "#ffffff" }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className={`showcase-eyebrow ${dark ? "text-white/60" : ""}`}>{section.eyebrow}</p>
          <h2 className="mt-4 text-5xl font-black leading-[0.96] md:text-6xl">{section.headline}</h2>
          <p className={`mt-6 text-lg leading-8 ${dark ? "text-white/68" : "text-black/60"}`}>{section.body}</p>
          {section.ctaLabel ? (
            <a className={`mt-8 inline-flex ${dark ? "showcase-button showcase-button-light" : "showcase-button"}`} href="/kontakt">
              {section.ctaLabel}
            </a>
          ) : null}
        </div>
        <div className={`grid gap-4 ${section.type === "timeline" ? "" : "md:grid-cols-2"}`}>
          {section.items.map((item, itemIndex) => (
            <article
              key={`${item.title}-${itemIndex}`}
              className={`rounded-lg border p-6 shadow-sm transition duration-300 hover:-translate-y-1 ${
                dark ? "border-white/10 bg-white/[0.08]" : "border-black/10 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black">{item.title}</h3>
                {item.meta ? (
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${dark ? "bg-white text-black" : "text-white"}`} style={dark ? undefined : { background: data.dark }}>
                    {item.meta}
                  </span>
                ) : null}
              </div>
              <p className={`mt-4 leading-7 ${dark ? "text-white/68" : "text-black/60"}`}>{item.body}</p>
              {item.price ? (
                <p className="mt-6 text-3xl font-black" style={{ color: dark ? "#ffffff" : data.accent }}>
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

function TemplateNav({ data, activeSlug }: { data: TemplatePreviewData; activeSlug?: string }) {
  return (
    <div className="sticky top-[93px] z-30 border-b border-black/10 bg-white/88 px-5 py-3 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a className="text-lg font-black tracking-[-0.03em]" href={`/templates/${data.industry}/${data.style}`}>
          {data.brand}
        </a>
        <nav className="hidden items-center gap-5 text-sm font-bold text-black/60 md:flex">
          {data.pages.map((item) => (
            <a
              key={item.slug}
              href={`/templates/${data.industry}/${data.style}/${item.slug}`}
              className={activeSlug === item.slug ? "text-black" : "hover:text-black"}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="showcase-button showcase-button-compact" href="/kontakt">
          {data.pages[0]?.ctaLabel ?? "Anfragen"}
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
            bilden die Entscheidungspunkte, auf die Besucher wirklich achten.
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
            Diese Highlights geben Besuchern genug Substanz, um Vertrauen aufzubauen und die
            naechste Entscheidung zu treffen.
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
            Grosse Bilder, klare Kontraste und passende Schnitte geben der Marke eine eigene
            visuelle Erinnerung.
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
