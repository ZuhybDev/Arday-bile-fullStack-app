"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { SubjectActions } from "../../../custom/DashboardComponents/Subject/SubjectActions/Actioins";
// Assuming this is your action component

export interface Subject {
  id: string;
  name: string;
  passMark: number;
}

export const columns: ColumnDef<Subject>[] = [
  {
    id: "subjectNumber",
    header: "No",
    cell: (info: CellContext<Subject, any>) => {
      const { table, row } = info;
      const { pageIndex } = table.getState().pagination;
      const rowIndex = table.getSortedRowModel().rows.indexOf(row);
      return rowIndex + 1 + pageIndex;
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "passMark",
    header: "Full marks",
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => (
      <SubjectActions id={row.original.id} name={row.original.name} />
    ),
  },
];
