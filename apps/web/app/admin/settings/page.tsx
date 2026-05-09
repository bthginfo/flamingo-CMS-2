export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black">Einstellungen</h1>
      <p className="mt-2 text-black/60">
        Brand, Kontakt, Social Links, Rechtliches, Integrationen, Consent und User Management.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {["Brand", "Kontakt", "Social", "Rechtliches", "Integrationen", "Benutzer"].map((item) => (
          <article key={item} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-black/55">
              Schema-basierter Einstellungsbereich mit Draft, Preview, Publish und Audit Log.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
