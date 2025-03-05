// src/components/core/FeeComparisonTable/index.tsx
import React, { useState } from 'react';
import { CheckIcon, PlusIcon, XIcon, InfoIcon } from 'lucide-react';

const FeeComparisonTable: React.FC = () => {
  const [showAnnualPricing, setShowAnnualPricing] = useState(false);

  return (
    <div>
      {/* Fee Structure Diagram */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How Squarespace Fees Work</h3>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-lg mb-3">1. Subscription Fees</h4>
            <p className="text-sm text-gray-600">Monthly or annual plan payment</p>
            <p className="text-sm text-gray-600 mt-2">Paid to Squarespace</p>
          </div>
          
          <div className="flex items-center justify-center">
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          
          <div className="flex-1 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-lg mb-3">2. Platform Fees</h4>
            <p className="text-sm text-gray-600">Percentage of each transaction</p>
            <p className="text-sm text-gray-600 mt-2">Paid to Squarespace</p>
          </div>
          
          <div className="flex items-center justify-center">
            <PlusIcon className="w-8 h-8 text-gray-400" />
          </div>
          
          <div className="flex-1 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <h4 className="font-semibold text-lg mb-3">3. Processing Fees</h4>
            <p className="text-sm text-gray-600">Payment processor charges</p>
            <p className="text-sm text-gray-600 mt-2">Paid to payment processor</p>
          </div>
        </div>
      </div>
      
      {/* Section 1: Subscription Fees */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-gray-800 text-white text-sm font-bold mr-2">1</span>
            Subscription Fees
          </h3>
          
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
          <div className="flex items-start">
            <InfoIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              The subscription fee covers your website hosting, domain (with annual plans), SSL certificate, 
              templates, and access to Squarespace features based on your plan level.
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border text-left font-semibold text-gray-700" style={{width: '20%'}}></th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Basic</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Core</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Plus</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Advanced</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-medium">Monthly billing</td>
                <td className="p-3 border text-center">$16/mo</td>
                <td className="p-3 border text-center">$36/mo</td>
                <td className="p-3 border text-center">$56/mo</td>
                <td className="p-3 border text-center">$139/mo</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">Annual billing (per month)</td>
                <td className="p-3 border text-center">$13/mo</td>
                <td className="p-3 border text-center">$23/mo</td>
                <td className="p-3 border text-center">$39/mo</td>
                <td className="p-3 border text-center">$99/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Section 2: Platform Fees */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-gray-800 text-white text-sm font-bold mr-2">2</span>
          Platform Fees
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
          <div className="flex items-start">
            <InfoIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Platform fees are percentages of each transaction that Squarespace charges in addition to payment processing fees. 
              These vary based on product type and plan level.
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border text-left font-semibold text-gray-700" style={{width: '20%'}}>Product Type</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Basic</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Core</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Plus</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Advanced</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-medium">
                  Physical Products
                  <div className="text-xs text-gray-500 mt-1">
                    Products, services, gift cards
                  </div>
                </td>
                <td className="p-3 border text-center font-medium">2%</td>
                <td className="p-3 border text-center font-medium">0%</td>
                <td className="p-3 border text-center font-medium">0%</td>
                <td className="p-3 border text-center font-medium">0%</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">
                  Digital Products
                  <div className="text-xs text-gray-500 mt-1">
                    Digital downloads, memberships, courses
                  </div>
                </td>
                <td className="p-3 border text-center font-medium">7%</td>
                <td className="p-3 border text-center font-medium">5%</td>
                <td className="p-3 border text-center font-medium">1%</td>
                <td className="p-3 border text-center font-medium">0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Section 3: Processing Fees */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-gray-800 text-white text-sm font-bold mr-2">3</span>
          Processing Fees
        </h3>
        
        {/* Main Processors with options diagram */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-4">Payment Processor Options</h4>
          
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 border-2 border-gray-300 rounded-lg p-4 bg-white">
              <h5 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Option 1: Squarespace Payments</h5>
              <p className="text-sm text-gray-600 mb-3">Choose this as your main processor and get:</p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Lower rates on Plus/Advanced plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Access to Apple Pay, Google Pay</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Exclusive access to ACH, Klarna, Afterpay</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Only available in 9 countries</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Higher fees (3.2%) for premium cards like AMEX</span>
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center">
                  <PlusIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Can add PayPal as an additional option</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 border-2 border-gray-300 rounded-lg p-4 bg-white">
              <h5 className="font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">Option 2: Stripe</h5>
              <p className="text-sm text-gray-600 mb-3">Choose this as your main processor and get:</p>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Available in 45+ countries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Same rate (2.9% + $0.30) for all card types</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Access to Apple Pay, Google Pay</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>No access to ACH, Klarna, or Afterpay</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>No plan-based discounts on rates</span>
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center">
                  <PlusIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Can add PayPal as an additional option</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 font-medium">Important: You must choose either Squarespace Payments OR Stripe as your main processor. You cannot use both together.</p>
        </div>
        
        {/* Main Processors Comparison Table */}
        <h4 className="font-medium text-gray-800 mb-3">Base Processing Rates</h4>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border text-left font-semibold text-gray-700" style={{width: '20%'}}>Processor</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Basic</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Core</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Plus</th>
                <th className="p-3 border text-center font-semibold text-gray-700" style={{width: '20%'}}>Advanced</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-medium">
                  Squarespace Payments
                  <div className="text-xs text-gray-500 mt-1">
                    Available in 9 countries
                  </div>
                </td>
                <td className="p-3 border text-center">2.9% + $0.30</td>
                <td className="p-3 border text-center">2.9% + $0.30</td>
                <td className="p-3 border text-center">2.7% + $0.30</td>
                <td className="p-3 border text-center">2.5% + $0.30</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">
                  Stripe
                  <div className="text-xs text-gray-500 mt-1">
                    Available in 45+ countries
                  </div>
                </td>
                <td className="p-3 border text-center">2.9% + $0.30</td>
                <td className="p-3 border text-center">2.9% + $0.30</td>
                <td className="p-3 border text-center">2.9% + $0.30</td>
                <td className="p-3 border text-center">2.9% + $0.30</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">
                  PayPal
                  <div className="text-xs text-gray-500 mt-1">
                    Available in 200+ countries
                  </div>
                </td>
                <td className="p-3 border text-center">3.49% + $0.49</td>
                <td className="p-3 border text-center">3.49% + $0.49</td>
                <td className="p-3 border text-center">3.49% + $0.49</td>
                <td className="p-3 border text-center">3.49% + $0.49</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Special Rates & Additional Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Special Card Rates */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Special Card Processing Rates</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 border text-left font-semibold text-gray-700">Card/Transaction Type</th>
                    <th className="p-3 border text-center font-semibold text-gray-700">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-medium">
                      Premium Cards via Squarespace Payments
                      <div className="text-xs text-gray-500 mt-1">
                        AMEX, Discover, JCB, Diners Club
                      </div>
                    </td>
                    <td className="p-3 border text-center">3.2% + $0.30</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">
                      ACH Bank Transfers (US only)
                    </td>
                    <td className="p-3 border text-center">
                      <div>Basic: 1.5%</div>
                      <div>Core/Plus: 1%</div>
                      <div>Advanced: 1% ($10 max)</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">
                      International Cards
                    </td>
                    <td className="p-3 border text-center">+1.5%</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">
                      Currency Conversion
                    </td>
                    <td className="p-3 border text-center">+1%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Additional Payment Methods */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Additional Payment Method Availability</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 border text-left font-semibold text-gray-700">Payment Method</th>
                    <th className="p-3 border text-center font-semibold text-gray-700">Squarespace Payments</th>
                    <th className="p-3 border text-center font-semibold text-gray-700">Stripe</th>
                    <th className="p-3 border text-center font-semibold text-gray-700">PayPal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-medium">Apple Pay</td>
                    <td className="p-3 border text-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-3 border text-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-3 border text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Klarna/Afterpay</td>
                    <td className="p-3 border text-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-3 border text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-3 border text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Venmo</td>
                    <td className="p-3 border text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-3 border text-center">
                      <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="p-3 border text-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fee Impact & Tips Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Impact & Tips</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">When to Choose Squarespace Payments</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You're on the Plus or Advanced plan (for lower rates)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You need ACH payment options for B2B clients</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Your customers would benefit from buy-now-pay-later options</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You operate in one of the supported countries</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">When to Choose Stripe</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You process a lot of AMEX transactions (saves 0.3% per transaction)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You're on the Basic or Core plan (same rate as Squarespace Payments)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You're outside of Squarespace Payments' supported countries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>You want to use Stripe's advanced analytics tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    
      {/* Bottom Notes */}
      <div className="text-xs text-gray-500 mt-6 space-y-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p>• All fees are subject to change. Always verify current rates on the <a href="https://squarespace.com/pricing" className="underline hover:text-gray-700" target="_blank" rel="noopener noreferrer">Squarespace website</a>.</p>
        <p>• Processing fees may vary by country. The rates shown are for US-based accounts.</p>
        <p>• Platform fees and processing fees are separate and both apply to transactions.</p>
        <p>• Using the calculator view will help you determine the best options for your specific business needs.</p>
      </div>
    </div>
  );
};

export default FeeComparisonTable;