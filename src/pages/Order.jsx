import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import { FaCheckCircle, FaTruck, FaBoxOpen, FaClock, FaTimesCircle, FaShoppingBag, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Container from "../component/Container";
import Price from "../component/Price";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getAuthHeaders = useCallback(() => {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  }, [token]);

  const fetchOrders = useCallback(async () => {
    if (!user?._id || !token) {
      toast.error("Please login to view orders");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/order/user/${user._id}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [user?._id, token, getAuthHeaders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleClientCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      const response = await axios.put(
        `${serverUrl}/api/order/cancel`,
        { orderId },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        toast.success("Order cancelled successfully!");
        fetchOrders();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancellation failed");
    }
  };
  

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered": return { color: "text-green-600", bg: "bg-green-50", icon: <FaCheckCircle /> };
      case "Shipped": return { color: "text-blue-600", bg: "bg-blue-50", icon: <FaTruck /> };
      case "Pending": return { color: "text-amber-600", bg: "bg-amber-50", icon: <FaClock /> };
      case "Cancelled": return { color: "text-red-600", bg: "bg-red-50", icon: <FaTimesCircle /> };
      default: return { color: "text-zinc-500", bg: "bg-zinc-50", icon: <FaBoxOpen /> };
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-zinc-900 selection:text-white">
      <Container className="py-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fadeInUp">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-400">
               <FaShoppingBag className="text-zinc-900" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Purchase History</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-950 tracking-tighter leading-none">
              My <span className="text-zinc-400 italic font-light">Orders.</span>
            </h1>
          </div>
          <div className="bg-zinc-50 px-8 py-4 rounded-3xl border border-zinc-100 hidden md:block">
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Purchases</p>
            <p className="text-2xl font-black text-zinc-900">{orders.length} Orders</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-zinc-900"></div>
            <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em]">Synchronizing Records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-zinc-50 rounded-[4rem] border border-zinc-100 animate-fadeInUp">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
               <FaBoxOpen size={32} className="text-zinc-200" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">No Acquisitions Found</h2>
            <p className="text-zinc-400 font-medium mb-10">Your digital collection is currently empty.</p>
            <button 
              onClick={() => window.location.href='/shop'} 
              className="bg-zinc-950 text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-2xl"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order, index) => {
              const styles = getStatusStyles(order.status);
              return (
                <div 
                  key={order._id} 
                  className="group bg-white border border-zinc-100 rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 border-b border-zinc-50 pb-8">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] ${styles.bg} ${styles.color} border border-current/10`}>
                        {styles.icon} {order.status}
                      </div>
                      <div className="h-8 w-[1px] bg-zinc-100 hidden md:block"></div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Order Reference</p>
                        <p className="font-bold text-zinc-900">#{order._id.slice(-12).toUpperCase()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="lg:text-right">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 flex items-center lg:justify-end gap-2">
                          <FaCalendarAlt /> Date
                        </p>
                        <p className="font-bold text-zinc-900">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid - Using your Cart format */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {order.products?.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-6 bg-zinc-50/50 p-5 rounded-[2rem] border border-zinc-100/50 group/item hover:bg-white hover:shadow-xl transition-all duration-500">
                        <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shrink-0 shadow-sm group-hover/item:scale-105 transition-transform duration-500">
                          <img 
                            src={p.productId?.images?.[0] || "https://placehold.co/200x200?text=Product"} 
                            alt="asset" 
                            className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700" 
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-lg font-black text-zinc-900 leading-tight line-clamp-1">{p.productId?.name || "Premium Asset"}</p>
                          <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                             <span>Quantity: <span className="text-zinc-900">{p.quantity}</span></span>
                             <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                             <Price amount={p.productId?.price} className="text-zinc-600" />
                          </div>
                        </div>
                        <div className="text-right px-4">
                           <Price amount={p.productId?.price * p.quantity} className="text-xl font-black text-zinc-900" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Actions */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-zinc-100">
                    <div className="flex items-start gap-4 bg-zinc-50 px-8 py-5 rounded-2xl w-full md:w-fit">
                      <FaMapMarkerAlt className="mt-1 text-zinc-400" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Delivery Destination</p>
                        <p className="text-sm font-bold text-zinc-700 italic">"{order.address}"</p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-fit">
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Total Valuation</p>
                        <Price amount={order.totalAmount} className="text-5xl font-black text-zinc-950 tracking-tighter" />
                      </div>
                      
                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleClientCancel(order._id)}
                          className="w-full md:w-fit bg-zinc-950 text-white px-10 py-5 rounded-2xl hover:bg-red-600 transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 cursor-pointer"
                        >
                          Revoke Request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Order;