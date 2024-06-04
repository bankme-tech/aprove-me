import TooltipMUI from "@mui/material/Tooltip";
import { colors } from "global/Colors";
import React, { ReactElement } from "react";

export interface ITooltipProps {
  children: ReactElement<any, any>;
  message: string;
  position?: "left" | "right" | "top" | "bottom";
}

export const Tooltip: React.FC<ITooltipProps> = ({
  children,
  message,
  position: positionDefault
}) => {
  const position = positionDefault ?? "bottom";

  return (
    <TooltipMUI
      arrow
      placement={position}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: colors["blue-0"],
            paddingX: "1.5rem",
            boxShadow: "2px 2px 3px 2x rgba(0,0,0,0.25)"
          }
        },
        popper: {
          sx: {
            opacity: 0.9,
            justifyContent: "center",
            alignItems: "center"
          }
        }
      }}
      title={message}
    >
      {children}
    </TooltipMUI>
  );
};
