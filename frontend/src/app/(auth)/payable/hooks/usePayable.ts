import { findManyPayable } from "@/services";
import { useEffect, useState } from "react";

export const usePayable = () => {
  const [payable, setPayable] = useState();

  useEffect(() => {
    const fetch = async () => {
      const payable = await findManyPayable({ limit: 10, page: 1 });

      setPayable(payable);
    };

    fetch();
  }, []);

  return { payable };
};
