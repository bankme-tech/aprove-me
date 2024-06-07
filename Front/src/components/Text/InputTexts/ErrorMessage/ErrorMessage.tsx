import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { colors } from "global/Colors";
import React from "react";

export interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex gap-2">
      <ReportProblemIcon sx={{ color: colors["red-0"], width: "12px" }} />
      <p className="tag-h6 mt-1.5 text-red-0">{message}</p>
    </div>
  );
};
