"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  preloaderDone: boolean;
}

export default function Navbar({ preloaderDone }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation after preloader
  useEffect(() => {
    if (!preloaderDone || !navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
  }, [preloaderDone]);

  // Menu overlay animation
  useEffect(() => {
    if (!menuRef.current || !menuLinksRef.current) return;

    if (menuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        menuLinksRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 opacity-0 ${
          scrolled
            ? "bg-light/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-baseline gap-1.5 group">
            <span className={`font-display text-3xl leading-none ${scrolled ? "text-dark" : "text-light"}`}>
              LEAGUE
            </span>
            <span className={`font-display text-lg tracking-[0.25em] leading-none transition-colors duration-300 ${
              scrolled
                ? "text-dark/40 group-hover:text-dark/70"
                : "text-light/40 group-hover:text-light/70"
            }`}>
              1V1
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#about"
              className={`relative text-xs transition-colors duration-300 tracking-[0.2em] uppercase font-medium group ${
                scrolled
                  ? "text-dark/50 hover:text-dark"
                  : "text-light/50 hover:text-light"
              }`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#contact"
              className={`relative inline-flex items-center gap-2 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-400 ${
                scrolled
                  ? "border border-dark/20 text-dark hover:border-accent hover:text-accent"
                  : "border border-light/30 text-light hover:border-accent hover:text-accent"
              }`}
            >
              Contact
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-[70] flex flex-col items-end gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] transition-all duration-300 ease-out ${
                menuOpen
                  ? "w-6 rotate-45 translate-y-[7px] bg-dark"
                  : `w-6 ${scrolled ? "bg-dark" : "bg-light"}`
              }`}
            />
            <span
              className={`block h-[2px] transition-all duration-300 ease-out ${
                menuOpen
                  ? "w-6 opacity-0 bg-dark"
                  : `w-4 ${scrolled ? "bg-dark" : "bg-light"}`
              }`}
            />
            <span
              className={`block h-[2px] transition-all duration-300 ease-out ${
                menuOpen
                  ? "w-6 -rotate-45 -translate-y-[7px] bg-dark"
                  : `w-6 ${scrolled ? "bg-dark" : "bg-light"}`
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] bg-light flex flex-col items-center justify-center md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div ref={menuLinksRef} className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-5xl text-dark hover:text-accent transition-colors duration-300"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
