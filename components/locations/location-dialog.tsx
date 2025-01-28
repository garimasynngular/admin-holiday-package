'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Location } from "./columns"
import { LocationForm } from "./location-form"
import { Button } from "@/components/ui/button"

interface LocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "add" | "edit" | "delete" | "view"
  location?: Location
  onSubmit: (data: Partial<Location>) => void
}

export function LocationDialog({
  open,
  onOpenChange,
  type,
  location,
  onSubmit
}: LocationDialogProps) {
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleSubmit = (data: Partial<Location>) => {
    onSubmit(data)
    handleClose()
  }

  const renderContent = () => {
    switch (type) {
      case "add":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <LocationForm
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            </div>
          </>
        )
      case "edit":
        if (!location) return null
        return (
          <>
            <DialogHeader>
              <DialogTitle>Edit Location</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <LocationForm
                initialData={location}
                onSubmit={handleSubmit}
                onCancel={handleClose}
              />
            </div>
          </>
        )
      case "delete":
        if (!location) return null
        return (
          <>
            <DialogHeader>
              <DialogTitle>Delete Location</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this location? This action cannot be undone.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{location?.name}</p>
                <p className="text-sm text-gray-500 mt-1">{location?.country}, {location?.region}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleSubmit({ id: location?.id })}
                >
                  Delete Location
                </Button>
              </div>
            </div>
          </>
        )
      case "view":
        if (!location) return null
        return (
          <>
            <DialogHeader>
              <DialogTitle>{location?.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Images</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {location?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Location ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{location?.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900">Country</h3>
                  <p className="mt-1 text-sm text-gray-500">{location?.country}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Region</h3>
                  <p className="mt-1 text-sm text-gray-500">{location?.region}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Status</h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">{location?.status}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Popularity</h3>
                  <p className="mt-1 text-sm text-gray-500 capitalize">{location?.popularity}</p>
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
