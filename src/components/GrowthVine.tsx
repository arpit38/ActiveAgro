"use client";

import { useEffect, useState } from "react";

export default function GrowthVine() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollY / docHeight, 1);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Realistic vine path — organic curves that weave down the center
    const mainVine = `
        M 500 -20
        C 520 60, 440 120, 480 200
        C 520 280, 560 320, 500 400
        C 440 480, 460 520, 500 600
        C 540 680, 560 740, 500 800
        C 440 860, 460 920, 500 1000
        C 540 1080, 520 1140, 500 1200
        C 480 1280, 440 1340, 480 1400
        C 520 1460, 560 1520, 500 1600
        C 440 1680, 460 1740, 500 1800
        C 540 1880, 520 1940, 500 2000
        C 460 2080, 440 2140, 480 2200
        C 520 2280, 560 2340, 500 2400
        C 440 2480, 460 2560, 500 2600
        C 540 2680, 520 2760, 500 2800
        C 460 2880, 480 2960, 500 3000
        C 520 3080, 540 3160, 500 3200
        C 460 3280, 480 3360, 500 3400
        C 520 3480, 500 3540, 500 3600
    `;

    // Tendril curls — small spirals branching off the vine
    const tendrils = [
        { path: "M 480 200 C 460 195, 440 200, 435 210 C 432 218, 438 222, 445 218 C 450 214, 448 208, 442 210", threshold: 0.06 },
        { path: "M 500 400 C 525 390, 545 395, 548 408 C 550 418, 542 420, 538 415 C 534 410, 538 404, 542 408", threshold: 0.12 },
        { path: "M 500 600 C 475 588, 455 592, 448 605 C 445 614, 452 618, 458 612 C 462 606, 456 600, 452 604", threshold: 0.18 },
        { path: "M 500 800 C 530 788, 550 795, 555 808 C 558 818, 548 820, 542 814 C 538 808, 544 802, 548 806", threshold: 0.24 },
        { path: "M 500 1000 C 468 988, 450 995, 445 1008 C 442 1018, 450 1022, 455 1016 C 460 1010, 454 1004, 448 1008", threshold: 0.30 },
        { path: "M 500 1200 C 535 1188, 555 1195, 558 1208 C 560 1218, 550 1220, 545 1214 C 540 1208, 546 1202, 550 1206", threshold: 0.36 },
        { path: "M 480 1400 C 455 1388, 435 1395, 432 1408 C 430 1418, 438 1420, 442 1414 C 446 1408, 440 1402, 436 1406", threshold: 0.42 },
        { path: "M 500 1600 C 530 1588, 550 1595, 555 1610 C 558 1620, 548 1622, 542 1616 C 538 1610, 544 1604, 548 1608", threshold: 0.48 },
        { path: "M 500 1800 C 465 1788, 445 1795, 440 1810 C 438 1820, 446 1822, 450 1816 C 454 1810, 448 1804, 444 1808", threshold: 0.54 },
        { path: "M 500 2000 C 535 1988, 555 1995, 558 2008 C 560 2018, 550 2022, 545 2016 C 540 2010, 546 2004, 550 2008", threshold: 0.60 },
        { path: "M 480 2200 C 455 2188, 435 2195, 430 2208 C 428 2218, 436 2222, 440 2216 C 444 2210, 438 2204, 434 2208", threshold: 0.66 },
        { path: "M 500 2400 C 530 2388, 550 2395, 555 2408 C 558 2418, 548 2420, 542 2414 C 538 2408, 544 2402, 548 2406", threshold: 0.72 },
        { path: "M 500 2800 C 465 2788, 450 2795, 445 2808 C 442 2818, 450 2822, 455 2816 C 460 2810, 454 2804, 448 2808", threshold: 0.82 },
        { path: "M 500 3200 C 535 3188, 555 3195, 558 3208 C 560 3218, 550 3222, 545 3216 C 540 3210, 546 3204, 550 3208", threshold: 0.90 },
    ];

    // Leaf shapes along the vine — realistic pointed leaves
    const leaves = [
        { x: 435, y: 210, rot: -30, scale: 1.0, threshold: 0.07, side: "left" },
        { x: 548, y: 408, rot: 25, scale: 0.9, threshold: 0.13, side: "right" },
        { x: 448, y: 605, rot: -20, scale: 1.1, threshold: 0.19, side: "left" },
        { x: 555, y: 808, rot: 30, scale: 0.85, threshold: 0.25, side: "right" },
        { x: 445, y: 1008, rot: -35, scale: 1.0, threshold: 0.31, side: "left" },
        { x: 558, y: 1208, rot: 20, scale: 1.1, threshold: 0.37, side: "right" },
        { x: 432, y: 1408, rot: -25, scale: 0.9, threshold: 0.43, side: "left" },
        { x: 555, y: 1610, rot: 35, scale: 1.0, threshold: 0.49, side: "right" },
        { x: 440, y: 1810, rot: -30, scale: 1.1, threshold: 0.55, side: "left" },
        { x: 558, y: 2008, rot: 25, scale: 0.9, threshold: 0.61, side: "right" },
        { x: 430, y: 2208, rot: -20, scale: 1.0, threshold: 0.67, side: "left" },
        { x: 555, y: 2408, rot: 30, scale: 1.1, threshold: 0.73, side: "right" },
        { x: 445, y: 2808, rot: -25, scale: 0.85, threshold: 0.83, side: "left" },
        { x: 558, y: 3208, rot: 20, scale: 1.0, threshold: 0.91, side: "right" },
    ];

    // Small flower buds
    const flowers = [
        { x: 490, y: 300, threshold: 0.10, color: "#E8D5A8" },
        { x: 510, y: 700, threshold: 0.22, color: "#F2E2C0" },
        { x: 485, y: 1100, threshold: 0.34, color: "#E8D5A8" },
        { x: 515, y: 1500, threshold: 0.46, color: "#F2E2C0" },
        { x: 490, y: 1900, threshold: 0.58, color: "#E8D5A8" },
        { x: 510, y: 2300, threshold: 0.70, color: "#F2E2C0" },
        { x: 490, y: 2700, threshold: 0.80, color: "#E8D5A8" },
        { x: 510, y: 3100, threshold: 0.88, color: "#F2E2C0" },
    ];

    const pathLength = 5500;
    const drawnLength = pathLength * scrollProgress;

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] hidden lg:block overflow-hidden">
            <svg
                viewBox="0 0 1000 3600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="xMidYMin slice"
            >
                <defs>
                    <linearGradient id="vineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5A8F5A" stopOpacity="0.12" />
                        <stop offset="50%" stopColor="#4A7C59" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#3D6B4A" stopOpacity="0.10" />
                    </linearGradient>
                    <filter id="vineSoftShadow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Realistic leaf shape */}
                    <path
                        id="leaf"
                        d="M 0 0 C 4 -6, 10 -18, 3 -28 C 0 -24, -4 -20, -5 -16 C -6 -10, -3 -4, 0 0 Z"
                    />
                </defs>

                {/* Soft glow behind */}
                <path
                    d={mainVine}
                    stroke="#4A7C59"
                    strokeWidth="25"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.03"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength - drawnLength}
                    style={{ transition: "stroke-dashoffset 0.12s ease-out" }}
                />

                {/* Main vine stem */}
                <path
                    d={mainVine}
                    stroke="url(#vineGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#vineSoftShadow)"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength - drawnLength}
                    style={{ transition: "stroke-dashoffset 0.12s ease-out" }}
                />

                {/* Inner detail line */}
                <path
                    d={mainVine}
                    stroke="#4A7C59"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.12"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength - drawnLength}
                    style={{ transition: "stroke-dashoffset 0.12s ease-out" }}
                />

                {/* Tendrils */}
                {tendrils.map((t, i) => {
                    const visible = scrollProgress >= t.threshold;
                    return (
                        <path
                            key={`tendril-${i}`}
                            d={t.path}
                            stroke="#4A7C59"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                            opacity={visible ? 0.18 : 0}
                            style={{ transition: "opacity 0.6s ease-out" }}
                        />
                    );
                })}

                {/* Leaves */}
                {leaves.map((l, i) => {
                    const visible = scrollProgress >= l.threshold;
                    return (
                        <g
                            key={`leaf-${i}`}
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: `translate(${l.x}px, ${l.y}px) rotate(${l.rot}deg) scale(${visible ? l.scale : 0.3})`,
                                transformOrigin: `${l.x}px ${l.y}px`,
                                transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                        >
                            <use href="#leaf" fill="#4A7C59" opacity="0.22" />
                            {/* Second leaf */}
                            <use
                                href="#leaf"
                                fill="#6B8F3C"
                                opacity="0.15"
                                transform={`rotate(${l.side === "left" ? 50 : -50}) scale(0.8)`}
                            />
                            {/* Leaf vein */}
                            <line
                                x1="0" y1="0"
                                x2="1" y2="-22"
                                stroke="#4A7C59"
                                strokeWidth="0.5"
                                opacity="0.2"
                            />
                        </g>
                    );
                })}

                {/* Small flower buds */}
                {flowers.map((f, i) => {
                    const visible = scrollProgress >= f.threshold;
                    return (
                        <g
                            key={`flower-${i}`}
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: `translate(${f.x}px, ${f.y}px) scale(${visible ? 1 : 0})`,
                                transformOrigin: `${f.x}px ${f.y}px`,
                                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                        >
                            {/* Petals */}
                            {[0, 72, 144, 216, 288].map((angle) => (
                                <ellipse
                                    key={angle}
                                    cx="0" cy="-4"
                                    rx="2" ry="4"
                                    fill={f.color}
                                    opacity="0.35"
                                    transform={`rotate(${angle})`}
                                />
                            ))}
                            {/* Center */}
                            <circle cx="0" cy="0" r="2" fill="#D4A843" opacity="0.4" />
                        </g>
                    );
                })}

                {/* Tiny dots along vine for texture */}
                {[100, 350, 500, 900, 1300, 1700, 2100, 2500, 2900, 3300, 3500].map((y, i) => {
                    const visible = scrollProgress >= (y / 3600) * 0.95;
                    return (
                        <circle
                            key={`dot-${i}`}
                            cx={500 + Math.sin(y * 0.008) * 30}
                            cy={y}
                            r="2"
                            fill="#6B8F3C"
                            opacity={visible ? 0.15 : 0}
                            style={{ transition: "opacity 0.4s ease-out" }}
                        />
                    );
                })}
            </svg>
        </div>
    );
}
