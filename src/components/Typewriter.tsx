"use client";
import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="inline-block">
      {displayedText}
      <span className="animate-pulse border-r-2 border-violet-600 ml-1"></span>
    </span>
  );
}