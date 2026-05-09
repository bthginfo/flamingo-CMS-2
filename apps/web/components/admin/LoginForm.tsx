"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@flamingomedia.online");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();

    setPending(false);
    if (!response.ok) {
      setError(result.error ?? "Login fehlgeschlagen.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-3xl bg-white p-8 shadow-soft">
      <div>
        <h1 className="text-3xl font-black">Admin Login</h1>
        <p className="mt-2 text-sm leading-6 text-black/55">
          Demo-Zugang für den aktuellen Build. Sessions laufen über HttpOnly Cookies mit CSRF-Schutz.
        </p>
      </div>
      <label className="grid gap-2 text-sm font-bold">
        E-Mail
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
        />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Passwort
        <input
          className="rounded-xl border border-black/10 p-3"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </label>
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button
        className="rounded-full bg-ink px-5 py-3 text-sm font-black text-white disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Login läuft..." : "Einloggen"}
      </button>
      <p className="text-xs leading-5 text-black/45">
        Demo: admin@flamingomedia.online / admin123 oder editor@flamingomedia.online /
        editor123
      </p>
    </form>
  );
}
