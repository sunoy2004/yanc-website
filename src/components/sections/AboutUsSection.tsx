import { aboutUsContent } from "@/data/mockData";
import { Eye, Target } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  target: Target,
};

const AboutUsSection = () => {
  const { headline, description, vision, mission } = aboutUsContent;

  return (
    <section id="about-us" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - About Us Text */}
          <ScrollAnimateWrapper delay={0}>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {headline}
              </h2>
              
              {/* Divider line */}
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              
              {/* Description paragraph */}
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </ScrollAnimateWrapper>

          {/* Right Column - Vision and Mission Cards */}
          <div className="space-y-4">
            {/* Vision Card */}
            <ScrollAnimateWrapper delay={150}>
              <div className="about-us-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="about-us-icon-container">
                    {(() => {
                      const IconComponent = iconMap[vision.icon] || Eye;
                      return <IconComponent size={24} />;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground capitalize">
                    {vision.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {vision.description}
                  </p>
                </div>
              </div>
            </ScrollAnimateWrapper>

            {/* Mission Card */}
            <ScrollAnimateWrapper delay={300}>
              <div className="about-us-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="about-us-icon-container">
                    {(() => {
                      const IconComponent = iconMap[mission.icon] || Target;
                      return <IconComponent size={24} />;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground capitalize">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              </div>
            </ScrollAnimateWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;