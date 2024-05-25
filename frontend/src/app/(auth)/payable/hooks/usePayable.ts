import { findManyPayable } from "@/services";
import { useDeferredValue, useEffect, useState } from "react";

export const usePayable = () => {
  const [payable, setPayable] = useState([]);
  const deferredPayable = useDeferredValue(payable);

  useEffect(() => {
    const fetch = async () => {
      const payable = await findManyPayable({ limit: 10, page: 1 });

      setPayable(payable);
    };

    fetch();
  }, []);

  return { deferredPayable };
};
