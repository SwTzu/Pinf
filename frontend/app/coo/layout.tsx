"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import {
  LayoutDashboard,
  LogOut,
  UserRoundSearch,
  Menu,
  X,
  BriefcaseBusiness,
  ChartNoAxesCombined,
} from "lucide-react"
import { Tooltip } from "@nextui-org/tooltip"
import type React from "react" // Added import for React

const navItems = [
  { href: "/coo", icon: LayoutDashboard, label: "Panel de administración" },
  { href: "/coo/workspace", icon: BriefcaseBusiness, label: "Espacio de trabajo" },
  { href: "/coo/stats", icon: ChartNoAxesCombined, label: "Estadisticas" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-10 w-16 bg-white shadow-md flex flex-col`}
      >
        <nav className="flex flex-col h-full mt-16">
          {navItems.map((item) => (
            <Tooltip key={item.href} content={item.label} placement="right">
              <Link
                href={item.href}
                className={`p-4 hover:bg-gray-100 transition-colors duration-200 ${
                  isActive(item.href) ? "bg-gray-200" : ""
                }`}
              >
                <item.icon className="w-6 h-6 mx-auto" />
              </Link>
            </Tooltip>
          ))}
          <Tooltip content="Cerrar sesión" placement="right">
            <button
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/"
              }}
              className="p-4 hover:bg-gray-100 transition-colors duration-200 mt-auto"
            >
              <LogOut className="w-6 h-6 mx-auto" />
            </button>
          </Tooltip>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
    </div>
  )
}

