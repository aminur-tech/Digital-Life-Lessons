import React from 'react';
import { FiHelpCircle, FiChevronDown, FiZap, FiLock, FiStar } from 'react-icons/fi';

const FAQ = () => {
    const faqs = [
        {
            category: "General",
            icon: <FiZap className="text-yellow-500" />,
            questions: [
                {
                    q: "What is Digital Life Lessons?",
                    a: "It is a community-driven platform where users share valuable life experiences and digital skills through interactive lessons."
                },
                {
                    q: "How do I start creating a lesson?",
                    a: "Once you're logged in, head over to your Dashboard and click on 'Add Lesson'. Fill in the details, and your content will be live!"
                }
            ]
        },
        {
            category: "Premium & Billing",
            icon: <FiStar className="text-primary" />,
            questions: [
                {
                    q: "What are the benefits of Premium?",
                    a: "Premium users get access to exclusive lessons, ad-free browsing, and a 'Premium' badge on their profile to stand out in the community."
                },
                {
                    q: "Is the payment secure?",
                    a: "Absolutely. We use industry-standard encryption and trusted payment gateways to ensure your billing information is never compromised."
                }
            ]
        },
        {
            category: "Privacy & Account",
            icon: <FiLock className="text-success" />,
            questions: [
                {
                    q: "Can I delete my account?",
                    a: "Yes, you can request account deletion from your profile settings. All your data will be permanently removed from our servers."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-base-200/50 py-20 px-4 relative overflow-hidden">
            <title>FAQ | Digital Life Lessons</title>
            {/* Subtle Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Support Center</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight mb-6">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h1>
                    <p className="text-base-content/60 text-lg">
                        Everything you need to know about the platform. Can't find an answer?
                        <span className="text-primary font-medium cursor-pointer hover:underline ml-1">Contact our team.</span>
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-12">
                    {faqs.map((group, idx) => (
                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <div className="p-2 bg-base-200 rounded-lg">{group.icon}</div>
                                <h2 className="text-xl font-bold tracking-tight">{group.category}</h2>
                            </div>

                            <div className="space-y-3">
                                {group.questions.map((faq, fIdx) => (
                                    <div
                                        key={fIdx}
                                        className="collapse collapse-arrow bg-base-200/50 border border-base-200 rounded-2xl transition-all hover:bg-base-200"
                                    >
                                        <input type="radio" name="my-accordion-2" />
                                        <div className="collapse-title text-lg font-semibold pr-10">
                                            {faq.q}
                                        </div>
                                        <div className="collapse-content text-base-content/70 leading-relaxed">
                                            <p>{faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-primary to-primary-focus text-primary-content text-center shadow-xl shadow-primary/20">
                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                    <p className="opacity-90 mb-6">We’re here to help you get the most out of Digital Life Lessons.</p>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="gmail"
                        className="btn btn-white bg-white text-primary border-none hover:bg-opacity-90 px-8 rounded-xl font-bold hover:underline"
                    >
                        Support Email
                    </a>

                </div>
            </div>
        </div>
    );
};

export default FAQ;