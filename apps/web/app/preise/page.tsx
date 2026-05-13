import { notFound } from "next/navigation";
import { AddonsSection, CalloutFooter, PricingSection } from "../../components/public/MarketingSections";
import { SiteShell } from "../../components/public/SiteShell";
import { getSiteContext } from "../../lib/seed";

export default function PricesPage() {
  const context = getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <section className="px-5 pb-12 pt-32 md:px-8 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="showcase-eyebrow">Preise</p>
          <h1 className="mt-5 max-w-5xl text-6xl font-black leading-[0.86] md:text-9xl">
            Faire Preise. Keine Ueberraschungen.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-black/62">
            Drei Pakete, klare Festpreise und Erweiterungen, die man versteht,
            bevor das Projekt startet.
          </p>
        </div>
      </section>
      <PricingSection />
      <AddonsSection />
      <CalloutFooter />
    </SiteShell>
  );
}
