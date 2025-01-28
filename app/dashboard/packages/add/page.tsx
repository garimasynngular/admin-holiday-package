'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function AddPackage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    itinerary: '',
    status: 'draft',
    images: [] as File[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...Array.from(e.target.files)]
      })
    }
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Package Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Package Name</Label>
              <Input
                id="name"
                placeholder="Enter package name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-2">
              <Label htmlFor="itinerary">Itinerary</Label>
              <Textarea
                id="itinerary"
                placeholder="Day 1: Arrival and check-in&#10;Day 2: City tour&#10;..."
                className="min-h-[200px]"
                value={formData.itinerary}
                onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
                required
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <div className="flex flex-col gap-4">
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="cursor-pointer"
                  required
                />
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" className="w-full">
                Create Package
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
