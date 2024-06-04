import React, { ReactNode, useRef } from "react";
import { useIsVisible } from "utils/effectUtils";

interface ILayoutUnauthenticatedPageProps {
  children: ReactNode;
}

export const LayoutUnauthenticatedPage: React.FC<
  ILayoutUnauthenticatedPageProps
> = ({ children }) => {
  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);

  const visibleStyle = isVisible ? "opacity-100" : "opacity-0";

  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-0 via-purple-1 to-purple-0 p-5 transition-opacity duration-500 ease-in ${visibleStyle}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
