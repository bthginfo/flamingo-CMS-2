import { AdminDemoShowcase, TemplateShowcase } from "../../components/public/TemplateShowcase";
import { SiteShell } from "../../components/public/SiteShell";
import { getSiteContext } from "../../lib/seed";
import { notFound } from "next/navigation";

export default function ExamplesPage() {
  const context = getSiteContext("/beispiele") ?? getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <TemplateShowcase />
      <AdminDemoShowcase />
    </SiteShell>
  );
}
