import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "home", label: "Home" },
    { id: "tec", label: "TEC" },
    { id: "arclight", label: "ArcLight" },
    { id: "deeptech", label: "Deeptech" },
    { id: "annotiq", label: "AnnotiQ" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" }
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
    console.log(`Navigate to ${sectionId} section`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-chart-1 via-primary to-chart-2 bg-clip-text text-transparent">
              PICABORD
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  data-testid={`nav-${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    currentSection === section.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.label}
                  {currentSection === section.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-chart-1 to-primary rounded-full" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-sm rounded-lg mt-2 border border-border">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  data-testid={`nav-mobile-${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                  className={`w-full justify-start px-3 py-2 text-sm font-medium ${
                    currentSection === section.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}