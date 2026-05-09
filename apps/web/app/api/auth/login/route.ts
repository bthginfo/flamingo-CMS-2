import { NextResponse } from "next/server";
import { applySessionCookies, authErrorResponse, createSession } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const session = createSession(await request.json());
    const response = NextResponse.json({
      user: session.user,
      csrfToken: session.csrfToken
    });
    applySessionCookies(response, session);
    return response;
  } catch (error) {
    return authErrorResponse(error);
  }
}
