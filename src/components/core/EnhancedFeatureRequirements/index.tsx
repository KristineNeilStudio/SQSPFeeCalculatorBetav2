// src/components/core/EnhancedFeatureRequirements/index.tsx
import React from "react";
import { BaseSection, SectionTitle } from "../../ui/BaseSection";
import type { Features } from "../../../utils/planEligibility";

// Types
interface Feature {
  id: keyof Features;
  label: string;
  description: string;
  minPlan: string;
  tier: "basic" | "core" | "plus";
}

interface EnhancedFeatureRequirementsProps {
  features: Features;
  // Update the type to accept a React state setter function
  setFeatures: React.Dispatch<React.SetStateAction<Features>>;
}

// Feature definitions
const COMMERCE_FEATURES: Feature[] = [
  {
    id: "needsSubscriptions",
    label: "Subscription Products",
    description: "Sell products on a recurring basis",
    minPlan: "Basic",
    tier: "basic"
  },
  {
    id: "needsAbandonedCart",
    label: "Abandoned Cart Recovery",
    description: "Automatically follow up on abandoned carts",
    minPlan: "Core",
    tier: "core"
  },
  {
    id: "needsAdvancedShipping",
    label: "Advanced Shipping Rules",
    description: "Complex shipping rates and rules",
    minPlan: "Basic",
    tier: "basic"
  },
  {
    id: "sellsDigitalProducts",
    label: "Digital Products",
    description: "Sell digital downloads, courses, or content",
    minPlan: "Basic",
    tier: "basic"
  },
  {
    id: "needsPOS",
    label: "Point of Sale (POS)",
    description: "Sell in-person with Square POS integration",
    minPlan: "Core",
    tier: "core"
  },
  {
    id: "needsProductReviews",
    label: "Product Reviews",
    description: "Allow customers to leave product reviews",
    minPlan: "Core",
    tier: "core"
  },
  {
    id: "needsAdvancedMerchandising",
    label: "Advanced Merchandising",
    description: "Enhanced product presentation tools",
    minPlan: "Core",
    tier: "core"
  },
  {
    id: "needsLimitedAvailability",
    label: "Limited Availability Labels",
    description: "Show stock levels and urgency indicators",
    minPlan: "Basic",
    tier: "basic"
  },
  {
    id: "needsAdvancedDiscounts",
    label: "Advanced Discounts",
    description: "Complex discount rules and promotions",
    minPlan: "Core",
    tier: "core"
  },
  {
    id: "needsCommerceAPI",
    label: "Commerce API Access",
    description: "Programmatic access to commerce functionality",
    minPlan: "Plus",
    tier: "plus"
  },
];

const CheckboxOption: React.FC<{
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
}> = ({ id, checked, onChange, title, description }) => (
  <label
    htmlFor={id}
    className="block p-4 mb-2 border border-ui-border rounded-lg bg-white hover:bg-ui-backgroundShade 
               transition-all duration-200 cursor-pointer shadow-sm hover:shadow-calculator"
  >
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 text-accent-red border-ui-border rounded focus:ring-accent-red"
      />
      <div className="flex-1">
        <div className="font-semibold text-base text-primary-darkest mb-1">
          {title}
        </div>
        <div className="text-sm text-primary-medium">{description}</div>
      </div>
    </div>
  </label>
);

const EnhancedFeatureRequirements: React.FC<
  EnhancedFeatureRequirementsProps
> = ({ features, setFeatures }) => {
  const handleFeatureChange = (featureId: keyof Features, checked: boolean) => {
    setFeatures(prevFeatures => ({
      ...prevFeatures,
      [featureId]: checked,
    }));
  };

  return (
    <BaseSection>
      <SectionTitle>Select Features You Need</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {COMMERCE_FEATURES.map((feature) => (
          <CheckboxOption
            key={feature.id}
            id={String(feature.id)}
            checked={features[feature.id] || false}
            onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
            title={feature.label}
            description={feature.description}
          />
        ))}
      </div>
    </BaseSection>
  );
};

export default EnhancedFeatureRequirements;