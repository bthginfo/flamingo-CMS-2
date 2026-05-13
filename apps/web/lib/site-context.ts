import type { SiteContext } from "@flamingo/cms-core";
import { createDrizzleSiteRepository } from "@flamingo/db/site-repository";
import { getSiteContext as getSeedSiteContext } from "./seed";

const DEFAULT_TENANT_SLUG = "flamingomedia";

export async function getPublicSiteContext(path: string, preview = false): Promise<SiteContext | null> {
  if (!process.env.DATABASE_URL) {
    return getSeedSiteContext(path, preview);
  }

  try {
    const repository = createDrizzleSiteRepository();
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG ?? process.env.TENANT_SLUG ?? DEFAULT_TENANT_SLUG;
    return await repository.getSiteContext(tenantSlug, path, preview);
  } catch {
    return getSeedSiteContext(path, preview);
  }
}

export async function getPublicSiteContextOrSeed(path: string, preview = false): Promise<SiteContext | null> {
  return (await getPublicSiteContext(path, preview)) ?? getSeedSiteContext(path, preview);
}
