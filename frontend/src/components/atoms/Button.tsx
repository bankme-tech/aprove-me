import React, { ButtonHTMLAttributes } from "react";

type Button = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  secondary?: boolean;
};

// TODO: Avoid props drippiling
// Solutions: Use Ref or Context
export const Button = ({ children, secondary = false, ...props }: Button) => {
  return (
    <button
      type="button"
      className={`w-full h-16 rounded-xl py-2 px-4 ${
        secondary
          ? "bg-white border font-semibold border-primary text-primary hover:bg-gray-100  hover:border-success focus:bg-success hover:text-primary-dark disabled:bg-slate-50"
          : "bg-primary text-white font-semibold hover:text-success hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:bg-slate-50"
      }`}
      disabled
      {...props}
    >
      {children}
    </button>
  );
};
