import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t border-zinc-100 py-16 px-6 bg-white">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 bg-red-600 rounded-sm"></div>
                        <span className="font-outfit font-bold text-xl uppercase tracking-tighter text-zinc-900">THE AGENT ECONOMY</span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        A developer-first publication exploring the frontier of autonomous digital labor. Written for engineers, by engineers.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                    <div>
                        <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-400">Resources</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">API Docs</a></li>
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">CLI Tool</a></li>
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">SDKs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-400">Community</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">Discord</a></li>
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">GitHub</a></li>
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto mt-20 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.2em]">
                    © 2025 AGENT ECONOMY PRESS. STABLE RELEASE 1.0.4
                </p>
                <div className="flex gap-4 text-red-600/10">
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                    <div className="w-3 h-3 rounded-full bg-current opacity-60"></div>
                    <div className="w-3 h-3 rounded-full bg-current opacity-30"></div>
                </div>
            </div>
        </footer>
    )
}
