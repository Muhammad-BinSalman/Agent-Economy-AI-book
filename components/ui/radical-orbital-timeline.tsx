"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { BookOpen, Brain, Globe, Terminal, Users } from "lucide-react";
import Image from "next/image";

export interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: React.ElementType;
    logo: string;         // path to orbiting logo
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

const curriculumData: TimelineItem[] = [
    {
        id: 1,
        title: "Vision & Foundations",
        date: "Chapter 01-02",
        content: "From prompt engineering to agentic reasoning. Understanding the shift from chat to autonomous loops.",
        category: "Foundation",
        icon: BookOpen,
        logo: "/logos/openai.svg",
        relatedIds: [2],
        status: "completed",
        energy: 100,
    },
    {
        id: 2,
        title: "Cognitive Architecture",
        date: "Chapter 03-04",
        content: "Designing the 'brain' of the agent: Planning modules, Memory pools, and ReAct loops.",
        category: "Core",
        icon: Brain,
        logo: "/logos/claude.png",
        relatedIds: [1, 3],
        status: "completed",
        energy: 95,
    },
    {
        id: 3,
        title: "Action & Tools",
        date: "Chapter 05-06",
        content: "Equipping agents with hands. Building tool-calling protocols and secure sandbox execution.",
        category: "Engineering",
        icon: Terminal,
        logo: "/logos/grok.jfif",
        relatedIds: [2, 4],
        status: "in-progress",
        energy: 70,
    },
    {
        id: 4,
        title: "Scaling Digital FTEs",
        date: "Chapter 07-08",
        content: "Orchestrating multi-agent business units. Managing labor costs and agentic performance.",
        category: "Scaling",
        icon: Users,
        logo: "/logos/mistral.png",
        relatedIds: [3, 5],
        status: "pending",
        energy: 40,
    },
    {
        id: 5,
        title: "The Multi-Agent Economy",
        date: "Chapter 09-10",
        content: "Future outlook: A world where agents trade with agents. Protocols for the new autonomous web.",
        category: "Vision",
        icon: Globe,
        logo: "/logos/azure.jfif",
        relatedIds: [4],
        status: "pending",
        energy: 20,
    },
];

export default function RadialOrbitalTimeline() {
    const [mounted, setMounted] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const rafRef = useRef<number | null>(null);
    const angleRef = useRef<number>(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    /* ── smooth rAF-based rotation ── */
    useEffect(() => {
        if (!autoRotate) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            return;
        }
        const step = () => {
            angleRef.current = (angleRef.current + 0.25) % 360;
            setRotationAngle(Number(angleRef.current.toFixed(2)));
            rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [autoRotate]);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState: Record<number, boolean> = {};
            Object.keys(prev).forEach((k) => { newState[parseInt(k)] = false; });
            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);
                const relatedItems = curriculumData.find((item) => item.id === id)?.relatedIds ?? [];
                const pulse: Record<number, boolean> = {};
                relatedItems.forEach((rid) => { pulse[rid] = true; });
                setPulseEffect(pulse);

                /* snap clicked node to top */
                const nodeIndex = curriculumData.findIndex((item) => item.id === id);
                const targetAngle = 270 - (nodeIndex / curriculumData.length) * 360;
                angleRef.current = ((targetAngle % 360) + 360) % 360;
                setRotationAngle(Number(angleRef.current.toFixed(2)));
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }
            return newState;
        });
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 200;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.55, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
        return { x, y, zIndex, opacity };
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        return (curriculumData.find((i) => i.id === activeNodeId)?.relatedIds ?? []).includes(itemId);
    };

    const getStatusStyles = (status: TimelineItem["status"]): string => {
        switch (status) {
            case "completed": return "text-white bg-red-600 border-red-700";
            case "in-progress": return "text-zinc-900 bg-zinc-100 border-zinc-200";
            case "pending": return "text-zinc-500 bg-zinc-50 border-zinc-200";
            default: return "text-zinc-900 bg-zinc-100 border-zinc-200";
        }
    };

    return (
        <section className="py-24 w-full bg-white">
            <div className="max-w-[1600px] mx-auto px-6">

                {/* Section header */}
                <div className="text-center mb-10">
                    <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-red-600/60 mb-3 font-bold">
                        The Curriculum Arc
                    </h2>
                    <h3 className="text-3xl sm:text-4xl font-black font-outfit uppercase leading-none tracking-tighter text-zinc-900">
                        Your Journey through the Economy
                    </h3>
                    <p className="mt-3 text-sm text-zinc-400 font-mono">Click a node to explore</p>
                </div>

                {/* Orbital canvas */}
                <div
                    className="relative w-full h-[560px] flex items-center justify-center overflow-hidden"
                    ref={containerRef}
                    onClick={handleContainerClick}
                >
                    <div
                        className="absolute w-full h-full flex items-center justify-center"
                        ref={orbitRef}
                        style={{ perspective: "1200px" }}
                    >
                        {/* Orbital ring */}
                        <div className="absolute w-[400px] h-[400px] rounded-full border border-zinc-200 pointer-events-none" />
                        <div className="absolute w-[410px] h-[410px] rounded-full border border-red-600/[0.06] animate-pulse pointer-events-none" />

                        {/* ── Centre logo ── */}
                        <div className="absolute w-20 h-20 rounded-2xl bg-white border-2 border-zinc-100 shadow-xl flex items-center justify-center z-10 rotate-12">
                            <div className="absolute w-24 h-24 rounded-2xl border border-red-600/10 animate-ping opacity-40 pointer-events-none" />
                            <Image
                                src="/logo.png"
                                alt="AI Native Book"
                                width={52}
                                height={52}
                                className="object-contain rounded-lg"
                            />
                        </div>

                        {/* ── Orbital nodes ── */}
                        {curriculumData.map((item, index) => {
                            const position = mounted
                                ? calculateNodePosition(index, curriculumData.length)
                                : { x: 0, y: 0, zIndex: 0, opacity: 0 };
                            const isExpanded = expandedItems[item.id];
                            const isRelated = isRelatedToActive(item.id);
                            const isPulsing = pulseEffect[item.id];

                            return (
                                <div
                                    key={item.id}
                                    ref={(el) => { nodeRefs.current[item.id] = el; }}
                                    className="absolute transition-opacity duration-300 cursor-pointer"
                                    style={{
                                        transform: `translate(${position.x}px, ${position.y}px)`,
                                        zIndex: isExpanded ? 500 : position.zIndex,
                                        opacity: isExpanded ? 1 : position.opacity,
                                    }}
                                    onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                                >
                                    {/* Glow */}
                                    <div
                                        className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                                        style={{
                                            background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)",
                                            width: `${item.energy * 0.5 + 40}px`,
                                            height: `${item.energy * 0.5 + 40}px`,
                                            left: `-${(item.energy * 0.5 + 40 - 48) / 2}px`,
                                            top: `-${(item.energy * 0.5 + 40 - 48) / 2}px`,
                                        }}
                                    />

                                    {/* Logo bubble */}
                                    <div
                                        className={`
                                            w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden
                                            border-2 transition-all duration-300 shadow-sm
                                            ${isExpanded
                                                ? "border-red-500 shadow-xl shadow-red-600/20 scale-125"
                                                : isRelated
                                                    ? "border-red-300 animate-pulse scale-105"
                                                    : "border-zinc-200 hover:border-red-300 hover:scale-110 rotate-12"
                                            }
                                            bg-white
                                        `}
                                    >
                                        <Image
                                            src={item.logo}
                                            alt={item.title}
                                            width={36}
                                            height={36}
                                            className="object-contain w-9 h-9 rounded-lg"
                                        />
                                    </div>

                                    {/* Label */}
                                    <div
                                        className={`
                                            absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                                            text-[10px] font-bold tracking-widest uppercase font-mono
                                            transition-all duration-300
                                            ${isExpanded ? "text-red-600 scale-110" : "text-zinc-500"}
                                        `}
                                    >
                                        {item.title}
                                    </div>

                                    {/* Popup card */}
                                    {isExpanded && (
                                        <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-xl border-zinc-200 shadow-2xl shadow-zinc-200/50 overflow-visible">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-red-600" />
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-center">
                                                    <Badge
                                                        className={`px-2 py-0.5 text-[9px] uppercase tracking-wider ${getStatusStyles(item.status)}`}
                                                        variant="secondary"
                                                    >
                                                        {item.status}
                                                    </Badge>
                                                    <span className="text-[10px] font-mono text-zinc-500">{item.date}</span>
                                                </div>
                                                <CardTitle className="text-sm font-outfit uppercase font-bold text-zinc-900 mt-2">
                                                    {item.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-[11px] text-zinc-700 leading-relaxed">
                                                <p>{item.content}</p>

                                                {/* Energy bar */}
                                                <div className="mt-4 pt-3 border-t border-zinc-100">
                                                    <div className="flex justify-between items-center text-[9px] mb-1 font-mono uppercase">
                                                        <span className="flex items-center text-zinc-500">
                                                            <Zap size={10} className="mr-1 text-red-600" />
                                                            Knowledge Depth
                                                        </span>
                                                        <span className="text-zinc-900">{item.energy}%</span>
                                                    </div>
                                                    <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-red-600" style={{ width: `${item.energy}%` }} />
                                                    </div>
                                                </div>

                                                {/* Related links */}
                                                {item.relatedIds.length > 0 && (
                                                    <div className="mt-4 pt-3 border-t border-zinc-100">
                                                        <div className="flex items-center mb-2">
                                                            <Link size={10} className="text-zinc-400 mr-1" />
                                                            <h4 className="text-[9px] uppercase tracking-wider font-bold text-zinc-400">
                                                                Dependency Path
                                                            </h4>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {item.relatedIds.map((relatedId) => {
                                                                const rel = curriculumData.find((i) => i.id === relatedId);
                                                                return (
                                                                    <Button
                                                                        key={relatedId}
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="flex items-center h-6 px-2 py-0 text-[9px] font-mono uppercase border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 hover:text-red-600 transition-all"
                                                                        onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                                                    >
                                                                        {rel?.title}
                                                                        <ArrowRight size={8} className="ml-1 text-red-600" />
                                                                    </Button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
