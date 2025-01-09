import React from "react";
import { BaseSection, SectionTitle } from "../../ui/BaseSection";
import { COMMERCE_FEATURES } from "../../../constants/featureRequirements";

interface Feature {
  id: string;
  label: string;
  description: string;
  minPlan: string;
  processorRestrictions?: string[];
}

interface Features {
  needsSubscriptions: boolean;
  needsAbandonedCart: boolean;
  needsAdvancedShipping: boolean;
  sellsDigitalProducts: boolean;
  needsPOS: boolean;
  needsProductReviews: boolean;
  needsAdvancedMerchandising: boolean;
  needsLimitedAvailability: boolean;
  needsAdvancedDiscounts: boolean;
  needsCommerceAPI: boolean;
}

interface EnhancedFeatureRequirementsProps {
  features: Features;
  setFeatures: (features: Features) => void;
  planSet: "current" | "new";
}

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
> = ({ features, setFeatures, planSet }) => {
  if (planSet !== "current") {
    return null;
  }

  const handleFeatureChange = (featureId: keyof Features, checked: boolean) => {
    setFeatures({
      ...features,
      [featureId]: checked,
    });
  };

  const allFeatures = [
    ...COMMERCE_FEATURES.basic,
    ...COMMERCE_FEATURES.advanced,
  ];

  return (
    <BaseSection>
      <SectionTitle>Optional eCommerce Features</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allFeatures.map((feature: Feature) => (
          <CheckboxOption
            key={feature.id}
            id={feature.id}
            checked={features[feature.id as keyof Features] || false}
            onChange={(e) =>
              handleFeatureChange(
                feature.id as keyof Features,
                e.target.checked
              )
            }
            title={feature.label}
            description={feature.description}
          />
        ))}
      </div>
    </BaseSection>
  );
};

export default EnhancedFeatureRequirements;
