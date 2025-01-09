// src/utils/feeCalculator.ts

type ProcessorName = "Squarespace Payments" | "Stripe" | "PayPal";
type PlanName =
  | "Business"
  | "Basic Commerce"
  | "Advanced Commerce"
  | "Core"
  | "Plus"
  | "Advanced";
type DpPlanName = "Starter" | "Core" | "Pro";

interface PlanPricingStructure {
  monthly: number;
  annual: number;
  digitalFee?: number;
  physicalFee?: number;
}

interface FeeCalculationParams {
  plan: PlanName;
  dpPlan?: DpPlanName;
  monthlyPhysical: number;
  monthlyDigital: number;
  physicalTransactions: number;
  digitalTransactions: number;
  processorName: ProcessorName;
  planSet: "current" | "new";
}

interface FeeResult {
  monthlySubscription: number;
  annualSubscription: number;
  processingFees: number;
  digitalPlatformFees: number;
  physicalPlatformFees: number;
  dpPlanFee: number;
  monthlyCost: number;
  annualCost: number;
}

const PLAN_PRICING: {
  current: Record<
    "Business" | "Basic Commerce" | "Advanced Commerce",
    PlanPricingStructure
  >;
  new: Record<"Core" | "Plus" | "Advanced", PlanPricingStructure>;
} = {
  current: {
    Business: { monthly: 36, annual: 23, physicalFee: 0.03, digitalFee: 0.09 },
    "Basic Commerce": {
      monthly: 40,
      annual: 28,
      physicalFee: 0,
      digitalFee: 0.09,
    },
    "Advanced Commerce": {
      monthly: 72,
      annual: 52,
      physicalFee: 0,
      digitalFee: 0.09,
    },
  },
  new: {
    Core: { monthly: 36, annual: 23, digitalFee: 0.05 },
    Plus: { monthly: 56, annual: 39, digitalFee: 0.01 },
    Advanced: { monthly: 139, annual: 99, digitalFee: 0 },
  },
};

const DP_PLANS: Record<
  DpPlanName,
  {
    monthly: number;
    annual: number;
    platformFee: number;
  }
> = {
  Starter: { monthly: 12, annual: 9, platformFee: 0.07 },
  Core: { monthly: 37, annual: 29, platformFee: 0.03 },
  Pro: { monthly: 111, annual: 89, platformFee: 0 },
};

const PROCESSORS: Record<
  ProcessorName,
  {
    transactionFee: number;
    getRate: (planName: PlanName, isNewPlan: boolean) => number;
  }
> = {
  "Squarespace Payments": {
    transactionFee: 0.3,
    getRate: (planName, isNewPlan) => {
      if (isNewPlan) {
        switch (planName) {
          case "Plus":
            return 0.027;
          case "Advanced":
            return 0.025;
          default:
            return 0.029;
        }
      }
      return 0.029;
    },
  },
  Stripe: {
    transactionFee: 0.3,
    getRate: () => 0.029,
  },
  PayPal: {
    transactionFee: 0.49,
    getRate: () => 0.0349,
  },
};

export function calculateTotalFees(params: FeeCalculationParams): FeeResult {
  const {
    plan,
    dpPlan,
    monthlyPhysical,
    monthlyDigital,
    physicalTransactions,
    digitalTransactions,
    processorName,
    planSet,
  } = params;

  // Get base plan pricing
  const planPricing =
    planSet === "current"
      ? PLAN_PRICING.current[plan as keyof typeof PLAN_PRICING.current]
      : PLAN_PRICING.new[plan as keyof typeof PLAN_PRICING.new];

  // Calculate processing fees
  const processingFees = calculateProcessingFees(
    monthlyPhysical,
    monthlyDigital,
    physicalTransactions,
    digitalTransactions,
    processorName,
    plan,
    planSet
  );

  // Calculate platform fees
  let digitalPlatformFees = 0;
  let physicalPlatformFees = 0;
  let dpPlanFee = 0;

  if (planSet === "current") {
    // Handle physical platform fees (only for Business plan)
    if (plan === "Business") {
      physicalPlatformFees = monthlyPhysical * (planPricing.physicalFee || 0);
    }

    // Handle digital platform fees
    if (monthlyDigital > 0) {
      if (dpPlan) {
        // Use DP plan rate
        const dpPlanInfo = DP_PLANS[dpPlan];
        dpPlanFee = dpPlanInfo.monthly;
        digitalPlatformFees = monthlyDigital * dpPlanInfo.platformFee;
      } else {
        // Use base plan rate
        digitalPlatformFees = monthlyDigital * (planPricing.digitalFee || 0);
      }
    }
  } else {
    // New plans have digital platform fees built into the plan
    digitalPlatformFees = monthlyDigital * (planPricing.digitalFee || 0);
  }

  const monthlyCost = Number(
    (
      planPricing.monthly +
      processingFees +
      digitalPlatformFees +
      physicalPlatformFees +
      dpPlanFee
    ).toFixed(2)
  );

  const annualCost = Number(
    (
      planPricing.annual * 12 +
      processingFees * 12 +
      digitalPlatformFees * 12 +
      physicalPlatformFees * 12 +
      dpPlanFee * 12
    ).toFixed(2)
  );

  return {
    monthlySubscription: planPricing.monthly,
    annualSubscription: planPricing.annual,
    processingFees,
    digitalPlatformFees,
    physicalPlatformFees,
    dpPlanFee,
    monthlyCost,
    annualCost,
  };
}

function calculateProcessingFees(
  monthlyPhysical: number,
  monthlyDigital: number,
  physicalTransactions: number,
  digitalTransactions: number,
  processorName: ProcessorName,
  planName: PlanName,
  planSet: "current" | "new"
): number {
  const processor = PROCESSORS[processorName];
  const processingRate = processor.getRate(planName, planSet === "new");
  const totalVolume = monthlyPhysical + monthlyDigital;
  const totalTransactions = physicalTransactions + digitalTransactions;

  const ratePortion = Number((totalVolume * processingRate).toFixed(2));
  const transactionPortion = Number(
    (totalTransactions * processor.transactionFee).toFixed(2)
  );

  return Number((ratePortion + transactionPortion).toFixed(2));
}
