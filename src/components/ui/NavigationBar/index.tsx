import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  external = false,
}) => (
  <a
    href={href}
    className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium text-primary-medium 
               bg-gray-50 border border-ui-border hover:bg-gray-100 text-center
               transition-all duration-200 hover:shadow-calculator"
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </a>
);

const NavigationBar: React.FC = () => (
  <div className="w-full max-w-7xl mx-auto px-6 py-2.5">
    <nav className="flex flex-col sm:flex-row sm:justify-end gap-3 ml-auto">
      <NavLink href="https://sqsfeecalculator-feedback.paperform.co/" external>
        Provide Feedback
      </NavLink>
      <NavLink href="https://resources.kristineneil.com/squarespace-fee-calculator">
        Return to Main Site
      </NavLink>
    </nav>
  </div>
);

export default NavigationBar;
