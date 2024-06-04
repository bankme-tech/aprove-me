import React, { ReactNode } from "react";

interface IStyleTextButtonProps {
  children: ReactNode;
  size: "small" | "default" | "large";
}

export const StyleTextButton: React.FC<IStyleTextButtonProps> = ({
  children,
  size
}) => {
  return (
    <>
      {size === "large" ? (
        <h2 className="tag-h2 flex flex-none">{children}</h2>
      ) : size === "small" ? (
        <p className="tag-p flex flex-none">{children}</p>
      ) : (
        <p className="tag-p flex flex-none">{children}</p>
      )}
    </>
  );
};
