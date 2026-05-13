import {
  addSectionInputSchema,
  assertTenantScope,
  can,
  createCollectionItemInputSchema,
  createFormSubmissionInputSchema,
  createPageInputSchema,
  createPageSnapshot,
  isSectionAllowedForPage,
  updateCollectionItemInputSchema,
  updateFormDefinitionInputSchema,
  updateSectionInputSchema,
  type AuthenticatedUser,
  type AuditLog,
  type CollectionItem,
  type FormSubmission,
  type MediaAsset,
  type MediaUsage,
  type Page,
  type PageVersion,
  type Section
} from "@flamingo/cms-core";
import { getSectionDefinition } from "@flamingo/sections";
import { slugify } from "@flamingo/shared";
import { collections, formDefinitions, pages, sections, showcaseTenant } from "./seed";

const auditLogs: AuditLog[] = [];
const pageVersions: PageVersion[] = [];
const formSubmissions: FormSubmission[] = [];
const mediaAssets: MediaAsset[] = [];

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function requirePermission(user: AuthenticatedUser, permission: string) {
  if (!can(user.role, permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }

  return user;
}

function audit(
  user: AuthenticatedUser,
  input: Omit<AuditLog, "id" | "createdAt" | "tenantId" | "userId">
) {
  auditLogs.push({
    id: id("audit"),
    tenantId: user.tenantId,
    userId: user.id,
    createdAt: new Date(),
    ...input
  });
}

export function listAdminPages(user: AuthenticatedUser) {
  requirePermission(user, "content:update");
  return pages.filter((page) => page.tenantId === user.tenantId);
}

export function createAdminPage(user: AuthenticatedUser, input: unknown) {
  requirePermission(user, "content:update");
  const parsed = createPageInputSchema.parse(input);
  const cleanSlug = slugify(parsed.slug.replace(/^\//, ""));
  const fullPath = `/${cleanSlug}`;

  if (pages.some((page) => page.tenantId === user.tenantId && page.fullPath === fullPath)) {
    throw new Error("Page slug already exists");
  }

  const page: Page = {
    id: id("page"),
    tenantId: user.tenantId,
    title: parsed.title,
    slug: cleanSlug,
    fullPath,
    type: parsed.type,
    status: "draft",
    isHomepage: false,
    seo: {
      metaTitle: parsed.title,
      metaDescription: ""
    },
    sortOrder: pages.length,
    createdBy: user.id,
    updatedBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  pages.push(page);
  audit(user, { action: "page_create", entityType: "page", entityId: page.id, after: page });
  return page;
}

export function updateAdminPage(
  user: AuthenticatedUser,
  pageId: string,
  input: Partial<Pick<Page, "title" | "slug" | "seo" | "status">>
) {
  requirePermission(user, "content:update");
  const page = assertTenantScope(
    pages.find((candidate) => candidate.id === pageId) ?? fail("Page not found"),
    user.tenantId
  );
  const before = { ...page };

  if (input.title !== undefined) {
    page.title = input.title;
  }

  if (input.slug !== undefined) {
    const cleanSlug = slugify(input.slug.replace(/^\//, ""));
    const fullPath = cleanSlug ? `/${cleanSlug}` : "/";
    const slugTaken = pages.some(
      (candidate) =>
        candidate.tenantId === user.tenantId &&
        candidate.id !== page.id &&
        candidate.fullPath === fullPath
    );

    if (slugTaken) {
      throw new Error("Page slug already exists");
    }

    page.slug = cleanSlug;
    page.fullPath = fullPath;
  }

  if (input.seo !== undefined) {
    page.seo = { ...page.seo, ...input.seo };
  }

  if (input.status !== undefined) {
    page.status = input.status;
  }

  page.updatedBy = user.id;
  page.updatedAt = new Date();
  audit(user, { action: "page_update", entityType: "page", entityId: page.id, before, after: page });
  return page;
}

export function duplicateAdminPage(user: AuthenticatedUser, pageId: string) {
  requirePermission(user, "content:update");
  const source = assertTenantScope(
    pages.find((candidate) => candidate.id === pageId) ?? fail("Page not found"),
    user.tenantId
  );
  const baseSlug = source.slug ? `${source.slug}-kopie` : "home-kopie";
  let cleanSlug = slugify(baseSlug);
  let counter = 2;

  while (pages.some((page) => page.tenantId === user.tenantId && page.slug === cleanSlug)) {
    cleanSlug = slugify(`${baseSlug}-${counter}`);
    counter += 1;
  }

  const page: Page = {
    ...source,
    id: id("page"),
    title: `${source.title} Kopie`,
    slug: cleanSlug,
    fullPath: `/${cleanSlug}`,
    status: "draft",
    isHomepage: false,
    sortOrder: pages.length,
    createdBy: user.id,
    updatedBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const sourceSections = sections
    .filter((section) => section.tenantId === user.tenantId && section.pageId === source.id)
    .sort((a, b) => a.order - b.order);
  const clonedSections = sourceSections.map((section) => ({
    ...section,
    id: id("section"),
    pageId: page.id,
    createdBy: user.id,
    updatedBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  pages.push(page);
  sections.push(...clonedSections);
  audit(user, {
    action: "page_duplicate",
    entityType: "page",
    entityId: page.id,
    after: { page, sections: clonedSections }
  });
  return page;
}

export function deleteAdminPage(user: AuthenticatedUser, pageId: string) {
  requirePermission(user, "content:update");
  const index = pages.findIndex((candidate) => candidate.id === pageId);

  if (index === -1) {
    fail("Page not found");
  }

  const page = assertTenantScope(pages[index], user.tenantId);

  if (page.isHomepage || page.fullPath === "/") {
    throw new Error("Homepage cannot be deleted");
  }

  const [removed] = pages.splice(index, 1);
  const removedSections = sections.filter(
    (section) => section.tenantId === user.tenantId && section.pageId === page.id
  );

  for (const section of removedSections) {
    const sectionIndex = sections.findIndex((candidate) => candidate.id === section.id);
    if (sectionIndex >= 0) {
      sections.splice(sectionIndex, 1);
    }
  }

  audit(user, {
    action: "page_delete",
    entityType: "page",
    entityId: removed.id,
    before: { page: removed, sections: removedSections }
  });
  return removed;
}

export function addSectionToPage(user: AuthenticatedUser, pageId: string, input: unknown) {
  requirePermission(user, "content:update");
  const page = assertTenantScope(
    pages.find((candidate) => candidate.id === pageId) ?? fail("Page not found"),
    user.tenantId
  );
  const parsed = addSectionInputSchema.parse(input);
  const definition = getSectionDefinition(parsed.type) ?? fail("Section definition not found");
  const tenant = page.tenantId === showcaseTenant.id ? showcaseTenant : fail("Tenant not found");

  if (!isSectionAllowedForPage(definition, tenant, page)) {
    throw new Error("Section is not allowed for this tenant industry or page type");
  }

  const pageSections = sections
    .filter((section) => section.tenantId === user.tenantId && section.pageId === page.id)
    .sort((a, b) => a.order - b.order);
  const afterIndex = parsed.afterSectionId
    ? pageSections.findIndex((section) => section.id === parsed.afterSectionId)
    : pageSections.length - 1;
  const nextOrder = afterIndex >= 0 ? pageSections[afterIndex].order + 1 : 0;

  for (const section of pageSections) {
    if (section.order >= nextOrder) {
      section.order += 1;
    }
  }

  const section: Section = {
    id: id("section"),
    tenantId: user.tenantId,
    pageId: page.id,
    type: definition.type,
    label: definition.label,
    order: nextOrder,
    visible: true,
    data: definition.defaultData,
    design: definition.defaultDesign,
    animation: definition.defaultAnimation,
    createdBy: user.id,
    updatedBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  sections.push(section);
  audit(user, {
    action: "section_create",
    entityType: "section",
    entityId: section.id,
    after: section
  });
  return section;
}

export function updateAdminSection(user: AuthenticatedUser, sectionId: string, input: unknown) {
  requirePermission(user, "content:update");
  const section = assertTenantScope(
    sections.find((candidate) => candidate.id === sectionId) ?? fail("Section not found"),
    user.tenantId
  );
  const before = { ...section };
  const parsed = updateSectionInputSchema.parse(input);
  const definition = getSectionDefinition(section.type) ?? fail("Section definition not found");
  const nextData = parsed.data ?? section.data;
  const valid = definition.schema.safeParse(nextData);

  if (!valid.success) {
    throw new Error("Section data failed schema validation");
  }

  section.data = valid.data;
  section.design = { ...section.design, ...parsed.design };
  section.animation = { ...section.animation, ...parsed.animation };
  section.visible = parsed.visible ?? section.visible;
  section.label = parsed.label ?? section.label;

  if (parsed.order !== undefined && parsed.order !== section.order) {
    const siblings = sections
      .filter((candidate) => candidate.tenantId === user.tenantId && candidate.pageId === section.pageId)
      .sort((a, b) => a.order - b.order);
    const withoutCurrent = siblings.filter((candidate) => candidate.id !== section.id);
    const targetIndex = Math.max(0, Math.min(parsed.order, withoutCurrent.length));

    withoutCurrent.splice(targetIndex, 0, section);
    withoutCurrent.forEach((candidate, index) => {
      candidate.order = index;
    });
  }

  section.updatedBy = user.id;
  section.updatedAt = new Date();

  audit(user, {
    action: "section_update",
    entityType: "section",
    entityId: section.id,
    before,
    after: section
  });
  return section;
}

export function duplicateSection(user: AuthenticatedUser, sectionId: string) {
  requirePermission(user, "content:update");
  const source = assertTenantScope(
    sections.find((candidate) => candidate.id === sectionId) ?? fail("Section not found"),
    user.tenantId
  );
  const clone: Section = {
    ...source,
    id: id("section"),
    label: `${source.label ?? source.type} Kopie`,
    order: source.order + 1,
    createdBy: user.id,
    updatedBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  for (const section of sections.filter((candidate) => candidate.pageId === source.pageId)) {
    if (section.order > source.order) {
      section.order += 1;
    }
  }

  sections.push(clone);
  audit(user, { action: "section_duplicate", entityType: "section", entityId: clone.id, after: clone });
  return clone;
}

export function deleteSection(user: AuthenticatedUser, sectionId: string) {
  requirePermission(user, "content:update");
  const index = sections.findIndex((candidate) => candidate.id === sectionId);
  if (index === -1) {
    fail("Section not found");
  }

  const section = assertTenantScope(sections[index], user.tenantId);
  const [removed] = sections.splice(index, 1);

  for (const candidate of sections.filter((item) => item.pageId === section.pageId)) {
    if (candidate.order > section.order) {
      candidate.order -= 1;
    }
  }

  audit(user, {
    action: "section_delete",
    entityType: "section",
    entityId: removed.id,
    before: removed
  });
  return removed;
}

export function publishPage(user: AuthenticatedUser, pageId: string) {
  requirePermission(user, "publish");
  const page = assertTenantScope(
    pages.find((candidate) => candidate.id === pageId) ?? fail("Page not found"),
    user.tenantId
  );
  const pageSections = sections.filter((section) => section.pageId === page.id);
  const version: PageVersion = {
    id: id("version"),
    tenantId: user.tenantId,
    pageId: page.id,
    versionNumber: pageVersions.filter((item) => item.pageId === page.id).length + 1,
    status: "published",
    snapshot: createPageSnapshot(page, pageSections),
    createdBy: user.id,
    publishedBy: user.id,
    publishedAt: new Date(),
    createdAt: new Date()
  };

  page.status = "published";
  page.updatedBy = user.id;
  page.updatedAt = new Date();
  pageVersions.push(version);
  audit(user, { action: "publish", entityType: "page", entityId: page.id, after: version });
  return version;
}

export function listAuditLogs(user: AuthenticatedUser) {
  requirePermission(user, "content:update");
  return auditLogs.filter((log) => log.tenantId === user.tenantId);
}

export function listPageVersions(user: AuthenticatedUser, pageId: string) {
  requirePermission(user, "content:update");
  return pageVersions.filter((version) => version.tenantId === user.tenantId && version.pageId === pageId);
}

export function listCollection(user: AuthenticatedUser, collectionKey: string) {
  requirePermission(user, "content:update");
  const collection = collections.find(
    (candidate) => candidate.tenantId === user.tenantId && candidate.key === collectionKey
  );

  return collection ?? null;
}

export function createCollectionItem(
  user: AuthenticatedUser,
  collectionKey: string,
  input: unknown
) {
  requirePermission(user, "content:update");
  const collection = listCollection(user, collectionKey) ?? fail("Collection not found");
  const parsed = createCollectionItemInputSchema.parse(input);
  const cleanSlug = slugify(parsed.slug.replace(/^\//, ""));

  if (collection.items.some((item) => item.slug === cleanSlug)) {
    throw new Error("Collection item slug already exists");
  }

  const data = validateCollectionData(collection.schema, {
    ...parsed.data,
    description: parsed.description
  });

  const item = {
    id: id("item"),
    tenantId: user.tenantId,
    collectionId: collection.id,
    title: parsed.title,
    slug: cleanSlug,
    status: parsed.status,
    hasDetailPage: parsed.hasDetailPage,
    data,
    seo: {
      metaTitle: parsed.title,
      metaDescription: parsed.description
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  collection.items.push(item);
  audit(user, {
    action: "collection_item_create",
    entityType: "collection_item",
    entityId: item.id,
    after: item
  });
  return item;
}

export function updateCollectionItem(
  user: AuthenticatedUser,
  collectionKey: string,
  itemId: string,
  input: unknown
) {
  requirePermission(user, "content:update");
  const collection = listCollection(user, collectionKey) ?? fail("Collection not found");
  const item = assertTenantScope(
    collection.items.find((candidate) => candidate.id === itemId) ?? fail("Collection item not found"),
    user.tenantId
  );
  const parsed = updateCollectionItemInputSchema.parse(input);
  const before = { ...item, data: { ...item.data }, seo: { ...item.seo } };

  if (parsed.title !== undefined) {
    item.title = parsed.title;
  }

  if (parsed.slug !== undefined) {
    const cleanSlug = slugify(parsed.slug.replace(/^\//, ""));
    const taken = collection.items.some((candidate) => candidate.id !== item.id && candidate.slug === cleanSlug);

    if (taken) {
      throw new Error("Collection item slug already exists");
    }

    item.slug = cleanSlug;
  }

  item.status = parsed.status ?? item.status;
  item.hasDetailPage = parsed.hasDetailPage ?? item.hasDetailPage;
  item.data = parsed.data ? validateCollectionData(collection.schema, { ...item.data, ...parsed.data }) : item.data;
  item.seo = parsed.seo ? { ...item.seo, ...parsed.seo } : item.seo;
  item.updatedAt = new Date();

  audit(user, {
    action: "collection_item_update",
    entityType: "collection_item",
    entityId: item.id,
    before,
    after: item
  });
  return item;
}

function validateCollectionData(schema: Record<string, unknown>, data: Record<string, unknown>) {
  const errors: string[] = [];

  for (const [key, rawType] of Object.entries(schema)) {
    const type = String(rawType);
    const value = data[key];

    if (value === undefined || value === null || value === "") {
      continue;
    }

    if (["string", "text", "richText", "textarea", "date"].includes(type) && typeof value !== "string") {
      errors.push(`${key} muss Text sein`);
    }

    if (type === "number" && typeof value !== "number") {
      errors.push(`${key} muss eine Zahl sein`);
    }

    if (type === "boolean" && typeof value !== "boolean") {
      errors.push(`${key} muss true/false sein`);
    }

    if (["array", "list", "repeater", "multiSelect", "gallery", "links"].includes(type) && !Array.isArray(value)) {
      errors.push(`${key} muss eine Liste sein`);
    }

    if (
      ["image", "media", "video"].includes(type) &&
      typeof value !== "string" &&
      !(typeof value === "object" && value !== null && !Array.isArray(value))
    ) {
      errors.push(`${key} muss ein Medienobjekt oder eine URL sein`);
    }
  }

  if (errors.length) {
    throw new Error(`Collection data failed schema validation: ${errors.join(", ")}`);
  }

  return data;
}

export function deleteCollectionItem(
  user: AuthenticatedUser,
  collectionKey: string,
  itemId: string
) {
  requirePermission(user, "content:update");
  const collection = listCollection(user, collectionKey) ?? fail("Collection not found");
  const index = collection.items.findIndex((candidate) => candidate.id === itemId);

  if (index === -1) {
    fail("Collection item not found");
  }

  const item = assertTenantScope(collection.items[index] as CollectionItem, user.tenantId);
  const [removed] = collection.items.splice(index, 1);

  audit(user, {
    action: "collection_item_delete",
    entityType: "collection_item",
    entityId: item.id,
    before: removed
  });
  return removed;
}

export function listForms(user: AuthenticatedUser) {
  requirePermission(user, "forms:read");
  return formDefinitions.filter((form) => form.tenantId === user.tenantId);
}

export function updateFormDefinition(user: AuthenticatedUser, formKey: string, input: unknown) {
  requirePermission(user, "forms:read");
  const form = assertTenantScope(
    formDefinitions.find((candidate) => candidate.key === formKey) ?? fail("Form not found"),
    user.tenantId
  );
  const parsed = updateFormDefinitionInputSchema.parse(input);
  const before = { ...form };

  form.label = parsed.label ?? form.label;
  form.submitLabel = parsed.submitLabel ?? form.submitLabel;
  form.successMessage = parsed.successMessage ?? form.successMessage;
  form.notificationEmail = parsed.notificationEmail || undefined;

  audit(user, {
    action: "form_definition_update",
    entityType: "form_definition",
    entityId: form.id,
    before,
    after: form
  });
  return form;
}

export function listFormSubmissions(user: AuthenticatedUser) {
  requirePermission(user, "forms:read");
  return formSubmissions.filter((submission) => submission.tenantId === user.tenantId);
}

export function updateFormSubmissionStatus(
  user: AuthenticatedUser,
  submissionId: string,
  status: FormSubmission["status"]
) {
  requirePermission(user, "forms:read");
  const submission = assertTenantScope(
    formSubmissions.find((candidate) => candidate.id === submissionId) ?? fail("Submission not found"),
    user.tenantId
  );
  const before = { ...submission };

  submission.status = status;
  audit(user, {
    action: "form_submission_status_update",
    entityType: "form_submission",
    entityId: submission.id,
    before,
    after: submission
  });
  return submission;
}

export function exportFormSubmissionsCsv(user: AuthenticatedUser) {
  const submissions = listFormSubmissions(user);
  const keys = Array.from(
    new Set(submissions.flatMap((submission) => Object.keys(submission.data)))
  );
  const header = ["id", "status", "sourcePage", "createdAt", ...keys];
  const rows = submissions.map((submission) =>
    header.map((key) => {
      const value =
        key in submission
          ? String(submission[key as keyof FormSubmission] ?? "")
          : String(submission.data[key] ?? "");
      return `"${value.replace(/"/g, '""')}"`;
    })
  );

  return [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export function createPublicFormSubmission(formKey: string, input: unknown) {
  const parsed = createFormSubmissionInputSchema.parse(input);
  const form = formDefinitions.find(
    (candidate) => candidate.tenantId === showcaseTenant.id && candidate.key === formKey
  );

  if (!form) {
    throw new Error("Form not found");
  }

  for (const field of form.fields) {
    if (field.required && !parsed.data[field.name]) {
      throw new Error(`Missing required field: ${field.name}`);
    }
  }

  const submission: FormSubmission = {
    id: id("submission"),
    tenantId: form.tenantId,
    formId: form.id,
    data: parsed.data,
    sourcePage: parsed.sourcePage,
    status: "new",
    createdAt: new Date()
  };

  formSubmissions.push(submission);
  audit(
    {
      id: "public_form",
      email: "public@flamingomedia.online",
      name: "Public Form",
      role: "tenant_viewer",
      tenantId: form.tenantId
    },
    {
      action: "form_submission_create",
      entityType: "form_submission",
      entityId: submission.id,
      after: submission
    }
  );

  return {
    submission,
    successMessage: form.successMessage
  };
}

export function listMediaAssets(user: AuthenticatedUser) {
  requirePermission(user, "media:upload");
  return mediaAssets.filter((asset) => asset.tenantId === user.tenantId);
}

export function listMediaAssetUsages(user: AuthenticatedUser, assetId: string): MediaUsage[] {
  requirePermission(user, "media:upload");
  const asset = assertTenantScope(
    mediaAssets.find((candidate) => candidate.id === assetId) ?? fail("Media asset not found"),
    user.tenantId
  );
  const needles = new Set([asset.id, asset.url, asset.storageKey, asset.filename].filter(Boolean));
  const usages: MediaUsage[] = [];

  for (const page of pages.filter((candidate) => candidate.tenantId === user.tenantId)) {
    collectMediaMatches(page.seo, needles, `page:${page.id}:seo`, (fieldPath) => {
      usages.push({
        id: `page_${page.id}_${fieldPath}`,
        entityType: "page",
        entityId: page.id,
        label: page.title,
        location: "Page SEO",
        fieldPath,
        href: `/admin/pages/${page.id}`
      });
    });
  }

  for (const section of sections.filter((candidate) => candidate.tenantId === user.tenantId)) {
    const page = pages.find((candidate) => candidate.id === section.pageId);
    collectMediaMatches(section.data, needles, `section:${section.id}:data`, (fieldPath) => {
      usages.push({
        id: `section_${section.id}_${fieldPath}`,
        entityType: "section",
        entityId: section.id,
        label: section.label ?? section.type,
        location: page ? `${page.title} / ${section.label ?? section.type}` : section.label ?? section.type,
        fieldPath,
        href: page ? `/admin/pages/${page.id}#${section.id}` : undefined
      });
    });
  }

  for (const collection of collections.filter((candidate) => candidate.tenantId === user.tenantId)) {
    for (const item of collection.items) {
      collectMediaMatches({ data: item.data, seo: item.seo }, needles, `collection:${collection.key}:${item.id}`, (fieldPath) => {
        usages.push({
          id: `collection_${item.id}_${fieldPath}`,
          entityType: "collection_item",
          entityId: item.id,
          label: item.title,
          location: `${collection.label} / ${item.title}`,
          fieldPath,
          href: `/admin/collections/${collection.key}`
        });
      });
    }
  }

  return usages;
}

export function createMediaAsset(
  user: AuthenticatedUser,
  input: Omit<MediaAsset, "id" | "tenantId" | "createdBy" | "createdAt" | "updatedAt">
) {
  requirePermission(user, "media:upload");

  const asset: MediaAsset = {
    id: id("media"),
    tenantId: user.tenantId,
    createdBy: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...input
  };

  mediaAssets.push(asset);
  audit(user, {
    action: "media_upload",
    entityType: "media_asset",
    entityId: asset.id,
    after: asset
  });

  return asset;
}

function collectMediaMatches(
  value: unknown,
  needles: Set<string>,
  path: string,
  onMatch: (fieldPath: string) => void
) {
  if (typeof value === "string") {
    if (needles.has(value) || Array.from(needles).some((needle) => needle && value.includes(needle))) {
      onMatch(path);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectMediaMatches(item, needles, `${path}.${index}`, onMatch));
    return;
  }

  if (typeof value === "object" && value !== null) {
    for (const [key, nested] of Object.entries(value)) {
      collectMediaMatches(nested, needles, `${path}.${key}`, onMatch);
    }
  }
}

export function updateMediaAsset(
  user: AuthenticatedUser,
  assetId: string,
  input: Partial<Pick<MediaAsset, "alt" | "caption" | "focalPointX" | "focalPointY" | "tags">>
) {
  requirePermission(user, "media:upload");
  const asset = assertTenantScope(
    mediaAssets.find((candidate) => candidate.id === assetId) ?? fail("Media asset not found"),
    user.tenantId
  );
  const before = { ...asset };

  asset.alt = input.alt ?? asset.alt;
  asset.caption = input.caption ?? asset.caption;
  asset.focalPointX = input.focalPointX ?? asset.focalPointX;
  asset.focalPointY = input.focalPointY ?? asset.focalPointY;
  asset.tags = input.tags ?? asset.tags;
  asset.updatedAt = new Date();
  audit(user, { action: "media_update", entityType: "media_asset", entityId: asset.id, before, after: asset });
  return asset;
}

function fail(message: string): never {
  throw new Error(message);
}
