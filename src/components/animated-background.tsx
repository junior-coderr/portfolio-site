"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render animation after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-45 pointer-events-none">
      <div className="gradient-blob" />
      <style jsx>{`
        .gradient-blob {
          position: absolute;
          top: -50%;
          left: -20%;
          width: 150%;
          height: 150%;
          border-radius: 100%;
          background: ${theme === 'dark' 
            ? 'linear-gradient(90deg, rgba(76, 0, 255, 0.5) 0%, rgba(0, 174, 255, 0.3) 33%, rgba(128, 0, 255, 0.3) 66%, rgba(0, 102, 255, 0.5) 100%)'
            : 'linear-gradient(90deg, rgba(76, 0, 255, 0.15) 0%, rgba(0, 174, 255, 0.1) 33%, rgba(128, 0, 255, 0.1) 66%, rgba(0, 102, 255, 0.15) 100%)'
          };
          filter: blur(60px);
          animation: rotate 25s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}