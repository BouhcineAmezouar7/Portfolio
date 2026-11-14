import HeroSection from "@/components/HomePage/HeroSection";
import AboutPreview from "@/components/HomePage/AboutPreview";
import SkillsShowcase from "@/components/HomePage/SkillsShowcase";
import ProjectsSection from "@/components/HomePage/ProjectsSection";
import ExperienceTimeline from "@/components/HomePage/ExperienceTimeline";
import CTASection from "@/components/HomePage/CTASection";
import HomeScrollTypography from "@/components/HomePage/HomeScrollTypography";
import ScrollScribblePath from "@/components/mfa/ScrollScribblePath";

export default function Home() {
  return (
    <main>
      <ScrollScribblePath
        colors={["#ff3b1f"]}
        backgrounds={["transparent"]}
        width={2.5}
        trail={0}
        loops={0.22}
        wander={0.8}
        untangle={false}
        smooth={0.8}
        blend="normal"
        seed={12}
        className="home-scribble"
      >
        <HomeScrollTypography />

        {/* Hero Section */}
        <div className="home-tone home-tone-dark">
          <HeroSection />
        </div>

        {/* About Preview */}
        <div className="home-tone home-tone-light">
          <AboutPreview />
        </div>

        {/* Skills Showcase */}
        <div className="home-tone home-tone-dark">
          <SkillsShowcase />
        </div>

        {/* Featured Projects */}
        <div className="home-tone home-tone-light">
          <ProjectsSection />
        </div>

        {/* Experience Timeline */}
        <div className="home-tone home-tone-dark">
          <ExperienceTimeline />
        </div>

        {/* CTA Section */}
        <div className="home-tone home-tone-light">
          <CTASection />
        </div>
      </ScrollScribblePath>
    </main>
  );
}
