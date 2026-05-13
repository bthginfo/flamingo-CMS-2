import { AdminMetric, AdminPageHeader, AdminPanel } from "../../../components/admin/AdminUi";
import { getSiteContext } from "../../../lib/seed";

export default function DesignPage() {
  const context = getSiteContext("/");
  const theme = context?.theme;
  const colors = [
    ["Primary", theme?.primaryColor ?? "#f06472"],
    ["Secondary", theme?.secondaryColor ?? "#7dd3c7"],
    ["Background", theme?.backgroundColor ?? "#fbfaf8"],
    ["Text", theme?.textColor ?? "#101317"]
  ];
  const semanticTokens = {
    "surface.page": theme?.semanticTokens?.["surface.page"] ?? theme?.backgroundColor ?? "#fbfaf8",
    "surface.raised": theme?.semanticTokens?.["surface.raised"] ?? "#ffffff",
    "surface.inverse": theme?.semanticTokens?.["surface.inverse"] ?? "#101317",
    "text.primary": theme?.semanticTokens?.["text.primary"] ?? theme?.textColor ?? "#101317",
    "brand.primary": theme?.semanticTokens?.["brand.primary"] ?? theme?.primaryColor ?? "#f06472",
    "cta.background": theme?.semanticTokens?.["cta.background"] ?? theme?.primaryColor ?? "#f06472"
  };
  const componentTokens = {
    "button.primary.bg": theme?.componentTokens?.["button.primary.bg"] ?? semanticTokens["cta.background"],
    "button.primary.text": theme?.componentTokens?.["button.primary.text"] ?? "#ffffff",
    "card.bg": theme?.componentTokens?.["card.bg"] ?? semanticTokens["surface.raised"],
    "card.border": theme?.componentTokens?.["card.border"] ?? "rgba(16,19,23,.10)",
    "hero.overlay": theme?.componentTokens?.["hero.overlay"] ?? "linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.18))"
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        eyebrow="Design System"
        title="Tenant-Tokens fuer Marke, Rhythmus und Komponenten."
        description="Farben, Typografie, Radius, Spacing und Motion muessen genauso pflegbar werden wie Seiteninhalte."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <AdminMetric label="Theme" value={theme?.activeThemeId ?? "showcase-default"} detail={theme?.mode ?? "light"} />
        <AdminMetric label="Radius" value={theme?.radius ?? 18} detail="Komponenten-Rhythmus" />
        <AdminMetric label="Font" value={theme?.fontFamily ?? "Inter"} detail="Tenant Typografie" />
        <AdminMetric label="Token Ebenen" value="3" detail="Primitive, Semantic, Component" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <AdminPanel title="Color Tokens">
          <div className="grid gap-3 md:grid-cols-2">
            {colors.map(([label, value]) => (
              <label key={label} className="grid gap-2 text-sm font-bold">
                <span>{label}</span>
                <span className="block h-20 rounded-lg border border-black/10" style={{ background: value }} />
                <input className="rounded-md border border-black/10 bg-paper p-3 font-mono text-sm" defaultValue={value} />
              </label>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel title="Component Preview">
          <div className="grid gap-4 rounded-lg bg-ink p-5 text-white">
            <p className="showcase-eyebrow text-white/70">Preview</p>
            <h2 className="max-w-2xl text-5xl font-black leading-[0.92]">Design-Tokens treiben jede Section.</h2>
            <p className="max-w-xl leading-7 text-white/65">
              Buttons, Cards, Section-Hintergruende und Admin Controls lesen aus denselben Tenant-Einstellungen.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="showcase-button showcase-button-light">Primary CTA</button>
              <button className="showcase-button showcase-button-ghost-dark">Secondary</button>
            </div>
          </div>
        </AdminPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AdminPanel title="Semantic Tokens">
          <div className="grid gap-2">
            {Object.entries(semanticTokens).map(([label, value]) => (
              <label key={label} className="grid gap-2 rounded-lg border border-black/10 bg-paper p-3 text-sm font-bold md:grid-cols-[1fr_160px] md:items-center">
                <span className="font-mono text-xs text-black/55">{label}</span>
                <input className="rounded-md border border-black/10 bg-white p-2 font-mono text-xs" defaultValue={value} />
              </label>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel title="Component Mapping">
          <div className="grid gap-2">
            {Object.entries(componentTokens).map(([label, value]) => (
              <label key={label} className="grid gap-2 rounded-lg border border-black/10 bg-paper p-3 text-sm font-bold md:grid-cols-[1fr_220px] md:items-center">
                <span className="font-mono text-xs text-black/55">{label}</span>
                <input className="rounded-md border border-black/10 bg-white p-2 font-mono text-xs" defaultValue={value} />
              </label>
            ))}
          </div>
        </AdminPanel>
      </div>
    </div>
  );
}
