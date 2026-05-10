import type { ReactNode } from "react";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-hero overflow-hidden rounded-lg border border-white/10 bg-[#09090c] p-6 text-white shadow-soft md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{eyebrow}</p>
          <h1 className="mt-3 text-5xl font-black leading-[0.9] tracking-[-0.04em] md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

export function AdminPanel({
  title,
  children,
  tone = "light"
}: {
  title: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <section
      className={
        tone === "dark"
          ? "rounded-lg border border-white/10 bg-[#111114] p-5 text-white shadow-sm"
          : "rounded-lg border border-black/10 bg-white p-5 text-ink shadow-sm"
      }
    >
      <p className={tone === "dark" ? "mb-4 text-xs font-black uppercase tracking-[0.18em] text-white/40" : "mb-4 text-xs font-black uppercase tracking-[0.18em] text-black/40"}>
        {title}
      </p>
      {children}
    </section>
  );
}

export function AdminMetric({
  label,
  value,
  detail,
  dark = false
}: {
  label: string;
  value: string | number;
  detail?: string;
  dark?: boolean;
}) {
  return (
    <article className={dark ? "rounded-lg border border-white/10 bg-white/[0.06] p-5" : "rounded-lg border border-black/10 bg-white p-5 shadow-sm"}>
      <p className={dark ? "text-xs font-black uppercase tracking-[0.16em] text-white/35" : "text-xs font-black uppercase tracking-[0.16em] text-black/40"}>
        {label}
      </p>
      <p className="mt-3 text-4xl font-black leading-none">{value}</p>
      {detail ? <p className={dark ? "mt-3 text-sm text-white/50" : "mt-3 text-sm text-black/55"}>{detail}</p> : null}
    </article>
  );
}

export function StatusPill({ children, tone = "live" }: { children: ReactNode; tone?: "live" | "draft" | "warn" | "neutral" }) {
  const className =
    tone === "live"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "warn"
        ? "bg-amber-100 text-amber-800"
        : tone === "draft"
          ? "bg-black/10 text-black/55"
          : "bg-white/10 text-white/55";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${className}`}>{children}</span>;
}
