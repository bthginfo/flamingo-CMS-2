import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../../lib/auth";
import { duplicateSection } from "../../../../../../lib/cms-store";

export async function POST(
  request: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const section = duplicateSection(session.user, params.sectionId);
    return NextResponse.json({ section }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
