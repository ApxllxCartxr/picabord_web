'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useAnalytics } from "@/hooks/use-analytics";

interface ContactProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactProps) {
  const formAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });
  const { trackEvent, trackConversion } = useAnalytics();
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

  const handleFieldFocus = (fieldName: string) => {
    trackEvent('contact_form_field_focus', {
      field: fieldName,
      form_type: 'contact',
      source_page: '/'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    
    // Track form submission as conversion event
    trackConversion('contact_form_submit', 1);
    
    // Track additional event with form details
    trackEvent('contact_form_submit', {
      form_type: 'contact',
      source_page: '/',
      has_company: !!formData.company,
      subject_length: formData.subject.length,
      message_length: formData.message.length
    });
    
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
      detail: "connect@picabord.space",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+91 93449 38549",
      description: "Mon-Fri from 9am to 6pm IST"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Chennai, India",
      description: "Visit us or reach out"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10">
      <section className="pt-28 pb-24">
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
          
          <div className="text-center space-y-6 mb-16 animate-fade-in-up">
            <Badge variant="outline" className="border-primary/30 text-primary">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              Contact{" "}
              <span className="text-primary font-picabord">
                PICABORD
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to explore how <span className="font-picabord">PICABORD</span> can transform your business? 
              Get in touch with our team of experts today.
            </p>
          </div>

          <div 
            ref={formAnimation.ref as React.RefObject<HTMLDivElement>}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <Card 
              className={`p-8 hover-elevate transition-all duration-700 ${
                formAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
            >
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
                        onFocus={() => handleFieldFocus('name')}
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
                        onFocus={() => handleFieldFocus('email')}
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
                      onFocus={() => handleFieldFocus('company')}
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
                      onFocus={() => handleFieldFocus('subject')}
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
                      onFocus={() => handleFieldFocus('message')}
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
            <div 
              className={`space-y-6 transition-all duration-700 delay-200 ${
                formAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
            >
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate"
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
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

          {/* Custom Software CTA */}
          <div 
            ref={ctaAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`mt-16 transition-all duration-700 ${
              ctaAnimation.isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
          >
            <Card className="p-8 sm:p-12 bg-gradient-to-br from-chart-1/10 via-primary/5 to-chart-2/10 border-primary/20 hover-elevate relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-chart-1/20 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-chart-2/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-200" />
              
              <CardContent className="p-0 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-chart-1 to-primary rounded-2xl mx-auto flex items-center justify-center animate-bounce-slow">
                    <Send className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    Want Custom Software for Your Company?
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    We build tailored software solutions that perfectly fit your business needs. 
                    From concept to deployment, we're with you every step of the way.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-chart-1 to-primary text-primary-foreground px-8 sm:px-12 min-h-[44px] hover-elevate focus-visible-ring"
                    onClick={() => {
                      // Track CTA button click
                      trackEvent('cta_button_click', {
                        button_text: 'Reach Out to Us',
                        location: 'custom_software_cta',
                        page: '/contact'
                      });
                      // Scroll to form
                      const form = document.querySelector('form');
                      form?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    Reach Out to Us
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