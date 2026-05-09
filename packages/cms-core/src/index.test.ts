import { describe, expect, it } from "vitest";
import { assertTenantScope, can, createPageSnapshot, type Page, type Section } from "./index";

const page: Page = {
  id: "page",
  tenantId: "tenant",
  title: "Test",
  slug: "test",
  fullPath: "/test",
  type: "standard",
  status: "draft",
  isHomepage: false,
  seo: {},
  sortOrder: 0,
  createdBy: "user",
  updatedBy: "user",
  createdAt: new Date("2026-05-09T00:00:00.000Z"),
  updatedAt: new Date("2026-05-09T00:00:00.000Z")
};

const section: Section = {
  id: "section",
  tenantId: "tenant",
  pageId: "page",
  type: "hero",
  order: 0,
  visible: true,
  data: {},
  design: {},
  animation: {},
  createdBy: "user",
  updatedBy: "user",
  createdAt: new Date("2026-05-09T00:00:00.000Z"),
  updatedAt: new Date("2026-05-09T00:00:00.000Z")
};

describe("cms core", () => {
  it("enforces tenant scope", () => {
    expect(() => assertTenantScope(page, "other")).toThrow("Tenant scope violation");
  });

  it("checks role permissions", () => {
    expect(can("tenant_editor", "content:update")).toBe(true);
    expect(can("tenant_editor", "publish")).toBe(false);
  });

  it("creates page snapshots with ordered sections", () => {
    const snapshot = createPageSnapshot(page, [{ ...section, order: 2 }, { ...section, id: "a", order: 1 }]);
    expect(snapshot.sections.map((item) => item.order)).toEqual([1, 2]);
  });
});
