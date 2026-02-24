"use client";

import React from 'react';
import { motion } from "motion/react";
import { MacbookPro } from './macbook-pro';
import { AgentScreen } from './agent-screen';

export default function AgentVisualization() {
    return (
        <section className="py-24 sm:py-32 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Left — text content */}
                <motion.div
                    className="lg:col-span-5 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[10px] font-mono font-bold text-red-600 mb-6 border border-red-100 shadow-sm">
                        DEMO // AUTONOMOUS WORKFLOW
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black font-outfit uppercase leading-[0.9] tracking-tighter mb-8 text-zinc-900">
                        Describe the task. <br />
                        <span className="text-zinc-400">The agent builds it.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                        Go beyond boilerplate. Chapter 05 teaches you how to implement <strong>Autonomous Developer Agents</strong> that can plan, write, and debug code in isolated terminal environments.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Native Terminal Integration",
                            "Isolated Python Runtimes",
                            "Self-Correcting Reasoning Loops"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-sm font-bold font-outfit uppercase tracking-tight text-zinc-800">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — MacBook mockup */}
                <motion.div
                    className="lg:col-span-7 flex justify-center lg:justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.25 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full max-w-[700px]">
                        <div className="absolute -inset-20 bg-red-600/[0.05] blur-[100px] rounded-full pointer-events-none" />
                        <MacbookPro width={700} height={430}>
                            <AgentScreen />
                        </MacbookPro>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
