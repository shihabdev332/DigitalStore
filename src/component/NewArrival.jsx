import React, { useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { serverUrl } from "../../config";
import Title from "./Title.jsx";
import Product from "./Product.jsx";
import Container from "./Container.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductSkeleton from "../component/ProductSkeleton";

const NewArrival = () => {
  const scrollRef = useRef(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: async () => {
      const response = await axios.get(`${serverUrl}/api/product/list`);
      return response?.data?.product || [];
    },
    staleTime: 1000 * 60 * 10,
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // ৮০% স্ক্রল হবে স্মুথনেসের জন্য
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <Container className="py-16 md:py-24">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-10 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[2px] bg-zinc-900"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Limited Edition
            </span>
          </div>
          <Title className="text-3xl md:text-5xl font-black tracking-tighter">
            New Arrivals
          </Title>
        </div>

        {/* Navigation - Hidden on Small Mobile */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 flex items-center justify-center bg-white border border-zinc-200 hover:border-zinc-900 rounded-full transition-all duration-300 shadow-sm active:scale-90"
          >
            <FaChevronLeft size={16} className="text-zinc-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-900 text-white rounded-full transition-all duration-300 shadow-lg active:scale-90"
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Products Slider Container */}
      <div className="relative group">
        {isLoading ? (
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[75%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[22%]"
              >
                <ProductSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 no-scrollbar snap-x snap-mandatory pb-10"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollPaddingInline: "1rem",
            }}
          >
            {products.map((item) => (
              <div
                key={item._id}
                className="min-w-[75%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%] snap-start snap-always"
              >
                <div className="transform hover:-translate-y-2 transition-transform duration-500">
                  <Product item={item} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gradient Indicators for Mobile */}
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
      </div>

      {/* Mobile Indicator Bar */}
      <div className="w-full flex justify-center mt-4 md:hidden">
        <div className="w-20 h-1 bg-zinc-100 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-zinc-900 rounded-full"></div>
        </div>
      </div>
    </Container>
  );
};

export default NewArrival;
