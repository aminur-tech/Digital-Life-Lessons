import React from 'react';
import { FiShield, FiLock, FiEye, FiUserCheck } from 'react-icons/fi';

const Privacy = () => {
    const sections = [
        {
            icon: <FiEye className="text-primary" size={24} />,
            title: "Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, update your profile, or participate in the lessons. This includes your name, email address, and profile photo."
        },
        {
            icon: <FiLock className="text-secondary" size={24} />,
            title: "How We Use Data",
            content: "Your data is used to personalize your learning experience, process your premium upgrades, and ensure a secure environment for all users in the Digital Life community."
        },
        {
            icon: <FiShield className="text-success" size={24} />,
            title: "Data Security",
            content: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure."
        },
        {
            icon: <FiUserCheck className="text-info" size={24} />,
            size: 24,
            title: "Your Rights",
            content: "You have the right to access, update, or delete your personal information at any time through your dashboard settings or by contacting our support team."
        }
    ];

    return (
        <div className="min-h-screen bg-base-200/50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                        <FiShield size={32} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-base-content mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-base-content/60 max-w-lg mx-auto">
                        Your privacy is our top priority. Learn how we handle your data and protect your digital life lessons.
                    </p>
                    <div className="mt-4 text-xs font-bold uppercase tracking-widest text-primary/60">
                        Last Updated: January 2026
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {sections.map((section, index) => (
                        <div key={index} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow duration-300">
                            <div className="card-body p-8">
                                <div className="mb-4">{section.icon}</div>
                                <h2 className="card-title text-xl font-bold mb-2">{section.title}</h2>
                                <p className="text-base-content/70 leading-relaxed text-sm">
                                    {section.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Section Container */}
                <div className="mt-12 bg-base-100 rounded-3xl p-8 md:p-12 border border-base-200 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Detailed Overview</h2>
                    <div className="prose prose-sm max-w-none text-base-content/80">
                        <p>
                            Welcome to <strong>Digital Life Lessons</strong>. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform.
                        </p>
                        <h3 className="text-lg font-semibold mt-6 mb-2">1. Cookies</h3>
                        <p>
                            We use cookies to keep you logged in and remember your theme preferences (Light/Dark mode). You can disable cookies in your browser settings, but some features of the app may not function properly.
                        </p>
                        <h3 className="text-lg font-semibold mt-6 mb-2">2. Third Party Services</h3>
                        <p>
                            We use secure third-party services like Firebase for authentication and Stripe for payment processing. We do not store your credit card details on our own servers.
                        </p>
                    </div>

                    <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-bold">Have questions about your privacy?</p>
                            <p className="text-sm opacity-70">Our legal team is here to help you understand your rights.</p>
                        </div>
                        <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="gmail"
                        className="btn btn-primary btn-outline px-10 rounded-xl"
                    >
                       Contact Support
                    </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;