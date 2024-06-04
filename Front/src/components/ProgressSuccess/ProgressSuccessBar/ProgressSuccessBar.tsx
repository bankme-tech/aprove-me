import React from "react";

export interface IProgressSuccessBarProps {
  percentage: number;
}

export const ProgressSuccessBar: React.FC<IProgressSuccessBarProps> = ({
  percentage: percentageDefault
}) => {
  const percentage = percentageDefault === 0 ? 1 : percentageDefault;

  return (
    <div className="relative h-1 w-full bg-blue-2">
      <div
        style={{ width: `${percentage}%` }}
        className="absolute left-0 h-1 bg-blue-0"
      />
    </div>
  );
};
