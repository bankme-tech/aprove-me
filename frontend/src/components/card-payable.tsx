import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import style from "../app/payables/payables.module.css";
import EditErase from "./edit-erase";

type CardPayableProps = {
  payable: {
    id: string;
    value: string;
    emissionDate: string;
    assignorId: string;
  };
};
export default function CardPayable({ payable }: CardPayableProps) {
  return (
    <div className={style.cardContainer}>
      { payable &&
          <Card className={`py-4 ${style.link}`} key={payable.id}>
            <EditErase />
            <Link href={`/payables/${payable.id}`} key={payable.id}>
              <CardHeader className="pt-2 px-4 flex-col gap-12 items-start">
                <p className="text-tiny uppercase font-bold">
                  id: {payable.id}
                </p>
                <div>
                  <p className="text-default-500">Emission date:</p>
                  <p>{payable.emissionDate}</p>
                </div>
                <h4 className="font-bold text-large">value: {payable.value}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2"></CardBody>
            </Link>
          </Card>
      }
    </div>
  );
}
