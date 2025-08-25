import { AppContent } from "@/components/app-content";
import { AppSidebar } from "@/components/app-sidebar";
import { getPopularVideos } from "@/lib/youtube";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Home() {
  const videos = await getPopularVideos();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <AppContent videos={videos} />
      </div>
    </SidebarProvider>
  );
}