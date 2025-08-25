
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
    views: item.statistics?.viewCount ? `${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(parseInt(item.statistics.viewCount))}` : 'N/A',
    uploadedAt: new Date(item.snippet.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'}),
  };
};

async function enrichVideosWithChannelImages(videos: Video[], videoItems: any[]): Promise<Video[]> {
    const channelIds = [...new Set(videoItems.map(item => item.snippet.channelId).filter(Boolean) as string[])];
    
    if (channelIds.length > 0) {
      try {
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
      } catch (error) {
        console.error('Error fetching channel images:', error);
        // It's okay to fail here, we'll just use placeholder images.
      }
    }
    return videos;
}

export async function getPopularVideos(): Promise<Video[]> {
  try {
    const videoIds = [
      // User's original list
      "hYjcS_w_i4A", // The Most Beautiful Equation in Math
      "sBw_ybbw_0s", // The beauty of data visualization
      "Jvi_9hV4KZI", // Quantum Computing explained in 10 minutes
      "f4772kg_qig", // How to Build a PC
      "I4sMhXLe868", // Introduction to Next.js 14
      "m4-o_pB49a0", // The Art of Code
      "73_OWzBr8Fo", // What is AGI?
      "ysz5S6PUM-U", // How to make amazing bolognese
      "GERcgJaIPWQ", // The Search for the Perfect Calendar
      "0WY9T_rBVKU", // The Riddle That Seems Impossible
      "gZbK9S59pnI", // The simplest 'impossible' puzzle
      "DnMu5LWAQT0", // Why you can't solve these British puzzles
      "cakwkkyzuco", // The most difficult puzzle you've never seen
      "AnMbvhqtF8E", // The Seemingly IMPOSSIBLE Guess The Number
      "CMPD6Ac1zH8", // The Almost Impossible Chess Puzzle
      "McHQFTv-cWY", // The SAT Question Everyone Got Wrong
      "S1YxRzVGyOg", // The puzzle that's older than you think
      
      // New additions based on user's theme
      "HeQX2HjkcNo", // What is NOT Random? - Vsauce
      "6o_x_X9K65E", // Building the Perfect Squirrel Proof Bird Feeder - Mark Rober
      "k-w-48g1yYc", // What if you fell into a black hole? - Kurzgesagt
      "p2G23nJGP5A", // The Most Complex International Borders in the World - Wendover Productions
      "vA-b21K133c", // Why time doesn't exist - Up and Atom
      "w2tKg3E53DM", // The cleverest puzzle from the world's smartest man - Stand-up Maths
      "iLCRp8K3gWw", // How to Learn to Code - The Primeagen
      "U_Hj_iB4jC0", // The Man Who Revolutionized Computer Science With Math - Quanta Magazine
      "8A2t_t_mgKc", // This is what a Mensa IQ test looks like - Veritasium
      "aircAruvnKk", // How to triple your memory by using this trick - Mark Rober
      "M7lc1UVf-VE", // The Infinite Hotel Paradox - Jeff Dekofsky - TED-Ed
      "UBdP-yA4yLg"  // What is the fastest way to alphabetize your bookshelf? - Vsauce
    ];

    const response = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: videoIds,
      maxResults: 50,
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
