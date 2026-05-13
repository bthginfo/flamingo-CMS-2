import type {
  Collection,
  FormDefinition,
  Page,
  Section,
  SiteContext,
  Tenant
} from "@flamingo/cms-core";
import { sectionDefinitions } from "@flamingo/sections";

const now = new Date("2026-05-09T00:00:00.000Z");

export const showcaseTenant: Tenant = {
  id: "tenant_flamingo",
  slug: "flamingomedia",
  name: "FlamingoMedia",
  status: "active",
  industry: "consulting",
  style: "bold",
  defaultLocale: "de-AT",
  timezone: "Europe/Vienna",
  primaryColor: "#f06472",
  createdAt: now,
  updatedAt: now
};

export const pages: Page[] = [
  {
    id: "page_home",
    tenantId: showcaseTenant.id,
    title: "Home",
    slug: "",
    fullPath: "/",
    type: "home",
    status: "published",
    isHomepage: true,
    seo: {
      metaTitle: "FlamingoMedia - Premium Websites und CMS",
      metaDescription:
        "FlamingoMedia baut hochwertige, CMS-getriebene Websites für regionale Unternehmen."
    },
    sortOrder: 0,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "page_examples",
    tenantId: showcaseTenant.id,
    title: "Beispiele",
    slug: "beispiele",
    fullPath: "/beispiele",
    type: "standard",
    status: "published",
    isHomepage: false,
    seo: {
      metaTitle: "Website Beispiele",
      metaDescription: "Referenzen und Beispiel-Strukturen für CMS-getriebene Kunden-Websites."
    },
    sortOrder: 2,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "page_contact",
    tenantId: showcaseTenant.id,
    title: "Kontakt",
    slug: "kontakt",
    fullPath: "/kontakt",
    type: "standard",
    status: "published",
    isHomepage: false,
    seo: {
      metaTitle: "Kontakt",
      metaDescription: "Projektanfrage an FlamingoMedia senden."
    },
    sortOrder: 3,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "page_imprint",
    tenantId: showcaseTenant.id,
    title: "Impressum",
    slug: "impressum",
    fullPath: "/impressum",
    type: "legal",
    status: "published",
    isHomepage: false,
    seo: {
      metaTitle: "Impressum",
      metaDescription: "Rechtliche Anbieterinformationen."
    },
    sortOrder: 98,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "page_privacy",
    tenantId: showcaseTenant.id,
    title: "Datenschutz",
    slug: "datenschutz",
    fullPath: "/datenschutz",
    type: "legal",
    status: "published",
    isHomepage: false,
    seo: {
      metaTitle: "Datenschutz",
      metaDescription: "Datenschutzinformationen."
    },
    sortOrder: 99,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "page_funding",
    tenantId: showcaseTenant.id,
    title: "Förderung",
    slug: "foerderung",
    fullPath: "/foerderung",
    type: "landing",
    status: "published",
    isHomepage: false,
    seo: {
      metaTitle: "Förderrechner Tirol",
      metaDescription:
        "Unverbindliche Ersteinschätzung für Digitalisierungsförderung in Tirol."
    },
    sortOrder: 1,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  }
];

function makeSection(pageId: string, type: string, order: number): Section {
  const definition = sectionDefinitions.find((item) => item.type === type);
  if (!definition) {
    throw new Error(`Unknown seed section ${type}`);
  }

  return {
    id: `section_${pageId}_${type}_${order}`,
    tenantId: showcaseTenant.id,
    pageId,
    type,
    label: definition.label,
    order,
    visible: true,
    data: definition.defaultData,
    design: definition.defaultDesign,
    animation: definition.defaultAnimation,
    createdBy: "system",
    updatedBy: "system",
    createdAt: now,
    updatedAt: now
  };
}

export const sections: Section[] = [
  makeSection("page_home", "hero", 0),
  makeSection("page_home", "content", 1),
  makeSection("page_home", "collection_grid", 2),
  makeSection("page_home", "faq", 3),
  makeSection("page_home", "cta", 4),
  makeSection("page_funding", "tirol_funding_calculator", 0),
  makeSection("page_funding", "faq", 1),
  makeSection("page_funding", "cta", 2),
  makeSection("page_examples", "hero", 0),
  makeSection("page_examples", "collection_grid", 1),
  makeSection("page_examples", "cta", 2),
  makeSection("page_contact", "hero", 0),
  makeSection("page_contact", "content", 1),
  makeSection("page_contact", "cta", 2),
  makeSection("page_imprint", "content", 0),
  makeSection("page_privacy", "content", 0)
];

export const collections: Collection[] = [
  {
    id: "collection_projects",
    tenantId: showcaseTenant.id,
    key: "projects",
    label: "Referenzen",
    itemLabel: "Projekt",
    detailPagesEnabled: true,
    schema: {
      description: "string",
      industry: "string",
      result: "string"
    },
    items: [
      {
        id: "project_hotel",
        tenantId: showcaseTenant.id,
        collectionId: "collection_projects",
        title: "Boutique Hotel Relaunch",
        slug: "boutique-hotel-relaunch",
        status: "published",
        hasDetailPage: true,
        data: {
          description: "Modulare Hotelwebsite mit Zimmern, Angeboten und Buchungs-CTA.",
          industry: "hotel",
          result: "Mehr direkte Anfragen"
        },
        seo: {},
        createdAt: now,
        updatedAt: now
      },
      {
        id: "project_restaurant",
        tenantId: showcaseTenant.id,
        collectionId: "collection_projects",
        title: "Restaurant CMS",
        slug: "restaurant-cms",
        status: "published",
        hasDetailPage: true,
        data: {
          description: "Speisekarte, Events, Öffnungszeiten und SEO vollständig im CMS.",
          industry: "restaurant",
          result: "Schnellere Pflege"
        },
        seo: {},
        createdAt: now,
        updatedAt: now
      },
      {
        id: "project_trades",
        tenantId: showcaseTenant.id,
        collectionId: "collection_projects",
        title: "Handwerksbetrieb Leadflow",
        slug: "handwerksbetrieb-leadflow",
        status: "published",
        hasDetailPage: true,
        data: {
          description: "Leistungsseiten, Referenzen und Kontaktstrecken für lokale Suche.",
          industry: "trades",
          result: "Bessere qualifizierte Leads"
        },
        seo: {},
        createdAt: now,
        updatedAt: now
      }
    ]
  },
  {
    id: "collection_rooms",
    tenantId: showcaseTenant.id,
    key: "rooms",
    label: "Hotel Zimmer",
    itemLabel: "Zimmer",
    detailPagesEnabled: true,
    schema: {
      eyebrow: "string",
      description: "string",
      teaserText: "string",
      featuredImage: "string",
      gallery: "array",
      features: "array",
      price: "string",
      ctas: "array"
    },
    items: [
      {
        id: "room_panorama_suite",
        tenantId: showcaseTenant.id,
        collectionId: "collection_rooms",
        title: "Panorama Suite",
        slug: "panorama-suite",
        status: "published",
        hasDetailPage: true,
        data: {
          eyebrow: "Alpine Nest",
          description: "Eine Suite fuer Gaeste, die Aussicht, Ruhe und Spa-Naehe suchen.",
          teaserText: "Balkon, Bergblick, Late Checkout und direkter Spa-Zugang.",
          featuredImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=85",
          gallery: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["Balkon", "Spa inklusive", "Kingsize Bett", "Bergblick"],
          price: "ab 219 EUR",
          ctas: [{ label: "Suite anfragen", href: "/kontakt" }]
        },
        seo: {
          metaTitle: "Panorama Suite buchen",
          metaDescription: "Panorama Suite mit Bergblick, Spa-Zugang und direkter Anfrage."
        },
        createdAt: now,
        updatedAt: now
      }
    ]
  },
  {
    id: "collection_menu_items",
    tenantId: showcaseTenant.id,
    key: "menu",
    label: "Restaurant Speisekarte",
    itemLabel: "Gericht",
    detailPagesEnabled: true,
    schema: {
      description: "string",
      teaserText: "string",
      featuredImage: "string",
      price: "string",
      allergens: "array",
      ctas: "array"
    },
    items: [
      {
        id: "menu_truffle_tagliolini",
        tenantId: showcaseTenant.id,
        collectionId: "collection_menu_items",
        title: "Truffle Tagliolini",
        slug: "truffle-tagliolini",
        status: "published",
        hasDetailPage: true,
        data: {
          eyebrow: "Casa Flamingo",
          description: "Hausgemachte Tagliolini mit Pecorino, schwarzem Trueffel und einer seidigen Butteremulsion.",
          teaserText: "Das Signature-Gericht fuer Abende mit Zeit.",
          featuredImage: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1600&q=85",
          price: "24 EUR",
          allergens: ["Gluten", "Milch"],
          ctas: [{ label: "Tisch reservieren", href: "/kontakt" }]
        },
        seo: {
          metaTitle: "Truffle Tagliolini",
          metaDescription: "Signature Pasta mit schwarzem Trueffel im Casa Flamingo."
        },
        createdAt: now,
        updatedAt: now
      }
    ]
  },
  {
    id: "collection_properties",
    tenantId: showcaseTenant.id,
    key: "properties",
    label: "Immobilien",
    itemLabel: "Objekt",
    detailPagesEnabled: true,
    schema: {
      description: "string",
      featuredImage: "string",
      facts: "array",
      price: "string",
      location: "string",
      ctas: "array"
    },
    items: [
      {
        id: "property_penthouse_west",
        tenantId: showcaseTenant.id,
        collectionId: "collection_properties",
        title: "Penthouse West",
        slug: "penthouse-west",
        status: "published",
        hasDetailPage: true,
        data: {
          eyebrow: "Haus & Hof",
          description: "Dachterrasse, Stadtblick und ein Grundriss, der Wohnen und Arbeiten sauber trennt.",
          teaserText: "124 qm, Lift, Dachterrasse, hochwertige Ausstattung.",
          featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
          facts: ["124 qm", "Dachterrasse", "Lift", "Innenstadt"],
          price: "auf Anfrage",
          location: "Innenstadt West",
          ctas: [{ label: "Expose anfragen", href: "/kontakt" }]
        },
        seo: {
          metaTitle: "Penthouse West",
          metaDescription: "Premium-Penthouse mit Dachterrasse und Expose-Anfrage."
        },
        createdAt: now,
        updatedAt: now
      }
    ]
  },
  {
    id: "collection_wedding_schedule",
    tenantId: showcaseTenant.id,
    key: "wedding-schedule",
    label: "Hochzeitsablauf",
    itemLabel: "Programmpunkt",
    detailPagesEnabled: true,
    schema: {
      description: "string",
      time: "string",
      location: "string",
      featuredImage: "string",
      ctas: "array"
    },
    items: [
      {
        id: "wedding_free_ceremony",
        tenantId: showcaseTenant.id,
        collectionId: "collection_wedding_schedule",
        title: "Freie Trauung im Garten",
        slug: "freie-trauung",
        status: "published",
        hasDetailPage: true,
        data: {
          eyebrow: "Mara & Leo",
          description: "Wir sagen Ja unter alten Kastanien, begleitet von Musik, Familie und Freunden.",
          teaserText: "Beginn 16:00 Uhr, bitte bis 15:40 Uhr eintreffen.",
          time: "16:00 Uhr",
          location: "Villa Rosengold",
          featuredImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1600&q=85",
          ctas: [{ label: "Route ansehen", href: "/kontakt" }]
        },
        seo: {
          metaTitle: "Freie Trauung Mara & Leo",
          metaDescription: "Informationen zur freien Trauung, Uhrzeit und Location."
        },
        createdAt: now,
        updatedAt: now
      }
    ]
  },
  {
    id: "collection_posts",
    tenantId: showcaseTenant.id,
    key: "news",
    label: "News",
    itemLabel: "Beitrag",
    detailPagesEnabled: true,
    schema: {
      excerpt: "string",
      description: "string",
      featuredImage: "string",
      author: "string",
      publishedAt: "string",
      tags: "array"
    },
    items: [
      {
        id: "post_cms_templates",
        tenantId: showcaseTenant.id,
        collectionId: "collection_posts",
        title: "Warum Branchen-Websites mehr brauchen als ein Theme",
        slug: "branchen-websites-mehr-als-theme",
        status: "published",
        hasDetailPage: true,
        data: {
          eyebrow: "Insight",
          excerpt: "Gute Templates entstehen aus Informationsarchitektur, nicht aus Farbschemata.",
          description: "Restaurant, Hotel, Praxis und Hochzeit haben andere Besucherfragen, andere Conversion-Momente und andere Content-Tiefe. Ein CMS muss diese Unterschiede als Datenmodell und Rendering-Logik ernst nehmen.",
          featuredImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
          author: "FlamingoMedia",
          publishedAt: "2026-05-12",
          tags: ["CMS", "Templates", "UX"]
        },
        seo: {
          metaTitle: "Branchen-Websites brauchen mehr als ein Theme",
          metaDescription: "Warum Premium-CMS-Templates mit echter Informationsarchitektur starten."
        },
        createdAt: now,
        updatedAt: now
      }
    ]
  }
];

export const formDefinitions: FormDefinition[] = [
  {
    id: "form_funding_lead",
    tenantId: showcaseTenant.id,
    key: "funding-lead",
    label: "Förderrechner Lead",
    fields: [
      {
        id: "field_name",
        type: "text",
        name: "name",
        label: "Name",
        required: true
      },
      {
        id: "field_email",
        type: "email",
        name: "email",
        label: "E-Mail",
        required: true
      },
      {
        id: "field_company",
        type: "text",
        name: "company",
        label: "Unternehmen",
        required: false
      },
      {
        id: "field_message",
        type: "textarea",
        name: "message",
        label: "Projektbeschreibung",
        required: false
      }
    ],
    submitLabel: "Einschätzung anfragen",
    successMessage: "Danke. Wir melden uns mit einer ersten Einschätzung.",
    notificationEmail: "hello@flamingomedia.online",
    createdAt: now,
    updatedAt: now
  }
];

export function getPageByPath(path: string) {
  return pages.find((page) => page.fullPath === path && page.status === "published");
}

export function getSiteContext(path: string, preview = false): SiteContext | null {
  const page = getPageByPath(path);
  if (!page) {
    return null;
  }

  return {
    tenant: showcaseTenant,
    globalSettings: {
      brand: {
        name: "FlamingoMedia",
        tagline: "Premium Websites mit CMS-Kern"
      },
      contact: {
        email: "hello@flamingomedia.online",
        phone: "+43 000 000000"
      },
      social: {
        instagram: "https://instagram.com/flamingomedia"
      },
      legal: {}
    },
    theme: {
      primaryColor: "#f06472",
      secondaryColor: "#7dd3c7",
      backgroundColor: "#fbfaf8",
      textColor: "#101317",
      radius: 18,
      fontFamily: "Inter"
    },
    navigation: [
      {
        id: "main",
        tenantId: showcaseTenant.id,
        label: "Main",
        items: [
          { id: "home", label: "Home", href: "/" },
          { id: "examples", label: "Beispiele", href: "/beispiele" },
          { id: "funding", label: "Förderung", href: "/foerderung" },
          { id: "contact", label: "Kontakt", href: "/kontakt" }
        ]
      }
    ],
    page,
    sections: sections.filter((section) => section.pageId === page.id),
    collections,
    seo: page.seo,
    preview
  };
}
