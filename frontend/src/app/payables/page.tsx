"use client";

import CardPayable from "@/components/card-payable";
import useCheckToken from "../hooks/useCheckToken";
import useGetPayable from "../hooks/useGetPayable";
import Loading from "./loading";
import style from './payables.module.css';

export default function Payables() {
  useCheckToken();
  const { data: payables, isLoading } = useGetPayable();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={style.container}
    >
     <h1 className="text-4xl font-bold">Payables</h1>
      <CardPayable payables={payables} />
    </div>
  );
}
