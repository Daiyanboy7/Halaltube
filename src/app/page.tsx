import { AppContent } from "@/components/app-content";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <AppContent />
      </div>
    </SidebarProvider>
  );
}
