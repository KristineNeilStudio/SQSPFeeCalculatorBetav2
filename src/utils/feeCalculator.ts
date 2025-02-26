// src/utils/feeCalculator.ts

type ProcessorName = "Squarespace Payments" | "Stripe" | "PayPal";
type PlanName = "Basic" | "Core" | "Plus" | "Advanced";

interface PlanPricingStructure {
  monthly: number;
  annual: number;
  digitalFee?: number;
  physicalFee?: number;
  transactionFee?: number; // Added for the 2% Basic plan transaction fee
}

interface FeeCalculationParams {
  plan: PlanName;
  monthlyPhysical: number;
  monthlyDigital: number;
  physicalTransactions: number;
  digitalTransactions: number;
  processorName: ProcessorName;
}

interface FeeResult {
  monthlySubscription: number;
  annualSubscription: number;
  processingFees: number;
  digitalPlatformFees: number;
  physicalPlatformFees: number;
  transactionFees: number; // Added for the 2% Basic plan transaction fee
  monthlyCost: number;
  annualCost: number;
}

const PLAN_PRICING: Record<PlanName, PlanPricingStructure> = {
  Basic: { 
    monthly: 16, 
    annual: 13, 
    digitalFee: 0.10, 
    transactionFee: 0.02 // 2% transaction fee for physical products
  },
  Core: { monthly: 36, annual: 23, digitalFee: 0.05 },
  Plus: { monthly: 56, annual: 39, digitalFee: 0.01 },
  Advanced: { monthly: 139, annual: 99, digitalFee: 0 }
};

const PROCESSORS: Record<
  ProcessorName,
  {
    transactionFee: number;
    getRate: (planName: PlanName) => number;
  }
> = {
  "Squarespace Payments": {
    transactionFee: 0.3,
    getRate: (planName) => {
      switch (planName) {
        case "Plus":
          return 0.027;
        case "Advanced":
          return 0.025;
        default:
          return 0.029;
      }
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
    monthlyPhysical,
    monthlyDigital,
    physicalTransactions,
    digitalTransactions,
    processorName,
  } = params;

  // Get base plan pricing
  const planPricing = PLAN_PRICING[plan];

  // Calculate processing fees
  const processingFees = calculateProcessingFees(
    monthlyPhysical,
    monthlyDigital,
    physicalTransactions,
    digitalTransactions,
    processorName,
    plan
  );

  // Calculate platform fees
  const digitalPlatformFees = monthlyDigital * (planPricing.digitalFee || 0);
  
  // Calculate transaction fees (only applies to Basic plan for physical products)
  const transactionFees = plan === "Basic" 
    ? monthlyPhysical * (planPricing.transactionFee || 0)
    : 0;
  
  const physicalPlatformFees = 0; // No physical platform fees in new plans
  
  const monthlyCost = Number(
    (
      planPricing.monthly +
      processingFees +
      digitalPlatformFees +
      physicalPlatformFees +
      transactionFees
    ).toFixed(2)
  );

  const annualCost = Number(
    (
      planPricing.annual * 12 +
      processingFees * 12 +
      digitalPlatformFees * 12 +
      physicalPlatformFees * 12 +
      transactionFees * 12
    ).toFixed(2)
  );

  return {
    monthlySubscription: planPricing.monthly,
    annualSubscription: planPricing.annual,
    processingFees,
    digitalPlatformFees,
    physicalPlatformFees,
    transactionFees,
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
  planName: PlanName
): number {
  const processor = PROCESSORS[processorName];
  const processingRate = processor.getRate(planName);
  const totalVolume = monthlyPhysical + monthlyDigital;
  const totalTransactions = physicalTransactions + digitalTransactions;

  const ratePortion = Number((totalVolume * processingRate).toFixed(2));
  const transactionPortion = Number(
    (totalTransactions * processor.transactionFee).toFixed(2)
  );

  return Number((ratePortion + transactionPortion).toFixed(2));
}