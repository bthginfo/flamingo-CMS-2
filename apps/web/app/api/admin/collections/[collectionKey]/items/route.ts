import { NextResponse } from "next/server";
import { authErrorResponse, requireAdminMutation, requireAdminSession } from "../../../../../../lib/auth";
import { createCollectionItem, listCollection } from "../../../../../../lib/cms-store";

export async function GET(
  _request: Request,
  { params }: { params: { collectionKey: string } }
) {
  try {
    const session = requireAdminSession("content:update");
    const collection = listCollection(session.user, params.collectionKey);

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json({ items: collection.items });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { collectionKey: string } }
) {
  try {
    const session = requireAdminMutation(request, "content:update");
    const item = createCollectionItem(session.user, params.collectionKey, await request.json());
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return authErrorResponse(error);
  }
}
