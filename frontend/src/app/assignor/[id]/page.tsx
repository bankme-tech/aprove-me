'use client'

import useCheckToken from "@/app/hooks/useCheckToken";
import useGetAssignorsByid from "@/app/hooks/useGetAssignorById";
import EditErase from "@/components/edit-erase";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import Loading from "../loading";
import style from "../../payables/payables.module.css";


export default function AssignorDetails({params}: {params: {id: string}}) {
    useCheckToken();
    const { data: assignor, isLoading } = useGetAssignorsByid(params.id);

    if (isLoading) return <Loading/>


  return (
    <div className={style.cardContainer}>
          <Card className={`py-4 ${style.link}`} key={assignor?.id}>
              <CardHeader className="pt-2 px-4 flex-col gap-12 items-start">
                <p className="text-tiny uppercase font-bold">
                  id: {assignor?.id}
                </p>
                <div>
                  <p className="text-default-500">Document:</p>
                  <p>{assignor?.document}</p>
                </div>
                <div>
                <h4 className="font-bold text-large mb-4">Name: {assignor?.name}</h4>
                <h4 className="font-bold text-large mb-4">Phone: {assignor?.phone}</h4>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible py-2"></CardBody>
          </Card>
    </div>
  )
}
