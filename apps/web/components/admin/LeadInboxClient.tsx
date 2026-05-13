"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormDefinition, FormSubmission } from "@flamingo/cms-core";
import { adminFetch } from "./api-client";

type InboxData = {
  forms: FormDefinition[];
  submissions: FormSubmission[];
};

type FormDraft = {
  label: string;
  notificationEmail: string;
  submitLabel: string;
  successMessage: string;
};

export function LeadInboxClient({ initialForms }: { initialForms: FormDefinition[] }) {
  const [data, setData] = useState<InboxData>({ forms: initialForms, submissions: [] });
  const [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [formDrafts, setFormDrafts] = useState<Record<string, FormDraft>>(() =>
    makeFormDrafts(initialForms)
  );
  const [message, setMessage] = useState<string | null>(null);

  async function loadInbox() {
    const response = await adminFetch("/api/admin/forms");
    if (!response.ok) {
      setMessage("Eingang konnte nicht geladen werden.");
      return;
    }

    const nextData = (await response.json()) as InboxData;
    setData(nextData);
    setFormDrafts(makeFormDrafts(nextData.forms));
    setSelectedId((current) => current || nextData.submissions[0]?.id || "");
  }

  useEffect(() => {
    void loadInbox();
  }, []);

  const filtered = useMemo(
    () =>
      status === "all"
        ? data.submissions
        : data.submissions.filter((submission) => submission.status === status),
    [data.submissions, status]
  );
  const selected = filtered.find((submission) => submission.id === selectedId) ?? filtered[0] ?? null;

  async function updateStatus(submissionId: string, nextStatus: FormSubmission["status"]) {
    const response = await adminFetch(`/api/admin/forms/submissions/${submissionId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: nextStatus })
    });

    if (!response.ok) {
      setMessage("Status konnte nicht gespeichert werden.");
      return;
    }

    setMessage("Status gespeichert.");
    await loadInbox();
  }

  async function updateForm(formKey: string) {
    const draft = formDrafts[formKey];
    const response = await adminFetch("/api/admin/forms", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ formKey, ...draft })
    });

    if (!response.ok) {
      setMessage("Notification Settings konnten nicht gespeichert werden.");
      return;
    }

    setMessage("Notification Settings gespeichert.");
    await loadInbox();
  }

  return (
    <div className="mt-8 grid gap-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Lead Inbox</p>
            <h2 className="mt-2 text-2xl font-black">{filtered.length} Eingaenge</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", "new", "read", "archived"].map((item) => (
              <button
                key={item}
                className={`rounded-full px-3 py-2 text-xs font-black uppercase ${
                  status === item ? "bg-ink text-white" : "bg-black/[0.05] text-black/55"
                }`}
                onClick={() => setStatus(item)}
              >
                {item}
              </button>
            ))}
            <a className="rounded-full border border-black/10 px-3 py-2 text-xs font-black" href="/api/admin/forms/export">
              CSV Export
            </a>
          </div>
        </div>

        {message ? <p className="mt-4 rounded-xl bg-black/[0.04] p-3 text-sm font-bold">{message}</p> : null}

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="grid content-start gap-3">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-black/15 bg-[#fbfaf8] p-6 text-sm font-bold text-black/45">
                Keine Eintraege in diesem Status.
              </div>
            ) : null}
            {filtered.map((submission) => (
              <button
                key={submission.id}
                className={`rounded-xl border p-4 text-left transition ${
                  selected?.id === submission.id
                    ? "border-ink bg-ink text-white"
                    : "border-black/10 bg-[#fbfaf8] hover:border-black/20"
                }`}
                onClick={() => setSelectedId(submission.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-black">{submission.sourcePage ?? "Unbekannte Quelle"}</p>
                    <p className={`mt-1 text-xs font-bold uppercase tracking-[0.14em] ${selected?.id === submission.id ? "text-white/55" : "text-black/40"}`}>
                      {submission.status} · {new Date(submission.createdAt).toLocaleString("de-DE")}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${selected?.id === submission.id ? "bg-white/10" : "bg-white"}`}>
                    Details
                  </span>
                </div>
              </button>
            ))}
          </div>

          <aside className="rounded-xl border border-black/10 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Submission Detail</p>
            {selected ? (
              <div className="mt-4 grid gap-4">
                <div>
                  <p className="text-xl font-black">{selected.sourcePage ?? "Unbekannte Quelle"}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/40">
                    {new Date(selected.createdAt).toLocaleString("de-DE")}
                  </p>
                </div>
                <select
                  className="rounded-xl border border-black/10 bg-[#fbfaf8] p-3 text-sm font-black"
                  value={selected.status}
                  onChange={(event) =>
                    updateStatus(selected.id, event.target.value as FormSubmission["status"])
                  }
                >
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="archived">archived</option>
                </select>
                <dl className="grid gap-2">
                  {Object.entries(selected.data).map(([key, value]) => (
                    <div key={key} className="rounded-lg bg-paper p-3">
                      <dt className="text-xs font-black uppercase tracking-[0.14em] text-black/35">{key}</dt>
                      <dd className="mt-1 text-sm font-bold text-black/72">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <p className="mt-4 text-sm font-bold text-black/45">Keine Submission ausgewaehlt.</p>
            )}
          </aside>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Notification Settings</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {data.forms.map((form) => {
            const draft = formDrafts[form.key] ?? {
              label: form.label,
              notificationEmail: form.notificationEmail ?? "",
              submitLabel: form.submitLabel,
              successMessage: form.successMessage
            };

            return (
              <article key={form.id} className="grid gap-3 rounded-xl border border-black/10 bg-[#fbfaf8] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-black/40">{form.key}</p>
                <label className="grid gap-2 text-sm font-bold">
                  Label
                  <input className="rounded-xl border border-black/10 bg-white p-3" value={draft.label} onChange={(event) => setFormDrafts((current) => ({ ...current, [form.key]: { ...draft, label: event.target.value } }))} />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Notification E-Mail
                  <input className="rounded-xl border border-black/10 bg-white p-3" value={draft.notificationEmail} onChange={(event) => setFormDrafts((current) => ({ ...current, [form.key]: { ...draft, notificationEmail: event.target.value } }))} />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Submit Label
                  <input className="rounded-xl border border-black/10 bg-white p-3" value={draft.submitLabel} onChange={(event) => setFormDrafts((current) => ({ ...current, [form.key]: { ...draft, submitLabel: event.target.value } }))} />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Success Message
                  <textarea className="min-h-[90px] rounded-xl border border-black/10 bg-white p-3" value={draft.successMessage} onChange={(event) => setFormDrafts((current) => ({ ...current, [form.key]: { ...draft, successMessage: event.target.value } }))} />
                </label>
                <button className="rounded-full bg-ink px-4 py-3 text-sm font-black text-white" onClick={() => updateForm(form.key)}>
                  Settings speichern
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function makeFormDrafts(forms: FormDefinition[]) {
  return Object.fromEntries(
    forms.map((form) => [
      form.key,
      {
        label: form.label,
        notificationEmail: form.notificationEmail ?? "",
        submitLabel: form.submitLabel,
        successMessage: form.successMessage
      }
    ])
  );
}
