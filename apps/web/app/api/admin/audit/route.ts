import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminSession } from "../../../../lib/auth";
import { listAuditLogs } from "../../../../lib/cms-store";

export async function GET() {
  try {
    const session = requireAdminSession("content:update");
    return NextResponse.json({ auditLogs: listAuditLogs(session.user) });
  } catch (error) {
    return authErrorResponse(error);
  }
}
