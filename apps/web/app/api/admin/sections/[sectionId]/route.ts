import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../lib/auth";
import { updateAdminSection } from "../../../../../lib/cms-store";

export async function PATCH(
  request: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const section = updateAdminSection(session.user, params.sectionId, await request.json());
    return NextResponse.json({ section });
  } catch (error) {
    return authErrorResponse(error);
  }
}
