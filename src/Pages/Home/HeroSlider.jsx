import React from "react";
import Slider from "react-slick";
import { Link } from "react-router";
import { FiArrowRight, FiPlay, FiZap } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    pauseOnHover: false,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    customPaging: i => (
      <div className="w-3 h-3 mx-2 rounded-full border-2 border-white/50 hover:border-primary transition-all duration-300"></div>
    )
  };

  const slides = [
    {
      title: "Master the Art of Living",
      subtitle: "Curated wisdom from real people to help you navigate your journey with clarity and purpose.",
      buttonText: "Explore Lessons",
      buttonLink: "/public-lessons",
      bgImage: "https://i.ibb.co.com/hxqCqXMq/ai-generated-8194612-640.jpg",
      tag: "Self Improvement"
    },
    {
      title: "Leave Your Legacy",
      subtitle: "Your experiences are valuable. Transform your life's challenges into a roadmap for others.",
      buttonText: "Share Wisdom",
      buttonLink: "/dashboard/add-lesson",
      bgImage: "https://i.ibb.co.com/zVYD64MX/compressed-2.jpg",
      tag: "Community"
    }
  ];

  return (
    <div className="relative group overflow-hidden bg-black">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] md:h-[85vh] outline-none">
            {/* 1. Cinematic Background Layer */}
            <div className="absolute inset-0">
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="h-full w-full object-cover brightness-[0.45] scale-110 animate-ken-burns"
              />
              {/* Modern Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* 2. Content Layer */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 md:px-24">
                <div className="max-w-4xl">
                  {/* Floating Tag */}
                  <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                    <span className="w-12 h-[2px] bg-primary"></span>
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                      {slide.tag}
                    </span>
                  </div>

                  <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in-up delay-100">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className={i === 2 ? "text-primary" : ""}>{word} </span>
                    ))}
                  </h2>

                  <p className="mb-10 text-lg md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl animate-fade-in-up delay-200">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start gap-5 animate-fade-in-up delay-300">
                    <Link
                      to={slide.buttonLink}
                      className="btn btn-primary btn-lg rounded-full px-10 shadow-2xl shadow-primary/40 group border-none text-white"
                    >
                      {slide.buttonText}
                      <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>

                    <Link
                      to="/dashboard/pricing"
                      className="btn btn-ghost btn-lg text-white hover:bg-warning/10 hover:text-warning rounded-full px-8 backdrop-blur-sm border border-white/20 transition-all duration-300 group"
                    >
                      <FiZap className="mr-2 group-hover:animate-pulse" />
                      View Upgrade Plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Global CSS for Slider Enhancement */}
      <style>{`
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-ken-burns { animation: kenburns 20s linear infinite alternate; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        /* Custom Slick Dots */
        .slick-dots { bottom: 40px !important; }
        .slick-dots li.slick-active div {
          background: var(--p);
          border-color: var(--p);
          width: 40px;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;