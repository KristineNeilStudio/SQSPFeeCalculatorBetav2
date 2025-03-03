// src/components/core/ForumQA/index.tsx
import React from 'react';
import { BaseSection, SectionTitle } from '../../ui/BaseSection';
import { MessageSquare } from 'lucide-react';

interface Question {
  id: string;
  author: string;
  question: string;
  answer: React.ReactNode;
}

const COMMON_QUESTIONS: Question[] = [
  {
    id: "transaction-fees",
    author: "beverly",
    question: "What I'm most confused about is whether Squarespace also charges a transaction fee at the higher levels. It's really hard to upsell when these fees eat into a nonprofit's donations or membership payments.",
    answer: (
      <>
        <p>All the fees decrease as you move from Basic towards Advanced. Here's a simplified breakdown:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Physical products:</strong> Only Basic plan has a 2% transaction fee. Core, Plus, and Advanced have 0% transaction fees for physical products.</li>
          <li><strong>Digital products/memberships:</strong> All plans have transaction fees except Advanced. Basic charges 7%, Core charges 5%, Plus charges 1%, and Advanced charges 0%.</li>
          <li><strong>Processing fees:</strong> These are separate from transaction fees and are charged by the payment processor (Squarespace Payments, Stripe, or PayPal). Even Advanced plan has processing fees, but Squarespace Payments offers lower rates (2.5% + $0.30) on higher plans.</li>
        </ul>
      </>
    )
  },
  {
    id: "stripe-paypal",
    author: "beverly",
    question: "Stripe charges a transaction fee. Will Squarespace also charge a transaction fee for products and donations on all plans, so potentially there could be some 6% in transaction fees?",
    answer: (
      <>
        <p>It depends on what you're selling:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>For physical products:</strong> On Core, Plus, or Advanced plans, you'll only pay the payment processor fees (like Stripe's 2.9% + $0.30). There are no additional Squarespace transaction fees.</li>
          <li><strong>For physical products on Basic plan:</strong> You'll pay both the payment processor fee AND an additional 2% Squarespace transaction fee.</li>
          <li><strong>For digital products/memberships:</strong> You'll pay both the payment processor fee AND Squarespace's digital product fee (ranging from 7% on Basic to 0% on Advanced).</li>
        </ul>
        <p className="mt-2">So in the worst case (Basic plan with digital products using PayPal), you could be paying: 3.49% + $0.49 (PayPal) + 7% (Squarespace) = 10.49% + $0.49 per transaction.</p>
      </>
    )
  },
  {
    id: "credit-card-fees",
    author: "Stephen_SQSP",
    question: "Can you clarify credit card fees? Specifically, do all plans include both Stripe and Squarespace fees? I'm a bit confused. What is the fee for Squarespace payments? I have two new websites to build and it would be good to be able to clarify this with my clients.",
    answer: (
      <>
        <p>Credit card processing fees in the feature matrix are available if you choose Squarespace Payments as the payment processor. When using Squarespace Payments, you wouldn't also need to use Stripe or PayPal (though you can still offer them as options).</p>
        <p className="mt-2">Here's a complete breakdown of credit card processing rates:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>Squarespace Payments:</strong> 2.9% + $0.30 (Basic/Core), 2.7% + $0.30 (Plus), or 2.5% + $0.30 (Advanced)</li>
          <li><strong>Stripe:</strong> 2.9% + $0.30 (all plans)</li>
          <li><strong>PayPal:</strong> 3.49% + $0.49 (all plans)</li>
        </ul>
        <p className="mt-2">These processing fees are separate from and in addition to any transaction fees Squarespace might charge depending on your plan level.</p>
      </>
    )
  }
];

const ForumQA: React.FC = () => {
  return (
    <BaseSection>
      <SectionTitle>Common Squarespace Forum Questions</SectionTitle>
      
      <div className="space-y-8">
        {COMMON_QUESTIONS.map((q) => (
          <div key={q.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-100 p-4 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">@{q.author}</span>
                    <span className="text-xs text-gray-500">asked:</span>
                  </div>
                  <p className="mt-1 text-gray-800">{q.question}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="rounded-lg bg-white p-4 border border-gray-200">
                <div className="text-gray-800">{q.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-accent-redLight bg-opacity-25 rounded-lg border border-accent-red border-opacity-20">
        <h3 className="font-semibold text-accent-red mb-2">Have a question not covered here?</h3>
        <p className="text-sm text-gray-700">
          If you have a specific question about Squarespace fees that you'd like answered,
          you can use the comparison table above to find the most current information, or visit 
          the <a href="https://support.squarespace.com/hc/en-us" className="text-accent-red underline hover:no-underline" target="_blank" rel="noopener noreferrer">Squarespace Help Center</a> for
          official documentation.
        </p>
      </div>
    </BaseSection>
  );
};

export default ForumQA;