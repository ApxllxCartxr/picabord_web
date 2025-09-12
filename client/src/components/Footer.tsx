import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Newsletter subscription: ${email}`);
    setEmail("");
  };

  const handleSocialClick = (platform: string) => {
    console.log(`${platform} clicked`);
  };

  const divisions = [
    { name: "TEC", href: "#tec" },
    { name: "ArcLight", href: "#arclight" },
    { name: "Deeptech", href: "#deeptech" },
    { name: "AnnotiQ", href: "#annotiq" }
  ];

  const company = [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "News", href: "#news" },
    { name: "Investors", href: "#investors" }
  ];

  const support = [
    { name: "Contact", href: "#contact" },
    { name: "Documentation", href: "#docs" },
    { name: "Support Center", href: "#support" },
    { name: "Privacy Policy", href: "#privacy" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 bg-clip-text text-transparent mb-4">
                PICABORD
              </h3>
              <p className="text-muted-foreground text-sm">
                Leading the future of technology through innovative solutions 
                that transform industries worldwide.
              </p>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-newsletter"
                  className="bg-background"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-chart-1 to-primary"
                  data-testid="button-subscribe"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-semibold mb-4">Divisions</h4>
            <ul className="space-y-2">
              {divisions.map((division, index) => (
                <li key={index}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => console.log(`Navigate to ${division.name}`)}
                    data-testid={`link-${division.name.toLowerCase()}`}
                  >
                    {division.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => console.log(`Navigate to ${item.name}`)}
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {support.map((item, index) => (
                <li key={index}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => console.log(`Navigate to ${item.name}`)}
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@picabord.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                © 2025 PICABORD. All rights reserved.
              </p>
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                Made with Aurora
              </Badge>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("LinkedIn")}
                data-testid="link-linkedin"
                className="hover-elevate"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("Twitter")}
                data-testid="link-twitter"
                className="hover-elevate"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick("GitHub")}
                data-testid="link-github"
                className="hover-elevate"
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}