import React, { useEffect } from "react";
import HeroSlider from "../HeroSlider/HeroSlider";
import WhyLearningMatters from "../WhyLearningMatters/WhyLearningMatters";
import FeaturedLessons from "../FeaturedLessons/FeaturedLessons";
import TopContributors from "../TopContributors/TopContributors";
import MostFavorite from "../MostFavorite/MostFavorite";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import Sponsors from "../Sponsors/Sponsors";
import Feedback from "../Feedback/Feedback";
import HowItWorks from "../HowItWorks/HowItWorks";
import FinalCTA from "../FinalCTA/FinalCTA";
import FAQ from "../../FAQ/FAQ";
import DeveloperPopup from "../DeveloperPopup/DeveloperPopup";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Home = () => {
  useEffect(() => {
    document.title = "Home | Digital Life Lessons";

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

  return (
    <div>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="mb-24 mt-4">
          <HeroSlider />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <HowItWorks />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <FeaturedLessons />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <WhyLearningMatters />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <MostFavorite />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <TopContributors />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <Sponsors />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <FAQ />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <Feedback />
        </div>
        <div className="mb-24 md:w-11/12 mx-auto">
          <FinalCTA />
        </div>
      </motion.div>
      <DeveloperPopup />
    </div>
  );
};

export default Home;
