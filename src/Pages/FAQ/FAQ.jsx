import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiZap, FiLock, FiStar } from 'react-icons/fi';

const FAQ = () => {
    // State to track which question is open. Format: "categoryIndex-questionIndex"
    const [activeId, setActiveId] = useState(null);

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const faqs = [
        {
            category: "General",
            icon: <FiZap className="text-yellow-500" />,
            questions: [
                { q: "What is Digital Life Lessons?", a: "It is a community-driven platform where users share valuable life experiences and digital skills through interactive lessons." },
                { q: "How do I start creating a lesson?", a: "Once you're logged in, head over to your Dashboard and click on 'Add Lesson'. Fill in the details, and your content will be live!" }
            ]
        },
        {
            category: "Premium & Billing",
            icon: <FiStar className="text-primary" />,
            questions: [
                { q: "What are the benefits of Premium?", a: "Premium users get access to exclusive lessons, ad-free browsing, and a 'Premium' badge on their profile." },
                { q: "Is the payment secure?", a: "Absolutely. We use industry-standard encryption and trusted payment gateways to ensure your billing information is secure." }
            ]
        }
    ];

    return (
        <section className=" bg-base-100 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:30px_30px]"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Support Center</h2>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Frequently Asked <span className="text-primary">Questions</span></h1>
                    <p className="text-base-content/60 text-lg font-light">
                        Can't find what you're looking for? <span className="text-primary font-medium hover:underline cursor-pointer">Contact Support</span>
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-12">
                    {faqs.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-4">
                            <div className="flex items-center gap-3 px-2 mb-6">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">{group.icon}</div>
                                <h3 className="text-xl font-bold tracking-tight">{group.category}</h3>
                            </div>

                            <div className="space-y-3">
                                {group.questions.map((faq, fIdx) => {
                                    const id = `${gIdx}-${fIdx}`;
                                    const isOpen = activeId === id;

                                    return (
                                        <div 
                                            key={fIdx} 
                                            className={`border rounded-[1.5rem] transition-all duration-300 ${isOpen ? 'bg-base-200 border-primary/30 shadow-lg' : 'bg-base-200/40 border-base-content/5 hover:border-base-content/10'}`}
                                        >
                                            <button
                                                onClick={() => toggleFAQ(id)}
                                                className="w-full flex items-center justify-between p-6 text-left"
                                            >
                                                <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-base-content'}`}>
                                                    {faq.q}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`p-1 rounded-full ${isOpen ? 'bg-primary text-white' : 'bg-base-300 text-base-content/50'}`}
                                                >
                                                    <FiChevronDown size={20} />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-0 text-base-content/70 leading-relaxed border-t border-base-content/5 mt-2 transition-all">
                                                            <div className="pt-4">
                                                                {faq.a}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;