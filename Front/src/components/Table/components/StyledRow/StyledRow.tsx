import { RowProps } from "antd";
import { Tooltip } from "components/Tooltip/Tooltip";
import React from "react";

interface IStyledRowProps {
  isOpeanable?: boolean;
  props: RowProps;
}

export const StyledRow: React.FC<IStyledRowProps> = ({
  isOpeanable,
  props
}) => (
  <Tooltip message={isOpeanable ? "Abrir detalhes" : ""}>
    <tr
      // @ts-ignore
      // eslint-disable-next-line
      class="cursor-pointer hover:cursor-pointer hover:bg-blue-2"
      {...props}
    />
  </Tooltip>
);
