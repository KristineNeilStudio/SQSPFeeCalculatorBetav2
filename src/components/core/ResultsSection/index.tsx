// src/components/core/ResultsSection/index.tsx
import React, { forwardRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { groupBy } from 'lodash';
import ResultCard from './ResultCard';

interface ResultsSectionProps {
  feeResults: FeeResult[] | null;
  onReset: () => void;
}

const ResultsSection = forwardRef<HTMLDivElement, ResultsSectionProps>(
  function ResultsSection({ feeResults, onReset }, ref) {
    if (!feeResults) return null;

    const groupedResults = groupBy(
      feeResults,
      (result) => `${result.plan}-${result.dpPlan || "noDp"}-${result.monthlyCost}`
    );

    const consolidatedResults = Object.values(groupedResults)
      .map((group) => ({
        ...group[0],
        processors: group.map((r) => r.processor),
        isGrouped: group.length > 1,
      }))
      .slice(0, 2);

    return (
      <div ref={ref} className="w-full max-w-7xl mx-auto">
        <div className="grid gap-8 mb-8 md:grid-cols-[3fr_2fr]">
          {consolidatedResults.map((result, index) => (
            <div key={`${result.plan}-${index}`}>
              <ResultCard 
                result={result}
                isRecommended={index === 0}
                isAlternative={index === 1}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onReset}
          className="w-full text-center py-3 text-primary-medium hover:text-primary-darkest 
                   transition-colors flex items-center justify-center gap-1.5 text-sm"
        >
          Start Over
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

ResultsSection.displayName = "ResultsSection";

export default ResultsSection;