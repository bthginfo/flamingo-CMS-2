import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../lib/auth";
import { updateAdminPage } from "../../../../../lib/cms-store";

export async function PATCH(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const page = updateAdminPage(session.user, params.pageId, await request.json());
    return NextResponse.json({ page });
  } catch (error) {
    return authErrorResponse(error);
  }
}
