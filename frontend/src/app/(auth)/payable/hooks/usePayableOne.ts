import { findOnePayable } from "@/services";
import { useEffect, useState } from "react";

export const usePayableOne = (id: string) => {
  const [payable, setPayable] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const payable = await findOnePayable(id);

      setPayable(payable);
    };

    fetch();
  }, [id]);

  return { payable };
};
