"use client"

import { usePathname } from "next/navigation"
import { Home, UserX, BarChartIcon as ChartColumn, Building2, LayoutPanelLeft } from "lucide-react"
import { funcionLogOut } from "@/api/standar"
import styles from "@/styles/body.module.css"
export default function CooLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/coo", icon: Home, text: "Inicio" },
    { href: "/coo/stats", icon: ChartColumn, text: "Estadísticas" },
    { href: "/coo/emp", icon: Building2, text: "Empresas" },
    { href: "/coo/workspace", icon: LayoutPanelLeft, text: "Workspace" },
  ]

  return (
    <div className={styles.body}>
      <nav className="flex flex-col justify-between bg-white shadow-md w-16 sm:w-64 transition-all duration-300 ease-in-out">
        <div className="flex flex-col space-y-2 p-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center p-2 rounded-lg transition-colors duration-200 ease-in-out
                ${isActive(item.href) ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <item.icon className="flex-shrink-0" size={24} />
              <span className="ml-3 hidden sm:inline">{item.text}</span>
            </a>
          ))}
        </div>
        <a
          href="/"
          className="flex items-center p-2 mt-auto text-black hover:bg-red-100 rounded-lg transition-colors duration-200 ease-in-out"
          onClick={funcionLogOut}
        >
          <UserX className="flex-shrink-0" size={24} />
          <span className="ml-3 hidden sm:inline">Cerrar Sesión</span>
        </a>
      </nav>
      <main className="flex-grow">
        <section id="secctioncoo">{children}</section>
      </main>
    </div>
  )
}

