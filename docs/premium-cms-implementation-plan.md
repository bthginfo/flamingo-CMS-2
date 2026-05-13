# Premium CMS Implementation Plan

Ziel: Flamingo CMS wird zu einem vollstaendig CMS-driven Premium Website-CMS
mit 10 Branchen, 3 Stilrichtungen je Branche und echter branchenspezifischer
Informationsarchitektur. FlamingoMedia Marketing-Seiten bleiben unveraendert
als eigene Marketing Experience.

## Phase 1 - Product Contract und Builder-Gates

Status: in Umsetzung.

Abnahmekriterien:

- Master-Spec ist typisiert und exportiert.
- 10 Branchen inklusive Hochzeit sind im Branchenkanon.
- 30 Branche/Style-Kombinationen sind testbar abgedeckt.
- Section Library wird im Admin nach Branche und Page-Type gefiltert.
- API verhindert, dass nicht erlaubte Sections einer Seite hinzugefuegt werden.
- Doku beschreibt Button-, Media-, Theme-, Collection- und Page-Regeln.

## Phase 2 - CMS Field Engine

Abnahmekriterien:

- Field Renderer fuer `text`, `textarea`, `richText`, `number`, `boolean`,
  `select`, `multiSelect`, `image`, `video`, `gallery`, `repeater`, `object`,
  `link`, `colorToken`, `themeReference`, `pageReference`,
  `sectionReference`, `collectionReference`.
- Button Editor unterstuetzt externe URL, interne Seite, Section, E-Mail und
  Telefon.
- Media Editor unterstuetzt Upload, URL, Embed, Alt, Caption, Focal Point,
  Poster und Video-Flags.
- Design, SEO und Animation Tabs speichern echte Section/Page-Daten.

## Phase 3 - Page Editor 2026

Abnahmekriterien:

- Seiten anlegen, duplizieren, loeschen, Slugs bearbeiten, Unterseiten
  verwalten.
- Section-Liste mit Status, Sichtbarkeit, Sortierung und fixen Bereichen.
- Add-Section-Flow mit Kategorien, Suche und branchenspezifischen Regeln.
- Live Preview neben dem Editor.
- Draft, Preview und Publish ueber Versionen und DB-Quelle.

## Phase 4 - Section Library Production

Abnahmekriterien:

- Produktive Sections: Team Grid, Room Grid, Menu Section, Course Schedule,
  Property Grid, Case Studies, Booking Panel, Lead Form, Before/After Gallery,
  Sticky CTA, Map/Opening Hours, FAQ Accordion.
- Jede Section hat Schema, Default Data, Admin Fields, Design Settings,
  Renderer, mobile QA und passende Branchen/Page-Type-Zuordnung.

## Phase 5 - Branchen-Templates

Abnahmekriterien:

- Pro Branche eigene Seitenstruktur, Collections, Unterseiten und Demo-Copy.
- Classic, Modern und Bold unterscheiden sich in Dramaturgie, Layout,
  Bildgewichtung, Typografie, Motion, CTA-Praesenz und Komponentenrhythmus.
- Home zieht passende Collection-Teaser.
- Demo-Seiten klingen wie echte Kunden-Websites, nicht wie CMS-Erklaerung.

Aktueller Stand:

- Template-Previews nutzen pro Branche eigene Deep-Dive-Sections.
- Classic, Modern und Bold verwenden unterschiedliche Section-Reihenfolgen:
  Classic ist editorial und vertrauensbildend, Modern ist task- und
  UX-orientiert, Bold setzt Deep Dive, Conversion und Media frueher.

## Phase 6 - Collections, Blog und Detailseiten

Abnahmekriterien:

- Collection Items koennen Detailseiten aktivieren.
- Detailseiten haben Slug, SEO, Meta Image, Gallery, Rich Content, CTAs und
  branchenspezifische Zusatzfelder.
- Blog/News mit Kategorien, Tags, Featured Image, Excerpt, Autor,
  Veroeffentlichungsdatum, Listing und Detailseite.

## Phase 7 - Media Library

Abnahmekriterien:

- Asset Grid aus DB.
- Alt/Caption/Focal Point editierbar.
- Bilder/Videos in Sections auswaehlbar.
- Usage Finder, Upload Progress und wiederverwendbare Assets.

## Phase 8 - Leads und Formulare

Abnahmekriterien:

- Lead Inbox mit Status `new`, `read`, `archived`.
- Submission Detail.
- CSV Export.
- Notification Settings.
- Formulare branchenspezifisch konfigurierbar.

## Phase 9 - DB-first, Auth und Rollen

Abnahmekriterien:

- Public und Admin lesen Tenant, Pages, Sections, Collections und Settings
  DB-first.
- Seed ist nur Initialisierung.
- Cache/Revalidate ist definiert.
- Rollenrechte werden angezeigt und technisch erzwungen.
- User/Invite Management und Audit Log im Admin.

## Phase 10 - QA und Production Finish

Abnahmekriterien:

- Responsive QA fuer Mobile, Tablet und Desktop.
- Accessibility Pass fuer Navigation, Formulare, Accordion, Dialoge und Farben.
- Empty, Loading und Error States.
- Production Smoke Tests.
- Vercel Env, Neon Migration/Seed, Domains und Secret-Rotation dokumentiert.
