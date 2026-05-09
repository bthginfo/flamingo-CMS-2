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
  tourism: fallback("tourism", "Tourismus", "Peak & Path", "#7dd3c7"),
  salon: fallback("salon", "Salon", "Studio Bloom", "#f472b6"),
  consulting: fallback("consulting", "Beratung", "Northline Advisory", "#a78bfa"),
  medical: fallback("medical", "Praxis", "Praxis Morgen", "#22d3ee"),
  fitness: fallback("fitness", "Fitness", "Motion Club", "#facc15"),
  "real-estate": fallback("real-estate", "Immobilien", "Haus & Hof", "#34d399")
};

function fallback(
  industry: IndustryKey,
  label: string,
  brand: string,
  accent: string
): Omit<TemplatePreviewData, "style"> {
  return {
    industry,
    label,
    brand,
    eyebrow: `${label} Template`,
    headline: `${label}-Website mit CMS, Preview und klarer Conversion.`,
    description:
      "Ein funktionierender Preview-Aufbau mit Hero, Modulen, Collection-Flaechen, Galerie und CTA.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
    accent,
    dark: "#101317",
    surface: "#fbfaf8",
    nav: ["Angebot", "Module", "Referenzen", "Kontakt"],
    metrics: [
      { value: "3", label: "Styles" },
      { value: "6+", label: "Module" },
      { value: "CMS", label: "Editierbar" }
    ],
    modules: [
      { title: "Branchen-Hero", body: "Positionierung, Bildwelt und primaerer CTA sind vorbereitet." },
      { title: "CMS-Module", body: "Leistungen, Referenzen, Team und FAQ sind strukturierte Inhalte." },
      { title: "Lead-Strecke", body: "Kontakt, Anfrage und SEO werden pro Branche sauber gefuehrt." }
    ],
    signature: [
      { title: "Startseite", detail: "Hero, Module, Vertrauen, CTA" },
      { title: "Angebot", detail: "Leistungen und Pakete" },
      { title: "Kontakt", detail: "Formular und direkte Wege" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Auswaehlen", body: "Branche und Stil bestimmen die Grundinszenierung." },
      { title: "Befuellen", body: "Inhalte, Medien und Collections kommen ins CMS." },
      { title: "Veroeffentlichen", body: "Preview pruefen, freigeben und live schalten." }
    ],
    quote: "Das Template ist eine saubere Grundlage, die schnell nach echter Marke aussieht."
  };
}

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
