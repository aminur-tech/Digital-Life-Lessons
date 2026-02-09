import React from 'react';
import { FiTarget, FiUsers, FiAward, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router';

const About = () => {

    return (
        <div className="bg-base-100 min-h-screen">
            <title>About Us | Digital Life Lessons</title>
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-base-100 transition-colors duration-300">

                {/* 1. Background Blobs: Adjusted opacity for Light mode (lower) and Dark mode (higher) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-secondary/10 dark:bg-secondary/20 blur-[120px] rounded-full delay-700"></div>
                </div>

                <div className="container relative mx-auto px-6 text-center z-10">
                    {/* 2. Badge: Uses base-content color with opacity */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-content/5 border border-base-content/10 text-base-content/70 text-xs font-medium mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Join 5,000+ Wisdom Seekers
                    </div>

                    {/* 3. Typography: Dynamic gradient (Black to Gray in light, White to Gray in dark) */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-base-content to-base-content/60">
                        Sharing Wisdom for <br className="hidden md:block" />
                        <span className="text-primary">the Digital Age</span>
                    </h1>

                    {/* 4. Paragraph: Using base-content/70 for better readability in both modes */}
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-base-content/70 leading-relaxed mb-10">
                        Digital Life Lessons is a sanctuary for personal growth, where
                        <span className="text-base-content font-semibold"> lived experiences </span>
                        become a digital roadmap for the next generation.
                    </p>

                    {/* 5. Button Group */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to={`/dashboard/add-lesson`} className="btn btn-primary btn-lg rounded-2xl px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 border-none">
                            Start Your Journey
                        </Link>
                        {/* Outline button that adapts to text color automatically */}
                        <Link to={`/public-lessons`} className="btn btn-outline btn-lg rounded-2xl px-8 hover:bg-base-content hover:text-base-100 transition-colors">
                            Browse Lessons
                        </Link>
                    </div>
                </div>

                {/* 6. Bottom Fade: Matches base-100 exactly */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-base-100 to-transparent"></div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 md:w-11/12 mx-auto ">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-base-content/80 mb-4">
                            In a world of fleeting social media posts, we believe in the power of <strong>structured wisdom</strong>. Our platform allows individuals to capture life's most important realizations and organize them into actionable lessons.
                        </p>
                        <p className="text-lg text-base-content/80">
                            Whether it's a career breakthrough, a relationship insight, or a productivity hack, we provide the tools to store and share knowledge that lasts a lifetime.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-base-200 rounded-2xl text-center shadow-sm">
                            <FiTarget className="text-primary text-3xl mx-auto mb-2" />
                            <h3 className="font-bold">Purpose</h3>
                        </div>
                        <div className="p-6 bg-base-200 rounded-2xl text-center shadow-sm">
                            <FiUsers className="text-secondary text-3xl mx-auto mb-2" />
                            <h3 className="font-bold">Community</h3>
                        </div>
                        <div className="p-6 bg-base-200 rounded-2xl text-center shadow-sm">
                            <FiAward className="text-accent text-3xl mx-auto mb-2" />
                            <h3 className="font-bold">Growth</h3>
                        </div>
                        <div className="p-6 bg-base-200 rounded-2xl text-center shadow-sm">
                            <FiHeart className="text-error text-3xl mx-auto mb-2" />
                            <h3 className="font-bold">Empathy</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features / What We Offer */}
            <section className="py-16 bg-base-200 ">
                <div className="md:w-11/12 mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Digital Life Lessons?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-primary">Structured Learning</h3>
                                <p>Organize your thoughts into specific lessons with categories, tags, and progress tracking.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-secondary">Public Wisdom</h3>
                                <p>Learn from a global community of thinkers and creators sharing their personal breakthroughs.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-accent">Private Journaling</h3>
                                <p>Keep your most personal lessons private until you're ready to share them with the world.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 text-center">
                <div className="container mx-auto ">
                    <div className="bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to share your story?</h2>
                        <p className="text-lg mb-8 max-w-xl mx-auto">
                            Join thousands of others who are documenting their journey and helping others grow.
                        </p>
                        <Link to={`/dashboard/add-lesson`} className="btn btn-primary btn-lg rounded-full px-10">
                            Start Your First Lesson
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;