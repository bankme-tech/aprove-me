import React, { ReactNode, useRef, useState } from "react";
import { useIsVisible } from "utils/effectUtils";
import { ScreenAddornFixed } from "./components/ScreenAddornFixed/ScreenAddornFixed";
import { Title } from "./components/Title/Title";

interface ILayoutSecurePageProps {
  children: ReactNode;
  hasReturnButton?: boolean;
  title: string;
}

export const LayoutSecurePage: React.FC<ILayoutSecurePageProps> = ({
  children,
  hasReturnButton,
  title
}) => {
  const [mouseY, setMouseY] = useState<number>();

  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);

  const handleMouseMove = (event: any) => setMouseY(event.clientY);

  const visibleStyle = isVisible ? "opacity-100" : "opacity-0";

  return (
    <div
      className="relative z-0 flex h-screen w-screen overflow-x-hidden xl:overflow-y-hidden"
      onMouseMove={handleMouseMove}
    >
      <ScreenAddornFixed hasReturnButton={hasReturnButton} mouseY={mouseY} />

      <div
        className={`flex w-screen flex-col duration-500 xl:mt-4 ${visibleStyle}`}
        ref={ref}
      >
        <Title title={title} />
        <div className="mb-6 max-h-full">{children}</div>
      </div>
    </div>
  );
};
