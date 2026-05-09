import { industries, styles, type IndustryKey, type StyleKey } from "@flamingo/shared";

export type TemplatePreviewData = {
  industry: IndustryKey;
  style: StyleKey;
  label: string;
  brand: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  accent: string;
  dark: string;
  surface: string;
  nav: string[];
  metrics: Array<{ value: string; label: string }>;
  modules: Array<{ title: string; body: string }>;
  signature: Array<{ title: string; detail: string; price?: string }>;
  gallery: string[];
  process: Array<{ title: string; body: string }>;
  quote: string;
};

const styleTone: Record<StyleKey, { suffix: string; headline: string }> = {
  classic: {
    suffix: "Classic",
    headline: "Ruhig, hochwertig und zeitlos inszeniert."
  },
  modern: {
    suffix: "Modern",
    headline: "Editorial, schnell erfassbar und modular gedacht."
  },
  bold: {
    suffix: "Bold",
    headline: "Praegnant, kontrastreich und auf Conversion gebaut."
  }
};

const base: Record<IndustryKey, Omit<TemplatePreviewData, "style">> = {
  restaurant: {
    industry: "restaurant",
    label: "Restaurant",
    brand: "Casa Flamingo",
    eyebrow: "Restaurant Template",
    headline: "Ein digitaler Gastraum, der Appetit macht.",
    description:
      "Speisekarte, Reservierung, saisonale Menues, Events und Galerie laufen als editierbare CMS-Module.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=85",
    accent: "#f06472",
    dark: "#160d12",
    surface: "#fff4f6",
    nav: ["Menue", "Tisch buchen", "Events", "Kontakt"],
    metrics: [
      { value: "4.9", label: "Google Rating" },
      { value: "18", label: "Signature Dishes" },
      { value: "2 min", label: "Reservierung" }
    ],
    modules: [
      {
        title: "Speisekarte im CMS",
        body: "Kategorien, Preise, Allergene und saisonale Highlights ohne Entwickler pflegen."
      },
      {
        title: "Reservierungs-CTA",
        body: "Direkter Funnel zu Telefon, Formular oder externer Booking-Integration."
      },
      {
        title: "Event & Wochenkarte",
        body: "Aktionsflaechen fuer Lunch, Tastings, Feiern und private Dining."
      }
    ],
    signature: [
      { title: "Truffle Tagliolini", detail: "Hausgemachte Pasta, Pecorino, schwarzer Trueffel", price: "24" },
      { title: "Charred Octopus", detail: "Zitrus, Fenchel, Chili-Oel", price: "28" },
      { title: "Amalfi Lemon Tart", detail: "Baiser, Basilikum, Meersalz", price: "11" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Ankommen", body: "Hero mit Stimmung, Oeffnungszeiten und direkter Reservierung." },
      { title: "Entscheiden", body: "Menue, Drinks und Galerie beantworten die wichtigsten Fragen." },
      { title: "Buchen", body: "Sticky CTA und klare Kontaktwege machen aus Interesse eine Reservierung." }
    ],
    quote:
      "Das Template wirkt nicht wie ein Baukasten. Es fuehlt sich an wie ein eigenes Restaurant-Magazin."
  },
  hotel: {
    industry: "hotel",
    label: "Hotel",
    brand: "Alpine Nest",
    eyebrow: "Hotel Template",
    headline: "Mehr Direktbuchungen durch bessere Zimmer-Stories.",
    description:
      "Zimmer, Angebote, Spa, Lage und Gastgeberprofil werden als mehrseitige Hotelstruktur vorbereitet.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1800&q=85",
    accent: "#ff8a65",
    dark: "#17110d",
    surface: "#fff7ed",
    nav: ["Zimmer", "Angebote", "Spa", "Anreise"],
    metrics: [
      { value: "32", label: "Zimmer" },
      { value: "5", label: "Angebote" },
      { value: "0%", label: "Portalprovision" }
    ],
    modules: [
      {
        title: "Zimmer-Collection",
        body: "Jedes Zimmer mit Galerie, Ausstattung, Preisen und Direktanfrage."
      },
      {
        title: "Angebotsseiten",
        body: "Wellness, Wandern, Kulinarik oder Wochenend-Pakete als eigene Landingpages."
      },
      {
        title: "Trust & Lage",
        body: "Bewertungen, Gastgeber, Umgebung und Anreise in einer ruhigen Storyline."
      }
    ],
    signature: [
      { title: "Panorama Suite", detail: "Balkon, Bergblick, Spa-Zugang", price: "ab 219" },
      { title: "Garden Room", detail: "Terrasse, Fruehstueck, Naturmaterialien", price: "ab 149" },
      { title: "Wellness Weekend", detail: "2 Naechte, Dinner, Massage", price: "ab 389" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Traum zeigen", body: "Grosses Bild, klares Versprechen und saisonaler Buchungsimpuls." },
      { title: "Zimmer vergleichen", body: "Collections machen Zimmer und Angebote schnell pflegbar." },
      { title: "Direkt anfragen", body: "CTA fuehrt ohne Umwege zu Anfrage, Telefon oder Booking Engine." }
    ],
    quote:
      "Die Seite verkauft nicht nur Zimmer, sondern das Gefuehl des Aufenthalts."
  },
  trades: {
    industry: "trades",
    label: "Handwerk",
    brand: "Werk & Wert",
    eyebrow: "Handwerk Template",
    headline: "Ein lokaler Lead-Funnel fuer echte Auftraege.",
    description:
      "Leistungen, Referenzen, Notdienst, Foerderhinweise und Anfrageformular sind auf schnelle Qualifizierung gebaut.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1800&q=85",
    accent: "#60a5fa",
    dark: "#0b1220",
    surface: "#eff6ff",
    nav: ["Leistungen", "Referenzen", "Notdienst", "Anfrage"],
    metrics: [
      { value: "24h", label: "Rueckmeldung" },
      { value: "46", label: "Referenzen" },
      { value: "3", label: "Anfrage-Schritte" }
    ],
    modules: [
      {
        title: "Leistungsseiten",
        body: "Jede Dienstleistung bekommt SEO-Text, Galerie, FAQ und Anfrage-CTA."
      },
      {
        title: "Referenz-Cases",
        body: "Vorher/Nachher, Region, Zeitraum und Ergebnis als CMS-Collection."
      },
      {
        title: "Notdienst & Foerderung",
        body: "Dringende Kontaktwege und Foerderchecks bleiben prominent erreichbar."
      }
    ],
    signature: [
      { title: "Bad Sanierung", detail: "Planung, Umsetzung, Foerdercheck", price: "Case" },
      { title: "Wartung & Service", detail: "Schnelle Termine, klare Pakete", price: "Fix" },
      { title: "Energie Upgrade", detail: "Beratung, Angebot, Umsetzung", price: "Lead" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Problem erkennen", body: "Hero und Leistungsnavigation sprechen lokale Suchintentionen an." },
      { title: "Vertrauen gewinnen", body: "Referenzen, Bewertungen und Prozess nehmen Risiko aus der Anfrage." },
      { title: "Lead qualifizieren", body: "Formular sammelt Ort, Anliegen, Budget und Dringlichkeit." }
    ],
    quote:
      "Endlich eine Handwerker-Seite, die nicht nur gut aussieht, sondern bessere Anfragen bringt."
  },
  tourism: {
    industry: "tourism",
    label: "Tourismus",
    brand: "Peak & Path",
    eyebrow: "Tourismus Template",
    headline: "Touren, Regionen und Erlebnisse als buchbare Story.",
    description:
      "Tourenkatalog, Guide-Profile, Schwierigkeitsgrade, Termine und Anfragewege werden als CMS-Module gedacht.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=85",
    accent: "#7dd3c7",
    dark: "#082f35",
    surface: "#ecfeff",
    nav: ["Touren", "Guides", "Region", "Buchen"],
    metrics: [
      { value: "14", label: "Touren" },
      { value: "6", label: "Guides" },
      { value: "4.8", label: "Rating" }
    ],
    modules: [
      { title: "Touren-Katalog", body: "Dauer, Level, Treffpunkt, Saison und freie Termine als strukturierte Daten." },
      { title: "Guide-Profile", body: "Sprachen, Qualifikationen und persoenliche Routen machen Vertrauen sichtbar." },
      { title: "Buchungs-Funnel", body: "Anfrage, Kalender oder externer Checkout werden prominent integriert." }
    ],
    signature: [
      { title: "Sunrise Ridge Hike", detail: "4 Stunden, mittel, Aussichtspunkt", price: "ab 79" },
      { title: "Family Valley Tour", detail: "Kinderfreundlich, Badestopp, Picknick", price: "ab 49" },
      { title: "Private Guide Day", detail: "Individuelle Route und Transfer", price: "ab 290" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Erlebnis finden", body: "Filter und klare Karten helfen bei Dauer, Level und Saison." },
      { title: "Vertrauen aufbauen", body: "Guides, Bewertungen und Ausruestung reduzieren Rueckfragen." },
      { title: "Direkt buchen", body: "CTA und Terminlogik fuehren ohne Umwege zur Anfrage." }
    ],
    quote: "Die Seite macht aus einer Region ein konkret buchbares Erlebnis."
  },
  salon: {
    industry: "salon",
    label: "Salon",
    brand: "Studio Bloom",
    eyebrow: "Salon Template",
    headline: "Looks, Treatments und Termine in einer eleganten Strecke.",
    description:
      "Beauty-Leistungen, Preislisten, Team, Lookbook und Booking-CTA werden visuell stark und pflegbar aufgebaut.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85",
    accent: "#f472b6",
    dark: "#2a0f1f",
    surface: "#fdf2f8",
    nav: ["Treatments", "Looks", "Team", "Termin"],
    metrics: [
      { value: "28", label: "Treatments" },
      { value: "7", label: "Artists" },
      { value: "90s", label: "Booking CTA" }
    ],
    modules: [
      { title: "Treatment-Menue", body: "Leistungen, Dauer, Preise und Pflegehinweise als editierbare Liste." },
      { title: "Lookbook", body: "Galerien zeigen Schnitte, Farbe, Kosmetik oder Spa-Momente in Kampagnenlogik." },
      { title: "Team & Booking", body: "Profile und direkte Terminwege reduzieren Reibung vor der Buchung." }
    ],
    signature: [
      { title: "Balayage Refresh", detail: "Beratung, Glossing, Finish", price: "ab 145" },
      { title: "Signature Cut", detail: "Waschen, Schnitt, Styling", price: "ab 69" },
      { title: "Glow Facial", detail: "Reinigung, Treatment, Massage", price: "ab 89" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Stil erkennen", body: "Hero und Lookbook zeigen sofort, fuer welche Kundschaft der Salon steht." },
      { title: "Leistung waehlen", body: "Preise, Dauer und Kategorien schaffen Orientierung." },
      { title: "Termin sichern", body: "Booking-CTA bleibt nah an jeder relevanten Entscheidung." }
    ],
    quote: "Das Template fuehlt sich an wie ein hochwertiges Lookbook, bleibt aber komplett pflegbar."
  },
  consulting: {
    industry: "consulting",
    label: "Beratung",
    brand: "Northline Advisory",
    eyebrow: "Consulting Template",
    headline: "Expertise, Cases und Kontakt mit B2B-Klarheit.",
    description:
      "Fuer Beratungen, Kanzleien und Agenturen: Leistungen, Branchen, Team, Cases und Termin-Anfrage als ruhiger Funnel.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85",
    accent: "#a78bfa",
    dark: "#17122c",
    surface: "#f5f3ff",
    nav: ["Expertise", "Cases", "Team", "Termin"],
    metrics: [
      { value: "12", label: "Cases" },
      { value: "4", label: "Sectors" },
      { value: "30m", label: "Erstgespraech" }
    ],
    modules: [
      { title: "Expertise-Matrix", body: "Themen, Branchen und Outcomes werden schnell vergleichbar." },
      { title: "Case Studies", body: "Ausgangslage, Vorgehen und Ergebnis als wiederverwendbare Collection." },
      { title: "Termin-Strecke", body: "Vorab-Briefing sammelt Kontext, bevor der Call stattfindet." }
    ],
    signature: [
      { title: "Go-to-Market Sprint", detail: "Positionierung, Angebot, Launchplan", price: "Sprint" },
      { title: "Operational Audit", detail: "Prozesse, Risiken, Roadmap", price: "Audit" },
      { title: "Leadership Workshop", detail: "Team, Ziele, Entscheidungslogik", price: "Workshop" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Problem rahmen", body: "Klare Leistungslogik hilft Entscheiderinnen, sich wiederzufinden." },
      { title: "Kompetenz pruefen", body: "Cases, Team und Methoden liefern Substanz statt Buzzwords." },
      { title: "Termin buchen", body: "Ein kurzes Briefing macht die Anfrage qualifizierter." }
    ],
    quote: "Serioes, aber nicht langweilig. Genau die Balance, die B2B-Seiten oft fehlt."
  },
  medical: {
    industry: "medical",
    label: "Praxis",
    brand: "Praxis Morgen",
    eyebrow: "Medical Template",
    headline: "Vertrauen, Orientierung und Termine ohne Stress.",
    description:
      "Praxisleistungen, Sprechzeiten, Team, Hinweise und Terminwege werden ruhig, klar und barrierearm sortiert.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85",
    accent: "#22d3ee",
    dark: "#073344",
    surface: "#ecfeff",
    nav: ["Leistungen", "Team", "Sprechzeiten", "Termin"],
    metrics: [
      { value: "8", label: "Leistungen" },
      { value: "4", label: "Behandler" },
      { value: "2", label: "Standorte" }
    ],
    modules: [
      { title: "Leistungsuebersicht", body: "Diagnostik, Therapie und Ablauf verstaendlich gegliedert." },
      { title: "Sprechzeiten & Hinweise", body: "Notfall, Rezept, Ersttermin und Dokumente bleiben schnell auffindbar." },
      { title: "Team-Profile", body: "Kompetenzen, Sprachen und Schwerpunkte schaffen Vertrauen." }
    ],
    signature: [
      { title: "Ersttermin", detail: "Anamnese, Unterlagen, Ablauf", price: "Info" },
      { title: "Therapieplan", detail: "Diagnostik, Beratung, Folgetermin", price: "Ablauf" },
      { title: "Online-Termin", detail: "Doctolib, Telefon oder Formular", price: "CTA" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Orientieren", body: "Besucher finden Leistung, Sprechzeit und Kontakt ohne Suchen." },
      { title: "Verstehen", body: "Ablauftexte reduzieren Unsicherheit vor dem ersten Termin." },
      { title: "Termin waehlen", body: "Online-Booking und Telefon bleiben sichtbar und eindeutig." }
    ],
    quote: "Ruhig, professionell und so klar, dass Patientinnen schneller die richtige Information finden."
  },
  fitness: {
    industry: "fitness",
    label: "Fitness",
    brand: "Motion Club",
    eyebrow: "Fitness Template",
    headline: "Kurse, Coaches und Probetraining mit Energie.",
    description:
      "Fuer Studios, Yoga, Personal Training und Coaching: Kursplan, Programme, Preise und Trial-Funnel in einem System.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=85",
    accent: "#facc15",
    dark: "#171307",
    surface: "#fefce8",
    nav: ["Kurse", "Coaches", "Preise", "Probetraining"],
    metrics: [
      { value: "42", label: "Kurse/Woche" },
      { value: "9", label: "Coaches" },
      { value: "1", label: "Trial CTA" }
    ],
    modules: [
      { title: "Kursplan", body: "Wochentage, Level, Trainer und freie Plaetze als strukturierte Ansicht." },
      { title: "Programme", body: "Strength, Mobility, Yoga oder Coaching als verkaufsstarke Module." },
      { title: "Probetraining", body: "Ein klarer Trial-Funnel holt neue Mitglieder ohne lange Erklaerung ab." }
    ],
    signature: [
      { title: "Strength Lab", detail: "Small group, Progression, Coach", price: "Mo/Do" },
      { title: "Mobility Flow", detail: "Yoga, Breath, Recovery", price: "Di" },
      { title: "Personal Intro", detail: "Analyse, Plan, erste Session", price: "Trial" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Energie spueren", body: "Hero und Bildwelt zeigen sofort Intensitaet und Community." },
      { title: "Kurs finden", body: "Programme und Kalender beantworten Level, Zeit und Ziel." },
      { title: "Probieren", body: "Probetraining und Preisinfo machen den Einstieg niedrigschwellig." }
    ],
    quote: "Die Seite fuehlt sich nach Training an: direkt, kraftvoll und schnell buchbar."
  },
  "real-estate": {
    industry: "real-estate",
    label: "Immobilien",
    brand: "Haus & Hof",
    eyebrow: "Immobilien Template",
    headline: "Objekte, Bewertung und Vertrauen fuer lokale Makler.",
    description:
      "Objektlisten, Exposes, Bewertung, Regionen, Suchprofile und Kontaktstrecken werden als CMS-Collections aufgebaut.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    accent: "#34d399",
    dark: "#06281d",
    surface: "#ecfdf5",
    nav: ["Objekte", "Bewertung", "Regionen", "Kontakt"],
    metrics: [
      { value: "24", label: "Objekte" },
      { value: "3", label: "Regionen" },
      { value: "48h", label: "Bewertung" }
    ],
    modules: [
      { title: "Objekt-Collection", body: "Preis, Lage, Flaeche, Galerie und Status werden sauber gepflegt." },
      { title: "Bewertungs-Funnel", body: "Eigentuemer werden ueber klare Fragen zur qualifizierten Anfrage gefuehrt." },
      { title: "Regionen-Seiten", body: "Lokale SEO-Seiten zeigen Marktkenntnis und passende Objekte." }
    ],
    signature: [
      { title: "Townhouse Nord", detail: "148 qm, Garten, familienfreundlich", price: "Expos" },
      { title: "Penthouse West", detail: "Dachterrasse, Stadtblick, Lift", price: "Neu" },
      { title: "Verkaufsbewertung", detail: "Marktpreis, Strategie, Zeitplan", price: "Lead" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Objekt entdecken", body: "Klare Objektkarten und Filter helfen Kaeufern beim Einstieg." },
      { title: "Vertrauen bilden", body: "Regionenwissen, Prozess und Referenzen zeigen Kompetenz." },
      { title: "Kontakt ausloesen", body: "Bewertung und Expose-Anfrage werden als starke CTAs gefuehrt." }
    ],
    quote: "Makler-Website und Objekt-System fuehlen sich endlich wie ein zusammenhaengendes Produkt an."
  }
};

export function getTemplatePreview(industry: string, style: string): TemplatePreviewData | null {
  if (!industries.includes(industry as IndustryKey) || !styles.includes(style as StyleKey)) {
    return null;
  }

  const key = industry as IndustryKey;
  const styleKey = style as StyleKey;
  const tone = styleTone[styleKey];

  return {
    ...base[key],
    style: styleKey,
    brand: `${base[key].brand} ${tone.suffix}`,
    headline: styleKey === "classic" ? base[key].headline : tone.headline
  };
}

export function getTemplateParams() {
  return industries.flatMap((industry) => styles.map((style) => ({ industry, style })));
}
