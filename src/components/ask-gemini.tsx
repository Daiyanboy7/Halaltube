"use client";

import { useState } from 'react';
import { askGeminiAboutVideo } from '@/ai/flows/ask-gemini-about-video';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { MessageCircleQuestion } from 'lucide-react';

interface AskGeminiProps {
    videoUrl: string;
}

export function AskGemini({ videoUrl }: AskGeminiProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setAnswer('');
    
    try {
      const result = await askGeminiAboutVideo({
        videoUrl: videoUrl,
        question: question,
      });
      setAnswer(result.answer);
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
          <MessageCircleQuestion className="text-primary w-5 h-5"/>
          Ask Gemini
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about the video..."
            className="bg-black/20 border-primary/20"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="bg-primary/80 hover:bg-primary text-primary-foreground">
            {isLoading ? 'Thinking...' : 'Ask'}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {answer && (
          <div className="mt-4 p-4 rounded-lg bg-black/20 border border-primary/10 text-sm text-primary-foreground/80">
            {answer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
