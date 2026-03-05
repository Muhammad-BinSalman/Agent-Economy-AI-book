import { motion } from "motion/react";
import Image from "next/image";

interface BookProps {
    title?: string;
    author?: string;
    coverImage?: string;
    color?: string;
}

export const Book = ({
    coverImage = "/book-covers/back.png",
    color = "#2c3e50",
}: BookProps) => {
    return (
        /**
         * Wrapper gives 3-D perspective.
         * The book is ~160px wide × 230px tall — realistic paperback proportions.
         * Spine width = 28px.
         */
        <div
            className="group cursor-pointer select-none"
            style={{ perspective: "900px", width: 160, height: 275 }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                    rotateY: [-24, -18, -24],
                    rotateX: [3, 6, 3],
                    y: [0, -6, 0],
                    scale: 1,
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeIn",
                }}
                whileHover={{
                    rotateY: 5,
                    scale: 1.1,
                    transition: { duration: 0.35, ease: "easeOut" },
                }}
            >

                {/* ── FRONT COVER ───────────────────────────────── */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                        transformStyle: "preserve-3d",
                        backgroundColor: color,
                        borderRadius: "0 3px 3px 0",
                        boxShadow:
                            "6px 6px 20px rgba(0,0,0,0.45), -2px 0 6px rgba(0,0,0,0.3)",
                    }}
                >
                    {/* Cover photo — full-bleed */}
                    {coverImage && (
                        <Image
                            width={160}
                            height={275}
                            src={coverImage}
                            alt="Book cover"
                            className="absolute inset-0 w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    )}

                    {/* Gloss sheen */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 50%)",
                        }}
                    />

                </div>

                {/* ── BACK COVER ────────────────────────────────── */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: color,
                        filter: "brightness(0.82)",
                        transform: "translateZ(-28px)",
                        borderRadius: "0 3px 3px 0",
                    }}
                />

                {/* ── PAGES — right edge ────────────────────────── */}
                <div
                    className="absolute top-1 bottom-1"
                    style={{
                        right: 0,
                        width: 28,
                        transform: "rotateY(90deg) translateZ(4px)",
                        transformOrigin: "left center",
                        backgroundColor: "#f5f0e8",
                        backgroundImage:
                            "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
                    }}
                />

                {/* ── PAGES — top edge ──────────────────────────── */}
                <div
                    className="absolute left-1 right-1 top-0"
                    style={{
                        height: 28,
                        transform: "rotateX(90deg) translateZ(4px)",
                        transformOrigin: "bottom center",
                        backgroundColor: "#f0ebe0",
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
                    }}
                />

                {/* ── PAGES — bottom edge ───────────────────────── */}
                <div
                    className="absolute left-1 right-1 bottom-0"
                    style={{
                        height: 28,
                        transform: "rotateX(-90deg) translateZ(202px)",
                        transformOrigin: "top center",
                        backgroundColor: "#f0ebe0",
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
                    }}
                />
            </motion.div>
        </div>
    );
};