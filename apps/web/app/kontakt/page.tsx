import { notFound } from "next/navigation";
import { ContactSection } from "../../components/public/MarketingSections";
import { SiteShell } from "../../components/public/SiteShell";
import { getSiteContext } from "../../lib/seed";

export default function ContactPage() {
  const context = getSiteContext("/kontakt") ?? getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <ContactSection />
    </SiteShell>
  );
}
