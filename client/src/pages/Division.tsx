import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Zap, Globe } from "lucide-react";
import backgroundImage from "@assets/generated_images/Aurora_tech_background_gradient_bacc3caf.png";

interface DivisionProps {
  division: string;
  onBack: () => void;
}

export default function Division({ division, onBack }: DivisionProps) {
  const divisionData: Record<string, any> = {
    tec: {
      title: "TEC",
      subtitle: "SaaS Solutions & Technical Engineering",
      description: "We are developing innovative SaaS-based products that revolutionize business operations. Our focus is on creating cloud-native solutions that streamline workflows, enhance productivity, and provide scalable business management tools.",
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
        "Cloud-Native SaaS Architecture",
        "Real-time Data Synchronization", 
        "Advanced User Analytics",
        "Multi-tenant Security",
        "API Integration Platform",
        "Scalable Infrastructure"
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
      subtitle: "Solar Energy Solutions",
      description: "Advanced solar energy solutions and photovoltaic technology that harness the power of the sun to create sustainable, efficient energy systems for residential, commercial, and industrial applications.",
      color: "from-primary to-chart-2",
      features: [
        "High-Efficiency Solar Panels",
        "Smart Grid Integration",
        "Energy Storage Solutions",
        "Solar Tracking Systems",
        "Performance Monitoring",
        "Sustainable Energy Management"
      ],
      applications: [
        "Residential Solar Systems",
        "Commercial Solar Farms",
        "Industrial Energy Solutions",
        "Off-Grid Power Systems"
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

      {/* Products (for TEC) or Features & Applications (for others) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {data.products ? (
            /* Product showcase for TEC */
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Our SaaS Products</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Revolutionary cloud-based solutions currently in development
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
            /* Standard layout for other divisions */
            <div className="grid lg:grid-cols-2 gap-12">
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
          )}
        </div>
      </section>

    </div>
  );
}