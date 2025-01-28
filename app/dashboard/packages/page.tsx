'use client'

import { Package } from "@/components/packages/columns"
import { DataTable } from "@/components/packages/data-table"
import { PackageDialog } from "@/components/packages/package-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Temporary data - replace with API call
const data = [
  {
    id: "1",
    name: "Paris Adventure",
    location: "Paris, France",
    itinerary: "Day 1: Eiffel Tower\nDay 2: Louvre Museum\nDay 3: Palace of Versailles",
    price: 1299,
    status: "active" as const,
    availability: "All year round",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    ],
  },
  {
    id: "2",
    name: "Tokyo Explorer",
    location: "Tokyo, Japan",
    itinerary: "Day 1: Shibuya\nDay 2: Akihabara\nDay 3: Mount Fuji",
    price: 1599,
    status: "active" as const,
    availability: "Spring and Fall",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    ],
  },
]

export default function PackagesPage() {
  const [dialogState, setDialogState] = useState<{
    type: "add" | "edit" | "delete" | "view"
    open: boolean
    package_?: Package
  }>({
    type: "add",
    open: false,
  })

  const [packages, setPackages] = useState<Package[]>(data)
  const { toast } = useToast()

  const handleSubmit = (formData: Partial<Package>) => {
    try {
      if (formData.id && dialogState.type === "delete") {
        setPackages(prev => prev.filter(p => p.id !== formData.id))
        toast({
          title: "Package deleted",
          description: "The package has been successfully deleted.",
        })
      } else if (dialogState.type === "add") {
        const newPackage: Package = {
          id: Math.random().toString(36).substring(2),
          name: formData.name!,
          location: formData.location!,
          itinerary: formData.itinerary!,
          price: formData.price!,
          status: formData.status!,
          availability: formData.availability!,
          images: formData.images || [],
        }
        setPackages(prev => [...prev, newPackage])
        toast({
          title: "Package created",
          description: "New package has been successfully created.",
        })
      } else if (dialogState.type === "edit" && formData.id) {
        setPackages(prev =>
          prev.map(p =>
            p.id === formData.id ? { ...p, ...formData } : p
          )
        )
        toast({
          title: "Package updated",
          description: "The package has been successfully updated.",
        })
      }
      setDialogState(prev => ({ ...prev, open: false }))
    } catch (error) {
      console.error('Error handling package:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem processing your request.",
      })
    }
  }

  const handleView = (package_: Package) => {
    setDialogState({
      type: "view",
      open: true,
      package_,
    })
  }

  const handleEdit = (package_: Package) => {
    setDialogState({
      type: "edit",
      open: true,
      package_,
    })
  }

  const handleDelete = (package_: Package) => {
    setDialogState({
      type: "delete",
      open: true,
      package_,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
        <Button
          onClick={() =>
            setDialogState({
              type: "add",
              open: true,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>

      <DataTable
        data={packages}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PackageDialog
        type={dialogState.type}
        open={dialogState.open}
        onOpenChange={(open) =>
          setDialogState((prev) => ({ ...prev, open }))
        }
        package_={dialogState.package_}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
