import { and, eq } from "drizzle-orm";
import type {
  Collection,
  CollectionItem,
  FormDefinition,
  GlobalSettings,
  Page,
  Section,
  SiteContext,
  Tenant,
  ThemeSettings
} from "@flamingo/cms-core";
import type { SiteReadRepository } from "@flamingo/cms-core/repository";
import {
  collectionItems,
  collections,
  formDefinitions,
  globalSettings,
  navigationMenus,
  pages,
  sections,
  tenants,
  themeSettings
} from "./index";
import { getDatabase } from "./client";

export function createDrizzleSiteRepository(): SiteReadRepository {
  const db = getDatabase();

  return {
    async getTenantBySlug(slug) {
      const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1);
      return tenant ? mapTenant(tenant) : null;
    },

    async getPageByPath(tenantId, path, preview = false) {
      const status = preview ? undefined : "published";
      const conditions = status
        ? and(eq(pages.tenantId, tenantId), eq(pages.fullPath, path), eq(pages.status, status))
        : and(eq(pages.tenantId, tenantId), eq(pages.fullPath, path));
      const [page] = await db.select().from(pages).where(conditions).limit(1);
      return page ? mapPage(page) : null;
    },

    async listSectionsForPage(tenantId, pageId, preview = false) {
      const statusSections = await db
        .select()
        .from(sections)
        .where(and(eq(sections.tenantId, tenantId), eq(sections.pageId, pageId)));

      return statusSections
        .map(mapSection)
        .filter((section) => preview || section.visible)
        .sort((a, b) => a.order - b.order);
    },

    async listCollections(tenantId, preview = false) {
      const dbCollections = await db
        .select()
        .from(collections)
        .where(eq(collections.tenantId, tenantId));
      const dbItems = await db
        .select()
        .from(collectionItems)
        .where(eq(collectionItems.tenantId, tenantId));

      return dbCollections.map((collection) => ({
        id: collection.id,
        tenantId: collection.tenantId,
        key: collection.key,
        label: collection.label,
        itemLabel: collection.itemLabel,
        detailPagesEnabled: collection.detailPagesEnabled,
        schema: asRecord(collection.schema),
        items: dbItems
          .filter((item) => item.collectionId === collection.id)
          .map(mapCollectionItem)
          .filter((item) => preview || item.status === "published")
      }));
    },

    async listForms(tenantId) {
      const forms = await db
        .select()
        .from(formDefinitions)
        .where(eq(formDefinitions.tenantId, tenantId));
      return forms.map((form) => ({
        id: form.id,
        tenantId: form.tenantId,
        key: form.key,
        label: form.label,
        fields: Array.isArray(form.fields) ? (form.fields as FormDefinition["fields"]) : [],
        submitLabel: form.submitLabel,
        successMessage: form.successMessage,
        notificationEmail: form.notificationEmail ?? undefined,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt
      }));
    },

    async getSiteContext(tenantSlug, path, preview = false) {
      const tenant = await this.getTenantBySlug(tenantSlug);
      if (!tenant) {
        return null;
      }

      const page = await this.getPageByPath(tenant.id, path, preview);
      if (!page) {
        return null;
      }

      const [settings] = await db
        .select()
        .from(globalSettings)
        .where(eq(globalSettings.tenantId, tenant.id))
        .limit(1);
      const [theme] = await db
        .select()
        .from(themeSettings)
        .where(eq(themeSettings.tenantId, tenant.id))
        .limit(1);
      const nav = await db
        .select()
        .from(navigationMenus)
        .where(eq(navigationMenus.tenantId, tenant.id));

      return {
        tenant,
        globalSettings: {
          brand: asBrandSettings(settings?.brand),
          contact: asContactSettings(settings?.contact),
          social: asSocialSettings(settings?.social),
          legal: asLegalSettings(settings?.legal)
        },
        theme: {
          primaryColor: "#f06472",
          secondaryColor: "#7dd3c7",
          backgroundColor: "#fbfaf8",
          textColor: "#101317",
          radius: 18,
          fontFamily: "Inter",
          ...asThemeSettings(theme?.tokens)
        },
        navigation: nav.map((menu) => ({
          id: menu.id,
          tenantId: menu.tenantId,
          label: menu.label,
          items: Array.isArray(menu.items) ? (menu.items as SiteContext["navigation"][number]["items"]) : []
        })),
        page,
        sections: await this.listSectionsForPage(tenant.id, page.id, preview),
        collections: await this.listCollections(tenant.id, preview),
        seo: page.seo,
        preview
      };
    }
  };
}

type DbTenant = typeof tenants.$inferSelect;
type DbPage = typeof pages.$inferSelect;
type DbSection = typeof sections.$inferSelect;
type DbCollectionItem = typeof collectionItems.$inferSelect;

function mapTenant(tenant: DbTenant): Tenant {
  return {
    id: tenant.id,
    slug: tenant.slug,
    name: tenant.name,
    status: tenant.status as Tenant["status"],
    industry: tenant.industry as Tenant["industry"],
    style: tenant.style as Tenant["style"],
    defaultLocale: tenant.defaultLocale as Tenant["defaultLocale"],
    timezone: tenant.timezone,
    primaryColor: tenant.primaryColor ?? undefined,
    createdAt: tenant.createdAt,
    updatedAt: tenant.updatedAt
  };
}

function mapPage(page: DbPage): Page {
  return {
    id: page.id,
    tenantId: page.tenantId,
    title: page.title,
    slug: page.slug,
    fullPath: page.fullPath,
    type: page.type as Page["type"],
    status: page.status as Page["status"],
    isHomepage: page.isHomepage,
    parentPageId: page.parentPageId ?? undefined,
    seo: asRecord(page.seo),
    sortOrder: page.sortOrder,
    createdBy: page.createdBy,
    updatedBy: page.updatedBy,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt
  };
}

function mapSection(section: DbSection): Section {
  return {
    id: section.id,
    tenantId: section.tenantId,
    pageId: section.pageId,
    type: section.type,
    label: section.label ?? undefined,
    order: section.order,
    visible: section.visible,
    variant: section.variant ?? undefined,
    data: section.data,
    design: asRecord(section.design),
    animation: asRecord(section.animation),
    createdBy: section.createdBy,
    updatedBy: section.updatedBy,
    createdAt: section.createdAt,
    updatedAt: section.updatedAt
  };
}

function mapCollectionItem(item: DbCollectionItem): CollectionItem {
  return {
    id: item.id,
    tenantId: item.tenantId,
    collectionId: item.collectionId,
    title: item.title,
    slug: item.slug,
    status: item.status as CollectionItem["status"],
    hasDetailPage: item.hasDetailPage,
    data: asRecord(item.data),
    seo: asRecord(item.seo),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  };
}

function asRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, never>)
    : {};
}

function asBrandSettings(value: unknown): GlobalSettings["brand"] {
  const record = asRecord(value);
  return {
    name: typeof record.name === "string" ? record.name : "FlamingoMedia",
    tagline: typeof record.tagline === "string" ? record.tagline : undefined,
    logoUrl: typeof record.logoUrl === "string" ? record.logoUrl : undefined,
    faviconUrl: typeof record.faviconUrl === "string" ? record.faviconUrl : undefined
  };
}

function asContactSettings(value: unknown): GlobalSettings["contact"] {
  return asRecord(value) as GlobalSettings["contact"];
}

function asSocialSettings(value: unknown): GlobalSettings["social"] {
  return asRecord(value) as GlobalSettings["social"];
}

function asLegalSettings(value: unknown): GlobalSettings["legal"] {
  return asRecord(value) as GlobalSettings["legal"];
}

function asThemeSettings(value: unknown): Partial<ThemeSettings> {
  return asRecord(value) as Partial<ThemeSettings>;
}
