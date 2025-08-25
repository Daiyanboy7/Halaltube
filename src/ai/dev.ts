import { config } from 'dotenv';
config();

import '@/ai/flows/video-summarization.ts';
import '@/ai/flows/ask-gemini-about-video.ts';
import '@/ai/flows/smart-video-scrubbing.ts';