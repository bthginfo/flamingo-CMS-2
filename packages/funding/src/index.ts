import { z } from "zod";

export const companySizeSchema = z.enum(["micro", "small", "mediumLarge"]);
export const projectTypeSchema = z.enum([
  "website_relaunch",
  "online_shop",
  "booking_system",
  "crm",
  "process_automation",
  "internal_software",
  "online_marketing",
  "social_media",
  "hardware",
  "other"
]);

export type CompanySize = z.infer<typeof companySizeSchema>;
export type ProjectType = z.infer<typeof projectTypeSchema>;
export type EligibilityResult = "likely" | "needs_review" | "unlikely";

export const tirolFundingInputSchema = z.object({
  locatedInTirol: z.boolean(),
  companySize: companySizeSchema,
  projectType: projectTypeSchema,
  hasProcessConnection: z.boolean(),
  projectBudget: z.number().min(0)
});

export type TirolFundingInput = z.infer<typeof tirolFundingInputSchema>;

export const tirolFundingConfig = {
  rates: {
    micro: 0.5,
    small: 0.4,
    mediumLarge: 0.3
  },
  maxEligibleCosts: {
    micro: 10000,
    small: 25000,
    mediumLarge: 50000
  },
  disclaimer:
    "Diese Berechnung ist eine unverbindliche Ersteinschätzung und ersetzt keine Förderberatung. Förderfähigkeit, Förderhöhe und Voraussetzungen hängen von der jeweils gültigen Richtlinie, Unternehmensdaten, Projektinhalt und Einreichzeitpunkt ab."
} as const;

const digitalProjectTypes: ProjectType[] = [
  "online_shop",
  "booking_system",
  "crm",
  "process_automation",
  "internal_software",
  "hardware"
];

export function getEligibility(input: TirolFundingInput): EligibilityResult {
  if (!input.locatedInTirol) {
    return "unlikely";
  }

  if (digitalProjectTypes.includes(input.projectType) && input.hasProcessConnection) {
    return "likely";
  }

  if (input.projectType === "website_relaunch" && input.hasProcessConnection) {
    return "needs_review";
  }

  return "unlikely";
}

export function calculateTirolFunding(input: TirolFundingInput) {
  const parsed = tirolFundingInputSchema.parse(input);
  const eligibleBudget = Math.min(
    parsed.projectBudget,
    tirolFundingConfig.maxEligibleCosts[parsed.companySize]
  );
  const estimatedFunding = Math.round(
    eligibleBudget * tirolFundingConfig.rates[parsed.companySize]
  );

  return {
    eligibility: getEligibility(parsed),
    eligibleBudget,
    estimatedFunding,
    disclaimer: tirolFundingConfig.disclaimer
  };
}
