import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiEdit3, FiLayers, FiHeart, FiShare2 } from "react-icons/fi";

const steps = [
  { id: 1, title: "Create Lessons", description: "Write meaningful life lessons and personal insights based on real experiences.", icon: <FiEdit3 size={28} /> },
  { id: 2, title: "Organize & Save", description: "Categorize your lessons, bookmark favorites, and keep everything organized.", icon: <FiLayers size={28} /> },
  { id: 3, title: "Track Your Growth", description: "Monitor your learning progress and revisit lessons anytime you need inspiration.", icon: <FiHeart size={28} /> },
  { id: 4, title: "Share with Community", description: "Publish lessons publicly and learn from real wisdom shared by others.", icon: <FiShare2 size={28} /> },
];

const HowItWorks = () => {
  // Initialize AOS (usually done in App.js, but added here for safety)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className=" bg-base-100 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div 
          className="text-center mb-20"
          data-aos="fade-down"
        >
          
          <h3 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h3>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg font-light">
            Turn your everyday experiences into powerful life lessons in just a few simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          
          {/* Decorative Background Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative group"
              data-aos="fade-up"
              data-aos-delay={index * 200} // This creates the staggered "wave" effect
            >
              

              {/* Modern Card Frame */}
              <div className="h-full pt-12 pb-10 px-8 rounded-[2.5rem] bg-base-200/50 border border-base-content/5 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:bg-base-100 text-center flex flex-col items-center">
                
                {/* Icon Container with Glow */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-primary/10 text-primary relative">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">{step.icon}</span>
                </div>

                <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h4>

                <p className="text-base-content/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;