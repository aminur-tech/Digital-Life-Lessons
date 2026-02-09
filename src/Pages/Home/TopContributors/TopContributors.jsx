import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributors");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-6 text-base-content opacity-70">
        Loading contributors...
      </p>
    );
  }

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 border-b border-base-300 pb-3 text-base-content">
        ⭐ Top Contributors This Week
      </h2>

      {contributors.length === 0 ? (
        <p className="text-center py-6 text-base-content opacity-70">
          No contributors available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((user, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-base-100 p-5 rounded-xl border border-base-300 shadow-sm hover:shadow-md transition"
            >
              {/* Rank */}
              <span className="text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-content">
                {idx + 1}
              </span>

              {/* Avatar */}
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || user.email}
                className="w-14 h-14 rounded-full object-cover shadow"
              />

              {/* Info */}
              <div>
                <p className="font-semibold text-base-content text-lg">
                  {user.name || user.email.split("@")[0]}
                </p>
                <p className="text-sm text-base-content opacity-70">
                  {user.totalLessons || 0} lessons
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopContributors;
