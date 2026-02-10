import React, { useEffect, useState } from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Lenis from "@studio-freight/lenis";
import DeveloperPopup from "../Home/DeveloperPopup/DeveloperPopup";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);


  // scroll using lenis
  useEffect(() => {
      document.title = "Contact | Digital Life Lessons";
  
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => t,
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
        smoothTouch: true,
      });
  
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
  
      requestAnimationFrame(raf);
  
      return () => lenis.destroy();
    }, []);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! ✅");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 md:w-11/12">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Connect</h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6">Let’s Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Conversation</span></h3>
          <p className="text-base-content/60 max-w-xl mx-auto text-lg font-light">
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Info - 2 Columns wide on LG */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {[
                { icon: <FiMail />, label: "Email", value: "aminur.programme@gmail.com", href: "mailto:aminur.programme@gmail.com" },
                { icon: <FiPhone />, label: "Phone", value: "+880 1327694078", href: "tel:+8801327694078" },
                { icon: <FiMapPin />, label: "Location", value: "Satkhira, Bangladesh", href: "#" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  className="group flex items-center gap-5 p-4 rounded-2xl bg-base-200/50 border border-base-content/5 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-40">{item.label}</p>
                    <p className="font-semibold text-base-content/80">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-[1px]">
                <div className="bg-base-100 rounded-[2.5rem] p-8 flex justify-around">
                    <a href="https://github.com/aminur-tech" className="text-2xl hover:text-primary transition-colors"><FiGithub /></a>
                    <a href="https://www.linkedin.com/in/aminur-rahman4078" className="text-2xl hover:text-primary transition-colors"><FiLinkedin /></a>
                </div>
            </div>
          </motion.div>

          {/* Contact Form - 3 Columns wide on LG */}
          <motion.div 
            className="lg:col-span-3 bg-base-200/40 backdrop-blur-xl border border-base-content/5 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-primary/5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-2 opacity-60">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-base-100 border border-base-content/10 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-2 opacity-60">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-base-100 border border-base-content/10 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest ml-2 opacity-60">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full bg-base-100 border border-base-content/10 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-primary-content rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_10px_30px_rgba(var(--p),0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <FiSend className={isSubmitting ? "animate-ping" : ""} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <DeveloperPopup/>
    </section>
  );
};

export default Contact;