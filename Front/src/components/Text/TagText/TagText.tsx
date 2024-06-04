import React from "react";

export interface ITagTextProps {
  children: string;
  level: "neutral" | "low" | "high" | "medium";
}

export const TagText: React.FC<ITagTextProps> = ({ children, level }) => {
  const levelStyle = {
    neutral: "[&>*]:text-blue-1 border-blue-1 bg-blue-2",
    high: "[&>*]:text-red-0 border-red-0 bg-red-1",
    low: "[&>*]:text-success border-success bg-green-1",
    medium: "[&>*]:text-gold-0 border-gold-0 bg-gold-2"
  };

  return (
    <div
      className={`h-auto w-fit rounded-md border-2 px-4 py-1.5 ${levelStyle[level]}`}
    >
      <p className="tag-h5 flex w-fit justify-center">{children}</p>
    </div>
  );
};
