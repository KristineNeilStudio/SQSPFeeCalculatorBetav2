// src/App.tsx
import { useState, useRef } from "react";
import NavigationBar from "./components/ui/NavigationBar";
import AnnouncementBar from "./components/ui/AnnouncementBar";
import CalculatorContainer from "./components/ui/CalculatorContainer";
import VideoStorageCalculator from "./components/core/VideoStorageCalculator";
import PlanSelector from "./components/ui/PlanSelector";
import EnhancedFeatureRequirements from "./components/core/EnhancedFeatureRequirements";
import BusinessMetricsSection from "./components/core/BusinessMetricsSection";
import ResultsSection from "./components/core/ResultsSection";
import { calculateTotalFees } from "./utils/feeCalculator";
import { getEligiblePlans } from "./utils/planEligibility";
import Footer from "./components/ui/Footer";
import type { Features } from "./utils/planEligibility";
import type { Metrics } from "./components/core/BusinessMetricsSection";

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

function App() {
  const [planSet, setPlanSet] = useState<"current" | "new">("new");
  const [storageValue, setStorageValue] = useState("none");
  const [features, setFeatures] = useState<Features>({
    needsSubscriptions: false,
    needsAbandonedCart: false,
    needsAdvancedShipping: false,
    sellsDigitalProducts: false,
    needsPOS: false,
    needsProductReviews: false,
    needsAdvancedMerchandising: false,
    needsLimitedAvailability: false,
    needsAdvancedDiscounts: false,
    needsCommerceAPI: false,
  });

  const [metrics, setMetrics] = useState<Metrics>({
    monthlyPhysical: "",
    avgPhysicalOrder: "",
    monthlyDigital: "",
    avgDigitalOrder: "",
  });

  const [feeResults, setFeeResults] = useState<FeeResult[] | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculateFees = () => {
    const validProcessors = [
      "Squarespace Payments",
      "Stripe",
      "PayPal",
    ] as const;
    const filteredProcessors = features.needsSubscriptions
      ? validProcessors.filter((p) => p !== "PayPal")
      : validProcessors;

    const monthlyPhysical = Number(metrics.monthlyPhysical) || 0;
    const monthlyDigital = Number(metrics.monthlyDigital) || 0;
    const avgPhysicalOrder = Number(metrics.avgPhysicalOrder) || 0.01;
    const avgDigitalOrder = Number(metrics.avgDigitalOrder) || 0.01;

    const physicalTransactions =
      monthlyPhysical > 0
        ? Math.ceil(monthlyPhysical / Math.max(avgPhysicalOrder, 0.01))
        : 0;
    const digitalTransactions =
      monthlyDigital > 0
        ? Math.ceil(monthlyDigital / Math.max(avgDigitalOrder, 0.01))
        : 0;

    const eligibility = getEligiblePlans({
      planSet,
      features,
      storageValue,
      monthlyPhysical,
      monthlyDigital,
    });

    const results: FeeResult[] = [];

    // Calculate fees for all eligible combinations
    for (const plan of eligibility.plans) {
      for (const processor of filteredProcessors) {
        if (planSet === "current") {
          if (eligibility.dpPlanRequired) {
            // If storage requires a specific minimum DP plan level, only calculate those options
            const dpPlans = ["Starter", "Core", "Pro"] as const;
            const validDpPlans = dpPlans.filter((dp) => {
              if (eligibility.minDpPlan) {
                switch (eligibility.minDpPlan) {
                  case "Pro":
                    return dp === "Pro";
                  case "Core":
                    return dp === "Core" || dp === "Pro";
                  case "Starter":
                    return true;
                }
              }
              return true;
            });

            // Ensure we have at least one valid DP plan
            if (validDpPlans.length === 0) {
              // Default to using all DP plans if none match criteria
              validDpPlans.push(...dpPlans);
            }

            for (const dpPlan of validDpPlans) {
              const fees = calculateTotalFees({
                plan: plan as any,
                dpPlan,
                monthlyPhysical,
                monthlyDigital,
                physicalTransactions,
                digitalTransactions,
                processorName: processor,
                planSet,
              });

              results.push({
                plan,
                dpPlan,
                processor,
                monthlyCost: fees.monthlyCost,
                annualCost: fees.annualCost,
                breakdown: {
                  monthlySubscription: fees.monthlySubscription,
                  annualSubscription: fees.annualSubscription,
                  processingFees: fees.processingFees,
                  monthlyDpPlan: fees.dpPlanFee,
                  annualDpPlan: fees.dpPlanFee,
                  physicalPlatformFee: fees.physicalPlatformFees,
                  digitalPlatformFee: fees.digitalPlatformFees,
                },
              });
            }
          } else {
            // Calculate without DP plan
            const fees = calculateTotalFees({
              plan: plan as any,
              monthlyPhysical,
              monthlyDigital,
              physicalTransactions,
              digitalTransactions,
              processorName: processor,
              planSet,
            });

            results.push({
              plan,
              processor,
              monthlyCost: fees.monthlyCost,
              annualCost: fees.annualCost,
              breakdown: {
                monthlySubscription: fees.monthlySubscription,
                annualSubscription: fees.annualSubscription,
                processingFees: fees.processingFees,
                physicalPlatformFee: fees.physicalPlatformFees,
                digitalPlatformFee: fees.digitalPlatformFees,
              },
            });
          }
        } else {
          // New plans don't use DP plans
          const fees = calculateTotalFees({
            plan: plan as any,
            monthlyPhysical,
            monthlyDigital,
            physicalTransactions,
            digitalTransactions,
            processorName: processor,
            planSet,
          });

          results.push({
            plan,
            processor,
            monthlyCost: fees.monthlyCost,
            annualCost: fees.annualCost,
            breakdown: {
              monthlySubscription: fees.monthlySubscription,
              annualSubscription: fees.annualSubscription,
              processingFees: fees.processingFees,
              physicalPlatformFee: fees.physicalPlatformFees,
              digitalPlatformFee: fees.digitalPlatformFees,
            },
          });
        }
      }
    }

    // Sort by monthly cost and group identical costs
    const sortedResults = results.sort((a, b) => a.monthlyCost - b.monthlyCost);
    const groupedResults = groupIdenticalCosts(sortedResults);

    setFeeResults(groupedResults.slice(0, 3));

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const groupIdenticalCosts = (results: FeeResult[]): FeeResult[] => {
    const grouped: FeeResult[] = [];
    let currentGroup: FeeResult[] = [];

    results.forEach((result, index) => {
      if (index === 0) {
        currentGroup = [result];
      } else if (
        result.monthlyCost === currentGroup[0].monthlyCost &&
        result.plan === currentGroup[0].plan &&
        result.dpPlan === currentGroup[0].dpPlan
      ) {
        currentGroup.push(result);
      } else {
        if (currentGroup.length > 0) {
          grouped.push(
            currentGroup.length === 1
              ? currentGroup[0]
              : {
                  ...currentGroup[0],
                  processors: currentGroup.map((r) => r.processor),
                  isGrouped: true,
                }
          );
        }
        currentGroup = [result];
      }
    });

    if (currentGroup.length > 0) {
      grouped.push(
        currentGroup.length === 1
          ? currentGroup[0]
          : {
              ...currentGroup[0],
              processors: currentGroup.map((r) => r.processor),
              isGrouped: true,
            }
      );
    }

    return grouped;
  };

  const handleReset = () => {
    setPlanSet("new");
    setStorageValue("none");
    setFeatures({
      needsSubscriptions: false,
      needsAbandonedCart: false,
      needsAdvancedShipping: false,
      sellsDigitalProducts: false,
      needsPOS: false,
      needsProductReviews: false,
      needsAdvancedMerchandising: false,
      needsLimitedAvailability: false,
      needsAdvancedDiscounts: false,
      needsCommerceAPI: false,
    });
    setMetrics({
      monthlyPhysical: "",
      avgPhysicalOrder: "",
      monthlyDigital: "",
      avgDigitalOrder: "",
    });
    setFeeResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnnouncementBar />
      <NavigationBar />
      <main className="flex-grow">
        <CalculatorContainer>
          <PlanSelector planSet={planSet} setPlanSet={setPlanSet} />
          <VideoStorageCalculator
            planSet={planSet}
            storageValue={storageValue}
            onStorageChange={({ storage }) => setStorageValue(storage)}
          />
          <EnhancedFeatureRequirements
            features={features}
            setFeatures={setFeatures}
            planSet={planSet}
          />
          <BusinessMetricsSection
            metrics={metrics}
            setMetrics={setMetrics}
            onReset={handleReset}
            onCalculate={calculateFees}
            calculateDisabled={
              (!metrics.monthlyPhysical && !metrics.monthlyDigital) || // No revenue entered
              (Number(metrics.monthlyPhysical) > 0 &&
                !metrics.avgPhysicalOrder) || // Physical revenue but no AOV
              (Number(metrics.monthlyDigital) > 0 && !metrics.avgDigitalOrder) // Digital revenue but no AOV
            }
          />
          {feeResults && (
            <ResultsSection
              ref={resultsRef}
              feeResults={feeResults}
              onReset={handleReset}
            />
          )}
        </CalculatorContainer>
      </main>
      <Footer />
    </div>
  );
}

export default App;
