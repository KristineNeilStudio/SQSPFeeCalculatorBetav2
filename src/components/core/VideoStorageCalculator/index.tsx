// src/components/core/VideoStorageCalculator/index.tsx
import { BaseSection, SectionTitle } from "../../ui/BaseSection";
import React from "react";

interface StorageOption {
  value: string;
  label: string;
}

interface VideoStorageCalculatorProps {
  storageValue: string;
  onStorageChange: (data: { storage: string }) => void;
}

const STORAGE_OPTIONS: StorageOption[] = [
  { value: "none", label: "None (Up to 5 hours included)" },
  { value: "5-50", label: "5-50 hours" },
  { value: "50+", label: "Unlimited" },
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
      </div>
    </BaseSection>
  );
};

export default VideoStorageCalculator;