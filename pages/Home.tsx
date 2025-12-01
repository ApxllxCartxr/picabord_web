import Hero from "@/components/Hero";
import CompanyOverview from "@/components/CompanyOverview";

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
    onSectionChange("about");
    console.log("Navigating to about");
  };

  return (
    <div>
      <Hero onLearnMore={handleLearnMore} onWatchDemo={handleWatchDemo} />
      <CompanyOverview onExploreMore={handleExploreMore} />
    </div>
  );
}