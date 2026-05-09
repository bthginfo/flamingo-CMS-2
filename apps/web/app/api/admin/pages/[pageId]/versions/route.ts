import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminSession } from "../../../../../../lib/auth";
import { listPageVersions } from "../../../../../../lib/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const session = requireAdminSession("content:update");
    return NextResponse.json({ versions: listPageVersions(session.user, params.pageId) });
  } catch (error) {
    return authErrorResponse(error);
  }
}
