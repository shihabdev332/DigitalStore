import React, { useState, useEffect, useCallback } from "react";
import { bannerData } from "../constant";
import Container from "../component/Container";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <Container className="py-5">
      <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden group rounded-3xl shadow-2xl border border-zinc-100">
        {/* Main Slider Wrapper */}
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerData?.map((item, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              {/* Background Image with subtle zoom effect */}
              <img
                src={item.image}
                alt="bannerImage"
                className={`w-full h-full object-cover transition-transform duration-[5000ms] ${
                  currentSlide === index ? "scale-110" : "scale-100"
                }`}
              />

              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 flex items-center">
                <div className="px-8 md:px-16 w-full">
                  <div className="flex flex-col gap-4 md:gap-6 max-w-2xl">
                    {/* Animate-In Content */}
                    <div
                      className={`transition-all duration-1000 delay-300 transform ${
                        currentSlide === index
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
                    >
                      <span className="inline-block px-4 py-1 bg-orange-600 text-white text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] rounded-full mb-2">
                        {item?.sale}
                      </span>

                      <h2 className="text-4xl md:text-7xl text-white font-extrabold leading-[1.1] tracking-tight">
                        {item?.title}
                      </h2>
                    </div>

                    <div
                      className={`transition-all duration-1000 delay-500 transform ${
                        currentSlide === index
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
                    >
                      <p className="text-lg md:text-2xl text-zinc-200 font-medium mb-1">
                        {item?.discount} —{" "}
                        <span className="text-orange-500 font-bold">
                          From {item?.from}
                        </span>
                      </p>

                      <button
                        onClick={() => navigate("/shop")}
                        className="mt-6 px-10 py-4 bg-white text-black font-bold uppercase text-xs md:text-sm rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-orange-600/40 active:scale-95 cursor-pointer"
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={prevSlide}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/20 cursor-pointer"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/20 cursor-pointer"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Minimalist Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`group relative h-1 transition-all duration-500 rounded-full overflow-hidden ${
                currentSlide === index ? "w-12 bg-white/30" : "w-6 bg-white/10"
              }`}
            >
              {currentSlide === index && (
                <div className="absolute inset-0 bg-white origin-left animate-progress"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Banner;
