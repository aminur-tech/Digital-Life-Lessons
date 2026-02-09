import React from "react";
import Slider from "react-slick";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Added Chevron icons
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// --- Custom Arrow Components ---
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-base-200 border border-primary/20 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all duration-300 group"
  >
    <FiChevronRight size={24} className="group-hover:scale-110" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 lg:-left-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-base-200 border border-primary/20 rounded-full shadow-xl hover:bg-primary hover:text-white transition-all duration-300 group"
  >
    <FiChevronLeft size={24} className="group-hover:scale-110" />
  </button>
);

const Feedback = () => {
  const testimonials = [
    { id: 1, name: "Sarah Jenkins", role: "Life Coach", comment: "Digital Life Lessons has changed how I archive my personal breakthroughs. It's more than an app; it's a legacy builder.", rating: 5, image: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: 2, name: "Marcus Chen", role: "Self-Learner", comment: "Browsing the public lessons is like having access to a global brain of wisdom. Truly inspiring content.", rating: 5, image: "https://randomuser.me/api/portraits/men/45.jpg" },
    { id: 3, name: "Elena Rodriguez", role: "Content Creator", comment: "The organization features are top-notch. I love being able to track my learning progress over the months.", rating: 4, image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 4, name: "David Park", role: "Philosopher", comment: "A beautiful space for intentional thought. The UI makes reflecting on life lessons feel like a premium experience.", rating: 5, image: "https://randomuser.me/api/portraits/men/22.jpg" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow />, // Assigned Custom Arrow
    prevArrow: <PrevArrow />, // Assigned Custom Arrow
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false } }, // Hide arrows on small tablets
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } }   // Hide arrows on mobile
    ]
  };

  return (
    <section className="bg-base-100 text-base-content ">
      <div>
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Voices of Wisdom</h3>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg font-light">
            Discover how our community is transforming experiences into shared wisdom.
          </p>
        </div>

        {/* Slider Section */}
        <div className="feedback-slider-container relative px-4 lg:px-10">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id} className="px-3 pb-12">
                <div className="relative h-full p-8 rounded-[2rem] bg-base-200 border border-base-content/5 hover:border-primary/30 transition-all duration-500 group shadow-lg flex flex-col justify-between">
                  
                  {/* Design Elements */}
                  <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/30 transition-colors duration-500">
                    <FaQuoteLeft size={40} />
                  </div>

                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={i < item.rating ? "fill-warning text-warning" : "text-base-content/10"} 
                          size={16} 
                        />
                      ))}
                    </div>

                    {/* Feedback Frame - Consistent height for text */}
                    <p className="text-base-content/80 italic mb-10 leading-relaxed font-light line-clamp-4 min-h-[100px]">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-base-content/5 pt-6">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-base-content">{item.name}</h4>
                      <p className="text-primary text-xs font-medium uppercase tracking-wider">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .feedback-slider-container .slick-dots li button:before { color: var(--p); font-size: 10px; opacity: 0.3; }
        .feedback-slider-container .slick-dots li.slick-active button:before { color: var(--p); opacity: 1; }
        .slick-track { display: flex !important; }
        .slick-slide { height: auto !important; }
        .slick-slide > div { height: 100%; }
      `}</style>
    </section>
  );
};

export default Feedback;