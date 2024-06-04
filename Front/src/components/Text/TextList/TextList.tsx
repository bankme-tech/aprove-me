import { IInfo } from "interfaces/interfaces/Info/IInfo";
import React from "react";
import { NumberUtils } from "utils/numberUtils";
import { TextUtils } from "utils/textUtils";
import { ColumnTextList } from "./components/ColumnTextList/ColumnTextList";
import { Title } from "./components/Title/Title";

export interface ITextListProps {
  infos: IInfo[];
  isSmall?: boolean;
  numberOfColumns?: 1 | 2 | 3 | 4;
  title?: string;
}

export const TextList: React.FC<ITextListProps> = ({
  infos,
  isSmall,
  numberOfColumns: numberOfColumnsDefault,
  title
}) => {
  const numberOfColumns = numberOfColumnsDefault ?? 1;

  const showTitle = infos.some((info) => info.description !== undefined);

  return (
    <div className="flex flex-col justify-start gap-2">
      {showTitle && <Title isSmall={isSmall} title={title} />}

      <div className={"flex justify-between gap-1"}>
        {NumberUtils.createArithmeticOrderedList(numberOfColumns).map(
          (position) => (
            <ColumnTextList
              key={TextUtils.generateRandomKey()}
              infos={infos}
              isSmall={isSmall}
              columnPosition={position as 1 | 2 | 3 | 4}
              numberOfColumns={numberOfColumns}
            />
          )
        )}
      </div>
    </div>
  );
};
