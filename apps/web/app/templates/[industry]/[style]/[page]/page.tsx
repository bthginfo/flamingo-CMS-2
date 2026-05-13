import { notFound } from "next/navigation";
import { TemplatePreviewPage } from "../../../../../components/public/TemplatePreviewPage";
import {
  getTemplateParams,
  getTemplatePreview
} from "../../../../../components/public/template-preview-data";
import { SiteShell } from "../../../../../components/public/SiteShell";
import { getSiteContext } from "../../../../../lib/seed";

export function generateStaticParams() {
  return getTemplateParams().flatMap((params) => {
    const data = getTemplatePreview(params.industry, params.style);
    return data?.pages.map((page) => ({ ...params, page: page.slug })) ?? [];
  });
}

export default function TemplateSubpageRoute({
  params
}: {
  params: { industry: string; style: string; page: string };
}) {
  const data = getTemplatePreview(params.industry, params.style);
  if (!data || !data.pages.some((page) => page.slug === params.page)) {
    notFound();
  }

  const context = getSiteContext("/beispiele") ?? getSiteContext("/") ?? notFound();

  return (
    <SiteShell context={context}>
      <TemplatePreviewPage data={data} pageSlug={params.page} />
    </SiteShell>
  );
}
