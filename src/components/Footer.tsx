"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "X", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Big text reveal — slides up from behind its mask
      gsap.fromTo(
        lineRef.current,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top 85%",
          },
        }
      );

      // Accent underline grows from left
      gsap.fromTo(
        ".footer-accent-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top 75%",
          },
        }
      );

      // Bottom bar fades in
      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-dark overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* ── Big type CTA ── */}
      <div className="px-6 md:px-10 pt-20 md:pt-44 pb-10 md:pb-24">
        <div ref={bigTextRef} className="max-w-[1400px] mx-auto">
          <div className="overflow-hidden">
            <div
              ref={lineRef}
              className="font-display text-light whitespace-nowrap"
              style={{
                fontSize: "clamp(3rem, 10.5vw, 12rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              RUN IT BACK.
            </div>
          </div>

          {/* Accent underline */}
          <div className="footer-accent-line mt-8 md:mt-12 h-[3px] bg-accent origin-left w-32 md:w-48" />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        ref={bottomRef}
        className="border-t border-light/10 px-6 md:px-10 py-6 md:py-8"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright */}
          <p className="text-light/25 text-xs tracking-[0.1em]">
            &copy; {new Date().getFullYear()} League 1V1
          </p>

          {/* Social links — flat, horizontal, text-only */}
          <div className="flex items-center gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-light/30 hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-light/15 text-xs tracking-[0.1em]">
            Built for the culture.
          </p>
        </div>
      </div>
    </footer>
  );
}
