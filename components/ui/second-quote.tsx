import React from 'react'

export default function SecondQuote() {
    return (
        <section className="bg-zinc-50 py-24 px-6 border-y border-zinc-200">
            <div className="max-w-[1600px] mx-auto text-center">
                <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-widest mb-4 block">Chapter 01: The Thesis</span>
                <blockquote className="text-2xl sm:text-3xl font-medium font-outfit italic leading-snug text-zinc-800">
                    "An agent is not a chatbot. It is a state-aware reasoning engine capable of independent action toward a specific objective."
                </blockquote>
            </div>
        </section>
    )
}
