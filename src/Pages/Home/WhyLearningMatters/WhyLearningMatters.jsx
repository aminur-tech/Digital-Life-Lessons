import React, { useEffect } from "react";
import { Lightbulb, BookOpen, Users, Target } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyLearningMatters = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  const benefits = [
    {
      title: "Real-World Experience",
      desc: "Life lessons teach practical knowledge you can’t always find in traditional textbooks.",
      icon: <Lightbulb className="w-10 h-10" />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Continuous Growth",
      desc: "Learning from mistakes and successes helps you evolve and improve every single day.",
      icon: <BookOpen className="w-10 h-10" />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Build Connections",
      desc: "Sharing lessons helps communities support, inspire, and grow together in harmony.",
      icon: <Users className="w-10 h-10" />,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Achieve Your Goals",
      desc: "Understanding life paths helps you make strategic decisions for a successful future.",
      icon: <Target className="w-10 h-10" />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <section className="bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            The Philosophy
          </h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6 text-base-content leading-tight">
            Why Learning From <span className="text-primary">Life</span> Matters
          </h3>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg font-light">
            Insights harvested from reality are the most potent tools for personal evolution.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className="group relative p-8 rounded-3xl bg-base-200 border border-base-content/5 hover:border-primary/40 transition-all duration-500 shadow-xl hover:-translate-y-2"
            >
              {/* Background Index Number */}
              <span className="absolute top-4 right-6 text-6xl font-black text-base-content/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                0{index + 1}
              </span>

              {/* Icon Container */}
              <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-base-content/60 leading-relaxed font-light">
                {item.desc}
              </p>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 rounded-b-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningMatters;