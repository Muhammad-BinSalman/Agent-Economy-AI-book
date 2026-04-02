import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Linkedin, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const metadata: Metadata = {
  title: "About | The AI Agent Economy",
  description:
    "Learn what this book is, why it matters, and how it helps you build AI-native, agentic, spec-driven applications.",
};

const highlights = [
  {
    title: "Agentic AI, explained like an engineer",
    description:
      "Move from chatbots to agents: control loops, tool-use, memory, verification, and real-world reliability constraints.",
    icon: Sparkles,
  },
  {
    title: "Digital FTEs and the agent economy",
    description:
      "A practical model for deploying ‘digital full-time equivalents’ with governance, metrics, and safe escalation paths.",
    icon: Users,
  },
  {
    title: "Spec-driven full-stack building",
    description:
      "Turn specs into shipping software: contracts, tasks, evaluations, observability, and iterative delivery with AI assistance.",
    icon: Target,
  },
  {
    title: "Safety and verification as first-class",
    description:
      "Learn guardrails for tool-using systems: permissions, audit trails, prompt-injection defenses, and outcome verification.",
    icon: ShieldCheck,
  },
];

const outcomes = [
  {
    title: "Design the agent control loop",
    description:
      "Perception → memory → planning → tool execution → feedback, plus failure recovery and cost controls.",
  },
  {
    title: "Build production-grade RAG + tools",
    description:
      "Grounding, retrieval, tool contracts, and safe integrations that your team can debug and trust.",
  },
  {
    title: "Ship a full-stack AI app",
    description:
      "From backend APIs to UX flows, with evaluation harnesses and operational checklists.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 pt-28 pb-20">
        {/* Hero */}
        <section className="max-w-[1600px] mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>About the book</span>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
            The AI Agent Economy
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
            This book is a practical guide to building AI-native applications in the era of
            agentic systems—where software doesn’t just respond, it plans, uses tools, verifies
            outcomes, and scales into reliable digital work.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors"
            >
              Start reading
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/Muhammad-BinSalman/Agent-Economy-AI-book"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold text-foreground hover:bg-accent transition-colors"
            >
              View repository
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Highlights */}
        <section className="max-w-[1600px] mx-auto mt-16">
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl border bg-background p-3">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Outcomes */}
        <section className="max-w-[1600px] mx-auto mt-16">
          <div className="rounded-3xl border bg-gradient-to-br from-red-600/10 via-background to-background p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              What you’ll be able to do after this book
            </h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              The goal is not to memorize frameworks. The goal is to build systems that behave
              predictably in the real world—under latency, cost, security, and governance constraints.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {outcomes.map((o) => (
                <div key={o.title} className="rounded-2xl border bg-card/60 p-6">
                  <h3 className="font-bold">{o.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {o.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="max-w-[1600px] mx-auto mt-16">
          <div className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  About the author
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The author of this book is an AI enthusiast and a Full Stack AI Native Developer named
                  <Link href="https://www.linkedin.com/in/muhammadbinsalman-yammani/" target="_blank">
                    <HoverCard openDelay={10} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <span className="font-bold text-foreground underline"> Muhammad Bin Salman</span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 rounded-xl p-3 py-4">
                        <div className="flex gap-3">
                          <div className="shrink-0">
                            <div className="h-full w-16 rounded-xl overflow-hidden border bg-muted">
                              <Image
                                src="/author/me1.png"
                                alt="Muhammad Bin Salman"
                                width={100}
                                height={100}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold leading-tight flex items-center justify-start gap-2">
                              Muhammad Bin Salman <Linkedin className="h-3 w-3"/>
                            </div>
                            <div className="text-sm text-muted-foreground leading-snug mt-1">
                              AI enthusiast and Full Stack AI-Native Developer
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </Link>.

                  The focus is pragmatic: explain agentic AI as an engineering discipline—architecture,
                  evaluation, safety, and shipping full-stack applications—so you can build digital workers
                  your team can trust.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  If you’re using this book in public, in a team, or in a classroom: treat it as a living
                  artifact. Improve it, challenge it, and contribute examples from your own projects.
                </p>
              </div>

              <div className="w-full md:w-[360px] rounded-2xl border bg-background p-6">
                <div className="text-sm text-muted-foreground">Project</div>
                <div className="mt-1 text-lg font-bold">AI Agent Economy</div>

                <div className="mt-6 grid gap-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white px-4 py-2.5 font-bold hover:bg-red-700 transition-colors"
                  >
                    Read the book
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://github.com/Muhammad-BinSalman/Agent-Economy-AI-book"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 font-semibold hover:bg-accent transition-colors"
                  >
                    Contribute on GitHub
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
