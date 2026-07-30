"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Sprout } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getBioPesticides, type SanityBioPesticide } from "@/sanity/queries";

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

export default function BioPesticidesPage() {
    const [products, setProducts] = useState<SanityBioPesticide[]>([]);

    useEffect(() => {
        getBioPesticides()
            .then(setProducts)
            .catch((err) => console.error("Failed to load bio-pesticides:", err));
    }, []);

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
                        <Leaf className="w-4 h-4" />
                        Eco-friendly crop protection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mt-5"
                    >
                        Bio-Pesticides
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/80 mt-4 text-lg max-w-2xl mx-auto"
                    >
                        Naturally derived biological solutions for safe, sustainable pest
                        and disease management.
                    </motion.p>
                </div>
            </section>

            {/* ─── PRODUCT GRID ─────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, i) => (
                            <AnimatedSection key={product._id} delay={(i % 3) * 0.1}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-offwhite rounded-2xl border border-gray-100 p-8 text-center hover:shadow-xl transition-shadow"
                                >
                                    <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5">
                                        <Sprout className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-dark">
                                        {product.name}
                                    </h3>
                                    <a
                                        href={getWhatsAppUrl(
                                            `Hi, I would like to enquire about ${product.name}.`
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-medium mt-4 hover:bg-[#1ebe5d] transition-colors"
                                    >
                                        <WhatsAppIcon className="w-4 h-4" />
                                        Enquire Now
                                    </a>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* WhatsApp contact button */}
                    <AnimatedSection className="text-center mt-14">
                        <a
                            href={getWhatsAppUrl(
                                "Hi, I would like to enquire about your bio-pesticide products."
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25D366]/25 transition-all hover:-translate-y-0.5"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Enquire on WhatsApp
                        </a>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
