"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

/*
 * Each leaf is a clip-path window into ONE shared background image.
 * background-size matches the full container so all leaves align
 * to form a single continuous scene when viewed together.
 * Mouse movement sways the leaves, revealing / hiding parts of the scene.
 */

// CSS clip-path for a botanical leaf shape
const LEAF_CLIP_PATH =
    "polygon(50% 0%, 35% 8%, 15% 22%, 5% 42%, 3% 60%, 8% 78%, 20% 90%, 35% 96%, 50% 100%, 65% 96%, 80% 90%, 92% 78%, 97% 60%, 95% 42%, 85% 22%, 65% 8%)";

interface LeafConfig {
    x: number;       // % from left
    y: number;       // % from top
    width: number;   // px
    height: number;  // px
    rotation: number; // initial rotation in degrees
    delay: number;
}

function RevealLeaf({
    x,
    y,
    width,
    height,
    rotation,
    delay,
    mouseX,
    mouseY,
    containerWidth,
    containerHeight,
}: LeafConfig & {
    mouseX: number;
    mouseY: number;
    containerWidth: number;
    containerHeight: number;
}) {
    // Sway calculation
    const centerX = (x / 100) * containerWidth;
    const centerY = (y / 100) * containerHeight;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 500;
    const influence = Math.max(0, 1 - distance / maxDist);
    const targetAngle = ((dx / maxDist) * 18) * influence;

    const spring = useSpring(0, { stiffness: 30, damping: 14 });

    useEffect(() => {
        spring.set(targetAngle);
    }, [targetAngle, spring]);

    /*
     * background-position makes this leaf show the CORRECT slice
     * of the full-container-sized image:
     *   left edge of the leaf is at  x% of container  minus  half the leaf width
     *   top  edge of the leaf is at  y% of container  minus  half the leaf height
     * We negate these to produce the right background-position offset.
     */
    const bgX = -((x / 100) * containerWidth - width / 2);
    const bgY = -((y / 100) * containerHeight - height / 2);

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width,
                height,
                marginLeft: -width / 2,
                marginTop: -height / 2,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay, ease: "easeOut" }}
        >
            <motion.div
                style={{
                    rotate: spring,
                    transformOrigin: "50% 100%",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        transform: `rotate(${rotation}deg)`,
                        clipPath: LEAF_CLIP_PATH,
                        backgroundImage: "url(/farm-scenery.png)",
                        backgroundSize: `${containerWidth}px ${containerHeight}px`,
                        backgroundPosition: `${bgX}px ${bgY}px`,
                        backgroundRepeat: "no-repeat",
                        border: "none",
                        position: "relative",
                    }}
                >
                    {/* Green vein overlay via SVG */}
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Leaf outline */}
                        <path
                            d="M 50 2 C 25 15, 5 40, 3 60 C 1 80, 15 95, 50 98 C 85 95, 99 80, 97 60 C 95 40, 75 15, 50 2 Z"
                            fill="none"
                            stroke="rgba(46, 125, 50, 0.7)"
                            strokeWidth="3"
                        />
                        {/* Center vein */}
                        <path
                            d="M 50 8 L 50 92"
                            fill="none"
                            stroke="rgba(46, 125, 50, 0.4)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        {/* Side veins */}
                        {[
                            "M 50 22 Q 30 28, 16 38",
                            "M 50 22 Q 70 28, 84 38",
                            "M 50 38 Q 24 46, 10 56",
                            "M 50 38 Q 76 46, 90 56",
                            "M 50 54 Q 26 62, 14 72",
                            "M 50 54 Q 74 62, 86 72",
                            "M 50 70 Q 32 76, 22 84",
                            "M 50 70 Q 68 76, 78 84",
                        ].map((d, i) => (
                            <path
                                key={i}
                                d={d}
                                fill="none"
                                stroke="rgba(46, 125, 50, 0.25)"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                            />
                        ))}
                    </svg>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Stem leaf (grows from bottom, also reveals same background) ── */

function StemLeaf({
    x,
    baseY,
    stemHeight,
    leafSize,
    rotation,
    delay,
    mouseX,
    mouseY,
    containerWidth,
    containerHeight,
}: {
    x: number;
    baseY: number;
    stemHeight: number;
    leafSize: number;
    rotation: number;
    delay: number;
    mouseX: number;
    mouseY: number;
    containerWidth: number;
    containerHeight: number;
}) {
    const centerX = (x / 100) * containerWidth;
    const dx = mouseX - centerX;
    const maxDist = 600;
    const influence = Math.max(0, 1 - Math.abs(dx) / maxDist);
    const targetAngle = ((dx / maxDist) * 18) * influence;

    const spring = useSpring(0, { stiffness: 35, damping: 12 });

    useEffect(() => {
        spring.set(targetAngle);
    }, [targetAngle, spring]);

    const half = leafSize / 2;

    // Background position for the leaf head (top of the stem element)
    const leafCenterX = (x / 100) * containerWidth;
    const leafCenterY = (baseY / 100) * containerHeight - stemHeight - half;
    const bgX = -(leafCenterX - half);
    const bgY = -(leafCenterY);

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${baseY}%`,
                width: leafSize,
                height: stemHeight + leafSize,
                marginLeft: -half,
                marginTop: -(stemHeight + leafSize),
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
        >
            <motion.div
                style={{
                    rotate: spring,
                    transformOrigin: `${half}px ${stemHeight + leafSize}px`,
                    width: "100%",
                    height: "100%",
                }}
            >
                {/* Stem */}
                <svg
                    width={leafSize}
                    height={stemHeight + leafSize}
                    viewBox={`0 0 ${leafSize} ${stemHeight + leafSize}`}
                    className="absolute inset-0"
                >
                    <path
                        d={`M ${half} ${leafSize} Q ${half + 4} ${leafSize + stemHeight * 0.5} ${half} ${stemHeight + leafSize}`}
                        stroke="rgba(46, 125, 50, 0.7)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <ellipse
                        cx={half - 12}
                        cy={leafSize + stemHeight * 0.4}
                        rx="12"
                        ry="5"
                        fill="rgba(46, 125, 50, 0.4)"
                        transform={`rotate(-35, ${half - 12}, ${leafSize + stemHeight * 0.4})`}
                    />
                    <ellipse
                        cx={half + 12}
                        cy={leafSize + stemHeight * 0.65}
                        rx="10"
                        ry="4"
                        fill="rgba(46, 125, 50, 0.35)"
                        transform={`rotate(30, ${half + 12}, ${leafSize + stemHeight * 0.65})`}
                    />
                </svg>

                {/* Leaf head – clip-path window into the shared background */}
                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: leafSize,
                        height: leafSize,
                        transform: `rotate(${rotation}deg)`,
                        clipPath: LEAF_CLIP_PATH,
                        backgroundImage: "url(/farm-scenery.png)",
                        backgroundSize: `${containerWidth}px ${containerHeight}px`,
                        backgroundPosition: `${bgX}px ${bgY}px`,
                        backgroundRepeat: "no-repeat",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                    }}
                >
                    {/* Green vein overlay */}
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full"
                    >
                        <path
                            d="M 50 2 C 25 15, 5 40, 3 60 C 1 80, 15 95, 50 98 C 85 95, 99 80, 97 60 C 95 40, 75 15, 50 2 Z"
                            fill="none"
                            stroke="rgba(46, 125, 50, 0.7)"
                            strokeWidth="3"
                        />
                        <path
                            d="M 50 8 L 50 92"
                            fill="none"
                            stroke="rgba(46, 125, 50, 0.4)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        {[
                            "M 50 22 Q 30 28, 16 38",
                            "M 50 22 Q 70 28, 84 38",
                            "M 50 40 Q 24 48, 10 58",
                            "M 50 40 Q 76 48, 90 58",
                            "M 50 58 Q 26 65, 14 75",
                            "M 50 58 Q 74 65, 86 75",
                        ].map((d, i) => (
                            <path
                                key={i}
                                d={d}
                                fill="none"
                                stroke="rgba(46, 125, 50, 0.25)"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                            />
                        ))}
                    </svg>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Main component ── */

export default function InteractiveSunflowers() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            handleResize();
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Floating reveal leaves – positioned on the right side like the reference
    const revealLeaves: LeafConfig[] = [
        { x: 78, y: 32, width: 300, height: 380, rotation: -15, delay: 0.2 },
        { x: 90, y: 22, width: 220, height: 280, rotation: 25, delay: 0.4 },
        { x: 86, y: 56, width: 200, height: 260, rotation: -40, delay: 0.6 },
        { x: 72, y: 16, width: 130, height: 170, rotation: 50, delay: 0.8 },
        { x: 96, y: 42, width: 110, height: 140, rotation: -65, delay: 1.0 },
    ];

    // Stem leaves growing from bottom
    const stemLeaves = [
        { x: 82, baseY: 100, stemHeight: 140, leafSize: 80, rotation: -10, delay: 0.3 },
        { x: 92, baseY: 100, stemHeight: 100, leafSize: 60, rotation: 15, delay: 0.5 },
        { x: 75, baseY: 100, stemHeight: 80, leafSize: 50, rotation: -25, delay: 0.7 },
    ];

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-auto overflow-hidden">
            {/* Floating reveal leaves */}
            {revealLeaves.map((leaf, i) => (
                <RevealLeaf
                    key={`reveal-${i}`}
                    {...leaf}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                    containerWidth={dimensions.width}
                    containerHeight={dimensions.height}
                />
            ))}

            {/* Stem reveal leaves */}
            {stemLeaves.map((leaf, i) => (
                <StemLeaf
                    key={`stem-${i}`}
                    {...leaf}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                    containerWidth={dimensions.width}
                    containerHeight={dimensions.height}
                />
            ))}
        </div>
    );
}
