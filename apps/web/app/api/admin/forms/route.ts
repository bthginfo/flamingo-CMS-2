import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation, requireAdminSession } from "../../../../lib/auth";
import { listForms, listFormSubmissions, updateFormDefinition } from "../../../../lib/cms-store";

export async function GET() {
  try {
    const session = requireAdminSession("forms:read");
    return NextResponse.json({
      forms: listForms(session.user),
      submissions: listFormSubmissions(session.user)
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = requireAdminMutation(request, "forms:read");
    const body = await request.json();
    const form = updateFormDefinition(session.user, String(body.formKey ?? ""), body);
    return NextResponse.json({ form });
  } catch (error) {
    return authErrorResponse(error);
  }
}
