
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
    <Icon className="transition-all text-foreground/80 group-hover:text-accent group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))] floating-icon" {...props} />
)

const studyQuotes = [
    "The secret to getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Strive not to be a success, but rather to be of value.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "The mind is not a vessel to be filled, but a fire to be kindled.",
    "The best way to predict the future is to create it.",
    "The journey of a thousand miles begins with a single step.",
    "You are never too old to set another goal or to dream a new dream.",
    "Well done is better than well said.",
    "Procrastination makes easy things hard, hard things harder.",
    "You don’t have to be great to start, but you have to start to be great.",
    "The secret of success is to do the common thing uncommonly well.",
    "I find that the harder I work, the more luck I seem to have.",
    "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
    "There are no shortcuts to any place worth going.",
    "The only place where success comes before work is in the dictionary.",
    "I'm a greater believer in luck, and I find the harder I work the more I have of it.",
    "Discipline is the bridge between goals and accomplishment.",
    "If people only knew how hard I've worked to gain my mastery, it wouldn't seem so wonderful at all.",
];

export function AppSidebar() {
  const pathname = usePathname();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // This check ensures the quote is only generated on the client-side,
    // preventing hydration mismatches.
    setQuote(studyQuotes[Math.floor(Math.random() * studyQuotes.length)]);
  }, []);

  return (
    <Sidebar className="border-r border-primary/10 bg-card/50 backdrop-blur-xl">
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
                <span className="absolute left-0 top-0 h-full w-1 bg-accent rounded-r-full transition-transform duration-300 scale-y-0 group-data-[active=true]:scale-y-100 group-hover:scale-y-100" />
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
                <p className="px-2 text-xs font-medium text-primary drop-shadow-[0_0_3px_hsl(var(--primary))]">Made by Daiyan Al Shams</p>
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
