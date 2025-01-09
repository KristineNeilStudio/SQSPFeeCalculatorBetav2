import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FeeBreakdown {
  monthlySubscription: number;
  annualSubscription: number;
  monthlyDpPlan?: number;
  annualDpPlan?: number;
  processingFees: number;
  physicalPlatformFee?: number;
  digitalPlatformFee: number;
}

interface FeeResult {
  plan: string;
  dpPlan?: string;
  processor: string;
  processors?: string[];
  isGrouped?: boolean;
  monthlyCost: number;
  annualCost: number;
  breakdown: FeeBreakdown;
}

interface ResultCardProps {
  result: FeeResult;
  isRecommended?: boolean;
  isAlternative?: boolean;
}

const formatCurrency = (amount: number | undefined): string => {
  return (amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  isRecommended,
  isAlternative,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const totalAnnualSavings = result.monthlyCost * 12 - result.annualCost;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border ${
        isRecommended
          ? "border-accent-red bg-accent-redLight/5"
          : "border-ui-border"
      } pt-8 px-6 pb-6 relative`}
    >
      {/* Recommendation Flag */}
      {(isRecommended || isAlternative) && (
        <div className="absolute -top-px right-0 bg-primary-darkest text-white px-4 py-2 text-sm font-medium rounded-bl-lg">
          {isRecommended ? "Top Recommendation" : "Next Best Alternative"}
        </div>
      )}

      {/* Plan Name and Basic Info */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary-darkest mb-2">
          {result.plan}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(result.isGrouped
            ? result.processors || []
            : [result.processor]
          ).map((processor) => (
            <span
              key={processor}
              className="px-2 py-1 text-xs bg-gray-100 text-primary-medium rounded-md border border-gray-200"
            >
              {processor}
            </span>
          ))}
        </div>

        <div className="flex items-baseline">
          <span className="font-mono text-3xl font-semibold">
            ${formatCurrency(result.monthlyCost)}
          </span>
          <span className="text-sm text-primary-medium ml-1">/mo</span>
        </div>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-sm text-primary-medium hover:text-primary-darkest flex items-center gap-1"
      >
        {showDetails ? "Hide Details" : "View Fee Breakdown"}
        <ChevronRight
          className={`w-4 h-4 transition-transform duration-200 ${
            showDetails ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Expandable Details */}
      {showDetails && (
        <div className="mt-6 pt-6 border-t border-ui-border space-y-6">
          {/* Monthly Costs */}
          <div>
            <h4 className="font-medium mb-3">Monthly Costs</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-medium">Base Subscription</span>
                <span className="font-mono w-24 text-right">
                  ${formatCurrency(result.breakdown.monthlySubscription)}
                </span>
              </div>
              {result.breakdown.monthlyDpPlan !== undefined && (
                <div className="flex justify-between">
                  <span className="text-primary-medium">
                    Digital Products Subscription
                  </span>
                  <span className="font-mono w-24 text-right">
                    ${formatCurrency(result.breakdown.monthlyDpPlan)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-primary-medium">
                  Physical Product Platform Fee
                </span>
                <span className="font-mono w-24 text-right">
                  ${formatCurrency(result.breakdown.physicalPlatformFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-medium">
                  Digital Product Platform Fee
                </span>
                <span className="font-mono w-24 text-right">
                  ${formatCurrency(result.breakdown.digitalPlatformFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-medium">Processing Fees</span>
                <span className="font-mono w-24 text-right">
                  ${formatCurrency(result.breakdown.processingFees)}
                </span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-ui-border">
                <span>Monthly Total</span>
                <span className="font-mono w-24 text-right">
                  ${formatCurrency(result.monthlyCost)}
                </span>
              </div>
            </div>
          </div>

          {/* Annual Savings */}
          {totalAnnualSavings > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Annual Billing Savings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                  <span className="text-primary-medium">
                    Monthly Billing Total
                  </span>
                  <div className="font-mono text-right">
                    ${formatCurrency(result.monthlyCost)} × 12 = $
                    {formatCurrency(result.monthlyCost * 12)}
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-primary-medium shrink-0">
                    Annual Savings
                  </span>
                  <span className="font-mono text-accent-red whitespace-nowrap ml-4">
                    - ${formatCurrency(totalAnnualSavings)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline font-medium pt-2 border-t border-gray-200">
                  <span className="shrink-0">Annual Billing Total</span>
                  <span className="font-mono whitespace-nowrap ml-4">
                    ${formatCurrency(result.annualCost)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
