// src/components/core/ResultsSection/index.tsx
import type { ForwardRefRenderFunction } from "react";
import { forwardRef } from "react";
import { RotateCcw } from "lucide-react";

// Types
interface FeeBreakdown {
  monthlySubscription: number;
  annualSubscription: number;
  processingFees: number;
  physicalPlatformFee?: number;
  digitalPlatformFee: number;
  transactionFees?: number; // Added for Basic plan transaction fee
}

interface FeeResult {
  plan: string;
  processor: string;
  processors?: string[];
  isGrouped?: boolean;
  monthlyCost: number;
  annualCost: number;
  breakdown: FeeBreakdown;
}

interface ResultCardProps {
  result: FeeResult;
  index: number;
}

interface ResultsSectionProps {
  feeResults: FeeResult[] | null;
  onReset: () => void;
}

const formatCurrency = (value: number = 0): string => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ResultCard: React.FC<ResultCardProps> = ({ result, index }) => {
  return (
    <div className="relative">
      <div className="w-full bg-ui-backgroundShade rounded-lg border border-ui-border">
        {(index === 0 || index === 1) && (
          <div className="absolute top-0 right-6 bg-accent-red text-white px-3 py-1.5 text-xs font-semibold tracking-wider rounded-b-lg shadow-sm">
            {index === 0 ? "Top Recommendation" : "Next Best Alternative"}
          </div>
        )}

        <div className="p-6 border-b border-ui-border">
          <h3 className="text-2xl font-bold mb-3 text-primary-darkest font-display tracking-wide">
            {result.plan}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {result.isGrouped ? (
                result.processors?.map((processor) => (
                  <span
                    key={processor}
                    className="px-2 py-0.5 text-xs bg-accent-redLight text-accent-red rounded-lg border border-accent-red tracking-wide"
                  >
                    {processor}
                  </span>
                ))
              ) : (
                <span className="px-2 py-0.5 text-xs bg-accent-redLight text-accent-red rounded-lg border border-accent-red tracking-wide">
                  {result.processor}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-ui-backgroundShade border-b border-ui-border">
          <div className="flex items-baseline">
            <span className="text-xl font-semibold font-mono">
              ${formatCurrency(result.monthlyCost)}
            </span>
            <span className="ml-1 text-sm text-primary-medium">/mo</span>
          </div>
        </div>

        <div className="p-6">
          {/* Fixed Costs */}
          <div className="mb-4">
            <div className="text-sm font-medium text-primary-medium mb-2">
              Fixed Costs
            </div>
            <div className="flex justify-between text-sm text-primary-medium py-1">
              <span>Base Subscription</span>
              <span className="font-mono">
                ${formatCurrency(result.breakdown.monthlySubscription)}
              </span>
            </div>
          </div>

          {/* Platform Fees */}
          <div className="mb-4">
            <div className="text-sm font-medium text-primary-medium mb-2">
              Platform Fees
            </div>
            {/* Transaction fees (Basic plan 2%) */}
            {(result.breakdown.transactionFees !== undefined) && (
              <div className="flex justify-between text-sm text-primary-medium py-1">
                <span>Online Store Transaction Fee (2%)</span>
                <span className="font-mono">
                  ${formatCurrency(result.breakdown.transactionFees)}
                </span>
              </div>
            )}
            {/* Always render physical platform fee (even if 0) */}
            <div className="flex justify-between text-sm text-primary-medium py-1">
              <span>Physical Product Platform Fee</span>
              <span className="font-mono">
                ${formatCurrency(result.breakdown.physicalPlatformFee || 0)}
              </span>
            </div>
            {/* Always render digital platform fee (even if 0) */}
            <div className="flex justify-between text-sm text-primary-medium py-1">
              <span>Digital Product Platform Fee</span>
              <span className="font-mono">
                ${formatCurrency(result.breakdown.digitalPlatformFee)}
              </span>
            </div>
          </div>

          {/* Processing Fees */}
          <div className="mb-4">
            <div className="text-sm font-medium text-primary-medium mb-2">
              Processing Fees
            </div>
            <div className="flex justify-between text-sm text-primary-medium py-1">
              <span>Payment Processing</span>
              <span className="font-mono">
                ${formatCurrency(result.breakdown.processingFees)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between pt-4 border-t border-ui-border text-primary-darkest font-semibold">
            <span>Total</span>
            <span>${formatCurrency(result.monthlyCost)}</span>
          </div>
        </div>
      </div>

      {/* Annual Savings Alert */}
      {index === 0 && result.monthlyCost * 12 - result.annualCost > 0 && (
        <div className="-mt-[1px] bg-ui-backgroundShade border border-ui-border border-t-0 rounded-b-lg overflow-hidden">
          <div className="p-6 flex gap-3">
            <div className="p-1.5 bg-accent-red rounded-full border border-accent-red flex-shrink-0 w-5 h-5 flex items-center justify-center">
              <span className="text-xs font-semibold text-white font-mono">
                $
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold text-accent-red tracking-wide mb-1">
                Annual Billing Savings
              </div>
              <div className="text-sm text-primary-darkest leading-relaxed">
                Save $
                {formatCurrency(result.monthlyCost * 12 - result.annualCost)}{" "}
                per year on {result.plan} with annual billing.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsSection: ForwardRefRenderFunction<
  HTMLDivElement,
  ResultsSectionProps
> = ({ feeResults, onReset }, ref) => {
  if (!feeResults) return null;

  const mainResult = feeResults[0];
  const alternativeResult = feeResults.length > 1 ? feeResults[1] : null;

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto">
      <div className="grid gap-6 mb-6 md:grid-cols-[3fr_2fr]">
        <div>
          <ResultCard result={mainResult} index={0} />
        </div>
        {alternativeResult && (
          <div>
            <ResultCard result={alternativeResult} index={1} />
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full text-center py-3 text-primary-medium hover:text-primary-darkest transition-colors flex items-center justify-center gap-1.5 text-sm"
      >
        Start Over
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

const ForwardedResultsSection = forwardRef(ResultsSection);
ForwardedResultsSection.displayName = "ResultsSection";

export type { FeeResult, FeeBreakdown };
export default ForwardedResultsSection;