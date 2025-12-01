
import { Button } from "@/components/ui/button";
import { Rocket, ChevronDown } from "lucide-react";
import Link from "next/link";
import DarkVeil from "@/components/DarkVeil";
import { useAnalytics } from "@/hooks/use-analytics";

interface HeroProps {
  onLearnMore: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onLearnMore, onWatchDemo }: HeroProps) {
  const { trackEvent } = useAnalytics();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 opacity-50">
        <DarkVeil
          hueShift={42}
          noiseIntensity={0.02}
          scanlineIntensity={1}
          speed={0.8}
          scanlineFrequency={0}
          warpAmount={10}
          resolutionScale={1}
          adaptToTheme={false}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-8">
              {/* Animated heading */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight animate-fade-in-up">
                <span className="text-foreground font-medium">Let's </span>
                <span className="text-primary font-medium underline">
                  Explore
                </span>
              </h1>

              {/* Animated subtitle with delay */}
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                <span className="font-light">Beyond boundaries</span>
                <br />
                <span className="font-semibold">Beyond imagination</span>
                <br />
                <span className="text-foreground font-black">Beyond horizons.</span>
              </p>
            </div>

            {/* CTA Buttons with staggered animation */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up animation-delay-400 w-full sm:w-auto">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-chart-1 via-primary to-chart-2 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>

                <Button
                  size="lg"
                  onClick={() => {
                    trackEvent('cta_button_click', {
                      button_text: 'Begin Journey',
                      location: 'hero_section',
                      page: '/'
                    });
                    onLearnMore();
                  }}
                  data-testid="button-learn-more"
                  className="relative bg-gradient-to-r from-chart-1 via-primary to-chart-2 hover:bg-[#05060b] text-white hover:text-primary font-semibold px-10 sm:px-16 py-6 text-base sm:text-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl focus-visible-ring min-h-[56px] border-2 border-white/20 group-hover:border-primary/40"
                >
                  <span className="relative z-10 flex items-center transition-colors duration-500">
                    Begin Journey
                    <Rocket className="ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12" />
                  </span>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-background/70 backdrop-blur-sm border-2 border-primary/20 animate-fade-in-up">
          <ChevronDown className="h-4 w-4 text-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}