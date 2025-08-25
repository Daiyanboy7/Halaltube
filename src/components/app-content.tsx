import { SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { VideoGrid } from "@/components/video-grid";

export function AppContent() {
  return (
    <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 font-headline tracking-wider text-primary-foreground">
            Featured Videos
          </h1>
          <VideoGrid />
        </main>
    </SidebarInset>
  );
}
