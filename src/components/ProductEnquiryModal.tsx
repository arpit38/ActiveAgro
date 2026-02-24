"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface EnquiryFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    location: string;
    quantity: string;
    message: string;
}

interface ProductEnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function ProductEnquiryModal({
    isOpen,
    onClose,
    productName,
}: ProductEnquiryModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EnquiryFormData>();

    const onSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            reset();
            onClose();
        }, 2500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-10 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-text-dark mb-2">
                                    Enquiry Submitted!
                                </h3>
                                <p className="text-text-light">
                                    We&apos;ll respond within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="bg-gradient-to-r from-primary to-primary-light p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            Enquire Now
                                        </h3>
                                        <p className="text-white/80 text-sm mt-0.5">
                                            {productName}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1">
                                                Name *
                                            </label>
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.name ? "border-red-400 animate-shake" : "border-gray-200"
                                                    }`}
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1">
                                                Email *
                                            </label>
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: "Invalid email",
                                                    },
                                                })}
                                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.email ? "border-red-400" : "border-gray-200"
                                                    }`}
                                                placeholder="your@email.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                {...register("phone", {
                                                    required: "Phone is required",
                                                })}
                                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${errors.phone ? "border-red-400" : "border-gray-200"
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
                                                Company
                                            </label>
                                            <input
                                                {...register("company")}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                                placeholder="Company name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1">
                                                Location
                                            </label>
                                            <input
                                                {...register("location")}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                                placeholder="City, State"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1">
                                                Quantity Required
                                            </label>
                                            <input
                                                {...register("quantity")}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                                                placeholder="e.g., 100 liters"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            {...register("message")}
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                                            placeholder="Your message..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5"
                                    >
                                        <Send className="w-4 h-4" />
                                        Submit Enquiry
                                    </button>

                                    <p className="text-center text-xs text-text-light">
                                        We&apos;ll respond within 24 hours
                                    </p>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
