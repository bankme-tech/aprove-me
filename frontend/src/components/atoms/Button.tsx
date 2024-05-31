import React, { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  secondary?: boolean;
  error?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ secondary, error, children, onClick, type = "button" }, ref) => {
    const buttonClassNameType = (() => {
      if (secondary) {
        return "bg-white border font-semibold border-primary text-primary hover:bg-gray-100  hover:border-success focus:bg-success hover:text-primary-dark disabled:bg-slate-50";
      }

      if (error) {
        return "bg-red-500 border font-semibold border-red-500 text-white hover:bg-red-400 hover:border-red-700 focus:bg-red-200 focus:text-primary-dark hover:text-primary-dark disabled:bg-slate-50";
      }

      return "bg-primary text-white font-semibold hover:text-success hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:bg-slate-50";
    })();

    return (
      <button
        ref={ref}
        type={type}
        className={`w-full h-16 rounded-xl py-2 px-4 ${buttonClassNameType}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
