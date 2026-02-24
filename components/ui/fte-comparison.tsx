
import { Check, Zap, Users, Clock, DollarSign, TrendingUp, BookOpen, Repeat, Cloud, Cpu } from 'lucide-react';
import { Badge } from './badge';
import Link from 'next/link';

const ComparisonRow = ({
  attribute,
  humanValue,
  digitalValue,
  icon: Icon
}: {
  attribute: string;
  humanValue: string;
  digitalValue: string;
  icon: any
}) => (
  <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-100 last:border-0 group">
    <div className="md:col-span-4 py-6 pr-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-red-600 transition-colors">
        <Icon size={16} />
      </div>
      <span className="text-sm font-bold font-outfit uppercase tracking-tight text-zinc-500 group-hover:text-zinc-900 transition-colors">
        {attribute}
      </span>
    </div>
    <div className="md:col-span-4 py-6 px-4 bg-white md:bg-transparent">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase md:hidden mb-1">Human FTE</span>
        <p className="text-sm text-zinc-600 leading-relaxed">{humanValue}</p>
      </div>
    </div>
    <div className="md:col-span-4 py-6 pl-4 bg-red-50/30 md:bg-red-50/20 group-hover:bg-red-50/40 transition-colors border-l border-red-100/50">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold text-red-300 uppercase md:hidden mb-1">Digital FTE</span>
        <p className="text-sm text-zinc-900 font-medium leading-relaxed flex items-start gap-2">
          <Check size={14} className="text-red-600 mt-1 shrink-0" />
          {digitalValue}
        </p>
      </div>
    </div>
  </div>
);

const FTEComparison = () => {
  const data = [
    {
      attribute: "Working Hours",
      humanValue: "Standard ~40 hours/week. Requires rest and vacation.",
      digitalValue: "Continuous 168 hours/week. 24/7 autonomous operation.",
      icon: Clock
    },
    {
      attribute: "Cost Structure",
      humanValue: "Fixed high overhead (Salary, benefits, taxes, equipment).",
      digitalValue: "Elastic usage-based cost. Only pay for compute cycles used.",
      icon: DollarSign
    },
    {
      attribute: "Scalability",
      humanValue: "Linear. Months of recruitment, interviewing, and onboarding.",
      digitalValue: "Instant. Spin up 100 parallel instances in seconds.",
      icon: TrendingUp
    },
    {
      attribute: "Onboarding",
      humanValue: "Learning curve of weeks to months to reach full productivity.",
      digitalValue: "Zero ramp-up. Deploy proven architectural blueprints instantly.",
      icon: BookOpen
    },
    {
      attribute: "Consistency",
      humanValue: "Variable performance affected by fatigue, bias, and context.",
      digitalValue: "Deterministic. Precise execution of reasoning loops every time.",
      icon: Repeat
    },
    {
      attribute: "Retention",
      humanValue: "Knowledge is individual. Lost when employee leaves.",
      digitalValue: "Centralized persistence. Memory is institutional and eternal.",
      icon: Cpu
    },
    {
      attribute: "Deployment",
      humanValue: "Physical/Remote. Limited by geographic and legal boundaries.",
      digitalValue: "Cloud-native. Lives wherever your infrastructure resides.",
      icon: Cloud
    },
    {
      attribute: "Primary Focus",
      humanValue: "Creative, empathetic, and strategic high-level vision.",
      digitalValue: "Complex operational tasks and high-volume cognitive work.",
      icon: Zap
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-zinc-100 text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
            Comparison Matrix
          </Badge>
          <h2 className="text-4xl sm:text-6xl font-black font-outfit uppercase leading-[0.9] tracking-tighter mb-6 text-zinc-900">
            Human FTE vs <br />
            <span className="text-red-600 italic">Digital FTE.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Transitioning from human labor to autonomous digital workers isn't just about automation—it's about a fundamental shift in the architecture of your workforce.
          </p>
        </div>

        <div className="relative">
          {/* Table Headers */}
          <div className="hidden md:grid grid-cols-12 border-b-2 border-zinc-900 pb-4 mb-2">
            <div className="col-span-4 text-xs font-mono font-black uppercase tracking-[0.2em] text-zinc-400">Attribute</div>
            <div className="col-span-4 text-xs font-mono font-black uppercase tracking-[0.2em] text-zinc-900 px-4 flex items-center gap-2">
              <Users size={12} /> Human FTE
            </div>
            <div className="col-span-4 text-xs font-mono font-black uppercase tracking-[0.2em] text-red-600 pl-4 flex items-center gap-2">
              <Zap size={12} /> Digital FTE
            </div>
          </div>

          {/* Table Content */}
          <div className="rounded-2xl border border-zinc-100 md:border-0 overflow-hidden shadow-sm md:shadow-none">
            {data.map((row, index) => (
              <ComparisonRow key={index} {...row} />
            ))}
          </div>

          {/* Footnote */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0">
                <BookOpen size={18} />
              </div>
              <p className="text-sm font-medium text-zinc-800 leading-snug">
                Learn the technical blueprints for building Digital FTEs in <span className="text-red-600 font-bold">Chapter 08: The Multi-Agent Organization.</span>
              </p>
            </div>
            <Link href="/chapter-08">
              <button className="whitespace-nowrap h-10 px-6 rounded-full bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                Start Reading
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative BG element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/[0.01] blur-[100px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default FTEComparison;