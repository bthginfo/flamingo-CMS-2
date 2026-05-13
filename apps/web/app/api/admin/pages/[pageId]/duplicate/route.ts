import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../../lib/auth";
import { duplicateAdminPage } from "../../../../../../lib/cms-store";

export async function POST(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const page = duplicateAdminPage(session.user, params.pageId);
    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
