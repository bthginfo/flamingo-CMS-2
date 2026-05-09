import { NextResponse } from "next/server";
import { getDemoUsers, getSessionFromCookies } from "../../../../lib/auth";

export async function GET() {
  const session = getSessionFromCookies();

  if (!session) {
    return NextResponse.json(
      {
        user: null,
        demoUsers: getDemoUsers()
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: session.user,
    csrfToken: session.csrfToken
  });
}
