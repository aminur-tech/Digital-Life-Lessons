import React from "react";
import { Lightbulb, BookOpen, Users, Target } from "lucide-react";

const WhyLearningMatters = () => {
  const benefits = [
    {
      title: "Real-World Experience",
      desc: "Life lessons teach practical knowledge you can’t always find in books.",
      icon: <Lightbulb className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Continuous Growth",
      desc: "Learning from mistakes and successes helps you improve every day.",
      icon: <BookOpen className="w-12 h-12 text-green-500" />,
    },
    {
      title: "Build Connections",
      desc: "Sharing lessons helps people support, inspire, and grow together.",
      icon: <Users className="w-12 h-12 text-purple-500" />,
    },
    {
      title: "Achieve Your Goals",
      desc: "Understanding life paths helps you make better decisions for the future.",
      icon: <Target className="w-12 h-12 text-red-500" />,
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className=" text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
          Why Learning From Life Matters
        </h2>

        <p className="text-base-content opacity-70 max-w-2xl mx-auto mb-12">
          Understanding and sharing life lessons helps you grow, stay motivated, and build a better future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-base-100 rounded-xl border border-base-300 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4 text-primary">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-base-content">
                {item.title}
              </h3>

              <p className="text-base-content opacity-70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default WhyLearningMatters;
