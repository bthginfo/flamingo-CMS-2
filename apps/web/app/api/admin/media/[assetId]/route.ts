import { NextResponse } from "next/server";
import { z } from "zod";
import { authErrorResponse, requireAdminMutation } from "../../../../../lib/auth";
import { updateMediaAsset } from "../../../../../lib/cms-store";

const updateMediaSchema = z.object({
  alt: z.string().optional(),
  caption: z.string().optional(),
  focalPointX: z.number().int().min(0).max(100).optional(),
  focalPointY: z.number().int().min(0).max(100).optional(),
  tags: z.array(z.string()).optional()
});

export async function PATCH(
  request: Request,
  { params }: { params: { assetId: string } }
) {
  try {
    const session = requireAdminMutation(request, "media:upload");
    const parsed = updateMediaSchema.parse(await request.json());
    const asset = updateMediaAsset(session.user, params.assetId, parsed);
    return NextResponse.json({ asset });
  } catch (error) {
    return authErrorResponse(error);
  }
}
