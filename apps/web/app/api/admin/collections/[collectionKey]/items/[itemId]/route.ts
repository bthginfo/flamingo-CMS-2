import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation } from "../../../../../../../lib/auth";
import { deleteCollectionItem, updateCollectionItem } from "../../../../../../../lib/cms-store";

export async function PATCH(
  request: Request,
  { params }: { params: { collectionKey: string; itemId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const item = updateCollectionItem(
      session.user,
      params.collectionKey,
      params.itemId,
      await request.json()
    );
    return NextResponse.json({ item });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { collectionKey: string; itemId: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const item = deleteCollectionItem(session.user, params.collectionKey, params.itemId);
    return NextResponse.json({ item });
  } catch (error) {
    return authErrorResponse(error);
  }
}
