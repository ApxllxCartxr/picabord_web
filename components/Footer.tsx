import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const divisions = [
    { name: "Hardware (PIKA)", href: "/pika" },
    { name: "Software (TEC)", href: "/tec" }
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Privacy Settings", href: "/privacy-settings" }
  ];

  const support = [
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4 font-picabord">
                PICABORD
              </h3>
              <p className="text-muted-foreground text-sm">
                Leading the future of technology through innovative solutions 
                that transform industries worldwide.
              </p>
            </div>
            
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {divisions.map((division, index) => (
                <li key={index}>
                  <Link href={division.href as any}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-${division.name.toLowerCase()}`}
                    >
                      {division.name}
                    </Button>
                  </Link>
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
                  <Link href={item.href as any}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 mb-6">
              {support.map((item, index) => (
                <li key={index}>
                  <Link href={item.href as any}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <a href="mailto:connect@picabord.space" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>connect@picabord.space</span>
              </a>
              <a href="tel:+919344938549" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 93449 38549</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Chennai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © 2025 <span className="font-picabord">PICABORD</span>. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="link-linkedin"
                  className="hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="link-twitter"
                  className="hover:text-primary transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="link-github"
                  className="hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}