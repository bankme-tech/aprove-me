import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { colors } from "global/Colors";

interface IVisibleDescriptionButtonProps {
  onInvertVisibility: () => void;
  visibleDescription: boolean;
}

export const VisibleDescriptionButton: React.FC<
  IVisibleDescriptionButtonProps
> = ({ onInvertVisibility, visibleDescription }) => {
  return (
    <>
      {visibleDescription ? (
        <VisibilityIcon
          onClick={onInvertVisibility}
          sx={{
            color: colors["blue-0"],
            borderRadius: "100%",
            ":hover": { backgroundColor: colors["blue-2"] }
          }}
          fontSize="small"
        />
      ) : (
        <VisibilityOffIcon
          onClick={onInvertVisibility}
          sx={{
            color: colors["blue-0"],
            borderRadius: "100%",
            ":hover": { backgroundColor: colors["blue-2"] }
          }}
          fontSize="small"
        />
      )}
    </>
  );
};
