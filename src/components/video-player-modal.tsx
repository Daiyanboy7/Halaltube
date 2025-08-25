
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Video } from "@/lib/types";
import { VideoPlayer } from "./video-player";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Download, ThumbsUp, Share2, Scissors } from "lucide-react";

interface VideoPlayerModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-6 border-primary/20 bg-background/80 backdrop-blur-2xl !rounded-xl shadow-2xl shadow-primary/20">
        <VideoPlayer videoId={video.id} />
        <DialogHeader className="mt-4 text-left">
          <DialogTitle className="text-2xl font-bold font-headline text-primary-foreground">{video.title}</DialogTitle>
          <DialogDescription className="sr-only">Video player and details for {video.title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-4">
            <div className="flex items-center gap-4">
              <img src={video.channelImageUrl} alt={video.channel} className="w-12 h-12 rounded-full" data-ai-hint="channel avatar" />
              <div>
                  <p className="font-semibold text-lg">{video.channel}</p>
                  <p className="text-sm text-muted-foreground">{video.views} views · {video.uploadedAt}</p>
              </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)} className="group">
              <ThumbsUp className={`w-6 h-6 transition-all group-hover:text-primary group-hover:fill-primary ${isLiked ? 'text-primary fill-primary' : 'text-primary-foreground/70'}`}/>
            </Button>
            <Button variant="ghost" size="icon" className="group"><Share2 className="w-6 h-6 text-primary-foreground/70 transition-all group-hover:text-primary"/></Button>
            <Button variant="ghost" size="icon" className="group"><Download className="w-6 h-6 text-primary-foreground/70 transition-all group-hover:text-primary"/></Button>
            <Button variant="ghost" size="icon" className="group"><Scissors className="w-6 h-6 text-primary-foreground/70 transition-all group-hover:text-primary"/></Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
