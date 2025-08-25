
'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { VideoGrid } from "@/components/video-grid";
import { searchVideos } from "@/lib/youtube";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useState, useEffect, Suspense } from 'react';
import type { Video } from "@/lib/types";
import { VideoPlayerModal } from "@/components/video-player-modal";
import { useSearchParams } from "next/navigation";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || "";
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (query) {
        setIsLoading(true);
        const results = await searchVideos(query);
        setVideos(results);
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, [query]);

  const handleSelectVideo = (video: Video) => {
    localStorage.setItem('lastWatchedVideoId', video.id);
    setSelectedVideo(video);
  }

  const handleCloseModal = () => {
    setSelectedVideo(null);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 font-headline tracking-wider text-primary-foreground">
                Search results for &quot;{query}&quot;
              </h1>
              {isLoading ? (
                 <p className="text-muted-foreground">Searching videos...</p>
              ) : (
                <VideoGrid videos={videos} onSelectVideo={handleSelectVideo} />
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
