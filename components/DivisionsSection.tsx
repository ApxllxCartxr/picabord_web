import { Badge } from "@/components/ui/badge";
import { Cpu, Lightbulb, Zap, Bot } from "lucide-react";
import DivisionCard from "./DivisionCard";

interface DivisionsSectionProps {
  onDivisionSelect: (division: string) => void;
}

export default function DivisionsSection({ onDivisionSelect }: DivisionsSectionProps) {
  const divisions = [
    {
      title: "PIKA",
      description: "High-performance single board computers and embedded systems that power the next generation of IoT devices, edge computing, and industrial automation.",
      features: [],
      icon: Cpu,
      gradientFrom: "from-chart-1",
      gradientTo: "to-chart-3"
    },
    {
      title: "TEC",
      description: "Advanced technical engineering solutions designed to tackle the most complex industrial challenges with precision and reliability.",
      features: [],
      icon: Cpu,
      gradientFrom: "from-chart-1",
      gradientTo: "to-primary"
    }
  ];

  const handleLearnMore = (division: string) => {
    onDivisionSelect(division.toLowerCase());
    console.log(`Selected division: ${division}`);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Our Divisions
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Specialized{" "}
            <span className="text-primary">
              Excellence
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each division represents our commitment to excellence in specialized fields, 
            delivering cutting-edge solutions tailored to industry-specific challenges.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {divisions.map((division, index) => (
            <DivisionCard
              key={index}
              title={division.title}
              description={division.description}
              features={division.features}
              icon={division.icon}
              gradientFrom={division.gradientFrom}
              gradientTo={division.gradientTo}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each division operates with dedicated teams of experts, state-of-the-art facilities, 
            and partnerships with leading institutions worldwide to ensure we deliver the most 
            advanced solutions in the market.
          </p>
        </div>
      </div>
    </section>
  );
}