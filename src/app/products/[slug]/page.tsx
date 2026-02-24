"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Package,
    Droplets,
    Target,
    Leaf,
    Download,
    ShoppingCart,
    CheckCircle2,
    FlaskRound,
    Sprout,
    Clock,
    AlertTriangle,
    Award,
    Loader2,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FAQAccordion from "@/components/FAQAccordion";
import ProductCard from "@/components/ProductCard";
import ProductEnquiryModal from "@/components/ProductEnquiryModal";
import {
    getProductBySlug,
    getSuggestedProducts,
    type SanityProduct,
} from "@/sanity/queries";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    const { slug } = use(params);
    const [product, setProduct] = useState<SanityProduct | null>(null);
    const [suggested, setSuggested] = useState<SanityProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const prod = await getProductBySlug(slug);
                setProduct(prod);
                if (prod) {
                    const sugg = await getSuggestedProducts(prod.slug, prod.categorySlug);
                    setSuggested(sugg);
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-3 text-text-light">Loading product...</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-text-dark">
                        Product Not Found
                    </h2>
                    <p className="text-text-light mt-2">
                        The product you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 mt-4 text-primary font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "features", label: "Features & Benefits" },
        { id: "technical", label: "Technical Specs" },
        { id: "dosage", label: "Dosage & Application" },
        { id: "safety", label: "Safety Precautions" },
        { id: "certifications", label: "Certifications" },
    ];

    const targetInfo = product.targetPests || product.targetDiseases || product.targetWeeds || product.targetEffect || product.purpose || "";

    return (
        <>
            {/* Breadcrumb */}
            <div className="pt-24 pb-4 bg-offwhite border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-text-light">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                        <span>/</span>
                        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-primary transition-colors">{product.category}</Link>
                        <span>/</span>
                        <span className="text-text-dark font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Hero */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Product Image */}
                        <AnimatedSection direction="left">
                            <div className="relative bg-gradient-to-br from-offwhite to-primary/5 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-contain p-6"
                                        priority
                                    />
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/15 to-primary-lighter/15 flex items-center justify-center"
                                    >
                                        <Leaf className="w-24 h-24 text-primary/30" />
                                    </motion.div>
                                )}
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-medium">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Product Info */}
                        <AnimatedSection direction="right">
                            <h1 className="text-3xl md:text-4xl font-bold text-text-dark">
                                {product.name}
                            </h1>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <FlaskRound className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-text-light">
                                        <strong className="text-text-dark">Active Ingredient:</strong>{" "}
                                        {product.activeIngredient}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-text-light">
                                        <strong className="text-text-dark">Packaging:</strong>{" "}
                                        {product.packaging.join(", ")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Target className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-text-light">
                                        <strong className="text-text-dark">Target:</strong>{" "}
                                        {targetInfo}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Sprout className="w-5 h-5 text-primary" />
                                    <span className="text-sm text-text-light">
                                        <strong className="text-text-dark">Crops:</strong>{" "}
                                        {product.crops}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-6">
                                <button
                                    onClick={() => setIsEnquiryOpen(true)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-7 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Enquire Now
                                </button>
                                <button className="flex items-center gap-2 border-2 border-primary text-primary px-7 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                                    <Download className="w-5 h-5" />
                                    Download Brochure
                                </button>
                            </div>

                            <p className="text-sm text-text-light mt-6 leading-relaxed">
                                {product.description}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="py-12 bg-offwhite">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tab Navigation */}
                    <div className="flex overflow-x-auto gap-1 pb-1 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? "bg-primary text-white"
                                    : "bg-white text-text-dark hover:bg-primary/10"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl border border-gray-100 p-8"
                    >
                        {activeTab === "overview" && (
                            <div>
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Product Overview
                                </h3>
                                <p className="text-text-light leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                    <div className="flex items-start gap-3 p-4 bg-offwhite rounded-xl">
                                        <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-text-dark text-sm">
                                                Active Ingredient
                                            </p>
                                            <p className="text-sm text-text-light mt-0.5">
                                                {product.activeIngredient}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-offwhite rounded-xl">
                                        <Sprout className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-text-dark text-sm">
                                                Suitable Crops
                                            </p>
                                            <p className="text-sm text-text-light mt-0.5">
                                                {product.crops}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "features" && (
                            <div>
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Features & Benefits
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {product.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-4 bg-offwhite rounded-xl"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-text-dark">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "technical" && (
                            <div>
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Technical Specifications
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <tbody className="divide-y divide-gray-100">
                                            <tr><td className="py-3 font-medium text-text-dark w-48">Product Name</td><td className="py-3 text-text-light">{product.name}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Category</td><td className="py-3 text-text-light">{product.category}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Active Ingredient</td><td className="py-3 text-text-light">{product.activeIngredient}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Available Packaging</td><td className="py-3 text-text-light">{product.packaging.join(", ")}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Target</td><td className="py-3 text-text-light">{targetInfo}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Recommended Crops</td><td className="py-3 text-text-light">{product.crops}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Application Method</td><td className="py-3 text-text-light">{product.applicationMethod}</td></tr>
                                            <tr><td className="py-3 font-medium text-text-dark">Dosage</td><td className="py-3 text-text-light">{product.dosage}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === "dosage" && (
                            <div>
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Dosage & Application
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-4 bg-offwhite rounded-xl">
                                        <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-text-dark text-sm">Recommended Dosage</p>
                                            <p className="text-sm text-text-light mt-0.5">{product.dosage}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-offwhite rounded-xl">
                                        <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-text-dark text-sm">Application Method</p>
                                            <p className="text-sm text-text-light mt-0.5">{product.applicationMethod}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                                        <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-text-dark text-sm">Best Time to Apply</p>
                                            <p className="text-sm text-text-light mt-0.5">
                                                Apply during early morning or late evening when temperature is moderate and wind speed is low.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "safety" && (
                            <div>
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Safety Precautions
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        "Wear protective clothing, gloves, and mask during application",
                                        "Do not eat, drink, or smoke while handling the product",
                                        "Avoid contact with skin, eyes, and clothing",
                                        "Wash hands thoroughly with soap and water after handling",
                                        "Store in original container in a cool, dry place away from food",
                                        "Keep out of reach of children and animals",
                                        "Dispose of empty containers safely as per local regulations",
                                        "In case of accidental ingestion, seek medical attention immediately",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-text-dark">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "certifications" && (
                            <div>
                                <h3 className="text-xl font-bold text-text-dark mb-4">
                                    Product Certifications
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { name: "ISO 9001:2015", desc: "Quality Management System certified" },
                                        { name: "GMP Certified", desc: "Good Manufacturing Practices compliant" },
                                        { name: "REACH Compliant", desc: "European Chemical Regulation compliant" },
                                        { name: "Ministry Approved", desc: "National agricultural authority approved" },
                                    ].map((cert, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-offwhite rounded-xl border border-primary/10">
                                            <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-text-dark text-sm">{cert.name}</p>
                                                <p className="text-sm text-text-light mt-0.5">{cert.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-text-dark">
                            Frequently Asked Questions
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection>
                        <FAQAccordion faqs={product.faqs} />
                    </AnimatedSection>
                </div>
            </section>

            {/* Suggested Products */}
            {suggested.length > 0 && (
                <section className="py-12 bg-offwhite">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection className="mb-8">
                            <h2 className="text-2xl font-bold text-text-dark">
                                You May Also Like
                            </h2>
                        </AnimatedSection>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {suggested.map((p, i) => (
                                <ProductCard key={p.slug} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 leaf-pattern opacity-20" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Interested in {product.name}?
                    </h2>
                    <p className="text-white/80 mt-3">
                        Contact our agricultural experts for pricing, bulk orders, and technical guidance.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <button
                            onClick={() => setIsEnquiryOpen(true)}
                            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-offwhite transition-all hover:-translate-y-0.5"
                        >
                            Enquire Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold border border-white/30 hover:bg-white/20 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Enquiry Modal */}
            <ProductEnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                productName={product.name}
            />
        </>
    );
}
