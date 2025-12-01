import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Zap, Globe } from "lucide-react";
import backgroundImage from "@assets/generated_images/Aurora_tech_background_gradient_bacc3caf.png";
import softwareBackgroundImage from "@assets/generated_images/Software_development_workspace_background_f8ff4622.png";
import solarPanelImage from "@assets/generated_images/Solar_panel_background_image_c33090dc.png";
import aiTechImage from "@assets/generated_images/AI_technology_background_image_afdab38d.png";
import annotationImage from "@assets/generated_images/Data_annotation_background_image_67631014.png";

interface DivisionProps {
  division: string;
  onBack: () => void;
}

export default function Division({ division, onBack }: DivisionProps) {
  const divisionData: Record<string, any> = {
    tec: {
      title: "TEC",
      subtitle: "Software Product Development & Engineering",
      description: "We specialize in developing innovative software products that transform how businesses operate. Our expertise spans across web applications, mobile solutions, enterprise software, and cloud-based platforms designed to streamline workflows, enhance productivity, and deliver exceptional user experiences.",
      color: "from-chart-1 to-primary",
      products: [
        {
          name: "Freelancer CRM",
          description: "Comprehensive customer relationship management system designed specifically for freelancers and independent contractors. Features include client management, project tracking, proposal generation, and automated follow-ups.",
          status: "Coming Soon"
        },
        {
          name: "Invoice Management System",
          description: "Smart invoicing platform that automates billing processes, tracks payments, manages recurring subscriptions, and provides detailed financial analytics for businesses of all sizes.",
          status: "Coming Soon"
        }
      ],
      features: [
        "Modern Software Architecture",
        "Real-time Data Synchronization", 
        "Advanced User Analytics",
        "Enterprise-Grade Security",
        "Comprehensive API Ecosystem",
        "Scalable Software Infrastructure"
      ],
      applications: [
        "Business Process Automation",
        "Customer Relationship Management",
        "Financial Management Systems",
        "Workflow Optimization Tools"
      ]
    },
    arclight: {
      title: "ArcLight", 
      subtitle: "All Weather Solar Panel Development",
      description: "All weather solar panel development that delivers consistent energy generation regardless of environmental conditions, ensuring reliable solar power in any climate.",
      color: "from-primary to-chart-2"
    },
    deeptech: {
      title: "Deeptech",
      subtitle: "Advanced Technology Projects",
      description: "Deeptech projects that power the betterment of applications, focusing on breakthrough technologies that solve complex challenges and drive innovation across industries.",
      color: "from-chart-2 to-chart-1"
    },
    annotiq: {
      title: "AnnotiQ",
      subtitle: "AI-Based Annotation System", 
      description: "AI based annotation system for a multitude of resources, providing intelligent labeling and processing capabilities for diverse data types and formats.",
      color: "from-chart-1 to-chart-2"
    }
  };

  const data = divisionData[division] || divisionData.tec;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={
              division === 'tec' ? softwareBackgroundImage.src :
              division === 'arclight' ? solarPanelImage.src :
              division === 'deeptech' ? aiTechImage.src :
              division === 'annotiq' ? annotationImage.src :
              backgroundImage.src
            } 
            alt="Background" 
            className={`w-full h-full object-cover ${
              division === 'arclight' || division === 'deeptech' || division === 'annotiq' ? 'blur-sm' : ''
            }`}
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

      {/* Products (for TEC) or Features & Applications (for others) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {data.products ? (
            /* Product showcase for TEC */
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Our Software Products</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Innovative software solutions currently in development
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {data.products.map((product: any, index: number) => (
                  <Card key={index} className="p-8 hover-elevate">
                    <CardHeader className="pb-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground">
                          {product.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Technical Features for TEC */}
              <div className="grid lg:grid-cols-2 gap-12 mt-16">
                <Card className="p-8 hover-elevate">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${data.color} rounded-lg flex items-center justify-center`}>
                        <Zap className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <CardTitle>Technical Features</CardTitle>
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
          ) : (
            /* Simple layout for other divisions - description only */
            <div className="max-w-4xl mx-auto text-center">
              <Card className="p-12 hover-elevate">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${data.color} rounded-lg flex items-center justify-center mx-auto mb-8`}>
                    <Zap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">
                    <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                      {data.subtitle}
                    </span>
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    {data.description}
                  </p>
                  <div className="mt-8">
                    <Badge className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground">
                      Coming Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}