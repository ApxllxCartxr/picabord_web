import { Cpu, Lightbulb, Zap, Bot } from "lucide-react";
import DivisionCard from "../DivisionCard";

export default function DivisionCardExample() {
  const handleLearnMore = (division: string) => {
    console.log(`Learn more about ${division}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <DivisionCard
        title="TEC"
        description="Advanced technical engineering solutions for complex industrial challenges"
        features={["Precision Engineering", "System Integration", "Quality Assurance"]}
        icon={Cpu}
        gradientFrom="from-chart-1"
        gradientTo="to-primary"
        onLearnMore={handleLearnMore}
      />
      <DivisionCard
        title="ArcLight"
        description="Innovative lighting and optical technology for next-generation applications"
        features={["Optical Systems", "LED Technology", "Smart Controls"]}
        icon={Lightbulb}
        gradientFrom="from-primary"
        gradientTo="to-chart-2"
        onLearnMore={handleLearnMore}
      />
      <DivisionCard
        title="Deeptech"
        description="Cutting-edge deep technology research and development initiatives"
        features={["AI Research", "Machine Learning", "Data Analytics"]}
        icon={Zap}
        gradientFrom="from-chart-2"
        gradientTo="to-chart-1"
        onLearnMore={handleLearnMore}
      />
      <DivisionCard
        title="AnnotiQ"
        description="Intelligent annotation and data processing solutions for modern enterprises"
        features={["Data Processing", "Automated Annotation", "Quality Control"]}
        icon={Bot}
        gradientFrom="from-chart-1"
        gradientTo="to-chart-2"
        onLearnMore={handleLearnMore}
      />
    </div>
  );
}