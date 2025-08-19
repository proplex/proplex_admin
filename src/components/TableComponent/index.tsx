/** @format */

import React from "react";
import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import TBody from "./TBody";
import THeader from "./THeader";

interface TableComponentProps<TData> {
  columns: ColumnDef<any, any>[];
  data: any[];
  model?: string;
}

function TableComponent<TData>({ columns, data, model }: TableComponentProps<TData>) {
  const [columnSizing, setColumnSizing] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnSizing,
    },
    defaultColumn: {
      enableSorting: true,
      enableResizing: true,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    onColumnSizingChange: setColumnSizing,
  });

  const tableData = table.getRowModel().rows || [];

  return (
    <div className="overflow-auto">
      <table className="min-w-full table-fixed border border-gray-300">
        <THeader headerGroups={table.getHeaderGroups()} />
        <TBody data={tableData} model={model} />
      </table>
    </div>
  );
}

export default TableComponent;
