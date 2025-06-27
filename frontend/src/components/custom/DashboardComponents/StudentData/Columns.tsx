"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Actions } from "./StudentActions/Actions";
// Assuming this is your action component

export interface Student {
  id: string;
  code: string;
  name: string;
  grade: string;
  class: string;
}

export const columns: ColumnDef<Student>[] = [
  {
    id: "studentNumber",
    header: "No",
    cell: (info: CellContext<Student, any>) => {
      const { table, row } = info;
      const { pageIndex } = table.getState().pagination;
      const rowIndex = table.getSortedRowModel().rows.indexOf(row);
      return rowIndex + 1 + pageIndex;
    },
    enableSorting: false,
  },
  {
    accessorKey: "code",
    header: "Roll No",
  },
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => (
      <Actions id={row.original.id} name={row.original.name} />
    ),
  },
];
