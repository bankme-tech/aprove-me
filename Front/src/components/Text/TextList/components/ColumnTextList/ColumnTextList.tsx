import { TextInfo } from "components/Text/TextInfo/TextInfo";
import { AllTypes } from "interfaces/interfaces/Global/AllTypes";
import { IInfo } from "interfaces/interfaces/Info/IInfo";
import React from "react";
import { NumberUtils } from "utils/numberUtils";
import { TextUtils } from "utils/textUtils";

export interface IColumnTextListProps {
  columnPosition: 1 | 2 | 3 | 4;
  infos: IInfo[];
  isSmall?: boolean;
  numberOfColumns: 1 | 2 | 3 | 4;
}

export const ColumnTextList: React.FC<IColumnTextListProps> = ({
  columnPosition,
  infos,
  isSmall,
  numberOfColumns
}) => (
  <div className="flex flex-col gap-2">
    {infos
      .filter((info) => info.description !== undefined)
      .map((info, index) => {
        const columnPositionFilterValue = index - columnPosition + 1;

        const textAdjustment = (
          description?: AllTypes
        ): string | boolean | string[] | number => {
          if (!description) return "";

          if (info.type === "boolean") {
            return description.toString() === "true" ? "Sim" : "Não";
          } else if (info.type === "date") {
            return TextUtils.formatDate(description.toString());
          } else if (info.type === "currency") {
            return Number(description);
          } else {
            return description;
          }
        };

        return (
          NumberUtils.isMultiple(
            columnPositionFilterValue,
            numberOfColumns
          ) && (
            <div className="w-fit" key={TextUtils.generateRandomKey()}>
              <TextInfo
                title={info.title}
                description={textAdjustment(info?.description)}
                isCurrency={info.type === "currency"}
                isSmall={isSmall}
              />
            </div>
          )
        );
      })}
  </div>
);
