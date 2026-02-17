"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <SmoothScroll>
      <Preloader onComplete={handlePreloaderComplete} />
      <Navbar preloaderDone={preloaderDone} />

      <main>
        <Hero preloaderDone={preloaderDone} />
        <About />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
