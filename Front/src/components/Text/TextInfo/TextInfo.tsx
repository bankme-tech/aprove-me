import { Tooltip } from "components/Tooltip/Tooltip";
import React, { useState } from "react";
import { MaskUtils } from "utils/maskUtils";
import { Title } from "./components/Title/Title";
import { VisibleDescriptionButton } from "./components/VisibleDescriptionButton/VisibleDescriptionButton";

interface ITextInfoProps {
  description: string | number | boolean | string[];
  isCurrency?: boolean;
  isSmall?: boolean;
  title?: string;
}

export const TextInfo: React.FC<ITextInfoProps> = ({
  description: descriptionDefault,
  isCurrency,
  isSmall,
  title
}) => {
  const notVisibleDescriptionText = isCurrency ? "R$ --,--" : "----";
  const visibleDescriptionText = isCurrency
    ? MaskUtils.moneyMask(descriptionDefault as number)
    : descriptionDefault.toString();

  const sizeStyle = {
    description: isSmall ? "tag-p" : "tag-h4"
  };

  const [visibleDescription, setVisibleDescription] = useState(!isCurrency);
  const [description, setDescription] = useState<string>(
    isCurrency ? notVisibleDescriptionText : visibleDescriptionText
  );

  const handleVisibleDescription = () => {
    setDescription(
      visibleDescription ? notVisibleDescriptionText : visibleDescriptionText
    );
    setVisibleDescription(!visibleDescription);
  };

  return (
    <Tooltip position="left" message={description}>
      <div className="flex gap-1 duration-300 hover:scale-105">
        <Title title={title} isSmall={isSmall} />

        <p className={`flex gap-2 ${sizeStyle.description}`}>
          {description}

          {isCurrency && (
            <VisibleDescriptionButton
              onInvertVisibility={handleVisibleDescription}
              visibleDescription={visibleDescription}
            />
          )}
        </p>
      </div>
    </Tooltip>
  );
};
