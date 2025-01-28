'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export type Location = {
  id: string
  name: string
  description: string
  country: string
  region: string
  images: string[]
  status: "active" | "inactive"
  popularity: "high" | "medium" | "low"
}

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "success" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "popularity",
    header: "Popularity",
    cell: ({ row }) => {
      const popularity = row.getValue("popularity") as string
      const variant = {
        high: "success",
        medium: "destructive",
        low: "secondary"
      }[popularity] || "secondary"
      
      return (
        <Badge variant={status === "active" ? "success" : "secondary"}>
          {popularity}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const location = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("View description", location.id)}
            >
              View Description
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("View images", location.id)}
            >
              View Images
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Edit location", location.id)}
              className="text-blue-600"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete location", location.id)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
