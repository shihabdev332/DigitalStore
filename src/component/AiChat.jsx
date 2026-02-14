import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus, FaSparkles } from "react-icons/fa";
import { cn } from "./ui/cn";

/**
 * Premium AiChat Component
 * Features: Mobile-responsive height, Glassmorphism UI, and Floating Label.
 */
const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your Smart Assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
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
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[99999] font-sans flex flex-col items-end">
      
      {/* Chat Window Container */}
      {isOpen && (
        <div className={cn(
          "bg-white/95 backdrop-blur-xl w-[90vw] md:w-[400px] rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-white/20 flex flex-col overflow-hidden mb-6 transition-all duration-500 ease-out animate-in slide-in-from-bottom-12 fade-in",
          "h-[75dvh] max-h-[600px] min-h-[400px]" // Dynamic height for mobile keyboard
        )}>
          
          {/* Premium Gradient Header */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-6 flex items-center justify-between text-white shrink-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-gradient-to-tr from-orange-600 to-amber-400 p-2.5 rounded-2xl shadow-lg animate-pulse">
                  <FaRobot size={20} />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Smart Assistant</h3>
                <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-tighter">AI Powered • Online</p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <FaTimes size={18} className="text-zinc-400" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-zinc-50/50 to-white custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex w-full animate-in fade-in slide-in-from-bottom-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed shadow-sm",
                  msg.role === "user" 
                    ? "bg-zinc-900 text-white rounded-2xl rounded-tr-none" 
                    : "bg-white text-zinc-800 border border-zinc-100 rounded-2xl rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-zinc-100 px-4 py-3 rounded-2xl rounded-tl-none border border-zinc-200 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Premium Input Area */}
          <div className="p-4 bg-white/80 border-t border-zinc-100 shrink-0">
            <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-2xl focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-zinc-800 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={cn(
                  "p-3 rounded-xl transition-all flex items-center justify-center cursor-pointer active:scale-95",
                  input.trim() ? "bg-orange-600 text-white shadow-md shadow-orange-600/30" : "bg-zinc-200 text-zinc-400"
                )}
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button Group */}
      <div className="relative group flex flex-col items-center">
        {/* "AI Assistant" Label - Above the icon */}
        {!isOpen && (
          <div className="mb-3 px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-xl animate-bounce border border-zinc-800 whitespace-nowrap">
            AI Assistant
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-800"></div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative p-5 rounded-full shadow-2xl text-white transition-all duration-500 cursor-pointer active:scale-90 overflow-hidden",
            isOpen ? "bg-zinc-900 rotate-180" : "bg-gradient-to-br from-orange-600 to-amber-500 hover:scale-110"
          )}
        >
          <div className="relative z-10">
            {isOpen ? <FaMinus size={20} /> : <FaRobot size={26} />}
          </div>
          
          {/* Shine effect for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        </button>
      </div>

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
