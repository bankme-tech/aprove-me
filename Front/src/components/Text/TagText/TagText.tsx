import React from "react";

export interface ITagTextProps {
  children: string;
  level: "neutral" | "low" | "high" | "medium";
}

export const TagText: React.FC<ITagTextProps> = ({ children, level }) => {
  const levelStyle = {
    neutral: "[&>*]:text-purple-1 border-purple-1 bg-purple-2",
    high: "[&>*]:text-red-1 border-red-1 bg-red-2",
    low: "[&>*]:text-green-0 border-green-0 bg-green-2",
    medium: "[&>*]:text-yellow-0 border-yellow-0 bg-yellow-1"
  };

  return (
    <div
      className={`h-auto w-fit rounded-md border-2 px-4 py-1.5 ${levelStyle[level]}`}
    >
      <p className="tag-h5 flex w-fit justify-center">{children}</p>
    </div>
  );
};
