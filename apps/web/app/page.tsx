import { notFound } from "next/navigation";
import { PageRenderer } from "../components/public/PageRenderer";
import { SiteShell } from "../components/public/SiteShell";
import { DeviceShowcase, PricingSection, ProcessSection } from "../components/public/MarketingSections";
import { AdminDemoShowcase, TemplateShowcase } from "../components/public/TemplateShowcase";
import { getSiteContext } from "../lib/seed";

export default function ShowcasePage() {
  const context = getSiteContext("/");
  if (!context) {
    notFound();
  }

  return (
    <SiteShell context={context}>
      <PageRenderer context={context} />
      <TemplateShowcase compact />
      <DeviceShowcase />
      <AdminDemoShowcase />
      <ProcessSection />
      <PricingSection />
    </SiteShell>
  );
}
