'use client'
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { BackToTop } from "@/components/back-to-top";
import { MagicButton } from "@/components/ui/magic-button";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import { 
  FileText, Mail, Calendar, BookOpen, GraduationCap,
} from "lucide-react";

// Tech stacks imported from homepage



export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20 px-4">
          <div className="mx-auto max-w-[64rem] space-y-8">
            <AnimatedSection>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                About <span className="text-primary">Me</span>
              </h1>
            </AnimatedSection>
            
            <div className="grid gap-10 md:grid-cols-2">
              <AnimatedSection delay={0.2} className="space-y-6">
                <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-6 border border-muted">
                  <p className="text-lg text-muted-foreground">
                    Hello! I&apos;m John Doe, a passionate Full Stack Developer with a focus on building modern web applications using JavaScript, TypeScript, React, and Node.js.
                  </p>
                  <p className="text-lg text-muted-foreground mt-4">
                    As a young developer, I&apos;ve built a strong foundation in both frontend and backend technologies through self-learning and academic studies. I enjoy solving complex problems and creating intuitive user experiences that make a difference.
                  </p>
                  <p className="text-lg text-muted-foreground mt-4">
                    I&apos;m constantly learning and adapting to new technologies to stay at the forefront of web development. My goal is to build applications that are not only functional but also scalable, maintainable, and enjoyable to use.
                  </p>
                  <div className="flex items-center gap-4 pt-6 flex-wrap">
                    <MagicButton  size="lg" className="gap-2" shimmer>
                      <Link href="/resume" className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        View Resume
                      </Link>
                    </MagicButton>
                    <MagicButton  variant="outline" size="lg" className="border-2 transition-all duration-300 hover:bg-background/30 hover:border-primary/50 group">
                      <Link href="/contact" className="flex items-center gap-2 relative overflow-hidden">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></span>
                        <Mail className="h-5 w-5 relative z-10" />
                        <span className="relative z-10">Get in Touch</span>
                      </Link>
                    </MagicButton>
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <MagicCard hoverEffect="border" className="h-full">
                  <div className="p-6 h-full">
                    <h2 className="text-2xl font-bold flex items-center mb-6">
                      <GraduationCap className="h-6 w-6 mr-2 text-primary" />
                      Education
                    </h2>
                    
                    <div className="relative">
                      {/* Education Timeline Line */}
                      <div className="absolute left-0 top-1.5 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 to-primary/10 hidden sm:block"></div>
                      
                      <div className="sm:pl-8 space-y-8">
                              {/* Additional Education (Optional) */}
                              <div className="relative">
                          {/* Timeline Dot */}
                          <div className="absolute left-[-20px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background hidden sm:block"></div>
                          <div className="flex flex-col space-y-2">
                            {/* Certificate & Timeline */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <h3 className="font-bold text-lg">Full Stack Web Development</h3>
                                <p className="text-sm text-muted-foreground">Self taught</p>
                              </div>
                              {/* <div className="flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm self-start">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                2022 - 2023
                              </div> */}
                            </div>
                            
                            {/* Institution */}
                            <div>
                              <span className="text-sm px-3 py-1.5 rounded-lg bg-muted text-muted-foreground">Youtube, Blogs, Documentations, etc</span>
                            </div>
                          </div>
                        </div>
                        {/* Main Degree */}
                        <div className="relative">
                          {/* Timeline Dot */}
                          <div className="absolute left-[-20px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background hidden sm:block"></div>
                          
                          <div className="flex flex-col space-y-3">
                            {/* Degree & Timeline */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 flex-wrap">
                              <div>
                                <h3 className="font-bold text-xl text-primary/90">Bachelor of Science</h3>
                                <p className="text-lg">Computer Science</p>
                              </div>
                              <div className="flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm self-start">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                2023 - 2027
                              </div>
                            </div>
                            
                            {/* Institution */}
                            <div className="flex items-center space-x-2">
                              <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground">State University</span>
                            </div>
                            
                            {/* Key Courses */}
                            <div className="bg-muted/30 p-4 rounded-lg border border-muted/50 mt-2">
                              <h4 className="font-semibold flex items-center mb-3">
                                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                                Key Courses
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <span className="text-sm px-3 py-1.5 bg-blue-50/80 dark:bg-blue-900/40 rounded-full text-center border border-blue-100 dark:border-blue-900/60">Data Structures & Algorithms</span>
                                <span className="text-sm px-3 py-1.5 bg-green-50/80 dark:bg-green-900/40 rounded-full text-center border border-green-100 dark:border-green-900/60">Computer Networks</span>
                                <span className="text-sm px-3 py-1.5 bg-purple-50/80 dark:bg-purple-900/40 rounded-full text-center border border-purple-100 dark:border-purple-900/60">Database Management</span>
                                <span className="text-sm px-3 py-1.5 bg-amber-50/80 dark:bg-amber-900/40 rounded-full text-center border border-amber-100 dark:border-amber-900/60">Software Engineering</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                  
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </AnimatedSection>
            </div>
            </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}