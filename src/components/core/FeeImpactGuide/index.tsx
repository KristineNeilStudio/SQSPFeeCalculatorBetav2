import React, { useState } from 'react';
import { CheckCircle, CreditCard, ListChecks, ChevronDown, ExternalLink } from 'lucide-react';

const FeeImpactGuide = () => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">FEE IMPACT GUIDE</h2>
      <p className="text-gray-700 mb-6">
      While Squarespace's pricing page shows you which features each plan includes, understanding the financial impact of different choices is what really matters for your bottom line. This guide reveals the hidden fee interactions, strategic upgrade points, and cost-saving opportunities that can significantly reduce what you pay—insights you won't find on the official pricing page.
      </p>
      
      {/* Fee Optimization Strategies - Moved to top as requested */}
      <div className="mb-8">
        <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          Top Fee-Saving Strategies
        </h4>
        
        <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <ul className="space-y-3 text-gray-700 list-disc pl-5">
              <li className="pl-1">
                <p className="text-sm leading-tight">
                  <strong>Annual billing</strong>: Save 20-35% on subscription costs compared to monthly billing (up to $480/year on Advanced plan)
                </p>
              </li>
              
              <li className="pl-1">
                <p className="text-sm leading-tight">
                  <strong>Bundle products</strong>: Increase average order value to reduce the per-transaction fee impact (bundling two $10 items saves one $0.30-0.49 transaction fee)
                </p>
              </li>
              
              <li className="pl-1">
                <p className="text-sm leading-tight">
                  <strong>Optimize digital product sales</strong>: The Plus plan (1% fee) can be more cost-effective than Advanced (0% fee) until you reach $8,300+/month in digital sales
                </p>
              </li>
              
              <li className="pl-1">
                <p className="text-sm leading-tight">
                  <strong>Host video elsewhere</strong>: Use YouTube/Vimeo embeds instead of Squarespace's video hosting to avoid storage-based plan upgrades
                </p>
              </li>
              
              <li className="pl-1">
                <p className="text-sm leading-tight">
                  <strong>Choose the right payment processor</strong>: Using Squarespace Payments on Plus/Advanced plans saves substantially over PayPal for high volume stores
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Plan Impact Section - Items sorted by impact */}
      <div className="mb-8">
        <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
          <ListChecks className="w-4 h-4 mr-1" />
          Plan Selection Impact
        </h4>
        
        <div className="space-y-3">
          <AccordionItem 
            title="Selling Digital Products"
            impact="HIGH"
            details="Digital product fees vary significantly by plan: Basic (7%), Core (5%), Plus (1%), Advanced (0%)"
            example="For example, with $1,000/month in digital sales, upgrading from Basic to Advanced saves $70/month in fees ($840/year)."
          />
          
          <AccordionItem 
            title="Physical Products on Basic Plan"
            impact="HIGH"
            details="Basic plan charges an additional 2% transaction fee on all physical product sales, which higher plans eliminate"
            example="For example, with $2,000/month in physical product sales, upgrading from Basic to Core saves $40/month ($480/year) in transaction fees alone."
          />
          
          <AccordionItem 
            title="Video Storage Needs"
            impact="HIGH"
            details="Video storage requirements can force you into a higher tier plan regardless of other needs"
            example="For example, if you need 6+ hours of video hosting but don't need other Plus features, embedding videos from YouTube instead could save you $20/month ($240/year)."
          />
          
          <AccordionItem 
            title="Transaction Volume"
            impact="MEDIUM"
            details="Higher plans offer lower per-transaction rates with Squarespace Payments"
            example="For example, with $10,000/month in sales, the Advanced plan's 2.5% rate saves $40/month ($480/year) compared to Basic/Core's 2.9% rate."
          />
        </div>
      </div>
      
      {/* Processor Impact Section - Items sorted by impact */}
      <div className="mb-8">
        <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
          <CreditCard className="w-4 h-4 mr-1" />
          Payment Processor Impact
        </h4>
        
        <div className="space-y-3">
          <AccordionItem 
            title="Average Order Value"
            impact="HIGH"
            details="Per-transaction fees (Stripe/Squarespace Payments: $0.30, PayPal: $0.49) have greater impact on smaller orders"
            example="For example, on a $5 order, a $0.30 transaction fee is 6% of your revenue, but on a $50 order, it's only 0.6% - a 10x difference in impact."
          />
          
          <AccordionItem 
            title="PayPal vs Squarespace Payments"
            impact="MEDIUM"
            details="PayPal charges higher rates (3.49% + $0.49) than Squarespace Payments (as low as 2.5% + $0.30 on Advanced plan)"
            example="For example, on $10,000 monthly revenue with 250 transactions, using Squarespace Payments on Advanced plan saves $120/month ($1,440/year) compared to PayPal."
          />
          
          <AccordionItem 
            title="Subscription Products"
            impact="MEDIUM"
            details="PayPal doesn't support subscription products, requiring Squarespace Payments or Stripe"
            example="For example, if you sell subscriptions, using Squarespace Payments on the Plus plan (2.7% + $0.30) saves compared to Stripe's flat 2.9% + $0.30 on all plans."
          />
        </div>
      </div>
      
      {/* Credit/Source note */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <a 
          href="https://kristineneil.link/squarespace" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:underline text-gray-700"
        >
          View Squarespace's full pricing details
          <ExternalLink className="ml-1 w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

// Helper components
const AccordionItem = ({ title, impact, details, example }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const impactColors = {
    HIGH: 'bg-red-100 text-red-800 border-red-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    LOW: 'bg-green-100 text-green-800 border-green-200'
  };
  
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-start justify-between focus:outline-none"
      >
        <div className="flex items-start gap-3">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${impactColors[impact]} border mt-0.5`}>
            {impact}
          </span>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">{details}</p>
          <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
            {example}
          </p>
        </div>
      )}
    </div>
  );
};



export default FeeImpactGuide;