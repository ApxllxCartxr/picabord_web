import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import pikaImage from "@assets/generated_images/PIKA1_flagship_product_hero_7be1e5f2.png";

interface HeroProps {
  onLearnMore: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onLearnMore, onWatchDemo }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-chart-1/10 via-primary/10 to-chart-2/10 opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-chart-1 via-primary to-chart-2 bg-clip-text text-transparent">
                  PIKA1
                </span>
                <br />
                <span className="text-foreground">Revolutionary</span>
                <br />
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
                  Technology
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Experience the future of advanced technology with PIKA1 - our flagship product 
                that combines cutting-edge innovation with intuitive design to deliver 
                unprecedented performance and reliability.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onLearnMore}
                data-testid="button-learn-more"
                className="bg-gradient-to-r from-chart-1 to-primary hover:from-chart-1/90 hover:to-primary/90 text-primary-foreground px-8"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onWatchDemo}
                data-testid="button-watch-demo"
                className="bg-background/80 backdrop-blur-sm border-primary/30"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

          </div>

          {/* Right Content - Product Image */}
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/20 hover-elevate">
              <img
                src={pikaImage}
                alt="PIKA1 flagship product"
                className="w-full h-auto rounded-lg shadow-lg"
                data-testid="img-pika1-hero"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-primary to-chart-2 rounded-full opacity-20 blur-xl" />
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-chart-1 to-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}