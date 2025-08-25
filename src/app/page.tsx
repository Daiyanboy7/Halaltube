
'use client';
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { VideoGrid } from "@/components/video-grid";
import { getPopularVideos } from "@/lib/youtube";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import type { Video } from "@/lib/types";
import { VideoPlayerModal } from "@/components/video-player-modal";
import { MotivationalTextStream } from "@/components/motivational-text-stream";

export default function ForYouPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const popularVideos = await getPopularVideos();
      setVideos(popularVideos);
      setIsLoading(false);
    };
    fetchVideos();
  }, []);
  
  const handleSelectVideo = (video: Video) => {
    localStorage.setItem('lastWatchedVideoId', video.id);
    setSelectedVideo(video);
  }

  const handleCloseModal = () => {
    setSelectedVideo(null);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen relative">
        <MotivationalTextStream />
        <AppSidebar />
        <SidebarInset>
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 z-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 font-headline tracking-wider text-primary-foreground">
                Popular Videos
              </h1>
              {isLoading ? (
                <p className="text-muted-foreground">Loading videos...</p>
              ) : videos.length > 0 ? (
                <VideoGrid videos={videos} onSelectVideo={handleSelectVideo} />
              ) : (
                <p className="text-muted-foreground">No videos found.</p>
              )}
            </main>
        </SidebarInset>
      </div>
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
        />
      )}
    </SidebarProvider>
  );
}
