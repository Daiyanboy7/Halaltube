import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-primary/10 bg-background/50 px-4 backdrop-blur-lg md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search videos..." className="w-full rounded-full pl-10 bg-transparent" />
      </div>
      <Button variant="ghost" className="rounded-full group">
        Sign In
        <User className="ml-2 h-4 w-4 transition-all group-hover:text-accent group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))]" />
      </Button>
    </header>
  );
}
