import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Users, Globe, Target } from "lucide-react";

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {

  const leadership = [
    {
      name: "Anish K",
      role: "Founding Director",
      background: "Visionary leader driving innovation across all technology divisions"
    },
    {
      name: "Zahid Hussain J",
      role: "Managing Director",
      background: "Strategic leadership and operational excellence in technology management"
    },
    {
      name: "Deva Dharshini M",
      role: "Human Resources",
      background: "People-focused leader building exceptional teams for technological advancement"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
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