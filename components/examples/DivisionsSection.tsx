import DivisionsSection from "../DivisionsSection";

export default function DivisionsSectionExample() {
  const handleDivisionSelect = (division: string) => {
    console.log(`Division selected: ${division}`);
  };

  return <DivisionsSection onDivisionSelect={handleDivisionSelect} />;
}