import React from 'react';

const FeaturedSkeleton = () => {
  return (
    <div className="my-10 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-10 bg-base-300 rounded-lg w-64 mx-auto mb-8"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-xl border border-base-300 bg-base-100 overflow-hidden">
            {/* Image Area */}
            <div className="h-44 bg-base-300 w-full relative">
              {/* Category Badge Skeleton */}
              <div className="absolute top-2 left-2 h-5 w-16 bg-base-200 rounded-2xl"></div>
            </div>

            <div className="p-4 space-y-4">
              {/* Title Skeleton */}
              <div className="h-5 bg-base-300 rounded w-3/4"></div>
              
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-3 bg-base-300 rounded w-full"></div>
                <div className="h-3 bg-base-300 rounded w-5/6"></div>
              </div>

              {/* Author Section */}
              <div className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-full bg-base-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  <div className="h-2 bg-base-300 rounded w-1/4"></div>
                </div>
              </div>

              {/* Access Level Skeleton */}
              <div className="h-4 bg-base-300 rounded w-20"></div>

              {/* Button Skeleton */}
              <div className="h-10 bg-base-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSkeleton;