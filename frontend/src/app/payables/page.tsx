"use client";

import CardPayable from "@/components/card-payable";
import ModalPayable from "@/components/modal-payable";
import { useState } from "react";
import useCheckToken from "../hooks/useCheckToken";
import useGetAssignors from "../hooks/useGetAssignors";
import useGetPayable from "../hooks/useGetPayable";
import { Payable } from "../hooks/useGetPayableById";
import Loading from "./loading";
import style from "./payables.module.css";

export default function Payables() {
  useCheckToken();
  const { data: payables, isLoading } = useGetPayable();
  const { data: assignors } = useGetAssignors();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.container}>
      {payables &&
        payables.map((payable: Payable) => (
          <div key={payable.id}>
            <CardPayable props={{payable, setIsOpen, isOpen}} />
            <ModalPayable
              props={{
                payable,
                assignors: assignors || [],
                isOpen,
                setIsOpen,
              }}
            />
          </div>
        ))}
    </div>
  );
}
