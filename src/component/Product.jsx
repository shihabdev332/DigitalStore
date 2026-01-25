import React from "react";
import Badge from "./Badge";
import PriceContainer from "./PriceContainer";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { FaStar } from "react-icons/fa";

const Product = ({ item, className }) => {
  const hasSecondImage = item?.images?.length > 1;
  const averageRating = item?.rating || 0;
  const reviewCount = item?.numReviews || 0;

  return (
    <div className={twMerge("w-full group bg-white flex flex-col h-full transition-all duration-500", className)}>
      {/* Image Section */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F8F8F8] rounded-[2rem] border border-zinc-100/50">
        <Link to={`/product/${item?._id}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={item?.images[0]}
            alt={item?.name}
            className={twMerge(
              "w-full h-full object-cover transition-all duration-1000 ease-in-out",
              hasSecondImage ? "group-hover:scale-105 group-hover:opacity-0" : "group-hover:scale-105"
            )}
            loading="lazy"
          />
          
          {/* Secondary Image */}
          {hasSecondImage && (
            <img
              src={item?.images[1]}
              alt={`${item?.name}-hover`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100"
            />
          )}
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item?.isNew && (
            <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">New</p>
            </div>
          )}
          {item?.offer && (
            <div className="bg-zinc-900 px-3 py-1 rounded-full shadow-lg">
              <p className="text-[10px] font-black uppercase tracking-widest text-white">Sale</p>
            </div>
          )}
        </div>

        {/* Quick View / Hover Overlay (Desktop) */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block">
           <div className="bg-white/90 backdrop-blur-xl py-3 rounded-2xl border border-white shadow-2xl text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Discover Details</p>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-5 px-2 flex flex-col flex-grow space-y-3">
        {/* Rating & Brand Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-zinc-900 text-[10px]">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(averageRating) ? "fill-current" : "text-zinc-200"} />
              ))}
            </div>
            <span className="text-[10px] font-black text-zinc-400">({reviewCount})</span>
          </div>
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Digital Shop</p>
        </div>

        {/* Name & Price Container */}
        <div className="flex flex-col gap-1.5 flex-grow">
          <Link 
            to={`/product/${item?._id}`}
            className="text-zinc-900 text-base font-bold tracking-tight line-clamp-1 hover:text-zinc-500 transition-colors"
          >
            {item?.name}
          </Link>
          
          <div className="flex items-baseline gap-2">
             <PriceContainer item={item} className="text-lg font-black tracking-tighter text-zinc-900" />
          </div>
        </div>

        {/* Add To Cart - Modern Button */}
        <div className="pt-2">
           <AddToCart 
             item={item} 
             className="w-full bg-zinc-900 text-white py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-zinc-200 lg:opacity-0 lg:group-hover:opacity-100"
           />
        </div>
      </div>
    </div>
  );
};

export default Product;