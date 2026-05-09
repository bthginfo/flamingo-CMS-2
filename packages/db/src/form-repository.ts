import { and, eq } from "drizzle-orm";
import { formDefinitions, formSubmissions, tenants } from "./index";
import { getDatabase } from "./client";

export async function createDbPublicFormSubmission({
  tenantSlug,
  formKey,
  data,
  sourcePage
}: {
  tenantSlug: string;
  formKey: string;
  data: Record<string, unknown>;
  sourcePage?: string;
}) {
  const db = getDatabase();
  const [tenant] = await db.select().from(tenants).where(eq(tenants.slug, tenantSlug)).limit(1);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  const [form] = await db
    .select()
    .from(formDefinitions)
    .where(and(eq(formDefinitions.tenantId, tenant.id), eq(formDefinitions.key, formKey)))
    .limit(1);

  if (!form) {
    throw new Error("Form not found");
  }

  const fields = Array.isArray(form.fields) ? form.fields : [];
  for (const field of fields) {
    const definition = field as { name?: string; required?: boolean };
    if (definition.required && definition.name && !data[definition.name]) {
      throw new Error(`Missing required field: ${definition.name}`);
    }
  }

  const [submission] = await db
    .insert(formSubmissions)
    .values({
      tenantId: tenant.id,
      formId: form.id,
      data,
      sourcePage,
      status: "new"
    })
    .returning();

  return {
    submission,
    successMessage: form.successMessage
  };
}
