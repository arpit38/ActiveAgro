"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Beaker, Leaf } from "lucide-react";
import type { SanityProduct } from "@/sanity/queries";

interface ProductCardProps {
    product: SanityProduct;
    index?: number;
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Link href={`/products/${product.slug}`} className="group block h-full">
                <div className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Image Area */}
                    <div className="relative h-48 bg-gradient-to-br from-offwhite to-primary/5 overflow-hidden">
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

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-text-dark group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-text-light mt-1.5 leading-relaxed line-clamp-2">
                            {product.description}
                        </p>

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
                        <div className="mt-4 flex items-center justify-end">
                            <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                View Details
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
