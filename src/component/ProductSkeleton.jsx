import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-zinc-100 shadow-sm overflow-hidden relative">
      {/* 1. Image Placeholder */}
      <div className="w-full h-52 bg-zinc-200 rounded-2xl animate-pulse relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      
      <div className="mt-5 space-y-3">
        {/* 2. Text Placeholders */}
        <div className="h-3 bg-zinc-200 rounded-full w-1/4 animate-pulse"></div>
        <div className="h-5 bg-zinc-200 rounded-full w-full animate-pulse"></div>
        <div className="h-5 bg-zinc-200 rounded-full w-2/3 animate-pulse"></div>
        
        {/* 3. Bottom Section */}
        <div className="flex justify-between items-center pt-4">
          <div className="h-8 bg-zinc-200 rounded-xl w-24 animate-pulse"></div>
          <div className="h-10 bg-zinc-200 rounded-2xl w-28 animate-pulse"></div>
        </div>
      </div>

      {/* Tailwind config-এ shimmer এনিমেশন না থাকলে নিচের inline style টি ব্যবহার করুন */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ProductSkeleton;