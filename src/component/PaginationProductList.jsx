import React, { useState } from "react";
import ProductBanner from "./ProductBanner";
import Pagination from "./Pagination";

/**
 * PaginationProductList Component
 * Handles the display of product items with grid/list view toggle and items per page logic.
 */
const PaginationProductList = ({ items = [] }) => {
  // Local state for items per page and view mode (grid/list)
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("grid");

  // English Comment: Update items per page based on user selection from the banner
  const handleItemsPerPage = (num) => {
    setItemsPerPage(Number(num));
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Banner Section: 
          Contains sorting, view mode toggles, and results counter.
      */}
      <div className="bg-white/80 rounded-[2.5rem] p-6 border border-zinc-100 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow duration-500">
        <ProductBanner 
          itemsPerPageFormBanner={handleItemsPerPage} 
          totalProducts={items.length}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
      </div>

      {/* Product Display Section:
          Renders the Pagination component or an empty state message.
      */}
      <div className="min-h-[600px] w-full pb-20">
        {items.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            {/* শিহাব, তোমার Pagination.jsx কম্পোনেন্টের ভেতরে 
              Next/Prev বাটনে নিচের লজিকটি নিশ্চিত করো:
              disabled={currentPage === totalPages} 
              className="disabled:cursor-not-allowed disabled:opacity-30"
            */}
            <Pagination 
              itemsPerPage={itemsPerPage} 
              products={items} 
              viewMode={viewMode}
            />
          </div>
        ) : (
          /* Empty State: Premium Minimal Design */
          <div className="flex flex-col items-center justify-center py-40 bg-zinc-50/50 rounded-[4rem] border-2 border-dashed border-zinc-200/60">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-zinc-200/50 animate-bounce">
              <svg 
                className="w-10 h-10 text-zinc-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.5" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <h3 className="text-zinc-900 font-black text-3xl tracking-tighter">No Matches Found</h3>
            <p className="text-zinc-500 text-base mt-3 max-w-[300px] text-center leading-relaxed font-medium">
              We couldn't find any products. Try adjusting your filters or price range.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-10 px-10 py-3.5 bg-zinc-900 text-white rounded-full font-bold text-sm hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationProductList;