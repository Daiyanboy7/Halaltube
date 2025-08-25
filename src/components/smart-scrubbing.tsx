"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Film } from "lucide-react"

export function SmartScrubbing() {
  const placeholderThumbnails = Array.from({ length: 10 }).map(
    (_, i) => `https://placehold.co/160x90.png?text=Frame+${i + 1}`
  );

  return (
    <div>
        <h3 className="text-lg font-headline flex items-center gap-2 mb-4">
            <Film className="text-primary w-5 h-5"/>
            Smart Scrubbing
        </h3>
        <Carousel
            opts={{
            align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
            {placeholderThumbnails.map((src, index) => (
                <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <div className="p-1">
                        <div className="aspect-video overflow-hidden rounded-md border border-primary/20">
                            <Image
                                src={src}
                                alt={`Scrub thumbnail ${index + 1}`}
                                width={160}
                                height={90}
                                className="w-full h-full object-cover transition-transform hover:scale-110"
                                data-ai-hint="video frame"
                            />
                        </div>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary-foreground bg-primary/50 hover:bg-primary"/>
            <CarouselNext className="text-primary-foreground bg-primary/50 hover:bg-primary"/>
        </Carousel>
    </div>
  )
}
