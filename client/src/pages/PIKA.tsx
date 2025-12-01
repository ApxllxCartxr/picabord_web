import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cpu, Zap, Shield, Wifi, Database, Thermometer } from "lucide-react";
import pikaImage from "@assets/generated_images/PIKA1_flagship_product_hero_7be1e5f2.png";

interface PIKAProps {
  onBack: () => void;
}

export default function PIKA({ onBack }: PIKAProps) {
  const pikaImageSrc = typeof pikaImage === "string" ? pikaImage : pikaImage.src;

  const specifications = [
    { icon: Cpu, label: "ARM Cortex-A78", description: "High-performance 64-bit processor" },
    { icon: Zap, label: "8GB LPDDR5", description: "Ultra-fast memory for demanding applications" },
    { icon: Database, label: "64GB eMMC", description: "High-speed storage with expansion options" },
    { icon: Wifi, label: "Wi-Fi 6E & 5G", description: "Next-generation connectivity" },
    { icon: Shield, label: "Hardware Security", description: "Built-in TPM 2.0 and secure boot" },
    { icon: Thermometer, label: "Industrial Grade", description: "Operating range: -40°C to 85°C" }
  ];

  const features = [
    {
      title: "Ultra-Compact Design",
      description: "Credit card-sized form factor with maximum performance density"
    },
    {
      title: "Developer Friendly",
      description: "Full Linux support with comprehensive SDK and development tools"
    },
    {
      title: "Edge AI Ready",
      description: "Dedicated NPU for machine learning and AI inference at the edge"
    },
    {
      title: "IoT Connectivity",
      description: "Multiple interfaces including GPIO, I2C, SPI, UART, and CAN bus"
    }
  ];

  const applications = [
    "Industrial IoT Gateways",
    "Edge AI Computing",
    "Robotics Control Systems",
    "Smart Home Hubs",
    "Digital Signage",
    "Autonomous Vehicle Systems"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              data-testid="button-back"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge variant="outline" className="border-primary/30 text-primary mr-4">
              Single Board Computer
            </Badge>
            <Badge className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground">
              Coming Soon
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                    PIKA-1
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
                  Single Board Computer
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The PIKA-1 represents the next evolution in single board computing. 
                  Engineered for performance, built for reliability, and designed for 
                  the future of embedded systems and edge computing applications.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground px-8"
                  data-testid="button-request-sample"
                >
                  Request Development Kit
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/30"
                  data-testid="button-technical-specs"
                >
                  View Technical Specs
                </Button>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/20 hover-elevate">
                <img
                  src={pikaImageSrc}
                  alt="PIKA-1 Single Board Computer"
                  className="w-full h-auto rounded-lg shadow-lg"
                  data-testid="img-pika1-showcase"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-primary to-chart-2 rounded-full opacity-20 blur-xl" />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Technical{" "}
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Specifications
              </span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Packed with cutting-edge technology in a compact form factor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-6 hover-elevate">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-chart-1/20 to-primary/20 rounded-lg flex items-center justify-center">
                      <spec.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{spec.label}</h4>
                      <p className="text-sm text-muted-foreground">{spec.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gradient-to-r from-chart-1/5 via-background to-chart-2/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Key Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed for developers, engineers, and innovators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover-elevate">
                <CardContent className="p-0">
                  <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Perfect for{" "}
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Any Application
              </span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From prototyping to production deployment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((application, index) => (
              <Card key={index} className="p-4 text-center hover-elevate">
                <CardContent className="p-0">
                  <p className="font-medium">{application}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-chart-1/10 via-primary/10 to-chart-2/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Build the Future?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with the PIKA-1 development kit and bring your ideas to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground px-12"
              data-testid="button-get-started"
            >
              Get Development Kit
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 px-12"
              data-testid="button-contact-sales"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}