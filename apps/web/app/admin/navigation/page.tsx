import { getSiteContext } from "../../../lib/seed";

export default function NavigationPage() {
  const context = getSiteContext("/");
  const items = context?.navigation[0]?.items ?? [];

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black">Navigation</h1>
      <p className="mt-2 text-black/60">
        Menüs, Reihenfolge, Labels und interne Seitenverlinkung tenant-scoped steuern.
      </p>
      <div className="mt-8 grid gap-3 rounded-2xl bg-white p-6 shadow-sm">
        {items.map((item, index) => (
          <div key={item.id} className="grid gap-3 rounded-xl bg-black/[0.035] p-4 md:grid-cols-[60px_1fr_1fr]">
            <span className="font-black">{index + 1}</span>
            <input className="rounded-xl border border-black/10 p-3" defaultValue={item.label} />
            <input className="rounded-xl border border-black/10 p-3" defaultValue={item.href} />
          </div>
        ))}
      </div>
    </div>
  );
}
