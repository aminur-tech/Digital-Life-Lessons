import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MostFavoriteSkeleton from "../../../Component/Loading/MostFavoriteSkeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// 1. Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

const MostFavorite = () => {
  const axiosSecure = useAxiosSecure();
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["most-favorite-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/most-favorite-lessons");
      return res.data;
    }
  });

  if (isLoading) return <MostFavoriteSkeleton />;

  // Pagination Logic
  const indexOfLastLesson = currentPage * cardsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - cardsPerPage;
  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);
  const totalPages = Math.ceil(lessons.length / cardsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll back to section top
    const section = document.getElementById("most-saved-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="most-saved-section" className="bg-base-100 rounded-xl overflow-hidden">
      
      {/* Header: Title Left, Link Right */}
      <div className="flex justify-between items-center mb-6" data-aos="fade-right">
        <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
          🔖 Most Saved Lessons
        </h2>
        <Link 
          to="/public-lessons" 
          className="text-primary hover:underline text-sm font-medium"
        >
          View All Lessons →
        </Link>
      </div>

      {lessons.length === 0 && (
        <p className="text-center py-6 text-base-content opacity-70">
          No data available.
        </p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {currentLessons.map((item, idx) => (
          <div
            key={idx}
            data-aos="zoom-in-up"
            data-aos-delay={(idx % 4) * 100}
            className="border border-base-300 rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 bg-base-100 cursor-pointer"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-base-100 text-base-content shadow-md px-3 py-1 rounded-full text-sm font-medium">
                🔖 {item.totalFavorites}
              </div>
            </div>

            <h3 className="mt-4 font-semibold text-lg line-clamp-2 text-base-content">
              {item.title}
            </h3>

            {/* DESCRIPTION STYLE UNCHANGED */}
            <p className="text-sm mt-1 line-clamp-2 text-base-content opacity-70">
              {item.description || "No description available."}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs bg-secondary text-secondary-content px-2 py-1 rounded-md">
                {item.category}
              </span>
              <Link
                to={`/lessons/${item.lessonId}`}
                className="text-primary hover:underline text-sm font-medium"
              >
                View Lesson →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Numbered Pagination with Back/Next */}
      {lessons.length > cardsPerPage && (
        <div className="flex justify-center mt-12" data-aos="fade-up">
          <div className="flex items-center gap-2 p-2 bg-base-200 rounded-2xl">
            
            {/* Back Button */}
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                currentPage === 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-base-300 text-primary"
              }`}
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg"
                    : "hover:bg-base-300 text-base-content"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                currentPage === totalPages ? "opacity-20 cursor-not-allowed" : "hover:bg-base-300 text-primary"
              }`}
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostFavorite;