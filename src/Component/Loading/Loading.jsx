import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-base-content">
      
      {/* Logo */}
      <div className="relative mb-6">
        <img
          src="/logo.png"
          alt="Digital Life Lessons"
          className="w-20 h-20 animate-pulse"
        />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-xl opacity-30 bg-primary"></div>
      </div>

      {/* Project Name */}
      <h1 className="text-xl font-semibold tracking-wide">
        Digital Life Lessons
      </h1>

      {/* Subtitle */}
      <p className="mt-1 text-sm opacity-70">
        Learning for a better digital life
      </p>

      {/* Loading dots */}
      <div className="flex gap-1 mt-4">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default Loading;
