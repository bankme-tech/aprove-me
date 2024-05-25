'use client'

import useCheckToken from "@/app/hooks/useCheckToken";
import useGetAssignorsByid from "@/app/hooks/useGetAssignorById";


export default function AssignorDetails({params}: {params: {id: string}}) {
    useCheckToken();
    const { data: assignor, isLoading } = useGetAssignorsByid(params.id);
  return (
    <div>
        <h2>{assignor?.id}</h2>
        <p>{assignor?.document}</p>
        <p>{assignor?.email}</p>
        <p>{assignor?.phone}</p>
        <p>{assignor?.name}</p>
    </div>
  )
}
