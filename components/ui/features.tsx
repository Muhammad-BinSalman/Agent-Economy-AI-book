"use client";

import { motion } from "motion/react";

export default function Features() {
    return (
        <section className="py-24 relative">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/[0.01] blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6">

                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-red-600/60 mb-4 font-bold">Core Curriculum</h2>
                        <h3 className="text-3xl sm:text-5xl font-black font-outfit uppercase leading-none tracking-tighter text-zinc-900">
                            Mastering the <br /><span className="text-red-600">Agentic Stack.</span>
                        </h3>
                    </div>
                    <p className="text-muted-foreground max-sm text-sm leading-relaxed">
                        Moving beyond simple chat interfaces. We explore the architectural shift required to build software that thinks, plans, and acts.
                    </p>
                </motion.div>

                {/* Feature cards — staggered */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
                            title: "Autonomous Planning",
                            desc: "Deep dive into ReAct loops, Chain-of-Thought reasoning, and self-correction mechanisms for reliable agents."
                        },
                        {
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
                            title: "Terminal Environments",
                            desc: "Building CLI-native agents that can manage your file system, execute git commands, and run local test suites."
                        },
                        {
                            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                            title: "Digital FTE Architectures",
                            desc: "How to bundle agents into complete business units capable of handling support, research, or content workflows."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            className="group cursor-default"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.9, delay: i * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform group-hover:border-red-200 group-hover:bg-red-50/50">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold font-outfit mb-3 text-zinc-900">{feature.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                            <div className="mt-6 w-8 h-px bg-zinc-200 group-hover:w-16 group-hover:bg-red-400 transition-all" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
