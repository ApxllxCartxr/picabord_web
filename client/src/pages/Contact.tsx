import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react";

interface ContactProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "contact@picabord.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm PST"
    },
    {
      icon: MapPin,
      title: "Address",
      detail: "123 Innovation Drive, San Francisco, CA 94102",
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Monday - Friday: 8:00 AM - 5:00 PM PST",
      description: "We're here to help"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 hover-elevate"
            data-testid="button-back-contact"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Contact{" "}
              <span className="bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
                PICABORD
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to explore how PICABORD can transform your business? 
              Get in touch with our team of experts today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 hover-elevate">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5 text-primary" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      data-testid="input-company"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject *</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      required
                      data-testid="input-subject"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your needs..."
                      rows={5}
                      required
                      data-testid="textarea-message"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-chart-1 to-primary"
                    data-testid="button-send-message"
                  >
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6 hover-elevate">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-chart-1 to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                        <p className="text-foreground font-medium mb-1">{info.detail}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-chart-1/5 border-primary/20">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you're interested in our PIKA1 product, need consulting for a specific 
                  division, or want to explore partnership opportunities, we're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-chart-1 to-primary"
                    onClick={() => console.log("Schedule consultation")}
                    data-testid="button-schedule-consultation"
                  >
                    Schedule Consultation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => console.log("Download brochure")}
                    data-testid="button-download-brochure"
                  >
                    Download Brochure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}