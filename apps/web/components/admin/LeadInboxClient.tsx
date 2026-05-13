"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormDefinition, FormSubmission } from "@flamingo/cms-core";
import { adminFetch } from "./api-client";

type InboxData = {
  forms: FormDefinition[];
  submissions: FormSubmission[];
};

export function LeadInboxClient({ initialForms }: { initialForms: FormDefinition[] }) {
  const [data, setData] = useState<InboxData>({ forms: initialForms, submissions: [] });
  const [status, setStatus] = useState<string>("all");
  const [message, setMessage] = useState<string | null>(null);

  async function loadInbox() {
    const response = await adminFetch("/api/admin/forms");
    if (!response.ok) {
      setMessage("Eingang konnte nicht geladen werden.");
      return;
    }

    setData(await response.json());
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

  return (
    <div className="mt-8 grid gap-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">Lead Inbox</p>
            <h2 className="mt-2 text-2xl font-black">{filtered.length} Eingänge</h2>
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
        <div className="mt-5 grid gap-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-black/15 bg-[#fbfaf8] p-6 text-sm font-bold text-black/45">
              Keine Einträge in diesem Status.
            </div>
          ) : null}
          {filtered.map((submission) => (
            <article key={submission.id} className="rounded-xl border border-black/10 bg-[#fbfaf8] p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-black">{submission.sourcePage ?? "Unbekannte Quelle"}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-black/40">
                    {submission.status} · {new Date(submission.createdAt).toLocaleString("de-DE")}
                  </p>
                </div>
                <select
                  className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-black"
                  value={submission.status}
                  onChange={(event) =>
                    updateStatus(submission.id, event.target.value as FormSubmission["status"])
                  }
                >
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="archived">archived</option>
                </select>
              </div>
              <dl className="mt-4 grid gap-2 md:grid-cols-2">
                {Object.entries(submission.data).map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-white p-3">
                    <dt className="text-xs font-black uppercase tracking-[0.14em] text-black/35">{key}</dt>
                    <dd className="mt-1 text-sm text-black/70">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
