"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    phase: number;
}

export default function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);

    const PARTICLE_COUNT = 45;
    const MOUSE_RADIUS = 100;

    const colors = [
        "rgba(74, 124, 89,",    // forest green
        "rgba(107, 143, 60,",   // olive green
        "rgba(183, 196, 106,",  // golden-green
        "rgba(144, 190, 109,",  // soft green
        "rgba(218, 195, 120,",  // warm gold
        "rgba(61, 107, 74,",    // deep green
    ];

    const initParticles = useCallback((w: number, h: number) => {
        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2 - 0.1,
                size: Math.random() * 2.5 + 0.8,
                opacity: Math.random() * 0.3 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
                phase: Math.random() * Math.PI * 2,
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            ctx.scale(dpr, dpr);
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
            }
        };

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouse);
        document.addEventListener("mouseleave", handleMouseLeave);

        let time = 0;
        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);
            time += 0.008;

            for (const p of particlesRef.current) {
                // Gentle drift with sine wave
                p.x += p.vx + Math.sin(time + p.phase) * 0.12;
                p.y += p.vy + Math.cos(time + p.phase * 0.7) * 0.08;

                // Mouse repulsion
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    p.x += (dx / dist) * force * 2;
                    p.y += (dy / dist) * force * 2;
                }

                // Wrap around
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Pulsing opacity
                const pulseOpacity = p.opacity + Math.sin(time * 1.5 + p.phase) * 0.05;

                // Draw soft glow
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size * 4
                );
                gradient.addColorStop(0, `${p.color} ${pulseOpacity})`);
                gradient.addColorStop(1, `${p.color} 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Draw core dot
                ctx.fillStyle = `${p.color} ${pulseOpacity + 0.1})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[2]"
        />
    );
}
