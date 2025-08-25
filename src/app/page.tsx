
'use client';
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { VideoGrid } from "@/components/video-grid";
import { searchVideos, getPopularVideos } from "@/lib/youtube";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState, useCallback } from "react";
import type { Video } from "@/lib/types";
import { VideoPlayerModal } from "@/components/video-player-modal";

export default function ForYouPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const lastWatchedVideoId = localStorage.getItem('lastWatchedVideoId');

    if (lastWatchedVideoId) {
      const relatedVideos = await searchVideos("", lastWatchedVideoId);
      setVideos(relatedVideos);
      setIsPopular(false);
    } else {
      const popularVideos = await getPopularVideos();
      setVideos(popularVideos);
      setIsPopular(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleSelectVideo = (video: Video) => {
    localStorage.setItem('lastWatchedVideoId', video.id);
    setSelectedVideo(video);
  }

  const handleCloseModal = () => {
    setSelectedVideo(null);
    fetchData(); // Refetch data when modal is closed
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 font-headline tracking-wider text-primary-foreground">
                {isPopular ? "Trending Videos" : "For You"}
              </h1>
              {isLoading ? (
                <p className="text-muted-foreground">Loading your personalized suggestions...</p>
              ) : videos.length > 0 ? (
                <VideoGrid videos={videos} onSelectVideo={handleSelectVideo} />
              ) : (
                <p className="text-muted-foreground">Watch a video to get personalized suggestions here!</p>
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
