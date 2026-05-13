import { notFound } from "next/navigation";
import { AboutSection, CalloutFooter, NumbersSection } from "../../components/public/MarketingSections";
import { SiteShell } from "../../components/public/SiteShell";
import { getSiteContext } from "../../lib/seed";

export default function AboutPage() {
  const context = getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <AboutSection />
      <NumbersSection />
      <CalloutFooter />
    </SiteShell>
  );
}
