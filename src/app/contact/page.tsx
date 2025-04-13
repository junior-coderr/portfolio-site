"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { BackToTop } from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from "lucide-react";
// import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      // This is a dummy form - just simulate submission and always succeed
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted with dummy data:", values);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);

      // We'll never reach this in the dummy implementation
      setIsError(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20 px-4">
          <div className="mx-auto grid max-w-[64rem] gap-8 md:grid-cols-2">
            <AnimatedSection className="space-y-6">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a project in mind or just want to say hello? Feel free to reach out to me using the form or through my social channels.
              </p>
              
              <AnimatedSection delay={0.2} className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold">Connect with me</h2>
                <div className="flex flex-col space-y-3">
                  <span className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-default">
                    <Mail className="h-5 w-5" />
                    <span>johndoe@example.com</span>
                  </span>
                  <span className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-default">
                    <Github className="h-5 w-5" />
                    <span>github.com/johndoe-dev</span>
                  </span>
                  <span className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-default">
                    <Linkedin className="h-5 w-5" />
                    <span>linkedin.com/in/john-doe-developer</span>
                  </span>
                </div>
              </AnimatedSection>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="rounded-lg border p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message here..." 
                            className="min-h-[150px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isSuccess && (
                    <div className="rounded-md bg-green-500/15 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}
                  
                  {isError && (
                    <div className="rounded-md bg-red-500/15 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                      Something went wrong. Please try again later.
                    </div>
                  )}
                  
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}