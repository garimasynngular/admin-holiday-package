'use client'

import { useRouter, usePathname } from "next/navigation"
import { Package2, MapPin, Users, Calendar, Settings, CreditCard, MessageSquare, HelpCircle, Palmtree } from "lucide-react"

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Packages',
      icon: <Package2 className="w-5 h-5" />,
      path: '/dashboard/packages',
    },
    {
      name: 'Locations',
      icon: <MapPin className="w-5 h-5" />,
      path: '/dashboard/locations',
    },
    {
      name: 'Customers',
      icon: <Users className="w-5 h-5" />,
      path: '/dashboard/customers',
    },
    // {
    //   name: 'Bookings',
    //   icon: <Calendar className="w-5 h-5" />,
    //   path: '/dashboard/bookings',
    // },
    // {
    //   name: 'Payments',
    //   icon: <CreditCard className="w-5 h-5" />,
    //   path: '/dashboard/payments',
    // },
    // {
    //   name: 'Messages',
    //   icon: <MessageSquare className="w-5 h-5" />,
    //   path: '/dashboard/messages',
    // },
    // {
    //   name: 'Settings',
    //   icon: <Settings className="w-5 h-5" />,
    //   path: '/dashboard/settings',
    // },
    // {
    //   name: 'Help',
    //   icon: <HelpCircle className="w-5 h-5" />,
    //   path: '/dashboard/help',
    // }
  ]

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Palmtree className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-gray-800">Holiday Package </h2>
        </div>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                pathname.startsWith(item.path) ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          </div>
        ))}
      </nav>
    </div>
  )
}
