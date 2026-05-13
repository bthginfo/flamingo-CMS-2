import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminSession } from "../../../../../lib/auth";
import { exportFormSubmissionsCsv } from "../../../../../lib/cms-store";

export async function GET() {
  try {
    const session = requireAdminSession("forms:read");
    return new NextResponse(exportFormSubmissionsCsv(session.user), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=form-submissions.csv"
      }
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
