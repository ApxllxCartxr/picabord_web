'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Palette, Code, Rocket } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import CardSwap, { Card } from "@/components/CardSwap";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ProcessPhase {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Technology {
  name: string;
  color?: string;
}

interface TechCategory {
  name: string;
  technologies: Technology[];
}

export default function WorkPage() {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const processAnimation = useScrollAnimation({ threshold: 0.2 });
  const techAnimation = useScrollAnimation({ threshold: 0.2 });

  // Process phases data
  const processPhases: ProcessPhase[] = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements, define project scope, and create a comprehensive roadmap that aligns with your business goals and technical needs.",
      icon: Search
    },
    {
      number: "02",
      title: "Design & Architecture",
      description: "Our team crafts intuitive user experiences and robust system architectures, ensuring scalability, performance, and maintainability from the ground up.",
      icon: Palette
    },
    {
      number: "03",
      title: "Development & Testing",
      description: "We build your solution using modern technologies and best practices, with continuous testing to ensure quality, security, and reliability throughout.",
      icon: Code
    },
    {
      number: "04",
      title: "Deployment & Support",
      description: "We deploy your solution seamlessly and provide ongoing support, monitoring, and optimization to ensure long-term success and continuous improvement.",
      icon: Rocket
    }
  ];

  // Technologies data
  const techCategories: TechCategory[] = [
    {
      name: "Frontend",
      technologies: [
        { name: "React", color: "#61DAFB" },
        { name: "Next.js", color: "#000000" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "Tailwind CSS", color: "#06B6D4" },
        { name: "GSAP", color: "#88CE02" },
        { name: "Redux", color: "#764ABC" }
      ]
    },
    {
      name: "Backend",
      technologies: [
        { name: "Node.js", color: "#339933" },
        { name: "Express", color: "#000000" },
        { name: "MongoDB", color: "#47A248" },
        { name: "PostgreSQL", color: "#4169E1" },
        { name: "Redis", color: "#DC382D" },
        { name: "GraphQL", color: "#E10098" }
      ]
    },
    {
      name: "DevOps & Tools",
      technologies: [
        { name: "Docker", color: "#2496ED" },
        { name: "Git", color: "#F05032" },
        { name: "AWS", color: "#FF9900" },
        { name: "Vercel", color: "#000000" },
        { name: "GitHub Actions", color: "#2088FF" },
        { name: "Nginx", color: "#009639" }
      ]
    }
  ];

  // Example images from public folder - Using only 3 cards
  const exampleImages = [
    { src: "/example2.jpg", alt: "Project showcase example 2" },
    { src: "/example4.jpg", alt: "Project showcase example 4" },
    { src: "/example6.jpg", alt: "Project showcase example 6" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10">
      {/* Back Button */}
      <section className="pt-28 pb-8" aria-label="Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 hover-elevate"
              data-testid="button-back-work"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Area - Left Side */}
            <div
              ref={heroAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`space-y-8 transition-all duration-700 ${
                heroAnimation.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="space-y-6">
                <Badge variant="outline" className="border-primary/30 text-primary font-picabord">
                  Portfolio
                </Badge>
                
                <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold">
                  Our{" "}
                  <span className="text-primary">Work</span>
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                  Crafting Digital Excellence
                </h2>
              </div>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At PICABORD, we bridge the digital and physical worlds through innovative solutions. 
                  Our <span className="text-primary font-semibold">Hardware Division</span> delivers cutting-edge 
                  hardware including single-board computers and embedded systems, while our{" "}
                  <span className="text-primary font-semibold">Software Division</span> creates powerful software 
                  applications that transform how businesses operate.
                </p>
                
                <p>
                  We specialize in building scalable, modern applications using industry-leading technologies. 
                  From concept to deployment, we deliver solutions that exceed expectations and drive real results.
                </p>
              </div>

              {/* Tech Stack Highlights */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Technologies We Master</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "MERN Stack",
                    "Next.js",
                    "TypeScript",
                    "GSAP",
                    "Tailwind CSS",
                    "Docker",
                    "AWS",
                    "PostgreSQL"
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/20 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CardSwap Component - Right Side */}
            <div className="relative h-[600px] lg:h-[700px] flex items-center justify-end pr-0 lg:pr-8">
              <CardSwap
                width={800}
                height={500}
                cardDistance={40}
                verticalDistance={50}
                delay={5000}
                pauseOnHover={false}
                skewAmount={3}
                easing="elastic"
              >
                {exampleImages.map((img, index) => (
                  <Card key={index} customClass="overflow-hidden rounded-2xl shadow-2xl border border-border/20 bg-transparent">
                    <div className="relative w-full h-full bg-transparent">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain bg-transparent"
                        sizes="800px"
                        quality={100}
                        priority={index === 0}
                      />
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-24" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="process-heading" className="text-3xl md:text-5xl font-bold mb-4">
              Our{" "}
              <span className="text-primary">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div
            ref={processAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
              processAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {processPhases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={index}
                  className="relative p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {phase.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-transparent" aria-labelledby="tech-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="tech-heading" className="text-3xl md:text-5xl font-bold mb-4">
              Technologies We{" "}
              <span className="text-primary">Work With</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge tools and frameworks to build exceptional solutions
            </p>
          </div>

          <div
            ref={techAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-700 ${
              techAnimation.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {techCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="space-y-6"
                style={{ transitionDelay: `${catIndex * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium hover:scale-105 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-default"
                      style={{
                        borderLeftColor: tech.color,
                        borderLeftWidth: '3px'
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold">
              Ready to Start{" "}
              <span className="text-primary">Your Project?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's collaborate and bring your vision to life with innovative solutions tailored to your needs
            </p>
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-chart-1 via-primary to-chart-2 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-chart-1 via-primary to-chart-2 hover:bg-[#05060b] text-white hover:text-primary font-semibold px-12 py-6 text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl min-h-[56px] border-2 border-white/20 group-hover:border-primary/40"
                >
                  <span className="relative z-10 transition-colors duration-500">
                    Get in Touch
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
