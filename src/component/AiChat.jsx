import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from "react-icons/fa";
import { cn } from "./ui/cn";

/**
 * AiChat Component
 * A premium AI assistant chat widget with fixed closing logic and enhanced UI.
 */
const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your Shopping Assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Smooth scroll to the latest message
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const { data } = await axios.post(`${serverUrl}/api/ai/chat`, { message: input });
      if (data.success) {
        setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "I'm having trouble connecting. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end">
      {/* Chat Window Container */}
      {isOpen && (
        <div className="bg-white w-[350px] md:w-[420px] h-[550px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-zinc-100 flex flex-col overflow-hidden mb-5 animate-in slide-in-from-bottom-10 fade-in duration-500 ease-out">
          
          {/* Premium Header */}
          <div className="bg-zinc-900 p-6 flex items-center justify-between text-white relative">
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-gradient-to-tr from-orange-600 to-orange-400 p-2.5 rounded-2xl shadow-lg shadow-orange-600/30">
                <FaRobot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-none">Smart Assistant</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Active Now</p>
                </div>
              </div>
            </div>

            {/* Close Button - Now perfectly functional */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="group bg-white/5 hover:bg-orange-600 p-3 rounded-xl transition-all duration-300 cursor-pointer active:scale-90"
              aria-label="Close Chat"
            >
              <FaTimes size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Chat Messages Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/30 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex w-full animate-in fade-in slide-in-from-up-2 duration-300", 
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[85%] px-5 py-3.5 text-sm leading-relaxed",
                  msg.role === "user" 
                    ? "bg-zinc-900 text-white rounded-[22px] rounded-tr-none shadow-md" 
                    : "bg-white text-zinc-800 border border-zinc-100 rounded-[22px] rounded-tl-none shadow-sm"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AI Thinking Animation */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-[22px] rounded-tl-none border border-zinc-100 flex gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Premium Input Area */}
          <div className="p-5 bg-white border-t border-zinc-100">
            <div className="flex items-center gap-3 bg-zinc-100 p-1.5 rounded-2xl focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all duration-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={cn(
                  "p-3 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95",
                  input.trim() ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                )}
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.15)] text-white transition-all duration-500 cursor-pointer active:scale-90 overflow-hidden group",
          isOpen ? "bg-zinc-900 rotate-[360deg]" : "bg-orange-600 hover:bg-orange-700 hover:scale-105"
        )}
      >
        <div className="relative z-10 transition-transform duration-300">
          {isOpen ? <FaMinus size={22} /> : <FaRobot size={24} className="group-hover:scale-110" />}
        </div>
        
        {/* Shine Animation Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
      </button>

      {/* Global CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AiChat;