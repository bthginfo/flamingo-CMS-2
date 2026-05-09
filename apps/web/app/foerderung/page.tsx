import { notFound } from "next/navigation";
import { PageRenderer } from "../../components/public/PageRenderer";
import { SiteShell } from "../../components/public/SiteShell";
import { getSiteContext } from "../../lib/seed";

export default function FundingPage() {
  const context = getSiteContext("/foerderung");
  if (!context) {
    notFound();
  }

  return (
    <SiteShell context={context}>
      <PageRenderer context={context} />
    </SiteShell>
  );
}
