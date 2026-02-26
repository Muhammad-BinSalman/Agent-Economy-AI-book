import type { Metadata } from "next";
import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import {
  ArrowUpRight,
  Code,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Agents | The AI Agent Economy",
  description:
    "A curated snapshot of the most capable AI agents available today — coding agents, CLI agents, and research copilots.",
};

type AgentCategory = "Coding" | "CLI" | "Research" | "Multimodal" | "Automation";

type AgentItem = {
  name: string;
  company: string;
  category: AgentCategory;
  blurb: string;
  bestFor: string[];
  link: string;
  note?: string;
};

const agents: AgentItem[] = [
  {
    name: "OpenAI Codex (Agent)",
    company: "OpenAI",
    category: "Coding",
    blurb:
      "An agentic coding system designed to take multi-step tasks, edit code, run tools, and iterate toward a working result.",
    bestFor: ["repo-level refactors", "bug fixing", "task execution"],
    link: "https://openai.com/",
    note: "Access method depends on current OpenAI product surface.",
  },
  {
    name: "Claude Code (CLI)",
    company: "Anthropic",
    category: "CLI",
    blurb:
      "A developer-first, terminal-native agent for working in real repositories with fast iteration loops and strong instruction following.",
    bestFor: ["CLI-first workflows", "large codebases", "pair-programming"],
    link: "https://www.anthropic.com/",
  },
  {
    name: "Gemini 2.0 Flash",
    company: "Google",
    category: "Multimodal",
    blurb:
      "A fast, multimodal model often used as the core brain for responsive, tool-using agents that need low latency.",
    bestFor: ["low-latency agents", "multimodal inputs", "high-throughput"],
    link: "https://deepmind.google/technologies/gemini/",
  },
  {
    name: "Cursor (Agent Mode)",
    company: "Cursor",
    category: "Coding",
    blurb:
      "IDE-native agent workflows for planning, editing, and applying changes across a project with strong developer ergonomics.",
    bestFor: ["IDE workflows", "project-wide changes", "guided code edits"],
    link: "https://www.cursor.com/",
  },
  {
    name: "GitHub Copilot (Agent / Workspace)",
    company: "GitHub",
    category: "Coding",
    blurb:
      "Integrated coding assistant evolving toward agentic task execution across issues, files, and workflows.",
    bestFor: ["day-to-day coding", "PR assistance", "quick iteration"],
    link: "https://github.com/features/copilot",
  },
  {
    name: "Devin",
    company: "Cognition",
    category: "Automation",
    blurb:
      "Autonomous software engineering agent focused on end-to-end task completion: planning, coding, running, and verifying.",
    bestFor: ["end-to-end tickets", "automation", "full task ownership"],
    link: "https://www.cognition.ai/",
  },
  {
    name: "Replit Agent",
    company: "Replit",
    category: "Automation",
    blurb:
      "An agent designed to create and modify apps end-to-end in a hosted environment with rapid preview loops.",
    bestFor: ["prototyping", "deployable demos", "quick scaffolds"],
    link: "https://replit.com/",
  },
  {
    name: "Perplexity (Research)",
    company: "Perplexity",
    category: "Research",
    blurb:
      "A research-forward assistant that emphasizes source-backed answers and quick synthesis across the web.",
    bestFor: ["web research", "summaries with sources", "competitive scans"],
    link: "https://www.perplexity.ai/",
  },
  {
    name: "Microsoft Copilot Studio / Agents",
    company: "Microsoft",
    category: "Automation",
    blurb:
      "Enterprise-focused agent building and orchestration for business processes with integrations and governance.",
    bestFor: ["enterprise workflows", "integrations", "governed automation"],
    link: "https://www.microsoft.com/en-us/microsoft-copilot",
  },
];

const categoryOrder: AgentCategory[] = [
  "Coding",
  "CLI",
  "Multimodal",
  "Research",
  "Automation",
];

const categoryMeta: Record<AgentCategory, { icon: ElementType; tone: string }> = {
  Coding: { icon: Code, tone: "from-red-600/15 via-background to-background" },
  CLI: { icon: Terminal, tone: "from-zinc-900/10 via-background to-background" },
  Multimodal: { icon: Sparkles, tone: "from-primary/15 via-background to-background" },
  Research: { icon: Globe, tone: "from-emerald-600/10 via-background to-background" },
  Automation: { icon: Layers, tone: "from-blue-600/10 via-background to-background" },
};

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-red-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-muted/40 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-tl from-red-500/10 via-primary/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 mt-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md text-sm text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              A living directory of top-tier agents
            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-primary to-zinc-900">
              The Most Advanced AI Agents Right Now
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This page highlights widely-used, cutting-edge agent experiences across coding, CLI,
              research, multimodal, and enterprise automation. It’s intentionally curated (not
              exhaustive) and can evolve as the ecosystem moves.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Pill>
                <Zap className="w-3.5 h-3.5 mr-2" />
                Fast iteration loops
              </Pill>
              <Pill>
                <Cpu className="w-3.5 h-3.5 mr-2" />
                Tool-using systems
              </Pill>
              <Pill>
                <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                Real-world guardrails
              </Pill>
            </div>
          </div>

          <div className="space-y-10">
            {categoryOrder.map((category) => {
              const items = agents.filter((a) => a.category === category);
              if (items.length === 0) return null;

              const meta = categoryMeta[category];
              const Icon = meta.icon;

              return (
                <section key={category} className="space-y-4">
                  <div className={`rounded-3xl border bg-gradient-to-br ${meta.tone} p-6 md:p-8`}>
                    <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row">
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 backdrop-blur px-3 py-1 text-xs font-semibold text-muted-foreground">
                          <Icon className="w-3.5 h-3.5 text-red-600" />
                          {category}
                        </div>
                        <h2 className="mt-4 text-2xl md:text-3xl font-black tracking-tight">
                          {category} agents
                        </h2>
                        <p className="mt-2 text-muted-foreground max-w-2xl">
                          Curated picks for {category.toLowerCase()}-heavy workflows.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      {items.map((a) => (
                        <div
                          key={a.name}
                          className="rounded-2xl border bg-background/60 backdrop-blur-sm p-6 shadow-sm ring-1 ring-border/50 hover:ring-primary/20 transition"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-xs text-muted-foreground">{a.company}</div>
                              <h3 className="mt-1 text-lg font-bold leading-tight">
                                {a.name}
                              </h3>
                            </div>

                            <Link
                              href={a.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 inline-flex items-center justify-center rounded-full border bg-background/50 backdrop-blur px-3 py-1 text-xs font-semibold hover:bg-muted/40 transition-colors"
                            >
                              Official
                              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                            </Link>
                          </div>

                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                            {a.blurb}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {a.bestFor.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center rounded-full border bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {a.note ? (
                            <div className="mt-4 rounded-xl border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                              {a.note}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-14 rounded-3xl border bg-card/50 backdrop-blur-sm p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Want this list expanded?</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              Tell me which ecosystem you care about (open-source agents, enterprise, IDEs, voice,
              robotics, browser agents) and I’ll extend this page with more entries and better
              filtering.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
