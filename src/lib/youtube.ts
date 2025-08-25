'use server';

import {google} from 'googleapis';
import type {Video} from '@/lib/types';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY,
});

// Maps a YouTube video item to our Video type
const mapYouTubeItemToVideo = (item: any): Video => {
  let thumbnail = 'https://placehold.co/600x400.png';
  if (item.snippet.thumbnails) {
    thumbnail = item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url;
  }
  
  return {
    id: typeof item.id === 'string' ? item.id : item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnailUrl: thumbnail,
    channelImageUrl: 'https://placehold.co/40x40.png', 
    views: item.statistics?.viewCount ? `${Math.round(parseInt(item.statistics.viewCount) / 1000000)}M` : 'N/A',
    uploadedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
  };
};

async function enrichVideosWithChannelImages(videos: Video[], videoItems: any[]): Promise<Video[]> {
    const channelIds = [...new Set(videoItems.map(item => item.snippet.channelId).filter(Boolean) as string[])];
    
    if (channelIds.length > 0) {
      const channelResponse = await youtube.channels.list({
        part: ['snippet'],
        id: channelIds,
      });

      const channelImages = new Map<string, string>();
      channelResponse.data.items?.forEach(channel => {
        channelImages.set(channel.id!, channel.snippet?.thumbnails?.default?.url || 'https://placehold.co/40x40.png');
      });

      videos.forEach((video, index) => {
        const channelId = videoItems[index].snippet.channelId;
        if(channelId && channelImages.has(channelId)) {
          video.channelImageUrl = channelImages.get(channelId)!;
        }
      });
    }
    return videos;
}

export async function getPopularVideos(): Promise<Video[]> {
  try {
    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 20,
    });

    if (!response.data.items) {
      return [];
    }
    
    let videos = response.data.items.map(mapYouTubeItemToVideo);
    videos = await enrichVideosWithChannelImages(videos, response.data.items);

    return videos;
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    return [];
  }
}

export async function searchVideos(query: string, relatedToVideoId?: string): Promise<Video[]> {
  try {
    const searchOptions: any = {
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: 20,
    };

    if(relatedToVideoId) {
      searchOptions.relatedToVideoId = relatedToVideoId;
      delete searchOptions.q;
    }

    const response = await youtube.search.list(searchOptions);
    
    if (!response.data.items) {
      return [];
    }

    const videoIds = response.data.items.map(item => item.id?.videoId).filter(Boolean) as string[];

    if (videoIds.length === 0) {
      return [];
    }

    const videoDetailsResponse = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: videoIds,
    });

    if (!videoDetailsResponse.data.items) {
      return [];
    }
    
    let videos = videoDetailsResponse.data.items.map(mapYouTubeItemToVideo);
    videos = await enrichVideosWithChannelImages(videos, videoDetailsResponse.data.items);
    
    return videos;

  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
}
