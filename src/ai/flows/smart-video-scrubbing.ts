'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating representative thumbnails from a video for smart scrubbing.
 *
 * - smartVideoScrubbing - A function that takes a video data URI and returns a list of representative thumbnail data URIs.
 * - SmartVideoScrubbingInput - The input type for the smartVideoScrubbing function.
 * - SmartVideoScrubbingOutput - The return type for the smartVideoScrubbing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartVideoScrubbingInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      'A video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  numberOfThumbnails: z
    .number()
    .default(5)
    .describe('The number of representative thumbnails to generate.'),
});
export type SmartVideoScrubbingInput = z.infer<typeof SmartVideoScrubbingInputSchema>;

const SmartVideoScrubbingOutputSchema = z.object({
  thumbnailDataUris: z
    .array(z.string())
    .describe('An array of representative thumbnail data URIs.'),
});
export type SmartVideoScrubbingOutput = z.infer<typeof SmartVideoScrubbingOutputSchema>;

export async function smartVideoScrubbing(input: SmartVideoScrubbingInput): Promise<SmartVideoScrubbingOutput> {
  return smartVideoScrubbingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartVideoScrubbingPrompt',
  input: {schema: SmartVideoScrubbingInputSchema},
  output: {schema: SmartVideoScrubbingOutputSchema},
  prompt: `You are an AI video summarizer that can create representative thumbnails of keyframe moments in the video. 

You will receive a video as a data URI, and you must select {{numberOfThumbnails}} moments from the video, and return a base64 encoded JPEG for each.

Return the thumbnails as a JSON array of data URIs.

Video: {{media url=videoDataUri}}
`,
});

const smartVideoScrubbingFlow = ai.defineFlow(
  {
    name: 'smartVideoScrubbingFlow',
    inputSchema: SmartVideoScrubbingInputSchema,
    outputSchema: SmartVideoScrubbingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
