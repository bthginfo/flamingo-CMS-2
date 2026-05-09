import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation, requireAdminSession } from "../../../../lib/auth";
import { createMediaAsset, listMediaAssets } from "../../../../lib/cms-store";
import { uploadMediaFile } from "../../../../lib/media-storage";
import { showcaseTenant } from "../../../../lib/seed";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = requireAdminSession("media:upload");
    return NextResponse.json({ assets: listMediaAssets(session.user) });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = requireAdminMutation(request, "media:upload");
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("Missing upload file");
    }

    const uploaded = await uploadMediaFile(file, showcaseTenant.slug);
    const asset = createMediaAsset(session.user, {
      ...uploaded,
      alt: stringValue(formData.get("alt")),
      caption: stringValue(formData.get("caption")),
      tags: []
    });

    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}

function stringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
