import React from "react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Design */}
        <div className="relative w-16 h-16">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
          {/* Animated Ring */}
          <div className="absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-zinc-900 font-black text-xs uppercase tracking-[0.3em] animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
};

export default FullPageLoader;