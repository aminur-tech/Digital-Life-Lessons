import React, { useEffect } from 'react';
import { Link } from 'react-router';
import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import {
    FiTarget, FiUsers, FiAward, FiHeart,
    FiCheckCircle, FiTrendingUp, FiLayers, FiShield,
    FiArrowRight
} from 'react-icons/fi';
import DeveloperPopup from '../Home/DeveloperPopup/DeveloperPopup';

const About = () => {
    useEffect(() => {
        document.title = "About Us | Digital Life Lessons";

        // 1. Initialize AOS
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });

        // 2. Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        lenis.scrollTo(0); // Scroll to top on page load

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        // Refresh AOS on scroll so it detects positions correctly with Lenis
        lenis.on('scroll', AOS.refresh);

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    const stats = [
        { label: "Active Learners", value: "12K+", icon: <FiUsers />, color: "text-primary" },
        { label: "Lessons Published", value: "450+", icon: <FiLayers />, color: "text-secondary" },
        { label: "Success Rate", value: "98%", icon: <FiTrendingUp />, color: "text-accent" },
        { label: "Countries", value: "25+", icon: <FiTarget />, color: "text-error" },
    ];

    return (
        <div className="bg-base-100 min-h-screen overflow-x-hidden">
            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
                </div>

                <div className="container relative z-10 text-center" data-aos="zoom-out-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 text-sm font-bold mb-8 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                        A REVOLUTION IN WISDOM
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                        Experience <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">
                            Redefined.
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl opacity-70 mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Bridging the gap between raw data and actionable life intelligence through a decentralized sanctuary of shared growth.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6" data-aos="fade-up" data-aos-delay="400">
                        <Link to="/dashboard/add-lesson" className="btn btn-primary btn-lg rounded-full px-10 shadow-2xl hover:scale-110 transition-transform">
                            Join the Mission
                        </Link>
                        <Link to="/public-lessons" className="btn btn-outline btn-lg rounded-full px-10">
                            View Library
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- STATS BENTO GRID --- */}
            <section className="py-20 md:w-11/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group p-8 bg-base-200/50 rounded-[2.5rem] border border-base-300 hover:bg-base-100 hover:shadow-2xl transition-all duration-500"
                        >
                            <div className={`text-3xl mb-2 ${stat.color} group-hover:scale-125 transition-transform duration-500 flex items-center justify-center w-16 h-16 rounded-2xl bg-base-100 shadow-inner mx-auto`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-black mb-1 leading-none">{stat.value}</h3>
                            <p className="text-xs font-black uppercase tracking-widest opacity-40">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CORE PHILOSOPHY (Zig-Zag Format) --- */}
            <section className="py-24 px-2 text-center md:text-left md:w-11/12 mx-auto space-y-32">
                {/* Part 1 */}
                {/* --- Part 1: Curation --- */}
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2" data-aos="fade-right">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">01. Curation</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Filter the Noise, <br />Keep the <span className="text-primary">Wisdom.</span></h2>
                        <p className="text-lg opacity-70 mb-8 leading-relaxed">
                            Most digital content is designed for consumption. We design for retention. Our structured lesson format ensures your realizations don't just sit in a feed.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 md:gap-4 justify-items-center-safe">
                            {["Structured Data", "Actionable Steps"].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 font-bold opacity-80">
                                    <FiCheckCircle className="text-primary" /> {text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SMART IMAGE CONTAINER */}
                    <div className="lg:w-1/2 w-full group relative" data-aos="zoom-in-left">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative aspect-video overflow-hidden rounded-[3rem] border border-base-300 shadow-2xl">
                            <img
                                src="https://i.ibb.co.com/cSfYzSf9/1.png"
                                alt="Structured Wisdom"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>

                {/* --- Part 2: Privacy --- */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16 p-2 ">
                    <div className="lg:w-1/2" data-aos="fade-left">
                        <span className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">02. Privacy</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Your Mind, <br /><span className="text-secondary">Your Rules.</span></h2>
                        <p className="text-lg opacity-70 mb-8 leading-relaxed">
                            Share what you're ready to share. Keep the rest for yourself. Our hybrid journaling system gives you total control over your digital legacy.
                        </p>
                        <button className="btn btn-secondary btn-md rounded-2xl px-8 gap-2 group">
                            Explore Safety <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    {/* SMART IMAGE CONTAINER */}
                    <div className="lg:w-1/2 w-full group relative" data-aos="zoom-in-right">
                        <div className="absolute -inset-4 bg-gradient-to-tl from-secondary/20 to-transparent rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative aspect-video overflow-hidden rounded-[3rem] border border-base-300 shadow-2xl">
                            <img
                                src="https://i.ibb.co.com/RpLcRkh2/2.png"
                                alt="Digital Privacy"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID (Hero Gradient Style) --- */}
            <section className="relative py-32 overflow-hidden bg-base-300 rounded-[4rem] md:w-11/12 mx-auto">

                {/* 1. Background Gradient Blobs (Matching Hero Style) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-secondary/20 blur-[120px] rounded-full" />
                </div>

                <div className="container relative z-10 mx-auto">
                    <div className="text-center mb-20" data-aos="fade-down">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 tracking-widest uppercase">
                            Architecture
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-base-content to-base-content/40">
                            Unrivaled Infrastructure
                        </h2>
                        <p className="max-w-2xl mx-auto text-base-content/60 text-lg">
                            Smart handling of massive information through advanced UX architecture and decentralized nodes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:px-16">
                        {[
                            {
                                title: "Growth Tracking",
                                desc: "Visualize your personal evolution through time-stamped wisdom nodes.",
                                icon: <FiTrendingUp />,
                                border: "hover:border-primary/50"
                            },
                            {
                                title: "Global Network",
                                desc: "Connect with wisdom seekers from 25+ countries instantly.",
                                icon: <FiUsers />,
                                border: "hover:border-secondary/50"
                            },
                            {
                                title: "Smart Tags",
                                desc: "Our categorization engine ensures you find what you need in seconds.",
                                icon: <FiTarget />,
                                border: "hover:border-accent/50"
                            },
                        ].map((feat, i) => (
                            <div
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={i * 150}
                                className={`group relative p-10 rounded-[3rem] bg-base-100/40 backdrop-blur-xl border border-base-content/5 transition-all duration-500 ${feat.border} hover:shadow-2xl hover:-translate-y-2`}
                            >
                                {/* Inner Card Glow */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-base-100 shadow-inner flex items-center justify-center text-3xl text-primary mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        {feat.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                                    <p className="text-base-content/60 leading-relaxed font-medium">
                                        {feat.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 px-6 flex justify-center">
                <div
                    className="w-full max-w-5xl bg-gradient-to-r from-primary via-secondary to-accent p-[2px] rounded-[4rem]"
                    data-aos="zoom-in"
                >
                    <div className="bg-base-100 rounded-[4rem] p-12 md:p-24 text-center overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter">Ready to leave <br /> your mark?</h2>
                            <p className="text-xl opacity-60 mb-12 max-w-xl mx-auto">Join 12,000+ others who are turning their life lessons into a legacy.</p>
                            <Link to="/auth/register" className="btn btn-primary btn-lg rounded-full px-12 hover:scale-110 transition-transform">
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <DeveloperPopup/>
        </div>
    );
};

export default About;