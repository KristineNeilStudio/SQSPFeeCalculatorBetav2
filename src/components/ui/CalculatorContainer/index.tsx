// src/components/ui/CalculatorContainer/index.tsx
import { useState } from "react";
import { Calculator, BarChart2 } from "lucide-react";

interface CalculatorContainerProps {
  children: React.ReactNode;
  comparisonView?: React.ReactNode;
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  children,
  comparisonView,
}) => {
  const [mode, setMode] = useState<"calculator" | "comparison">("calculator");
  
  // Add this flag to temporarily hide the toggle
  const temporarilyHideToggle = true;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            SQSP FEE CALCULATOR
            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-lg text-xs font-semibold border border-gray-300 tracking-wide">
              BETA
            </span>
          </h2>
          
          {comparisonView && !temporarilyHideToggle && (
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setMode("calculator")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center gap-2 ${
                  mode === "calculator"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <Calculator className="w-4 h-4" />
                Calculator
              </button>
              <button
                onClick={() => setMode("comparison")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center gap-2 ${
                  mode === "comparison"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                Compare All Fees
              </button>
            </div>
          )}
        </div>
        
        {/* Always show calculator mode while toggle is hidden */}
        {temporarilyHideToggle ? children : (mode === "calculator" ? children : comparisonView)}
      </div>
    </main>
  );
};

export default CalculatorContainer;