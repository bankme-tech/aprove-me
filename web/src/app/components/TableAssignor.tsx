import Assignor from "@/interfaces/Assignor";
import Payable from "@/interfaces/Payable";
import transformDate from "@/utils/transformDate";
import React from "react";
import * as Styled from "../styles/Payable";

type TableAssignorProps = {
  assignor: Assignor;
};

export default function TableAssignor({ assignor }: TableAssignorProps): React.ReactElement {
  return (
    <tr>
    <td>{assignor.name}</td>
    <td>
      <Styled.Button>Details</Styled.Button>
    </td>
  </tr>)
}
