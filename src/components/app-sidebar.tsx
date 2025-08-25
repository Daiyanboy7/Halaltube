
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
import { Clapperboard, Home } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GlowingIcon = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <Icon className="transition-all text-foreground/80 group-hover:text-accent group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))]" {...props} />
)

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="border-r border-primary/10 bg-background/30 backdrop-blur-xl">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 p-4">
          <Clapperboard className="w-8 h-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
          <h1 className="text-xl font-bold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
            HalalTube
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Home" 
              isActive={pathname === '/'}
              className="relative"
            >
              <Link href="/">
                <span className="absolute left-0 top-0 h-full w-1 bg-accent rounded-r-full transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
                <GlowingIcon icon={Home} />
                <span className="transition-transform duration-200 group-hover:translate-x-1">Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <ThemeToggle />
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
