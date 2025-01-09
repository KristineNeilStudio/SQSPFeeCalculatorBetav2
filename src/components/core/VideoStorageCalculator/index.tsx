import { BaseSection, SectionTitle } from "../../ui/BaseSection";
import { STORAGE_OPTIONS } from "../../../constants/storageRules";
import React from "react";

interface VideoStorageCalculatorProps {
  planSet: "current" | "new";
  storageValue: string;
  onStorageChange: (data: { storage: string }) => void;
}

const VideoStorageCalculator: React.FC<VideoStorageCalculatorProps> = ({
  planSet,
  storageValue,
  onStorageChange,
}) => {
  const storageOptions = STORAGE_OPTIONS[planSet];

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
          {storageOptions.map((option) => (
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
