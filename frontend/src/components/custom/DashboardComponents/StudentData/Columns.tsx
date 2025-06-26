"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
      const { pageIndex, pageSize } = table.getState().pagination;
      const allRows = table.getSortedRowModel().rows;
      const rowIndex = allRows.indexOf(row);
      return rowIndex + 1 + pageIndex;
    },
    enableSorting: false,
  },
  {
    accessorKey: "code",
    header: "RollNo",
  },
  {
    accessorKey: "name",
    header: " Student Name",
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
  },
];
