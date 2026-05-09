# Architektur

Das System ist als Monorepo aufgebaut:

- `apps/web`: Next.js App Router für Showcase, Tenant Rendering und Admin.
- `packages/cms-core`: zentrale Typen, Rollen, Permissions, Versioning und Validierung.
- `packages/db`: Drizzle Schema für PostgreSQL.
- `packages/sections`: globale Section Registry inklusive Schema, Defaults, Admin-Feldern und Renderer.
- `packages/funding`: Tirol Förderrechner mit testbarer Business-Logik.
- `packages/shared`: Utility-Typen und Hilfsfunktionen.

## Grundsatz

Das Frontend enthält keine fachlichen Fallback-Inhalte. Es rendert `SiteContext`, Pages, Sections und Collections aus CMS-Daten. Jede Section muss über Registry, Zod Schema, Default Data, Admin Fields und Renderer verfügen.
