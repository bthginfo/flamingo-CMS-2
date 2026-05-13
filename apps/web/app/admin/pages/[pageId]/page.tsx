import { notFound } from "next/navigation";
import { isSectionAllowedForPage } from "@flamingo/cms-core";
import { sectionDefinitions } from "@flamingo/sections";
import { PageEditorClient } from "../../../../components/admin/PageEditorClient";
import { pages, sections, showcaseTenant } from "../../../../lib/seed";

export default function PageEditor({ params }: { params: { pageId: string } }) {
  const page = pages.find((item) => item.id === params.pageId);
  if (!page) {
    notFound();
  }

  const pageSections = sections
    .filter((section) => section.pageId === page.id)
    .sort((a, b) => a.order - b.order);

  return (
    <PageEditorClient
      page={page}
      initialSections={pageSections}
      library={sectionDefinitions
        .filter((section) => isSectionAllowedForPage(section, showcaseTenant, page))
        .map((section) => ({
          type: section.type,
          label: section.label,
          description: section.description,
          category: section.category,
          tags: section.tags,
          adminFields: section.adminFields
        }))}
    />
  );
}
