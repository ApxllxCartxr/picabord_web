import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Zap, Users, Globe } from "lucide-react";
import backgroundImage from "@assets/generated_images/Aurora_tech_background_gradient_bacc3caf.png";

interface DivisionProps {
  division: string;
  onBack: () => void;
}

export default function Division({ division, onBack }: DivisionProps) {
  const divisionData: Record<string, any> = {
    tec: {
      title: "TEC",
      subtitle: "Technical Engineering Solutions",
      description: "Advanced technical engineering solutions designed to tackle the most complex industrial challenges with precision, reliability, and innovative approaches.",
      color: "from-chart-1 to-primary",
      features: [
        "Precision Engineering & Manufacturing",
        "Advanced System Integration",
        "Quality Assurance & Testing",
        "Technical Consulting Services",
        "Custom Solution Development",
        "Performance Optimization"
      ],
      applications: [
        "Industrial Automation",
        "Aerospace Engineering", 
        "Medical Device Manufacturing",
        "Automotive Systems"
      ]
    },
    arclight: {
      title: "ArcLight", 
      subtitle: "Optical & Lighting Technology",
      description: "Revolutionary lighting and optical technology solutions that illuminate the path to next-generation applications and create smarter, more efficient environments.",
      color: "from-primary to-chart-2",
      features: [
        "Advanced Optical System Design",
        "LED Technology Innovation",
        "Smart Lighting Controls",
        "Energy Efficiency Solutions",
        "Adaptive Lighting Systems",
        "Optical Component Manufacturing"
      ],
      applications: [
        "Smart City Infrastructure",
        "Architectural Lighting",
        "Automotive Lighting",
        "Display Technologies"
      ]
    },
    deeptech: {
      title: "Deeptech",
      subtitle: "Deep Technology Research",
      description: "Cutting-edge deep technology research and development initiatives that push the boundaries of artificial intelligence, machine learning, and computational sciences.",
      color: "from-chart-2 to-chart-1", 
      features: [
        "AI Research & Development",
        "Machine Learning Algorithms",
        "Advanced Data Analytics",
        "Neural Network Architecture",
        "Computer Vision Systems",
        "Natural Language Processing"
      ],
      applications: [
        "Autonomous Systems",
        "Predictive Analytics",
        "Computer Vision",
        "Robotics & Automation"
      ]
    },
    annotiq: {
      title: "AnnotiQ",
      subtitle: "Intelligent Data Processing", 
      description: "Intelligent annotation and data processing solutions that transform how modern enterprises handle, process, and derive insights from their vast data repositories.",
      color: "from-chart-1 to-chart-2",
      features: [
        "Automated Data Processing", 
        "Intelligent Annotation Systems",
        "Quality Control & Validation",
        "Enterprise Integration",
        "Scalable Data Pipelines",
        "Real-time Processing"
      ],
      applications: [
        "Healthcare Data Processing",
        "Financial Analytics",
        "Media & Content Management", 
        "Research Data Analysis"
      ]
    }
  };

  const data = divisionData[division] || divisionData.tec;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 hover-elevate"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-6">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Division
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                {data.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">{data.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features & Applications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Key Features */}
            <Card className="p-8 hover-elevate">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${data.color} rounded-lg flex items-center justify-center`}>
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <CardTitle>Key Features</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  {data.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-chart-1 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card className="p-8 hover-elevate">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${data.color} rounded-lg flex items-center justify-center`}>
                    <Globe className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <CardTitle>Applications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid gap-4">
                  {data.applications.map((app: string, index: number) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted/50 rounded-lg hover-elevate transition-all duration-200"
                    >
                      <span className="font-medium">{app}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats & Contact */}
      <section className="py-16 bg-gradient-to-r from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0">
                <div className={`text-3xl font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-2`}>
                  500+
                </div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0">
                <div className={`text-3xl font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-2`}>
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover-elevate">
              <CardContent className="p-0">
                <div className={`text-3xl font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-2`}>
                  99.5%
                </div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className={`bg-gradient-to-r ${data.color} text-primary-foreground px-8`}
              data-testid="button-contact-division"
              onClick={() => console.log(`Contact ${data.title} division`)}
            >
              <Users className="w-5 h-5 mr-2" />
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}