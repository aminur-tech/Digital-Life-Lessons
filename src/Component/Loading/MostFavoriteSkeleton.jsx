import React from 'react';

const MostFavoriteSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-xl">
      {/* Title Skeleton */}
      <div className="h-8 shimmer rounded-lg w-56 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="border border-base-300 rounded-xl p-4 bg-base-100 space-y-4"
          >
            {/* Image Skeleton */}
            <div className="relative">
              <div className="w-full h-44 shimmer rounded-lg"></div>
              {/* Floating Badge Skeleton */}
              <div className="absolute top-2 right-2 h-6 w-12 bg-base-100/50 rounded-full"></div>
            </div>

            {/* Title Skeleton */}
            <div className="h-5 shimmer rounded w-3/4"></div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-3 shimmer rounded w-full"></div>
              <div className="h-3 shimmer rounded w-5/6"></div>
            </div>

            {/* Footer Skeleton */}
            <div className="mt-4 flex justify-between items-center">
              <div className="h-6 shimmer rounded-md w-16"></div>
              <div className="h-4 shimmer rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MostFavoriteSkeleton;