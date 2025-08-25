"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Video } from "@/lib/mock-data";
import { VideoPlayer } from "./video-player";
import { VideoSummary } from "./video-summary";
import { SmartScrubbing } from "./smart-scrubbing";
import { AskGemini } from "./ask-gemini";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Download, ThumbsUp, Share2, Scissors } from "lucide-react";

interface VideoPlayerModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 border-primary/20 bg-background/80 backdrop-blur-2xl !rounded-xl">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-3 lg:col-span-2 p-4">
            <VideoPlayer videoId={video.id} />
            <div className="mt-4">
              <h2 className="text-2xl font-bold font-headline text-primary-foreground">{video.title}</h2>
              <div className="flex items-center justify-between mt-2">
                 <div className="flex items-center gap-4">
                    <img src={video.channelImageUrl} alt={video.channel} className="w-10 h-10 rounded-full" data-ai-hint="channel avatar" />
                    <div>
                        <p className="font-semibold">{video.channel}</p>
                        <p className="text-sm text-muted-foreground">{video.views} views · {video.uploadedAt}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><ThumbsUp className="w-5 h-5"/></Button>
                  <Button variant="ghost" size="icon"><Share2 className="w-5 h-5"/></Button>
                  <Button variant="ghost" size="icon"><Download className="w-5 h-5"/></Button>
                  <Button variant="ghost" size="icon"><Scissors className="w-5 h-5"/></Button>
                </div>
              </div>
            </div>
            <Separator className="my-6 bg-primary/20" />
            <SmartScrubbing />
          </div>
          <div className="md:col-span-3 lg:col-span-1 p-4 bg-black/20 lg:rounded-r-xl overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col gap-6">
                <VideoSummary />
                <Separator className="bg-primary/20" />
                <AskGemini videoUrl={`https://www.youtube.com/watch?v=${video.id}`} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
