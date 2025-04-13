"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // const [mounted, setMounted] = React.useState(false);

  // Add class to prevent transitions on initial load
  React.useEffect(() => {
    // Add no-transitions class to prevent transitions on initial load
    document.documentElement.classList.add('no-transitions');
    
    // Remove the no-transitions class after mounting to enable transitions
    const timeoutId = setTimeout(() => {
      document.documentElement.classList.remove('no-transitions');
      // setMounted(true);
    }, 300); // Slightly longer delay to ensure everything is loaded
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NextThemesProvider defaultTheme="dark" {...props}>
      {children}
    </NextThemesProvider>
  );
}