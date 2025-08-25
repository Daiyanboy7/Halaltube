
'use client';

import Image from 'next/image';
import type { Video } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
}

export function VideoCard({ video, onSelectVideo }: VideoCardProps) {
  const handleSelect = () => {
    localStorage.setItem('lastWatchedVideoId', video.id);
    onSelectVideo(video);
  }

  return (
    <button
      onClick={handleSelect}
      className="group w-full text-left"
    >
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/30">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          width={600}
          height={400}
          className="h-full w-full object-cover"
          data-ai-hint="video thumbnail"
          unoptimized
        />
      </div>
      <div className="mt-4 flex items-start gap-4">
        <Avatar>
          <AvatarImage src={video.channelImageUrl} alt={video.channel} data-ai-hint="channel avatar"/>
          <AvatarFallback>{video.channel.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-md font-semibold leading-tight text-primary-foreground transition-colors group-hover:text-primary">
            {video.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{video.channel}</p>
          <p className="text-sm text-muted-foreground">
            {video.views} views · {video.uploadedAt}
          </p>
        </div>
      </div>
    </button>
  );
}
