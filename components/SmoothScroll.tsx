"use client";

import { useEffect, useRef } from "react";

// Import local locomotive scroll styles
import "@/app/locomotive-scroll.css";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Temporarily disabled smooth scroll to fix scrolling issues
  // Will re-enable once properly configured
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}