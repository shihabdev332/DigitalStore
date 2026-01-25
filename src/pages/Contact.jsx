import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import toast from "react-hot-toast"; // ✅ react-hot-toast ব্যবহার করা হয়েছে
import Container from "../component/Container";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // English Comment: Simple form validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "আপনার নাম প্রয়োজন";
    if (!formData.email.trim()) errs.email = "ইমেইল প্রয়োজন";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "সঠিক ইমেইল দিন";
    if (!formData.message.trim()) errs.message = "বার্তা লিখুন";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    
    // English Comment: Simulating form submission with hot-toast
    setTimeout(() => {
      toast.success("Message sent to our concierge.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      setErrors({});
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen py-20">
      {/* ✅ ToastContainer রিমুভ করা হয়েছে কারণ এটি App.jsx এ একবার থাকলেই হয় */}
      <Container>
        {/* Header Section */}
        <div className="text-center mb-20 animate-fadeIn">
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900">
            Let’s Start a <br /> <span className="text-zinc-400 italic font-light">Conversation.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Card - Left */}
          <div className="lg:col-span-5 bg-zinc-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity"></div>
            
            <div className="relative z-10 space-y-12">
              <div>
                <h3 className="text-3xl font-bold mb-6 italic">Contact Information</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Our elite support team is available for global inquiries 24/7. Expect a response within the hour.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: <FaPhoneAlt />, label: "Direct Line", val: "+88 0123 456 789" },
                  { icon: <FaEnvelope />, label: "Official Inquiry", val: "concierge@digitalshop.com" },
                  { icon: <FaMapMarkerAlt />, label: "Global HQ", val: "Gulshan, Dhaka, Bangladesh" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl group-hover/item:bg-white group-hover/item:text-zinc-900 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg font-medium">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-12 flex gap-6">
              {[<FaTwitter />, <FaLinkedin />, <FaInstagram />, <FaGlobe />].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form Section - Right */}
          <div className="lg:col-span-7 bg-zinc-50 rounded-[3rem] p-10 md:p-16 border border-zinc-100 shadow-sm relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full bg-white border-b-2 py-4 px-2 outline-none transition-all focus:border-zinc-900 ${errors.name ? 'border-red-400' : 'border-zinc-200'}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className={`w-full bg-white border-b-2 py-4 px-2 outline-none transition-all focus:border-zinc-900 ${errors.email ? 'border-red-400' : 'border-zinc-200'}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Your Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist you today?"
                  className={`w-full bg-white border-b-2 py-4 px-2 outline-none transition-all focus:border-zinc-900 resize-none ${errors.message ? 'border-red-400' : 'border-zinc-200'}`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full md:w-max bg-zinc-900 text-white px-16 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-zinc-400"
              >
                <span className={isSubmitting ? "opacity-0" : "opacity-100"}>Send Message</span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;