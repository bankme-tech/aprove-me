import React from "react";
import { TextUtils } from "utils/textUtils";

interface ICardHeaderProps {
  texts?: string[];
  title: string;
}

export const CardHeader: React.FC<ICardHeaderProps> = ({ texts, title }) => (
  <div className="flex flex-col items-center gap-0.5 px-3.5">
    <h2 className="tag-h2 font-semibold">{title}</h2>
    {texts && (
      <div className="flex flex-col items-center gap-2">
        {texts.map((text) => (
          <p key={TextUtils.generateRandomKey()} className="tag-p text-center">
            {text}
          </p>
        ))}
      </div>
    )}
  </div>
);
