import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Component/Loading/Loading";
import MostFavoriteSkeleton from "../../Component/Loading/MostFavoriteSkeleton";

const MostFavorite = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["most-favorite-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/most-favorite-lessons");
      return res.data;
    }
  });

  if (isLoading) return <MostFavoriteSkeleton/>

  return (
    <div className=" bg-base-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-base-content flex items-center gap-2">
        🔖 Most Saved Lessons
      </h2>

      {lessons.length === 0 && (
        <p className="text-center py-6 text-base-content opacity-70">
          No data available.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {lessons.map((item, idx) => (
          <div
            key={idx}
            className="border border-base-300 rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300 bg-base-100 cursor-pointer"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover rounded-lg"
              />

              {/* SAVE COUNT */}
              <div className="absolute top-2 right-2 bg-base-100 text-base-content shadow-md px-3 py-1 rounded-full text-sm font-medium">
                🔖 {item.totalFavorites}
              </div>
            </div>

            <h3 className="mt-4 font-semibold text-lg line-clamp-2 text-base-content">
              {item.title}
            </h3>

            <p className="text-sm mt-1 line-clamp-2 text-base-content opacity-70">
              {item.description || "No description available."}
            </p>

            <div className="mt-4 flex justify-between items-center">
              {/* CATEGORY */}
              <span className="text-xs bg-secondary text-secondary-content px-2 py-1 rounded-md">
                {item.category}
              </span>

              {/* LINK */}
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
    </div>

  );
};

export default MostFavorite;
