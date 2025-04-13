'use client'
import { Button } from "@/components/ui/button";
import { MagicButton } from "@/components/ui/magic-button";
import { MagicCard } from "@/components/ui/magic-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { BackToTop } from "@/components/back-to-top";
import { TypingEffect } from "@/components/typing-effect";
import Link from "next/link";
import Image from "next/image";
import { 
  FileText, Github, Linkedin, Mail, 
  FileCode, LayoutGrid, Server, Baseline, CircleUser, 
  GitBranch, Cpu, Database, Globe
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Tech stack icons configuration with Lucide React icons
const techStackIcons = [
  // Left side icons - visible on all screens
  { 
    icon: FileCode, 
    label: "React", 
    position: "left-[8%] top-[20%]",
    color: "text-blue-400",
    size: 42,
    mobileSize: 30,
    visibleOn: "block" // visible on all screens
  },
  { 
    icon: Server, 
    label: "Node.js", 
    position: "left-[5%] top-[60%]",
    color: "text-green-600",
    size: 40,
    mobileSize: 28,
    visibleOn: "block" // visible on all screens
  },
  
  // Left side icons - only visible on tablet and up
  { 
    icon: Database, 
    label: "MongoDB", 
    position: "left-[10%] bottom-[20%]", 
    color: "text-green-500",
    size: 38,
    mobileSize: 26,
    visibleOn: "hidden md:block" // hidden on mobile, visible on md screens and up
  },
  { 
    icon: Baseline, 
    label: "HTML/CSS", 
    position: "left-[15%] bottom-[38%]", 
    color: "text-orange-500",
    size: 42,
    mobileSize: 30,
    visibleOn: "hidden lg:block" // hidden until lg screens
  },
  
  // Right side icons - visible on all screens
  { 
    icon: LayoutGrid, 
    label: "Tailwind", 
    position: "right-[8%] top-[22%]", 
    color: "text-cyan-500",
    size: 42,
    mobileSize: 30,
    visibleOn: "block" // visible on all screens
  },
  { 
    icon: Github, 
    label: "GitHub", 
    position: "right-[5%] top-[60%]", 
    color: "text-gray-700 dark:text-gray-300",
    size: 36,
    mobileSize: 26,
    visibleOn: "block" // visible on all screens
  },
  
  // Right side icons - only visible on tablet and up
  { 
    icon: GitBranch, 
    label: "Git", 
    position: "right-[10%] top-[42%]", 
    color: "text-red-500",
    size: 40,
    mobileSize: 28,
    visibleOn: "hidden md:block" // hidden on mobile, visible on md screens and up
  },
  { 
    icon: Cpu, 
    label: "Docker", 
    position: "right-[12%] bottom-[15%]", 
    color: "text-blue-500",
    size: 44,
    mobileSize: 30,
    visibleOn: "hidden lg:block" // hidden until lg screens
  },
];

// Component for floating icons with scroll animations
function FloatingIcons() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Scroll-based animations for left and right icons
  const leftX = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 0]);
  
  return (
    <div ref={sectionRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {techStackIcons.map((item, i) => {
        const IconComponent = item.icon;
        const isLeft = item.position.includes('left');
        
        return (
          <motion.div
            key={i}
            className={`absolute ${item.position} z-0 ${item.visibleOn}`}
            style={{
              x: isLeft ? leftX : rightX,
              opacity,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.8,
              y: [0, -15, 0],
              rotate: [0, isLeft ? -5 : 5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 + i * 0.1 },
              y: { 
                duration: 4 + i * 0.5, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.3
              },
              rotate: {
                duration: 5 + i * 0.7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.2
              },
              x: { type: "spring", stiffness: 50 }
            }}
          >
            <IconComponent 
              className={`${item.color} opacity-70 dark:opacity-60 drop-shadow-md`}
              strokeWidth={1.5}
              style={{
                width: `clamp(${item.mobileSize}px, 6vw, ${item.size}px)`,
                height: `clamp(${item.mobileSize}px, 6vw, ${item.size}px)`
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [isMainTechExpanded, setIsMainTechExpanded] = useState(false);
  const [isLearningTechExpanded, setIsLearningTechExpanded] = useState(false);
  const [isToolsTechExpanded, setIsToolsTechExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isLarge: false,
    isMedium: false
  });

  // Handle client-side only detection to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
    const updateScreenSize = () => {
      setScreenSize({
        isLarge: window.innerWidth >= 1024,
        isMedium: window.innerWidth >= 768
      });
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  // Calculate items to show per section based on screen size (client-side only)
  const getVisibleItems = () => {
    if (!isMounted) return 4; // Default for SSR
    if (screenSize.isLarge) return 8;
    if (screenSize.isMedium) return 6;
    return 4;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
          <FloatingIcons />
          <AnimatedSection className="container flex max-w-[64rem] flex-col items-center gap-4 text-center m-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="relative h-38 w-38 md:h-52 md:w-52 flex items-center justify-center group">
       
                <div className="absolute h-full w-full bg-[rgba(186, 139, 78,1)] dark:bg-[#d7d3a7b5] morph-shape transform transition-all duration-700 group-hover:scale-105 shadow-[0_0_10px_3px_rgba(0,126,255,0.15)] dark:shadow-[0_0_10px_3px_rgba(0,174,255,0.15)]"></div>
                
                <div className="relative h-36 w-36 md:h-48 md:w-48 z-10 overflow-hidden rounded-full">
                  <Image 
                    src="/pratik.jpg" 
                    alt="John Doe" 
                    fill
                    className="object-cover" 
                    priority
                  />
                </div>
              </div>
              <div>
                <h1 className="font-heading text-4xl sm:text-6xl md:text-6xl lg:text-7xl mt-4 md:mt-0 font-extrabold text-center md:text-left relative">
                  Hi, I&apos;m <span className="text-primary relative">
                    John
                    <svg
                      className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
                      viewBox="0 0 200 20"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="john-doe-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--color-blue-500)" />
                          <stop offset="50%" stopColor="var(--color-purple-500)" />
                          <stop offset="100%" stopColor="var(--color-blue-400)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,15 C66,5 134,5 200,15"
                        stroke="url(#john-doe-underline)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                          strokeDasharray: 200,
                          strokeDashoffset: 200,
                          animation: "draw 1.5s ease forwards 0.3s"
                        }}
                      />
                    </svg>
                  </span>
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mt-4 text-center md:text-left">
                  Full Stack Developer specializing in <span className="font-mono"><TypingEffect 
                    words={["React", "Node.js", "TypeScript", "MongoDB", "Next.js", "Express","Tailwind"]} 
                    colors={["text-blue-400", "text-green-500", "text-blue-600", "text-green-600", "text-black dark:text-white", "text-red-500","text-blue-400"]}
                    typingSpeed={150}
                    deletingSpeed={80}
                    delayBetween={1500}
                  />
                  </span>
                  <br />
                  I build modern, responsive, and user-friendly web applications.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 w-full mt-6">
            <MagicButton  variant="default" size="lg" shimmer className="bg-gradient-to-r from-primary/80 to-primary">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Get in touch
                </Link>
              </MagicButton>
              <MagicButton  variant="secondary" size="lg" className="border border-primary/30 hover:border-primary/20">
                <Link href="/about" className="flex items-center gap-2 relative overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></span>
                  <CircleUser className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">Learn more about me</span>
                </Link>
              </MagicButton>
            </div>
          </AnimatedSection>
        </section>

<br />
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 relative bg-muted/30 rounded-xl m-auto px-4">
          <AnimatedSection delay={0.2} className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-4">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              My Tech Stack
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Here are some technologies I work with to build amazing digital experiences.
            </p>
          </AnimatedSection>

          {/* Main Tech Stack */}
          <div className="relative mx-auto max-w-[80rem] mt-8">
            <div className="grid justify-center gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max">
              {mainTechStack.map((tech, i) => (
                <AnimatedSection 
                  key={tech.name} 
                  delay={0.3 + (i * 0.01)}
                  className={`${!isMainTechExpanded && i >= getVisibleItems() ? 'hidden' : ''}`}
                >
                  <div className={`flex flex-col items-center space-y-2 p-4 ${
                    i % 5 === 0 ? 'bg-blue-50/80 dark:bg-blue-950/30' : 
                    i % 5 === 1 ? 'bg-purple-50/80 dark:bg-purple-950/30' : 
                    i % 5 === 2 ? 'bg-green-50/80 dark:bg-green-950/30' : 
                    i % 5 === 3 ? 'bg-amber-50/80 dark:bg-amber-950/30' : 
                    'bg-cyan-50/80 dark:bg-cyan-950/30'
                  } backdrop-blur-sm rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 group`}>
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {tech.icon && <tech.icon className={`h-6 w-6 ${tech.color}`} />}
                    </div>
                    <h3 className="font-medium text-md">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground text-center">{tech.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Gradient overlay */}
            {!isMainTechExpanded && mainTechStack.length > getVisibleItems() && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none"></div>
            )}
            
            {/* Show more/less button */}
            {mainTechStack.length > getVisibleItems() && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsMainTechExpanded(!isMainTechExpanded)}
                  className="text-primary hover:text-primary/80 transition-all duration-150"
                >
                  {isMainTechExpanded ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </div>

          {/* Currently Learning */}
          <AnimatedSection delay={0.4} className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-4 mt-12">
            <h3 className="font-heading text-2xl leading-[1.1] sm:text-2xl md:text-4xl">
              Currently Learning
            </h3>
            <p className="text-xs text-muted-foreground">Last Updated: 10 April 2025</p>
          </AnimatedSection>

          <div className="relative mx-auto max-w-[80rem] mt-8">
            <div className="grid justify-center gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max">
              {learningTechStack.map((tech, i) => (
                <AnimatedSection 
                  key={tech.name} 
                  delay={0.5 + (i * 0.03)}
                  className={`${!isLearningTechExpanded && i >= getVisibleItems() ? 'hidden' : ''}`}
                >
                  <div className={`flex flex-col items-center space-y-2 p-4 ${
                    i % 5 === 0 ? 'bg-indigo-50/80 dark:bg-indigo-950/30' : 
                    i % 5 === 1 ? 'bg-rose-50/80 dark:bg-rose-950/30' : 
                    i % 5 === 2 ? 'bg-teal-50/80 dark:bg-teal-950/30' : 
                    i % 5 === 3 ? 'bg-orange-50/80 dark:bg-orange-950/30' : 
                    'bg-violet-50/80 dark:bg-violet-950/30'
                  } backdrop-blur-sm rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 group`}>
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {tech.icon && <tech.icon className={`h-6 w-6 ${tech.color}`} />}
                    </div>
                    <h3 className="font-medium text-md">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground text-center">{tech.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Gradient overlay */}
            {!isLearningTechExpanded && learningTechStack.length > getVisibleItems() && (
              <div className="absolute -bottom-4 left-0 right-0 h-28 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none"></div>
            )}
            
            {/* Show more/less button */}
            {learningTechStack.length > getVisibleItems() && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLearningTechExpanded(!isLearningTechExpanded)}
                  className="text-primary hover:text-primary/80 transition-all duration-150"
                >
                  {isLearningTechExpanded ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </div>

          {/* Tools I Use */}
          <AnimatedSection delay={0.6} className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-4 mt-12">
            <h3 className="font-heading text-2xl leading-[1.1] sm:text-2xl md:text-4xl">
              Tools I Use
            </h3>
          </AnimatedSection>

          <div className="relative mx-auto max-w-[80rem] mt-8">
            <div className="grid justify-center gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max">
              {toolsTechStack.map((tech, i) => (
                <AnimatedSection 
                  key={tech.name} 
                  delay={0.7 + (i * 0.03)} 
                  className={`${!isToolsTechExpanded && i >= getVisibleItems() ? 'hidden' : ''}`}
                >
                  <div className={`flex flex-col items-center space-y-2 p-4 ${
                    i % 5 === 0 ? 'bg-sky-50/80 dark:bg-sky-950/30' : 
                    i % 5 === 1 ? 'bg-lime-50/80 dark:bg-lime-950/30' : 
                    i % 5 === 2 ? 'bg-fuchsia-50/80 dark:bg-fuchsia-950/30' : 
                    i % 5 === 3 ? 'bg-yellow-50/80 dark:bg-yellow-950/30' : 
                    'bg-emerald-50/80 dark:bg-emerald-950/30'
                  } backdrop-blur-sm rounded-lg border hover:border-primary/50 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 group`}>
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {tech.icon && <tech.icon className={`h-6 w-6 ${tech.color}`} />}
                    </div>
                    <h3 className="font-medium text-md">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground text-center">{tech.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Gradient overlay */}
            {!isToolsTechExpanded && toolsTechStack.length > getVisibleItems() && (
              <div className="absolute -bottom-4 left-0 right-0 h-28 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none"></div>
            )}
            
            {/* Show more/less button */}
            {toolsTechStack.length > getVisibleItems() && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsToolsTechExpanded(!isToolsTechExpanded)}
                  className="text-primary hover:text-primary/80 transition-all duration-150"
                >
                  {isToolsTechExpanded ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </div>
        </section>
<br />
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 m-auto px-4">
          <AnimatedSection delay={0.3} className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-4">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Featured Projects
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Check out some of my recent work that showcases my skills and expertise.
            </p>
          </AnimatedSection>
          
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <AnimatedSection key={project.title} delay={0.4 + (i * 0.1)}>
                <MagicCard 
                  hoverEffect="glow" 
                  glowColor="rgba(76, 0, 255, 0.15)" 
                  className="h-full min-h-[280px]"
                >
                  <div className="flex h-full flex-col justify-between">
                    {/* Project image */}
                    {project.imageSrc && (
                      <div className="w-full h-48 overflow-hidden rounded-t-lg">
                        <Image 
                          src={project.imageSrc} 
                          alt={project.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover object-center"
                          priority={i < 2} // Prioritize loading the first 2 images
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex-grow">
                      <div className="space-y-4">
                        <h3 className="font-bold text-xl">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.techStack.map((tech, techIndex) => {
                            // Generate a color based on the tech name for consistency
                            const colorMap: Record<string, string> = {
                              "React": "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
                              "Next.js": "bg-slate-50 text-slate-600 dark:bg-slate-950/40 dark:text-slate-400",
                              "Node.js": "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
                              "MongoDB": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
                              "Twilio": "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
                              "Razorpay": "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
                              "PayPal": "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
                              "Node Mailer": "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
                              "TypeScript": "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
                              "JavaScript": "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
                              "Express": "bg-gray-50 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400",
                              "Tailwind CSS": "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
                              "Chart.js": "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
                              "Redux": "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
                              "Prisma": "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400",
                              "Auth.js": "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
                              "Vue.js": "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
                              "Firebase": "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400",
                              "Socket.io": "bg-gray-50 text-gray-600 dark:bg-gray-800/40 dark:text-gray-400",
                              "Stripe API": "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
                            };
                            
                            // Default color for techs not in the map
                            const defaultColors = [
                              "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
                              "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
                              "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400",
                              "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
                              "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
                            ];
                            
                            const techColor = colorMap[tech] || defaultColors[techIndex % defaultColors.length];
                            
                            return (
                              <span 
                                key={tech} 
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${techColor} hover:bg-opacity-80`}
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 justify-between">
                        <MagicButton variant="secondary" size="sm" className="border border-primary/20 hover:border-primary/40">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            View Project
                          </span>
                        </MagicButton>
                        <MagicButton variant="default" size="sm" shimmer className="bg-gradient-to-r from-primary/80 to-primary">
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            Visit Site
                          </span>
                        </MagicButton>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection delay={0.7} className="flex justify-center">
            <MagicButton  variant="ghost">
              <Link href="/projects">View All Projects</Link>
            </MagicButton>
          </AnimatedSection>
        </section>

        <section className="container py-8 md:py-12 lg:py-24 m-auto px-4">
          <AnimatedSection delay={0.8} className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center px-4">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Let&apos;s Connect
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Feel free to reach out to discuss opportunities or just to say hello!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 py-8">
              <Button variant="outline" size="lg" className="gap-2 hover:bg-[rgba(36,41,47,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] hover:border-gray-400">
                <Github className="h-5 w-5" />
                <p>GitHub</p>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 hover:bg-[rgba(10,102,194,0.1)] dark:hover:bg-[rgba(10,102,194,0.2)] hover:border-[#0a66c2] hover:text-[#0a66c2] dark:hover:text-[#0a66c2]">
                <Linkedin className="h-5 w-5 text-[#0a66c2]" />
                <p>LinkedIn</p>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 hover:bg-[rgba(234,67,53,0.1)] dark:hover:bg-[rgba(234,67,53,0.2)] hover:border-[#ea4335] hover:text-[#ea4335] dark:hover:text-[#ea4335]">
                <Mail className="h-5 w-5 text-[#ea4335]" />
                <Link href="mailto:jhon@example.com">Email</Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 hover:bg-[rgba(76,0,255,0.1)] dark:hover:bg-[rgba(76,0,255,0.2)] hover:border-primary hover:text-primary">
                <FileText className="h-5 w-5 text-primary" />
                <Link href="/resume">Resume</Link>
              </Button>
            </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

const featuredProjects = [
  {
    title: "PixelPerfect Dashboard",
    description: "A responsive admin dashboard with dark mode and customizable widgets for data visualization.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Redux"],
    href: "https://github.com/username/pixel-perfect",
    liveUrl: "https://pixel-perfect-dashboard.vercel.app",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "TastyBites Recipe App",
    description: "A mobile-friendly recipe application with search, filtering, and personalized recommendations.",
    techStack: ["Next.js", "MongoDB", "Prisma", "Tailwind CSS", "Auth.js"],
    href: "https://github.com/username/tasty-bites",
    liveUrl: "https://tasty-bites-app.vercel.app",
    imageSrc: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "CloudSync",
    description: "A file storage and sharing platform with real-time collaboration and version control.",
    techStack: ["Vue.js", "Firebase", "Express", "Socket.io", "Stripe API"],
    href: "https://github.com/username/cloud-sync",
    liveUrl: "https://cloudsync-storage.netlify.app",
    imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
  },
];

const mainTechStack = [
  {
    name: "React",
    description: "JavaScript library for building user interfaces",
    icon: FileCode,
    color: "text-blue-400",
  },
  {
    name: "Next.js",
    description: "React framework for production",
    icon: Server, 
    color: "text-black dark:text-white",
  },
  {
    name: "JavaScript",
    description: "Programming language for the web",
    icon: FileCode,
    color: "text-yellow-400",
  },
  {
    name: "Express",
    description: "Web application framework for Node.js",
    icon: Server,
    color: "text-gray-700 dark:text-gray-300",
  },
  {
    name: "TypeScript",
    description: "Typed superset of JavaScript",
    icon: FileCode,
    color: "text-blue-600",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    icon: LayoutGrid,
    color: "text-cyan-500",
  },
  {
    name: "MongoDB",
    description: "NoSQL database for modern applications",
    icon: Database,
    color: "text-green-500",
  },
  {
    name: "Docker",
    description: "Platform for containerized applications",
    icon: Cpu,
    color: "text-blue-500",
  },
  {
    name: "Python",
    description: "General-purpose programming language",
    icon: FileCode,
    color: "text-yellow-600",
  },
  {
    name: "UI/UX",
    description: "User interface & user experience design",
    icon: LayoutGrid,
    color: "text-purple-500",
  },
];

const learningTechStack = [
  {
    name: "FastAPI",
    description: "Modern, fast web framework for Python",
    icon: Server,
    color: "text-teal-500",
  },
  {
    name: "Machine Learning",
    description: "Building systems that learn from data",
    icon: Cpu,
    color: "text-indigo-600",
  },
  {
    name: "LangChain",
    description: "Framework for LLM-powered applications",
    icon: Baseline,
    color: "text-yellow-500",
  },
  {
    name: "React Native",
    description: "Framework for building native apps",
    icon: FileCode,
    color: "text-blue-400",
  },
  {
    name: "GenAI",
    description: "Generative AI and ML models",
    icon: Cpu,
    color: "text-purple-600",
  },
];

const toolsTechStack = [
  {
    name: "Git",
    description: "Distributed version control system",
    icon: GitBranch,
    color: "text-red-500",
  },
  {
    name: "GitHub",
    description: "Platform for version control and collaboration",
    icon: Github,
    color: "text-gray-700 dark:text-gray-300",
  },
  {
    name: "Figma",
    description: "Collaborative interface design tool",
    icon: LayoutGrid,
    color: "text-purple-400",
  },
  {
    name: "VS Code",
    description: "Code editing. Redefined.",
    icon: FileCode,
    color: "text-blue-500",
  },
  {
    name: "Azure",
    description: "Microsoft's cloud computing service",
    icon: Server,
    color: "text-blue-600",
  },
];
