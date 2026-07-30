"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Sprout,
    Bug,
    ShieldCheck,
    Droplets,
    Globe2,
    Ship,
    Package,
    BadgeCheck,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getExportProducts, type SanityExportProduct } from "@/sanity/queries";

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.116 1.526 5.845L.057 23.571a.75.75 0 0 0 .92.921l5.834-1.527A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.508-5.219-1.396l-.374-.22-3.863 1.011 1.026-3.757-.242-.387A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
    );
}

// ─── Category display metadata ────────────────────────────────
// Category content itself is managed in Sanity Studio ("Export Products").
// This just controls icon/order for the fixed set of category labels.
const categoryMeta: { name: string; icon: typeof Sprout }[] = [
    { name: "Herbicides", icon: Sprout },
    { name: "Fungicides", icon: ShieldCheck },
    { name: "Insecticides", icon: Bug },
    { name: "Plant Growth Regulators", icon: Droplets },
];

export default function ExportPage() {
    const [exportProducts, setExportProducts] = useState<SanityExportProduct[]>([]);

    useEffect(() => {
        getExportProducts()
            .then(setExportProducts)
            .catch((err) => console.error("Failed to load export products:", err));
    }, []);

    const categories = categoryMeta
        .map((meta) => ({
            ...meta,
            products: exportProducts.filter((p) => p.category === meta.name),
        }))
        .filter((cat) => cat.products.length > 0);

    const totalProducts = exportProducts.length;

    return (
        <>
            {/* ─── HERO ─────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 leaf-pattern opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20"
                    >
                        <Globe2 className="w-4 h-4" />
                        Exporting across Asia &amp; beyond
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mt-5"
                    >
                        Export Products
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/80 mt-4 text-lg max-w-2xl mx-auto"
                    >
                        A complete range of crop protection formulations and technicals,
                        supplied in bulk to partners across Asia and international markets.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-8 flex justify-center"
                    >
                        <a
                            href={getWhatsAppUrl(
                                "Hi, I would like to enquire about your bulk export products."
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25D366]/25 transition-all hover:-translate-y-0.5"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Enquire on WhatsApp
                        </a>
                    </motion.div>

                    {/* International Registration */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-14 max-w-3xl mx-auto"
                    >
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 sm:p-10 text-center">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                                <BadgeCheck className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                International Registration
                            </h2>
                            <p className="text-white/80 mt-3 leading-relaxed max-w-2xl mx-auto">
                                Registration of agrochemicals in the Middle East (Oman,
                                Saudi Arabia, Iran, Ethiopia, Yemen, Jordan), African
                                countries (Egypt, Sudan, Kenya, Morocco, Uganda, Tanzania,
                                Zambia, etc.), Asia (Pakistan, Bangladesh, China), Europe
                                and more.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── EXPORT HIGHLIGHTS ────────────────────────────────── */}
            <section className="py-14 bg-offwhite border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Package,
                                title: "Bulk Supply",
                                desc: "Large-volume orders fulfilled with consistent, certified quality.",
                            },
                            {
                                icon: Globe2,
                                title: "Asia-Wide Reach",
                                desc: "Trusted distribution partners across Asian and global markets.",
                            },
                            {
                                icon: Ship,
                                title: "Reliable Logistics",
                                desc: "Streamlined documentation and dependable export shipping.",
                            },
                        ].map(({ icon: Icon, title, desc }, i) => (
                            <AnimatedSection key={title} delay={i * 0.1}>
                                <div className="h-full bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5">
                                        <Icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-dark">{title}</h3>
                                    <p className="text-sm text-text-light mt-2 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PRODUCT CATALOGUE ────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-14">
                        <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                            Export Catalogue
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
                            Products We Export
                        </h2>
                        <p className="text-text-light mt-3 max-w-2xl mx-auto">
                            {totalProducts}+ formulations and technicals across herbicides,
                            fungicides, insecticides and more.
                        </p>
                    </AnimatedSection>

                    <div className="space-y-12">
                        {categories.map((cat, catIndex) => {
                            const Icon = cat.icon;
                            return (
                                <AnimatedSection key={cat.name} delay={catIndex * 0.05}>
                                    <div className="bg-offwhite rounded-2xl border border-gray-100 overflow-hidden">
                                        {/* Category header */}
                                        <div className="flex items-center gap-4 px-6 sm:px-8 py-5 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-text-dark">
                                                    {cat.name}
                                                </h3>
                                                <p className="text-xs text-text-light mt-0.5">
                                                    {cat.products.length}{" "}
                                                    {cat.products.length === 1
                                                        ? "product"
                                                        : "products"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Product list */}
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 px-6 sm:px-8 py-6">
                                            {cat.products.map((product) => (
                                                <li
                                                    key={product._id}
                                                    className="flex items-start gap-3 py-2.5 border-b border-gray-100/80 last:border-0 md:[&:nth-last-child(2)]:border-0"
                                                >
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-lighter flex-shrink-0" />
                                                    <span className="text-sm text-text-dark leading-relaxed">
                                                        {product.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── CTA ──────────────────────────────────────────────── */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 leaf-pattern opacity-20" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Looking to Import in Bulk?
                        </h2>
                        <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
                            Share your requirements and our export team will get back to you
                            with pricing, documentation and shipping details.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <a
                                href={getWhatsAppUrl(
                                    "Hi, I would like to enquire about your bulk export products."
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1ebe5d] hover:shadow-xl hover:shadow-[#25D366]/25 transition-all hover:-translate-y-0.5"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                Chat With Our Export Team
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
