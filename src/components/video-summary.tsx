
"use client";

import { useState } from 'react';
import { summarizeVideo } from '@/ai/flows/video-summarization';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Sparkles } from 'lucide-react';
import type { Video } from '@/lib/types';

export function VideoSummary({ video }: { video: Video }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary('');
    try {
      // Note: In a real application, you would fetch the real transcript.
      // We are using a placeholder here.
      const result = await summarizeVideo({
        videoTitle: video.title,
        videoDescription: "A sample description of the video content.",
        videoTranscript: "This is a sample transcript... it would be much longer in a real scenario, detailing all spoken words in the video for the AI to process.",
      });
      setSummary(result.summary);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-headline flex items-center gap-2">
            <Sparkles className="text-primary w-5 h-5"/>
            AI Video Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Button onClick={handleSummarize} disabled={isLoading} className="w-full bg-primary/80 hover:bg-primary text-primary-foreground">
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </Button>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {summary && (
          <div className="mt-4 p-4 rounded-lg bg-black/20 border border-primary/10 text-sm text-primary-foreground/80">
            {summary}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
