"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, Leaf, Loader2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import {
    getAllProducts,
    getAllCategories,
    type SanityProduct,
    type SanityCategory,
} from "@/sanity/queries";

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    const [products, setProducts] = useState<SanityProduct[]>([]);
    const [categories, setCategories] = useState<SanityCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>(
        categoryParam || "all"
    );
    const [searchQuery, setSearchQuery] = useState(searchParam || "");

    // Fetch data from Sanity
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [prods, cats] = await Promise.all([
                getAllProducts(),
                getAllCategories(),
            ]);
            setProducts(prods);
            setCategories(cats);
        } catch (err) {
            console.error("Failed to fetch from Sanity:", err);
            setError("Unable to load products. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (categoryParam) setSelectedCategory(categoryParam);
        if (searchParam) setSearchQuery(searchParam);
    }, [categoryParam, searchParam]);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (selectedCategory !== "all") {
            filtered = filtered.filter((p) => p.categorySlug === selectedCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.activeIngredient.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.crops.toLowerCase().includes(q)
            );
        }

        return filtered;
    }, [products, selectedCategory, searchQuery]);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 leaf-pattern opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        Our Products
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-white/80 mt-4 text-lg max-w-2xl mx-auto"
                    >
                        Comprehensive crop protection solutions for modern farming
                    </motion.p>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products by name, ingredient, or crop..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Filter className="w-5 h-5 text-text-light flex-shrink-0" />
                            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === "all"
                                        ? "bg-primary text-white"
                                        : "bg-offwhite text-text-dark hover:bg-primary/10"
                                        }`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.slug}
                                        onClick={() => setSelectedCategory(cat.slug)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.slug
                                            ? "bg-primary text-white"
                                            : "bg-offwhite text-text-dark hover:bg-primary/10"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 bg-offwhite min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <span className="ml-3 text-text-light">Loading products...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Leaf className="w-16 h-16 text-red-300 mb-4" />
                            <h3 className="text-xl font-bold text-text-dark">Connection Error</h3>
                            <p className="text-text-light mt-2 max-w-md text-center">{error}</p>
                            <button
                                onClick={fetchData}
                                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Results count */}
                            <p className="text-sm text-text-light mb-6">
                                Showing {filteredProducts.length} product
                                {filteredProducts.length !== 1 ? "s" : ""}
                                {selectedCategory !== "all" &&
                                    ` in ${categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}`}
                                {searchQuery && ` matching "${searchQuery}"`}
                            </p>

                            {filteredProducts.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.slug}
                                            product={product}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <AnimatedSection className="text-center py-20">
                                    <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-text-dark">
                                        No products found
                                    </h3>
                                    <p className="text-text-light mt-2">
                                        Try adjusting your search or filter criteria
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory("all");
                                            setSearchQuery("");
                                        }}
                                        className="mt-4 text-primary font-medium hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </AnimatedSection>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
