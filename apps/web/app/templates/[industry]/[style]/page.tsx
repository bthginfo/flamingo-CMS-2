import { notFound } from "next/navigation";
import { TemplatePreviewPage } from "../../../../components/public/TemplatePreviewPage";
import {
  getTemplateParams,
  getTemplatePreview
} from "../../../../components/public/template-preview-data";
import { SiteShell } from "../../../../components/public/SiteShell";
import { getSiteContext } from "../../../../lib/seed";

export function generateStaticParams() {
  return getTemplateParams();
}

export default function TemplatePreviewRoute({
  params
}: {
  params: { industry: string; style: string };
}) {
  const data = getTemplatePreview(params.industry, params.style);
  if (!data) {
    notFound();
  }

  const context = getSiteContext("/beispiele") ?? getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <TemplatePreviewPage data={data} />
    </SiteShell>
  );
}
