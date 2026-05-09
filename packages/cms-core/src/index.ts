import { z } from "zod";
import type { IndustryKey, Locale, StyleKey } from "@flamingo/shared";

export const tenantStatusSchema = z.enum(["draft", "active", "paused", "archived"]);
export const pageStatusSchema = z.enum(["draft", "published", "archived"]);
export const pageTypeSchema = z.enum([
  "home",
  "standard",
  "landing",
  "collection_index",
  "collection_detail_template",
  "legal",
  "system"
]);

export const tenantRoleSchema = z.enum([
  "super_admin",
  "agency_admin",
  "tenant_owner",
  "tenant_editor",
  "tenant_viewer"
]);

export type TenantRole = z.infer<typeof tenantRoleSchema>;

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  role: TenantRole;
  tenantId: string;
};

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type Tenant = {
  id: string;
  slug: string;
  name: string;
  status: z.infer<typeof tenantStatusSchema>;
  industry: IndustryKey;
  style: StyleKey;
  defaultLocale: Locale;
  timezone: string;
  primaryColor?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TenantDomain = {
  id: string;
  tenantId: string;
  domain: string;
  type: "primary" | "alias" | "preview";
  verified: boolean;
  verificationToken?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TenantResolutionResult =
  | { type: "showcase"; tenant: null }
  | { type: "tenant"; tenant: Tenant; domain: TenantDomain }
  | { type: "not_found"; tenant: null };

export type SEOData = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  robots?: "index,follow" | "noindex,nofollow";
  schemaOrg?: Record<string, unknown>;
};

export type Page = {
  id: string;
  tenantId: string;
  title: string;
  slug: string;
  fullPath: string;
  type: z.infer<typeof pageTypeSchema>;
  status: z.infer<typeof pageStatusSchema>;
  isHomepage: boolean;
  parentPageId?: string;
  seo: SEOData;
  sortOrder: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SectionDesignSettings = {
  spacing?: "compact" | "standard" | "generous";
  background?: "paper" | "ink" | "brand" | "muted";
  container?: "narrow" | "default" | "wide" | "full";
};

export type SectionAnimationSettings = {
  preset?: "none" | "fade-up" | "reveal" | "parallax";
  reducedMotionSafe?: boolean;
};

export const sectionCategorySchema = z.enum([
  "hero",
  "content",
  "media",
  "conversion",
  "collection",
  "trust",
  "navigation",
  "contact",
  "legal",
  "utility",
  "showcase"
]);

export type SectionCategory = z.infer<typeof sectionCategorySchema>;

export type AdminFieldDefinition = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "richtext"
    | "image"
    | "video"
    | "link"
    | "button-group"
    | "repeater"
    | "select"
    | "multi-select"
    | "color"
    | "icon"
    | "number"
    | "boolean"
    | "date"
    | "collection-picker"
    | "page-picker"
    | "form-picker"
    | "map"
    | "opening-hours"
    | "seo"
    | "animation"
    | "spacing";
  required?: boolean;
  options?: string[];
};

export type SectionDefinition<TData = unknown> = {
  type: string;
  label: string;
  description: string;
  category: SectionCategory;
  icon: string;
  tags: string[];
  schema: z.ZodType<TData>;
  defaultData: TData;
  defaultDesign: SectionDesignSettings;
  defaultAnimation: SectionAnimationSettings;
  adminFields: AdminFieldDefinition[];
  allowedPageTypes?: Array<Page["type"]>;
  allowedIndustries?: IndustryKey[];
  disallowedIndustries?: IndustryKey[];
  requiresCollection?: boolean;
  isPremium?: boolean;
  isSystem?: boolean;
};

export type Section = {
  id: string;
  tenantId: string;
  pageId: string;
  type: string;
  label?: string;
  order: number;
  visible: boolean;
  variant?: string;
  data: unknown;
  design: SectionDesignSettings;
  animation: SectionAnimationSettings;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SiteContext = {
  tenant: Tenant;
  domain?: TenantDomain;
  globalSettings: GlobalSettings;
  theme: ThemeSettings;
  navigation: NavigationMenu[];
  page: Page;
  sections: Section[];
  collections: Collection[];
  seo: SEOData;
  preview: boolean;
};

export type NavigationMenu = {
  id: string;
  tenantId: string;
  label: string;
  items: NavigationItem[];
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  pageId?: string;
  children?: NavigationItem[];
};

export type ThemeSettings = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  radius: number;
  fontFamily: string;
};

export type GlobalSettings = {
  brand: {
    name: string;
    tagline?: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: {
      street?: string;
      zip?: string;
      city?: string;
      country?: string;
    };
    mapEmbed?: string;
  };
  social: Record<string, string | undefined>;
  legal: {
    imprintHtml?: string;
    privacyHtml?: string;
    cookiePolicyHtml?: string;
  };
};

export type Collection = {
  id: string;
  tenantId: string;
  key: string;
  label: string;
  itemLabel: string;
  detailPagesEnabled: boolean;
  schema: Record<string, unknown>;
  items: CollectionItem[];
};

export type CollectionItem = {
  id: string;
  tenantId: string;
  collectionId: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  hasDetailPage: boolean;
  data: Record<string, unknown>;
  seo: SEOData;
  createdAt: Date;
  updatedAt: Date;
};

export type FormField = {
  id: string;
  type: "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "radio" | "date" | "file";
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
};

export type FormDefinition = {
  id: string;
  tenantId: string;
  key: string;
  label: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
  notificationEmail?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FormSubmission = {
  id: string;
  tenantId: string;
  formId: string;
  data: Record<string, unknown>;
  sourcePage?: string;
  status: "new" | "read" | "archived";
  createdAt: Date;
};

export const permissionsByRole: Record<TenantRole, string[]> = {
  super_admin: ["*"],
  agency_admin: [
    "tenant:create",
    "content:update",
    "domain:update",
    "publish",
    "forms:read",
    "seo:update",
    "design:update"
  ],
  tenant_owner: [
    "content:update",
    "users:update",
    "publish",
    "media:upload",
    "seo:update",
    "navigation:update"
  ],
  tenant_editor: ["content:update", "draft:create", "media:upload", "preview:read"],
  tenant_viewer: ["preview:read"]
};

export function can(role: TenantRole, permission: string): boolean {
  const permissions = permissionsByRole[role];
  return permissions.includes("*") || permissions.includes(permission);
}

export function assertTenantScope<T extends { tenantId: string }>(
  record: T,
  tenantId: string
): T {
  if (record.tenantId !== tenantId) {
    throw new Error("Tenant scope violation");
  }

  return record;
}

export function validateSection(definition: SectionDefinition, section: Section) {
  return definition.schema.safeParse(section.data);
}

export function createPageSnapshot(page: Page, sections: Section[]) {
  return {
    page: {
      title: page.title,
      slug: page.slug,
      fullPath: page.fullPath,
      type: page.type,
      seo: page.seo
    },
    sections: sections
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((section) => ({
        type: section.type,
        label: section.label,
        order: section.order,
        visible: section.visible,
        variant: section.variant,
        data: section.data,
        design: section.design,
        animation: section.animation
      }))
  };
}

export const createPageInputSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(1).regex(/^\/?[a-z0-9][a-z0-9-/]*$/),
  type: pageTypeSchema.default("standard"),
  addToNavigation: z.boolean().default(false)
});

export const addSectionInputSchema = z.object({
  type: z.string().min(1),
  afterSectionId: z.string().optional()
});

export const updateSectionInputSchema = z.object({
  data: z.unknown().optional(),
  design: z
    .object({
      spacing: z.enum(["compact", "standard", "generous"]).optional(),
      background: z.enum(["paper", "ink", "brand", "muted"]).optional(),
      container: z.enum(["narrow", "default", "wide", "full"]).optional()
    })
    .optional(),
  animation: z
    .object({
      preset: z.enum(["none", "fade-up", "reveal", "parallax"]).optional(),
      reducedMotionSafe: z.boolean().optional()
    })
    .optional(),
  visible: z.boolean().optional(),
  label: z.string().optional()
});

export const createCollectionItemInputSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(1).regex(/^\/?[a-z0-9][a-z0-9-/]*$/),
  status: z.enum(["draft", "published"]).default("draft"),
  hasDetailPage: z.boolean().default(false),
  description: z.string().default(""),
  data: z.record(z.unknown()).default({})
});

export const createFormSubmissionInputSchema = z.object({
  data: z.record(z.unknown()),
  sourcePage: z.string().optional()
});

export type AuditLog = {
  id: string;
  tenantId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId?: string;
  before?: unknown;
  after?: unknown;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
};

export type PageVersion = {
  id: string;
  tenantId: string;
  pageId: string;
  versionNumber: number;
  status: "draft" | "published" | "scheduled" | "archived";
  snapshot: ReturnType<typeof createPageSnapshot>;
  createdBy: string;
  publishedBy?: string;
  scheduledFor?: Date;
  publishedAt?: Date;
  createdAt: Date;
};
