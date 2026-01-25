import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import Container from "./Container"; // কন্টেইনার ইম্পোর্ট
import { serverUrl } from "../../config";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }
      try {
        setLoading(true);
        // আপনার config ফাইল থেকে serverUrl ব্যবহার করা হয়েছে
        const res = await axios.get(`${serverUrl}/api/product/search?query=${encodeURIComponent(query)}`);
        
        if (res.data.success) {
          setProducts(res.data.product);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Search Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <Container className="py-10 min-h-[60vh]">
      {/* Header Section */}
      <div className="border-b pb-4 mb-8">
        <h2 className="text-2xl font-bold text-zinc-800">
          {query ? (
            <span>Search results for: <span className="text-orange-500">"{query}"</span></span>
          ) : (
            "Explore Our Products"
          )}
        </h2>
        <p className="text-zinc-500 text-sm mt-1">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Logic to show Loading, Products, or Empty State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 bg-zinc-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Product key={p._id} item={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-zinc-700">No products found</h3>
          <p className="text-zinc-500">Try checking your spelling or use more general keywords.</p>
        </div>
      )}
    </Container>
  );
};

export default SearchPage;