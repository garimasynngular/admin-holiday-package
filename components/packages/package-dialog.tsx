'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Package } from "./columns"
import { PackageForm } from "./package-form"
import { Button } from "@/components/ui/button"

interface PackageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "add" | "edit" | "delete" | "view"
  package_?: Package
  onSubmit: (data: Partial<Package>) => void
}

export function PackageDialog({
  open,
  onOpenChange,
  type,
  package_,
  onSubmit
}: PackageDialogProps) {
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleSubmit = (data: Partial<Package>) => {
    onSubmit(data)
    handleClose()
  }

  const renderContent = () => {
    switch (type) {
      case "add":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Add New Package</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <PackageForm
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            </div>
          </>
        )
      case "edit":
        if (!package_) return null
        return (
          <>
            <DialogHeader>
              <DialogTitle>Edit Package</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <PackageForm
                initialData={package_}
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            </div>
          </>
        )
      case "delete":
        if (!package_) return null
        return (
          <>
            <DialogHeader>
              <DialogTitle>Delete Package</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this package? This action cannot be undone.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{package_?.name}</p>
                <p className="text-sm text-gray-500 mt-1">{package_?.location}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleSubmit({ id: package_?.id })}
                >
                  Delete Package
                </Button>
              </div>
            </div>
          </>
        )
      case "view":
        if (!package_) return null
        return (
          <>
            <DialogHeader>
              <DialogTitle>{package_?.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Images</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {package_?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Package ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Itinerary</h3>
                <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{package_?.itinerary}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="mt-1 text-sm text-gray-500">{package_?.location}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Price</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(package_?.price || 0)}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Status</h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">{package_?.status}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Availability</h3>
                  <p className="mt-1 text-sm text-gray-500">{package_?.availability}</p>
                </div>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
