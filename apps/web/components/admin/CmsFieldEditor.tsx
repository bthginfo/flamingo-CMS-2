"use client";

import type { AdminFieldDefinition } from "@flamingo/cms-core";

type CmsFieldEditorProps = {
  field: AdminFieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
};

type CmsButtonValue = {
  label?: string;
  type?: "external" | "internalPage" | "pageSection" | "email" | "phone";
  href?: string;
  externalUrl?: string;
  pageReference?: string;
  sectionReference?: string;
  openInNewTab?: boolean;
  ariaLabel?: string;
  styleVariant?: "primary" | "secondary" | "ghost" | "text";
  icon?: string;
};

type CmsImageValue = {
  sourceType?: "upload" | "url" | "embed";
  src?: string;
  imageFile?: string;
  url?: string;
  embedCode?: string;
  alt?: string;
  caption?: string;
  focalPoint?: { x?: number; y?: number };
  posterImage?: string;
};

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown) {
  return typeof value === "number" ? value : 0;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function updateObject<T extends Record<string, unknown>>(value: unknown, patch: Partial<T>) {
  return { ...asRecord(value), ...patch };
}

function createEmptyValue(field: AdminFieldDefinition): unknown {
  if (field.type === "number") {
    return 0;
  }

  if (field.type === "boolean") {
    return false;
  }

  if (field.type === "repeater" || field.type === "multi-select") {
    return [];
  }

  if (field.type === "image" || field.type === "video") {
    return { sourceType: "url", alt: "", focalPoint: { x: 50, y: 50 } };
  }

  if (field.type === "button-group" || field.type === "link") {
    return { label: "", type: "external", styleVariant: "primary" };
  }

  if (field.fields?.length) {
    return field.fields.reduce<Record<string, unknown>>((item, child) => {
      item[child.name] = createEmptyValue(child);
      return item;
    }, {});
  }

  return "";
}

function createEmptyRepeaterItem(field: AdminFieldDefinition) {
  return (field.fields ?? []).reduce<Record<string, unknown>>((item, child) => {
    item[child.name] = createEmptyValue(child);
    return item;
  }, {});
}

export function CmsFieldEditor({ field, value, onChange }: CmsFieldEditorProps) {
  const baseClass = "rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm";

  if (field.type === "textarea" || field.type === "richtext") {
    return (
      <label className="grid gap-2 text-sm font-bold">
        {field.label}
        <textarea
          className={`${baseClass} min-h-[120px] leading-6`}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  if (field.type === "number") {
    return (
      <label className="grid gap-2 text-sm font-bold">
        {field.label}
        <input
          className={baseClass}
          type="number"
          value={asNumber(value)}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </label>
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-center justify-between rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-bold">
        {field.label}
        <input
          type="checkbox"
          checked={asBoolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="grid gap-2 text-sm font-bold">
        {field.label}
        <select
          className={baseClass}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
        >
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "multi-select") {
    return (
      <label className="grid gap-2 text-sm font-bold">
        {field.label}
        <input
          className={baseClass}
          value={asStringArray(value).join(", ")}
          onChange={(event) =>
            onChange(event.target.value.split(",").map((item) => item.trim()).filter(Boolean))
          }
          placeholder="Eintraege mit Komma trennen"
        />
      </label>
    );
  }

  if (field.type === "button-group" || field.type === "link") {
    return <ButtonObjectEditor label={field.label} value={value} onChange={onChange} />;
  }

  if (field.type === "image" || field.type === "video") {
    return <MediaObjectEditor label={field.label} value={value} onChange={onChange} />;
  }

  if (field.type === "repeater" && field.fields?.length) {
    return <RepeaterField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "opening-hours" && field.fields?.length) {
    return <RepeaterField field={field} value={value} onChange={onChange} />;
  }

  if (field.fields?.length) {
    return <ObjectField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "repeater" || field.type === "opening-hours" || field.type === "map") {
    return <StructuredJsonField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "collection-picker" || field.type === "page-picker" || field.type === "form-picker") {
    return (
      <label className="grid gap-2 text-sm font-bold">
        {field.label}
        <input
          className={baseClass}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={
            field.type === "collection-picker"
              ? "Collection Key, z.B. menu"
              : field.type === "page-picker"
                ? "Interne Seite, z.B. /speisekarte"
                : "Form Key, z.B. reservation"
          }
        />
      </label>
    );
  }

  return (
    <label className="grid gap-2 text-sm font-bold">
      {field.label}
      <input
        className={baseClass}
        value={asString(value)}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ObjectField({
  field,
  value,
  onChange
}: {
  field: AdminFieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const objectValue = asRecord(value);

  return (
    <fieldset className="grid gap-3 rounded-xl border border-black/10 bg-[#fbfaf8] p-3">
      <legend className="px-1 text-sm font-black">{field.label}</legend>
      {field.fields?.map((child) => (
        <CmsFieldEditor
          key={child.name}
          field={child}
          value={objectValue[child.name]}
          onChange={(nextValue) => onChange({ ...objectValue, [child.name]: nextValue })}
        />
      ))}
    </fieldset>
  );
}

function RepeaterField({
  field,
  value,
  onChange
}: {
  field: AdminFieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const items = Array.isArray(value) ? value : [];
  const itemLabel = field.itemLabel ?? "Eintrag";
  const primitiveChild = field.fields?.length === 1 ? field.fields[0] : undefined;

  const updateItem = (index: number, nextValue: unknown) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? nextValue : item)));
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) {
      return;
    }

    const nextItems = [...items];
    const [item] = nextItems.splice(index, 1);
    nextItems.splice(target, 0, item);
    onChange(nextItems);
  };

  return (
    <fieldset className="grid gap-4 rounded-xl border border-black/10 bg-[#fbfaf8] p-3">
      <legend className="px-1 text-sm font-black">{field.label}</legend>
      <div className="grid gap-3">
        {items.map((item, index) => {
          const record = asRecord(item);

          return (
            <article key={index} className="grid gap-3 rounded-xl border border-black/10 bg-white p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-black/45">
                  {itemLabel} {index + 1}
                </p>
                <div className="flex gap-2">
                  <button type="button" className="rounded-lg border border-black/10 px-2 py-1 text-xs font-bold" onClick={() => moveItem(index, -1)}>
                    Hoch
                  </button>
                  <button type="button" className="rounded-lg border border-black/10 px-2 py-1 text-xs font-bold" onClick={() => moveItem(index, 1)}>
                    Runter
                  </button>
                  <button type="button" className="rounded-lg border border-red-200 px-2 py-1 text-xs font-bold text-red-700" onClick={() => removeItem(index)}>
                    Entfernen
                  </button>
                </div>
              </div>
              {primitiveChild ? (
                <CmsFieldEditor
                  field={primitiveChild}
                  value={item}
                  onChange={(nextValue) => updateItem(index, nextValue)}
                />
              ) : (
                field.fields?.map((child) => (
                  <CmsFieldEditor
                    key={child.name}
                    field={child}
                    value={record[child.name]}
                    onChange={(nextValue) => updateItem(index, { ...record, [child.name]: nextValue })}
                  />
                ))
              )}
            </article>
          );
        })}
      </div>
      <button
        type="button"
        className="rounded-xl bg-ink px-4 py-3 text-sm font-black text-white"
        onClick={() => onChange([...items, primitiveChild ? createEmptyValue(primitiveChild) : createEmptyRepeaterItem(field)])}
      >
        {itemLabel} hinzufuegen
      </button>
    </fieldset>
  );
}

function ButtonObjectEditor({
  label,
  value,
  onChange
}: {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const button = asRecord(value) as CmsButtonValue;
  const setButton = (patch: Partial<CmsButtonValue>) => onChange(updateObject<CmsButtonValue>(button, patch));

  return (
    <fieldset className="grid gap-3 rounded-xl border border-black/10 bg-[#fbfaf8] p-3">
      <legend className="px-1 text-sm font-black">{label}</legend>
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={button.label ?? ""}
        onChange={(event) => setButton({ label: event.target.value })}
        placeholder="Button Label"
      />
      <select
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={button.type ?? "external"}
        onChange={(event) => setButton({ type: event.target.value as CmsButtonValue["type"] })}
      >
        <option value="external">Externe URL</option>
        <option value="internalPage">Interne Seite</option>
        <option value="pageSection">Section auf Seite</option>
        <option value="email">E-Mail</option>
        <option value="phone">Telefon</option>
      </select>
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={button.externalUrl ?? button.href ?? ""}
        onChange={(event) => setButton({ externalUrl: event.target.value, href: event.target.value })}
        placeholder="URL, E-Mail oder Telefonnummer"
      />
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={button.pageReference ?? ""}
        onChange={(event) => setButton({ pageReference: event.target.value })}
        placeholder="Interne Seite, z.B. /kontakt"
      />
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={button.sectionReference ?? ""}
        onChange={(event) => setButton({ sectionReference: event.target.value })}
        placeholder="Section Anchor, z.B. #faq"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="rounded-lg border border-black/10 bg-white p-3 text-sm"
          value={button.styleVariant ?? "primary"}
          onChange={(event) => setButton({ styleVariant: event.target.value as CmsButtonValue["styleVariant"] })}
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="ghost">Ghost</option>
          <option value="text">Text</option>
        </select>
        <label className="flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 text-sm font-bold">
          Neuer Tab
          <input
            type="checkbox"
            checked={button.openInNewTab ?? false}
            onChange={(event) => setButton({ openInNewTab: event.target.checked })}
          />
        </label>
      </div>
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={button.ariaLabel ?? ""}
        onChange={(event) => setButton({ ariaLabel: event.target.value })}
        placeholder="Aria Label"
      />
    </fieldset>
  );
}

function MediaObjectEditor({
  label,
  value,
  onChange
}: {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const media = asRecord(value) as CmsImageValue;
  const setMedia = (patch: Partial<CmsImageValue>) => onChange(updateObject<CmsImageValue>(media, patch));

  return (
    <fieldset className="grid gap-3 rounded-xl border border-black/10 bg-[#fbfaf8] p-3">
      <legend className="px-1 text-sm font-black">{label}</legend>
      <select
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={media.sourceType ?? "url"}
        onChange={(event) => setMedia({ sourceType: event.target.value as CmsImageValue["sourceType"] })}
      >
        <option value="upload">Upload / Media Library</option>
        <option value="url">URL</option>
        <option value="embed">Embed</option>
      </select>
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={media.imageFile ?? media.url ?? media.src ?? ""}
        onChange={(event) => setMedia({ imageFile: event.target.value, url: event.target.value, src: event.target.value })}
        placeholder="Asset ID oder Bild-/Video-URL"
      />
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={media.alt ?? ""}
        onChange={(event) => setMedia({ alt: event.target.value })}
        placeholder="Alt-Text"
      />
      <input
        className="rounded-lg border border-black/10 bg-white p-3 text-sm"
        value={media.caption ?? ""}
        onChange={(event) => setMedia({ caption: event.target.value })}
        placeholder="Caption"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
          Fokus X
          <input
            className="rounded-lg border border-black/10 bg-white p-3 text-sm text-black"
            type="number"
            min="0"
            max="100"
            value={media.focalPoint?.x ?? 50}
            onChange={(event) =>
              setMedia({ focalPoint: { ...media.focalPoint, x: Number(event.target.value) } })
            }
          />
        </label>
        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
          Fokus Y
          <input
            className="rounded-lg border border-black/10 bg-white p-3 text-sm text-black"
            type="number"
            min="0"
            max="100"
            value={media.focalPoint?.y ?? 50}
            onChange={(event) =>
              setMedia({ focalPoint: { ...media.focalPoint, y: Number(event.target.value) } })
            }
          />
        </label>
      </div>
      <textarea
        className="min-h-[90px] rounded-lg border border-black/10 bg-white p-3 font-mono text-xs"
        value={media.embedCode ?? ""}
        onChange={(event) => setMedia({ embedCode: event.target.value })}
        placeholder="Embed-Code oder Video-HTML"
      />
    </fieldset>
  );
}

function StructuredJsonField({
  field,
  value,
  onChange
}: {
  field: AdminFieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const serialized = JSON.stringify(value ?? (field.type === "repeater" ? [] : {}), null, 2);

  return (
    <label className="grid gap-2 text-sm font-bold">
      {field.label}
      <textarea
        className="min-h-[150px] rounded-xl border border-black/10 bg-[#fbfaf8] p-3 font-mono text-xs leading-5"
        value={serialized}
        onChange={(event) => {
          try {
            onChange(JSON.parse(event.target.value));
          } catch {
            onChange(event.target.value);
          }
        }}
      />
      <span className="text-xs font-medium leading-5 text-black/45">
        Strukturfeld: JSON bleibt hier erlaubt, bis der itemspezifische Builder verfuegbar ist.
      </span>
    </label>
  );
}
