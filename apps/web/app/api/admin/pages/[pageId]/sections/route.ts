import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../../lib/auth";
import { addSectionToPage } from "../../../../../../lib/cms-store";

export async function POST(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const section = addSectionToPage(session.user, params.pageId, await request.json());
    return NextResponse.json({ section }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
