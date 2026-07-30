"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Beaker, Leaf } from "lucide-react";
import type { SanityProduct } from "@/sanity/queries";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
    product: SanityProduct;
    index?: number;
}

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

const categoryIcons: Record<string, React.ReactNode> = {
    insecticide: <Beaker className="w-4 h-4" />,
    fungicide: <Leaf className="w-4 h-4" />,
    herbicide: <Leaf className="w-4 h-4" />,
    "plant-growth-regulator": <Leaf className="w-4 h-4" />,
    "bio-pesticide": <Leaf className="w-4 h-4" />,
    "agriculture-fertilizer": <Leaf className="w-4 h-4" />,
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const productHref = `/products/${product.slug}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <div className="group h-full flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Image Area */}
                <Link href={productHref} className="block">
                    {/* bg matches the off-white baked into the product photos so the
                        image edges blend seamlessly into the tile */}
                    <div className="relative h-48 overflow-hidden bg-[#FBF9F7]">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary-lighter/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <Leaf className="w-12 h-12 text-primary/40" />
                                </div>
                            </div>
                        )}
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
                                {categoryIcons[product.categorySlug]}
                                {product.category}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <Link href={productHref} className="block">
                        <h3 className="text-lg font-bold text-text-dark group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-text-light mt-1.5 leading-relaxed line-clamp-2">
                            {product.description}
                        </p>
                    </Link>

                    {/* Info */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.packaging.slice(0, 3).map((pkg) => (
                            <span
                                key={pkg}
                                className="px-2 py-0.5 bg-offwhite text-xs text-text-light rounded"
                            >
                                {pkg}
                            </span>
                        ))}
                        {product.packaging.length > 3 && (
                            <span className="px-2 py-0.5 bg-offwhite text-xs text-text-light rounded">
                                +{product.packaging.length - 3}
                            </span>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                        <a
                            href={getWhatsAppUrl(
                                `Hi, I would like to enquire about ${product.name}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#1ebe5d] transition-colors"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                            Enquire Now
                        </a>
                        <Link
                            href={productHref}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                        >
                            View Details
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
