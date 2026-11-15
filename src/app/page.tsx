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
        smooth={3}
        blend="normal"
        seed={12}
        className="home-scribble"
        routeThroughTargets={false}
        proceduralSectionSelector=".home-tone"
        heroWaypoints={[
          [6, 3],
          [6.5, 9],
          [8, 17],
          [11, 24],
          [16, 29],
          [23, 33],
          [31, 36],
          [33, 39],
          [31, 42],
          [26, 45],
          [19, 48],
          [11, 51],
          [4, 54],
          [2, 58],
          [3, 60],
          [9, 60],
          [25, 60],
          [47, 60],
          [68, 60],
          [78, 61],
          [82, 63],
          [80, 66],
          [75, 68],
          [71, 68],
          [69, 65],
          [71, 62],
          [76, 61],
          [80, 64],
          [80, 68],
          [77, 72],
          [73, 75],
          [72, 87],
        ]}
      >
        <HomeScrollTypography />

        {/* Hero Section */}
        <div className="home-tone home-tone-hero home-tone-dark">
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
