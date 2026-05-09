import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../../lib/auth";
import { deleteSection } from "../../../../../../lib/cms-store";

export async function POST(
  request: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const section = deleteSection(session.user, params.sectionId);
    return NextResponse.json({ section });
  } catch (error) {
    return authErrorResponse(error);
  }
}
