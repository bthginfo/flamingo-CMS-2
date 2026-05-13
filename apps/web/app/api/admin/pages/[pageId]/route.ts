import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../lib/auth";
import { deleteAdminPage, updateAdminPage } from "../../../../../lib/cms-store";

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

export async function DELETE(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const page = deleteAdminPage(session.user, params.pageId);
    return NextResponse.json({ page });
  } catch (error) {
    return authErrorResponse(error);
  }
}
