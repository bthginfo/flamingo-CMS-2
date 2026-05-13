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
  pages: TemplateSubpageData[];
  collections: TemplateCollectionData[];
};

const industryPages: Record<IndustryKey, Array<Omit<TemplateSubpageData, "image"> & { image?: string }>> = {
  restaurant: [
    {
      slug: "speisekarte",
      label: "Speisekarte",
      eyebrow: "Saisonale Kueche",
      headline: "Eine Karte mit Tempo, Herkunft und Handschrift.",
      description: "Antipasti, Pasta, Fisch, Dessert und Wein werden so erzaehlt, dass Gaeste vor der Reservierung schon eine Entscheidung treffen.",
      ctaLabel: "Tisch reservieren",
      sections: [
        section("cards", "Karte", "Gerichte mit Herkunft und klaren Preisen.", "Alle Kategorien bleiben eigenstaendig aufgebaut.", [
          item("Burrata & Pfirsich", "Basilikum, geroestete Mandeln, Olivenoel aus Apulien.", "Antipasti", "14"),
          item("Truffle Tagliolini", "Hausgemachte Pasta, Pecorino, schwarzer Trueffel.", "Signature", "24"),
          item("Amalfi Lemon Tart", "Baiser, Basilikum und Meersalz.", "Dolce", "11")
        ]),
        section("detailGrid", "Wein & Allergene", "Alles, was vor Ort Rueckfragen spart.", "Weinempfehlung, Allergene, vegetarische Optionen und Tagesgerichte bleiben sichtbar.", [
          item("Naturwein Begleitung", "Vier glaeserweise Positionen mit kurzer Sensorik.", "Pairing"),
          item("Vegetarische Auswahl", "Eigene Empfehlungen statt versteckter Fussnote.", "Hinweis")
        ])
      ]
    },
    subpage("reservierung", "Reservierung", "Heute Abend", "Tisch, Anlass und Uhrzeit ohne Umwege anfragen.", "Ein fokussierter Buchungsweg fuer Dinner, Terrasse, Private Dining und Events.", "Tisch sichern", [
      section("lead", "Anfrage", "Der naechste freie Tisch ist nie weit weg.", "Personenzahl, Uhrzeit, Anlass und Kontakt werden in einem ruhigen Flow abgefragt.", [
        item("Terrasse", "Beliebtester Slot zwischen 18:30 und 20:00.", "Heute"),
        item("Private Dining", "Separater Raum fuer bis zu 18 Personen.", "Event")
      ])
    ]),
    subpage("events", "Events", "Private Dining", "Abende, Tastings und Feiern mit kulinarischem Rahmen.", "Die Eventseite verbindet Menuevorschlaege, Raumgefuehl, Kapazitaet und Anfrage.", "Event anfragen", [
      section("cards", "Formate", "Feste Anlaesse bekommen eigene Dramaturgie.", "Jedes Format hat Bild, Kapazitaet, Menueoption und Kontaktweg.", [
        item("Wine Dinner", "Fuenf Gaenge, Winzerabend und limitierte Plaetze.", "24 Plaetze"),
        item("Familienfeier", "Saisonales Sharing-Menue in privater Atmosphaere.", "bis 36")
      ])
    ])
  ],
  hotel: [
    subpage("zimmer", "Zimmer", "Zimmer & Suiten", "Vom Garden Room bis zur Panorama Suite.", "Zimmer werden vergleichbar, ohne ihren Charakter zu verlieren: Bilder, Ausstattung, Preislogik und Buchungsimpuls arbeiten zusammen.", "Zimmer anfragen", [
      section("cards", "Auswahl", "Jeder Aufenthalt beginnt mit dem richtigen Raum.", "Zimmer, Detailseiten und Home-Teaser arbeiten aus einer gemeinsamen Inhaltslogik.", [
        item("Panorama Suite", "Balkon, Spa-Zugang, Bergblick und Late Checkout.", "ab 219"),
        item("Garden Room", "Terrasse, Naturmaterialien und ruhige Lage.", "ab 149"),
        item("Family Studio", "Mehr Raum, flexible Betten und kurze Wege.", "ab 189")
      ]),
      section("detailGrid", "Ausstattung", "Wichtige Kriterien sind sofort scanbar.", "Flaeche, Bett, Aussicht, Spa, Hunde, Kinder und Verpflegung sind strukturierte Felder.", [
        item("Direktbucher Vorteil", "Dinner-Upgrade je nach Saison.", "Benefit"),
        item("Galerie je Zimmer", "Mehrere Bilder mit Alt-Text und Fokuspunkt.", "Media")
      ])
    ]),
    subpage("angebote", "Angebote", "Saisonpakete", "Kurzurlaub, Wellness und Aktivtage als klare Pakete.", "Angebote haben eigene Landingpages mit Zeitraum, Leistungen, Preislogik, Bedingungen und Anfrage.", "Angebot sichern", [
      section("cards", "Pakete", "Saisonale Anlaesse werden buchbar.", "Jedes Paket zieht Zimmer, Leistungen und Bildwelt zusammen.", [
        item("Wellness Weekend", "Zwei Naechte, Massage, Dinner und Spa.", "2 Naechte"),
        item("Midweek Escape", "Ruhige Tage mit Fruehstueck und Late Checkout.", "So-Do")
      ])
    ]),
    subpage("wellness", "Wellness", "Spa & Ruhe", "Ein Spa-Bereich, der nach Auszeit aussieht.", "Behandlungen, Oeffnungszeiten, Ruhezonen und Buchung werden atmosphaerisch gefuehrt.", "Spa-Termin fragen", [
      section("gallery", "Momente", "Warme Bilder, wenig Text, klare Optionen.", "Sauna, Pool, Treatments und Ruhebereiche bilden eine eigene Erlebnisstrecke.", [
        item("Signature Massage", "60 Minuten mit regionalen Oelen.", "Treatment"),
        item("Adults-only Slot", "Taeglich ab 18 Uhr.", "Ruhezeit")
      ])
    ])
  ],
  tourism: [
    subpage("touren", "Touren", "Gefuehrte Touren", "Level, Dauer, Guide und Treffpunkt auf einen Blick.", "Touren werden wie Produkte gezeigt: inspirierend, aber mit allen Entscheidungsdaten.", "Tour buchen", [
      section("cards", "Tour-Auswahl", "Aus Abenteuer wird eine konkrete Buchung.", "Tour-Items haben Schwierigkeitsgrad, Dauer, Preis, Treffpunkt, Saison und Detailseite.", [
        item("Sunrise Ridge", "Vier Stunden, mittleres Level, Gipfelfruehstueck.", "ab 79"),
        item("Family Valley", "Leicht, Picknick und Badestopp.", "ab 49"),
        item("Private Guide Day", "Individuelle Route mit Transfer.", "ab 290")
      ])
    ]),
    subpage("regionen", "Regionen", "Region Guides", "Orte, Routen und Saison als Entscheidungshilfe.", "Regionenseiten buendeln Touren, Wetterhinweise, Anreise und passende Angebote.", "Region entdecken", [
      section("detailGrid", "Orte", "Jede Region hat eigene Nutzungsfragen.", "Maps, Highlights, beste Reisezeit und Sicherheitsinfos sind eigene Felder.", [
        item("Nordkamm", "Aussicht, Sonnenaufgang und alpine Wege.", "mittel"),
        item("Seeufer", "Familienfreundlich, Badestellen und kurze Wege.", "leicht")
      ])
    ]),
    subpage("guides", "Guides", "Local Guides", "Menschen, denen man draussen vertrauen will.", "Guide-Profile zeigen Sprachen, Qualifikationen, Lieblingsrouten und Bewertungen.", "Guide anfragen", [
      section("cards", "Team", "Kompetenz wird persoenlich.", "Profile werden in Tourdetailseiten referenziert.", [
        item("Mara Leitner", "Alpinwanderfuehrerin, Deutsch und Englisch.", "Hike"),
        item("Noah Brand", "Bike-Guide mit Fokus Familienrouten.", "Bike")
      ])
    ])
  ],
  salon: [
    subpage("leistungen", "Leistungen", "Treatments", "Preise, Dauer und Ergebnis klar gefuehrt.", "Leistungen funktionieren als Treatment-Menue mit Detailseiten, Artist-Bezug und Buchungsziel.", "Termin buchen", [
      section("cards", "Auswahl", "Beauty-Angebote brauchen Erwartungssicherheit.", "Jede Leistung hat Dauer, Preis, Pflegehinweis, Bild und optionale Vorher/Nachher-Galerie.", [
        item("Balayage Refresh", "Beratung, Glossing, Finish und Styling.", "120 min", "ab 145"),
        item("Signature Cut", "Waschen, Schnitt und typgerechtes Styling.", "60 min", "ab 69"),
        item("Glow Facial", "Reinigung, Treatment und Massage.", "75 min", "ab 89")
      ])
    ]),
    subpage("team", "Team", "Artists", "Style ist eine Frage der richtigen Person.", "Teamprofile zeigen Schwerpunkte, Arbeiten, Verfuegbarkeit und direkte Terminwege.", "Artist waehlen", [
      section("cards", "Profile", "Vertrauen entsteht vor dem ersten Termin.", "Jedes Profil kann eigene Galerien und Leistungen referenzieren.", [
        item("Elena", "Color Expert mit weichen Blond- und Braunverlaeufen.", "Color"),
        item("Mila", "Cuts, Styling und Braut-Looks.", "Styling")
      ])
    ]),
    subpage("preise", "Preise", "Price Guide", "Transparente Orientierung ohne sterile Tabelle.", "Preisgruppen, Dauer, Add-ons und Hinweise werden mobil sauber scanbar.", "Beratung anfragen", [
      section("detailGrid", "Guide", "Kundinnen sehen schnell, was zu ihnen passt.", "Preisfelder bleiben strukturiert und koennen je Standort variiert werden.", [
        item("Cut & Finish", "Kurzes Beratungsgespraech inklusive.", "ab 69"),
        item("Color Package", "Preis nach Laenge und Technik.", "ab 145")
      ])
    ])
  ],
  trades: [
    subpage("leistungen", "Leistungen", "Service Finder", "Schnell zur passenden Handwerksleistung.", "Leistungsseiten beantworten Problem, Ablauf, Dauer, Kostenlogik und Anfrage.", "Projekt anfragen", [
      section("cards", "Leistungen", "Lokale Suchintention wird ernst genommen.", "Jede Leistung kann Unterseite, FAQ, Galerie und Formularfelder haben.", [
        item("Bad Sanierung", "Planung, Koordination und Umsetzung aus einer Hand.", "14-21 Tage"),
        item("Wartung", "Regelmaessige Checks mit klaren Paketen.", "Fixpreis"),
        item("Energie Upgrade", "Analyse, Foerdercheck und Angebot.", "Foerderung")
      ])
    ]),
    subpage("referenzen", "Referenzen", "Projektbeweise", "Vorher, nachher, Ergebnis und Region.", "Referenzen sind Cases mit Problem, Loesung, Zeitraum, Medien und Ergebnis.", "Referenzen ansehen", [
      section("gallery", "Cases", "Bilder beweisen, Texte ordnen ein.", "Vorher/Nachher-Galerien haben Alt-Texte, Captions und Fokuspunkt.", [
        item("Altbau Bad", "Aus dunklem Raum wurde eine helle Wellnesszone.", "Innsbruck"),
        item("Dachausbau", "Neue Daemmung, neue Flaechen, messbar bessere Werte.", "Tirol")
      ])
    ]),
    subpage("notdienst", "Notdienst", "Schnelle Hilfe", "Dringende Faelle brauchen andere UI als normale Projekte.", "Telefon, Region, Zeiten und Erstinfos stehen im Vordergrund.", "Jetzt anrufen", [
      section("lead", "Dringlichkeit", "Weniger Reibung, mehr relevante Angaben.", "Der Flow fragt Ort, Problem, Foto und Erreichbarkeit ab.", [
        item("Wasserschaden", "Sofortkontakt und Foto-Upload.", "akut"),
        item("Heizungsausfall", "Region und Stoerungsbild erfassen.", "Winter")
      ])
    ])
  ],
  medical: [
    subpage("leistungen", "Leistungen", "Behandlungen", "Medizinische Orientierung in ruhiger Sprache.", "Leistungsdetailseiten zeigen Beschwerden, Ablauf, Vorbereitung, Kostenhinweise und Terminweg.", "Termin vereinbaren", [
      section("cards", "Fachbereiche", "Patientinnen finden schneller die richtige Leistung.", "Jede Leistung hat Risikoarme Copy, FAQ und Kontaktziel.", [
        item("Diagnostik", "Erstgespraech, Untersuchung und Befund.", "Ablauf"),
        item("Therapieplan", "Individuelle Behandlung mit Folgeterminen.", "Plan"),
        item("Vorsorge", "Regelmaessige Checks und klare Erinnerung.", "Praevention")
      ])
    ]),
    subpage("team", "Team", "Behandlerinnen", "Kompetenz, Spezialisierung und Menschlichkeit.", "Profile zeigen Qualifikation, Schwerpunkte, Sprachen und Sprechzeiten.", "Team ansehen", [
      section("cards", "Profile", "Menschen vor Methoden.", "Teamkarten sind mit Leistungen und Standorten verknuepft.", [
        item("Dr. Lena Roth", "Innere Medizin, Praevention und Diagnostik.", "DE/EN"),
        item("Anna Keller", "Therapiekoordination und Erstkontakt.", "Kontakt")
      ])
    ]),
    subpage("faq", "FAQ", "Vor dem Termin", "Antworten, die Unsicherheit senken.", "FAQ, Dokumente, Notfallhinweise und Barrierefreiheit sind eigene Inhaltsbereiche.", "Frage klaeren", [
      section("detailGrid", "Hinweise", "Sensible Informationen muessen klar sein.", "Notfalltexte, Dokumentenlisten und Kontaktwege sind sauber getrennt.", [
        item("Unterlagen", "Befunde, Medikamentenliste und Versicherungskarte.", "Mitbringen"),
        item("Notfall", "Klare Weiterleitung ausserhalb der Sprechzeiten.", "Wichtig")
      ])
    ])
  ],
  consulting: [
    subpage("leistungen", "Leistungen", "Expertise", "B2B-Angebote mit Ergebnissen statt Buzzwords.", "Leistungsseiten strukturieren Problem, Methode, Ergebnis, Format und Fit.", "Erstgespraech buchen", [
      section("cards", "Expertise", "Entscheider brauchen schnelle Relevanz.", "Jede Leistung hat Outcome, Dauer, Zielgruppe, Case-Referenzen und CTA.", [
        item("Go-to-Market Sprint", "Positionierung, Angebot und Launchplan.", "2 Wochen"),
        item("Operations Audit", "Prozessanalyse, Risiken und Roadmap.", "Audit"),
        item("Leadership Workshop", "Entscheidungslogik und Teamfokus.", "Workshop")
      ])
    ]),
    subpage("cases", "Cases", "Case Studies", "Ausgangslage, Arbeit und Ergebnis nachvollziehbar.", "Cases sind Detailseiten mit Kennzahlen, Kontext, Vorgehen und Testimonial.", "Cases lesen", [
      section("detailGrid", "Proof", "Substanz ersetzt Behauptungen.", "Case-Felder speisen Home-Teaser und Branchen-Unterseiten.", [
        item("SaaS Launch", "Neue Positionierung und Sales Narrative.", "+38% Pipeline"),
        item("Operations Reset", "Klare Rollen und kuerzere Entscheidungswege.", "-22% Durchlaufzeit")
      ])
    ]),
    subpage("insights", "Insights", "Analysen", "Thought Leadership, die nach Praxis klingt.", "News, Essays und Reports koennen als Blog/Insight-Posts ausgespielt werden.", "Insight lesen", [
      section("cards", "Artikel", "Kompetenz regelmaessig beweisen.", "Posts haben Kategorie, Autor, Datum, SEO und Featured Image.", [
        item("Pricing ohne Bauchgefuehl", "Warum Angebotsarchitektur mehr verkauft als Rabatte.", "Essay"),
        item("Wenn Prozesse wachsen", "Woran Teams merken, dass Struktur fehlt.", "Analyse")
      ])
    ])
  ],
  fitness: [
    subpage("kurse", "Kurse", "Schedule", "Training muss nach Woche, Level und Ziel scanbar sein.", "Kurse haben Zeiten, Coaches, Level, freie Plaetze und Detailseiten.", "Probetraining buchen", [
      section("timeline", "Wochenplan", "Der Kalender ist die wichtigste Conversion-Flaeche.", "Kursdaten koennen automatisch in Home-Teaser und Coach-Profile laufen.", [
        item("Strength Lab", "Mo und Do, 18:00, Small Group.", "Level 2"),
        item("Mobility Flow", "Di, 19:00, Recovery und Breath.", "All Levels"),
        item("HIIT Club", "Sa, 10:00, Energie und Community.", "Bold")
      ])
    ]),
    subpage("trainer", "Trainer", "Coaches", "Motivation braucht Gesichter und Methode.", "Trainerprofile referenzieren Kurse, Programme, Zertifikate und Buchungswege.", "Coach waehlen", [
      section("cards", "Team", "Jeder Coach steht fuer ein klares Trainingsversprechen.", "Profile koennen eigene Bilder, Spezialitaeten und Social Links tragen.", [
        item("Nina", "Strength, Technik und Progression.", "Coach"),
        item("Leo", "Mobility, Breathwork und Recovery.", "Recovery")
      ])
    ]),
    subpage("preise", "Preise", "Memberships", "Klare Mitgliedschaften ohne Kleingedruckt-Optik.", "Preise, Benefits, Laufzeiten und Trial-Optionen sind strukturierte Cards.", "Mitglied werden", [
      section("detailGrid", "Pakete", "Einfach vergleichen, schnell starten.", "Planfelder bleiben getrennt von Designvarianten.", [
        item("Flex", "8 Kurse pro Monat, monatlich kuendbar.", "79"),
        item("Unlimited", "Alle Kurse, Priority Booking und Events.", "119")
      ])
    ])
  ],
  "real-estate": [
    subpage("objekte", "Objekte", "Immobilien", "Objekte mit Expose-Logik statt Kartenfriedhof.", "Objekte haben Status, Galerie, Lage, Fakten, Energie, Kontakt und Detailseite.", "Expose anfragen", [
      section("cards", "Listings", "Kaeufer scannen Fakten, Eigentuemer sehen Kompetenz.", "Objektfelder koennen Filter, Teaser und Detailseiten speisen.", [
        item("Penthouse West", "124 qm, Dachterrasse, Lift und Stadtblick.", "Innenstadt"),
        item("Townhouse Nord", "148 qm, Garten und familienfreundliche Lage.", "Nordviertel"),
        item("Altbau Studio", "68 qm, Stuck, Balkon und Kulturviertel.", "Neu")
      ])
    ]),
    subpage("bewertung", "Bewertung", "Eigentuemer-Funnel", "Eine Verkaufsbewertung, die Vertrauen aufbaut.", "Der Funnel fuehrt ueber Objektart, Lage, Zustand und Kontakt zur qualifizierten Anfrage.", "Wert einschaetzen", [
      section("lead", "Bewertung", "Eigentuemer brauchen Praezision und Diskretion.", "Felder und Schritte folgen einem ruhigen, qualifizierenden Ablauf.", [
        item("48h Ersteinschaetzung", "Marktdaten, Lage und Vergleichswerte.", "schnell"),
        item("Verkaufsstrategie", "Preis, Timing und Zielgruppe.", "persoenlich")
      ])
    ]),
    subpage("referenzen", "Referenzen", "Verkaufte Objekte", "Beweise fuer lokale Marktkenntnis.", "Referenzen zeigen Region, Objektart, Vermarktungsdauer und Ergebnis.", "Erfolge ansehen", [
      section("gallery", "Proof", "Luxus braucht Daten und Bildgefuehl.", "Bilder, Fakten und Zitate bilden eine glaubwuerdige Referenzstrecke.", [
        item("Villa am Park", "Diskrete Vermarktung mit qualifizierter Shortlist.", "verkauft"),
        item("Loft am Hafen", "Starke Nachfrage nach gezielter Kampagne.", "21 Tage")
      ])
    ])
  ],
  wedding: [
    subpage("geschichte", "Unsere Geschichte", "Mara & Leo", "Vom ersten Kaffee bis zum Ja-Wort.", "Eine persoenliche Storyline mit Bildern, Zitaten und Meilensteinen.", "Weiter zum Ablauf", [
      section("timeline", "Timeline", "Persoenlich, warm und nicht kitschig.", "Jeder Moment hat Datum, Text, Bild und optionale Musiknotiz.", [
        item("2018", "Erstes Treffen nach einem Konzert in Salzburg.", "Kennenlernen"),
        item("2022", "Der Antrag am See, morgens um sieben.", "Verlobung"),
        item("2026", "Freie Trauung in der Villa Rosengold.", "Hochzeit")
      ])
    ]),
    subpage("ablauf", "Ablauf", "Der Tag", "Alle wissen, wann sie wo sein sollen.", "Ablauf, Ansprechpartner, Dresscode und Hinweise werden klar und emotional gefuehrt.", "RSVP senden", [
      section("timeline", "Programm", "Ein Tagesplan, der Gaeste wirklich fuehrt.", "Programmpunkte koennen Zeit, Ort, Hinweis und Ansprechpartner haben.", [
        item("15:30", "Ankommen im Garten der Villa Rosengold.", "Welcome"),
        item("16:00", "Freie Trauung unter den alten Linden.", "Trauung"),
        item("19:00", "Dinner, Reden und Dessertbar.", "Dinner")
      ])
    ]),
    subpage("rsvp", "RSVP", "Zusage", "Begleitung, Essen und Songwunsch an einem Ort.", "Das Formular sammelt genau die Angaben, die fuer den Tag gebraucht werden.", "Jetzt zusagen", [
      section("lead", "Antwort", "Ein persoenlicher Flow statt Formularwand.", "Name, Begleitung, Allergien, Unterkunft und Songwunsch sind einzelne Felder.", [
        item("Bis 12. Juli", "Bitte mit Begleitung und Essenshinweisen antworten.", "Deadline"),
        item("Songwunsch", "Ein Lied, das euch auf die Tanzflaeche bringt.", "Party")
      ])
    ])
  ]
};

const industryCollections: Record<IndustryKey, TemplateCollectionData[]> = {
  restaurant: [
    collection("menuItems", "Gerichte", true, "both", ["title:text", "description:richText", "price:text", "badges:multiSelect", "image:image"]),
    collection("events", "Events", true, "listing", ["title:text", "date:text", "capacity:number", "cta:link"])
  ],
  hotel: [
    collection("rooms", "Zimmer", true, "both", ["title:text", "gallery:gallery", "price:text", "features:repeater", "bookingCta:link"]),
    collection("offers", "Angebote", true, "both", ["title:text", "validity:text", "included:repeater", "seo:object"])
  ],
  tourism: [
    collection("tours", "Touren", true, "both", ["title:text", "level:select", "duration:text", "meetingPoint:text", "guide:collectionReference"]),
    collection("guides", "Guides", true, "listing", ["name:text", "languages:multiSelect", "portrait:image", "bio:richText"])
  ],
  salon: [
    collection("treatments", "Treatments", true, "both", ["title:text", "duration:text", "price:text", "artist:collectionReference", "gallery:gallery"]),
    collection("artists", "Artists", true, "listing", ["name:text", "role:text", "specialties:repeater", "bookingLink:link"])
  ],
  trades: [
    collection("services", "Leistungen", true, "both", ["title:text", "problem:richText", "process:repeater", "leadForm:object"]),
    collection("projects", "Referenzen", true, "both", ["title:text", "beforeAfter:gallery", "region:text", "result:richText"])
  ],
  medical: [
    collection("treatments", "Behandlungen", true, "both", ["title:text", "symptoms:repeater", "preparation:richText", "appointmentCta:link"]),
    collection("team", "Team", true, "listing", ["name:text", "role:text", "languages:multiSelect", "schedule:object"])
  ],
  consulting: [
    collection("services", "Leistungen", true, "both", ["title:text", "outcome:richText", "format:select", "cases:collectionReference"]),
    collection("cases", "Cases", true, "both", ["title:text", "challenge:richText", "resultStats:repeater", "testimonial:object"])
  ],
  fitness: [
    collection("classes", "Kurse", true, "both", ["title:text", "weekday:select", "time:text", "level:select", "coach:collectionReference"]),
    collection("memberships", "Mitgliedschaften", false, "listing", ["title:text", "price:text", "benefits:repeater", "cta:link"])
  ],
  "real-estate": [
    collection("properties", "Objekte", true, "both", ["title:text", "location:text", "price:text", "facts:repeater", "gallery:gallery"]),
    collection("soldReferences", "Referenzen", true, "listing", ["title:text", "region:text", "saleTime:text", "result:richText"])
  ],
  wedding: [
    collection("schedule", "Programmpunkte", false, "both", ["time:text", "title:text", "location:text", "note:richText"]),
    collection("story", "Story", false, "both", ["date:text", "title:text", "body:richText", "image:image"])
  ]
};

function subpage(
  slug: string,
  label: string,
  eyebrow: string,
  headline: string,
  description: string,
  ctaLabel: string,
  sections: TemplateSubpageSection[]
) {
  return { slug, label, eyebrow, headline, description, ctaLabel, sections };
}

function section(
  type: TemplateSubpageSection["type"],
  eyebrow: string,
  headline: string,
  body: string,
  items: TemplateSubpageSection["items"]
): TemplateSubpageSection {
  return { type, eyebrow, headline, body, items };
}

function item(title: string, body: string, meta?: string, price?: string) {
  return { title, body, meta, price };
}

function collection(
  name: string,
  label: string,
  detailPage: boolean,
  teaserSource: TemplateCollectionData["teaserSource"],
  fieldDefs: string[]
): TemplateCollectionData {
  return {
    name,
    label,
    detailPage,
    teaserSource,
    fields: fieldDefs.map((field) => {
      const [namePart, type] = field.split(":");
      return { name: namePart, type, label: namePart };
    })
  };
}

export type TemplateSubpageData = {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  ctaLabel: string;
  sections: TemplateSubpageSection[];
};

export type TemplateSubpageSection = {
  type: "editorial" | "cards" | "timeline" | "detailGrid" | "gallery" | "lead";
  eyebrow: string;
  headline: string;
  body: string;
  items: Array<{ title: string; body: string; meta?: string; price?: string }>;
  image?: string;
  ctaLabel?: string;
};

export type TemplateCollectionData = {
  name: string;
  label: string;
  detailPage: boolean;
  teaserSource: "home" | "listing" | "both";
  fields: Array<{ name: string; type: string; label: string }>;
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

const base: Record<IndustryKey, Omit<TemplatePreviewData, "style" | "pages" | "collections">> = {
  restaurant: {
    industry: "restaurant",
    label: "Restaurant",
    brand: "Casa Flamingo",
    eyebrow: "Restaurant",
    headline: "Ein digitaler Gastraum, der Appetit macht.",
    description:
      "Speisekarte, Reservierung, saisonale Menues, Events und Galerie wirken wie ein echter digitaler Gastraum.",
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
        title: "Saisonale Speisekarte",
        body: "Kategorien, Preise, Allergene und saisonale Highlights sind klar strukturiert."
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
      "Die Seite fuehlt sich an wie ein eigenes Restaurant-Magazin."
  },
  hotel: {
    industry: "hotel",
    label: "Hotel",
    brand: "Alpine Nest",
    eyebrow: "Hotel",
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
        title: "Zimmer-Auswahl",
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
      { title: "Zimmer vergleichen", body: "Zimmer und Angebote bleiben schnell vergleichbar." },
      { title: "Direkt anfragen", body: "CTA fuehrt ohne Umwege zu Anfrage, Telefon oder Booking Engine." }
    ],
    quote:
      "Die Seite verkauft nicht nur Zimmer, sondern das Gefuehl des Aufenthalts."
  },
  trades: {
    industry: "trades",
    label: "Handwerk",
    brand: "Werk & Wert",
    eyebrow: "Handwerk",
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
        body: "Vorher/Nachher, Region, Zeitraum und Ergebnis als belastbarer Projektbeweis."
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
    eyebrow: "Tourismus",
    headline: "Touren, Regionen und Erlebnisse als buchbare Story.",
    description:
      "Tourenkatalog, Guide-Profile, Schwierigkeitsgrade, Termine und Anfragewege machen Erlebnisse konkret buchbar.",
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
    eyebrow: "Salon",
    headline: "Looks, Treatments und Termine in einer eleganten Strecke.",
    description:
      "Beauty-Leistungen, Preislisten, Team, Lookbook und Booking-CTA werden visuell stark und vertrauensvoll aufgebaut.",
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
      { title: "Treatment-Menue", body: "Leistungen, Dauer, Preise und Pflegehinweise sind schnell erfassbar." },
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
    quote: "Die Seite fuehlt sich an wie ein hochwertiges Lookbook mit klarer Terminlogik."
  },
  consulting: {
    industry: "consulting",
    label: "Beratung",
    brand: "Northline Advisory",
    eyebrow: "Consulting",
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
      { title: "Case Studies", body: "Ausgangslage, Vorgehen und Ergebnis mit echter Entscheidungssubstanz." },
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
    eyebrow: "Praxis",
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
    eyebrow: "Fitness",
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
    eyebrow: "Immobilien",
    headline: "Objekte, Bewertung und Vertrauen fuer lokale Makler.",
    description:
      "Objektlisten, Exposes, Bewertung, Regionen, Suchprofile und Kontaktstrecken arbeiten als klares Maklerprodukt.",
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
      { title: "Objekt-Auswahl", body: "Preis, Lage, Flaeche, Galerie und Status sind sofort vergleichbar." },
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
  },
  wedding: {
    industry: "wedding",
    label: "Hochzeit",
    brand: "Mara & Leo",
    eyebrow: "Hochzeit",
    headline: "Eine persoenliche Hochzeitsseite, die Gaeste wirklich begleitet.",
    description:
      "Story, Ablauf, Location, RSVP, Unterkunft, Dresscode, Galerie und Hinweise fuehren Gaeste warm durch den Tag.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    accent: "#fb7185",
    dark: "#27151b",
    surface: "#fff1f2",
    nav: ["Story", "Ablauf", "RSVP", "Anreise"],
    metrics: [
      { value: "128", label: "Gaeste" },
      { value: "42", label: "Tage" },
      { value: "1", label: "Ja-Wort" }
    ],
    modules: [
      {
        title: "Unsere Geschichte",
        body: "Kennenlernen, Antrag und gemeinsame Stationen als ruhige, persoenliche Storyline."
      },
      {
        title: "Tagesablauf",
        body: "Trauung, Empfang, Dinner, Party und Ansprechpartner sind fuer Gaeste schnell auffindbar."
      },
      {
        title: "RSVP & Hinweise",
        body: "Zusage, Begleitung, Allergien, Songwuensche und Unterkunft laufen ueber saubere Formulare."
      }
    ],
    signature: [
      { title: "Freie Trauung", detail: "16:00 Uhr im Garten der Villa Rosengold", price: "Ablauf" },
      { title: "Dinner & Reden", detail: "Saisonales Menue, Familienreden, Dessertbar", price: "Abend" },
      { title: "RSVP", detail: "Bitte bis 12. Juli mit Begleitung und Allergien antworten", price: "Antwort" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
    ],
    process: [
      { title: "Einstimmen", body: "Hero, Countdown und Story schaffen Naehe statt Business-Optik." },
      { title: "Orientieren", body: "Ablauf, Location, Dresscode und Unterkunft beantworten Gaestefragen." },
      { title: "Zusagen", body: "RSVP sammelt Begleitung, Essen, Allergien und Songwuensche." }
    ],
    quote: "Eine Hochzeitsseite, die sich wie Mara und Leo anfuehlt und nicht wie ein Formular."
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
    headline: styleKey === "classic" ? base[key].headline : tone.headline,
    pages: industryPages[key].map((page, index) => ({
      ...page,
      image: page.image ?? base[key].gallery[index % base[key].gallery.length] ?? base[key].image
    })),
    collections: industryCollections[key]
  };
}

export function getTemplateParams() {
  return industries.flatMap((industry) => styles.map((style) => ({ industry, style })));
}
