import type { Section, SiteContext } from "@flamingo/cms-core";
import { getSectionDefinition, sectionComponentMap } from "@flamingo/sections";

function MissingSection({ section }: { section: Section }) {
  return (
    <section className="bg-red-50 px-5 py-8 text-red-900">
      Missing section renderer: {section.type}
    </section>
  );
}

function InvalidSection({ section }: { section: Section }) {
  return (
    <section className="bg-amber-50 px-5 py-8 text-amber-900">
      Invalid section data: {section.type}
    </section>
  );
}

export function SectionRenderer({
  section,
  context
}: {
  section: Section;
  context: SiteContext;
}) {
  const definition = getSectionDefinition(section.type);
  if (!definition) {
    return context.preview ? <MissingSection section={section} /> : null;
  }

  const parsed = definition.schema.safeParse(section.data);
  if (!parsed.success) {
    return context.preview ? <InvalidSection section={section} /> : null;
  }

  const Component = sectionComponentMap[section.type as keyof typeof sectionComponentMap];
  if (!Component) {
    return context.preview ? <MissingSection section={section} /> : null;
  }

  return (
    <Component
      data={parsed.data as never}
      design={section.design}
      context={context}
    />
  );
}

export function PageRenderer({ context }: { context: SiteContext }) {
  return (
    <>
      {context.sections
        .filter((section) => section.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <SectionRenderer key={section.id} section={section} context={context} />
        ))}
    </>
  );
}
