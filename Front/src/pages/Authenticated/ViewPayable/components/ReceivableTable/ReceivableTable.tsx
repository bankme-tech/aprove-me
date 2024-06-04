import { Table } from "components/Table/Simple/Table";
import { IListReceivable } from "interfaces/interfaces/Receivable/IListReceivable";
import React from "react";
import { DetailContent } from "../DetailContent/DetailContent";

interface IReceivableTableProps {
  loading?: boolean;
  receivables: IListReceivable[];
}

export const ReceivableTable: React.FC<IReceivableTableProps> = ({
  loading,
  receivables
}) => (
  <Table
    columns={[
      { dataIndex: "id", title: "id", hideFilter: true },
      { dataIndex: "key", title: "key", notVisible: true },
      { dataIndex: "value", title: "valor", type: "number" },
      {
        dataIndex: "emissionDate",
        title: "data de emissão",
        type: "date"
      }
    ]}
    data={receivables.map((receivable) => ({
      ...receivable,
      key: receivable.id
    }))}
    expandableContent={(receivable: IListReceivable) => (
      <DetailContent receivable={receivable} />
    )}
    loading={loading}
  />
);
