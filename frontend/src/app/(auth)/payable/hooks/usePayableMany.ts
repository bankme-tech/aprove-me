import { usePayable } from "@/context/payable.context";
import { findManyPayable } from "@/services";
import { useDeferredValue, useEffect, useState } from "react";

export const usePayableMany = () => {
  const [payable, setPayable] = useState([]);
  const { update, setUpdate } = usePayable();
  const deferredPayable = useDeferredValue(payable);

  useEffect(() => {
    const fetch = async () => {
      const payable = await findManyPayable({ limit: 10, page: 1 });

      setPayable(payable);
    };

    fetch();

    setUpdate(false);
  }, [update, setUpdate]);

  return { deferredPayable };
};
