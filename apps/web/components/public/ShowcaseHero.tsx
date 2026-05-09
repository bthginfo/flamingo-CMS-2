import type { SiteContext } from "@flamingo/cms-core";
import { FloatingPreview, Marquee, Reveal, RotatingWord } from "./ShowcaseFx";

const heroWords = ["Websites", "Templates", "CMS", "Launches"];

const marqueeItems = [
  "Restaurant",
  "Hotel",
  "Handwerk",
  "Praxis",
  "Studio",
  "Immobilien",
  "Foerdercheck",
  "Admin Demo"
];

export function ShowcaseHero({ context }: { context: SiteContext }) {
  return (
    <section className="showcase-hero relative isolate overflow-hidden bg-[#08080b] px-5 pb-12 pt-14 text-white md:px-8 md:pb-16 md:pt-20">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="hero-grid" />
        <div className="hero-photo" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-150px)] max-w-7xl content-between gap-12">
        <div className="grid gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:items-end">
          <Reveal className="max-w-5xl">
            <p className="showcase-eyebrow text-white/70">FlamingoMedia CMS</p>
            <h1 className="mt-5 text-[clamp(4rem,11vw,10.5rem)] font-black leading-[0.82]">
              Lokale <RotatingWord words={heroWords} />
              <br />
              mit echtem Wow.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 md:text-xl md:leading-9">
              {context.globalSettings.brand.tagline} Design, Admin, Templates, Formulare und
              Medien greifen als ein System ineinander.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="showcase-button showcase-button-light" href="/beispiele">
                Templates ansehen
              </a>
              <a className="showcase-button showcase-button-ghost-dark" href="/admin-demo">
                Admin-Demo starten
              </a>
            </div>
          </Reveal>

          <FloatingPreview className="hero-device-wrap">
            <div className="hero-device">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  live preview
                </span>
              </div>
              <div className="hero-device-screen">
                <div className="rounded-md bg-white/12 p-3">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">
                    Casa Flamingo
                  </p>
                  <p className="mt-3 max-w-sm text-4xl font-black leading-none">
                    Menue, Reservierung, Events.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Menu", "Booking", "Gallery"].map((item) => (
                    <span key={item} className="rounded-md bg-white px-3 py-2 text-xs font-black text-black">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-2 border-t border-white/10 p-4 md:grid-cols-3">
                {[
                  ["27", "Template Routen"],
                  ["18+", "Section-Typen"],
                  ["0", "Fake Screens"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md bg-white/[0.06] p-3">
                    <p className="text-3xl font-black">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/45">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FloatingPreview>
        </div>

        <div className="overflow-hidden border-y border-white/10 py-4">
          <Marquee items={marqueeItems} speed={42} className="text-white/72" />
        </div>
      </div>
    </section>
  );
}
