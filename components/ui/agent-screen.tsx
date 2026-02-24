'use client'
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MESSAGES = [
  "Initialising agent context...",
  "Target: Automated CLI Researcher",
  "Blueprint: ReAct Planning Loop",
  "Drafting agentic architecture...",
  "Generating Python runtime..."
];

const CODE_SNIPPET = `from agent_core import Agent

# Define Agentic FTE
agent = Agent(
  name="FTE-01",
  role="Researcher"
)

async def main():
    # Autonomous loop
    plan = await agent.plan("Task: Scrape Trends")
    for task in plan:
        res = await agent.run(task)
        print(f"Status: {res.id}")
    
    await agent.report()

if __name__ == "__main__":
    main()
`;

export const AgentScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [codeText, setCodeText] = useState("");
  const [isTypingCode, setIsTypingCode] = useState(false);

  useEffect(() => {
    if (msgIndex < MESSAGES.length) {
      const timer = setTimeout(() => {
        setMsgIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTypingCode(true);
    }
  }, [msgIndex]);

  useEffect(() => {
    if (isTypingCode) {
      let currentPos = 0;
      const interval = setInterval(() => {
        if (currentPos < CODE_SNIPPET.length) {
          setCodeText(CODE_SNIPPET.slice(0, currentPos + 1));
          currentPos++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setCodeText("");
            setMsgIndex(0);
            setIsTypingCode(false);
          }, 4000);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [isTypingCode]);

  return (
    <div className="w-full h-full flex flex-col sm:flex-row bg-[#0d1117] text-zinc-300 font-mono text-[10px] sm:text-xs overflow-hidden">
      {/* Sidebar / Terminal Activity - DARK MODE */}
      <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-[#21262d] p-4 space-y-3 bg-[#161b22]">
        <div className="flex gap-1.5 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
        </div>
        <div className="space-y-4">
          {MESSAGES.slice(0, msgIndex).map((msg, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-cyan-500/60 mr-2 font-bold">❯</span>
              <span className={i === msgIndex - 1 ? "text-emerald-400" : "text-zinc-400"}>{msg}</span>
            </div>
          ))}
          {msgIndex < MESSAGES.length && (
            <div className="flex items-center">
              <span className="text-cyan-500/60 mr-2 font-bold">❯</span>
              <div className="w-1.5 h-3 bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
          )}
        </div>
      </div>

      {/* Code Editor Panel - DARK MODE */}
      <div className="flex-grow flex flex-col bg-[#0d1117]">
        {/* Editor Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-[#161b22] border-b border-[#21262d]">
          <div className="text-[9px] uppercase tracking-widest text-cyan-400/70 font-bold font-sans">agent_main.py</div>
          <div className="flex gap-2 opacity-60">
            <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
          </div>
        </div>

        <div className="p-4 relative overflow-y-auto custom-scrollbar flex-grow">
          <div className="absolute top-4 right-4 opacity-20 flex flex-col items-end pointer-events-none">
            <span className="text-[8px] uppercase tracking-[0.2em] text-cyan-400 font-bold">REASONING ENGINE ACTIVE</span>
          </div>

          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: 0,
              background: "transparent",
              fontSize: "0.8rem",
              lineHeight: "1.4",
            }}
            wrapLines={true}
            showLineNumbers={true}
            lineNumberStyle={{ color: "#3d4451", minWidth: "2em" }}
            PreTag="div"
          >
            {codeText || " "}
          </SyntaxHighlighter>

          {isTypingCode && (
            <div className="w-1.5 h-4 bg-cyan-400 absolute inline-block ml-1 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.15);
          border-radius: 10px;
        }
        code[class*="language-"], pre[class*="language-"] {
           padding: 0 !important;
        }
      `}</style>
    </div>
  );
};