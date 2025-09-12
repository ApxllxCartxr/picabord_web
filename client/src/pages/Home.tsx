import Hero from "@/components/Hero";
import CompanyOverview from "@/components/CompanyOverview";
import DivisionsSection from "@/components/DivisionsSection";

interface HomeProps {
  onSectionChange: (section: string) => void;
}

export default function Home({ onSectionChange }: HomeProps) {
  const handleLearnMore = () => {
    onSectionChange("about");
    console.log("Navigating to about section");
  };

  const handleWatchDemo = () => {
    console.log("Opening demo video");
  };

  const handleExploreMore = () => {
    onSectionChange("tec");
    console.log("Navigating to divisions");
  };

  const handleDivisionSelect = (division: string) => {
    onSectionChange(division);
    console.log(`Navigating to ${division} division`);
  };

  return (
    <div>
      <Hero onLearnMore={handleLearnMore} onWatchDemo={handleWatchDemo} />
      <CompanyOverview onExploreMore={handleExploreMore} />
      <DivisionsSection onDivisionSelect={handleDivisionSelect} />
    </div>
  );
}