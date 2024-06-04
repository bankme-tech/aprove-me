import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "global/Colors";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../IconButton/IconButton";

interface IReturnButtonProps {
  onClick?: () => void;
  changeColorForSmallScreen?: boolean;
}

export const ReturnButton: React.FC<IReturnButtonProps> = ({
  onClick,
  changeColorForSmallScreen
}) => {
  const navigate = useNavigate();

  const smallScreen = window.innerWidth < 1050;

  return (
    <div className="z-20">
      <IconButton onClick={onClick ?? (() => navigate(-1))}>
        <ArrowBackIcon
          sx={{
            color: smallScreen
              ? colors["blue-0"]
              : changeColorForSmallScreen
              ? colors.white
              : colors["blue-0"],
            ":hover": { color: colors["blue-1"] }
          }}
        />
      </IconButton>
    </div>
  );
};
