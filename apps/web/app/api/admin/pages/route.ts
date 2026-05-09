import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation, requireAdminSession } from "../../../../lib/auth";
import { createAdminPage, listAdminPages } from "../../../../lib/cms-store";

export async function GET() {
  try {
    const session = requireAdminSession("content:update");
    return NextResponse.json({ pages: listAdminPages(session.user) });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const page = createAdminPage(session.user, await request.json());
    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
