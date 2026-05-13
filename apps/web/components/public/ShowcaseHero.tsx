import Image from "next/image";
import type { SiteContext } from "@flamingo/cms-core";
import { Marquee, Reveal, RotatingWord } from "./ShowcaseFx";

const heroWords = ["Restaurants", "Hotels", "Praxen", "Studios"];

export function ShowcaseHero({ context }: { context: SiteContext }) {
  return (
    <section className="agency-hero relative isolate flex min-h-[calc(100vh-74px)] items-end overflow-hidden px-5 pb-20 pt-28 text-white md:px-8 md:pb-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-[#0b1020]" />
      <div className="agency-hero-glow" />
      <div className="agency-hero-grid" />
      <div className="pointer-events-none absolute inset-0 -z-[2] flex items-center justify-center opacity-20 transition duration-700">
        <Image src="/brand/flamingo-icon.png" alt="" width={520} height={520} className="w-[72%] max-w-[520px] object-contain" priority />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-14">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-white/78">
              <span className="h-2 w-2 rounded-full bg-flamingo" />
              {context.globalSettings.brand.tagline}
            </p>
            <h1 className="mt-8 max-w-6xl text-[clamp(4.8rem,11vw,10.5rem)] font-black leading-[0.78]">
              Websites fuer
              <br />
              <span className="text-flamingo"><RotatingWord words={heroWords} /></span>
            </h1>
          </Reveal>

          <Reveal delay={0.08} className="lg:border-l lg:border-white/15 lg:pl-8">
            <p className="text-lg leading-8 text-white/82 md:text-2xl md:leading-10">
              Wir gestalten und betreuen Websites fuer inhabergefuehrte Betriebe in der DACH-Region.
              Editorial-Design mit Pop, CMS zum Selbstpflegen und Content, der nach echtem Betrieb aussieht.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-white/55">
              / Website live in wenigen Tagen
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="showcase-button showcase-button-light" href="/beispiele">
                Templates ansehen
              </a>
              <a className="showcase-button showcase-button-ghost-dark" href="/preise">
                Preise & Pakete
              </a>
            </div>
          </Reveal>
        </div>

        <div className="overflow-hidden border-y border-white/10 py-4">
          <Marquee
            items={["Restaurant", "Hotel", "Tourismus", "Salon", "Handwerk", "Praxis", "Beratung", "Fitness", "Immobilien", "Hochzeit"]}
            speed={44}
            className="text-white/72"
          />
        </div>
      </div>
    </section>
  );
}
