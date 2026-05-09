import { createHash } from "node:crypto";
import postgres from "postgres";
import {
  collections,
  formDefinitions,
  getSiteContext,
  pages,
  sections,
  showcaseTenant
} from "../apps/web/lib/seed";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required to seed the showcase tenant.");
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  max: 1,
  prepare: false
});

const adminUserId = uuidFromKey("user_agency_admin");
const editorUserId = uuidFromKey("user_tenant_editor");
const tenantId = uuidFromKey(showcaseTenant.id);
const now = new Date();

try {
  await seed();
  console.log("Seeded FlamingoMedia showcase tenant.");
} finally {
  await sql.end();
}

async function seed() {
  await seedTenant();
  await seedUsers();
  await seedGlobalControls();
  await seedPagesAndSections();
  await seedCollections();
  await seedForms();
}

async function seedTenant() {
  await sql`
    insert into tenants (
      id, slug, name, status, industry, style, default_locale, timezone, primary_color, created_at, updated_at
    )
    values (
      ${tenantId}, ${showcaseTenant.slug}, ${showcaseTenant.name}, ${showcaseTenant.status},
      ${showcaseTenant.industry}, ${showcaseTenant.style}, ${showcaseTenant.defaultLocale},
      ${showcaseTenant.timezone}, ${showcaseTenant.primaryColor ?? null}, ${now}, ${now}
    )
    on conflict (id) do update set
      slug = excluded.slug,
      name = excluded.name,
      status = excluded.status,
      industry = excluded.industry,
      style = excluded.style,
      default_locale = excluded.default_locale,
      timezone = excluded.timezone,
      primary_color = excluded.primary_color,
      updated_at = excluded.updated_at
  `;

  await sql`
    insert into tenant_domains (
      id, tenant_id, domain, type, verified, created_at, updated_at
    )
    values (
      ${uuidFromKey("domain_flamingomedia_online")}, ${tenantId}, ${"flamingomedia.online"},
      ${"primary"}, ${true}, ${now}, ${now}
    )
    on conflict (id) do update set
      domain = excluded.domain,
      type = excluded.type,
      verified = excluded.verified,
      updated_at = excluded.updated_at
  `;
}

async function seedUsers() {
  await upsertUser(adminUserId, "admin@flamingomedia.online", "Flamingo Admin", "admin123");
  await upsertUser(editorUserId, "editor@flamingomedia.online", "Tenant Editor", "editor123");

  await upsertTenantUser("tenant_user_admin", adminUserId, "agency_admin");
  await upsertTenantUser("tenant_user_editor", editorUserId, "tenant_editor");
}

async function seedGlobalControls() {
  const context = getSiteContext("/");
  if (!context) {
    throw new Error("Missing showcase context");
  }

  await sql`
    insert into navigation_menus (id, tenant_id, key, label, items, created_at, updated_at)
    values (
      ${uuidFromKey("nav_main")}, ${tenantId}, ${"main"}, ${"Main"},
      ${toJson(context.navigation[0]?.items ?? [])}, ${now}, ${now}
    )
    on conflict (id) do update set
      items = excluded.items,
      updated_at = excluded.updated_at
  `;

  await sql`
    insert into global_settings (
      id, tenant_id, brand, contact, social, legal, integrations, consent, created_at, updated_at
    )
    values (
      ${uuidFromKey("global_settings")}, ${tenantId}, ${toJson(context.globalSettings.brand)},
      ${toJson(context.globalSettings.contact)}, ${toJson(context.globalSettings.social)},
      ${toJson(context.globalSettings.legal)}, ${toJson({})}, ${toJson({ mode: "basic" })},
      ${now}, ${now}
    )
    on conflict (id) do update set
      brand = excluded.brand,
      contact = excluded.contact,
      social = excluded.social,
      legal = excluded.legal,
      integrations = excluded.integrations,
      consent = excluded.consent,
      updated_at = excluded.updated_at
  `;

  await sql`
    insert into theme_settings (id, tenant_id, tokens, industry, style, created_at, updated_at)
    values (
      ${uuidFromKey("theme_showcase")}, ${tenantId}, ${toJson(context.theme)},
      ${showcaseTenant.industry}, ${showcaseTenant.style}, ${now}, ${now}
    )
    on conflict (id) do update set
      tokens = excluded.tokens,
      industry = excluded.industry,
      style = excluded.style,
      updated_at = excluded.updated_at
  `;

  await sql`
    insert into seo_settings (
      id, tenant_id, defaults, organization, local_business, social_profiles, created_at, updated_at
    )
    values (
      ${uuidFromKey("seo_showcase")}, ${tenantId},
      ${toJson({ titleTemplate: "%s | FlamingoMedia", defaultDescription: context.seo.metaDescription })},
      ${toJson({ name: "FlamingoMedia", url: "https://flamingomedia.online" })},
      ${toJson({ type: "ProfessionalService", areaServed: "Tirol" })},
      ${toJson(context.globalSettings.social)}, ${now}, ${now}
    )
    on conflict (id) do update set
      defaults = excluded.defaults,
      organization = excluded.organization,
      local_business = excluded.local_business,
      social_profiles = excluded.social_profiles,
      updated_at = excluded.updated_at
  `;
}

async function seedPagesAndSections() {
  for (const page of pages) {
    const pageId = uuidFromKey(page.id);
    await sql`
      insert into pages (
        id, tenant_id, title, slug, full_path, type, status, is_homepage,
        parent_page_id, seo, sort_order, created_by, updated_by, created_at, updated_at
      )
      values (
        ${pageId}, ${tenantId}, ${page.title}, ${page.slug}, ${page.fullPath},
        ${page.type}, ${page.status}, ${page.isHomepage}, ${null}, ${toJson(page.seo)},
        ${page.sortOrder}, ${adminUserId}, ${adminUserId}, ${now}, ${now}
      )
      on conflict (id) do update set
        title = excluded.title,
        slug = excluded.slug,
        full_path = excluded.full_path,
        type = excluded.type,
        status = excluded.status,
        is_homepage = excluded.is_homepage,
        seo = excluded.seo,
        sort_order = excluded.sort_order,
        updated_at = excluded.updated_at
    `;
  }

  for (const section of sections) {
    await sql`
      insert into sections (
        id, tenant_id, page_id, type, label, "order", visible, variant,
        data, design, animation, created_by, updated_by, created_at, updated_at
      )
      values (
        ${uuidFromKey(section.id)}, ${tenantId}, ${uuidFromKey(section.pageId)}, ${section.type},
        ${section.label ?? null}, ${section.order}, ${section.visible}, ${section.variant ?? null},
        ${toJson(section.data)}, ${toJson(section.design)}, ${toJson(section.animation)},
        ${adminUserId}, ${adminUserId}, ${now}, ${now}
      )
      on conflict (id) do update set
        label = excluded.label,
        "order" = excluded."order",
        visible = excluded.visible,
        variant = excluded.variant,
        data = excluded.data,
        design = excluded.design,
        animation = excluded.animation,
        updated_at = excluded.updated_at
    `;
  }
}

async function seedCollections() {
  for (const collection of collections) {
    const collectionId = uuidFromKey(collection.id);
    await sql`
      insert into collections (
        id, tenant_id, key, label, item_label, detail_pages_enabled, schema, created_at, updated_at
      )
      values (
        ${collectionId}, ${tenantId}, ${collection.key}, ${collection.label},
        ${collection.itemLabel}, ${collection.detailPagesEnabled}, ${toJson(collection.schema)},
        ${now}, ${now}
      )
      on conflict (id) do update set
        key = excluded.key,
        label = excluded.label,
        item_label = excluded.item_label,
        detail_pages_enabled = excluded.detail_pages_enabled,
        schema = excluded.schema,
        updated_at = excluded.updated_at
    `;

    for (const item of collection.items) {
      await sql`
        insert into collection_items (
          id, tenant_id, collection_id, title, slug, status, has_detail_page,
          data, seo, created_at, updated_at
        )
        values (
          ${uuidFromKey(item.id)}, ${tenantId}, ${collectionId}, ${item.title}, ${item.slug},
          ${item.status}, ${item.hasDetailPage}, ${toJson(item.data)}, ${toJson(item.seo)},
          ${now}, ${now}
        )
        on conflict (id) do update set
          title = excluded.title,
          slug = excluded.slug,
          status = excluded.status,
          has_detail_page = excluded.has_detail_page,
          data = excluded.data,
          seo = excluded.seo,
          updated_at = excluded.updated_at
      `;
    }
  }
}

async function seedForms() {
  for (const form of formDefinitions) {
    await sql`
      insert into form_definitions (
        id, tenant_id, key, label, fields, submit_label, success_message,
        notification_email, created_at, updated_at
      )
      values (
        ${uuidFromKey(form.id)}, ${tenantId}, ${form.key}, ${form.label}, ${toJson(form.fields)},
        ${form.submitLabel}, ${form.successMessage}, ${form.notificationEmail ?? null}, ${now}, ${now}
      )
      on conflict (id) do update set
        key = excluded.key,
        label = excluded.label,
        fields = excluded.fields,
        submit_label = excluded.submit_label,
        success_message = excluded.success_message,
        notification_email = excluded.notification_email,
        updated_at = excluded.updated_at
    `;
  }
}

async function upsertUser(id: string, email: string, name: string, password: string) {
  await sql`
    insert into users (id, email, name, password_hash, status, created_at, updated_at)
    values (${id}, ${email}, ${name}, ${passwordHash(password)}, ${"active"}, ${now}, ${now})
    on conflict (id) do update set
      email = excluded.email,
      name = excluded.name,
      password_hash = excluded.password_hash,
      status = excluded.status,
      updated_at = excluded.updated_at
  `;
}

async function upsertTenantUser(key: string, userId: string, role: string) {
  await sql`
    insert into tenant_users (id, tenant_id, user_id, role, created_at)
    values (${uuidFromKey(key)}, ${tenantId}, ${userId}, ${role}, ${now})
    on conflict (id) do update set
      tenant_id = excluded.tenant_id,
      user_id = excluded.user_id,
      role = excluded.role
  `;
}

function uuidFromKey(key: string) {
  const hash = createHash("sha256").update(`flamingo-cms:${key}`).digest("hex");
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `4${hash.slice(13, 16)}`,
    `8${hash.slice(17, 20)}`,
    hash.slice(20, 32)
  ].join("-");
}

function passwordHash(password: string) {
  return `sha256:${createHash("sha256").update(`demo:${password}`).digest("hex")}`;
}

function toJson(value: unknown) {
  return sql.json(JSON.parse(JSON.stringify(value)));
}
