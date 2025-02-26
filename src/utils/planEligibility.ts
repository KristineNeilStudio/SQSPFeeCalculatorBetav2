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
  // Additional properties that may be used elsewhere in the app
  needsAdvancedAnalytics?: boolean;
  needsCustomCode?: boolean;
  needsShippingLabels?: boolean;
  needsCarrierRates?: boolean;
  [key: string]: boolean | undefined; // Allow for any additional boolean properties
}

interface EligiblePlansParams {
  features: Features;
  storageValue: string;
  monthlyDigital: number;
  monthlyPhysical: number;
}

interface EligiblePlansResult {
  plans: string[];
  requiredFeatures: string[];
  requiresAdvanced: boolean;
  requiresPlus: boolean;
  requiresCore: boolean;
}

// Features that require Plus or Advanced
const PLUS_TIER_FEATURES = [
  "needsCommerceAPI"
] as const;

// Features that require Core, Plus, or Advanced
const CORE_TIER_FEATURES = [
  "needsAbandonedCart",
  "needsAdvancedDiscounts",
  "needsPOS",
  "needsProductReviews",
  "needsAdvancedMerchandising"
] as const;

// Map storage values to minimum plan requirements
const STORAGE_PLAN_REQUIREMENTS: Record<string, string[]> = {
  "30min": ["Basic", "Core", "Plus", "Advanced"],
  "5hours": ["Core", "Plus", "Advanced"],
  "50hours": ["Plus", "Advanced"],
  "unlimited": ["Advanced"]
};

export function getEligiblePlans(
  params: EligiblePlansParams
): EligiblePlansResult {
  const { features, storageValue, monthlyPhysical, monthlyDigital } = params;
  const requiredFeatures: string[] = [];
  
  // Check storage requirements first
  const storageBasedPlans = STORAGE_PLAN_REQUIREMENTS[storageValue] || 
    ["Basic", "Core", "Plus", "Advanced"]; // Default to all plans if storage value not recognized

  // Check for features requiring Plus or above
  const requiresPlus = PLUS_TIER_FEATURES.some(
    (feature) => features[feature as keyof Features]
  );

  if (requiresPlus) {
    PLUS_TIER_FEATURES.forEach((feature) => {
      if (features[feature as keyof Features]) {
        requiredFeatures.push(feature);
      }
    });
  }

  // Check for features requiring Core or above
  const requiresCore = CORE_TIER_FEATURES.some(
    (feature) => features[feature as keyof Features]
  );

  if (requiresCore) {
    CORE_TIER_FEATURES.forEach((feature) => {
      if (features[feature as keyof Features]) {
        requiredFeatures.push(feature);
      }
    });
  }

  // Determine eligible plans based on feature requirements
  let featureBasedPlans: string[];
  if (requiresPlus) {
    featureBasedPlans = ["Plus", "Advanced"];
  } else if (requiresCore) {
    featureBasedPlans = ["Core", "Plus", "Advanced"];
  } else {
    featureBasedPlans = ["Basic", "Core", "Plus", "Advanced"];
  }

  // Final plans are the intersection of storage-based and feature-based plans
  const plans = storageBasedPlans.filter(plan => 
    featureBasedPlans.includes(plan)
  );

  return {
    plans,
    requiredFeatures,
    requiresAdvanced: storageValue === "unlimited",
    requiresPlus: storageValue === "50hours" || requiresPlus,
    requiresCore: storageValue === "5hours" || requiresCore
  };
}