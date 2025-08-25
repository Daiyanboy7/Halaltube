"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Clapperboard, Home, Flame, History, Library, User, Settings } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const GlowingIcon = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <Icon className="transition-all group-hover:text-accent group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))]" {...props} />
)

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-primary/10 bg-background/50 backdrop-blur-xl">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Clapperboard className="w-8 h-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
          <h1 className="text-xl font-bold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
            HalalTube
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home" isActive>
              <GlowingIcon icon={Home} />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Trending">
              <GlowingIcon icon={Flame} />
              <span>Trending</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="History">
              <GlowingIcon icon={History} />
              <span>History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Library">
                <GlowingIcon icon={Library} />
                <span>Library</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile">
                    <GlowingIcon icon={User} />
                    <span>Profile</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ThemeToggle />
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
