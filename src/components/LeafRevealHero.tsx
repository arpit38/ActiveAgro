"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

/* ─── Leaf SVG path data ──────────────────────────────────────── */

// Top-left leaf — large, curved, angled left
const LEAF_1 =
    "M 320 380 C 280 310, 220 220, 260 140 C 290 80, 360 50, 420 80 C 480 110, 500 190, 470 270 C 440 350, 380 400, 320 380 Z";

// Top-right leaf — large, curved, angled right
const LEAF_2 =
    "M 680 350 C 720 280, 780 200, 750 120 C 720 60, 650 30, 590 60 C 530 90, 510 170, 540 250 C 570 330, 640 380, 680 350 Z";

// Bottom-center leaf — broader, horizontal
const LEAF_3 =
    "M 260 680 C 220 640, 160 560, 200 490 C 230 440, 300 420, 370 440 C 430 460, 460 520, 440 590 C 420 660, 320 710, 260 680 Z";

// Stem paths connecting leaves to a central point
const STEM_MAIN = "M 500 850 C 490 750, 470 650, 430 550 C 400 470, 370 420, 340 380";
const STEM_BRANCH_R = "M 470 600 C 520 520, 570 450, 630 380";
const STEM_BRANCH_L = "M 410 580 C 370 530, 320 500, 280 530";

/* ─── Animation presets ───────────────────────────────────────── */

const leafSway = (rotate: number[], x: number[], duration: number, delay: number) => ({
    rotate,
    x,
    transition: {
        duration,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "loop" as const,
        delay,
    },
});

const entranceVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 120,
            damping: 14,
            delay: 0.3 + i * 0.2,
        },
    }),
};

/* ─── Component ───────────────────────────────────────────────── */

export default function LeafRevealHero() {
    const prefersReducedMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Intersection observer — animate only when visible
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const shouldAnimate = isVisible && !prefersReducedMotion;

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden"
            aria-label="Animated hero section with decorative leaf illustrations"
        >
            {/* ── Cream background ── */}
            <div className="absolute inset-0 bg-[#F8F5ED]" />

            {/* ── Subtle radial glow behind leaves ── */}
            <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(167,213,168,0.3), transparent 70%)" }}
            />

            {/* ── SVG layer: decorative leaves (right side on desktop, background on mobile) ── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none
                           opacity-20 md:opacity-100
                           md:translate-x-[15%] lg:translate-x-[20%]"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    {/* Drop shadow for leaves */}
                    <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
                        <feOffset dx="0" dy="6" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.15" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Gradient fills for leaves */}
                    <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4A8C30" />
                        <stop offset="100%" stopColor="#2D5016" />
                    </linearGradient>
                    <linearGradient id="leafGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#5B9E3A" />
                        <stop offset="100%" stopColor="#3A6B24" />
                    </linearGradient>
                    <linearGradient id="leafGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3A6B24" />
                        <stop offset="100%" stopColor="#5B9E3A" />
                    </linearGradient>
                </defs>

                {/* ─── Stems first (behind leaves) ─── */}
                <motion.path
                    d={STEM_MAIN}
                    stroke="#2D5016"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={shouldAnimate ? { pathLength: 1, opacity: 0.6 } : {}}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.path
                    d={STEM_BRANCH_R}
                    stroke="#2D5016"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={shouldAnimate ? { pathLength: 1, opacity: 0.5 } : {}}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
                <motion.path
                    d={STEM_BRANCH_L}
                    stroke="#2D5016"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.45"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={shouldAnimate ? { pathLength: 1, opacity: 0.45 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                />

                {/* ─── Leaf 1: Top Left ─── */}
                <motion.g
                    style={{ originX: "370px", originY: "250px", willChange: "transform" }}
                    variants={entranceVariants}
                    initial="hidden"
                    animate={shouldAnimate ? "visible" : "hidden"}
                    custom={0}
                >
                    <motion.g
                        animate={
                            shouldAnimate
                                ? leafSway([-5, 5, -5], [-10, 10, -10], 3, 0)
                                : {}
                        }
                    >
                        {/* Shadow */}
                        <path d={LEAF_1} fill="rgba(0,0,0,0.08)" filter="url(#leafShadow)" transform="translate(3, 5)" />
                        {/* Green leaf body with gradient */}
                        <path d={LEAF_1} fill="url(#leafGrad1)" opacity="0.9" />
                        {/* Lighter inner highlight */}
                        <path d={LEAF_1} fill="#5B9E3A" opacity="0.2" />
                        {/* Vein: central */}
                        <path
                            d="M 320 380 C 340 310, 350 240, 370 160"
                            stroke="#2D5016"
                            strokeWidth="2.5"
                            fill="none"
                            opacity="0.5"
                        />
                        {/* Side veins */}
                        <path d="M 340 310 C 310 290, 280 260, 270 230" stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.3" />
                        <path d="M 355 260 C 390 240, 420 210, 430 180" stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.3" />
                        <path d="M 345 340 C 300 330, 260 300, 250 270" stroke="#2D5016" strokeWidth="1" fill="none" opacity="0.25" />
                        <path d="M 350 290 C 380 270, 400 250, 420 220" stroke="#2D5016" strokeWidth="1" fill="none" opacity="0.2" />
                        {/* Leaf edge highlight */}
                        <path d={LEAF_1} fill="none" stroke="#4A7C2C" strokeWidth="2" opacity="0.6" />
                    </motion.g>
                </motion.g>

                {/* ─── Leaf 2: Top Right ─── */}
                <motion.g
                    style={{ originX: "640px", originY: "220px", willChange: "transform" }}
                    variants={entranceVariants}
                    initial="hidden"
                    animate={shouldAnimate ? "visible" : "hidden"}
                    custom={1}
                >
                    <motion.g
                        animate={
                            shouldAnimate
                                ? leafSway([-4, 4, -4], [-12, 12, -12], 3.5, 0.3)
                                : {}
                        }
                    >
                        <path d={LEAF_2} fill="rgba(0,0,0,0.08)" filter="url(#leafShadow)" transform="translate(3, 5)" />
                        <path d={LEAF_2} fill="url(#leafGrad2)" opacity="0.9" />
                        <path d={LEAF_2} fill="#6BAF4A" opacity="0.15" />
                        {/* Veins */}
                        <path d="M 680 350 C 660 280, 650 210, 660 130" stroke="#2D5016" strokeWidth="2.5" fill="none" opacity="0.5" />
                        <path d="M 660 280 C 700 260, 730 230, 740 200" stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.3" />
                        <path d="M 650 230 C 610 210, 580 180, 570 150" stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.3" />
                        <path d="M 670 320 C 710 310, 740 280, 750 250" stroke="#2D5016" strokeWidth="1" fill="none" opacity="0.25" />
                        <path d="M 655 200 C 620 185, 600 165, 585 140" stroke="#2D5016" strokeWidth="1" fill="none" opacity="0.2" />
                        <path d={LEAF_2} fill="none" stroke="#4A7C2C" strokeWidth="2" opacity="0.6" />
                    </motion.g>
                </motion.g>

                {/* ─── Leaf 3: Bottom Left ─── */}
                <motion.g
                    style={{ originX: "320px", originY: "580px", willChange: "transform" }}
                    variants={entranceVariants}
                    initial="hidden"
                    animate={shouldAnimate ? "visible" : "hidden"}
                    custom={2}
                >
                    <motion.g
                        animate={
                            shouldAnimate
                                ? leafSway([-3, 3, -3], [-8, 8, -8], 4, 0.6)
                                : {}
                        }
                    >
                        <path d={LEAF_3} fill="rgba(0,0,0,0.08)" filter="url(#leafShadow)" transform="translate(3, 5)" />
                        <path d={LEAF_3} fill="url(#leafGrad3)" opacity="0.9" />
                        <path d={LEAF_3} fill="#6BAF4A" opacity="0.15" />
                        {/* Veins */}
                        <path d="M 260 680 C 290 630, 310 570, 330 500" stroke="#2D5016" strokeWidth="2.5" fill="none" opacity="0.5" />
                        <path d="M 290 620 C 250 600, 220 570, 210 540" stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.3" />
                        <path d="M 310 560 C 350 540, 380 510, 400 480" stroke="#2D5016" strokeWidth="1.2" fill="none" opacity="0.3" />
                        <path d="M 280 650 C 240 635, 210 610, 200 580" stroke="#2D5016" strokeWidth="1" fill="none" opacity="0.2" />
                        <path d={LEAF_3} fill="none" stroke="#4A7C2C" strokeWidth="2" opacity="0.6" />
                    </motion.g>
                </motion.g>

                {/* ─── Floating particles (pollen/seeds) ─── */}
                {[
                    { cx: 150, cy: 300, r: 3, dur: 8, delay: 0 },
                    { cx: 800, cy: 500, r: 2.5, dur: 10, delay: 1 },
                    { cx: 600, cy: 150, r: 2, dur: 7, delay: 2 },
                    { cx: 900, cy: 750, r: 3, dur: 9, delay: 0.5 },
                    { cx: 100, cy: 800, r: 2, dur: 11, delay: 1.5 },
                    { cx: 450, cy: 900, r: 2.5, dur: 8.5, delay: 3 },
                ].map((p, i) => (
                    <motion.circle
                        key={`particle-${i}`}
                        cx={p.cx}
                        cy={p.cy}
                        r={p.r}
                        fill="#8BA142"
                        opacity="0.25"
                        animate={
                            shouldAnimate
                                ? {
                                    cx: [p.cx, p.cx + 40, p.cx - 20, p.cx],
                                    cy: [p.cy, p.cy - 60, p.cy - 120, p.cy - 180],
                                    opacity: [0, 0.3, 0.2, 0],
                                }
                                : {}
                        }
                        transition={{
                            duration: p.dur,
                            ease: "linear",
                            repeat: Infinity,
                            delay: p.delay,
                        }}
                    />
                ))}
            </svg>

            {/* ─── Hero Text Content (overlaid) ─── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
                <div className="max-w-2xl lg:max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-sm text-primary border border-primary/20 mb-6">
                            <Leaf className="w-4 h-4" />
                            Since 2009 — Trusted by 10,000+ Farmers
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark leading-tight"
                    >
                        Nurturing Growth,
                        <br />
                        <span className="text-primary">Protecting Harvests</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-lg text-text-light mt-6 max-w-xl leading-relaxed"
                    >
                        Premium crop protection and nutrition solutions backed by science,
                        trusted by farmers across India.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="flex flex-wrap gap-4 mt-8"
                    >
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-primary-dark transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Explore Products
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary px-7 py-3.5 rounded-lg font-semibold border border-primary/20 hover:bg-white transition-all hover:-translate-y-0.5"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* ─── Certification ticker ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute bottom-0 left-0 right-0 bg-white/60 backdrop-blur-md border-t border-primary/10 py-4"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
                        {[
                            "ISO 9001:2015",
                            "ISO 14001:2015",
                            "GMP Certified",
                            "WHO-GMP",
                            "REACH Compliant",
                            "Ministry Approved",
                        ].map((cert, i) => (
                            <span
                                key={i}
                                className="flex-shrink-0 text-xs uppercase tracking-wider text-text-light font-medium flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
