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

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        eyebrow="Design System"
        title="Tenant-Tokens fuer Marke, Rhythmus und Komponenten."
        description="Farben, Typografie, Radius, Spacing und Motion muessen genauso pflegbar werden wie Seiteninhalte."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <AdminMetric label="Theme" value="Bold" detail="aktiver Showcase Style" />
        <AdminMetric label="Radius" value={theme?.radius ?? 18} detail="Komponenten-Rhythmus" />
        <AdminMetric label="Font" value={theme?.fontFamily ?? "Inter"} detail="Tenant Typografie" />
        <AdminMetric label="Modes" value="1" detail="Light Theme aktiv" />
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
    </div>
  );
}
