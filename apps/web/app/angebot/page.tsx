import { notFound } from "next/navigation";
import { ContactSection, PricingSection, ProcessSection } from "../../components/public/MarketingSections";
import { SiteShell } from "../../components/public/SiteShell";
import { getSiteContext } from "../../lib/seed";

export default function OfferPage() {
  const context = getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <PricingSection />
      <ProcessSection />
      <ContactSection />
    </SiteShell>
  );
}
