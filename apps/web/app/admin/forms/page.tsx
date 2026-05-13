import { formDefinitions } from "../../../lib/seed";
import { LeadInboxClient } from "../../../components/admin/LeadInboxClient";

export default function FormsPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Formulare</h1>
      <p className="mt-2 text-black/60">
        Formular-Definitionen, Pflichtfelder, Benachrichtigungen und Eingänge pro Tenant.
      </p>
      <LeadInboxClient initialForms={formDefinitions} />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {formDefinitions.map((form) => (
          <article key={form.id} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-black/40">
              {form.key}
            </p>
            <h2 className="mt-3 text-2xl font-black">{form.label}</h2>
            <p className="mt-2 text-sm text-black/55">
              {form.fields.length} Felder · Notification: {form.notificationEmail}
            </p>
            <div className="mt-5 grid gap-2">
              {form.fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between rounded-xl bg-black/[0.035] p-3 text-sm"
                >
                  <span className="font-bold">{field.label}</span>
                  <span className="text-black/45">
                    {field.type}
                    {field.required ? " · Pflicht" : ""}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
