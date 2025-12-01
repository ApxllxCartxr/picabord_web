'use client'

import Hero from "@/components/Hero";
import CascadingText from "@/components/CascadingText";

export default function HomePage() {
  const scrollToMission = () => {
    const missionSection = document.getElementById('mission-section');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <Hero onLearnMore={scrollToMission} onWatchDemo={() => { }} />

      {/* Mission Section */}
      <section id="mission-section" className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <CascadingText
            text="Who We Are"
            font="inter"
            fontSize="responsive"
          />
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto text-justify">
            We are a technology company that bridges the digital and physical worlds through innovative software and hardware solutions, creating comprehensive ecosystems that transform industries and empower businesses to achieve extraordinary outcomes.
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <CascadingText
              text="Solutions"
              font="inter"
              fontSize="responsive"
              className="text-center"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Hardware Column */}
            <a
              href="/pika"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).plausible) {
                  (window as any).plausible('product_link_click', {
                    props: {
                      product: 'PIKA',
                      location: 'solutions_section',
                      page: '/'
                    }
                  });
                }
              }}
              className="group relative overflow-hidden rounded-2xl border border-border/30 p-12 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                    Hardware
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
                  Cutting-edge embedded systems and single-board computers that power the next generation of IoT, edge computing, and industrial applications.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Explore Hardware</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-chart-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>

            {/* Software Column */}
            <a
              href="/tec"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).plausible) {
                  (window as any).plausible('product_link_click', {
                    props: {
                      product: 'TEC',
                      location: 'solutions_section',
                      page: '/'
                    }
                  });
                }
              }}
              className="group relative overflow-hidden rounded-2xl border border-border/30 p-12 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                    Software
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
                  Enterprise applications, cloud platforms, and innovative software products that transform how businesses operate and scale in the digital age.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Explore Software</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Looking to{" "}
              <span className="text-primary">Collaborate?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Reach out to us and let's build something extraordinary together
            </p>
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-chart-1 via-primary to-chart-2 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <a 
                href="mailto:connect@picabord.space"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).plausible) {
                    (window as any).plausible('cta_button_click', {
                      props: {
                        button_text: 'Contact Us',
                        location: 'collaboration_cta',
                        page: '/'
                      }
                    });
                  }
                }}
              >
                <button className="relative bg-gradient-to-r from-chart-1 via-primary to-chart-2 hover:bg-[#05060b] text-white hover:text-primary font-semibold px-12 py-6 text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl min-h-[56px] border-2 border-white/20 group-hover:border-primary/40">
                  <span className="relative z-10 transition-colors duration-500">
                    Contact Us
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}