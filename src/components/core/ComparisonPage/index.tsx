// src/components/core/ComparisonPage/index.tsx
import React from 'react';
import FeeComparisonTable from '../FeeComparisonTable';
import FeeImpactGuide from '../FeeImpactGuide';
import FAQSection from '../FAQSection';
import { Calculator } from 'lucide-react';

const ComparisonPage: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Squarespace Fee Comparison */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SQUARESPACE FEE COMPARISON</h2>
        
        {/* Moved understanding content below the title */}
        <p className="text-gray-700 leading-relaxed mb-6">
          Navigating Squarespace's fee structure can be confusing, especially with different plans, 
          payment processors, and product types. This comprehensive guide breaks down all possible fees to help you make informed decisions for your website or your clients.
        </p>
      </div>
    
     {/* Fee Comparison Table */}
     <FeeComparisonTable />

      {/* Fee Impact Guide */}
      <FeeImpactGuide />
      
      
      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default ComparisonPage;