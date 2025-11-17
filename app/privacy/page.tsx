'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Cookie, Database, UserCheck, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function PrivacyPolicyPage() {
  const contentAnimation = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/50 to-muted/10">
      {/* Header */}
      <section className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 hover-elevate"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center space-y-6 mb-12 animate-fade-in-up">
            <Badge variant="outline" className="border-primary/30 text-primary font-picabord">
              Privacy Policy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Your{" "}
              <span className="text-primary">
                Privacy Matters
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are committed to protecting your privacy and being transparent about how we collect, use, and protect your data.
            </p>
            <p className="text-sm text-muted-foreground">
              Last Updated: November 5, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Introduction */}
          <Card 
            ref={contentAnimation.ref as React.RefObject<HTMLDivElement>}
            className={`p-8 transition-all duration-700 ${
              contentAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Introduction</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                PICABORD ("we", "our", or "us") operates the website picabord.space (the "Website"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Website.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using our Website, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Website.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Contact us through our contact form (name, email address, message content)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Subscribe to our newsletter or blog updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Participate in surveys or provide feedback</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    When you visit our Website, we may automatically collect certain information about your device and browsing behavior, including:
                  </p>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>IP address (anonymized)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Browser type and version</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Operating system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Pages visited and time spent on pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Referring website addresses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Device type and screen resolution</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Respond to inquiries:</span> To answer your questions and provide customer support
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Improve our Website:</span> To understand how visitors use our Website and optimize user experience
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Analytics:</span> To analyze website traffic, user behavior, and content performance
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Send communications:</span> To send newsletters, updates, and marketing materials (with your consent)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Comply with legal obligations:</span> To meet regulatory requirements and protect our legal rights
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Cookies and Tracking Technologies</h2>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our Website. Cookies are small text files stored on your device that help us:
              </p>
              
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Remember your preferences and settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Understand how you use our Website</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Improve Website performance and functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Analyze traffic and user behavior</span>
                </li>
              </ul>

              <div className="bg-muted/50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-2">Types of Cookies We Use</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">Essential Cookies</p>
                    <p className="text-muted-foreground">Required for the Website to function properly. These cannot be disabled.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Analytics Cookies</p>
                    <p className="text-muted-foreground">Help us understand how visitors interact with our Website. These require your consent.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Preference Cookies</p>
                    <p className="text-muted-foreground">Remember your settings and preferences (e.g., theme selection).</p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                You can control cookie preferences through our cookie consent banner or by adjusting your browser settings. Note that disabling certain cookies may affect Website functionality.
              </p>

              <div className="pt-2">
                <Link href={"/privacy-settings" as any}>
                  <Button variant="outline" className="hover-elevate">
                    Manage Cookie Preferences
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
              
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party services to help us operate our Website and provide better services. These services may collect information as described in their own privacy policies:
              </p>
              
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Analytics Services:</span> We use privacy-focused analytics to understand website usage without tracking individual users
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Hosting Services:</span> Our Website is hosted on secure servers that may process your data
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-foreground">Email Services:</span> We use email service providers to send communications
                  </div>
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                We ensure that all third-party services we use comply with applicable data protection regulations and maintain appropriate security measures.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights (GDPR) */}
          <Card className="p-8 border-primary/20">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Your Rights Under GDPR</h2>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR):
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Access</h3>
                  <p className="text-sm text-muted-foreground">You have the right to request copies of your personal data.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Rectification</h3>
                  <p className="text-sm text-muted-foreground">You have the right to request correction of inaccurate or incomplete data.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Erasure</h3>
                  <p className="text-sm text-muted-foreground">You have the right to request deletion of your personal data under certain conditions.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Restrict Processing</h3>
                  <p className="text-sm text-muted-foreground">You have the right to request that we restrict the processing of your data under certain conditions.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Data Portability</h3>
                  <p className="text-sm text-muted-foreground">You have the right to request transfer of your data to another organization or directly to you.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Object</h3>
                  <p className="text-sm text-muted-foreground">You have the right to object to our processing of your personal data under certain conditions.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Right to Withdraw Consent</h3>
                  <p className="text-sm text-muted-foreground">You have the right to withdraw your consent at any time where we relied on consent to process your data.</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed pt-2">
                To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-bold">Data Security</h2>
              
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Encryption of data in transit using SSL/TLS</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Secure hosting infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Regular security assessments and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Access controls and authentication</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Data minimization practices</span>
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-bold">Data Retention</h2>
              
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Typical retention periods include:
              </p>
              
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Contact form submissions: 2 years from last contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Analytics data: 26 months (anonymized)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Cookie consent preferences: Until withdrawn or 12 months of inactivity</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-bold">Children's Privacy</h2>
              
              <p className="text-muted-foreground leading-relaxed">
                Our Website is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.
              </p>
            </CardContent>
          </Card>

          {/* International Data Transfers */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-bold">International Data Transfers</h2>
              
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                When we transfer your data internationally, we ensure appropriate safeguards are in place, such as:
              </p>
              
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Standard contractual clauses approved by the European Commission</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Adequacy decisions by relevant authorities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Binding corporate rules</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
              
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by:
              </p>
              
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Posting the updated policy on this page with a new "Last Updated" date</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Sending you an email notification (if you have provided your email address)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Displaying a prominent notice on our Website</span>
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="p-8 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:privacy@picabord.space" className="text-primary hover:underline">
                      privacy@picabord.space
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">General Inquiries</p>
                    <a href="mailto:connect@picabord.space" className="text-primary hover:underline">
                      connect@picabord.space
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground pt-4">
                We will respond to your inquiry within 30 days. For urgent privacy matters, please indicate "URGENT" in your email subject line.
              </p>

              <div className="pt-4">
                <Link href={"/contact" as any}>
                  <Button className="hover-elevate">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}
