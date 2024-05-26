"use client";

import CardPayable from "@/components/card-payable";
import useCheckToken from "../hooks/useCheckToken";
import useGetPayable from "../hooks/useGetPayable";
import { Payable } from "../hooks/useGetPayableById";
import Loading from "./loading";
import style from "./payables.module.css";
import ModalPayable from "@/components/modal-payable";

export default function Payables() {
  useCheckToken();
  const { data: payables, isLoading } = useGetPayable();
  if (isLoading) {
    return (
        <Loading />
    );
  }

  return (
    <div className={style.container}>
      {payables &&
        payables.map((payable: Payable) => <CardPayable payable={payable} key={payable.id} />)}
    </div>
  );
}
