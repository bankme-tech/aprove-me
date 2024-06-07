import React from "react";
import { IconButton } from "../IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { colors, colorsType } from "global/Colors";

export interface ICloseProps {
  className?: string;
  color?: keyof colorsType;
  onChange: () => void;
}

export const Close: React.FC<ICloseProps> = ({
  onChange,
  className,
  color
}) => {
  const colorStyle = {
    icon: color ? colors[color] : colors["purple-0"]
  };

  return (
    <IconButton className={className} onClick={onChange}>
      <CloseIcon sx={{ color: colorStyle.icon }} />
    </IconButton>
  );
};
