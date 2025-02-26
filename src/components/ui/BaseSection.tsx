// src/components/ui/BaseSection.tsx
import React from 'react';

interface BaseSectionProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

interface SubsectionTitleProps {
  children: React.ReactNode;
}

interface MoneyDisplayProps {
  amount: number;
  size?: "normal" | "large";
}

interface CalculateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface RecommendedFlagProps {
  children: React.ReactNode;
}

export const BaseSection: React.FC<BaseSectionProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-lg shadow-calculator p-6 mb-8 ${className}`}
  >
    {children}
  </div>
);

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-xl font-semibold text-primary-darkest mb-6">
    {children}
  </h2>
);

export const SubsectionTitle: React.FC<SubsectionTitleProps> = ({
  children,
}) => (
  <div className="text-sm font-semibold text-primary-darkest border-l-2 border-accent-red pl-2 mb-2">
    {children}
  </div>
);

export const MoneyDisplay: React.FC<MoneyDisplayProps> = ({
  amount,
  size = "normal",
}) => {
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return size === "large" ? (
    <span className="font-mono text-2xl font-semibold">${formatted}</span>
  ) : (
    <span className="font-mono text-base">${formatted}</span>
  );
};

export const CalculateButton: React.FC<CalculateButtonProps> = ({
  onClick,
  disabled,
  loading,
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`w-full max-w-[320px] px-6 py-3 rounded-lg text-white font-medium text-base 
      transition-all duration-200
      ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-accent-red hover:bg-ui-button hover:scale-[1.02] hover:shadow-hover"
      }`}
  >
    {loading ? "Calculating..." : "Find Plans & Calculate Fees"}
  </button>
);

export const RecommendedFlag: React.FC<RecommendedFlagProps> = ({
  children,
}) => (
  <div
    className="absolute -top-px right-6 bg-accent-red text-white px-3 py-1.5 
                    text-xs font-semibold tracking-wider rounded-b-lg shadow-calculator"
  >
    {children}
  </div>
);