'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Globe, Target, Brain, Cpu } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useAnalytics } from "@/hooks/use-analytics";

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  const valuesAnimation = useScrollAnimation({ threshold: 0.2 });
  const { trackEvent } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10">
      {/* Header */}
      <section className="pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 hover-elevate"
            data-testid="button-back-about"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-6 mb-8 animate-fade-in-up">
            <Badge variant="outline" className="border-primary/30 text-primary font-picabord">
              About PICABORD
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Who{" "}
              <span className="text-primary">
                We Are
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-justify">
              We are a technology company that bridges the digital and physical worlds through innovative software and hardware solutions. Our dual expertise enables us to create comprehensive ecosystems that transform industries and empower businesses to achieve extraordinary outcomes.
            </p>
          </div>

        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={valuesAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-700 ${
              valuesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our{" "}
              <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              We deliver comprehensive technology solutions across two core domains
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card 
              className={`p-8 hover-elevate transition-all duration-700 ${
                valuesAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-chart-2 to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Software</h3>
                    <p className="text-sm text-primary">TEC Division</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                  Enterprise applications, cloud platforms, and innovative software products that transform how businesses operate and scale in the digital age.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Customer Relationship Management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Invoice Management Systems
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Business Process Automation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className={`p-8 hover-elevate transition-all duration-700 delay-150 ${
                valuesAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-chart-1 to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Hardware</h3>
                    <p className="text-sm text-primary">PIKA Division</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                  Cutting-edge embedded systems and single-board computers that power the next generation of IoT, edge computing, and industrial applications.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Single-Board Computers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    IoT & Edge Computing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Industrial Automation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Looking to{" "}
              <span className="text-primary">Collaborate?</span>
            </h2>
            <p className="text-xl text-muted-foreground text-justify">
              Let's build something extraordinary together
            </p>
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-chart-1 via-primary to-chart-2 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <Button
                size="lg"
                asChild
                className="relative bg-gradient-to-r from-chart-1 via-primary to-chart-2 hover:bg-[#05060b] text-white hover:text-primary font-semibold px-12 py-6 text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl min-h-[56px] border-2 border-white/20 group-hover:border-primary/40"
              >
                <a 
                  href="mailto:connect@picabord.space"
                  onClick={() => {
                    trackEvent('cta_button_click', {
                      button_text: 'Contact Us',
                      location: 'collaboration_cta',
                      page: '/about'
                    });
                  }}
                >
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}