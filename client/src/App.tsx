import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Division from "@/pages/Division";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function App() {
  const [currentSection, setCurrentSection] = useState("home");

  const renderContent = () => {
    switch (currentSection) {
      case "home":
        return <Home onSectionChange={setCurrentSection} />;
      case "tec":
      case "arclight":
      case "deeptech":
      case "annotiq":
        return <Division division={currentSection} onBack={() => setCurrentSection("home")} />;
      case "about":
        return <About onBack={() => setCurrentSection("home")} />;
      case "contact":
        return <Contact onBack={() => setCurrentSection("home")} />;
      default:
        return <Home onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation 
            currentSection={currentSection} 
            onSectionChange={setCurrentSection} 
          />
          <main className="pt-16">
            {renderContent()}
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
