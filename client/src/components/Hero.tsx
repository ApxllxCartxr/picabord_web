import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="text-foreground">Let's</span>
                <br />
                <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  Explore
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Beyond boundaries.
                <br />
                Beyond imagination.
                <br />
                <span className="text-foreground">Beyond today.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={onLearnMore}
                data-testid="button-learn-more"
                className="bg-gradient-to-r from-chart-1 to-primary hover:from-chart-1/90 hover:to-primary/90 text-primary-foreground px-12 py-4 text-lg rounded-xl"
              >
                Begin Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onWatchDemo}
                data-testid="button-watch-demo"
                className="bg-background/80 backdrop-blur-sm border-primary/30 px-12 py-4 text-lg rounded-xl"
              >
                Discover More
              </Button>
            </div>

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