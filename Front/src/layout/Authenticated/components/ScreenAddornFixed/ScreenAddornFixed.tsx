import { ReturnButton } from "components/Button/Return/Return";
import React, { useEffect, useRef, useState } from "react";
import { useIsVisible } from "utils/effectUtils";

interface IScreenAddornFixedProps {
  hasReturnButton?: boolean;
  mouseY?: number;
}

export const ScreenAddornFixed: React.FC<IScreenAddornFixedProps> = ({
  hasReturnButton,
  mouseY
}) => {
  const [isVisibleTop, setIsVisibleTop] = useState<boolean>(true);

  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);

  const visibleTopStyle =
    isVisibleTop && isVisible ? "opacity-100" : "opacity-0";
  const visibleBottomStyle = isVisible ? "opacity-100" : "opacity-0";
  const indexStyle = isVisibleTop && isVisible ? "z-10" : "-z-10";

  useEffect(() => {
    const percentageOfTop = mouseY ? (mouseY / window.innerHeight) * 100 : 0;
    if (!hasReturnButton && percentageOfTop < 15) setIsVisibleTop(false);
    else setIsVisibleTop(true);
  }, [mouseY]);

  return (
    <div ref={ref} className="z-10">
      <img
        className={`fixed top-0 z-0 w-full transition-opacity duration-300 ease-in sm:invisible ${visibleTopStyle} ${indexStyle}`}
        alt="addornTop"
        src="/assets/AddornTop.svg"
      />
      <img
        className={`fixed bottom-0 w-fit transition-opacity duration-300 ease-in sm:invisible md:invisible ${visibleBottomStyle}`}
        alt="addornBottom"
        src="/assets/AddornBottom.svg"
      />
      <div className="fixed right-12 top-5 z-10">
        {hasReturnButton && <ReturnButton />}
      </div>
    </div>
  );
};
