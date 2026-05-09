import { notFound } from "next/navigation";
import { sectionDefinitions } from "@flamingo/sections";
import { PageEditorClient } from "../../../../components/admin/PageEditorClient";
import { pages, sections } from "../../../../lib/seed";

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
      library={sectionDefinitions.map((section) => ({
        type: section.type,
        label: section.label,
        description: section.description,
        category: section.category,
        tags: section.tags
      }))}
    />
  );
}
