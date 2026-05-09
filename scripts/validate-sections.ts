import { sectionDefinitions } from "@flamingo/sections";

const errors: string[] = [];

for (const definition of sectionDefinitions) {
  const parsed = definition.schema.safeParse(definition.defaultData);
  if (!parsed.success) {
    errors.push(`${definition.type}: defaultData does not match schema`);
  }

  if (definition.adminFields.length === 0) {
    errors.push(`${definition.type}: missing admin fields`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${sectionDefinitions.length} section definitions.`);
