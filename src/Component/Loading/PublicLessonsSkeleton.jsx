import React from 'react';

const PublicLessonsSkeleton = () => {
  return (
    <div className="my-10 animate-pulse">

      <div className="flex flex-col md:flex-row gap-8">
        {/* SIDEBAR SKELETON */}
        <aside className="w-full md:w-64 space-y-8 shrink-0">
          <div className="p-6 bg-base-200 rounded-2xl border border-base-300 space-y-6">
            <div className="h-6 bg-base-300 rounded w-1/2 mb-4"></div>
            {/* Search Input Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-base-300 rounded w-1/4"></div>
              <div className="h-12 bg-base-300 rounded-xl w-full"></div>
            </div>
            {/* Sort Dropdown Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-base-300 rounded w-1/4"></div>
              <div className="h-12 bg-base-300 rounded-xl w-full"></div>
            </div>
          </div>
        </aside>

        {/* MAIN GRID SKELETON */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
                {/* Image Area */}
                <div className="h-48 bg-base-300 w-full"></div>
                
                <div className="p-5 space-y-4">
                  {/* Title and Description */}
                  <div className="h-6 bg-base-300 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-base-300 rounded w-full"></div>
                    <div className="h-3 bg-base-300 rounded w-5/6"></div>
                  </div>

                  {/* Author Section */}
                  <div className="flex items-center gap-3 pt-4 border-t border-base-200">
                    <div className="w-10 h-10 rounded-full bg-base-300"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-base-300 rounded w-1/2"></div>
                      <div className="h-2 bg-base-300 rounded w-1/4"></div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="h-10 bg-base-300 rounded-xl w-full mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLessonsSkeleton;