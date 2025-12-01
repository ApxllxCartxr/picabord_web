import CompanyOverview from "../CompanyOverview";

export default function CompanyOverviewExample() {
  const handleExploreMore = () => {
    console.log("Explore More clicked");
  };

  return <CompanyOverview onExploreMore={handleExploreMore} />;
}