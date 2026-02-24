"use client";

import { motion } from "framer-motion";

interface AgroIconProps {
    className?: string;
    size?: number;
    animate?: boolean;
}

const springIn = (delay = 0) => ({
    initial: { scale: 0.5, opacity: 0 } as const,
    whileInView: { scale: 1, opacity: 1 } as const,
    transition: { type: "spring" as const, stiffness: 200, damping: 15, delay },
    viewport: { once: true },
});

const slideIn = (delay = 0) => ({
    initial: { y: 20, opacity: 0 } as const,
    whileInView: { y: 0, opacity: 1 } as const,
    transition: { type: "spring" as const, stiffness: 180, damping: 15, delay },
    viewport: { once: true },
});

/* ─── Laurel Wreath (Years of Experience) ─── */
export function LaurelWreathIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...(animate ? springIn(0) : {})}
        >
            {/* Left branch */}
            <path d="M25 65 C20 55, 15 45, 18 35 C21 25, 20 15, 22 10" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M18 50 C12 48, 8 44, 10 38" stroke="#6B8F3C" strokeWidth="1.5" fill="none" opacity="0.8" />
            <ellipse cx="14" cy="42" rx="5" ry="8" transform="rotate(-30 14 42)" fill="#6B8F3C" opacity="0.3" />
            <ellipse cx="16" cy="32" rx="4" ry="7" transform="rotate(-20 16 32)" fill="#4A7C59" opacity="0.25" />
            <ellipse cx="19" cy="22" rx="4" ry="6" transform="rotate(-10 19 22)" fill="#6B8F3C" opacity="0.3" />
            <ellipse cx="12" cy="52" rx="5" ry="8" transform="rotate(-35 12 52)" fill="#4A7C59" opacity="0.25" />

            {/* Right branch */}
            <path d="M55 65 C60 55, 65 45, 62 35 C59 25, 60 15, 58 10" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M62 50 C68 48, 72 44, 70 38" stroke="#6B8F3C" strokeWidth="1.5" fill="none" opacity="0.8" />
            <ellipse cx="66" cy="42" rx="5" ry="8" transform="rotate(30 66 42)" fill="#6B8F3C" opacity="0.3" />
            <ellipse cx="64" cy="32" rx="4" ry="7" transform="rotate(20 64 32)" fill="#4A7C59" opacity="0.25" />
            <ellipse cx="61" cy="22" rx="4" ry="6" transform="rotate(10 61 22)" fill="#6B8F3C" opacity="0.3" />
            <ellipse cx="68" cy="52" rx="5" ry="8" transform="rotate(35 68 52)" fill="#4A7C59" opacity="0.25" />

            {/* Center star */}
            <circle cx="40" cy="38" r="10" fill="#4A7C59" opacity="0.15" />
            <text x="40" y="42" textAnchor="middle" fill="#4A7C59" fontSize="14" fontWeight="bold" fontFamily="serif">★</text>
        </motion.svg>
    );
}

/* ─── Products Box (Products) ─── */
export function ProductsBoxIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} {...(animate ? slideIn(0.1) : {})}>
            {/* Leaves behind */}
            <ellipse cx="28" cy="28" rx="8" ry="14" transform="rotate(-40 28 28)" fill="#6B8F3C" opacity="0.2" />
            <ellipse cx="52" cy="28" rx="8" ry="14" transform="rotate(40 52 28)" fill="#6B8F3C" opacity="0.2" />
            {/* Box body */}
            <rect x="22" y="35" width="36" height="28" rx="3" fill="#4A7C59" opacity="0.15" stroke="#4A7C59" strokeWidth="2" />
            {/* Box lid */}
            <rect x="18" y="28" width="44" height="10" rx="2" fill="#4A7C59" opacity="0.2" stroke="#4A7C59" strokeWidth="2" />
            {/* Leaf emblem on box */}
            <circle cx="40" cy="49" r="7" fill="#4A7C59" opacity="0.2" />
            <path d="M40 44 C42 47, 44 50, 40 54 C36 50, 38 47, 40 44" fill="#6B8F3C" opacity="0.6" />
        </motion.svg>
    );
}

/* ─── Market Stall (Dealer & Retailer Connect) ─── */
export function MarketStallIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} {...(animate ? slideIn(0.2) : {})}>
            {/* Roof / awning */}
            <path d="M15 35 L40 18 L65 35" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#4A7C59" fillOpacity="0.1" />
            {/* Scalloped awning edge */}
            <path d="M15 35 Q22 40 28 35 Q34 40 40 35 Q46 40 52 35 Q58 40 65 35" stroke="#6B8F3C" strokeWidth="2" fill="none" />
            {/* Stall body */}
            <rect x="20" y="35" width="40" height="25" fill="#4A7C59" opacity="0.08" />
            {/* Counter */}
            <rect x="18" y="55" width="44" height="5" rx="1" fill="#4A7C59" opacity="0.2" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Poles */}
            <line x1="20" y1="35" x2="20" y2="60" stroke="#4A7C59" strokeWidth="2" />
            <line x1="60" y1="35" x2="60" y2="60" stroke="#4A7C59" strokeWidth="2" />
            {/* Products on counter */}
            <circle cx="32" cy="48" r="4" fill="#6B8F3C" opacity="0.3" />
            <circle cx="44" cy="48" r="4" fill="#4A7C59" opacity="0.3" />
            <circle cx="38" cy="44" r="3" fill="#8BA142" opacity="0.3" />
        </motion.svg>
    );
}

/* ─── Farmer (Happy Farmers) ─── */
export function FarmerIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} {...(animate ? slideIn(0.3) : {})}>
            {/* Hat */}
            <ellipse cx="40" cy="18" rx="14" ry="4" fill="#D4A843" opacity="0.5" />
            <rect x="32" y="10" width="16" height="8" rx="3" fill="#D4A843" opacity="0.6" />
            {/* Head */}
            <circle cx="40" cy="26" r="8" fill="#4A7C59" opacity="0.15" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="37" cy="25" r="1.2" fill="#4A7C59" />
            <circle cx="43" cy="25" r="1.2" fill="#4A7C59" />
            {/* Smile */}
            <path d="M37 28 Q40 31 43 28" stroke="#4A7C59" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Body */}
            <path d="M32 34 L40 36 L48 34 L50 55 L30 55 Z" fill="#4A7C59" opacity="0.15" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Arms with tools */}
            <line x1="30" y1="38" x2="20" y2="48" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="38" x2="60" y2="48" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
            {/* Pitchfork */}
            <line x1="60" y1="48" x2="62" y2="20" stroke="#8B7355" strokeWidth="1.5" />
            <path d="M58 22 L62 18 L66 22" stroke="#8B7355" strokeWidth="1.5" fill="none" />
            <line x1="60" y1="22" x2="60" y2="15" stroke="#8B7355" strokeWidth="1" />
            <line x1="64" y1="22" x2="64" y2="15" stroke="#8B7355" strokeWidth="1" />
            {/* Plant in hand */}
            <path d="M18 46 C15 40, 20 38, 22 42" fill="#6B8F3C" opacity="0.5" />
            <path d="M16 48 C13 42, 18 40, 20 44" fill="#4A7C59" opacity="0.4" />
        </motion.svg>
    );
}

/* ─── People Group (Employees) ─── */
export function PeopleGroupIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} {...(animate ? slideIn(0.4) : {})}>
            {/* Person 1 (center, taller) */}
            <circle cx="40" cy="22" r="7" fill="#4A7C59" opacity="0.2" stroke="#4A7C59" strokeWidth="1.5" />
            <path d="M30 35 Q40 30 50 35 L52 58 L28 58 Z" fill="#4A7C59" opacity="0.15" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Person 2 (left) */}
            <circle cx="22" cy="28" r="5.5" fill="#6B8F3C" opacity="0.2" stroke="#6B8F3C" strokeWidth="1.5" />
            <path d="M14 38 Q22 34 30 38 L31 58 L13 58 Z" fill="#6B8F3C" opacity="0.12" stroke="#6B8F3C" strokeWidth="1.5" />
            {/* Person 3 (right) */}
            <circle cx="58" cy="28" r="5.5" fill="#8BA142" opacity="0.2" stroke="#8BA142" strokeWidth="1.5" />
            <path d="M50 38 Q58 34 66 38 L67 58 L49 58 Z" fill="#8BA142" opacity="0.12" stroke="#8BA142" strokeWidth="1.5" />
        </motion.svg>
    );
}

/* ─── Factory (Manufacturing Facilities) ─── */
export function FactoryIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} {...(animate ? slideIn(0.5) : {})}>
            {/* Main building */}
            <rect x="10" y="30" width="35" height="32" rx="2" fill="#4A7C59" opacity="0.12" stroke="#4A7C59" strokeWidth="2" />
            {/* Chimney */}
            <rect x="15" y="18" width="8" height="14" fill="#4A7C59" opacity="0.15" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Smoke */}
            <circle cx="19" cy="14" r="3" fill="#4A7C59" opacity="0.1" />
            <circle cx="22" cy="10" r="2.5" fill="#4A7C59" opacity="0.08" />
            <circle cx="18" cy="7" r="2" fill="#4A7C59" opacity="0.06" />
            {/* Windows */}
            <rect x="16" y="36" width="6" height="6" rx="1" fill="#6B8F3C" opacity="0.3" />
            <rect x="26" y="36" width="6" height="6" rx="1" fill="#6B8F3C" opacity="0.3" />
            <rect x="16" y="48" width="6" height="6" rx="1" fill="#6B8F3C" opacity="0.3" />
            <rect x="26" y="48" width="6" height="6" rx="1" fill="#6B8F3C" opacity="0.3" />
            {/* Side building */}
            <path d="M45 42 L55 30 L65 42 L65 62 L45 62 Z" fill="#4A7C59" opacity="0.1" stroke="#4A7C59" strokeWidth="1.5" />
            <rect x="50" y="48" width="6" height="6" rx="1" fill="#6B8F3C" opacity="0.3" />
            {/* Door */}
            <rect x="34" y="52" width="8" height="10" rx="2" fill="#4A7C59" opacity="0.25" />
            {/* Green accent — leaf */}
            <path d="M58 28 C60 24, 64 24, 62 28 C60 32, 56 32, 58 28" fill="#6B8F3C" opacity="0.4" />
        </motion.svg>
    );
}

/* ─── Scarecrow (for section headers) ─── */
export function ScarecrowIcon({ className = "", size = 80, animate = true }: AgroIconProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
            className={className}
            {...(animate ? {
                initial: { scale: 0.6, opacity: 0, rotate: -5 } as const,
                whileInView: { scale: 1, opacity: 1, rotate: 0 } as const,
                transition: { type: "spring" as const, stiffness: 150, damping: 12 },
                viewport: { once: true },
            } : {})}
        >
            {/* Hat */}
            <ellipse cx="40" cy="16" rx="16" ry="4" fill="#D4A843" opacity="0.6" />
            <path d="M30 16 L35 4 L45 4 L50 16" fill="#D4A843" opacity="0.5" />
            {/* Head */}
            <circle cx="40" cy="24" r="9" fill="#F5E6C8" opacity="0.6" stroke="#D4A843" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="37" cy="23" r="1.5" fill="#4A7C59" />
            <circle cx="43" cy="23" r="1.5" fill="#4A7C59" />
            {/* Smile */}
            <path d="M36 27 Q40 30 44 27" stroke="#4A7C59" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Straw hair */}
            <path d="M30 18 C28 14, 26 16, 28 20" stroke="#D4A843" strokeWidth="1.5" fill="none" />
            <path d="M50 18 C52 14, 54 16, 52 20" stroke="#D4A843" strokeWidth="1.5" fill="none" />
            {/* Cross pole */}
            <line x1="40" y1="33" x2="40" y2="65" stroke="#8B7355" strokeWidth="2.5" />
            <line x1="22" y1="40" x2="58" y2="40" stroke="#8B7355" strokeWidth="2.5" />
            {/* Shirt */}
            <path d="M32 33 L48 33 L50 50 L30 50 Z" fill="#4A7C59" opacity="0.3" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Arms / sleeves */}
            <path d="M30 40 L22 38 L20 42 L28 44" fill="#4A7C59" opacity="0.2" />
            <path d="M50 40 L58 38 L60 42 L52 44" fill="#4A7C59" opacity="0.2" />
            {/* Straw hands */}
            <path d="M20 38 C18 36, 16 38, 18 40" stroke="#D4A843" strokeWidth="1" />
            <path d="M60 38 C62 36, 64 38, 62 40" stroke="#D4A843" strokeWidth="1" />
            {/* Birds */}
            <path d="M14 30 C16 28, 18 28, 20 30" stroke="#4A7C59" strokeWidth="1" fill="none" />
            <path d="M62 26 C64 24, 66 24, 68 26" stroke="#4A7C59" strokeWidth="1" fill="none" />
        </motion.svg>
    );
}

/* ─── Sprout / Seedling (for general use) ─── */
export function SproutIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            {...(animate ? springIn(0) : {})}
        >
            {/* Soil */}
            <ellipse cx="32" cy="52" rx="16" ry="5" fill="#8B7355" opacity="0.3" />
            {/* Stem */}
            <path d="M32 52 C32 45, 30 40, 32 32" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Left leaf */}
            <path d="M32 38 C26 34, 20 32, 18 28 C22 28, 28 30, 32 38" fill="#6B8F3C" opacity="0.5" />
            <path d="M32 38 C27 34, 24 32, 22 30" stroke="#4A7C59" strokeWidth="0.8" fill="none" />
            {/* Right leaf */}
            <path d="M32 32 C38 28, 44 26, 46 22 C42 22, 36 24, 32 32" fill="#4A7C59" opacity="0.4" />
            <path d="M32 32 C37 28, 40 26, 42 24" stroke="#4A7C59" strokeWidth="0.8" fill="none" />
            {/* Top bud */}
            <path d="M32 32 C30 26, 28 22, 30 18 C32 22, 34 22, 34 18 C36 22, 34 26, 32 32" fill="#8BA142" opacity="0.5" />
        </motion.svg>
    );
}

/* ─── Tractor Icon (for About/General) ─── */
export function TractorIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} {...(animate ? slideIn(0) : {})}>
            {/* Body */}
            <rect x="20" y="30" width="30" height="20" rx="3" fill="#4A7C59" opacity="0.2" stroke="#4A7C59" strokeWidth="2" />
            {/* Cabin */}
            <path d="M35 18 L50 18 L50 30 L30 30 Z" fill="#4A7C59" opacity="0.15" stroke="#4A7C59" strokeWidth="1.5" />
            {/* Window */}
            <rect x="36" y="20" width="12" height="8" rx="1" fill="#6B8F3C" opacity="0.2" />
            {/* Exhaust */}
            <rect x="22" y="22" width="4" height="10" rx="1" fill="#8B7355" opacity="0.3" />
            <circle cx="24" cy="19" r="2" fill="#4A7C59" opacity="0.1" />
            {/* Big rear wheel */}
            <circle cx="25" cy="55" r="12" fill="#4A7C59" opacity="0.1" stroke="#4A7C59" strokeWidth="2.5" />
            <circle cx="25" cy="55" r="5" fill="#4A7C59" opacity="0.15" />
            {/* Front wheel */}
            <circle cx="52" cy="55" r="7" fill="#4A7C59" opacity="0.1" stroke="#4A7C59" strokeWidth="2" />
            <circle cx="52" cy="55" r="3" fill="#4A7C59" opacity="0.15" />
            {/* Hitch */}
            <line x1="58" y1="45" x2="70" y2="45" stroke="#8B7355" strokeWidth="2" />
            <circle cx="70" cy="45" r="2" fill="#8B7355" opacity="0.5" />
        </motion.svg>
    );
}

/* ─── Shield/Certificate (for About page) ─── */
export function CertificateIcon({ className = "", size = 64, animate = true }: AgroIconProps) {
    return (
        <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...(animate ? springIn(0) : {})}>
            {/* Shield */}
            <path d="M32 8 L52 16 L52 36 C52 48 42 56 32 60 C22 56 12 48 12 36 L12 16 Z" fill="#4A7C59" opacity="0.1" stroke="#4A7C59" strokeWidth="2" />
            {/* Checkmark */}
            <path d="M22 32 L28 38 L42 24" stroke="#6B8F3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Ribbon */}
            <path d="M26 52 L22 62 L28 58 L32 64 L36 58 L42 62 L38 52" fill="#D4A843" opacity="0.3" />
        </motion.svg>
    );
}
