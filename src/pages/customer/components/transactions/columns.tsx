

import { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export type Transaction = {
  id: string
  type: string
  date: string
  status: "Success" | "Pending" | "Failed"
  amount: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-gray-600 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction type
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-gray-600 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction date
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-gray-600 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${
              status === "Success"
                ? "bg-green-100 text-green-800"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }
          `}
        >
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent text-gray-600 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: () => {
      return <ChevronRight className="h-4 w-4 text-gray-400" />
    },
  },
]

