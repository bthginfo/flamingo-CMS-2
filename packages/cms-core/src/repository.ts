import type { Collection, FormDefinition, Page, Section, SiteContext, Tenant } from "./index";

export type SiteReadRepository = {
  getTenantBySlug(slug: string): Promise<Tenant | null>;
  getPageByPath(tenantId: string, path: string, preview?: boolean): Promise<Page | null>;
  listSectionsForPage(tenantId: string, pageId: string, preview?: boolean): Promise<Section[]>;
  listCollections(tenantId: string, preview?: boolean): Promise<Collection[]>;
  listForms(tenantId: string): Promise<FormDefinition[]>;
  getSiteContext(tenantSlug: string, path: string, preview?: boolean): Promise<SiteContext | null>;
};

export type RepositoryMode = "seed" | "database";
