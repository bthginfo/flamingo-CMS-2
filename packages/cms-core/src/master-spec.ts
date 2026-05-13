import { industries, styles, type IndustryKey, type StyleKey } from "@flamingo/shared";
import type { Page, SectionCategory } from "./index";

export type CmsFieldType =
  | "text"
  | "textarea"
  | "richText"
  | "number"
  | "boolean"
  | "select"
  | "multiSelect"
  | "image"
  | "video"
  | "gallery"
  | "repeater"
  | "object"
  | "link"
  | "colorToken"
  | "themeReference"
  | "pageReference"
  | "sectionReference"
  | "collectionReference";

export type CmsFieldSpec = {
  name: string;
  label: string;
  type: CmsFieldType;
  required?: boolean;
  options?: string[];
  fields?: CmsFieldSpec[];
};

export type CmsButtonTargetType =
  | "external"
  | "internalPage"
  | "pageSection"
  | "email"
  | "phone";

export type CmsButtonObject = {
  label: string;
  type: CmsButtonTargetType;
  externalUrl?: string;
  pageReference?: string;
  sectionReference?: string;
  openInNewTab?: boolean;
  ariaLabel?: string;
  styleVariant: "primary" | "secondary" | "ghost" | "text";
  icon?: string;
};

export type CmsMediaObject = {
  sourceType: "upload" | "url" | "embed";
  imageFile?: string;
  videoFile?: string;
  url?: string;
  embedCode?: string;
  alt: string;
  caption?: string;
  focalPoint?: { x: number; y: number };
  posterImage?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
};

export type ThemeTokenArchitecture = {
  primitives: string[];
  semantic: string[];
  components: string[];
  cmsControls: string[];
};

export type SectionSpec = {
  type: string;
  label: string;
  purpose: string;
  recommendedUse: string;
  category: SectionCategory;
  industries: IndustryKey[] | "all";
  pageTypes: Page["type"][];
  fields: CmsFieldSpec[];
  optionalFields: CmsFieldSpec[];
  designSettings: CmsFieldSpec[];
  variants: string[];
  dataSources: Array<"manual" | "collectionReference" | "autoFeed">;
  sortable: boolean;
  fixedWhen?: string;
};

export type CollectionBlueprint = {
  key: string;
  label: string;
  itemLabel: string;
  hasOptionalSubpages: boolean;
  teaserOnHome: boolean;
  fields: CmsFieldSpec[];
};

export type PageBlueprint = {
  type: Page["type"] | "collection_detail";
  title: string;
  path: string;
  fixedSections: string[];
  sortableSections: string[];
  allowedSections: string[];
  collectionSource?: string;
};

export type StyleExperienceSpec = {
  character: string;
  visualDirection: string;
  layoutPrinciples: string[];
  motion: string[];
  themeMood: string;
  demoCopy: {
    heroHeadline: string;
    subline: string;
    primaryCta: string;
  };
};

export type IndustryMasterSpec = {
  key: IndustryKey;
  label: string;
  brandCharacter: string;
  informationArchitecture: string;
  collections: CollectionBlueprint[];
  pages: PageBlueprint[];
  homeCollectionTeasers: string[];
  styleExperiences: Record<StyleKey, StyleExperienceSpec>;
};

const buttonField: CmsFieldSpec = {
  name: "button",
  label: "Button",
  type: "link",
  fields: [
    { name: "label", label: "Label", type: "text", required: true },
    { name: "type", label: "Target type", type: "select", required: true, options: ["external", "internalPage", "pageSection", "email", "phone"] },
    { name: "externalUrl", label: "External URL", type: "text" },
    { name: "pageReference", label: "Internal page", type: "pageReference" },
    { name: "sectionReference", label: "Section", type: "sectionReference" },
    { name: "openInNewTab", label: "Open in new tab", type: "boolean" },
    { name: "ariaLabel", label: "Accessible label", type: "text" },
    { name: "styleVariant", label: "Style", type: "select", options: ["primary", "secondary", "ghost", "text"] },
    { name: "icon", label: "Icon", type: "text" }
  ]
};

const mediaField: CmsFieldSpec = {
  name: "media",
  label: "Media",
  type: "object",
  fields: [
    { name: "sourceType", label: "Source", type: "select", required: true, options: ["upload", "url", "embed"] },
    { name: "imageFile", label: "Image upload", type: "image" },
    { name: "videoFile", label: "Video upload", type: "video" },
    { name: "url", label: "URL", type: "text" },
    { name: "embedCode", label: "Embed code", type: "textarea" },
    { name: "alt", label: "Alt text", type: "text", required: true },
    { name: "caption", label: "Caption", type: "textarea" },
    { name: "focalPoint", label: "Focal point", type: "object" },
    { name: "posterImage", label: "Poster image", type: "image" },
    { name: "autoplay", label: "Autoplay", type: "boolean" },
    { name: "muted", label: "Muted", type: "boolean" },
    { name: "controls", label: "Controls", type: "boolean" }
  ]
};

export const themeTokenArchitecture: ThemeTokenArchitecture = {
  primitives: [
    "color.rose.50",
    "color.rose.600",
    "color.ink.950",
    "color.sage.600",
    "color.gold.500",
    "space.4",
    "space.8",
    "radius.sm",
    "radius.md",
    "font.display",
    "font.body"
  ],
  semantic: [
    "surface.page",
    "surface.raised",
    "surface.inverse",
    "text.primary",
    "text.muted",
    "brand.primary",
    "brand.secondary",
    "border.subtle",
    "focus.ring",
    "cta.background",
    "cta.text"
  ],
  components: [
    "button.primary.bg",
    "button.primary.text",
    "card.bg",
    "card.border",
    "nav.bg",
    "hero.overlay",
    "form.input.bg",
    "badge.bg"
  ],
  cmsControls: [
    "createTheme",
    "duplicateTheme",
    "assignThemeToTenant",
    "previewTheme",
    "customizeSemanticTokens",
    "lockContrastUnsafePairs"
  ]
};

export const masterSectionSpecs: SectionSpec[] = [
  {
    type: "signature_hero",
    label: "Signature Hero",
    purpose: "Ownable first viewport with brand promise, media, trust proof and primary conversion.",
    recommendedUse: "Fixed or first section on home and landing pages.",
    category: "hero",
    industries: "all",
    pageTypes: ["home", "landing", "standard", "collection_detail_template"],
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text", required: true },
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "subline", label: "Subline", type: "textarea", required: true },
      mediaField,
      { ...buttonField, name: "primaryCta", label: "Primary CTA" }
    ],
    optionalFields: [
      { ...buttonField, name: "secondaryCta", label: "Secondary CTA" },
      { name: "stats", label: "Stats", type: "repeater", fields: [{ name: "value", label: "Value", type: "text" }, { name: "label", label: "Label", type: "text" }] },
      { name: "badges", label: "Trust badges", type: "repeater" }
    ],
    designSettings: [
      { name: "layout", label: "Layout", type: "select", options: ["editorialSplit", "immersiveMedia", "bentoOverlay", "minimalStatement"] },
      { name: "contrast", label: "Contrast", type: "select", options: ["soft", "standard", "high"] },
      { name: "mediaRatio", label: "Media ratio", type: "select", options: ["portrait", "landscape", "fullBleed"] }
    ],
    variants: ["classicEditorial", "modernPrecision", "boldStatement"],
    dataSources: ["manual"],
    sortable: false,
    fixedWhen: "Home page hero is locked as first section but content and design stay editable."
  },
  {
    type: "collection_showcase",
    label: "Collection Showcase",
    purpose: "Pull structured items such as rooms, dishes, tours, cases, courses or properties into a designed grid.",
    recommendedUse: "Home teasers, collection index pages and related content blocks.",
    category: "collection",
    industries: "all",
    pageTypes: ["home", "standard", "collection_index"],
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "collection", label: "Collection", type: "collectionReference", required: true },
      { name: "limit", label: "Limit", type: "number", required: true }
    ],
    optionalFields: [{ name: "filters", label: "Filters", type: "multiSelect" }, { ...buttonField, name: "archiveLink", label: "Archive link" }],
    designSettings: [{ name: "cardVariant", label: "Card variant", type: "select", options: ["editorial", "compact", "imageHeavy", "bento"] }],
    variants: ["grid", "carousel", "bento", "editorialList"],
    dataSources: ["collectionReference", "autoFeed"],
    sortable: true
  },
  {
    type: "lead_form_panel",
    label: "Lead Form Panel",
    purpose: "Capture intent with industry-specific form fields and visible privacy/context copy.",
    recommendedUse: "Contact, booking, RSVP, valuation, trial, consultation or request pages.",
    category: "conversion",
    industries: "all",
    pageTypes: ["home", "standard", "landing"],
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "formReference", label: "Form", type: "collectionReference", required: true }
    ],
    optionalFields: [{ name: "privacyNote", label: "Privacy note", type: "richText" }, { name: "successMessage", label: "Success message", type: "textarea" }],
    designSettings: [{ name: "layout", label: "Layout", type: "select", options: ["sideBySide", "stacked", "stickyPanel"] }],
    variants: ["booking", "lead", "rsvp", "valuation", "trial"],
    dataSources: ["manual"],
    sortable: true
  },
  {
    type: "story_timeline",
    label: "Story Timeline",
    purpose: "Guide visitors through process, trip, day schedule, treatment journey, project story or wedding timeline.",
    recommendedUse: "Trust building and orientation sections.",
    category: "content",
    industries: "all",
    pageTypes: ["home", "standard", "landing"],
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "items", label: "Items", type: "repeater", required: true, fields: [{ name: "title", label: "Title", type: "text" }, { name: "body", label: "Body", type: "textarea" }, { name: "time", label: "Time/meta", type: "text" }] }
    ],
    optionalFields: [mediaField],
    designSettings: [{ name: "rhythm", label: "Rhythm", type: "select", options: ["calm", "scrollytelling", "compact"] }],
    variants: ["vertical", "horizontal", "scrollPinned"],
    dataSources: ["manual", "collectionReference"],
    sortable: true
  },
  {
    type: "faq_accordion",
    label: "FAQ Accordion",
    purpose: "Answer decision blockers with accessible accordion behavior and SEO-ready copy.",
    recommendedUse: "Near conversion, detail pages and contact pages.",
    category: "trust",
    industries: "all",
    pageTypes: ["home", "standard", "landing", "collection_detail_template"],
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "items", label: "FAQs", type: "repeater", required: true, fields: [{ name: "question", label: "Question", type: "text" }, { name: "answer", label: "Answer", type: "richText" }] }
    ],
    optionalFields: [{ name: "schemaEnabled", label: "FAQ schema", type: "boolean" }],
    designSettings: [{ name: "density", label: "Density", type: "select", options: ["comfortable", "compact"] }],
    variants: ["accordion", "twoColumn", "supportHub"],
    dataSources: ["manual", "autoFeed"],
    sortable: true
  }
];

const commonFields: CmsFieldSpec[] = [
  { name: "eyebrow", label: "Eyebrow", type: "text" },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "shortDescription", label: "Short description", type: "textarea" },
  { name: "featuredImage", label: "Featured image", type: "image" },
  { name: "gallery", label: "Gallery", type: "gallery" },
  { name: "richIntro", label: "Rich intro", type: "richText" },
  { name: "ctas", label: "CTAs", type: "repeater", fields: [buttonField] },
  { name: "seo", label: "SEO", type: "object" },
  { name: "metaImage", label: "Meta image", type: "image" }
];

function collection(key: string, label: string, itemLabel: string, fields: CmsFieldSpec[], teaserOnHome = true): CollectionBlueprint {
  return {
    key,
    label,
    itemLabel,
    hasOptionalSubpages: true,
    teaserOnHome,
    fields: [...commonFields, ...fields]
  };
}

function page(title: string, path: string, fixedSections: string[], sortableSections: string[], collectionSource?: string): PageBlueprint {
  return {
    type: collectionSource ? "collection_index" : path === "/" ? "home" : "standard",
    title,
    path,
    fixedSections,
    sortableSections,
    allowedSections: Array.from(new Set([...fixedSections, ...sortableSections, "faq_accordion", "lead_form_panel"])),
    collectionSource
  };
}

function stylesFor(classic: string, modern: string, bold: string): Record<StyleKey, StyleExperienceSpec> {
  return {
    classic: {
      character: "timeless, warm and trust-led",
      visualDirection: classic,
      layoutPrinciples: ["editorial hierarchy", "balanced whitespace", "measured image rhythm"],
      motion: ["soft reveal", "hover lift", "reduced parallax"],
      themeMood: "light base, restrained contrast, refined accent",
      demoCopy: { heroHeadline: "Willkommen an einem Ort, der sich sofort richtig anfuehlt.", subline: "Ruhige Dramaturgie, klare Informationen und ein hochwertiger erster Eindruck.", primaryCta: "Anfrage starten" }
    },
    modern: {
      character: "precise, reduced and UX-led",
      visualDirection: modern,
      layoutPrinciples: ["asymmetric grid", "modular bento rhythm", "fast scan paths"],
      motion: ["smart focus transitions", "inline feedback", "subtle section reveals"],
      themeMood: "clean surfaces, crisp tokens, high readability",
      demoCopy: { heroHeadline: "Alles Wichtige in Sekunden erfassbar.", subline: "Ein digitales Erlebnis mit klarer Struktur, starker UX und direktem Weg zur Aktion.", primaryCta: "Details ansehen" }
    },
    bold: {
      character: "expressive, high-contrast and conversion-led",
      visualDirection: bold,
      layoutPrinciples: ["large statements", "strong conversion spots", "showcase panels"],
      motion: ["confident reveal", "sticky conversion cues", "scroll-linked emphasis"],
      themeMood: "dark anchors, punchy accent, dramatic media",
      demoCopy: { heroHeadline: "Ein Auftritt, den man nicht verwechselt.", subline: "Markante Typografie, starke Medien und CTAs, die im richtigen Moment sichtbar sind.", primaryCta: "Jetzt handeln" }
    }
  };
}

export const industryMasterSpecs: Record<IndustryKey, IndustryMasterSpec> = {
  restaurant: {
    key: "restaurant",
    label: "Restaurant",
    brandCharacter: "appetizing, atmospheric, reservation-focused",
    informationArchitecture: "Menu and reservation lead; story and gallery support trust.",
    collections: [collection("menuItems", "Menu", "Dish", [{ name: "price", label: "Price", type: "text" }, { name: "allergens", label: "Allergens", type: "multiSelect" }]), collection("events", "Events", "Event", [{ name: "date", label: "Date", type: "text" }], false)],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "story_timeline", "lead_form_panel"]), page("Speisekarte", "/speisekarte", ["collection_showcase"], ["faq_accordion"], "menuItems"), page("Reservierung", "/reservierung", ["lead_form_panel"], ["story_timeline"])],
    homeCollectionTeasers: ["menuItems", "events"],
    styleExperiences: stylesFor("quiet dining editorial with classic menu cards", "clean menu UX with sticky reservation cues", "full-bleed food photography and loud booking panels")
  },
  hotel: {
    key: "hotel",
    label: "Hotel",
    brandCharacter: "guest-oriented, atmospheric, direct-booking focused",
    informationArchitecture: "Rooms, offers and experience proof before booking.",
    collections: [collection("rooms", "Rooms", "Room", [{ name: "amenities", label: "Amenities", type: "multiSelect" }, { name: "fromPrice", label: "From price", type: "text" }]), collection("offers", "Offers", "Offer", [{ name: "season", label: "Season", type: "select" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "story_timeline"]), page("Zimmer", "/zimmer", ["collection_showcase"], ["faq_accordion"], "rooms"), page("Buchung", "/buchung", ["lead_form_panel"], ["collection_showcase"])],
    homeCollectionTeasers: ["rooms", "offers"],
    styleExperiences: stylesFor("elegant hospitality magazine with calm room stories", "spacious booking UX with clear room comparison", "cinematic stay promise with direct booking emphasis")
  },
  tourism: {
    key: "tourism",
    label: "Tourismus",
    brandCharacter: "exploratory, guide-led, bookable",
    informationArchitecture: "Activities, tours, guides and region content form the decision path.",
    collections: [collection("tours", "Tours", "Tour", [{ name: "duration", label: "Duration", type: "text" }, { name: "difficulty", label: "Difficulty", type: "select" }]), collection("guides", "Guides", "Guide", [{ name: "languages", label: "Languages", type: "multiSelect" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "story_timeline"]), page("Touren", "/touren", ["collection_showcase"], ["faq_accordion"], "tours"), page("Buchen", "/buchen", ["lead_form_panel"], ["collection_showcase"])],
    homeCollectionTeasers: ["tours", "guides"],
    styleExperiences: stylesFor("heritage travel editorial with route storytelling", "map-like modular planning interface", "adventure-led hero gestures and high-energy tour cards")
  },
  salon: {
    key: "salon",
    label: "Salon",
    brandCharacter: "stylish, personal, booking-led",
    informationArchitecture: "Treatments, lookbook, artists and booking CTA.",
    collections: [collection("treatments", "Treatments", "Treatment", [{ name: "duration", label: "Duration", type: "text" }, { name: "price", label: "Price", type: "text" }]), collection("stylists", "Stylists", "Stylist", [{ name: "specialties", label: "Specialties", type: "multiSelect" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "story_timeline"]), page("Leistungen", "/leistungen", ["collection_showcase"], ["faq_accordion"], "treatments"), page("Termin", "/termin", ["lead_form_panel"], ["collection_showcase"])],
    homeCollectionTeasers: ["treatments", "stylists"],
    styleExperiences: stylesFor("soft beauty editorial with premium service rhythm", "minimal appointment UX with clean treatment cards", "fashion-like lookbook with confident booking spots")
  },
  trades: {
    key: "trades",
    label: "Handwerk",
    brandCharacter: "reliable, local, lead-qualified",
    informationArchitecture: "Services, references and request forms answer local search intent.",
    collections: [collection("services", "Services", "Service", [{ name: "serviceArea", label: "Service area", type: "text" }]), collection("projects", "References", "Project", [{ name: "beforeAfter", label: "Before/after", type: "gallery" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "lead_form_panel"]), page("Leistungen", "/leistungen", ["collection_showcase"], ["faq_accordion"], "services"), page("Referenzen", "/referenzen", ["collection_showcase"], ["story_timeline"], "projects")],
    homeCollectionTeasers: ["services", "projects"],
    styleExperiences: stylesFor("craft credibility with measured proof blocks", "service finder UX with compact local intent cards", "strong problem-solution conversion with urgent CTA areas")
  },
  medical: {
    key: "medical",
    label: "Praxen",
    brandCharacter: "calm, serious, human and accessible",
    informationArchitecture: "Services, team, opening hours, patient information and appointment paths.",
    collections: [collection("treatments", "Treatments", "Treatment", [{ name: "preparation", label: "Preparation", type: "richText" }]), collection("team", "Team", "Team member", [{ name: "role", label: "Role", type: "text" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "story_timeline"]), page("Leistungen", "/leistungen", ["collection_showcase"], ["faq_accordion"], "treatments"), page("Termin", "/termin", ["lead_form_panel"], ["story_timeline"])],
    homeCollectionTeasers: ["treatments", "team"],
    styleExperiences: stylesFor("warm clinical editorial with readable trust hierarchy", "clear patient task interface with accessible panels", "confident specialist positioning without visual noise")
  },
  consulting: {
    key: "consulting",
    label: "Beratung",
    brandCharacter: "competent, sovereign, case-led",
    informationArchitecture: "Expertise, cases, sectors, people and consultation CTA.",
    collections: [collection("services", "Services", "Service", [{ name: "outcomes", label: "Outcomes", type: "repeater" }]), collection("cases", "Cases", "Case", [{ name: "result", label: "Result", type: "textarea" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "story_timeline"]), page("Cases", "/cases", ["collection_showcase"], ["faq_accordion"], "cases"), page("Termin", "/termin", ["lead_form_panel"], ["collection_showcase"])],
    homeCollectionTeasers: ["services", "cases"],
    styleExperiences: stylesFor("executive editorial with proof-led pacing", "precise B2B grid with outcome cards", "sharp thought-leadership statements and strong case contrast")
  },
  fitness: {
    key: "fitness",
    label: "Fitness",
    brandCharacter: "energetic, community-driven, trial-focused",
    informationArchitecture: "Programs, schedule, coaches, memberships and trial booking.",
    collections: [collection("classes", "Classes", "Class", [{ name: "weekday", label: "Weekday", type: "select" }, { name: "level", label: "Level", type: "select" }]), collection("trainers", "Trainers", "Trainer", [{ name: "focus", label: "Focus", type: "multiSelect" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "lead_form_panel"]), page("Kurse", "/kurse", ["collection_showcase"], ["faq_accordion"], "classes"), page("Preise", "/preise", ["collection_showcase"], ["lead_form_panel"])],
    homeCollectionTeasers: ["classes", "trainers"],
    styleExperiences: stylesFor("club editorial with motivational but calm cadence", "schedule-first UX with fast scanning", "high-energy contrast, sticky trial CTA and kinetic cards")
  },
  "real-estate": {
    key: "real-estate",
    label: "Immobilien",
    brandCharacter: "precise, premium, valuation-led",
    informationArchitecture: "Properties, valuation, regions, services and seller trust.",
    collections: [collection("properties", "Properties", "Property", [{ name: "price", label: "Price", type: "text" }, { name: "area", label: "Area", type: "text" }]), collection("references", "Sold references", "Reference", [{ name: "soldPrice", label: "Sold price", type: "text" }])],
    pages: [page("Home", "/", ["signature_hero"], ["collection_showcase", "lead_form_panel"]), page("Objekte", "/objekte", ["collection_showcase"], ["faq_accordion"], "properties"), page("Bewertung", "/bewertung", ["lead_form_panel"], ["story_timeline"])],
    homeCollectionTeasers: ["properties", "references"],
    styleExperiences: stylesFor("premium brokerage editorial with calm object detail", "property search UX with clear filters and cards", "luxury showcase with decisive valuation funnel")
  },
  wedding: {
    key: "wedding",
    label: "Hochzeit",
    brandCharacter: "emotional, elegant, personal and guest-oriented",
    informationArchitecture: "Story, schedule, location, RSVP, FAQ, gifts and gallery.",
    collections: [collection("schedule", "Schedule", "Program item", [{ name: "time", label: "Time", type: "text" }], true), collection("story", "Story", "Story chapter", [{ name: "date", label: "Date", type: "text" }], true)],
    pages: [page("Home", "/", ["signature_hero"], ["story_timeline", "lead_form_panel"]), page("Ablauf", "/ablauf", ["story_timeline"], ["faq_accordion"], "schedule"), page("RSVP", "/rsvp", ["lead_form_panel"], ["story_timeline"])],
    homeCollectionTeasers: ["schedule", "story"],
    styleExperiences: stylesFor("romantic editorial with personal pacing and soft detail", "clean guest hub with RSVP and travel clarity", "celebratory visual rhythm with bold countdown and party moments")
  }
};

export const masterSpecSummary = {
  version: "2026-premium-cms-master-spec",
  industries,
  styles,
  combinations: industries.length * styles.length,
  nonNegotiables: [
    "No generic one-template-fits-all IA.",
    "Every visible frontend element must map to editable CMS fields when fachlich sinnvoll.",
    "Buttons use structured targets, not plain URL strings.",
    "Media stores alt, caption and focal point.",
    "Themes are token-based and switchable per website.",
    "Marketing pages for FlamingoMedia stay separate from client demo pages."
  ],
  themeTokenArchitecture,
  sectionTypes: masterSectionSpecs.map((section) => section.type)
};
