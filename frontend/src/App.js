import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import DemosSection from "./components/DemosSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <DemosSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
