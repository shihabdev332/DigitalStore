import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "./Product";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

// English Comment: Display list of items for current page
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems?.map((item) => (
          <Product key={item?._id} item={item} className="w-full transition-all duration-500" />
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, products }) => {
  const [itemOffset, setItemOffset] = useState(0);
  
  // English Comment: Pagination math
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const currentPage = Math.floor(itemOffset / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    // Scroll to top when page changes for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <Items currentItems={currentItems} />
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row gap-8 justify-between items-center py-10 border-t border-zinc-100">
        
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          
          // Next & Previous Buttons with Icons
          previousLabel={<HiOutlineChevronLeft size={20} />}
          nextLabel={<HiOutlineChevronRight size={20} />}
          
          // Container Styling
          containerClassName="flex items-center gap-2 select-none"
          
          // Page Numbers Styling
          pageClassName="block "
          pageLinkClassName="w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl border border-zinc-200 text-zinc-900 font-bold text-xs hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 shadow-sm"
          
          // Active Page Styling
          activeLinkClassName="bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200 scale-110"
          
          // Previous Button Styling
          previousClassName="block"
          previousLinkClassName={`w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 transition-all duration-300 shadow-sm
            ${currentPage === 0 
              ? "bg-gray-50 text-gray-300 cursor-not-allowed" // ✅ Denied State for First Page
              : "bg-white text-zinc-900 hover:bg-zinc-900 hover:text-white cursor-pointer"}`}
          
          // Next Button Styling
          nextClassName="block"
          nextLinkClassName={`w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 transition-all duration-300 shadow-sm
            ${currentPage === pageCount - 1 
              ? "bg-gray-50 text-gray-300 cursor-not-allowed" // ✅ Denied State for Last Page
              : "bg-white text-zinc-900 hover:bg-zinc-900 hover:text-white cursor-pointer"}`}
          
          // Break/Dots Styling
          breakLabel="..."
          breakClassName="text-zinc-400 px-2"
        />

        {/* Stats Section */}
        <div className="bg-zinc-50 px-6 py-3 rounded-2xl border border-zinc-100 shadow-inner">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
            Showing <span className="text-zinc-900">{itemOffset + 1}</span> — <span className="text-zinc-900">{Math.min(endOffset, products.length)}</span> of <span className="text-zinc-900 text-lg">{products?.length}</span> Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;