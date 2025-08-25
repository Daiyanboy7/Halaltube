'use client';

import { useState } from 'react';
import { videos, type Video } from '@/lib/mock-data';
import { VideoCard } from './video-card';
import { VideoPlayerModal } from './video-player-modal';

export function VideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelectVideo={() => setSelectedVideo(video)}
          />
        ))}
      </div>
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
