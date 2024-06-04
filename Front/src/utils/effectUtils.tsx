import { useEffect, useState } from "react";

export function useIsVisible(ref: any) {
  const [isIntersecting, setIntersecting] = useState<boolean>();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(ref?.["current"]);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
