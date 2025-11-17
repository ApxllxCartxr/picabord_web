'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get the total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Get current scroll position
      const scrolled = window.scrollY;
      
      // Calculate progress percentage
      const progressPercentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      
      setProgress(progressPercentage);
    };

    // Update progress on mount
    updateProgress();

    // Add scroll event listener
    window.addEventListener('scroll', updateProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-muted/20"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
