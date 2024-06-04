import { ReactNode } from "react";
import { ColumnType } from "./ColumnType";

export interface IColumn {
  dataIndex: string;
  hideFilter?: boolean;
  notVisible?: boolean;
  render?: (record: any) => ReactNode;
  title: string;
  type?: ColumnType;
}
