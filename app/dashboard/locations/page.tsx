'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Location, columns } from "@/components/locations/columns"
import { LocationDialog } from "@/components/locations/location-dialog"

// Temporary data for testing
const data: Location[] = [
  {
    id: "1",
    name: "Maldives",
    description: "A tropical paradise with crystal clear waters and white sandy beaches. Perfect for honeymoons and luxury vacations.",
    country: "Maldives",
    region: "South Asia",
    images: [
      "https://example.com/maldives1.jpg",
      "https://example.com/maldives2.jpg"
    ],
    status: "active",
    popularity: "high"
  },
  {
    id: "2",
    name: "Swiss Alps",
    description: "Majestic mountain ranges offering world-class skiing, hiking, and breathtaking scenery.",
    country: "Switzerland",
    region: "Europe",
    images: [
      "https://example.com/swiss1.jpg",
      "https://example.com/swiss2.jpg"
    ],
    status: "active",
    popularity: "high"
  }
]

export default function LocationsPage() {
  const [dialogState, setDialogState] = useState<{
    open: boolean
    type: "add" | "edit" | "delete" | "view"
    location?: Location
  }>({
    open: false,
    type: "add"
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleAction = (type: "add" | "edit" | "delete" | "view", location?: Location) => {
    setDialogState({ open: true, type, location })
  }

  const handleSubmit = (data: Partial<Location>) => {
    // TODO: Implement API calls
    console.log("Submit data:", data)
    console.log("Action type:", dialogState.type)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Locations</h1>
        <Button onClick={() => handleAction("add")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LocationDialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
        type={dialogState.type}
        location={dialogState.location}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
