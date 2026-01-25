import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query" // ✅ ইম্পোর্ট করা হয়েছে

import RootLayout from './layout/RootLayout'
import App from "./App"
import About from "./pages/About.jsx"
import Cart from "./pages/Cart.jsx"
import Contact from "./pages/Contact.jsx"
import Offers from "./pages/Offers.jsx"
import Order from "./pages/Order.jsx"

import Profile from "./pages/Profile.jsx"
import Shop from "./pages/Shop.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import SingleProduct from "./pages/SingleProduct.jsx"
import SearchPage from "./component/SearchPage.jsx";

// ✅ Query Client তৈরি করা হয়েছে
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডেটা ক্যাশ থেকে আসবে (নতুন রিকোয়েস্ট হবে না)
      cacheTime: 1000 * 60 * 30, // ৩০ মিনিট পর্যন্ত মেমোরিতে ডেটা থাকবে
      refetchOnWindowFocus: false, // অন্য ট্যাব থেকে এই ট্যাবে আসলে অটো রিফ্রেশ হবে না
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <About /> },
      { path: "/cart", element: <Cart /> },
      { path: "/contact", element: <Contact /> },
      { path: "/offers", element: <Offers /> },
      { path: "/order", element: <Order /> },
      
      { path: "/profile", element: <Profile /> },
      { path: "/shop", element: <Shop /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/product/:id", element: <SingleProduct /> },
      { path: "/search", element: <SearchPage /> },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ QueryClientProvider দিয়ে র‍্যাপ করা হয়েছে */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);