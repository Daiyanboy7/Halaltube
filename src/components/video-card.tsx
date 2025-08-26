
'use client';

import Image from 'next/image';
import type { Video } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useRef } from 'react';

interface VideoCardProps {
  video: Video;
  onSelectVideo?: (video: Video) => void;
}

export function VideoCard({ video, onSelectVideo }: VideoCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  
  const handleSelect = () => {
    if (onSelectVideo) {
      onSelectVideo(video);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('video-card-enter-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      cardRef.current.classList.add('video-card-enter');
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <button
      ref={cardRef}
      onClick={handleSelect} // Added the 'floating-animation' class
      className="group w-full text-left transition-transform duration-300 ease-in-out hover:!opacity-100 hover:scale-105"
    >
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-card/50 backdrop-blur-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/30 ring-2 ring-inset ring-transparent group-hover:ring-primary/70">
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
