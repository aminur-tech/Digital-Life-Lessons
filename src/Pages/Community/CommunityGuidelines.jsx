import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiEdit3, 
  FiHeart, 
  FiShield, 
  FiUsers, 
  FiCheck, 
  FiInfo, 
  FiAlertTriangle,
  FiZap 
} from 'react-icons/fi';
import Lenis from '@studio-freight/lenis';
import DeveloperPopup from '../Home/DeveloperPopup/DeveloperPopup';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const CommunityGuidelines = () => {
  
  // scroll using lenis
  useEffect(() => {
      document.title = "About | Digital Life Lessons";
  
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => t,
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
        smoothTouch: true,
      });

      lenis.scrollTo(0);
  
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
  
      requestAnimationFrame(raf);
  
      return () => lenis.destroy();
    }, []);


  const mainRules = [
    {
      icon: <FiEdit3 />,
      title: "Write with Purpose",
      desc: "Every lesson should provide value. Avoid vague advice; instead, share specific experiences and actionable takeaways that others can implement.",
      color: "text-blue-500"
    },
    {
      icon: <FiHeart />,
      title: "Empathy First",
      desc: "Be kind and respectful. We are a global community. Constructive feedback is welcome, but harassment or hate speech is strictly prohibited.",
      color: "text-rose-500"
    },
    {
      icon: <FiShield />,
      title: "Authenticity",
      desc: "Only share lessons you have a right to share. Avoid plagiarism. If you're quoting a famous philosopher or tech lead, give proper credit.",
      color: "text-emerald-500"
    },
    {
      icon: <FiZap />,
      title: "Stay Relevant",
      desc: "This is a space for life and digital growth. Keep content focused on lessons, skills, and personal development. No spam or off-topic ads.",
      color: "text-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 selection:bg-primary selection:text-primary-content">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20"
          >
            <FiShield className="animate-pulse" /> The Digital Life Playbook
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Guidelines</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-base-content/60 font-light leading-relaxed"
          >
            Our mission is to build the world’s most trusted library of human wisdom. 
            These rules ensure our community remains a safe, inspiring space for everyone.
          </motion.p>
        </div>
      </section>

      {/* 2. CORE VALUES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {mainRules.map((rule, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group p-8 md:p-10 rounded-[3rem] bg-base-200/50 border border-base-content/5 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl bg-base-100 shadow-xl flex items-center justify-center text-2xl mb-6 ${rule.color} group-hover:scale-110 transition-transform duration-500`}>
                {rule.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{rule.title}</h3>
              <p className="text-base-content/60 leading-relaxed italic">
                "{rule.desc}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. THE QUICK "DOS" & "DON'TS" */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-base-200/30 rounded-[4rem] border border-base-content/5 p-8 md:p-16">
          
          {/* Dos */}
          <div>
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
              <FiCheck className="text-success" /> The High Road
            </h3>
            <ul className="space-y-5">
              {[
                "Share lessons from real-world failures.",
                "Use clear, descriptive titles for your lessons.",
                "Engage in healthy, constructive debates.",
                "Update your digital guides as technology evolves.",
                "Encourage new contributors."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-base-content/80">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="lg:border-l lg:border-base-content/10 lg:pl-12">
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
              <FiAlertTriangle className="text-error" /> Avoid These
            </h3>
            <ul className="space-y-5">
              {[
                "Plagiarizing content from other websites.",
                "Posting misleading or 'get rich quick' schemes.",
                "Using aggressive or derogatory language.",
                "Spamming self-promotion or affiliate links.",
                "Sharing private data or doxxing individuals."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-base-content/80">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-error flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. ENFORCEMENT & CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="p-10 rounded-[3rem] bg-gradient-to-b from-base-200 to-transparent border-t border-base-content/5">
          <FiInfo className="mx-auto text-4xl text-primary mb-6" />
          <h4 className="text-xl font-bold mb-4">Enforcement</h4>
          <p className="text-base-content/50 mb-10 leading-relaxed text-sm">
            Our moderation team reviews reported lessons. Failure to comply with these guidelines may result in content being hidden, or in serious cases, permanent account suspension. We believe in second chances, but we prioritize the safety of our community.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="px-12 py-4 bg-primary text-primary-content rounded-full font-bold text-lg hover:shadow-[0_10px_40px_rgba(var(--p),0.3)] transition-all active:scale-95"
          >
            I Agree, Let's Build Together
          </button>
        </div>
      </section>
      <DeveloperPopup/>
    </div>
  );
};

export default CommunityGuidelines;