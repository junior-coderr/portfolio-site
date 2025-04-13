import { Metadata } from 'next';
import { ProjectsClient } from '@/components/projects-client';

export const metadata: Metadata = {
  title: "Projects - John Doe",
  description: "Explore the portfolio of projects by John, including web applications, mobile apps, and more.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}