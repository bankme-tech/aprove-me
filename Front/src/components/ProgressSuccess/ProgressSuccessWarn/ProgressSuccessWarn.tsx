import { IWarnSuccess } from "interfaces/interfaces/Warn/IWarnSuccess";
import React from "react";
import { TextUtils } from "utils/textUtils";
import { ProgressSuccessBar } from "../ProgressSuccessBar/ProgressSuccessBar";

export interface IProgressSuccessWarnProps {
  text: string;
  warns: IWarnSuccess[];
}

export const ProgressSuccessWarn: React.FC<IProgressSuccessWarnProps> = ({
  text,
  warns
}) => {
  let conditionsApproved = 0;
  warns.forEach((warn) =>
    warn.expression.test(text) ? conditionsApproved++ : conditionsApproved
  );
  const totalSuccessWarnings = (conditionsApproved / warns.length) * 100;

  return (
    <div className="flex w-full flex-col justify-start gap-1 bg-transparent">
      <ProgressSuccessBar percentage={totalSuccessWarnings} />
      <ul className="tag-h6 ml-4 list-disc text-purple-0/25">
        {warns.map((warn) => (
          <div key={TextUtils.generateRandomKey()}>
            {!warn.expression.test(text) && (
              <li>
                <p className="tag-h6 text-purple-0">{warn.description}</p>
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
