
"use client";

import { useEffect, useState } from 'react';

const quotes = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "Your time is limited, don't waste it living someone else's life.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Strive not to be a success, but rather to be of value.",
  "The mind is everything. What you think you become.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you’ve ever wanted is on the other side of fear.",
];

export function MotivationalTextStream() {
  const [shuffledQuotes, setShuffledQuotes] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle quotes on client-side mount to avoid hydration mismatch
    setShuffledQuotes(quotes.sort(() => Math.random() - 0.5));
  }, []);

  if (shuffledQuotes.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {shuffledQuotes.map((quote, index) => (
          <div
            key={index}
            className="absolute whitespace-nowrap text-foreground/5 animate-scroll-text"
            style={{
              top: `${(index / quotes.length) * 100}%`,
              animationDelay: `${index * 3}s`,
              animationDuration: `${20 + Math.random() * 20}s`, // Vary speeds
              fontSize: `${1 + Math.random() * 1.5}rem`,
            }}
          >
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
}
