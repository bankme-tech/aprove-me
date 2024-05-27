import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import style from "../app/payables/payables.module.css";
import EditErase from "./edit-erase";

type CardPayableProps = {
  props: {
    payable: {
      id: string;
      value: string;
      emissionDate: string;
      assignorId: string;
    };
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  }
};
export default function CardPayable({ props }: CardPayableProps) {
  return (
    <div className={style.cardContainer}>
      { props.payable &&
          <Card className={`py-4 ${style.link}`} key={props.payable.id}>
            <EditErase props={{payable: props.payable, setIsOpen: props.setIsOpen, isOpen: props.isOpen}} />
            <Link href={`/payables/${props.payable.id}`} key={props.payable.id}>
              <CardHeader className="pt-2 px-4 flex-col gap-12 items-start">
                <p className="text-tiny uppercase font-bold">
                  id: {props.payable.id}
                </p>
                <div>
                  <p className="text-default-500">Emission date:</p>
                  <p>{props.payable.emissionDate}</p>
                </div>
                <h4 className="font-bold text-large">value: {props.payable.value}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2"></CardBody>
            </Link>
          </Card>
      }
    </div>
  );
}
