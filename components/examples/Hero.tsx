import Hero from "../Hero";

export default function HeroExample() {
  const handleLearnMore = () => {
    console.log("Learn More clicked");
  };

  const handleWatchDemo = () => {
    console.log("Watch Demo clicked");
  };

  return (
    <Hero onLearnMore={handleLearnMore} onWatchDemo={handleWatchDemo} />
  );
}