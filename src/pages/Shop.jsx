import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../config";
import Title from "../component/Title";
import PaginationProductList from "../component/PaginationProductList";
import Container from "../component/Container";
import ProductsSideNav from "../component/ProductsSideNav";
import ProductSkeleton from "../component/ProductSkeleton";

const Shop = () => {
  const [sortType, setSortType] = useState("latest");
  // ✅ States for Filtering
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(100000); // Increased default for premium range

  // ✅ Fetching Data using TanStack Query
  const { data: rawProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${serverUrl}/api/product/list`);
      return res.data.product;
    },
    staleTime: 1000 * 60 * 30, // 30 mins cache
    refetchOnWindowFocus: false,
  });

  // ✅ Advanced Filtering & Sorting Logic
  const filteredAndSortedProducts = useMemo(() => {
    if (!rawProducts) return [];
    
    let tempProducts = [...rawProducts];

    // 1. Filter by Category
    if (selectedCategory) {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by Price
    tempProducts = tempProducts.filter(p => p.price <= priceRange);

    // 3. Sort Results
    switch (sortType) {
      case "lowToHigh":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        tempProducts.reverse(); // Latest Arrivals
    }

    return tempProducts;
  }, [rawProducts, sortType, selectedCategory, priceRange]);

  return (
    <main className="bg-white min-h-screen selection:bg-orange-100">
      {/* Header Section: Premium Apple-style Glassmorphism background */}
      <div className="relative bg-[#fafafa] border-b border-zinc-100 py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[140px]"></div>
        
        <Container>
          <div className="relative z-10">
            <Title className="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-none mb-6">
              Explore <span className="text-orange-600">Premium.</span>
            </Title>
            <p className="text-zinc-500 max-w-lg text-base md:text-lg font-medium leading-relaxed">
              Curated tech essentials for the modern lifestyle. Precision-engineered products at your fingertips.
            </p>
          </div>
        </Container>
      </div>

      <Container className="mt-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Sidebar Section */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky z-50 top-24">
              <ProductsSideNav 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 pb-32">
            {/* Top Action Bar: Clean & Minimal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 bg-zinc-50/80 backdrop-blur-md p-5 rounded-3xl border border-zinc-100 shadow-sm">
              <div className="flex flex-col px-2">
                <h4 className="text-zinc-900 font-bold text-xl tracking-tight capitalize">
                  {selectedCategory || "All Collections"}
                </h4>
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em] mt-1">
                  {isLoading ? "Syncing Inventory..." : `${filteredAndSortedProducts.length} Exclusive Units`}
                </p>
              </div>

              {/* Sorting Tool */}
              <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-zinc-200/60 shadow-sm w-full sm:w-auto transition-all hover:border-zinc-300">
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Sort:</span>
                <select 
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-transparent text-xs font-extrabold text-zinc-900 outline-none cursor-pointer w-full focus:ring-0"
                >
                  <option value="latest">New Arrivals</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid / Skeleton */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
                {/* শিহাব, আমি ধরে নিচ্ছি PaginationProductList এর ভেতর বাটনগুলো আছে। 
                   সেখানে তুমি Tailwind এর এই ক্লাসগুলো ব্যবহার করলে বাটনগুলো প্রিমিয়াম দেখাবে:
                   - Next/Prev: bg-zinc-900 text-white rounded-full px-8 py-3 hover:bg-zinc-800 transition-all shadow-xl
                */}
                <PaginationProductList items={filteredAndSortedProducts} />
              </div>
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-zinc-100 rounded-[4rem] bg-zinc-50/30">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-zinc-900 font-bold text-xl">No Matches Found</h3>
                <p className="text-zinc-400 font-medium mt-2 max-w-xs mx-auto">Try adjusting your filters or search criteria for better results.</p>
                <button 
                  onClick={() => {setSelectedCategory(""); setPriceRange(100000);}}
                  className="mt-8 bg-zinc-900 text-white px-10 py-3.5 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>

        </div>
      </Container>
    </main>
  );
};

export default Shop;