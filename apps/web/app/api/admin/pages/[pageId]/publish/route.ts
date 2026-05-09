import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../../lib/auth";
import { publishPage } from "../../../../../../lib/cms-store";

export async function POST(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const session = requireAdminMutation(request, "publish");
    const version = publishPage(session.user, params.pageId);
    return NextResponse.json({ version }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
