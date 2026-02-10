import React from 'react';

const PublicLessonsSkeleton = () => {
  return (
    <div className="min-h-screen py-10 px-4 md:px-0 md:w-11/12 mx-auto animate-pulse">
      {/* HEADER SKELETON */}
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="h-12 bg-base-300 rounded-2xl w-1/2 md:w-1/3"></div>
        <div className="h-4 bg-base-300 rounded-full w-1/3 opacity-50"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* SIDEBAR SKELETON */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0">
          {/* Main Filter Card */}
          <div className="p-6 bg-base-200/50 rounded-[2rem] border border-base-300 space-y-8">
            <div className="h-6 bg-base-300 rounded-lg w-1/2 mb-2"></div>
            
            {/* Search Input */}
            <div className="space-y-3">
              <div className="h-3 bg-base-300 rounded w-1/4 opacity-50"></div>
              <div className="h-12 bg-base-300 rounded-2xl w-full"></div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-3">
              <div className="h-3 bg-base-300 rounded w-1/4 opacity-50"></div>
              <div className="h-12 bg-base-300 rounded-2xl w-full"></div>
            </div>

            {/* Category Chips */}
            <div className="space-y-3">
              <div className="h-3 bg-base-300 rounded w-1/4 opacity-50"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 bg-base-300 rounded-full w-16"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Card Skeleton */}
          <div className="h-32 bg-base-300/40 rounded-[2rem] w-full border border-base-300"></div>
        </aside>

        {/* MAIN GRID SKELETON */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
                {/* Image Area */}
                <div className="h-56 bg-base-300 w-full relative">
                  <div className="absolute top-4 left-4 h-6 bg-base-200 rounded-full w-20"></div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Title and Description */}
                  <div className="space-y-3">
                    <div className="h-6 bg-base-300 rounded-lg w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-base-300 rounded-full w-full opacity-60"></div>
                      <div className="h-3 bg-base-300 rounded-full w-5/6 opacity-60"></div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-base-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-base-300"></div>
                      <div className="h-3 bg-base-300 rounded w-20"></div>
                    </div>
                    <div className="h-8 bg-base-300 rounded-xl w-16"></div>
                  </div>
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