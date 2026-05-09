import type { TenantResolutionResult } from "@flamingo/cms-core";
import { showcaseTenant } from "./seed";

export async function resolveTenantFromRequest(request: Request): Promise<TenantResolutionResult> {
  const host = request.headers.get("host")?.split(":")[0] ?? "localhost";

  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "flamingomedia.online" ||
    host.endsWith(".vercel.app")
  ) {
    return { type: "showcase", tenant: null };
  }

  if (host === "demo.flamingomedia.online") {
    return {
      type: "tenant",
      tenant: showcaseTenant,
      domain: {
        id: "domain_demo",
        tenantId: showcaseTenant.id,
        domain: host,
        type: "preview",
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  }

  return { type: "not_found", tenant: null };
}
