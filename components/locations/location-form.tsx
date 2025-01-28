'use client'

import { useState } from "react"
import { Location } from "./columns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LocationFormProps {
  initialData?: Location
  onSubmit: (data: Partial<Location>) => void
  onCancel: () => void
}

export function LocationForm({
  initialData,
  onSubmit,
  onCancel
}: LocationFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [formData, setFormData] = useState<Omit<Location, 'id' | 'images'>>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    country: initialData?.country || "",
    region: initialData?.region || "",
    status: initialData?.status || "active",
    popularity: initialData?.popularity || "medium",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      images,
      ...(initialData?.id ? { id: initialData.id } : {})
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Location Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="region">Region</Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="popularity">Popularity</Label>
          <Select
            value={formData.popularity}
            onValueChange={(value: "high" | "medium" | "low") => setFormData({ ...formData, popularity: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Images</Label>
          <div className="mt-2 grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Location ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
            <label className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <ImagePlus className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Add Image</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Location" : "Create Location"}
        </Button>
      </div>
    </form>
  )
}
