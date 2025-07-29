"use client"

import {
  SidebarProvider,
} from "@/components/ui/sidebar"

import DashboardSidebar from "@/layouts/sidebar"
import DashboardHeader from "@/layouts/header"

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext"

export default function Dashboard() {

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <DashboardSidebar />
          <div className="flex flex-1 flex-col">
            <DashboardHeader />
              <div className="flex-1 overflow-auto p-4 sm:p-6">
                <Outlet />
              </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}




