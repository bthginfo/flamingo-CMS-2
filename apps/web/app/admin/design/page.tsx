import { getSiteContext } from "../../../lib/seed";

export default function DesignPage() {
  const context = getSiteContext("/");

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black">Design</h1>
      <p className="mt-2 text-black/60">
        Theme Tokens für Farben, Radius und Typografie pro Tenant.
      </p>
      <div className="mt-8 grid gap-5 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        {Object.entries(context?.theme ?? {}).map(([key, value]) => (
          <label key={key} className="grid gap-2 text-sm font-bold">
            {key}
            <input className="rounded-xl border border-black/10 p-3" defaultValue={String(value)} />
          </label>
        ))}
      </div>
    </div>
  );
}
