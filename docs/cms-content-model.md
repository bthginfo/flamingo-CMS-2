# CMS Content Model

Die verbindliche Master-Spec liegt als typisierte Runtime-Struktur in
`packages/cms-core/src/master-spec.ts`. Dieses Dokument beschreibt die
fachlichen Regeln dahinter.

## Tenant

Jeder Tenant besitzt eigene Seiten, Sections, Collections, Navigation, SEO,
Theme Settings, Medien und globale Einstellungen. Die FlamingoMedia
Marketing-Seiten bleiben davon getrennt und duerfen das CMS erklaeren. Alle
Branchen-Demo-Seiten muessen wie reale Kundenseiten wirken.

## Pages

Pages sind frei anlegbar, aber nicht beliebig generisch. Die erlaubten Sections
werden aus Branche, Seitentyp und optionalem Collection-Kontext abgeleitet.
Neue Sections erscheinen unten und koennen danach sortiert werden. Fixe
Bereiche wie ein Home-Hero bleiben als Strukturposition gesperrt, waehrend
Content, Media, SEO, Design und Motion editierbar bleiben.

## Sections

Sections sind detailliert spezifiziert mit Zweck, empfohlenem Einsatz,
Feldmodell, Varianten, Design Settings, Datenquellen und Sortierlogik. Sichtbare
Felder im Frontend duerfen nicht hart verdrahtet sein, wenn sie fachlich im CMS
steuerbar sein sollten.

## Buttons

Buttons sind strukturierte Objekte. Jeder Button unterstuetzt externe URLs,
interne Seiten, Sections auf der aktuellen Seite, E-Mail und Telefon. Optionale
Felder sind neue Tabs, Aria-Label, Style-Variante und Icon.

## Media

Media ist wiederverwendbar und enthaelt Upload/URL/Embed-Quelle, Alt-Text,
Caption, Focal Point, Poster Image sowie Video-Flags fuer Autoplay, Muted und
Controls.

## Collections

Collections verwalten strukturierte Inhalte wie Zimmer, Gerichte, Touren,
Treatments, Projekte, Behandlungen, Cases, Kurse, Immobilienobjekte,
Hochzeits-Ablaufpunkte und Blogposts. Items koennen optionale Detailseiten mit
Slug, SEO, Meta Image, Galerie, Richtext und CTAs erhalten.

## Themes

Themes basieren auf Primitive Tokens, Semantic Tokens und Component Mapping.
Kunden koennen mehrere Themes speichern, previewen und pro Website zuweisen.
Theme-Wechsel duerfen Layout, Lesbarkeit und Kontrast nicht brechen.
