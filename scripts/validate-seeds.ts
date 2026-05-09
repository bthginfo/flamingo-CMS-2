import { getSectionDefinition } from "@flamingo/sections";
import { pages, sections } from "../apps/web/lib/seed";

const errors: string[] = [];

for (const section of sections) {
  const page = pages.find((item) => item.id === section.pageId);
  if (!page) {
    errors.push(`${section.id}: missing page ${section.pageId}`);
  }

  const definition = getSectionDefinition(section.type);
  if (!definition) {
    errors.push(`${section.id}: missing section definition ${section.type}`);
    continue;
  }

  const parsed = definition.schema.safeParse(section.data);
  if (!parsed.success) {
    errors.push(`${section.id}: invalid seed data`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${pages.length} pages and ${sections.length} seeded sections.`);
