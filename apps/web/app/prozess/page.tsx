import { notFound } from "next/navigation";
import { ContactSection, DeviceShowcase, ProcessSection } from "../../components/public/MarketingSections";
import { SiteShell } from "../../components/public/SiteShell";
import { SubpageHero } from "../../components/public/SubpageHero";
import { getSiteContext } from "../../lib/seed";

export default function ProcessPage() {
  const context = getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <SubpageHero page="prozess" />
      <ProcessSection />
      <DeviceShowcase />
      <ContactSection />
    </SiteShell>
  );
}
