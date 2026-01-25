import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogOut from "../component/LogOut";
import { FaUserCircle, FaShoppingBag, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";

const Profile = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
    }
  }, [token, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-zinc-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 border-4 border-white shadow-lg">
              <FaUserCircle size={80} />
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              {user.name}
            </h1>
            <p className="text-zinc-500 font-medium">{user.email}</p>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Verified Account
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <LogOut />
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Orders Card */}
          <Link
            to="/order"
            className="group bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-500"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                <FaShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">My Orders</h3>
                <p className="text-sm text-zinc-500">
                  Track your orders and view order history
                </p>
              </div>
            </div>
          </Link>

          {/* Shipping Address Card */}
          <div className="group bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-zinc-50 text-zinc-400 rounded-2xl flex items-center justify-center">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Shipping Address
                </h3>
                <p className="text-sm text-zinc-500">
                  View your saved delivery addresses
                </p>
              </div>
            </div>
          </div>

          {/* Account Security Card (No Change Password) */}
          <div className="group bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-zinc-50 text-zinc-400 rounded-2xl flex items-center justify-center">
                <FaShieldAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Account Security
                </h3>
                <p className="text-sm text-zinc-500">
                  Manage account protection and privacy
                </p>
              </div>
            </div>
          </div>

          {/* Welcome / Membership Card */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-[2rem] text-white shadow-lg shadow-orange-100">
            <h3 className="text-xl font-black mb-2">Premium Member</h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              Thank you for being with us! We’re always here to make your
              shopping experience smooth and enjoyable.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
