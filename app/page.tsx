import { HeroSection } from "@/components/landing/hero-section";
import ModernEraSection from "@/components/landing/modern-era-section";
import AgentVisualization from "@/components/ui/agent-visualization";
import { OrbitingAvatarsCTA } from "@/components/ui/community-contribution";
import { HeroWithMarquee } from "@/components/ui/cta-with-marquee";
import Features from "@/components/ui/features";
import FTEComparison from "@/components/ui/fte-comparison";
import RadialOrbitalTimeline from "@/components/ui/radical-orbital-timeline";
import SecondQuote from "@/components/ui/second-quote";

const avatars = [
  { src: 'https://i.pravatar.cc/150?img=11', alt: 'Contributor 1' },
  { src: 'https://i.pravatar.cc/150?img=12', alt: 'Contributor 2' },
  { src: 'https://i.pravatar.cc/150?img=32', alt: 'Contributor 3' },
  { src: 'https://i.pravatar.cc/150?img=35', alt: 'Contributor 4' },
  { src: 'https://i.pravatar.cc/150?img=44', alt: 'Contributor 5' },
  { src: 'https://i.pravatar.cc/150?img=53', alt: 'Contributor 6' },
  { src: 'https://i.pravatar.cc/150?img=59', alt: 'Contributor 7' },
  { src: 'https://i.pravatar.cc/150?img=68', alt: 'Contributor 8' },
]

export default function HomePage() {
  const coverImageUrl = "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=800";
  return (
    <>
      <main className="min-h-screen">
        <HeroSection
          heading="Building the AI Agent Economy"
          tagline="A practical, AI-native e-book on Agentic AI, custom agents, CLI agents, and Digital AI Full-Time Equivalents (FTEs)."
          supportingText="Learn how to design, build, and deploy autonomous AI agents that turn knowledge into scalable digital workers."
          buttonText="Start Reading"
          secondaryButtonText="View on GitHub"
          bookTitle="The AI Agent Economy"
          coverImageUrl={coverImageUrl}
        />

        <Features />
        <ModernEraSection />
        <AgentVisualization />
        <RadialOrbitalTimeline />
        <FTEComparison />
        <OrbitingAvatarsCTA
          title="Co-Architect the Future"
          description="The AI Agent Economy is a living, open-source publication. We invite researchers, engineers, and architects to contribute their blueprints and push the boundaries of autonomous labor."
          buttonText="Join the Repository"
          buttonHref="https://github.com/Muhammad-BinSalman/Agent-Economy-AI-book"
          buttonTarget="_blank"
          avatars={avatars}
          orbitRadius={24}
          orbitDuration={60}
        />
        <HeroWithMarquee />
        <SecondQuote />
      </main>
    </>
  );
}
