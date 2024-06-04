import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "global/Colors";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../IconButton/IconButton";

interface IReturnButtonProps {
  onClick?: () => void;
}

export const ReturnButton: React.FC<IReturnButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="z-20">
      <IconButton onClick={onClick ?? (() => navigate(-1))}>
        <ArrowBackIcon
          sx={{
            color: colors["purple-1"],
            ":hover": { color: colors["purple-0"] }
          }}
        />
      </IconButton>
    </div>
  );
};
