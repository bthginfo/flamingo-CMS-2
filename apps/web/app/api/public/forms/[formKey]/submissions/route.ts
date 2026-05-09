import { NextResponse } from "next/server";
import { createPublicFormSubmission } from "../../../../../../lib/public-form-submissions";

export async function POST(
  request: Request,
  { params }: { params: { formKey: string } }
) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json")
      ? await request.json()
      : await formDataPayload(request);
    const result = await createPublicFormSubmission(params.formKey, payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

async function formDataPayload(request: Request) {
  const formData = await request.formData();
  const data: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  return {
    data,
    sourcePage: request.headers.get("referer") ?? undefined
  };
}
