// src/App.tsx
import { useState, useRef } from "react";
import AnnouncementBar from "./components/ui/AnnouncementBar";
import CalculatorContainer from "./components/ui/CalculatorContainer";
import VideoStorageCalculator from "./components/core/VideoStorageCalculator";
import EnhancedFeatureRequirements from "./components/core/EnhancedFeatureRequirements";
import BusinessMetricsSection from "./components/core/BusinessMetricsSection";
import ResultsSection from "./components/core/ResultsSection";
import ComparisonPage from "./components/core/ComparisonPage";
import { calculateTotalFees } from "./utils/feeCalculator";
import { getEligiblePlans } from "./utils/planEligibility";
import Footer from "./components/ui/Footer";
import type { Features } from "./utils/planEligibility";
import type { Metrics } from "./components/core/BusinessMetricsSection";

interface FeeBreakdown {
  monthlySubscription: number;
  annualSubscription: number;
  processingFees: number;
  physicalPlatformFee?: number;
  digitalPlatformFee: number;
  transactionFees?: number; // Added for the 2% Basic plan transaction fee
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

function App() {
  // Default to 30min for Basic plan
  const [storageValue, setStorageValue] = useState("30min");
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
      features,
      storageValue,
      monthlyPhysical,
      monthlyDigital,
    });

    const results: FeeResult[] = [];

    // Calculate fees for all eligible combinations
    for (const plan of eligibility.plans) {
      for (const processor of filteredProcessors) {
        const fees = calculateTotalFees({
          plan: plan as any,
          monthlyPhysical,
          monthlyDigital,
          physicalTransactions,
          digitalTransactions,
          processorName: processor,
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
            transactionFees: fees.transactionFees,
          },
        });
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
    // Group results by plan, cost, and identical processors
    const resultsByPlanAndCost: Record<string, FeeResult[]> = {};
    
    results.forEach(result => {
      // Create a unique key for this plan and cost
      const key = `${result.plan}-${result.monthlyCost.toFixed(2)}`;
      
      if (!resultsByPlanAndCost[key]) {
        resultsByPlanAndCost[key] = [];
      }
      
      resultsByPlanAndCost[key].push(result);
    });
    
    // Convert grouped results to the final format
    const groupedResults: FeeResult[] = [];
    
    Object.values(resultsByPlanAndCost).forEach(group => {
      if (group.length === 1) {
        // Single processor for this plan/cost
        groupedResults.push(group[0]);
      } else {
        // Multiple processors with identical costs - group them
        groupedResults.push({
          ...group[0],
          processors: group.map(r => r.processor),
          isGrouped: true
        });
      }
    });
    
    // Sort results by total cost
    return groupedResults.sort((a, b) => a.monthlyCost - b.monthlyCost);
  };

  const handleReset = () => {
    setStorageValue("30min");
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

  // The main calculator UI - not changing anything about the existing functionality
  const calculatorContent = (
    <>
      <VideoStorageCalculator
        storageValue={storageValue}
        onStorageChange={({ storage }) => setStorageValue(storage)}
      />
      <EnhancedFeatureRequirements
        features={features}
        setFeatures={setFeatures}
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
    </>
  );

  // The comparison view
  const comparisonContent = (
    <ComparisonPage />
  );

  // Updated announcement for the new comparison feature
  const comparisonAnnouncementMessage = "NEW: Compare all Squarespace fees side-by-side with our Fee Comparison tool!";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnnouncementBar message={comparisonAnnouncementMessage} />
      <main className="flex-grow">
        <CalculatorContainer
          comparisonView={comparisonContent}
        >
          {calculatorContent}
        </CalculatorContainer>
      </main>
      <Footer 
        feedbackUrl="https://sqsfeecalculator-feedback.paperform.co/"
        mainSiteUrl="https://kristineneil.com"
        courseUrl="https://resources.kristineneil.com/web-designers-guide-squarespace-payments"
      />
    </div>
  );
}

export default App;