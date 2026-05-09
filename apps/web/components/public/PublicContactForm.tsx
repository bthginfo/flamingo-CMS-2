"use client";

import { useState } from "react";

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "submitting"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: SubmitState = { status: "idle", message: "" };

export function PublicContactForm() {
  const [state, setState] = useState<SubmitState>(initialState);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting", message: "Anfrage wird gesendet..." });

    const formData = new FormData(event.currentTarget);
    const payload = {
      data: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("industry") ?? ""),
        message: String(formData.get("message") ?? "")
      },
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/kontakt"
    };

    try {
      const response = await fetch("/api/public/forms/funding-lead/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Anfrage konnte nicht gesendet werden.");
      }

      event.currentTarget.reset();
      setState({
        status: "success",
        message: result.successMessage ?? "Danke. Wir melden uns mit einer ersten Einschaetzung."
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Anfrage konnte nicht gesendet werden."
      });
    }
  }

  return (
    <form
      className="rounded-lg border border-white/10 bg-white p-5 text-black shadow-soft"
      onSubmit={submit}
    >
      <label className="mb-4 grid gap-2 text-sm font-bold">
        Name
        <input
          className="rounded-lg border border-black/10 p-3"
          name="name"
          required
          autoComplete="name"
        />
      </label>
      <label className="mb-4 grid gap-2 text-sm font-bold">
        E-Mail
        <input
          className="rounded-lg border border-black/10 p-3"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </label>
      <label className="mb-4 grid gap-2 text-sm font-bold">
        Branche
        <input className="rounded-lg border border-black/10 p-3" name="industry" />
      </label>
      <label className="mb-4 grid gap-2 text-sm font-bold">
        Projektziel
        <textarea className="min-h-[130px] rounded-lg border border-black/10 p-3" name="message" />
      </label>
      <button
        className="showcase-button w-full disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state.status === "submitting"}
        type="submit"
      >
        {state.status === "submitting" ? "Wird gesendet..." : "Anfrage senden"}
      </button>
      {state.message ? (
        <p
          className={`mt-3 rounded-md p-3 text-sm font-bold ${
            state.status === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {state.message}
        </p>
      ) : (
        <p className="mt-3 text-xs leading-5 text-black/45">
          Wird als CMS-Formularsubmission gespeichert und im Admin unter Formulare sichtbar.
        </p>
      )}
    </form>
  );
}
