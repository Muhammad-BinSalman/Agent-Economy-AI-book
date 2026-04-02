"use client";

import { Book } from "@/components/ui/book";
import { motion } from "motion/react";

export default function ModernEraSection() {
    return (
        <section className="w-full bg-white py-24 px-6">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">

                {/* Front of book — left */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <Book color="#1a1a2e" coverImage="/book-covers/front.jpeg" />
                </motion.div>

                {/* Heading text — centre */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="max-w-xs text-center md:text-left"
                >
                    <h2
                        className="font-outfit font-black text-gray-900 leading-[1.05] tracking-tight inline"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
                    >
                        This is the modern era of books.
                        {/* blinking cursor */}
                        <motion.span
                            className="inline-block ml-2 align-baseline w-[12px] bg-red-900"
                            style={{ height: "0.85em" }}
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </h2>
                </motion.div>

                {/* Back of book — right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                    style={{ transform: "scaleX(-1)" }}
                >
                    <Book color="#1a1a2e" />
                </motion.div>

            </div>
        </section>
    );
}
