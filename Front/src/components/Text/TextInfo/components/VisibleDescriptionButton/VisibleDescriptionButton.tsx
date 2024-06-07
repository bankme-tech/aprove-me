import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { colors } from "global/Colors";
import React from "react";

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
            color: colors["purple-0"],
            borderRadius: "100%",
            ":hover": { backgroundColor: colors["purple-2"] }
          }}
          fontSize="small"
        />
      ) : (
        <VisibilityOffIcon
          onClick={onInvertVisibility}
          sx={{
            color: colors["purple-0"],
            borderRadius: "100%",
            ":hover": { backgroundColor: colors["purple-2"] }
          }}
          fontSize="small"
        />
      )}
    </>
  );
};
