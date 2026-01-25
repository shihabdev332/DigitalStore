import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../config";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import ProductSkeleton from "./ProductSkeleton";

const Review = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // 1. Fetch reviews and check permission (Is the user a verified buyer?)
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await axios.get(`${serverUrl}/api/review/${productId}`, {
        headers: { token },
      });
      return res.data;
    },
  });

  // 2. Mutation for posting a new review
  const mutation = useMutation({
    mutationFn: (newReview) => {
      return axios.post(`${serverUrl}/api/review/add`, newReview, {
        headers: { token },
      });
    },
    onSuccess: () => {
      // Refresh the reviews list after successful post
      queryClient.invalidateQueries(["reviews", productId]);
      setComment("");
      alert("Review added successfully!");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to post review");
    },
  });

  if (isLoading)
    return (
      <div className="mt-10">
        <ProductSkeleton />
      </div>
    );

  return (
    <div className="mt-16 bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
      <h2 className="text-2xl font-black text-zinc-900 mb-8">Customer Reviews</h2>

      {/* Review Form - Only visible to verified buyers */}
      {data?.canReview ? (
        <div className="mb-12 p-6 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
          <p className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Write a Review (Verified Buyer)
          </p>
          
          {/* Star Rating Selection */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer transition-colors ${
                  star <= rating ? "text-orange-500" : "text-zinc-300"
                }`}
                onClick={() => setRating(star)}
                size={24}
              />
            ))}
          </div>

          <textarea
            className="w-full p-4 rounded-2xl border border-zinc-200 focus:ring-2 focus:ring-orange-500 outline-none h-32 text-sm bg-white"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={() => mutation.mutate({ productId, rating, comment })}
            className="mt-4 px-8 py-3 bg-zinc-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95 disabled:bg-zinc-400"
            disabled={mutation.isPending || !comment.trim()}
          >
            {mutation.isPending ? "Posting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <div className="mb-10 p-4 bg-orange-50 text-orange-700 text-xs font-bold rounded-xl border border-orange-100">
          Only customers who have purchased this product can leave a review.
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {data?.reviews?.length > 0 ? (
          data.reviews.map((rev) => (
            <div key={rev._id} className="pb-6 border-b border-zinc-50 last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-orange-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={i < rev.rating ? "text-orange-500" : "text-zinc-200"} />
                  ))}
                </div>
                <span className="text-xs font-black text-zinc-900">
                  {rev.userName || "Anonymous"}
                </span>
                <span className="bg-zinc-100 text-[10px] px-2 py-0.5 rounded-full text-zinc-500 font-bold uppercase tracking-tighter">
                  Verified Purchase
                </span>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))
        ) : (
          <p className="text-zinc-400 text-sm italic py-4">
            No reviews yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default Review;