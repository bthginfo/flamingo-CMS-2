# Database Schema

The Drizzle schema lives in `packages/db/src/index.ts`.

## Commands

```bash
npm run db:generate
npm run db:push
npm run db:studio
npm run db:seed:showcase
```

`DATABASE_URL` is required and documented in `.env.example`.

## Current Tables

- Tenancy: `tenants`, `tenant_domains`
- Users and access: `users`, `tenant_users`, `sessions`, `password_reset_tokens`
- Content: `pages`, `page_versions`, `sections`, `section_versions`
- Collections: `collections`, `collection_items`, `collection_item_versions`
- Media: `media_folders`, `media_assets`
- Global controls: `navigation_menus`, `navigation_versions`, `seo_settings`, `global_settings`, `theme_settings`
- Forms: `form_definitions`, `form_submissions`
- Operations: `redirects`, `audit_logs`, `publish_events`, `integrations`, `webhook_events`

The current app still uses the in-memory seed adapter for UI development. The DB client in `packages/db/src/client.ts` is the target for the next repository implementation pass.

## Showcase Seed

`npm run db:seed:showcase` is idempotent. It maps the local CMS seed ids to deterministic UUIDs and upserts:

- FlamingoMedia tenant and primary domain
- demo users and tenant roles
- navigation, global settings, theme and SEO defaults
- pages and sections
- project collection and items
- funding lead form definition
