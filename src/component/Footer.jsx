import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    // Changed alert to console log or custom UI in real app, kept alert for demo but clarified msg
    alert("Thank you for subscribing to our DEMO newsletter: " + email);
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      
      {/* SECURITY DISCLAIMER STRIP - Crucial for Google Review */}
      <div className="w-full bg-slate-900 border-b border-slate-800 py-2 text-center">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
          ⚠️ Disclaimer: This is a Personal Portfolio Project | No Real Money Involved
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Digital Shop <span className="text-xs font-normal text-cyan-500">(Demo)</span>
          </h3>
          <p className="text-sm leading-relaxed mb-6 text-slate-400">
            Welcome to Digital Shop. This website is a <strong>developer portfolio project</strong> created by Shihab. 
            It demonstrates full-stack e-commerce capabilities using the MERN stack. 
            <br />
            <span className="text-xs italic opacity-75 text-yellow-500 mt-2 block">
              * Note: Products and orders are for demonstration only.
            </span>
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
              <FaYoutube size={20} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="mailto:shihab@example.com" className="hover:text-emerald-400 transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop Categories</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link to="/accessories" className="hover:text-cyan-400 transition-colors">Accessories</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-cyan-400 transition-colors">Clothes</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-cyan-400 transition-colors">Electronics</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-cyan-400 transition-colors">Home Appliances</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-cyan-400 transition-colors">New Arrivals</Link>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Your Account</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link to="/profile" className="hover:text-cyan-400 transition-colors">Profile</Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-cyan-400 transition-colors">My Orders</Link>
            </li>
            <li>
              <Link to="/address" className="hover:text-cyan-400 transition-colors">Addresses</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-cyan-400 transition-colors">Account Details</Link>
            </li>
            <li>
              {/* Added clearer text for Privacy Policy */}
              <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy (Demo)</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Payments */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-sm mb-4 text-slate-400">
            Subscribe to our newsletter for the latest demo updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-500 text-sm text-white transition-colors"
            />
            {error && <span className="text-red-400 text-xs">{error}</span>}
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors shadow-lg shadow-cyan-900/20"
            >
              Subscribe
            </button>
          </form>

          {/* Payment icons - Dimmed to show they are not active real payments */}
          <div className="mt-8">
            <p className="text-xs text-slate-500 mb-2">Supported Payments (Demo Only):</p>
            <div className="flex space-x-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal Demo"
                className="h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa Demo"
                className="h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="MasterCard Demo"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 pt-8 pb-12 text-center">
         <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Digital Shop Portfolio. Built by Shihab. All rights reserved.
         </p>
      </div>
    </footer>
  );
};

export default Footer;
