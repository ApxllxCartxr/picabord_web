import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Users, Globe, Target } from "lucide-react";
import facilityImage from "@assets/generated_images/Tech_research_facility_interior_8d8e4ed6.png";
import buildingImage from "@assets/generated_images/Modern_office_building_exterior_a50a638e.png";

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  const timeline = [
    {
      year: "2018",
      title: "Founded",
      description: "PICABORD established with vision to revolutionize technology"
    },
    {
      year: "2020", 
      title: "First Patent",
      description: "Breakthrough innovation in optical technology patented"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Operations expanded to 15 countries worldwide"
    },
    {
      year: "2024",
      title: "PIKA1 Launch",
      description: "Flagship product PIKA1 revolutionizes the market"
    },
    {
      year: "2025",
      title: "Future Forward",
      description: "Continuing to push boundaries of innovation"
    }
  ];

  const leadership = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Founder",
      background: "PhD in Electrical Engineering, Former Tesla Senior Engineer"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      background: "MS Computer Science, Ex-Google AI Research Lead"
    },
    {
      name: "Dr. Priya Patel",
      role: "Head of Research",
      background: "PhD in Materials Science, Former MIT Professor"
    },
    {
      name: "James Wilson",
      role: "VP of Engineering",
      background: "MS Mechanical Engineering, Ex-SpaceX Principal Engineer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 hover-elevate"
            data-testid="button-back-about"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="border-primary/30 text-primary">
              About PICABORD
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Pioneering{" "}
              <span className="bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From our humble beginnings to becoming a global leader in advanced technology, 
              our journey is defined by relentless innovation and unwavering commitment to excellence.
            </p>
          </div>

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="overflow-hidden hover-elevate">
              <img
                src={facilityImage}
                alt="PICABORD research facility"
                className="w-full h-64 object-cover"
                data-testid="img-about-facility"
              />
            </Card>
            <Card className="overflow-hidden hover-elevate">
              <img
                src={buildingImage}
                alt="PICABORD headquarters"
                className="w-full h-64 object-cover"
                data-testid="img-about-building"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gradient-to-r from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover-elevate">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-chart-1 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">Mission</h3>
                <p className="text-muted-foreground">
                  To revolutionize technology through innovative solutions that empower 
                  businesses and transform industries worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover-elevate">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-chart-2 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">Vision</h3>
                <p className="text-muted-foreground">
                  To be the global leader in advanced technology solutions, creating 
                  a connected world where innovation drives human progress.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center hover-elevate">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-chart-2 to-chart-1 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">Values</h3>
                <p className="text-muted-foreground">
                  Excellence, innovation, integrity, and collaboration guide every 
                  decision we make and every solution we deliver.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-chart-1 via-primary to-chart-2" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                    <Card className="p-6 hover-elevate">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-chart-1 to-primary rounded-full border-4 border-background" />
                  </div>
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-gradient-to-r from-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced leadership team brings together decades of expertise from 
              leading technology companies and research institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-chart-1 to-chart-2 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{leader.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{leader.role}</p>
                  <p className="text-xs text-muted-foreground">{leader.background}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}