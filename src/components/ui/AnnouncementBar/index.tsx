import React from 'react';

interface AnnouncementBarProps {
  message?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "Feb 2025 Updates: Updated all plan features to match Squarespace's latest update",
}) => {
  // Add this flag to temporarily hide the comparison announcement
  const temporarilyHideComparison = true;
  
  // Use the default message when comparison is hidden,
  // otherwise use the provided message (which might be about comparison)
  const displayMessage = temporarilyHideComparison 
    ? "Feb 2025 Updates: Updated all plan features to match Squarespace's latest update" 
    : message;

  return (
    <div className="bg-accent-redLight text-accent-red py-3 px-4 text-center relative z-50 flex justify-center items-center shadow-sm mb-4">
      <span className="text-sm font-medium font-body">{displayMessage}</span>
    </div>
  );
};

export default AnnouncementBar;