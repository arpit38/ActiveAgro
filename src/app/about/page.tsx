"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Award,
    Shield,
    Lightbulb,
    Heart,
    Leaf,
    Truck,
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
            name: "Afreen Firdous",
            role: "CEO",
            image: "/images/CEO_headshot.jpeg",
        },
        {
            name: "MD Babu Molla",
            role: "Business Head",
            image: "/images/Business_Head_headshot.jpeg",
        },
    ];

    const whyChoose = [
        {
            icon: Lightbulb,
            title: "Advanced Research & Development",
            description: "Pioneering innovative solutions for evolving agricultural challenges.",
        },
        {
            icon: Leaf,
            title: "Sustainable & Eco-friendly Innovations",
            description: "Committed to reducing environmental impact while improving efficiency.",
        },
        {
            icon: Heart,
            title: "Farmer-Centric Approach",
            description: "Developing products that empower farmers with better yields and profitability.",
        },
        {
            icon: Shield,
            title: "Uncompromised Quality",
            description: "Manufacturing under stringent quality controls for superior product efficacy.",
        },
        {
            icon: Truck,
            title: "Efficient Supply Chain & Fast Delivery",
            description: "Ensuring timely delivery and seamless distribution across India to meet urgent agricultural needs.",
        },
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
                        Pioneering agricultural innovation since 2011
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
                                    Active Agro Science entered the Indian crop protection and pest
                                    management solutions market in the year 2011. With our innovative
                                    grassroots approach, and a strong sales &amp; marketing network, we are
                                    today one of the leading contenders for the top spot in the
                                    agro-chemical space in India.
                                </p>
                                <p>
                                    Since our inception we have been working with farmers on a one-on-one
                                    basis. This has helped us understand their problems and needs more
                                    closely. Based on our interactions we have formulated a wide range of
                                    50+ herbicides, insecticides and fungicides, which also include certain
                                    tailor-made products specifically intended for the Indian agricultural
                                    landscape.
                                </p>
                                <p>
                                    In our products, our customers find comprehensive crop protection and
                                    pest management solutions which are manufactured in our state-of-the-art
                                    facility in Kolkata, West Bengal. World-class technology is assembled and
                                    put into place to ensure the highest quality standards required to
                                    safeguard crops and give maximum yield to the farmers.
                                </p>
                                <p>
                                    Going further, Active Agro Science envisions to be the leader in its
                                    business by widening its product range, and offering farmers varied
                                    solutions in crop protection thus ensuring higher quantum of harvest, and
                                    better returns for their produce.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection direction="right">
                            <div className="relative">
                                <div className="w-full h-96 bg-gradient-to-br from-offwhite to-primary/5 rounded-2xl overflow-hidden flex items-center justify-center">
                                    <div className="text-center">
                                        <TractorIcon size={120} className="mx-auto" />
                                        <p className="text-text-light text-sm mt-4">State-of-the-Art Manufacturing Facility</p>
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Why Choose */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-12">
                        <span className="text-sm font-semibold text-primary-lighter uppercase tracking-wider">
                            Our Advantage
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-dark mt-3">
                            Why Choose Active Agro Science?
                        </h2>
                    </AnimatedSection>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChoose.map(({ icon: Icon, title, description }, index) => (
                            <AnimatedSection key={title} delay={index * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full flex items-start gap-4 bg-offwhite rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-primary/20 transition-all"
                                >
                                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-dark">{title}</h3>
                                        <p className="text-sm text-text-light mt-1.5 leading-relaxed">
                                            {description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Services */}
            <section className="relative py-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                <div className="absolute inset-0 leaf-pattern opacity-10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Our Services
                        </h2>
                        <p className="text-white/80 leading-relaxed text-lg mb-10">
                            At Active Agro Science, we specialize in B2B and P2P partnerships,
                            delivering high-performance crop protection solutions to agro-dealers,
                            distributors, and agribusinesses. Our services ensure efficiency,
                            reliability, and sustainability, helping you grow your business with
                            confidence.
                        </p>
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Tailored Crop Protection Solutions",
                                    description: "Custom-formulated pesticides designed for large-scale farms, distributors, and agro-businesses, ensuring maximum effectiveness for different crops and pest challenges.",
                                },
                                {
                                    title: "Private Label & Bulk Supply",
                                    description: "Expand your brand with custom packaging, white-label solutions, and flexible bulk supply options, giving you a competitive edge in the market.",
                                },
                                {
                                    title: "Fast & Reliable Supply Chain",
                                    description: "With an optimized logistics network, we guarantee on-time deliveries and seamless product availability, preventing stock shortages and ensuring smooth operations.",
                                },
                                {
                                    title: "Sustainable & Eco-Friendly Products",
                                    description: "We offer biodegradable and low-toxicity pesticides, meeting global sustainability standards while ensuring powerful pest control with minimal environmental impact.",
                                },
                            ].map((service, index) => (
                                <AnimatedSection key={service.title} delay={index * 0.08} direction="left">
                                    <div className="border-l-4 border-white/40 pl-6">
                                        <h3 className="font-bold text-white text-lg">{service.title}</h3>
                                        <p className="text-white/75 mt-1.5 leading-relaxed">{service.description}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
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
                            To continuously develop and diversify ourselves to meet the ever-changing
                            customer needs and aspirations. We will be guided and be inspired to remain
                            committed to innovation and customer satisfaction, thereby fostering customer
                            confidence and loyalty in our brands.
                        </p>
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
                            To be the leader in the agro-chemical space with emphasis on excellence in
                            innovation, sustainability and safety. We envision to go global with our
                            products by following best manufacturing practices and remaining
                            customer-centric thereby ensuring growth and profitability.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-offwhite leaf-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <Shield className="w-14 h-14 mx-auto mb-2 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
                                Our Values
                            </h2>
                        </div>
                        <p className="text-text-light text-center leading-relaxed text-lg">
                            To conduct business with highest integrity, honesty and transparency, thus
                            cultivating a bond of faith and trust with our customers, partners and
                            stakeholders alike. We would invest in product development, employee
                            empowerment and promotion of ethical business practices.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Promise */}
            <section className="relative py-20 bg-gradient-to-bl from-white via-emerald-50/20 to-green-50/30 overflow-hidden">
                <div className="absolute inset-0 leaf-pattern opacity-[0.03]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <Award className="w-14 h-14 mx-auto mb-2 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
                                Our Promise
                            </h2>
                        </div>
                        <p className="text-text-light text-center leading-relaxed text-lg">
                            We promise highest efficacy, quality, safety, and reliability of our products
                            and brands. We assure that we would meet and comply with all regulatory
                            obligations, be environmentally responsible, and provide 360-degree customer
                            support including guidance on product usage.
                        </p>
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

                    <div className="grid sm:grid-cols-2 gap-8 max-w-xl mx-auto">
                        {team.map((member, index) => (
                            <AnimatedSection key={member.name} delay={index * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-xl transition-all"
                                >
                                    <div className="relative mx-auto w-[150px] aspect-[35/45] rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-md bg-gradient-to-br from-primary/10 to-primary-lighter/10">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            sizes="150px"
                                            className="object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-dark mt-5">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-medium text-primary mt-0.5">
                                        {member.role}
                                    </p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
