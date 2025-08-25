'use client';

import type { Video } from '@/lib/types';
import { VideoCard } from './video-card';

export function VideoGrid({ videos, onSelectVideo }: { videos: Video[], onSelectVideo?: (video: Video) => void }) {

  if (videos.length === 0) {
    return <p className="text-muted-foreground">No videos found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelectVideo={onSelectVideo}
          />
        ))}
      </div>
    </>
  );
}
