import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminSession } from "../../../../lib/auth";
import { listForms, listFormSubmissions } from "../../../../lib/cms-store";

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
