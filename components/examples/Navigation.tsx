import { useState } from "react";
import Navigation from "../Navigation";

export default function NavigationExample() {
  const [currentSection, setCurrentSection] = useState("home");

  return (
    <div className="min-h-[200px]">
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      <div className="pt-20 p-4">
        <p className="text-muted-foreground">Current section: {currentSection}</p>
      </div>
    </div>
  );
}