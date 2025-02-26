// src/components/core/VideoStorageCalculator/index.tsx
import { BaseSection, SectionTitle } from "../../ui/BaseSection";
import React from "react";

interface StorageOption {
  value: string;
  label: string;
  plans: string[];
}

interface VideoStorageCalculatorProps {
  storageValue: string;
  onStorageChange: (data: { storage: string }) => void;
}

// Updated storage options to include all plans with their corresponding storage limits
const STORAGE_OPTIONS: StorageOption[] = [
  { 
    value: "30min", 
    label: "Up to 30 minutes",
    plans: ["Basic"]
  },
  { 
    value: "5hours", 
    label: "Up to 5 hours", 
    plans: ["Core"] 
  },
  { 
    value: "50hours", 
    label: "Up to 50 hours", 
    plans: ["Plus"] 
  },
  { 
    value: "unlimited", 
    label: "Unlimited", 
    plans: ["Advanced"] 
  },
];

const VideoStorageCalculator: React.FC<VideoStorageCalculatorProps> = ({
  storageValue,
  onStorageChange,
}) => {
  return (
    <BaseSection>
      <SectionTitle>Video Storage Needs</SectionTitle>
      <div>
        <label className="block text-sm font-medium text-primary-medium mb-1">
          How much video content do you plan to host?
        </label>
        <select
          value={storageValue}
          onChange={(e) => onStorageChange({ storage: e.target.value })}
          className="w-full p-2 border border-ui-border rounded-lg text-sm text-primary-medium 
                   bg-white focus:border-accent-red focus:ring-1 focus:ring-accent-red outline-none
                   transition-colors duration-200"
        >
          {STORAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Your storage needs will help determine which plan is right for you.
        </p>
      </div>
    </BaseSection>
  );
};

export default VideoStorageCalculator;