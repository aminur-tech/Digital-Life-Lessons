import React from 'react';

const LessonSkeleton = () => {
  return (
    <div className="text-base-content p-1 animate-pulse">
      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          {/* Title & Category Skeleton */}
          <div className="space-y-4 pb-4 border-b border-base-300">
            <div className="h-12 bg-base-300 rounded-md w-3/4"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-base-300 rounded w-20"></div>
              <div className="h-4 bg-base-300 rounded w-24"></div>
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="h-[400px] bg-base-300 rounded-2xl w-full"></div>

          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-base-300 rounded w-full"></div>
            <div className="h-4 bg-base-300 rounded w-full"></div>
            <div className="h-4 bg-base-300 rounded w-5/6"></div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="lg:col-span-1 lg:space-y-8 mt-12 lg:mt-0">
          {/* Quick Actions Skeleton */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 mb-8">
            <div className="h-3 bg-base-300 rounded w-24 mb-4"></div>
            <div className="flex justify-between gap-3">
              <div className="h-10 bg-base-300 rounded-full flex-1"></div>
              <div className="h-10 bg-base-300 rounded-full flex-1"></div>
              <div className="h-10 bg-base-300 rounded-full w-10"></div>
            </div>
          </div>

          {/* Author Card Skeleton */}
          <div className="p-6 bg-base-200 rounded-2xl border border-base-300">
            <div className="h-3 bg-base-300 rounded w-32 mb-4"></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-base-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-base-300 rounded w-24"></div>
                <div className="h-3 bg-base-300 rounded w-32"></div>
              </div>
            </div>
          </div>

          {/* Metrics Skeleton */}
          <div className="p-6 bg-base-100 rounded-2xl border border-base-200 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-5 h-5 bg-base-300 rounded"></div>
                <div className="h-4 bg-base-300 rounded w-32"></div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* SIMILAR LESSONS SKELETON */}
      <section className="mt-20 border-t border-base-300 pt-10">
        <div className="h-8 bg-base-300 rounded w-64 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-3">
              <div className="h-40 bg-base-300 rounded-xl"></div>
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-3 bg-base-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LessonSkeleton;