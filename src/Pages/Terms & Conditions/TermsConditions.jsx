import React from 'react';
import { FiFileText, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const TermsConditions = () => {
    const lastUpdated = "January 10, 2026";

    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: "By accessing and using Digital Life Lessons, you agree to be bound by these Terms and Conditions and all applicable laws and regulations."
        },
        {
            id: "accounts",
            title: "2. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account."
        },
        {
            id: "content",
            title: "3. Content Guidelines",
            content: "Users may post lessons and comments. You retain ownership of your content, but grant us a license to host and display it. Offensive or illegal content will be removed without notice."
        },
        {
            id: "premium",
            title: "4. Premium Subscriptions",
            content: "Premium features are billed on a recurring basis. Refunds are handled on a case-by-case basis within 7 days of purchase if the service has not been significantly used."
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 font-sans border-t border-base-200">
            <title>Terms & Conditions | Digital Life Lessons</title>
            {/* Hero Section */}
            <div className="bg-base-200/50 py-16 border-b border-base-200">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <FiFileText size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-base-content">Terms of Service</h1>
                            <p className="text-base-content/60 font-medium">Please read these terms carefully before using our platform.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sticky Sidebar Navigation */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-2">
                            <p className="text-xs font-bold uppercase tracking-widest text-base-content/40 px-4 mb-4">On this page</p>
                            {sections.map(section => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block px-4 py-2 rounded-xl text-sm font-medium text-base-content/70 hover:bg-base-200 hover:text-primary transition-all"
                                >
                                    {section.title}
                                </a>
                            ))}
                            <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <FiInfo />
                                    <span className="text-xs font-bold uppercase">Summary</span>
                                </div>
                                <p className="text-xs text-base-content/60 leading-relaxed">
                                    Essentially: Be respectful, don't steal content, and keep your password safe.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="alert bg-base-200 border-none rounded-2xl">
                            <FiAlertCircle className="text-primary" size={20} />
                            <span className="text-sm">Last Updated: <strong>{lastUpdated}</strong></span>
                        </div>

                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-28">
                                <h2 className="text-2xl font-bold mb-4 text-base-content">{section.title}</h2>
                                <div className="bg-base-100 p-1 text-base-content/70 leading-loose space-y-4">
                                    <p>{section.content}</p>
                                    <p>
                                        We reserve the right to modify these terms at any time. Your continued use of the site
                                        following any changes signifies your acceptance of the new terms.
                                    </p>
                                </div>
                            </section>
                        ))}

                        {/* Termination Section with Highlight */}
                        <section className="p-8 rounded-3xl bg-error/5 border border-error/10">
                            <h2 className="text-xl font-bold text-error mb-4 flex items-center gap-2">
                                <FiCheckCircle /> Termination
                            </h2>
                            <p className="text-sm text-base-content/70 leading-relaxed">
                                We may terminate or suspend your account immediately, without prior notice or liability, for
                                any reason whatsoever, including without limitation if you breach the Terms. Upon termination,
                                your right to use the Service will immediately cease.
                            </p>
                        </section>

                        <div className="divider opacity-50"></div>

                        <div className="text-center pb-12">
                            <p className="text-sm text-base-content/50 mb-6">
                                Have questions about our terms? We're happy to chat.
                            </p>

                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="gmail"
                                className="btn btn-primary btn-outline px-10 rounded-xl"
                            >
                                Contact Legal Team
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;