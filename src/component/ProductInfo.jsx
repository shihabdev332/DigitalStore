import React from "react";
import Title from "./Title";
import PriceContainer from "./PriceContainer";
import AddToCart from "./AddToCart";
import { FaStar, FaRegStar } from "react-icons/fa"; // রেটিং এর জন্য

const ProductInfo = ({ product }) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 py-2">
      {/* Header: Brand & Name */}
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-widest text-zinc-500 font-semibold">
          {product?.brand}
        </p>
        <Title className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight">
          {product?.name}
        </Title>
      </div>

      {/* Price & Rating */}
      <div className="flex flex-col gap-3 pb-6 border-b border-zinc-100">
        <PriceContainer item={product} priceStyle="text-2xl md:text-3xl font-bold text-zinc-900" />
        <div className="flex items-center gap-3">
          <div className="flex text-orange-400">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStar />
          </div>
          <p className="text-sm text-zinc-500 font-medium hover:text-zinc-800 cursor-pointer transition-colors">
            Be the first to leave a review
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800">Description</h3>
        <p className="text-base text-zinc-600 leading-relaxed max-w-xl">
          {product?.description}
        </p>
      </div>

      {/* Meta Info: Category */}
      <div className="flex flex-col gap-3 py-4 bg-zinc-50 px-5 rounded-xl border border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-medium w-20">Category:</span>
          <span className="text-zinc-900 font-semibold capitalize">{product?.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-medium w-20">Availability:</span>
          <span className="text-emerald-600 font-semibold">In Stock</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <AddToCart 
          item={product} 
          className="w-full md:w-fit px-12 py-4 bg-zinc-900 text-white rounded-full hover:bg-orange-600 transition-all duration-300 shadow-xl font-bold uppercase tracking-wider text-sm" 
        />
      </div>

      {/* Bottom Trust Info */}
      <p className="text-xs text-zinc-400 italic">
        * Free shipping on orders over $500. Secure checkout guaranteed.
      </p>
    </div>
  );
};

export default ProductInfo;