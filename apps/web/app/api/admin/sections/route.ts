import { NextResponse } from "next/server";
import { sectionDefinitions } from "@flamingo/sections";
import { authErrorResponse, requireAdminSession } from "../../../../lib/auth";

export async function GET() {
  try {
    requireAdminSession("content:update");
    return NextResponse.json({
      sections: sectionDefinitions.map((section) => ({
        type: section.type,
        label: section.label,
        description: section.description,
        category: section.category,
        tags: section.tags,
        adminFields: section.adminFields,
        isPremium: section.isPremium ?? false,
        isSystem: section.isSystem ?? false
      }))
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}
