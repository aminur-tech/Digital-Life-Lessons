import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const DeveloperPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const DISPLAY_DURATION = 8000; 
    
    // We use a ref to track if it's already been shown to prevent re-triggering
    const hasTriggered = useRef(false);

    useEffect(() => {
        if (!hasTriggered.current) {
            const showTimer = setTimeout(() => {
                setIsVisible(true);
                hasTriggered.current = true;
            }, 1000);
            return () => clearTimeout(showTimer);
        }
    }, []);

    // Automatic hide logic that pauses on hover
    useEffect(() => {
        let hideTimer;
        if (isVisible && !isHovered) {
            hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, DISPLAY_DURATION);
        }
        return () => clearTimeout(hideTimer);
    }, [isVisible, isHovered]);

    const devInfo = {
        name: "Aminur Rahman",
        email: "aminur.programme@gmail.com",
        image: "https://i.ibb.co/h1nS5dhr/profile-removebg-preview.png",
        role: "Lead Developer"
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8, transition: { duration: 0.4 } }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="fixed bottom-6 left-6 z-[9999] group"
                >
                    <div className="relative bg-base-300/90 backdrop-blur-xl border border-primary/20 p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-5 pr-12 overflow-hidden">
                        
                        {/* Professional Progress Bar - Pauses on Hover */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-base-content/5">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: isHovered ? "inherit" : "0%" }}
                                transition={{ 
                                    duration: isHovered ? 0 : DISPLAY_DURATION / 1000, 
                                    ease: "linear" 
                                }}
                                className="h-full bg-primary"
                            />
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-base-content/30 hover:text-error transition-colors z-20"
                        >
                            <FiX size={16} />
                        </button>

                        {/* Profile with Animated Ring */}
                        <div className="relative">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-1 border-t-2 border-primary/40 rounded-2xl"
                            />
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary bg-base-100 relative z-10">
                                <img
                                    src={devInfo.image}
                                    alt={devInfo.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-base-300 rounded-full z-20"></div>
                        </div>

                        <div className="flex flex-col relative z-10">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">
                                {isHovered ? "Let's Connect!" : "Project Lead"}
                            </span>
                            <h4 className="text-lg font-black text-base-content leading-none mb-1">{devInfo.name}</h4>

                            <div className="flex items-center gap-2 text-base-content/60 group-hover:text-primary transition-colors">
                                <FiMail size={12} />
                                <span className="text-xs font-medium lowercase">{devInfo.email}</span>
                            </div>

                            <div className="flex gap-5 mt-3">
                                <a href="https://github.com/aminur-tech" target="_blank" rel="noreferrer">
                                    <FiGithub size={18} className="hover:text-primary hover:-translate-y-1 transition-all" />
                                </a>
                                <a href="https://www.linkedin.com/in/aminur-rahman4078" target="_blank" rel="noreferrer">
                                    <FiLinkedin size={18} className="hover:text-primary hover:-translate-y-1 transition-all" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeveloperPopup;