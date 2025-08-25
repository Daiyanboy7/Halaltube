'use server';

/**
 * @fileOverview An AI agent for summarizing video content.
 *
 * - summarizeVideo - A function that generates a concise summary of a video.
 * - SummarizeVideoInput - The input type for the summarizeVideo function.
 * - SummarizeVideoOutput - The return type for the summarizeVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVideoInputSchema = z.object({
  videoTitle: z.string().describe('The title of the video.'),
  videoDescription: z.string().describe('The description of the video.'),
  videoTranscript: z.string().describe('The transcript of the video.'),
});
export type SummarizeVideoInput = z.infer<typeof SummarizeVideoInputSchema>;

const SummarizeVideoOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the video content.'),
});
export type SummarizeVideoOutput = z.infer<typeof SummarizeVideoOutputSchema>;

export async function summarizeVideo(input: SummarizeVideoInput): Promise<SummarizeVideoOutput> {
  return summarizeVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeVideoPrompt',
  input: {schema: SummarizeVideoInputSchema},
  output: {schema: SummarizeVideoOutputSchema},
  prompt: `You are an AI expert in providing summaries of YouTube videos.

  Given the following information about a video, please provide a concise summary of the video's content.

  Video Title: {{{videoTitle}}}
  Video Description: {{{videoDescription}}}
  Video Transcript: {{{videoTranscript}}}

  Summary: `,
});

const summarizeVideoFlow = ai.defineFlow(
  {
    name: 'summarizeVideoFlow',
    inputSchema: SummarizeVideoInputSchema,
    outputSchema: SummarizeVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
