import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminSession } from "../../../../../../lib/auth";
import { listMediaAssetUsages } from "../../../../../../lib/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: { assetId: string } }
) {
  try {
    const session = requireAdminSession("media:upload");
    return NextResponse.json({ usages: listMediaAssetUsages(session.user, params.assetId) });
  } catch (error) {
    return authErrorResponse(error);
  }
}
