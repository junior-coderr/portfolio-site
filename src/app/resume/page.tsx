import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { BackToTop } from "@/components/back-to-top";
import { Mail } from "lucide-react";
// import Link from "next/link";

// Creating a client component for the download button
import { DownloadResumeButton } from "./download-button";

export const metadata = {
  title: "Resume - John Doe",
  description: "Professional resume of John Doe, Full Stack Developer specializing in JavaScript, React, Node.js, and more.",
};

export default function ResumePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-8 md:py-12 px-4">
          <AnimatedSection className="mx-auto max-w-4xl space-y-8 px-4">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl">
                Resume
              </h1>
              
              <DownloadResumeButton />
            </div>
            
            {/* Resume content - designed to be printer-friendly */}
            <div className="space-y-8 rounded-lg border p-6 print:border-none print:p-0">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <h3 className="text-xl text-muted-foreground">Full Stack Developer</h3>
                <div className="flex flex-col gap-1 pt-2 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>johndoe@example.com</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Summary</h3>
                <p className="text-muted-foreground">
                  A passionate Full Stack Developer with expertise in building modern, responsive web applications using JavaScript, TypeScript, React, and Node.js. Self-taught developer with strong problem-solving abilities and a focus on creating intuitive, high-performance user experiences.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technical Skills</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium">Frontend</h4>
                    <p className="text-sm text-muted-foreground">
                      React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Framer Motion, UI/UX Design
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Backend</h4>
                    <p className="text-sm text-muted-foreground">
                      Node.js, Express, REST API Design, MongoDB, Authentication & Authorization, Zod
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Tools & Technologies</h4>
                    <p className="text-sm text-muted-foreground">
                      Git, GitHub, Docker, VS Code, Azure, Figma
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Currently Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      FastAPI, Machine Learning, LangChain, React Native, GenAI
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Projects</h3>
                {projects.map((project, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm font-medium text-muted-foreground">
                        {project.type}
                      </p>
                    </div>
                    <p className="text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="list-inside list-disc text-sm text-muted-foreground pt-1">
                      {project.achievements.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Education</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                      <p className="text-sm font-medium text-muted-foreground">2023 - 2027</p>
                    </div>
                    <p className="text-sm">State University</p>
                    <p className="text-sm text-muted-foreground">
                      Key courses: Data Structures & Algorithms, Computer Networks, Database Management, Software Engineering
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className="font-medium">Full Stack Web Development</h4>
                      <p className="text-sm font-medium text-muted-foreground">Self-taught</p>
                    </div>
                    <p className="text-sm">Various online resources</p>
                    <p className="text-sm text-muted-foreground">
                      Self-learned full stack development through online courses, documentation, and hands-on projects
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Notable Achievements</h3>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  <li>Developed and deployed multiple full-stack web applications with real users</li>
                  <li>Successfully completed paid client projects including an e-commerce platform and a fashion show website</li>
                  <li>Self-taught developer continuously expanding skills across the modern web technology stack</li>
                  <li>Built a strong portfolio of diverse projects showcasing both technical and design capabilities</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer className="print:hidden" />
      <BackToTop className="print:hidden" />
    </div>
  );
}

const projects = [
  {
    title: "PixelPerfect Dashboard",
    type: "Full Stack Project",
    description: "A responsive admin dashboard with dark mode and customizable widgets for data visualization.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Redux"],
    achievements: [
      "Implemented responsive dashboard with multiple visualization components",
      "Created dark/light mode theming with customizable widgets"
    ]
  },
  {
    title: "TastyBites Recipe App",
    type: "Full Stack Project",
    description: "A mobile-friendly recipe application with search, filtering, and personalized recommendations.",
    technologies: ["Next.js", "MongoDB", "Prisma", "Tailwind CSS", "Auth.js"],
    achievements: [
      "Built a recommendation system based on user preferences and browsing history",
      "Implemented advanced search and filtering features for recipes"
    ]
  },
  {
    title: "CloudSync",
    type: "Full Stack Project",
    description: "A file storage and sharing platform with real-time collaboration and version control.",
    technologies: ["Vue.js", "Firebase", "Express", "Socket.io", "Stripe API"],
    achievements: [
      "Created real-time collaboration features using WebSockets",
      "Implemented file version history and document sharing capabilities"
    ]
  },
  {
    title: "FitTrack",
    type: "Mobile App",
    description: "A fitness tracking application with workout plans, progress charts, and nutrition logging.",
    technologies: ["React Native", "GraphQL", "Node.js", "MongoDB", "AWS Amplify"],
    achievements: [
      "Developed cross-platform mobile app with native performance",
      "Created visualization tools for fitness progress tracking"
    ]
  }
];