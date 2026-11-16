
import React, { useEffect, useState } from "react";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProductVideo from "./components/ProductVideo";
import Products from "./components/Products";
import About from "./components/About";
import Lab from "./components/Lab";
import Standard from "./components/Standard";
import WhyUs from "./components/WhyUs";
import Distributor from "./components/Distributor";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


import VerifyPage from "./pages/VerifyPage";
import AboutPage from "./pages/AboutPage";
import LabPage from "./pages/LabPage";
import StandardPage from "./pages/StandardPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductInfo from "./pages/ProductInfo";
import ManufacturingDetails from "./pages/ManufacturingDetails";

import { CartProvider } from "./context/CartContext";



function Home() {
  return (
    <div className="leather-bg">
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About compact />
        <ProductVideo />
        <Lab compact />
        <Standard compact />
        <Products />
        <WhyUs />
        <Distributor />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}



function AppContent() {


  const [path, setPath] = useState(() => {
    return window.location.pathname.replace(/\/+$/, "") || "/";
  });


  useEffect(() => {

    const onPop = () => {
      setPath(
        window.location.pathname.replace(/\/+$/, "") || "/"
      );
    };

    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
    };

  }, []);


  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }, [path]);



  if (path === "/verify") {
    return <VerifyPage />;
  }

  if (path === "/about") {
    return <AboutPage />;
  }

  if (path === "/lab") {
    return <LabPage />;
  }

  if (path === "/standard") {
    return <StandardPage />;
  }

  if (path === "/cart") {
    return <Cart />;
  }

  if (path === "/checkout") {
    return <Checkout />;
  }

  if (path === "/order-success") {
    return <OrderSuccess />;
  }



  if (path === "/manufacturing-details") {
    return <ManufacturingDetails />;
  }


  if (path.startsWith("/product/")) {
    return <ProductInfo />;
  }



  return <Home />;
}



export default function App() {

  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );

}
