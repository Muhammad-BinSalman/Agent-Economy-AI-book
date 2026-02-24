
const AICreativePanel: React.FC = () => {
    return (
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0L100 50L50 100L0 50Z"/></svg>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                </div>
                <div>
                    <h3 className="text-xl font-black font-outfit uppercase tracking-tighter">Agent Architect</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">Gemini 3 Flash Brainstorming</p>
                </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Describe a business problem or task, and let Lumina's engine architect a potential agentic solution.
            </p>

            <div className="space-y-3">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="e.g. Automated Code Review"
                        className="w-full bg-zinc-50 border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                    />
                    <button 
                        className="absolute right-2 top-1.5 p-2 text-zinc-400 hover:text-zinc-900 disabled:opacity-50 transition-colors"
                    >
                        
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default AICreativePanel;