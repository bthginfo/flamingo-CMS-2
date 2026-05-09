import { createFormSubmissionInputSchema, type FormSubmission } from "@flamingo/cms-core";
import { createDbPublicFormSubmission } from "@flamingo/db/form-repository";
import { createPublicFormSubmission as createMemoryPublicFormSubmission } from "./cms-store";
import { showcaseTenant } from "./seed";

type PublicSubmissionResult = {
  submission: FormSubmission;
  successMessage: string;
};

export async function createPublicFormSubmission(
  formKey: string,
  input: unknown
): Promise<PublicSubmissionResult> {
  if (!process.env.DATABASE_URL) {
    return createMemoryPublicFormSubmission(formKey, input);
  }

  const parsed = createFormSubmissionInputSchema.parse(input);
  const { submission, successMessage } = await createDbPublicFormSubmission({
    tenantSlug: showcaseTenant.slug,
    formKey,
    data: parsed.data,
    sourcePage: parsed.sourcePage
  });

  return {
    submission: {
      id: submission.id,
      tenantId: submission.tenantId,
      formId: submission.formId,
      data: parsed.data,
      sourcePage: submission.sourcePage ?? undefined,
      status: "new",
      createdAt: submission.createdAt
    },
    successMessage
  };
}
