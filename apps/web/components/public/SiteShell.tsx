import Image from "next/image";
import type { SiteContext } from "@flamingo/cms-core";
import { Marquee } from "./ShowcaseFx";

export function SiteShell({
  context,
  children
}: {
  context: SiteContext;
  children: React.ReactNode;
}) {
  const themeStyle = {
    ["--theme-primary" as string]: context.theme.semanticTokens?.["brand.primary"] ?? context.theme.primaryColor,
    ["--theme-secondary" as string]: context.theme.semanticTokens?.["brand.secondary"] ?? context.theme.secondaryColor,
    ["--theme-page" as string]: context.theme.semanticTokens?.["surface.page"] ?? context.theme.backgroundColor,
    ["--theme-text" as string]: context.theme.semanticTokens?.["text.primary"] ?? context.theme.textColor,
    ["--theme-radius" as string]: `${context.theme.radius}px`,
    ["--theme-font" as string]: context.theme.fontFamily
  };
  const navItems = [
    { id: "templates", label: "Templates", href: "/beispiele" },
    { id: "prozess", label: "Ablauf", href: "/prozess" },
    { id: "preise", label: "Preise", href: "/preise" },
    { id: "about", label: "Ueber uns", href: "/ueber-uns" },
    { id: "kontakt", label: "Kontakt", href: "/kontakt" }
  ];

  return (
    <div className="showcase-root min-h-screen bg-paper text-ink" style={themeStyle}>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#fbfaf8]/88 px-5 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a className="group flex items-center gap-3 text-lg font-black" href="/" aria-label="FlamingoMedia Home">
            <Image src="/brand/flamingo-icon.png" alt="" width={44} height={44} className="h-11 w-11 object-contain transition group-hover:scale-105" />
            <span className="tracking-[-0.02em]">FlamingoMedia</span>
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
            <a className="showcase-button showcase-button-compact hidden lg:inline-flex" href="/preise">
              Preise
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
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-14 md:grid-cols-[1fr_auto]">
          <div>
            <Image src="/brand/flamingo-full.png" alt="FlamingoMedia" width={260} height={120} className="h-24 w-auto object-contain" />
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
            <a href="/beispiele">Templates</a>
            <a href="/prozess">Ablauf</a>
            <a href="/preise">Preise</a>
            <a href="/ueber-uns">Ueber uns</a>
            <a href="/admin-demo">Admin-Demo</a>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <Marquee
            items={["FLAMINGOMEDIA", "WEBSITES", "CONTENT", "CMS", "DACH"]}
            speed={42}
            className="text-white/16"
          />
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <span>© {new Date().getFullYear()} FlamingoMedia. Alle Rechte vorbehalten.</span>
          <span className="font-mono">Made with care · Innsbruck</span>
        </div>
      </footer>
    </div>
  );
}
