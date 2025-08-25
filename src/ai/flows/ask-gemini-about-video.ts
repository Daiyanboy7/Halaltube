'use server';
/**
 * @fileOverview This file defines a Genkit flow for asking questions about a video and receiving answers from Gemini.
 *
 * - askGeminiAboutVideo - A function that takes a video URL and a question, and returns Gemini's answer.
 * - AskGeminiAboutVideoInput - The input type for the askGeminiAboutVideo function.
 * - AskGeminiAboutVideoOutput - The return type for the askGeminiAboutVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskGeminiAboutVideoInputSchema = z.object({
  videoUrl: z.string().describe('The URL of the video to ask about.'),
  question: z.string().describe('The question to ask about the video.'),
});

export type AskGeminiAboutVideoInput = z.infer<typeof AskGeminiAboutVideoInputSchema>;

const AskGeminiAboutVideoOutputSchema = z.object({
  answer: z.string().describe('Gemini\'s answer to the question about the video.'),
});

export type AskGeminiAboutVideoOutput = z.infer<typeof AskGeminiAboutVideoOutputSchema>;

export async function askGeminiAboutVideo(input: AskGeminiAboutVideoInput): Promise<AskGeminiAboutVideoOutput> {
  return askGeminiAboutVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askGeminiAboutVideoPrompt',
  input: {schema: AskGeminiAboutVideoInputSchema},
  output: {schema: AskGeminiAboutVideoOutputSchema},
  prompt: `You are a helpful assistant that answers questions about videos.

  Here is the URL of the video: {{{videoUrl}}}
  Here is the question from the user: {{{question}}}

  Please provide a concise and informative answer.`,
});

const askGeminiAboutVideoFlow = ai.defineFlow(
  {
    name: 'askGeminiAboutVideoFlow',
    inputSchema: AskGeminiAboutVideoInputSchema,
    outputSchema: AskGeminiAboutVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
