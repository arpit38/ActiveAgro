"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getWhatsAppUrl } from "@/lib/whatsapp";

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


export default function ContactPage() {
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

            {/* Contact Info */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <h2 className="text-2xl font-bold text-text-dark mb-8">
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

                            <div className="flex gap-4">
                                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-text-dark text-sm">WhatsApp</h3>
                                    <p className="text-sm text-text-light mt-0.5">+91-7063034128</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={getWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2.5 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#1ebe5d] hover:shadow-lg hover:shadow-[#25D366]/25 transition-all hover:-translate-y-0.5"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Contact Directly
                        </a>
                    </AnimatedSection>
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

        </>
    );
}
