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
      
      {/* Calculator Promotion */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Need a personalized recommendation?
        </h3>
        <p className="text-sm text-gray-700">
          If you'd like a custom calculation based on your specific business needs and 
          revenue numbers, switch to <strong>Calculator Mode</strong> using the toggle at the top of the page.
        </p>
      </div>
      
      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default ComparisonPage;