import React from "react";

export interface ITitleProps {
  isSmall?: boolean;
  title?: string;
}

export const Title: React.FC<ITitleProps> = ({ isSmall, title }) => (
  <div className="flex w-auto">
    {title && isSmall ? (
      <h3 className={"tag-h3 my-0 text-gray-1"}>{title}</h3>
    ) : (
      <h1 className={"tag-h1 my-0 text-gray-1"}>{title}</h1>
    )}
  </div>
);
