import type { SiteContext } from "@flamingo/cms-core";
import { Marquee } from "./ShowcaseFx";

export function SiteShell({
  context,
  children
}: {
  context: SiteContext;
  children: React.ReactNode;
}) {
  const nav = context.navigation[0]?.items ?? [];
  const navItems = nav.length
    ? nav
    : [
        { id: "templates", label: "Templates", href: "/beispiele" },
        { id: "angebot", label: "Angebot", href: "/angebot" },
        { id: "prozess", label: "Prozess", href: "/prozess" },
        { id: "kontakt", label: "Kontakt", href: "/kontakt" }
      ];

  return (
    <div className="showcase-root min-h-screen bg-paper text-ink">
      <div className="bg-flamingo py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
        <Marquee
          items={[
            "FlamingoMedia CMS",
            "Templates fuer lokale Marken",
            "Admin Demo",
            "Foerdercheck",
            "Vercel + Neon + Blob"
          ]}
          speed={28}
        />
      </div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#fbfaf8]/88 px-5 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="group flex items-center gap-3 text-lg font-black" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-[7px] bg-ink text-sm text-white transition group-hover:bg-flamingo">
              F
            </span>
            <span className="tracking-[-0.02em]">{context.globalSettings.brand.name}</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                className="text-black/60 transition hover:text-black"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a className="showcase-button showcase-button-compact hidden lg:inline-flex" href="/angebot">
              Angebot
            </a>
            <a className="showcase-button showcase-button-compact hidden sm:inline-flex" href="/beispiele">
              Templates
            </a>
            <a className="showcase-button showcase-button-compact" href="/admin">
              Admin
            </a>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="overflow-hidden bg-ink px-5 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-5xl font-black leading-none md:text-7xl">{context.globalSettings.brand.name}</p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/60">
              {context.globalSettings.brand.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="showcase-button showcase-button-light" href="/kontakt">
                Projekt anfragen
              </a>
              <a className="showcase-button showcase-button-ghost-dark" href="/beispiele">
                Templates
              </a>
            </div>
          </div>
          <div className="grid gap-3 text-sm font-bold text-white/60">
            <a href="/angebot">Angebot</a>
            <a href="/prozess">Prozess</a>
            <a href="/admin-demo">Admin-Demo</a>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8 text-[18vw] font-black leading-[0.75] tracking-[-0.08em] text-white/[0.06]">
          FLAMINGO
        </div>
      </footer>
    </div>
  );
}
