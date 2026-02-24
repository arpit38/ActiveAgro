"use client";

import { motion } from "framer-motion";
import {
    Award,
    Target,
    Eye,
    Users,
    Shield,
    Lightbulb,
    Heart,
    Star,
    Leaf,
    CheckCircle2,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {
    SproutIcon,
    TractorIcon,
    CertificateIcon,
    ScarecrowIcon,
} from "@/components/AgroIcons";

export default function AboutPage() {
    const certifications = [
        {
            name: "ISO 9001:2015",
            subtitle: "Quality Management System",
            description: "Certified for world-class quality standards in manufacturing and distribution",
            certNo: "QMS-AG-2023-001",
        },
        {
            name: "ISO 14001:2015",
            subtitle: "Environmental Management System",
            description: "Committed to environmentally responsible manufacturing processes",
            certNo: "EMS-AG-2023-002",
        },
        {
            name: "GMP Certified",
            subtitle: "Good Manufacturing Practices",
            description: "Adhering to international pharmaceutical-grade manufacturing standards",
            certNo: "GMP-AG-2023-003",
        },
        {
            name: "WHO-GMP",
            subtitle: "World Health Organization Standards",
            description: "Meeting WHO guidelines for pesticide manufacturing",
            certNo: "WHO-AG-2023-004",
        },
        {
            name: "REACH Compliant",
            subtitle: "European Chemical Regulation",
            description: "All products registered and compliant with EU REACH regulations",
            certNo: "REACH-2023-005",
        },
        {
            name: "National Accreditation",
            subtitle: "Ministry of Agriculture Approved",
            description: "Licensed and approved by national agricultural authorities",
            certNo: "MOA-2023-AG-006",
        },
    ];

    const team = [
        {
            name: "Dr. Rajesh Kumar",
            role: "Founder & CEO",
            bio: "Plant pathologist with 25+ years in agricultural research and innovation.",
        },
        {
            name: "Dr. Priya Sharma",
            role: "Chief Research Officer",
            bio: "Leading R&D in sustainable crop protection and bio-pesticide development.",
        },
        {
            name: "Vikram Patel",
            role: "Head of Operations",
            bio: "20+ years in chemical manufacturing and supply chain management.",
        },
        {
            name: "Dr. Anita Rao",
            role: "Quality Assurance Director",
            bio: "Expert in ISO quality systems and pharmaceutical-grade manufacturing.",
        },
        {
            name: "Suresh Menon",
            role: "Sales & Marketing Head",
            bio: "Strategic leader driving market expansion across 50+ countries.",
        },
        {
            name: "Dr. Meera Joshi",
            role: "Agricultural Scientist",
            bio: "Specializes in field trials and farmer education programs.",
        },
    ];

    const values = [
        { icon: Shield, name: "Integrity", description: "Transparent and ethical business practices" },
        { icon: Lightbulb, name: "Innovation", description: "Continuous research and development" },
        { icon: Leaf, name: "Sustainability", description: "Eco-friendly products and processes" },
        { icon: Heart, name: "Customer Focus", description: "Putting farmers first in everything we do" },
        { icon: Star, name: "Excellence", description: "Uncompromising quality standards" },
    ];

    return (
        <>
            {/* Hero Banner */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 leaf-pattern opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        About Active Agro Science
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-white/80 mt-4 text-lg max-w-2xl mx-auto"
                    >
                        Pioneering agricultural innovation since 2009
                    </motion.p>
                </div>
            </section>

            {/* Company Story */}
            <section className="relative py-20 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 overflow-hidden">
                <div className="absolute inset-0 leaf-pattern opacity-[0.03]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <AnimatedSection direction="left">
                            <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3 leading-tight">
                                A Legacy of{" "}
                                <span className="text-primary">Agricultural Excellence</span>
                            </h2>
                            <div className="mt-6 space-y-4 text-text-light leading-relaxed">
                                <p>
                                    Founded in 2009, Active Agro Science emerged from a vision to revolutionize
                                    crop protection in modern agriculture. What began as a small research initiative
                                    has grown into a leading provider of innovative agricultural solutions, serving
                                    farmers across 50 countries.
                                </p>
                                <p>
                                    Our journey started when our founder, Dr. Rajesh Kumar, a plant pathologist
                                    with over 25 years of experience, recognized the need for more effective and
                                    environmentally responsible crop protection products. Today, we combine
                                    cutting-edge research with traditional agricultural wisdom to create solutions
                                    that work in harmony with nature.
                                </p>
                                <p>
                                    We operate state-of-the-art manufacturing facilities spanning 50,000 square feet,
                                    equipped with advanced testing laboratories and quality control systems. Our team
                                    of 200+ dedicated professionals, including agronomists, chemists, and field experts,
                                    work tirelessly to ensure every product meets the highest standards of efficacy and safety.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <div className="relative">
                                <div className="w-full h-96 bg-gradient-to-br from-offwhite to-primary/5 rounded-2xl overflow-hidden flex items-center justify-center">
                                    <div className="text-center">
                                        <TractorIcon size={120} className="mx-auto" />
                                        <p className="text-text-light text-sm mt-4">50,000 sq ft Manufacturing Facility</p>
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-offwhite leaf-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <SproutIcon size={56} className="mx-auto mb-2" />
                            <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
                                Our Mission
                            </h2>
                        </div>
                        <p className="text-text-light text-center leading-relaxed text-lg">
                            To empower farmers with innovative, sustainable, and effective crop protection
                            solutions that enhance agricultural productivity while preserving environmental health.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                            {[
                                "Developing products that maximize crop yield and quality",
                                "Ensuring farmer prosperity through reliable and affordable solutions",
                                "Promoting sustainable agricultural practices",
                                "Contributing to global food security",
                                "Supporting rural communities through education and training",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-text-dark">{item}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Vision */}
            <section className="relative py-20 bg-gradient-to-bl from-white via-emerald-50/20 to-green-50/30 overflow-hidden">
                <div className="absolute inset-0 leaf-pattern opacity-[0.03]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <CertificateIcon size={56} className="mx-auto mb-2" />
                            <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
                                Our Vision
                            </h2>
                        </div>
                        <p className="text-text-light text-center leading-relaxed text-lg">
                            To be the most trusted global partner in agricultural crop protection,
                            recognized for innovation, sustainability, and unwavering commitment to farmer success.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                            {[
                                "Every farmer has access to world-class crop protection solutions",
                                "Agricultural productivity harmonizes with environmental conservation",
                                "Technology and tradition work together for sustainable farming",
                                "Our products contribute to feeding a growing global population",
                                "Farming communities thrive with dignity and prosperity",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 bg-offwhite p-4 rounded-xl"
                                >
                                    <Star className="w-5 h-5 text-primary-lighter flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-text-dark">{item}</span>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 bg-offwhite">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-12">
                        <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                            Quality Assurance
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
                            Certifications &amp; Accreditations
                        </h2>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <AnimatedSection key={cert.name} delay={index * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-white rounded-2xl border-2 border-primary/10 p-6 hover:border-primary/30 hover:shadow-xl transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Award className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-dark">{cert.name}</h3>
                                            <p className="text-xs text-primary-lighter font-medium">
                                                {cert.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-light leading-relaxed">
                                        {cert.description}
                                    </p>
                                    <p className="text-xs text-text-light mt-3 font-mono bg-offwhite px-3 py-1.5 rounded-lg inline-block">
                                        {cert.certNo}
                                    </p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="relative py-20 bg-gradient-to-br from-white via-green-50/20 to-emerald-50/20 overflow-hidden">
                <div className="absolute inset-0 leaf-pattern opacity-[0.03]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-12">
                        <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                            Meet Our Experts
                        </span>
                        <ScarecrowIcon size={60} className="mx-auto mb-2" />
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
                            Our Leadership Team
                        </h2>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, index) => (
                            <AnimatedSection key={member.name} delay={index * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                                >
                                    <div className="h-32 bg-gradient-to-br from-primary/10 to-primary-lighter/10 flex items-center justify-center">
                                        <Users className="w-14 h-14 text-primary/20" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-text-dark">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm font-medium text-primary mt-0.5">
                                            {member.role}
                                        </p>
                                        <p className="text-sm text-text-light mt-3 leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-offwhite">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-12">
                        <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                            What Drives Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
                            Our Core Values
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {values.map(({ icon: Icon, name, description }, index) => (
                            <AnimatedSection key={name} delay={index * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-text-dark text-sm">{name}</h3>
                                    <p className="text-xs text-text-light mt-1.5">{description}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
