import { HeroSection } from "@/components/hero-section";
import { ChapterCard } from "@/components/chapter-card";
import { GlassContainer } from "@/components/glass-container";
import { GradientBg } from "@/components/gradient-bg";

export default function HomePage() {
  // All 5 chapters now displayed
  const chapters = [
    {
      title: "Chapter 1: Introduction to AI-Native Development",
      description: "Learn the fundamentals of building AI-native applications",
      order: 1,
    },
    {
      title: "Chapter 2: Core Concepts",
      description: "Understand the key principles and patterns",
      order: 2,
    },
    {
      title: "Chapter 3: Implementation Strategies",
      description: "Practical approaches to building AI-native apps",
      order: 3,
    },
    {
      title: "Chapter 4: Advanced Patterns",
      description: "Production-ready techniques for AI applications",
      order: 4,
    },
    {
      title: "Chapter 5: Future Directions",
      description: "Emerging trends and preparing for what's next",
      order: 5,
    },
  ];

  return (
    <>
      <GradientBg />
      <main className="min-h-screen">
        <HeroSection
          title="AI-Native Driven Development"
          description="Master the art of building AI-native applications from the ground up"
          ctaText="Start Reading"
          ctaHref="/book"
        />

        <section className="container mx-auto px-4 py-20">
          <GlassContainer>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                  <ChapterCard
                    key={chapter.order}
                    chapter={chapter}
                    href="/book"
                  />
                ))}
              </div>
            </div>
          </GlassContainer>
        </section>
      </main>
    </>
  );
}
