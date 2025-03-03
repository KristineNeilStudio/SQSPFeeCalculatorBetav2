// src/components/core/FAQSection/index.tsx
import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const COMMON_QUESTIONS: FAQ[] = [
  {
    id: "transaction-vs-processing",
    question: "What's the difference between transaction fees and processing fees?",
    answer: (
      <>
        <p className="mb-2">
          <strong>Transaction fees</strong> are additional charges from Squarespace on top of the regular payment processing fees:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>For physical products:</strong> Only the Basic plan has a 2% transaction fee. Core, Plus, and Advanced plans have 0% transaction fees.</li>
          <li><strong>For digital products:</strong> Basic charges 7%, Core charges 5%, Plus charges 1%, and Advanced charges 0%.</li>
        </ul>
        <p className="mt-2 mb-2">
          <strong>Processing fees</strong> are charged by the payment processor (Squarespace Payments, Stripe, or PayPal) and apply to all plans:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Squarespace Payments:</strong> 2.9% + $0.30 (Basic/Core), 2.7% + $0.30 (Plus), or 2.5% + $0.30 (Advanced)</li>
          <li><strong>Stripe:</strong> 2.9% + $0.30 (all plans)</li>
          <li><strong>PayPal:</strong> 3.49% + $0.49 (all plans)</li>
        </ul>
      </>
    )
  },
  {
    id: "highest-fees",
    question: "What's the highest combined fee I might pay on Squarespace?",
    answer: (
      <>
        <p>
          The highest combined fee scenario would be using the Basic plan with digital products and PayPal as your processor:
        </p>
        <div className="p-3 bg-gray-50 rounded-lg mt-2 mb-2">
          <p className="font-mono">
            3.49% + $0.49 (PayPal) + 7% (Squarespace digital fee) = <strong>10.49% + $0.49 per transaction</strong>
          </p>
        </div>
        <p>
          For physical products on the Basic plan using PayPal, you'd pay:
        </p>
        <div className="p-3 bg-gray-50 rounded-lg mt-2">
          <p className="font-mono">
            3.49% + $0.49 (PayPal) + 2% (Squarespace physical fee) = <strong>5.49% + $0.49 per transaction</strong>
          </p>
        </div>
      </>
    )
  },
  {
    id: "nonprofits",
    question: "How do fees affect nonprofits collecting donations?",
    answer: (
      <>
        <p className="mb-2">
          For nonprofits collecting donations, fees directly reduce the amount your organization receives. Your best options are:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Advanced plan:</strong> 0% Squarespace fees + 2.5% + $0.30 processing fee (with Squarespace Payments)</li>
          <li><strong>Plus plan:</strong> If donations are set up as digital products, you'll pay a 1% fee + 2.7% + $0.30 processing fee</li>
        </ol>
        <p className="mt-2">
          Many nonprofits add an option for donors to cover the processing fees. Be sure to explain to donors exactly where their money goes.
        </p>
      </>
    )
  },
  {
    id: "best-processor",
    question: "Which payment processor should I choose?",
    answer: (
      <>
        <p className="mb-2">
          The best payment processor depends on your plan and sales volume:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Squarespace Payments</strong> offers the lowest rates on Plus (2.7%) and Advanced (2.5%) plans.</li>
          <li><strong>Stripe</strong> has consistent rates (2.9% + $0.30) across all plans and may offer better analytics.</li>
          <li><strong>PayPal</strong> has higher rates (3.49% + $0.49) but many customers trust and prefer PayPal checkout.</li>
        </ul>
        <p className="mt-2">
          For the best results, offer both Squarespace Payments (or Stripe) and PayPal as options, letting customers choose their preferred method.
        </p>
      </>
    )
  },
  {
    id: "digital-products",
    question: "How do digital product fees work?",
    answer: (
      <>
        <p className="mb-2">
          Digital product fees apply to downloadable content, memberships, services, and courses. The fee structure is:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Basic plan:</strong> 7% of each transaction</li>
          <li><strong>Core plan:</strong> 5% of each transaction</li>
          <li><strong>Plus plan:</strong> 1% of each transaction</li>
          <li><strong>Advanced plan:</strong> 0% (no additional fees)</li>
        </ul>
        <p className="mt-2">
          These fees are <em>in addition to</em> the standard payment processing fees from your payment processor.
        </p>
      </>
    )
  }
];

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-900">FORUM QUESTIONS ANSWERED</h2>
      </div>
      
      <p className="text-gray-700 mb-6">
        Here are answers to some common questions about Squarespace fees from the forums.
      </p>
      
      <div className="space-y-4">
        {COMMON_QUESTIONS.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full p-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleFAQ(faq.id)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  openFAQ === faq.id ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {openFAQ === faq.id && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Have a question not covered here?</h3>
        <p className="text-sm text-gray-700">
          If you have a specific question about Squarespace fees that you'd like answered,
          switch to <strong>Calculator Mode</strong> using the toggle at the top of the page for 
          a personalized recommendation based on your specific business needs.
        </p>
      </div>
    </div>
  );
};

export default FAQSection;