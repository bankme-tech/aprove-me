import React from "react";
import { useNavigate } from "react-router-dom";

export interface IRedirectProps {
  children: string;
  destination: string;
}

export const Redirect: React.FC<IRedirectProps> = ({
  children,
  destination
}) => {
  const navigate = useNavigate();

  return (
    <button
      className="rounded border-0 bg-transparent px-2 py-0.5 hover:bg-gray-5"
      onClick={() => navigate(destination)}
    >
      <span className="tag-h5 text-gold-0 underline hover:text-gold-1">
        {children}
      </span>
    </button>
  );
};
