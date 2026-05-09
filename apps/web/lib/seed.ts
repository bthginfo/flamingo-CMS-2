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
