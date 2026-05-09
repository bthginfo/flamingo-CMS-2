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
    <div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/90 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="text-lg font-black" href="/">
            {context.globalSettings.brand.name}
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
            {nav.map((item) => (
              <a key={item.id} className="text-black/65 transition hover:text-black" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
            href="/admin"
          >
            Admin
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-ink px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-2xl font-black">{context.globalSettings.brand.name}</p>
            <p className="mt-3 max-w-xl text-white/60">{context.globalSettings.brand.tagline}</p>
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
