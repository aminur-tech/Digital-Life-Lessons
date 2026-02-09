import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { Link } from "react-router";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* 1. Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-secondary/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        <div className="bg-base-200/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          
          {/* 2. Inner Decorative Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
              <FiZap className="animate-pulse" /> Limited Time Access
            </div>

            {/* Heading with Gradient Text */}
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Growth Journey</span> Today
            </h2>

            {/* Subtitle */}
            <p className="text-base-content/60 text-lg md:text-xl mb-10 font-light leading-relaxed">
              Create, track, and share meaningful life lessons. Join 12,000+ others dedicated to documenting their legacy and learning from the community.
            </p>

            {/* 3. High-Impact CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/dashboard/add-lesson"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-content rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(var(--p),0.4)] transition-all duration-300 active:scale-95"
              >
                Create Your First Lesson
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link to="/public-lessons" className="px-10 py-5 rounded-2xl font-bold text-lg border border-base-content/10 hover:bg-base-content/5 transition-all">
                View Public Lessons
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;