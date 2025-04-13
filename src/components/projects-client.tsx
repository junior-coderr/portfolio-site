"use client"

import { useRef } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { BackToTop } from "@/components/back-to-top";
import { MagicCard } from "@/components/ui/magic-card";
import { MagicButton } from "@/components/ui/magic-button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {Github,Globe,Construction} from 'lucide-react'
import { Button } from "@/components/ui/button";


// Project type definition for better type safety
type Project = {
  title: string;
  href: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  tag: string;
  tagColor: string;
  imageSrc: string;
  developed?: boolean;
};

// Projects data
const projects: Project[] = [
  {
    title: "PixelPerfect Dashboard",
    href: "https://github.com/username/pixel-perfect",
    description: "A responsive admin dashboard with dark mode and customizable widgets for data visualization.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Redux"],
    liveUrl: "https://pixel-perfect-dashboard.vercel.app",
    tag: "Full Stack",
    tagColor: "bg-blue-500/10 text-blue-500",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "TastyBites Recipe App",
    href: "https://github.com/username/tasty-bites",
    description: "A mobile-friendly recipe application with search, filtering, and personalized recommendations.",
    technologies: ["Next.js", "MongoDB", "Prisma", "Tailwind CSS", "Auth.js"],
    liveUrl: "https://tasty-bites-app.vercel.app",
    tag: "Full Stack",
    tagColor: "bg-green-500/10 text-green-500",
    imageSrc: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "CloudSync",
    href: "https://github.com/username/cloud-sync",
    description: "A file storage and sharing platform with real-time collaboration and version control.",
    technologies: ["Vue.js", "Firebase", "Express", "Socket.io", "Stripe API"],
    liveUrl: "https://cloudsync-storage.netlify.app",
    tag: "Full Stack",
    tagColor: "bg-purple-500/10 text-purple-500",
    imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "FitTrack",
    href: "https://github.com/username/fit-track",
    description: "A fitness tracking application with workout plans, progress charts, and nutrition logging.",
    technologies: ["React Native", "GraphQL", "Node.js", "MongoDB", "AWS Amplify"],
    liveUrl: "https://fittrack-health.com",
    tag: "Mobile App",
    tagColor: "bg-pink-500/10 text-pink-500",
    imageSrc: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "EcoMarket",
    href: "https://github.com/username/eco-market",
    description: "An e-commerce platform for sustainable and eco-friendly products with carbon footprint tracking.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Vercel"],
    liveUrl: "https://eco-market.vercel.app",
    tag: "E-commerce",
    tagColor: "bg-yellow-500/10 text-yellow-500",
    imageSrc: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "CodeCollab",
    href: "https://github.com/username/code-collab",
    description: "A real-time collaborative code editor with video chat and version control integration.",
    technologies: ["React", "WebRTC", "Socket.io", "Express", "MongoDB", "Docker"],
    liveUrl: "",
    tag: "Developer Tool",
    tagColor: "bg-cyan-500/10 text-cyan-500",
    imageSrc: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    developed: true
  }
];

// Helper function to get glow color from project tag
function getGlowColorFromTag(tag: string): string {
  switch(tag) {
    case "Full Stack":
      return "rgba(59, 130, 246, 0.5)"; // blue
    case "Frontend":
      return "rgba(34, 197, 94, 0.5)"; // green
    case "Data Visualization":
      return "rgba(168, 85, 247, 0.5)"; // purple
    case "API Integration":
      return "rgba(234, 179, 8, 0.5)"; // yellow
    case "Personal":
      return "rgba(236, 72, 153, 0.5)"; // pink
    case "Content":
      return "rgba(6, 182, 212, 0.5)"; // cyan
    default:
      return "rgba(76, 0, 255, 0.5)"; // default
  }
}

export function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20 px-4">
          <AnimatedSection className="mx-auto max-w-[64rem] space-y-4 px-4">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold  bg-gradient-to-r font-heading bg-clip-text">
              My Projects
            </h1>
            <p className="max-w-[85%] text-lg text-muted-foreground">
              Here&apos;s a collection of projects I&apos;ve worked on.
            </p>
          </AnimatedSection>
          
          <div ref={containerRef} className="relative">
            <motion.div 
              className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[64rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {projects.map((project, i) => (
                <AnimatedSection 
                  key={project.title} 
                  delay={0.1 + (i * 0.1)}
                >
                  <MagicCard 
                    hoverEffect="glow"
                    glowColor={getGlowColorFromTag(project.tag)}
                    className="h-full relative"
                  >
                    <div className="flex flex-col h-full space-y-4">
                      {/* Display project image */}
                      {project.imageSrc && (
                        <div className="w-full h-48 overflow-hidden rounded-t-lg">
                          <Image 
                            src={project.imageSrc} 
                            alt={project.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover object-center"
                            priority={i < 3} // Prioritize loading the first 3 images
                          />
                        </div>
                      )}
                      
                      <div className="flex flex-col justify-between flex-grow p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2 py-1 text-xs ${project.tagColor}`}>
                              {project.tag}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold">{project.title}</h2>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                        
                        <div className="space-y-4 mt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="rounded-full bg-secondary px-2 py-1 text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <Button variant="outline" size="sm" className="gap-2 hover:bg-[rgba(36,41,47,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] hover:border-gray-400">
                              <Github className="h-5 w-5" />
                              <span>GitHub</span>
                            </Button>
                            {project.liveUrl && (
                              <MagicButton variant="default" size="sm" shimmer className="bg-gradient-to-r from-primary/80 to-primary">
                                <span className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  Visit Site
                                </span>
                              </MagicButton>
                            )}
                            {project.developed && (
                              <span className="absolute top-1 right-0 flex justify-center items-center text-xs text-center bg-amber-200 p-2 px-3 rounded-full text-amber-900">
                                <Construction size={15} />
                                <span className="ml-1.5">Under production</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </AnimatedSection>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}