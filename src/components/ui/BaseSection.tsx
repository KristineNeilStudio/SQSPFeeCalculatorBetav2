// src/components/ui/BaseSection.tsx
export const BaseSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-lg shadow-calculator p-6 mb-8 ${className}`}
  >
    {children}
  </div>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-primary-darkest mb-6">
    {children}
  </h2>
);

export const SubsectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="text-sm font-semibold text-primary-darkest border-l-2 border-accent-red pl-2 mb-2">
    {children}
  </div>
);

export const MoneyDisplay = ({
  amount,
  size = "normal",
}: {
  amount: number;
  size?: "normal" | "large";
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

export const CalculateButton = ({
  onClick,
  disabled,
  loading,
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
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

export const RecommendedFlag = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div
    className="absolute -top-px right-6 bg-accent-red text-white px-3 py-1.5 
                    text-xs font-semibold tracking-wider rounded-b-lg shadow-calculator"
  >
    {children}
  </div>
);
