import { describe, expect, it } from "vitest";
import { calculateTirolFunding, getEligibility } from "./index";

describe("Tirol digitalization funding", () => {
  it("marks process-linked digital projects in Tirol as likely", () => {
    expect(
      getEligibility({
        locatedInTirol: true,
        companySize: "small",
        projectType: "booking_system",
        hasProcessConnection: true,
        projectBudget: 20000
      })
    ).toBe("likely");
  });

  it("caps eligible costs by company size", () => {
    expect(
      calculateTirolFunding({
        locatedInTirol: true,
        companySize: "micro",
        projectType: "crm",
        hasProcessConnection: true,
        projectBudget: 50000
      }).estimatedFunding
    ).toBe(5000);
  });
});
