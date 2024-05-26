'use client'

import Assignor from "@/interfaces/Assignor";
import React from "react";
import * as Styled from "../styles/Details";
import { useRouter } from "next/navigation";

type TableAssignorProps = {
  assignor: Assignor;
};

export default function TableAssignor({ assignor }: TableAssignorProps): React.ReactElement {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/assignor/${assignor.id}`);
  }

  return (
    <tr onClick={handleClick}>
    <td>{assignor.name}</td>
    <td>
      <Styled.Button 
        onClick={handleClick}
      >Details</Styled.Button>
    </td>
  </tr>)
}
