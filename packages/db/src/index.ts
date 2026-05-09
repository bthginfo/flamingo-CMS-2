import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  status: text("status").notNull(),
  industry: text("industry").notNull(),
  style: text("style").notNull(),
  defaultLocale: text("default_locale").notNull(),
  timezone: text("timezone").notNull(),
  primaryColor: text("primary_color"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const tenantDomains = pgTable("tenant_domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  domain: text("domain").notNull().unique(),
  type: text("type").notNull(),
  verified: boolean("verified").notNull().default(false),
  verificationToken: text("verification_token"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash"),
  avatarUrl: text("avatar_url"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const tenantUsers = pgTable("tenant_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  userId: uuid("user_id").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  tenantId: uuid("tenant_id").notNull(),
  sessionTokenHash: text("session_token_hash").notNull(),
  csrfTokenHash: text("csrf_token_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  fullPath: text("full_path").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  isHomepage: boolean("is_homepage").notNull().default(false),
  parentPageId: uuid("parent_page_id"),
  seo: jsonb("seo").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const pageVersions = pgTable("page_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  pageId: uuid("page_id").notNull(),
  versionNumber: integer("version_number").notNull(),
  status: text("status").notNull(),
  snapshot: jsonb("snapshot").notNull(),
  createdBy: uuid("created_by").notNull(),
  publishedBy: uuid("published_by"),
  scheduledFor: timestamp("scheduled_for"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const sections = pgTable("sections", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  pageId: uuid("page_id").notNull(),
  type: text("type").notNull(),
  label: text("label"),
  order: integer("order").notNull(),
  visible: boolean("visible").notNull().default(true),
  variant: text("variant"),
  data: jsonb("data").notNull(),
  design: jsonb("design").notNull(),
  animation: jsonb("animation").notNull(),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const sectionVersions = pgTable("section_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  sectionId: uuid("section_id").notNull(),
  versionNumber: integer("version_number").notNull(),
  status: text("status").notNull(),
  snapshot: jsonb("snapshot").notNull(),
  createdBy: uuid("created_by").notNull(),
  publishedBy: uuid("published_by"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  key: text("key").notNull(),
  label: text("label").notNull(),
  itemLabel: text("item_label").notNull(),
  detailPagesEnabled: boolean("detail_pages_enabled").notNull().default(false),
  schema: jsonb("schema").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const collectionItems = pgTable("collection_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  collectionId: uuid("collection_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  status: text("status").notNull(),
  hasDetailPage: boolean("has_detail_page").notNull().default(false),
  data: jsonb("data").notNull(),
  seo: jsonb("seo").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const collectionItemVersions = pgTable("collection_item_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  collectionItemId: uuid("collection_item_id").notNull(),
  versionNumber: integer("version_number").notNull(),
  status: text("status").notNull(),
  snapshot: jsonb("snapshot").notNull(),
  createdBy: uuid("created_by").notNull(),
  publishedBy: uuid("published_by"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const mediaFolders = pgTable("media_folders", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  name: text("name").notNull(),
  parentFolderId: uuid("parent_folder_id"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  folderId: uuid("folder_id"),
  url: text("url").notNull(),
  storageKey: text("storage_key").notNull(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  type: text("type").notNull(),
  alt: text("alt"),
  caption: text("caption"),
  width: integer("width"),
  height: integer("height"),
  sizeBytes: integer("size_bytes").notNull(),
  focalPointX: integer("focal_point_x"),
  focalPointY: integer("focal_point_y"),
  tags: jsonb("tags").notNull(),
  createdBy: uuid("created_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const navigationMenus = pgTable("navigation_menus", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  key: text("key").notNull(),
  label: text("label").notNull(),
  items: jsonb("items").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const navigationVersions = pgTable("navigation_versions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  navigationMenuId: uuid("navigation_menu_id").notNull(),
  versionNumber: integer("version_number").notNull(),
  snapshot: jsonb("snapshot").notNull(),
  createdBy: uuid("created_by").notNull(),
  publishedBy: uuid("published_by"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const seoSettings = pgTable("seo_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  defaults: jsonb("defaults").notNull(),
  organization: jsonb("organization").notNull(),
  localBusiness: jsonb("local_business").notNull(),
  socialProfiles: jsonb("social_profiles").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const globalSettings = pgTable("global_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  brand: jsonb("brand").notNull(),
  contact: jsonb("contact").notNull(),
  social: jsonb("social").notNull(),
  legal: jsonb("legal").notNull(),
  integrations: jsonb("integrations").notNull(),
  consent: jsonb("consent").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const themeSettings = pgTable("theme_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  tokens: jsonb("tokens").notNull(),
  industry: text("industry").notNull(),
  style: text("style").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const formDefinitions = pgTable("form_definitions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  key: text("key").notNull(),
  label: text("label").notNull(),
  fields: jsonb("fields").notNull(),
  submitLabel: text("submit_label").notNull(),
  successMessage: text("success_message").notNull(),
  notificationEmail: text("notification_email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const formSubmissions = pgTable("form_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  formId: uuid("form_id").notNull(),
  data: jsonb("data").notNull(),
  sourcePage: text("source_page"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const redirects = pgTable("redirects", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  fromPath: text("from_path").notNull(),
  toPath: text("to_path").notNull(),
  statusCode: integer("status_code").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const publishEvents = pgTable("publish_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  userId: uuid("user_id").notNull(),
  scope: text("scope").notNull(),
  entityId: uuid("entity_id"),
  versionIds: jsonb("version_ids").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const integrations = pgTable("integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  provider: text("provider").notNull(),
  status: text("status").notNull(),
  config: jsonb("config").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id"),
  provider: text("provider").notNull(),
  eventType: text("event_type").notNull(),
  payload: jsonb("payload").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull(),
  userId: uuid("user_id").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id"),
  before: jsonb("before"),
  after: jsonb("after"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
