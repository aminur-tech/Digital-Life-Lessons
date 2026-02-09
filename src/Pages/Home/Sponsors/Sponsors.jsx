import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Styles
import 'swiper/css';

// Your assets
import amazon from '../../../assets/brands/amazon.png';
import casio from '../../../assets/brands/casio.png';
import moonStar from '../../../assets/brands/moonstar.png';
import randStad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import star_prople from '../../../assets/brands/start_people.png';

const Sponsors = () => {
    const logos = [
        { src: amazon, alt: "Amazon" },
        { src: casio, alt: "Casio" },
        { src: moonStar, alt: "Moon Star" },
        { src: randStad, alt: "Randstad" },
        { src: star, alt: "Star" },
        { src: star_prople, alt: "Star People" },
    ];

    return (
        <div className=" backdrop-blur-md">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h3 className="text-base-content/30 text-xs font-bold uppercase tracking-[0.4em]">
                    Trusted by Global Innovators
                </h3>
            </div>

            <div className="px-10">
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    speed={2000} // Long duration for smooth linear movement
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    grabCursor={true}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 40 },
                        640: { slidesPerView: 3, spaceBetween: 60 },
                        1024: { slidesPerView: 5, spaceBetween: 80 },
                    }}
                    className="sponsor-swiper"
                >
                    {logos.map((logo, idx) => (
                        <SwiperSlide key={idx} className="flex items-center justify-center">
                            <div className="transition-all duration-500 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transform hover:scale-110">
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="h-8 md:h-12 w-auto object-contain brightness-200" 
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style>{`
                /* This makes the movement continuous and smooth */
                .sponsor-swiper .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
            `}</style>
        </div>
    );
};

export default Sponsors;