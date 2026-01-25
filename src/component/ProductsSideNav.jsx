import React, { useState, useEffect } from "react";
import { FaChevronRight, FaFilter, FaTimes } from "react-icons/fa";
import { cn } from "./ui/cn";
import axios from "axios";
import { serverUrl } from "../../config";

const ProductsSideNav = ({ 
  selectedCategory = "", 
  setSelectedCategory = () => {}, 
  priceRange = 100000, 
  setPriceRange = () => {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Same 20 Categories as Admin Panel (Static Fallback)
  const staticCategories = [
    "Smartphones", "Laptops", "Tablets", "Monitors", "Processors",
    "RAM", "Motherboards", "Graphics Cards", "SSD & HDD", "Power Supply",
    "Casing", "Airbuds", "Over-Ear Headphones", "Smart Watches", "Keyboards",
    "Mouse", "Speakers", "Cameras", "Gaming Console", "Lights & Studio"
  ];

  // Fetch categories from product list to see which ones are actually active
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/product/list`);
        
        if (res.data?.success && Array.isArray(res.data.product)) {
          const allProducts = res.data.product;
          const activeCategories = [
            ...new Set(allProducts.map((p) => p.category)),
          ].filter(Boolean);
          
          // Combining static list with any other dynamic categories from DB
          const combinedCategories = [...new Set([...staticCategories, ...activeCategories])];
          setCategories(combinedCategories);
        } else {
          setCategories(staticCategories);
        }
      } catch (err) {
        console.error("Error fetching filters:", err);
        setCategories(staticCategories); // Fallback to static if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col gap-8">
      {/* Categories Section */}
      <div className="w-full">
        <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-orange-600 rounded-full"></span>
          Categories
        </h3>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-8 bg-zinc-100 animate-pulse rounded-xl w-full"></div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-1.5 max-h-[450px] overflow-y-auto no-scrollbar pr-2">
            <li 
              onClick={() => {
                setSelectedCategory("");
                setIsOpen(false);
              }}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 border border-transparent",
                selectedCategory === "" ? "bg-orange-600 text-white shadow-md shadow-orange-200 font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-orange-600"
              )}
            >
              <span className="text-sm uppercase tracking-wide">All Products</span>
              <FaChevronRight size={10} className={cn("transition-all", selectedCategory === "" ? "opacity-100" : "opacity-0")} />
            </li>

            {categories.map((cat, index) => (
              <li 
                key={index}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsOpen(false);
                }}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 border border-transparent",
                  selectedCategory === cat ? "bg-orange-600 text-white shadow-md shadow-orange-200 font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-orange-600"
                )}
              >
                <span className="text-sm capitalize tracking-tight">{cat}</span>
                <FaChevronRight size={10} className={cn("transition-all group-hover:translate-x-0", selectedCategory === cat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2")} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Filter Section */}
      <div className="w-full">
        <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-orange-600 rounded-full"></span>
          Price Range
        </h3>
        <div className="flex flex-col gap-4 px-1">
          <input 
            type="range" 
            min="0" 
            max="200000" 
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-orange-600" 
          />
          <div className="flex justify-between items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest">Max Price</span>
              <span className="text-base font-black text-zinc-800">${Number(priceRange).toLocaleString()}</span>
            </div>
            <button 
              onClick={() => setPriceRange(200000)}
              className="text-[10px] font-black text-orange-600 hover:bg-orange-600 hover:text-white transition-all bg-white border border-orange-100 px-3 py-1.5 rounded-full shadow-sm"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-8 right-8 z-[100] bg-zinc-900 text-white p-5 rounded-full shadow-2xl flex items-center gap-2 hover:scale-110 active:scale-90 transition-all border-4 border-white"
      >
        <FaFilter className="text-lg" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-full h-fit sticky top-32 z-30 bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer and Backdrop */}
      <div className={cn("fixed inset-0 z-[200] lg:hidden transition-all duration-500", isOpen ? "visible" : "invisible")}>
        <div 
          className={cn("absolute inset-0 bg-zinc-900/60 backdrop-blur-md transition-opacity duration-500", isOpen ? "opacity-100" : "opacity-0")} 
          onClick={() => setIsOpen(false)} 
        />
        
        <div className={cn(
          "absolute left-0 top-0 h-full w-[320px] bg-white p-8 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]", 
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <FaFilter size={20} className="text-orange-600"/>
              Filters
            </h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2.5 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 rounded-full transition-all"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-180px)] no-scrollbar pr-2">
            <SidebarContent />
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full mt-6 bg-zinc-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 active:scale-95"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsSideNav;