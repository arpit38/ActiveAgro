"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatsCounterProps {
    end: number;
    suffix?: string;
    label: string;
    duration?: number;
    dark?: boolean;
}

export default function StatsCounter({
    end,
    suffix = "",
    label,
    duration = 2,
    dark = false,
}: StatsCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <div className={`text-3xl md:text-4xl font-bold ${dark ? "text-white" : "text-[#1a2e4a]"}`}>
                {count}
                {suffix}
            </div>
            <div className={`text-sm mt-1 ${dark ? "text-white/70" : "text-gray-600"}`}>{label}</div>
        </motion.div>
    );
}
