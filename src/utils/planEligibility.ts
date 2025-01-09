// src/utils/planEligibility.ts

export interface Features {
  needsSubscriptions: boolean;
  needsAbandonedCart: boolean;
  needsAdvancedShipping: boolean;
  sellsDigitalProducts: boolean;
  needsPOS: boolean;
  needsProductReviews: boolean;
  needsAdvancedMerchandising: boolean;
  needsLimitedAvailability: boolean;
  needsAdvancedDiscounts: boolean;
  needsCommerceAPI: boolean;
}

interface EligiblePlansParams {
  planSet: "current" | "new";
  features: Features;
  storageValue: string;
  monthlyDigital: number;
  monthlyPhysical: number;
}

interface EligiblePlansResult {
  plans: string[];
  requiredFeatures: string[];
  dpPlanRequired: boolean;
  minDpPlan?: "Starter" | "Core" | "Pro";
  requiresAdvanced: boolean;
}

const TIER_1_FEATURES = [
  "needsSubscriptions",
  "needsAbandonedCart",
  "needsAdvancedShipping",
  "needsAdvancedDiscounts",
  "needsCommerceAPI",
] as const;

const TIER_2_FEATURES = [
  "needsPOS",
  "needsProductReviews",
  "needsAdvancedMerchandising",
  "needsLimitedAvailability",
] as const;

// Revenue threshold for recommending business plan
const LOW_REVENUE_THRESHOLD = 100;

export function getEligiblePlans(
  params: EligiblePlansParams
): EligiblePlansResult {
  if (params.planSet === "current") {
    return getOldPlanEligibility(params);
  } else {
    return getNewPlanEligibility(params.storageValue);
  }
}

function getOldPlanEligibility({
  features,
  storageValue,
  monthlyPhysical,
  monthlyDigital,
}: Omit<EligiblePlansParams, "planSet">): EligiblePlansResult {
  const requiredFeatures: string[] = [];
  const totalRevenue = monthlyPhysical + monthlyDigital;

  // Check for features requiring Advanced Commerce
  const requiresAdvanced = TIER_1_FEATURES.some(
    (feature) => features[feature as keyof Features]
  );

  if (requiresAdvanced) {
    TIER_1_FEATURES.forEach((feature) => {
      if (features[feature as keyof Features]) {
        requiredFeatures.push(feature);
      }
    });
  }

  // If not already forced to Advanced, check Basic Commerce features
  let requiresBasic = false;
  if (!requiresAdvanced) {
    requiresBasic = TIER_2_FEATURES.some(
      (feature) => features[feature as keyof Features]
    );
    if (requiresBasic) {
      TIER_2_FEATURES.forEach((feature) => {
        if (features[feature as keyof Features]) {
          requiredFeatures.push(feature);
        }
      });
    }
  }

  // Determine if DP plan is needed based on storage OR digital sales
  const minDpPlan = getMinimumDpPlan(storageValue);
  const needsDpPlanForStorage =
    storageValue !== "none" && storageValue !== "30-mins";
  const needsDpPlanForSales =
    monthlyDigital > 0 && totalRevenue > LOW_REVENUE_THRESHOLD;
  const needsDpPlan = needsDpPlanForStorage || needsDpPlanForSales;

  // Determine eligible plans
  let plans: string[];

  // Determine eligible plans based ONLY on features and sales volume
  if (requiresAdvanced) {
    plans = ["Advanced Commerce"];
  } else if (requiresBasic) {
    plans = ["Basic Commerce", "Advanced Commerce"];
  } else if (totalRevenue <= LOW_REVENUE_THRESHOLD) {
    plans = ["Business", "Basic Commerce", "Advanced Commerce"];
  } else {
    plans = ["Basic Commerce", "Advanced Commerce"];
  }

  return {
    plans,
    requiredFeatures,
    dpPlanRequired: needsDpPlan,
    minDpPlan,
    requiresAdvanced,
  };
}

function getNewPlanEligibility(storageValue: string): EligiblePlansResult {
  switch (storageValue) {
    case "50+":
      return {
        plans: ["Advanced"],
        requiredFeatures: [],
        dpPlanRequired: false,
        requiresAdvanced: false,
      };
    case "5-50":
      return {
        plans: ["Plus", "Advanced"],
        requiredFeatures: [],
        dpPlanRequired: false,
        requiresAdvanced: false,
      };
    default:
      return {
        plans: ["Core", "Plus", "Advanced"],
        requiredFeatures: [],
        dpPlanRequired: false,
        requiresAdvanced: false,
      };
  }
}

function getMinimumDpPlan(
  storageValue: string
): "Starter" | "Core" | "Pro" | undefined {
  switch (storageValue) {
    case "50+":
      return "Pro";
    case "10-50":
      return "Core";
    case "0.5-10":
      return "Starter";
    default:
      return undefined;
  }
}
