# FlamingoMedia CMS

Sauberer New-Build für ein vollständig CMS-getriebenes Multi-Tenant-System.

## Architekturprinzip

- CMS ist die Source of Truth.
- Frontend rendert validierte Daten.
- Templates liefern nur Startkonfigurationen.
- Sections sind schema-basierte Bausteine.
- Collections sind strukturierte Inhalte mit optionalen Detailseiten.
- Admin ist die Steuerzentrale für Seiten, Sections, Navigation, SEO, Design, Medien und Publishing.

## Start

```bash
npm install
npm run dev
```

Die App läuft standardmäßig unter `http://localhost:3000`.

## Wichtige Routen

- `/` Showcase
- `/foerderung` Tirol Förderrechner
- `/admin` Admin Dashboard
- `/admin/pages` Seitenverwaltung
- `/admin/pages/home` Page Editor mit globaler Section Library
- `/admin/collections` Collections
- `/admin/design` Theme Editor
- `/admin/seo` SEO Editor

## Qualitätsgates

```bash
npm run typecheck
npm run lint
npm run validate:sections
npm run validate:seeds
npm run check:hardcoded-content
npm test
npm run db:generate
npm run db:seed:showcase
```

## Deployment

Die Vercel-Konfiguration liegt in `vercel.json`. Für Produktion müssen mindestens gesetzt sein:

```bash
DATABASE_URL=...
SESSION_SECRET=...
NEXT_PUBLIC_APP_URL=...
TENANT_SLUG=flamingomedia
BLOB_READ_WRITE_TOKEN=...
```
