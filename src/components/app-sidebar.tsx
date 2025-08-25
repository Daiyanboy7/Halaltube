
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Clapperboard, Home, Flame, History, Library, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GlowingIcon = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <Icon className="transition-all group-hover:text-accent group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))]" {...props} />
)

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="border-r border-primary/20 bg-background/30 backdrop-blur-xl">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 p-2">
          <Clapperboard className="w-8 h-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
          <h1 className="text-xl font-bold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
            HalalTube
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home" isActive={pathname === '/'}>
              <Link href="/">
                <GlowingIcon icon={Home} />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="History">
              <Link href="#">
                <GlowingIcon icon={History} />
                <span>History</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Library">
                <Link href="#">
                    <GlowingIcon icon={Library} />
                    <span>Library</span>
                </Link>
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
