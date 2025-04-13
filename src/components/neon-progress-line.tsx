'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function NeonProgressLine() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Transform scroll progress to path drawing
  const pathLength = useTransform(smoothProgress, [0, 1], [0.05, 1]);
  
  // Calculate milestone positions based on page sections
  const milestones = useMemo(() => [0.3, 0.6, 0.9], []); // 30%, 60%, 90% of the page
  
  // Pre-define milestone transformations to avoid dynamic hook creation
  const milestone1Opacity = useTransform(
    smoothProgress, 
    [milestones[0] - 0.05, milestones[0], milestones[0] + 0.05], 
    [0, 1, 0.7]
  );
  
  const milestone2Opacity = useTransform(
    smoothProgress, 
    [milestones[1] - 0.05, milestones[1], milestones[1] + 0.05], 
    [0, 1, 0.7]
  );
  
  const milestone3Opacity = useTransform(
    smoothProgress, 
    [milestones[2] - 0.05, milestones[2], milestones[2] + 0.05], 
    [0, 1, 0.7]
  );
  
  // Milestone opacities array for easy reference
  const milestoneOpacities = [milestone1Opacity, milestone2Opacity, milestone3Opacity];
  
  // Determine neon color based on theme - using darker blue for light mode
  const neonColor = mounted ? (theme === 'dark' ? '#4C00FF' : '#0151a0') : '#4C00FF';
  
  // Get glow effect only in dark mode
  const getGlowEffect = () => {
    if (!mounted) return {};
    return theme === 'dark' 
      ? { filter: `drop-shadow(0 0 6px ${neonColor})`, transition: 'filter 0.5s ease-in-out' }
      : { filter: `drop-shadow(0 0 2px ${neonColor})`, transition: 'filter 0.5s ease-in-out' }; // Light glow effect for light mode too
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className="fixed top-[var(--header-height)]  z-20 pointer-events-none w-screen inset-x-0 m-0 p-0 max-w-none" 
      style={{ width: '100vw', left: 0, right: 0 }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 4" /* Reduced overall height from 6 to 4 */
        fill="none"
        preserveAspectRatio="xMinYMid meet"
        style={{ minWidth: '100%', maxWidth: 'none' }}
      >
        {/* Background straight line */}
        <path
          d="M0 2 L1000 2" /* Adjusted y-position for the reduced height */
          stroke={neonColor}
          strokeWidth="0.8" /* Reduced from 1 to 0.8 */
          strokeLinecap="round"
          opacity="0.15"
        />

        {/* Main neon progress path - straight line */}
        <motion.path
          d="M0 2 L1000 2" /* Adjusted y-position */
          stroke={neonColor}
          strokeWidth="1.5" /* Reduced from 3 to 1.5 */
          strokeLinecap="round"
          style={{
            pathLength,
            ...getGlowEffect(),
            opacity: pathLength,
          }}
        />

        {/* Milestone markers (centered vertically with the line) */}
        <circle cx="300" cy="2" r="1.2" fill="none" stroke={neonColor} strokeWidth="0.5" opacity="0.5" />
        <circle cx="600" cy="2" r="1.2" fill="none" stroke={neonColor} strokeWidth="0.5" opacity="0.5" />
        <circle cx="900" cy="2" r="1.2" fill="none" stroke={neonColor} strokeWidth="0.5" opacity="0.5" />
        
        {/* Animated milestone highlights with enhanced glow */}
        <motion.g style={{ 
          opacity: milestoneOpacities[0],
          filter: `drop-shadow(0 0 4px ${neonColor})`, /* Reduced glow from 8px to 4px */
          zIndex: 10,
        }}>
          {/* Reduced from 3 to 1.8 */}
          <circle cx="300" cy="2" r="1.8" fill={neonColor} opacity="0.6" /> 
          {/* Reduced from 1.5 to 1 */}
          <circle cx="300" cy="2" r="1" fill={neonColor} /> 
        </motion.g>
        
        <motion.g style={{ 
          opacity: milestoneOpacities[1],
          filter: `drop-shadow(0 0 4px ${neonColor})`,
          zIndex: 10,
        }}>
          <circle cx="600" cy="2" r="1.8" fill={neonColor} opacity="0.6" />
          <circle cx="600" cy="2" r="1" fill={neonColor} />
        </motion.g>
        
        <motion.g style={{ 
          opacity: milestoneOpacities[2],
          filter: `drop-shadow(0 0 4px ${neonColor})`,
          zIndex: 10,
        }}>
          <circle cx="900" cy="2" r="1.8" fill={neonColor} opacity="0.6" />
          <circle cx="900" cy="2" r="1" fill={neonColor} />
        </motion.g>
      </svg>
    </div>
  );
}