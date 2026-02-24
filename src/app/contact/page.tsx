"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    CheckCircle,
    Headphones,
    ShoppingCart,
    Briefcase,
    Users,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getAllCategories, type SanityCategory } from "@/sanity/queries";

interface ContactFormData {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    company: string;
    location: string;
    productInterest: string;
    message: string;
}

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [categories, setCategories] = useState<SanityCategory[]>([]);

    useEffect(() => {
        getAllCategories().then(setCategories);
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>();

    const onSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            reset();
        }, 4000);
    };

    const contacts = [
        {
            icon: Headphones,
            title: "Technical Support",
            email: "support@activeagroscience.com",
            description: "Get help with product usage and application",
        },
        {
            icon: ShoppingCart,
            title: "Sales Inquiries",
            email: "sales@activeagroscience.com",
            description: "Pricing, bulk orders, and quotations",
        },
        {
            icon: Briefcase,
            title: "Career Opportunities",
            email: "careers@activeagroscience.com",
            description: "Join our team of agricultural experts",
        },
        {
            icon: Users,
            title: "Dealer/Distributor",
            email: "dealers@activeagroscience.com",
            description: "Partnership and distribution queries",
        },
    ];

    return (
        <>
            {/* Hero */}
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
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-white/80 mt-4 text-lg max-w-2xl mx-auto"
                    >
                        We&apos;re here to help. Reach out to our team for any queries.
                    </motion.p>
                </div>
            </section>

            {/* Contact Info + Form */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <AnimatedSection direction="left" className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-text-dark mb-6">
                                Get In Touch
                            </h2>

                            <div className="space-y-5">
                                <div className="flex gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-dark text-sm">Address</h3>
                                        <p className="text-sm text-text-light mt-1 leading-relaxed">
                                            Active Agro Science<br />
                                            3, Purba Panchanan Gram, Topsia<br />
                                            South 24 Parganas<br />
                                            West Bengal - 700100, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-dark text-sm">Phone</h3>
                                        <a
                                            href="tel:+917971670503"
                                            className="text-sm text-text-light hover:text-primary transition-colors"
                                        >
                                            +91-7971670503
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-dark text-sm">Email</h3>
                                        <a
                                            href="mailto:info@activeagroscience.com"
                                            className="text-sm text-text-light hover:text-primary transition-colors"
                                        >
                                            info@activeagroscience.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-dark text-sm">Business Hours</h3>
                                        <p className="text-sm text-text-light mt-0.5">
                                            Monday - Saturday: 9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Contact Form */}
                        <AnimatedSection direction="right" className="lg:col-span-3">
                            <div className="bg-offwhite rounded-2xl p-8 border border-gray-100">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-text-dark">
                                            Thank you for contacting us!
                                        </h3>
                                        <p className="text-text-light mt-2">
                                            We&apos;ll get back to you within 24 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-text-dark mb-6">
                                            Send Us a Message
                                        </h2>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-4"
                                        >
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-dark mb-1">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        {...register("fullName", {
                                                            required: "Full name is required",
                                                        })}
                                                        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.fullName ? "border-red-400" : "border-gray-200"
                                                            }`}
                                                        placeholder="John Doe"
                                                    />
                                                    {errors.fullName && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.fullName.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-dark mb-1">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        {...register("email", {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^\S+@\S+$/i,
                                                                message: "Invalid email",
                                                            },
                                                        })}
                                                        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.email ? "border-red-400" : "border-gray-200"
                                                            }`}
                                                        placeholder="john@example.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.email.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-dark mb-1">
                                                        Phone Number *
                                                    </label>
                                                    <input
                                                        {...register("phone", {
                                                            required: "Phone number is required",
                                                        })}
                                                        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.phone ? "border-red-400" : "border-gray-200"
                                                            }`}
                                                        placeholder="+91 XXXXX XXXXX"
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.phone.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-dark mb-1">
                                                        Subject *
                                                    </label>
                                                    <input
                                                        {...register("subject", {
                                                            required: "Subject is required",
                                                        })}
                                                        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.subject ? "border-red-400" : "border-gray-200"
                                                            }`}
                                                        placeholder="How can we help?"
                                                    />
                                                    {errors.subject && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.subject.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-dark mb-1">
                                                        Company Name
                                                    </label>
                                                    <input
                                                        {...register("company")}
                                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                                        placeholder="Company name (optional)"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-dark mb-1">
                                                        Location
                                                    </label>
                                                    <input
                                                        {...register("location")}
                                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                                        placeholder="City, State (optional)"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-text-dark mb-1">
                                                    Product Interest
                                                </label>
                                                <select
                                                    {...register("productInterest")}
                                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                                >
                                                    <option value="">Select a category (optional)</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.slug} value={cat.name}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-text-dark mb-1">
                                                    Message *
                                                </label>
                                                <textarea
                                                    {...register("message", {
                                                        required: "Message is required",
                                                    })}
                                                    rows={4}
                                                    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none ${errors.message ? "border-red-400" : "border-gray-200"
                                                        }`}
                                                    placeholder="Tell us about your requirements..."
                                                />
                                                {errors.message && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.message.message}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5"
                                            >
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="bg-offwhite">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <AnimatedSection className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-text-dark">
                            Find Us On Map
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection>
                        <div className="rounded-2xl overflow-hidden border border-gray-200 h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.5797614482247!2d88.3772!3d22.5354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276d1a5c0f555%3A0x5b8b6b4e7e7c9e9e!2sTopsia%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Active Agro Science Location"
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Additional Contacts */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-text-dark">
                            Other Ways to Reach Us
                        </h2>
                    </AnimatedSection>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contacts.map((contact, index) => (
                            <AnimatedSection key={contact.title} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-offwhite rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all text-center"
                                >
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <contact.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-text-dark text-sm">
                                        {contact.title}
                                    </h3>
                                    <p className="text-xs text-text-light mt-1.5">
                                        {contact.description}
                                    </p>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-xs text-primary font-medium mt-3 block hover:underline"
                                    >
                                        {contact.email}
                                    </a>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
