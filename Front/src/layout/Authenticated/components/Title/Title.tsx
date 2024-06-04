import React from "react";

interface ITitleProps {
  title: string;
}

export const Title: React.FC<ITitleProps> = ({ title }) => (
  <div className="flex h-fit items-start gap-2 px-10 pt-6">
    <div className="flex flex-col gap-1">
      <h1 className="tag-h1">{title}</h1>
    </div>
  </div>
);
