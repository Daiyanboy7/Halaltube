
'use client';
import { AppContent } from "@/components/app-content";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { VideoGrid } from "@/components/video-grid";
import { searchVideos } from "@/lib/youtube";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import type { Video } from "@/lib/types";

export default function ForYouPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lastWatchedVideoId = localStorage.getItem('lastWatchedVideoId');

    async function fetchRelated() {
      if (lastWatchedVideoId) {
        const relatedVideos = await searchVideos("", lastWatchedVideoId);
        setVideos(relatedVideos);
      }
      setIsLoading(false);
    }

    fetchRelated();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 font-headline tracking-wider text-primary-foreground">
                For You
              </h1>
              {isLoading ? (
                <p className="text-muted-foreground">Loading your personalized suggestions...</p>
              ) : videos.length > 0 ? (
                <VideoGrid videos={videos} />
              ) : (
                <p className="text-muted-foreground">Watch a video to get personalized suggestions here!</p>
              )}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
