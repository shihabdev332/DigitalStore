import logo from "../assets/images/logo.png";
import Container from "./Container";
import SearchInput from "./SearchInput";
import { FaUserAlt, FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { headerNavigation } from "../constant";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, Fragment } from "react";
import Title from "./Title";
import { IoMdClose } from "react-icons/io";
import SocialLinks from "./SocialLinks";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../config";

const Header = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.digital);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = async (query) => {
    try {
      if (!query) return setSearchResults([]);
      const res = await axios.get(
        `${serverUrl}/api/product/search?query=${query}`,
      );
      if (res.data.success) {
        setSearchResults(res.data.product);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-b-[1px] border-slate-200 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <Container className="py-4 flex items-center gap-x-4 justify-between">
        {/* Logo */}
        <Link to={"/"} className="hover:opacity-80 transition-opacity">
          <img
            src={logo}
            alt="logo"
            className="h-[35px] md:h-[45px] w-auto object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <SearchInput onSearch={handleSearch} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[13px] uppercase font-bold tracking-widest text-zinc-600">
          {headerNavigation?.map((item) => (
            <NavLink
              key={item?.title}
              to={item.link}
              className={({ isActive }) =>
                `relative group overflow-hidden transition-colors ${
                  isActive ? "text-zinc-900" : "hover:text-zinc-900"
                }`
              }
            >
              {item?.title}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 -translate-x-[110%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </NavLink>
          ))}

          {/* User Icon/Profile (Desktop) */}
          {token ? (
            <Link
              to={"/profile"}
              className="flex items-center gap-2 text-zinc-900 hover:opacity-70 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                <FaUserAlt size={14} />
              </div>
            </Link>
          ) : (
            <Link
              to={"/signin"}
              className="text-xl text-zinc-800 hover:scale-110 transition-transform"
            >
              <FaRegUserCircle />
            </Link>
          )}
        </div>

        {/* Right Icons (Cart & Mobile Menu) */}
        <div className="flex items-center gap-4">
          <Link to={"/cart"} className="relative group p-2">
            <FaShoppingCart className="text-2xl text-zinc-800 group-hover:text-zinc-600 transition-colors" />
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
              {products?.length || 0}
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-3xl text-zinc-900 p-1 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>

        {/* Premium Mobile Menu (Dialog) */}
        <Transition show={isOpen} as={Fragment}>
          <Dialog onClose={() => setIsOpen(false)} className="relative z-[100]">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-hidden">
              <div className="flex h-full items-center justify-end">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="w-full max-w-sm h-full bg-white shadow-2xl flex flex-col">
                    {/* Menu Header */}
                    <div className="p-6 flex items-center justify-between border-b border-zinc-100">
                      <Title className="text-2xl font-black tracking-tighter text-zinc-900">
                        MENU
                      </Title>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-900 text-2xl"
                      >
                        <IoMdClose />
                      </button>
                    </div>

                    {/* Profile Section inside Mobile Menu */}
                    <div className="p-6 bg-zinc-50 border-b border-zinc-100">
                      {token ? (
                        <div
                          onClick={() => {
                            navigate("/profile");
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-4 cursor-pointer group"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center text-xl shadow-lg">
                            <FaUserAlt />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                              Welcome back
                            </p>
                            <p className="text-lg font-black text-zinc-900 group-hover:text-zinc-600 transition-colors">
                              {user?.name || "Member"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to="/signin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-zinc-300 flex items-center justify-center text-zinc-400">
                            <FaRegUserCircle size={28} />
                          </div>
                          <div>
                            <p className="text-lg font-black text-zinc-900">
                              Sign In
                            </p>
                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-tighter">
                              Access your account
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {headerNavigation?.map((item) => (
                        <NavLink
                          key={item?.title}
                          to={item?.link}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between group"
                        >
                          <span className="text-xl font-bold text-zinc-800 group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-tighter">
                            {item?.title}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-zinc-900 transition-colors" />
                        </NavLink>
                      ))}
                    </div>

                    {/* Footer Socials */}
                    <div className="p-8 border-t border-zinc-100">
                      <SocialLinks />
                      <p className="mt-6 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] text-center">
                        Digital Shop &copy; 2026
                      </p>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </Container>
    </div>
  );
};

export default Header;
