import React from "react";
import Slider from "react-slick";
import { Link } from "react-router";
import { FiArrowRight, FiZap } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    customPaging: (i) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-white/30 hover:bg-white transition-all duration-300"></div>
    ),
  };

  const slides = [
    {
      title: "Master the Art of Living",
      subtitle:
        "Curated wisdom from real people to help you navigate your journey with clarity and purpose.",
      buttonText: "Explore Lessons",
      buttonLink: "/public-lessons",
      img: "https://i.ibb.co.com/TBDWbYVP/1-1.jpg",
      tag: "Self Improvement",
      gradient: "from-indigo-900 via-slate-900 to-black",
    },
    {
      title: "Leave Your Legacy",
      subtitle:
        "Your experiences matter. Turn your life lessons into guidance that inspires others.",
      buttonText: "Share Wisdom",
      buttonLink: "/dashboard/add-lesson",
      img: "https://i.ibb.co.com/sd08H8xX/2-1.jpg",
      tag: "Community",
      gradient: "from-emerald-900 via-gray-900 to-black",
    },
    {
      title: "Learn From Real Experiences",
      subtitle:
        "Discover authentic life lessons shared by people who have walked the path before you.",
      buttonText: "Browse Stories",
      buttonLink: "/public-lessons",
      img: "https://i.ibb.co.com/HLc4xXhy/3-1.jpg",
      tag: "Life Stories",
      gradient: "from-purple-900 via-zinc-900 to-black",
    },
    {
      title: "Track Your Growth Journey",
      subtitle:
        "Save favorites, revisit lessons, and measure how far you’ve come over time.",
      buttonText: "My Dashboard",
      buttonLink: "/dashboard",
      img: "https://i.ibb.co.com/sJsRcg5T/4-1.jpg",
      tag: "Personal Growth",
      gradient: "from-rose-900 via-slate-900 to-black",
    },
  ];



  return (
    <div className="relative overflow-hidden">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index} className="outline-none">
            {/* Split Layout Container */}
            <div className={`relative min-h-[80vh] flex items-center bg-gradient-to-br ${slide.gradient} `}>

              <div className="md:w-11/12 mx-auto flex justify-between items-center flex-col lg:flex-row gap-10 p-2 md:px-6">

                {/* LEFT CONTENT */}
                <div className="order-2 md:order-1 text-left z-10 animate-fade-in-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{slide.tag}</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={slide.buttonLink}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20"
                    >
                      {slide.buttonText} <FiArrowRight />
                    </Link>
                    <Link
                      to="/dashboard/pricing"
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center gap-2 backdrop-blur-md transition-all"
                    >
                      <FiZap className="text-yellow-400" /> View Plans
                    </Link>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="order-1 lg:order-2 relative group w-full max-w-[500px] mx-auto">
                  {/* Glow Effect / Background Frame */}
                  <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>

                  {/* The Main Frame */}
                  <div className="relative overflow-hidden rounded-[2rem] border-4 border-white/20 bg-gray-900 shadow-2xl transform md:rotate-2 group-hover:rotate-0 transition-transform duration-500">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full aspect-[5/5]  object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />

                    {/* Optional: Inner Glass Overlay for a "Premium" Frame look */}
                    <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-[2rem]"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        
        .slick-dots { bottom: 30px !important; }
        .slick-dots li.slick-active div {
          background: #fff !important;
          width: 30px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;