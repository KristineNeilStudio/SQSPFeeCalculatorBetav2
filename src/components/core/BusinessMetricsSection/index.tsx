import React, { useState, useEffect } from "react";
import {
  BaseSection,
  SectionTitle,
  CalculateButton,
} from "../../ui/BaseSection";

export interface Metrics {
  monthlyPhysical: string;
  avgPhysicalOrder: string;
  monthlyDigital: string;
  avgDigitalOrder: string;
}

type ProductType = "physical" | "digital";

interface BusinessMetricsSectionProps {
  metrics: Metrics;
  setMetrics: React.Dispatch<React.SetStateAction<Metrics>>;
  onCalculate: () => void;
  onReset: () => void;
  calculateDisabled: boolean;
}

interface ValidationRule {
  min: number;
  max: number;
  required: boolean;
  message: string;
  requiredMessage?: string;
  relationalMessage?: string;
}

type ValidationRules = Record<keyof Metrics, ValidationRule>;
type ValidationError = Partial<Record<keyof Metrics, string>>;
type TouchedFields = Partial<Record<keyof Metrics, boolean>>;

const validationRules: ValidationRules = {
  monthlyPhysical: {
    min: 0,
    max: 1000000,
    required: false,
    message: "Monthly revenue must be between $0 and $1,000,000",
  },
  avgPhysicalOrder: {
    min: 0.01,
    max: 100000,
    required: true,
    message: "Average order must be between $0.01 and $100,000",
    requiredMessage:
      "Average order value is required when monthly revenue is entered",
    relationalMessage: "Average order cannot be greater than monthly revenue",
  },
  monthlyDigital: {
    min: 0,
    max: 1000000,
    required: false,
    message: "Monthly revenue must be between $0 and $1,000,000",
  },
  avgDigitalOrder: {
    min: 0.01,
    max: 100000,
    required: true,
    message: "Average order must be between $0.01 and $100,000",
    requiredMessage:
      "Average order value is required when monthly revenue is entered",
    relationalMessage: "Average order cannot be greater than monthly revenue",
  },
};

const BusinessMetricsSection: React.FC<BusinessMetricsSectionProps> = ({
  metrics,
  setMetrics,
  onCalculate,
  calculateDisabled,
}) => {
  const [sellsPhysical, setSellsPhysical] = useState(false);
  const [sellsDigital, setSellsDigital] = useState(false);
  const [errors, setErrors] = useState<ValidationError>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  useEffect(() => {
    if (
      !metrics.monthlyPhysical &&
      !metrics.monthlyDigital &&
      !metrics.avgPhysicalOrder &&
      !metrics.avgDigitalOrder
    ) {
      setSellsPhysical(false);
      setSellsDigital(false);
      setTouched({});
      setErrors({});
    }
  }, [metrics]);

  const validateField = (
    field: keyof Metrics,
    value: string,
    dependentValue = 0
  ): string => {
    const rule = validationRules[field];
    if (!rule) return "";

    const numValue = Number(value);

    if (field.startsWith("avg") && dependentValue > 0) {
      if (!value && rule.requiredMessage) return rule.requiredMessage;
    }

    if (value === "") return "";

    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }

    if (numValue < rule.min || numValue > rule.max) {
      return rule.message;
    }

    if (
      field.startsWith("avg") &&
      numValue > dependentValue &&
      rule.relationalMessage
    ) {
      return rule.relationalMessage;
    }

    return "";
  };

  useEffect(() => {
    const newErrors: ValidationError = {};

    if (sellsPhysical) {
      const monthlyPhysical = Number(metrics.monthlyPhysical);
      newErrors.monthlyPhysical = validateField(
        "monthlyPhysical",
        metrics.monthlyPhysical
      );
      newErrors.avgPhysicalOrder = validateField(
        "avgPhysicalOrder",
        metrics.avgPhysicalOrder,
        monthlyPhysical
      );
    }

    if (sellsDigital) {
      const monthlyDigital = Number(metrics.monthlyDigital);
      newErrors.monthlyDigital = validateField(
        "monthlyDigital",
        metrics.monthlyDigital
      );
      newErrors.avgDigitalOrder = validateField(
        "avgDigitalOrder",
        metrics.avgDigitalOrder,
        monthlyDigital
      );
    }

    setErrors(newErrors);
  }, [metrics, sellsPhysical, sellsDigital]);

  const handleMetricsChange = (field: keyof Metrics, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const formattedValue =
      value === "" ? "" : Number(parseFloat(value).toFixed(2)).toString();
    setMetrics((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handleToggleChange = (type: ProductType, checked: boolean) => {
    if (type === "physical") {
      setSellsPhysical(checked);
      if (!checked) {
        handleMetricsChange("monthlyPhysical", "");
        handleMetricsChange("avgPhysicalOrder", "");
        setTouched((prev) => ({
          ...prev,
          monthlyPhysical: false,
          avgPhysicalOrder: false,
        }));
      }
    } else {
      setSellsDigital(checked);
      if (!checked) {
        handleMetricsChange("monthlyDigital", "");
        handleMetricsChange("avgDigitalOrder", "");
        setTouched((prev) => ({
          ...prev,
          monthlyDigital: false,
          avgDigitalOrder: false,
        }));
      }
    }
  };

  const renderInputGroup = (type: ProductType) => {
    const isPhysical = type === "physical";
    const prefix = isPhysical ? "Physical" : "Digital";
    const sells = isPhysical ? sellsPhysical : sellsDigital;
    const monthlyField = `monthly${prefix}` as keyof Metrics;
    const avgOrderField = `avg${prefix}Order` as keyof Metrics;

    if (!sells) return null;

    return (
      <div className="mt-4 pl-8 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Monthly Revenue ($)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={metrics[monthlyField]}
            onChange={(e) => handleMetricsChange(monthlyField, e.target.value)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, [monthlyField]: true }))
            }
            className={`w-full p-2 border rounded-lg text-sm transition-colors duration-200 outline-none ${
              touched[monthlyField] && errors[monthlyField]
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder={`Enter monthly revenue from ${type} products`}
          />
          {touched[monthlyField] && errors[monthlyField] && (
            <p className="text-xs text-red-500 mt-1">{errors[monthlyField]}</p>
          )}
        </div>

        {Number(metrics[monthlyField]) > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Average Order Value ($)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={metrics[avgOrderField]}
              onChange={(e) =>
                handleMetricsChange(avgOrderField, e.target.value)
              }
              onBlur={() =>
                setTouched((prev) => ({ ...prev, [avgOrderField]: true }))
              }
              className={`w-full p-2 border rounded-lg text-sm transition-colors duration-200 outline-none ${
                (touched[avgOrderField] || Number(metrics[monthlyField]) > 0) &&
                errors[avgOrderField]
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              placeholder={`Enter average order value for ${type} products`}
            />
            {(touched[avgOrderField] || Number(metrics[monthlyField]) > 0) &&
              errors[avgOrderField] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[avgOrderField]}
                </p>
              )}
            <p className="text-xs text-gray-500 mt-1">Minimum $0.01</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <BaseSection>
      <SectionTitle>What You Sell & Business Metrics</SectionTitle>

      <div className="flex flex-col gap-6">
        <div className="bg-gray-50 rounded-lg p-4 transition-colors duration-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sellsPhysical}
              onChange={(e) => handleToggleChange("physical", e.target.checked)}
              className="mt-1 w-4 h-4 cursor-pointer"
            />
            <div>
              <div className="font-medium text-gray-900">Physical Products</div>
              <div className="text-xs text-gray-500 mt-1">
                Includes physical items and downloads (available as one-time
                purchases or subscriptions), plus services and gift cards.
              </div>
            </div>
          </label>
          {renderInputGroup("physical")}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 transition-colors duration-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sellsDigital}
              onChange={(e) => handleToggleChange("digital", e.target.checked)}
              className="mt-1 w-4 h-4 cursor-pointer"
            />
            <div>
              <div className="font-medium text-gray-900">Digital Products</div>
              <div className="text-xs text-gray-500 mt-1">
                Includes course pages, monetized blogs, video content, and
                member sites - available as one-time purchases or subscriptions
                with immediate access.
              </div>
            </div>
          </label>
          {renderInputGroup("digital")}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <CalculateButton onClick={onCalculate} disabled={calculateDisabled} />
      </div>
    </BaseSection>
  );
};

export default BusinessMetricsSection;
