"use client"

import useCheckToken from "@/app/hooks/useCheckToken";
import useGetPayableById from "@/app/hooks/useGetPayableById";
import EditErase from "@/components/edit-erase";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import style from "../payables.module.css";

export default function PayableDetails({ params }: { params: { id: string } }) {
    useCheckToken();
    const { data: payable, isLoading } = useGetPayableById(params.id);
  const {push} = useRouter()
    if (isLoading) {
        return <Loading />;
    }

  return (
    <div className={style.cardContainer}>
      <Card className={`py-4 ${style.link}`} key={payable?.id}>
            <EditErase />
              <CardHeader className="pt-2 px-4 flex-col gap-12 items-start">
                <p className="text-tiny uppercase font-bold">
                  id: {payable?.id}
                </p>
                <div>
                  <p className="text-default-500">Emission date:</p>
                  <p>{payable?.emissionDate}</p>
                </div>
                <div>
                <h4 className="font-bold text-large mb-4">value: {payable?.value}</h4>
                <Link className="font-bold text-large underline" href={`/assignor/${payable?.assignorId}`}>See assignor details</Link>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible py-2"></CardBody>
          </Card>
    </div>
  )
}
