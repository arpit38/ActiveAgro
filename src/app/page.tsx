"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Headphones,
  Leaf,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import StatsCounter from "@/components/StatsCounter";
import ProductCard from "@/components/ProductCard";
import FloatingParticles from "@/components/FloatingParticles";
import WavyDivider from "@/components/WavyDivider";
import GrowthVine from "@/components/GrowthVine";
import LeafRevealHero from "@/components/LeafRevealHero";
import {
  LaurelWreathIcon,
  ProductsBoxIcon,
  MarketStallIcon,
  FarmerIcon,
  PeopleGroupIcon,
  FactoryIcon,
  ScarecrowIcon,
} from "@/components/AgroIcons";
import { getFeaturedProducts, type SanityProduct } from "@/sanity/queries";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<SanityProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);
  const [perView, setPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getFeaturedProducts()
      .then(setFeaturedProducts)
      .catch((err) => console.error("Failed to load featured products:", err));
  }, []);

  // Width of one card plus the flex gap — the distance of a single slide step.
  // Measured from the DOM so it stays correct across the responsive card widths.
  const getStep = useCallback(() => {
    const el = carouselRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  // How many cards fit at the current breakpoint decides how far the track can go.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const measure = () => {
      const step = getStep();
      if (!step) return;
      const fits = Math.max(1, Math.round(el.clientWidth / step));
      setPerView(fits);
      setMaxSlide(Math.max(0, featuredProducts.length - fits));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [featuredProducts.length, getStep]);

  // Scroll position is the single source of truth, so native swipes, the arrows
  // and autoplay all stay in sync with the dots.
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    const step = getStep();
    if (!el || !step) return;
    setCurrentSlide(Math.round(el.scrollLeft / step));
  }, [getStep]);

  const scrollToSlide = useCallback(
    (index: number) => {
      const el = carouselRef.current;
      const step = getStep();
      if (!el || !step) return;
      el.scrollTo({ left: index * step, behavior: "smooth" });
    },
    [getStep]
  );

  // Arrows, dots and autoplay all move a full page (one screenful of cards) —
  // with 20 featured products, per-card steps would make the indicator crawl.
  const pageCount = Math.max(1, Math.ceil(featuredProducts.length / perView));
  // The last page is short whenever the count isn't a clean multiple of perView,
  // so hitting the end of the track counts as being on the final page.
  const activePage =
    currentSlide >= maxSlide ? pageCount - 1 : Math.floor(currentSlide / perView);

  const goToPage = useCallback(
    (page: number) => {
      const wrapped = ((page % pageCount) + pageCount) % pageCount;
      scrollToSlide(Math.min(wrapped * perView, maxSlide));
    },
    [pageCount, perView, maxSlide, scrollToSlide]
  );

  const nextSlide = useCallback(() => goToPage(activePage + 1), [goToPage, activePage]);
  const prevSlide = useCallback(() => goToPage(activePage - 1), [goToPage, activePage]);

  useEffect(() => {
    if (isPaused || maxSlide <= 0) return;
    const interval = setInterval(() => {
      const el = carouselRef.current;
      const step = getStep();
      if (!el || !step) return;
      const current = Math.round(el.scrollLeft / step);
      const page =
        current >= maxSlide ? pageCount - 1 : Math.floor(current / perView);
      const next = page + 1 >= pageCount ? 0 : page + 1;
      el.scrollTo({
        left: Math.min(next * perView, maxSlide) * step,
        behavior: "smooth",
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxSlide, perView, pageCount, getStep]);

  const certifications = [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "GMP Certified",
    "WHO-GMP",
    "REACH Compliant",
    "Ministry Approved",
  ];



  return (
    <>
      {/* Global overlays */}
      <GrowthVine />
      <FloatingParticles />

      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <LeafRevealHero />

      {/* Wave divider: hero → stats */}
      <WavyDivider topColor="#F8F5ED" bottomColor="#f8f7f2" />

      {/* ─── WHO WE ARE — STATS ────────────────────────────────────── */}
      <section className="relative py-16 bg-gradient-to-b from-offwhite to-white overflow-hidden">
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/40 via-transparent to-amber-50/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <ScarecrowIcon size={72} className="mx-auto mb-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
              Who we are
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { IconComp: LaurelWreathIcon, end: 15, suffix: "+", label: "Years of Experience" },
              { IconComp: ProductsBoxIcon, end: 300, suffix: "+", label: "Products" },
              { IconComp: MarketStallIcon, end: 20, suffix: "K+", label: "Dealer & Retailer Connect" },
              { IconComp: FarmerIcon, end: 8, suffix: " Crore+", label: "Happy Farmers" },
              { IconComp: PeopleGroupIcon, end: 1100, suffix: "+", label: "Employees" },
              { IconComp: FactoryIcon, end: 7, suffix: "", label: "Manufacturing Facilities" },
            ].map(({ IconComp, end, suffix, label }, index) => (
              <AnimatedSection key={label} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center mb-3">
                    <IconComp size={72} animate={false} />
                  </div>
                  <StatsCounter end={end} suffix={suffix} label={label} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ────────────────────────────────────────── */}
      <section className="relative py-20 bg-gradient-to-br from-white via-green-50/40 to-emerald-50/30 overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-offwhite to-primary/5 rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/15 to-primary-lighter/15 flex items-center justify-center">
                    <Leaf className="w-20 h-20 text-primary/30" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                About Active Agro Science
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3 leading-tight">
                Pioneering Crop Protection{" "}
                <span className="text-primary">Since 2011</span>
              </h2>
              <p className="text-text-light mt-5 leading-relaxed">
                Since 2011, Active Agro Science has been at the forefront of agricultural
                innovation, providing farmers with cutting-edge pesticides and fungicides
                that protect crops while respecting the environment.
              </p>
              <p className="text-text-light mt-4 leading-relaxed">
                Our commitment to quality, sustainability, and farmer prosperity has made
                us a trusted partner for over 10,000 farmers across 50 countries.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:gap-3 transition-all"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Wave divider: about → products */}
      <WavyDivider topColor="#ffffff" bottomColor="#f8f7f2" />

      {/* ─── FEATURED PRODUCTS CAROUSEL ───────────────────────────── */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
              Featured Products
            </h2>
            <p className="text-text-light mt-3 max-w-2xl mx-auto">
              Discover our most popular crop protection solutions trusted by farmers worldwide
            </p>
          </AnimatedSection>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Carousel — native horizontal scrolling, so touch swipe and
                trackpad gestures work without a gesture library */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              role="region"
              aria-label="Featured products"
              className="flex gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-hide pb-2"
            >
              {featuredProducts.map((product, index) => (
                <div
                  key={product.slug}
                  className="snap-start shrink-0 basis-[86%] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
                >
                  <ProductCard product={product} index={index % 3} />
                </div>
              ))}
            </div>

            {/* Controls — desktop only; on touch devices the swipe is the control */}
            {maxSlide > 0 && (
              <>
                <button
                  onClick={prevSlide}
                  className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Page indicator — dots while they stay readable, otherwise a
                progress bar (mobile shows one card per page, so 20 dots) */}
            {maxSlide > 0 &&
              (pageCount <= 8 ? (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`h-2.5 rounded-full transition-all ${activePage === i
                        ? "bg-primary w-7"
                        : "bg-gray-300 hover:bg-gray-400 w-2.5"
                        }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-8 mx-auto h-1 w-40 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((activePage + 1) / pageCount) * 100}%` }}
                  />
                </div>
              ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-lg font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wave divider: products → why choose us */}
      <WavyDivider topColor="#f8f7f2" bottomColor="#ffffff" />

      {/* ─── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="relative py-20 bg-gradient-to-bl from-white via-emerald-50/30 to-green-50/40 overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-[0.03]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
              Why Active Agro Science
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
              Why Choose Us
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "ISO certified products meeting international standards",
                color: "from-primary/10 to-primary/5",
                iconColor: "text-primary",
              },
              {
                icon: Headphones,
                title: "Expert Support",
                description: "24/7 technical support from agricultural specialists",
                color: "from-blue-500/10 to-blue-500/5",
                iconColor: "text-blue-500",
              },
              {
                icon: Leaf,
                title: "Sustainable Solutions",
                description: "Eco-friendly formulations for responsible farming",
                color: "from-primary-lighter/10 to-primary-lighter/5",
                iconColor: "text-primary-lighter",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "Trusted by thousands of farmers worldwide",
                color: "from-amber-500/10 to-amber-500/5",
                iconColor: "text-amber-500",
              },
            ].map(({ icon: Icon, title, description, color, iconColor }, index) => (
              <AnimatedSection key={title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl transition-shadow"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-text-dark">{title}</h3>
                  <p className="text-sm text-text-light mt-2 leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS MARQUEE ───────────────────────────────── */}
      <section className="py-14 bg-offwhite border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
              Trusted & Certified
            </span>
            <h3 className="text-xl font-bold text-text-dark mt-2">
              Our Certifications
            </h3>
          </AnimatedSection>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...certifications, ...certifications].map((cert, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 mx-6 px-8 py-4 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <Award className="w-8 h-8 text-primary" />
                <span className="text-sm font-semibold text-text-dark whitespace-nowrap">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Wave divider: certs → CTA */}
      <WavyDivider topColor="#f8f7f2" bottomColor="#1a5c2e" />

      {/* ─── CTA SECTION ──────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 leaf-pattern opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Protect Your Crops?
            </h2>
            <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
              Get in touch with our agricultural experts to find the perfect crop protection
              solution for your farm.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-offwhite transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border border-white/30 hover:bg-white/20 transition-all hover:-translate-y-0.5"
              >
                Browse Products
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
