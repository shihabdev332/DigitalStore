import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query"; // ✅ React Query ইম্পোর্ট
import { serverUrl } from "../../config";
import Title from "./Title.jsx";
import Product from "./Product.jsx";
import Container from "./Container.jsx";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../component/ProductSkeleton";

const Recommended = () => {
  const navigate = useNavigate();

  // ✅ React Query ক্যাশিং লজিক
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["recommendedProducts"],
    queryFn: async () => {
      const response = await axios.get(`${serverUrl}/api/product/list`);
      if (response?.data?.success) {
        // ডেটা ফেচ করে শফল এবং স্লাইস করা হচ্ছে
        const data = response.data.product;
        return data.sort(() => 0.5 - Math.random()).slice(0, 8);
      }
      return [];
    },
    staleTime: 1000 * 60 * 10, // ১০ মিনিট পর্যন্ত ডেটা ক্যাশে থাকবে
  });

  return (
    <Container className="py-12 border-t border-zinc-100">
      <div className="flex flex-col items-center mb-10 text-center">
        <Title>Recommended For You</Title>
        <p className="text-zinc-500 text-sm mt-2 max-w-md">
          Explore our top-picked products based on quality and current trends.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // লোডিং অবস্থায় ব্লিঙ্কিং স্কেলিটন দেখাবে
          Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        ) : (
          // ক্যাশ থেকে বা সার্ভার থেকে আসা ডেটা দেখাবে
          products.map((item) => (
            <Product key={item._id} item={item} />
          ))
        )}
      </div>
      
      {/* View All Button */}
      {!isLoading && products.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => navigate("/shop")} 
            className="px-10 py-3.5 bg-zinc-900 text-white rounded-full hover:bg-orange-600 transition-all duration-300 font-bold uppercase text-xs tracking-widest shadow-lg active:scale-95 cursor-pointer"
          >
            View All Products
          </button>
        </div>
      )}
    </Container>
  );
};

export default Recommended;