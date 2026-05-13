import { describe, expect, it } from "vitest";
import { industries, styles } from "@flamingo/shared";
import {
  assertTenantScope,
  can,
  createPageSnapshot,
  industryMasterSpecs,
  isSectionAllowedForPage,
  masterSectionSpecs,
  masterSpecSummary,
  themeTokenArchitecture,
  type Page,
  type Section
} from "./index";

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

  it("filters sections by industry and page type", () => {
    expect(
      isSectionAllowedForPage(
        {
          type: "hero",
          label: "Hero",
          description: "",
          category: "hero",
          icon: "",
          tags: [],
          schema: {} as never,
          defaultData: {},
          defaultDesign: {},
          defaultAnimation: {},
          adminFields: [],
          allowedPageTypes: ["home"]
        },
        { industry: "hotel" },
        { type: "standard" }
      )
    ).toBe(false);

    expect(
      isSectionAllowedForPage(
        {
          type: "pricing",
          label: "Pricing",
          description: "",
          category: "conversion",
          icon: "",
          tags: [],
          schema: {} as never,
          defaultData: {},
          defaultDesign: {},
          defaultAnimation: {},
          adminFields: [],
          disallowedIndustries: ["wedding"]
        },
        { industry: "wedding" },
        { type: "home" }
      )
    ).toBe(false);
  });
});

describe("premium CMS master spec", () => {
  it("covers every industry and style combination", () => {
    expect(Object.keys(industryMasterSpecs).sort()).toEqual([...industries].sort());
    expect(masterSpecSummary.combinations).toBe(industries.length * styles.length);

    for (const industry of industries) {
      expect(Object.keys(industryMasterSpecs[industry].styleExperiences).sort()).toEqual([...styles].sort());
      expect(industryMasterSpecs[industry].pages.length).toBeGreaterThanOrEqual(3);
      expect(industryMasterSpecs[industry].collections.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("requires structured buttons, media and theme tokens", () => {
    const hero = masterSectionSpecs.find((item) => item.type === "signature_hero");
    expect(hero?.fields.some((field) => field.name === "primaryCta" && field.type === "link")).toBe(true);
    expect(hero?.fields.some((field) => field.name === "media" && field.type === "object")).toBe(true);
    expect(themeTokenArchitecture.primitives.length).toBeGreaterThan(0);
    expect(themeTokenArchitecture.semantic).toContain("cta.background");
    expect(themeTokenArchitecture.components).toContain("button.primary.bg");
  });
});
