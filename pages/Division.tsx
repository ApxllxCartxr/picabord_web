'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Zap, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
// Temporary placeholder path until Next.js Image component is implemented
const backgroundImage = "/attached_assets/generated_images/Software_development_workspace_background_f8ff4622.png";

interface DivisionProps {
  division: string;
  onBack: () => void;
}

export default function Division({ division, onBack }: DivisionProps) {
  // Scroll animations for different sections
  const headerAnimation = useScrollAnimation({ threshold: 0.2 });
  const productsHeaderAnimation = useScrollAnimation({ threshold: 0.2 });
  const productsAnimation = useScrollAnimation({ threshold: 0.1 });

  const divisionData: Record<string, any> = {
    tec: {
      title: "The Editor's Choice",
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

          <div
            ref={headerAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`text-center space-y-6 transition-all duration-700 ${headerAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            <Badge variant="outline" className="border-primary/30 text-primary">
              Division
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              {data.title}
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
              <div
                ref={productsHeaderAnimation.ref as React.RefObject<HTMLDivElement>}
                className={`text-center transition-all duration-700 ${productsHeaderAnimation.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
              >
                <h2 className="text-3xl font-bold mb-4">Our Software Products</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Innovative software solutions currently in development
                </p>
              </div>

              <div
                ref={productsAnimation.ref as React.RefObject<HTMLDivElement>}
                className="grid lg:grid-cols-2 gap-8"
              >
                {data.products.map((product: any, index: number) => (
                  <Card
                    key={index}
                    className={`p-8 hover-elevate transition-all duration-700 ${productsAnimation.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                      }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
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