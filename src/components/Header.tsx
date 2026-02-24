"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Search,
    Phone,
    Leaf,
} from "lucide-react";
import {
    getAllCategories,
    getAllProducts,
    type SanityCategory,
    type SanityProduct,
} from "@/sanity/queries";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
    const [categories, setCategories] = useState<SanityCategory[]>([]);
    const [products, setProducts] = useState<SanityProduct[]>([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
        getAllProducts().then(setProducts);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Products", href: "/products", hasDropdown: true },
        { name: "Contact Us", href: "/contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white shadow-lg py-2"
                : "bg-white/90 backdrop-blur-md py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-lighter rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-primary leading-tight">
                                Active Agro Science
                            </h1>
                            <p className="text-[10px] text-primary-light font-medium tracking-wider uppercase -mt-0.5">
                                Farmers Always Active
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() =>
                                    link.hasDropdown && setIsProductsOpen(true)
                                }
                                onMouseLeave={() =>
                                    link.hasDropdown && setIsProductsOpen(false)
                                }
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-dark hover:text-primary transition-colors rounded-lg hover:bg-offwhite"
                                >
                                    {link.name}
                                    {link.hasDropdown && (
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    )}
                                </Link>

                                {/* Mega Dropdown */}
                                {link.hasDropdown && (
                                    <AnimatePresence>
                                        {isProductsOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex"
                                                style={{ width: '680px' }}
                                                onMouseEnter={() => setIsProductsOpen(true)}
                                                onMouseLeave={() => { setIsProductsOpen(false); setHoveredCategory(null); }}
                                            >
                                                {/* Left: Categories */}
                                                <div className="w-64 border-r border-gray-100 p-2 bg-gray-50/50">
                                                    {categories.map((cat) => (
                                                        <div
                                                            key={cat.slug}
                                                            onMouseEnter={() => setHoveredCategory(cat.slug)}
                                                        >
                                                            <Link
                                                                href={`/products?category=${cat.slug}`}
                                                                className={`flex items-center justify-between gap-2 p-3 rounded-lg transition-colors group ${hoveredCategory === cat.slug ? 'bg-primary/10 text-primary' : 'hover:bg-offwhite text-text-dark'
                                                                    }`}
                                                                onClick={() => setIsProductsOpen(false)}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${hoveredCategory === cat.slug ? 'bg-primary/20' : 'bg-primary/10'
                                                                        }`}>
                                                                        <Leaf className="w-3.5 h-3.5 text-primary" />
                                                                    </div>
                                                                    <span className="text-sm font-medium">{cat.name}</span>
                                                                </div>
                                                                <ChevronRight className={`w-4 h-4 transition-colors ${hoveredCategory === cat.slug ? 'text-primary' : 'text-gray-300'
                                                                    }`} />
                                                            </Link>
                                                        </div>
                                                    ))}
                                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                                        <Link
                                                            href="/products"
                                                            className="block text-center text-sm font-medium text-primary hover:bg-offwhite p-2.5 rounded-lg transition-colors"
                                                            onClick={() => setIsProductsOpen(false)}
                                                        >
                                                            View All Products →
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Right: Products for hovered category */}
                                                <div className="flex-1 p-3 max-h-[400px] overflow-y-auto">
                                                    <p className="text-xs font-semibold text-text-light uppercase tracking-wider mb-2 px-2">
                                                        {categories.find(c => c.slug === (hoveredCategory || categories[0].slug))?.name}
                                                    </p>
                                                    <div className="space-y-0.5">
                                                        {products.filter(p => p.categorySlug === (hoveredCategory || categories[0]?.slug)).map((product) => (
                                                            <Link
                                                                key={product.slug}
                                                                href={`/products/${product.slug}`}
                                                                className="block px-3 py-2 text-sm text-text-dark hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                                                onClick={() => setIsProductsOpen(false)}
                                                            >
                                                                {product.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 rounded-lg hover:bg-offwhite transition-colors text-text-light hover:text-primary"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 280 }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="absolute right-0 top-full mt-2"
                                    >
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (searchQuery.trim()) {
                                                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                                                }
                                            }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-lg"
                                                autoFocus
                                            />
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/contact"
                            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5"
                        >
                            <Phone className="w-4 h-4" />
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-offwhite transition-colors"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        {isMobileOpen ? (
                            <X className="w-6 h-6 text-text-dark" />
                        ) : (
                            <Menu className="w-6 h-6 text-text-dark" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                            {/* Mobile Search */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (searchQuery.trim()) {
                                        window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                                        setIsMobileOpen(false);
                                    }
                                }}
                                className="mb-4"
                            >
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-offwhite border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                </div>
                            </form>

                            <Link
                                href="/"
                                className="block px-4 py-3 text-sm font-medium text-text-dark hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="block px-4 py-3 text-sm font-medium text-text-dark hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                About Us
                            </Link>

                            {/* Mobile Products Accordion */}
                            <div>
                                <button
                                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-dark hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                >
                                    Products
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isProductsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 space-y-0.5">
                                                {categories.map((cat) => (
                                                    <div key={cat.slug}>
                                                        <button
                                                            onClick={() => setMobileExpandedCat(mobileExpandedCat === cat.slug ? null : cat.slug)}
                                                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-text-dark hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                                        >
                                                            {cat.name}
                                                            <ChevronDown
                                                                className={`w-3.5 h-3.5 transition-transform ${mobileExpandedCat === cat.slug ? "rotate-180" : ""}`}
                                                            />
                                                        </button>
                                                        <AnimatePresence>
                                                            {mobileExpandedCat === cat.slug && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="pl-4 space-y-0.5 pb-1">
                                                                        {products.filter(p => p.categorySlug === cat.slug).map((product) => (
                                                                            <Link
                                                                                key={product.slug}
                                                                                href={`/products/${product.slug}`}
                                                                                className="block px-4 py-2 text-xs text-text-light hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                                                                onClick={() => setIsMobileOpen(false)}
                                                                            >
                                                                                {product.name}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                                <Link
                                                    href="/products"
                                                    className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-offwhite rounded-lg transition-colors"
                                                    onClick={() => setIsMobileOpen(false)}
                                                >
                                                    View All Products →
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/contact"
                                className="block px-4 py-3 text-sm font-medium text-text-dark hover:text-primary hover:bg-offwhite rounded-lg transition-colors"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                Contact Us
                            </Link>

                            <div className="pt-3 border-t border-gray-100">
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-5 py-3 rounded-lg text-sm font-medium"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    <Phone className="w-4 h-4" />
                                    Get Quote
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
