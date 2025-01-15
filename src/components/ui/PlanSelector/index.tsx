import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface PlanSelectorProps {
  planSet: "current" | "new";
  setPlanSet: (plan: "current" | "new") => void;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ planSet, setPlanSet }) => {
  const [showLegacy, setShowLegacy] = useState(false);

  // Set default selection to "new" when component mounts
  React.useEffect(() => {
    if (planSet !== "new") {
      setPlanSet("new");
    }
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Squarespace Plan Options
      </h3>

      {/* Main plan option - always visible */}
      <div className="block p-4 mb-4 border border-accent-red rounded-lg bg-accent-redLight bg-opacity-5">
        <div className="flex items-start gap-3">
          <input
            type="radio"
            id="new"
            name="planSet"
            value="new"
            checked={planSet === "new"}
            onChange={(e) => setPlanSet(e.target.value as "current" | "new")}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="text-base font-semibold text-gray-900 mb-1">
              Current Plans
            </div>
            <div className="text-sm text-gray-600">
              Basic, Core, Plus, Advanced
            </div>
          </div>
        </div>
      </div>

      {/* Legacy plan toggle */}
      <button
        onClick={() => setShowLegacy(!showLegacy)}
        className="w-full flex items-center justify-between p-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <span>Looking for legacy plans?</span>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            showLegacy ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Legacy plan option - collapsible */}
      {showLegacy && (
        <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-start gap-3">
            <input
              type="radio"
              id="current"
              name="planSet"
              value="current"
              checked={planSet === "current"}
              onChange={(e) => setPlanSet(e.target.value as "current" | "new")}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="text-base font-semibold text-gray-900 mb-1">
                Legacy Plans (Prior to 2025)
              </div>
              <div className="text-sm text-gray-600">
                Personal, Business, Basic Commerce, Advanced Commerce
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSelector;
