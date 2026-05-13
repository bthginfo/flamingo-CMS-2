import type { AdminFieldDefinition } from "@flamingo/cms-core";

const buttonFields: AdminFieldDefinition[] = [
  { name: "label", label: "Label", type: "text", required: true },
  { name: "type", label: "Zieltyp", type: "select", required: true, options: ["external", "internalPage", "pageSection", "email", "phone"] },
  { name: "href", label: "Legacy URL", type: "text" },
  { name: "externalUrl", label: "Externe URL / E-Mail / Telefon", type: "text" },
  { name: "pageReference", label: "Interne Seite", type: "page-picker" },
  { name: "sectionReference", label: "Section Anchor", type: "text" },
  { name: "openInNewTab", label: "In neuem Tab oeffnen", type: "boolean" },
  { name: "ariaLabel", label: "Aria Label", type: "text" },
  { name: "styleVariant", label: "Button Stil", type: "select", options: ["primary", "secondary", "ghost", "text"] },
  { name: "icon", label: "Icon", type: "icon" }
];

const mediaFields: AdminFieldDefinition[] = [
  { name: "sourceType", label: "Quelle", type: "select", required: true, options: ["upload", "url", "embed"] },
  { name: "imageFile", label: "Media Library Asset", type: "text" },
  { name: "url", label: "Externe URL", type: "text" },
  { name: "src", label: "Legacy Bild-URL", type: "text" },
  { name: "embedCode", label: "Embed Code", type: "textarea" },
  { name: "alt", label: "Alt-Text", type: "text", required: true },
  { name: "caption", label: "Caption", type: "textarea" },
  { name: "posterImage", label: "Video Poster", type: "image" }
];

function isImageKey(key: string) {
  return /image|bild|photo|foto|media|thumbnail/i.test(key);
}

function isLongTextKey(key: string) {
  return /description|teaser|excerpt|intro|body|content|rich|answer|bio/i.test(key);
}

function arrayField(key: string): AdminFieldDefinition {
  if (/ctas?|buttons?|links?/i.test(key)) {
    return {
      name: key,
      label: labelFromKey(key),
      type: "repeater",
      itemLabel: "Button",
      fields: buttonFields
    };
  }

  if (/gallery|images|bilder|photos|fotos/i.test(key)) {
    return {
      name: key,
      label: labelFromKey(key),
      type: "repeater",
      itemLabel: "Bild",
      fields: mediaFields
    };
  }

  return {
    name: key,
    label: labelFromKey(key),
    type: "repeater",
    itemLabel: "Eintrag",
    fields: [{ name: "text", label: "Text", type: "text", required: true }]
  };
}

function labelFromKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function collectionSchemaToAdminFields(schema: Record<string, unknown>): AdminFieldDefinition[] {
  return Object.entries(schema).map(([key, value]) => {
    const type = String(value);

    if (["array", "list", "repeater", "multiSelect", "gallery", "links"].includes(type)) {
      return arrayField(key);
    }

    if (type === "image" || type === "media" || isImageKey(key)) {
      return {
        name: key,
        label: labelFromKey(key),
        type: "image",
        fields: mediaFields
      };
    }

    if (/date|publishedAt/i.test(key)) {
      return { name: key, label: labelFromKey(key), type: "date" };
    }

    return {
      name: key,
      label: labelFromKey(key),
      type: isLongTextKey(key) ? "textarea" : "text"
    };
  });
}

export function createEmptyCollectionData(schema: Record<string, unknown>) {
  return Object.fromEntries(
    collectionSchemaToAdminFields(schema).map((field) => {
      if (field.type === "repeater") {
        return [field.name, []];
      }

      if (field.type === "image" || field.type === "video") {
        return [field.name, { sourceType: "url", url: "", alt: "" }];
      }

      return [field.name, ""];
    })
  );
}
