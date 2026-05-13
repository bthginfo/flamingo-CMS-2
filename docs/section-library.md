# Section Library

Die technische Section-Registry bleibt in `packages/sections/src/index.tsx`.
Die neue Produkt-Spezifikation fuer Premium-Templates liegt in
`packages/cms-core/src/master-spec.ts` und definiert, welche Sections fuer
Branchen, Seitentypen und Collections sinnvoll sind.

Jede Section-Spec enthaelt:

- `type`
- `label`
- `purpose`
- `recommendedUse`
- `category`
- `industries`
- `pageTypes`
- `fields`
- `optionalFields`
- `designSettings`
- `variants`
- `dataSources`
- `sortable`
- optional `fixedWhen`

Pflichtmodelle:

- Buttons sind Link-Objekte mit Zieltyp, interner Seitenwahl, Section-Ziel,
  E-Mail, Telefon, Aria-Label, Icon und Style-Variante.
- Medien sind Objekte mit Upload/URL/Embed, Alt-Text, Caption und Focal Point.
- Collection-Sections koennen manuell, per Collection-Referenz oder als
  Auto-Feed gefuellt werden.

Die Library darf nicht wieder zu einem generischen Pool fuer alle Seiten werden.
Der Page Builder muss die Master-Spec nutzen, um pro Branche und Seitentyp nur
fachlich passende Sections anzubieten.

## Aktuell produktiv registrierte Premium-Sections

Zusaetzlich zu den bestehenden Basis-Sections sind jetzt produktiv gerendert:

- `team_grid`
- `menu_section`
- `room_grid`
- `booking_panel`
- `property_grid`
- `lead_form_section`

Diese Sections besitzen jeweils Schema, Default Data, Admin Fields,
Branchen-/Seitentyp-Regeln und Renderer. Sie sind im Add-Section-Flow sichtbar,
sobald Branche und Page-Type sie erlauben.
