import type { SiteContext } from "@flamingo/cms-core";

export function SiteShell({
  context,
  children
}: {
  context: SiteContext;
  children: React.ReactNode;
}) {
  const nav = context.navigation[0]?.items ?? [];

  return (
    <div className="showcase-root min-h-screen bg-paper text-ink">
      <div className="bg-ink px-5 py-2 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 md:px-8">
        Templates fuer lokale Marken / CMS / Foerdercheck / Admin Demo
      </div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/90 px-5 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="group flex items-center gap-3 text-lg font-black" href="/">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm text-white transition group-hover:bg-flamingo">
              FM
            </span>
            <span>{context.globalSettings.brand.name}</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
            {nav.map((item) => (
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
      <footer className="bg-ink px-5 py-14 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-3xl font-black">{context.globalSettings.brand.name}</p>
            <p className="mt-3 max-w-xl text-white/60">
              {context.globalSettings.brand.tagline}
            </p>
          </div>
          <div className="grid gap-2 text-sm text-white/60">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
