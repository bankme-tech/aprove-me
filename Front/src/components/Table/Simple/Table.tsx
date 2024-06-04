import { RowProps, Table as TableAntd } from "antd";
import { SearchBar } from "components/Table/components/SearchBar/SearchBar";
import { TagText } from "components/Text/TagText/TagText";
import { AllTypes } from "interfaces/interfaces/Global/AllTypes";
import { IColumn } from "interfaces/interfaces/Table/IColumn";
import React, { ReactNode, useEffect, useState } from "react";
import { ArrayUtils } from "utils/arrayUtils";
import { DateUtils } from "utils/dateUtils";
import { TextUtils } from "utils/textUtils";
import { StyledRow } from "../components/StyledRow/StyledRow";
import "../styles/styles.css";

export interface ITableProps {
  checkbox?: boolean;
  columns: IColumn[];
  data: any[];
  expandableContent?: (record: any) => ReactNode;
  hideHeader?: boolean;
  hideSearchBar?: boolean;
  loading?: boolean;
  quantityRowsPerPageInitial?: number;
  onRowClick?: (record: any) => void;
  rowTooltip?: string;
}

export const Table: React.FC<ITableProps> = ({
  checkbox,
  columns,
  data,
  expandableContent,
  hideHeader,
  hideSearchBar,
  loading,
  quantityRowsPerPageInitial,
  onRowClick,
  rowTooltip
}) => {
  const smallScreen = window.innerWidth < 1350;
  const smallScreenStyle = smallScreen ? "100%" : "67.5vh";

  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [quantityRowsPerPage, setQuantityRowsPerPage] = useState(
    quantityRowsPerPageInitial ?? 10
  );
  const hasFewData = data.length < 10 || quantityRowsPerPage < 10;

  const formatValues = (data: any[], formatAsDate?: boolean): any[] =>
    data
      ?.map((obj) => (formatAsDate ? DateUtils.formatDate(new Date(obj)) : obj))
      .map((obj) => obj?.toString());

  const orderAscendingGeneral = (
    a: any,
    b: any,
    formatAsDate?: boolean,
    formatAsNumber?: boolean
  ): number => {
    if (formatAsDate) return ArrayUtils.orderDate(a, b);
    else if (formatAsNumber)
      return ArrayUtils.orderNumber(Number(a), Number(b));
    else return ArrayUtils.orderString(a, b);
  };

  const onFilter = (
    value: React.Key | AllTypes,
    record: any,
    dataIndex: string
  ) => record[dataIndex]?.toString() === value?.toString();

  const showListOfFilters = (column: IColumn, data: any[]) => {
    const asDate = column?.type === "date";
    const asNumber = column?.type === "number";
    const key = column.dataIndex;

    const notRepeatedList = ArrayUtils.removeDuplicatedValuesWithKey(data, key);
    const orderedList = notRepeatedList.sort((a, b) =>
      orderAscendingGeneral(a, b, asDate, asNumber)
    );
    const formattedValues = formatValues(orderedList, asDate);
    const notRepeatedListFormatted =
      ArrayUtils.removeDuplicatedValues(formattedValues);

    return notRepeatedListFormatted.map((obj) => ({
      text: String(obj),
      value: String(obj)
    }));
  };

  const columnsWithSorterAndFilter = columns
    .filter((column) => !column.notVisible)
    .map((column) => ({
      ...column,
      title: column.title?.toLowerCase(),
      sorter: (objA: any, objB: any) =>
        orderAscendingGeneral(
          objA[column.dataIndex],
          objB[column.dataIndex],
          column?.type === "date"
        ),
      filters:
        column.hideFilter || column?.type === "boolean"
          ? undefined
          : showListOfFilters(column, searchedData),
      onFilter: (value: React.Key | AllTypes, record: any) =>
        onFilter(value, record, column.dataIndex),
      render: column.render
        ? (record: any) => column.render && column.render(record)
        : column?.type === "date"
        ? (record: any) => DateUtils.formatDate(new Date(record))
        : column?.type === "boolean"
        ? (record: boolean) => (
            <TagText level={record ? "low" : "high"}>
              {record ? "Sim" : "Não"}
            </TagText>
          )
        : undefined
    }));

  const searchData = (filterQuery?: string) => {
    const filterQueryIsEmpty =
      filterQuery === "" || filterQuery === undefined || filterQuery === null;

    if (!filterQueryIsEmpty) {
      const wordsForFilter = TextUtils.splitQuerySearch(filterQuery);
      const filteredItems = data.filter((item) => {
        const itemValues = Object.values(item);

        return wordsForFilter.every((wordForFilter) =>
          itemValues.some((itemValue) => {
            const wordForFilterLowerCase = wordForFilter.toLowerCase();
            const hasWordInSolicitation = itemValue
              ?.toString()
              .toLowerCase()
              ?.includes(wordForFilterLowerCase);
            return hasWordInSolicitation;
          })
        );
      });

      setSearchedData(filteredItems);
    }
  };

  const cleanSearch = () => setSearchedData(data);

  useEffect(() => setSearchedData(data), [data]);

  return (
    <div className="scrollbar-pattern flex w-full flex-col gap-2">
      <div className="flex w-full justify-end gap-4">
        {!hideSearchBar && (
          <div className="flex w-full justify-end">
            <div className="w-1/3 sm:w-full">
              <SearchBar
                onClean={cleanSearch}
                onSearch={(filterQuery) => searchData(filterQuery)}
              />
            </div>
          </div>
        )}
      </div>

      <TableAntd
        style={{
          cursor: onRowClick ? "pointer" : ""
        }}
        columns={columnsWithSorterAndFilter}
        components={{
          body: {
            row: (props: RowProps) => (
              <StyledRow isOpeanable={Boolean(rowTooltip)} props={props} />
            )
          }
        }}
        dataSource={searchedData}
        size="small"
        bordered
        rowSelection={checkbox ? {} : undefined}
        showHeader={!hideHeader}
        loading={loading}
        scroll={{
          x: "100vw",
          y: hasFewData ? undefined : smallScreenStyle
        }}
        pagination={
          data.length <= quantityRowsPerPage
            ? false
            : {
                position: ["bottomRight"],
                pageSize: quantityRowsPerPage,
                onChange: (_, pageSize) => setQuantityRowsPerPage(pageSize)
              }
        }
        sticky
        onRow={
          onRowClick
            ? (record) => ({ onClick: () => onRowClick(record) })
            : undefined
        }
        expandable={{
          expandedRowRender: expandableContent,
          expandRowByClick: true
        }}
      />
    </div>
  );
};
