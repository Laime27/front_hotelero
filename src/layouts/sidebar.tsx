import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Home,
  Layers,
  Settings,
  Building2,
  BedDouble,
  LayoutDashboard,
  FolderKanban,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";


const menuItems = [
    { url: "/", nombre: "Dashboard", icon: Home },
    { url: "/categorias", nombre: "Categorias", icon: FolderKanban },
    { url: "/pisos", nombre: "Pisos", icon: Building2 },
    { url: "/habitaciones", nombre: "Habitaciones", icon: BedDouble },
  
];

function DashboardSidebar() {
    const location = useLocation();
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Layers className="mr-2 h-6 w-6" />
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>

            <SidebarMenu>


            {menuItems.map((item) => {
              const isActive = location.pathname === item.url;

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-blue-700 hover:text-white ${isActive ? "bg-blue-700 text-white" : ""}`}
                    >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.nombre}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}


            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

export default DashboardSidebar;
