import { NextResponse } from "next/server";
import { z } from "zod";
import { authErrorResponse, requireAdminMutation } from "../../../../../../lib/auth";
import { updateFormSubmissionStatus } from "../../../../../../lib/cms-store";

const updateSubmissionSchema = z.object({
  status: z.enum(["new", "read", "archived"])
});

export async function PATCH(
  request: Request,
  { params }: { params: { submissionId: string } }
) {
  try {
    const session = requireAdminMutation(request, "forms:read");
    const parsed = updateSubmissionSchema.parse(await request.json());
    const submission = updateFormSubmissionStatus(session.user, params.submissionId, parsed.status);
    return NextResponse.json({ submission });
  } catch (error) {
    return authErrorResponse(error);
  }
}
