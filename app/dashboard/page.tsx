'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { User } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center gap-4">
              {/* <input
                type="search"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => router.push('/profile')}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/auth/login')}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Holiday Package</h1>
          <p className="text-gray-600">Select a section from the sidebar to get started.</p>
        </div>
      </div>
    </div>
  )
}
