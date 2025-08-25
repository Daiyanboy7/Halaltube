
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Clapperboard, Home, PanelLeft, Quote } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const GlowingIcon = ({ icon: Icon, ...props }: { icon: React.ElementType, [key: string]: any }) => (
    <Icon className="transition-all text-foreground/80 group-hover:text-accent group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))]" {...props} />
)

const studyQuotes = [
    "The secret to getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Believe you can and you're halfway there.",
];

export function AppSidebar() {
  const pathname = usePathname();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Set a random quote on mount, client-side only
    setQuote(studyQuotes[Math.floor(Math.random() * studyQuotes.length)]);
  }, []);

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

        <SidebarGroup className="mt-4 group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex items-center gap-2">
                <Quote className="w-4 h-4" />
                Quote of the Day
            </SidebarGroupLabel>
            <p className="px-2 text-xs text-muted-foreground italic">
                &quot;{quote}&quot;
            </p>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto">
        <SidebarSeparator />
        <SidebarMenu>
            <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                <p className="px-2 text-xs text-muted-foreground">Made by Daiyan Al Shams</p>
            </SidebarMenuItem>
            <SidebarMenuItem className="hidden md:block">
                <SidebarTrigger>
                    <GlowingIcon icon={PanelLeft}/>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">Collapse</span>
                </SidebarTrigger>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <ThemeToggle />
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
