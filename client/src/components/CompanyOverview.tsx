import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, Users, Globe } from "lucide-react";
import facilityImage from "@assets/generated_images/Tech_research_facility_interior_8d8e4ed6.png";
import buildingImage from "@assets/generated_images/Modern_office_building_exterior_a50a638e.png";

interface CompanyOverviewProps {
  onExploreMore: () => void;
}

export default function CompanyOverview({ onExploreMore }: CompanyOverviewProps) {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every detail matters in delivering exceptional technology solutions"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge research and development"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building the future together through strategic partnerships"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Creating technology that transforms industries worldwide"
    }
  ];

  const achievements = [
    { number: "50+", label: "Patents Filed" },
    { number: "200+", label: "Team Members" },
    { number: "15+", label: "Countries Served" },
    { number: "1M+", label: "Users Worldwide" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            About PICABORD
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Leading the Future of{" "}
            <span className="bg-gradient-to-r from-chart-1 to-primary bg-clip-text text-transparent">
              Technology
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PICABORD stands at the forefront of technological innovation, developing 
            advanced solutions that shape industries and improve lives across the globe.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover-elevate">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-chart-1 to-primary rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To revolutionize technology through innovative solutions that empower 
                    businesses and individuals to achieve extraordinary outcomes while 
                    maintaining the highest standards of quality and reliability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-8 hover-elevate">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-chart-2 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the global leader in advanced technology solutions, creating 
                    a connected world where innovation drives progress and enhances 
                    human potential across all industries.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover-elevate">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-chart-1/20 to-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tomorrow's Technology */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-3xl p-12 border border-chart-1/20">
            <h3 className="text-3xl font-bold mb-6">
              Building Tomorrow's{" "}
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Technology
              </span>
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're developing products for a better tomorrow, spanning the entire spectrum 
              of innovation. From precision embedded systems that power the next generation 
              of devices to cutting-edge AI DeepTech that reshapes how we understand and 
              interact with the world around us.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-chart-1 to-chart-2 rounded-2xl mx-auto opacity-20"></div>
                <h4 className="font-semibold">Embedded Systems</h4>
                <p className="text-sm text-muted-foreground">
                  Precision-engineered solutions for tomorrow's connected world
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-chart-1 to-chart-2 rounded-2xl mx-auto opacity-20"></div>
                <h4 className="font-semibold">AI DeepTech</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced artificial intelligence pushing the boundaries of possibility
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-chart-1 to-chart-2 rounded-2xl mx-auto opacity-20"></div>
                <h4 className="font-semibold">Future Forward</h4>
                <p className="text-sm text-muted-foreground">
                  Innovation that transforms ideas into reality for a better tomorrow
                </p>
              </div>
            </div>
            
            <Button 
              onClick={onExploreMore}
              data-testid="button-explore-divisions"
              className="bg-gradient-to-r from-chart-1 to-chart-2 text-white px-8"
            >
              Explore Our Divisions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}