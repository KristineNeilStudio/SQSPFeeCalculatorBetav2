// src/components/core/FeeComparisonTable/index.tsx
import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';

interface FeeStructure {
  subscription: {
    monthly: number;
    annual: number;
  };
  processing: {
    squarespacePayments: {
      rate: string;
      transactionFee: string;
    };
    stripe: {
      rate: string;
      transactionFee: string;
    };
    paypal: {
      rate: string;
      transactionFee: string;
    };
  };
  platform: {
    physical: string;
    digital: string;
  };
}

interface PlanData {
  [key: string]: FeeStructure;
}

// Comprehensive fee data for current plans
const PLAN_FEES: PlanData = {
  Basic: {
    subscription: {
      monthly: 16,
      annual: 13,
    },
    processing: {
      squarespacePayments: {
        rate: "2.9%",
        transactionFee: "$0.30",
      },
      stripe: {
        rate: "2.9%",
        transactionFee: "$0.30",
      },
      paypal: {
        rate: "3.49%",
        transactionFee: "$0.49",
      },
    },
    platform: {
      physical: "2%",
      digital: "7%",
    },
  },
  Core: {
    subscription: {
      monthly: 36,
      annual: 23,
    },
    processing: {
      squarespacePayments: {
        rate: "2.9%",
        transactionFee: "$0.30",
      },
      stripe: {
        rate: "2.9%",
        transactionFee: "$0.30",
      },
      paypal: {
        rate: "3.49%",
        transactionFee: "$0.49",
      },
    },
    platform: {
      physical: "0%",
      digital: "5%",
    },
  },
  Plus: {
    subscription: {
      monthly: 56,
      annual: 39,
    },
    processing: {
      squarespacePayments: {
        rate: "2.7%",
        transactionFee: "$0.30",
      },
      stripe: {
        rate: "2.9%",
        transactionFee: "$0.30",
      },
      paypal: {
        rate: "3.49%",
        transactionFee: "$0.49",
      },
    },
    platform: {
      physical: "0%",
      digital: "1%",
    },
  },
  Advanced: {
    subscription: {
      monthly: 139,
      annual: 99,
    },
    processing: {
      squarespacePayments: {
        rate: "2.5%",
        transactionFee: "$0.30",
      },
      stripe: {
        rate: "2.9%",
        transactionFee: "$0.30",
      },
      paypal: {
        rate: "3.49%",
        transactionFee: "$0.49",
      },
    },
    platform: {
      physical: "0%",
      digital: "0%",
    },
  },
};

const FeeComparisonTable: React.FC = () => {
  const [showAnnualPricing, setShowAnnualPricing] = useState(false);
  const planNames = Object.keys(PLAN_FEES);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">SQUARESPACE FEE COMPARISON</h2>
      
      <div className="mb-6 flex justify-end">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={showAnnualPricing}
            onChange={() => setShowAnnualPricing(!showAnnualPricing)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800"></div>
          <span className="ms-3 text-sm font-medium text-gray-700">
            Show Annual Pricing
          </span>
        </label>
      </div>
      
      {/* Main Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 border text-left font-semibold text-gray-700">Fee Type</th>
              {planNames.map(plan => (
                <th key={plan} className="p-3 border text-center font-semibold text-gray-700">
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Subscription Fees */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Subscription Fee
                <div className="text-xs text-gray-500 mt-1">
                  {showAnnualPricing ? 'Annual (per month)' : 'Monthly'}
                </div>
              </td>
              {planNames.map(plan => (
                <td key={plan} className="p-3 border text-center">
                  ${showAnnualPricing 
                    ? PLAN_FEES[plan].subscription.annual 
                    : PLAN_FEES[plan].subscription.monthly}/mo
                </td>
              ))}
            </tr>
            
            {/* Physical Product Transaction Fee */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Physical Product Transaction Fee
                <div className="text-xs text-gray-500 mt-1">
                  Additional fee charged by Squarespace
                </div>
              </td>
              {planNames.map(plan => (
                <td key={plan} className="p-3 border text-center">
                  {PLAN_FEES[plan].platform.physical}
                </td>
              ))}
            </tr>
            
            {/* Digital Product Transaction Fee */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Digital Product Transaction Fee
                <div className="text-xs text-gray-500 mt-1">
                  Fee for digital products, memberships, services
                </div>
              </td>
              {planNames.map(plan => (
                <td key={plan} className="p-3 border text-center">
                  {PLAN_FEES[plan].platform.digital}
                </td>
              ))}
            </tr>
            
            {/* Squarespace Payments Processing */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Squarespace Payments
                <div className="text-xs text-gray-500 mt-1">
                  Credit card processing fees
                </div>
              </td>
              {planNames.map(plan => (
                <td key={plan} className="p-3 border text-center">
                  {PLAN_FEES[plan].processing.squarespacePayments.rate} + {PLAN_FEES[plan].processing.squarespacePayments.transactionFee}
                </td>
              ))}
            </tr>
            
            {/* Stripe Processing */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                Stripe
                <div className="text-xs text-gray-500 mt-1">
                  Credit card processing fees
                </div>
              </td>
              {planNames.map(plan => (
                <td key={plan} className="p-3 border text-center">
                  {PLAN_FEES[plan].processing.stripe.rate} + {PLAN_FEES[plan].processing.stripe.transactionFee}
                </td>
              ))}
            </tr>
            
            {/* PayPal Processing */}
            <tr>
              <td className="p-3 border font-medium bg-gray-50">
                PayPal
                <div className="text-xs text-gray-500 mt-1">
                  Credit card processing fees
                </div>
              </td>
              {planNames.map(plan => (
                <td key={plan} className="p-3 border text-center">
                  {PLAN_FEES[plan].processing.paypal.rate} + {PLAN_FEES[plan].processing.paypal.transactionFee}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Key Features List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">KEY FEATURES BY PLAN LEVEL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {planNames.map(plan => (
            <div key={`features-${plan}`} className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-center mb-3">{plan.toUpperCase()}</h4>
              <ul className="space-y-2">
                {plan === 'Basic' && (
                  <>
                    <FeatureItem available>Basic eCommerce capabilities</FeatureItem>
                    <FeatureItem available>Unlimited products</FeatureItem>
                    <FeatureItem available={false}>Point of Sale</FeatureItem>
                    <FeatureItem available={false}>Gift cards</FeatureItem>
                    <FeatureItem available={false}>Advanced shipping</FeatureItem>
                    <FeatureItem available={false}>Subscription products</FeatureItem>
                    <FeatureItem available={false}>Commerce API</FeatureItem>
                  </>
                )}
                {plan === 'Core' && (
                  <>
                    <FeatureItem available>Basic eCommerce capabilities</FeatureItem>
                    <FeatureItem available>Unlimited products</FeatureItem>
                    <FeatureItem available>Point of Sale</FeatureItem>
                    <FeatureItem available>Gift cards</FeatureItem>
                    <FeatureItem available>Customer accounts</FeatureItem>
                    <FeatureItem available>Product reviews</FeatureItem>
                    <FeatureItem available={false}>Abandoned cart recovery</FeatureItem>
                    <FeatureItem available={false}>Subscription products</FeatureItem>
                    <FeatureItem available={false}>Commerce API</FeatureItem>
                  </>
                )}
                {plan === 'Plus' && (
                  <>
                    <FeatureItem available>All Core features</FeatureItem>
                    <FeatureItem available>Abandoned cart recovery</FeatureItem>
                    <FeatureItem available>Advanced shipping</FeatureItem>
                    <FeatureItem available>Subscription products</FeatureItem>
                    <FeatureItem available>Commerce API</FeatureItem>
                    <FeatureItem available>Advanced discounts</FeatureItem>
                  </>
                )}
                {plan === 'Advanced' && (
                  <>
                    <FeatureItem available>All Plus features</FeatureItem>
                    <FeatureItem available>0% transaction fees on all products</FeatureItem>
                    <FeatureItem available>Wholesale commerce</FeatureItem>
                    <FeatureItem available>Advanced shipping</FeatureItem>
                    <FeatureItem available>Subscription products</FeatureItem>
                    <FeatureItem available>Commerce API</FeatureItem>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper component for feature items
const FeatureItem: React.FC<{ available: boolean; children: React.ReactNode }> = ({ 
  available, 
  children 
}) => (
  <li className="flex items-start gap-2 text-sm">
    {available ? (
      <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
    ) : (
      <div className="w-4 h-4 border border-gray-300 rounded-full mt-0.5 flex-shrink-0" />
    )}
    <span className={available ? "text-gray-800" : "text-gray-500"}>{children}</span>
  </li>
);

export default FeeComparisonTable;