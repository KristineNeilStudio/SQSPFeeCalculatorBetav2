// src/components/ui/Footer/index.tsx
import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

interface FooterProps {
  mainSiteUrl?: string;
  feedbackUrl?: string;
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  mainSiteUrl = "https://kristineneil.com",
  feedbackUrl = "https://sqsfeecalculator-feedback.paperform.co/",
  year = new Date().getFullYear(),
}) => {
  return (
    <footer className="w-full bg-gray-50">
      {/* Main Footer Section */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                ABOUT THIS CALCULATOR
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The SQSP Fee Calculator is built and maintained by{" "}
                <a
                  href={mainSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 transition-colors duration-200 font-medium"
                >
                  Kristine Neil
                </a>
                . The term "Squarespace" is a trademark of Squarespace, Inc.
                This website is not affiliated with Squarespace, Inc.
              </p>
              <p className="text-sm text-gray-600">
                The accuracy of information on this website is subject to change.
              </p>
            </div>

            {/* Links column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                LINKS
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={feedbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 
                             hover:text-gray-900 transition-colors duration-200 gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Provide Feedback
                  </a>
                </li>
                <li>
                  <a
                    href="https://sqsfeecalculator-feedback.paperform.co/"
                    className="inline-flex items-center text-sm text-gray-600 
                             hover:text-gray-900 transition-colors duration-200 gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Return to Main Site
                  </a>
                </li>
                <li>
                  <a
                    href="kristineneil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 
                             hover:text-gray-900 transition-colors duration-200 gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Contact Kristine
                  </a>
                </li>
              </ul>
            </div>

            {/* Squarespace column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                TRY SQUARESPACE
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ready to get started with Squarespace? Use code{" "}
                <span className="font-mono text-gray-900 font-medium">
                  KRISTINE10
                </span>{" "}
                at checkout to save 10% on your subscription.
              </p>
              <a
                href="https://kristineneil.link/squarespace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gray-900 
                         hover:text-gray-600 transition-colors duration-200 
                         font-medium group gap-2"
              >
                Get Started with Squarespace
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-center text-gray-600">
            © {year} Kristine Neil, LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;