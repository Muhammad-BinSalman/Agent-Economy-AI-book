import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t border-zinc-100 py-16 px-6 bg-white">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <Image src="/logo.png" alt="Logo" className="h-8 w-auto" width={100} height={100} />
                        <span className="text-xl font-bold tracking-tighter font-outfit">
                            AI AGENT ECONOMY
                        </span>
                        <span className="rounded-full border border-zinc-300/80 bg-white/70 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-zinc-700">
                            BETA
                        </span>
                    </Link>
                    <p className="text-sm text-zinc-500 leading-relaxed mt-4">
                        A developer-first publication exploring the frontier of autonomous digital labor. Written for engineers, by engineers.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-16">
                    <div>
                        <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-400">Resources</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/book" className="hover:text-red-600 text-zinc-600">Read Book</a></li>
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
                    <div>
                        <h5 className="font-bold text-xs uppercase tracking-widest mb-4 text-zinc-400">Company</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/about" className="hover:text-red-600 text-zinc-600">About</a></li>
                            <li><a href="/contact" className="hover:text-red-600 text-zinc-600">Contact</a></li>
                            <li><a href="#" className="hover:text-red-600 text-zinc-600">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-[1600px] mx-auto mt-20 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
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
