"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Custom style for navigation menu items to blend with gradient
const customNavStyle =
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background/30 hover:text-foreground focus:bg-background/30 focus:text-foreground data-[state=open]:bg-background/40";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Set CSS variable for header height on mount and window resize
  useEffect(() => {
    const setHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        const height = `${header.offsetHeight}px`;
        document.documentElement.style.setProperty("--header-height", height);
      }
    };

    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);

    return () => {
      window.removeEventListener("resize", setHeaderHeight);
    };
  }, []);

  // Animation variants for menu items
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      clipPath: "inset(0 0 100% 0)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/20">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between m-auto px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">John Doe</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={customNavStyle}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={customNavStyle}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
              <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink className={customNavStyle}>
                    Projects
                  </NavigationMenuLink>
                </Link>
           
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={customNavStyle}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">John Doe</span>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden relative overflow-hidden group"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col items-center justify-center gap-1">
                <motion.div
                  animate={
                    mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-current transform origin-center"
                ></motion.div>
                <motion.div
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-current"
                ></motion.div>
                <motion.div
                  animate={
                    mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-current transform origin-center"
                ></motion.div>
              </div>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/90 backdrop-blur-md border-b border-border/20 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="space-y-1 px-4 py-3 pb-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-background/30 hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/about"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-background/30 hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/projects"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-background/30 hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contact"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-background/30 hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// const projects = [
//   {
//     title: "E-commerce Platform",
//     href: "/projects/ecommerce",
//     description:
//       "A full-featured e-commerce platform built with Next.js and MongoDB.",
//   },
//   {
//     title: "Task Management App",
//     href: "/projects/task-management",
//     description:
//       "A task management application with drag-and-drop functionality.",
//   },
//   {
//     title: "Social Media Dashboard",
//     href: "/projects/social-media-dashboard",
//     description: "A dashboard for managing social media accounts and analytics.",
//   },
//   {
//     title: "Weather Application",
//     href: "/projects/weather-app",
//     description:
//       "A weather application that shows current and forecasted weather.",
//   },
// ];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-background/40 hover:text-foreground focus:bg-background/40 focus:text-foreground bg-transparent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";