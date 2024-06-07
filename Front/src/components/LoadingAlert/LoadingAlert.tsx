import React from "react";

export interface ILoadingAlertProps {
  size?: "small" | "default" | "large";
}

export const LoadingAlert: React.FC<ILoadingAlertProps> = ({
  size: sizeDefault
}) => {
  const size = sizeDefault ?? "default";

  const sizeStle = {
    small: "w-1.5",
    default: "w-2",
    large: "w-3"
  };

  return (
    <div className="relative flex h-min w-full animate-bounce items-center justify-center ease-in">
      <div
        className={`relative bottom-0 right-2 aspect-square animate-pulse-slow rounded-full bg-purple-0 ${sizeStle[size]}`}
      />
      {size === "small" && <p className="tag-h5">Carregando...</p>}
      {size === "default" && <h3 className="tag-h3">Carregando...</h3>}
      {size === "large" && <h2 className="tag-h2">Carregando...</h2>}
    </div>
  );
};
