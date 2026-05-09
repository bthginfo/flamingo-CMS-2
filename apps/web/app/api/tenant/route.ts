import { NextResponse } from "next/server";
import { resolveTenantFromRequest } from "../../../lib/tenant";

export async function GET(request: Request) {
  const result = await resolveTenantFromRequest(request);
  return NextResponse.json(result);
}
