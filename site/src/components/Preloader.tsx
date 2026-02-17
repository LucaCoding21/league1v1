"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hundredsRef = useRef<HTMLDivElement>(null);
  const tensRef = useRef<HTMLDivElement>(null);
  const onesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const brandLineRef = useRef<HTMLDivElement>(null);
  const brandSubRef = useRef<HTMLDivElement>(null);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let prevOnes = -1;
    let prevTens = -1;
    let prevHundreds = -1;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (containerRef.current)
          containerRef.current.style.pointerEvents = "none";
        stableOnComplete();
      },
    });

    const counter = { value: 0 };

    // ── Phase 1: Brand reveals center stage ──
    tl.fromTo(
      ".brand-char",
      { yPercent: 130, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.5,
        ease: "power3.out",
      }
    )
      .fromTo(
        brandLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.45, ease: "power3.inOut" },
        "-=0.2"
      )
      .fromTo(
        brandSubRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
        "-=0.15"
      );

    // ── Phase 2: Counter fades in bottom-right + rolls 000 → 100 ──
    tl.fromTo(
      ".counter-area",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      "-=0.3"
    );

    tl.to(
      counter,
      {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.round(counter.value);
          const ones = val % 10;
          const tens = Math.floor(val / 10) % 10;
          const hundreds = Math.floor(val / 100);

          if (ones !== prevOnes) {
            gsap.set(onesRef.current, { yPercent: -ones * 10 });
            prevOnes = ones;
          }
          if (tens !== prevTens) {
            gsap.set(tensRef.current, { yPercent: -tens * 10 });
            prevTens = tens;
          }
          if (hundreds !== prevHundreds) {
            gsap.set(hundredsRef.current, { yPercent: -hundreds * 10 });
            prevHundreds = hundreds;
          }
        },
      },
      "-=0.1"
    );

    // Sync: progress line fills under counter
    tl.to(
      progressRef.current,
      { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
      "<"
    );

    // ── Phase 3: Hold + flash ──
    tl.to({}, { duration: 0.15 }).to(".preloader-flash", {
      opacity: 0.04,
      duration: 0.04,
      yoyo: true,
      repeat: 1,
    });

    // ── Phase 4: Everything fades, curtains split ──
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    })
      .to(
        leftCurtainRef.current,
        { xPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "-=0.05"
      )
      .to(
        rightCurtainRef.current,
        { xPercent: 100, duration: 0.8, ease: "power4.inOut" },
        "<"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [stableOnComplete]);

  const digitColumn = (stripRef: React.RefObject<HTMLDivElement | null>) => (
    <div
      className="relative overflow-hidden border border-white/[0.08] border-t border-t-accent/30"
      style={{ width: 32, height: 40 }}
    >
      <div
        ref={stripRef}
        style={{ height: "1000%", willChange: "transform" }}
      >
        {DIGITS.map((d) => (
          <div
            key={d}
            className="flex items-center justify-center font-display text-light/70 text-lg"
            style={{ height: "10%" }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100]">
      {/* Curtains */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#111111]"
      >
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/20" />
      </div>
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#111111]"
      >
        <div className="absolute top-0 left-0 w-[1px] h-full bg-accent/20" />
      </div>

      {/* Flash */}
      <div className="preloader-flash absolute inset-0 bg-white opacity-0 pointer-events-none z-[5]" />

      {/* Content */}
      <div ref={contentRef} className="absolute inset-0 z-10">
        {/* ── Brand text — center stage ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="flex overflow-hidden">
            {"LEAGUE".split("").map((char, i) => (
              <span
                key={i}
                className="brand-char inline-block font-display text-light opacity-0"
                style={{
                  fontSize: "clamp(4rem, 12vw, 12rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div
            ref={brandLineRef}
            className="w-20 h-[3px] bg-accent my-3 origin-center"
            style={{ transform: "scaleX(0)" }}
          />
          <div ref={brandSubRef} style={{ opacity: 0 }}>
            <span
              className="font-display text-light/50"
              style={{
                fontSize: "clamp(1rem, 3vw, 2.5rem)",
                letterSpacing: "0.35em",
              }}
            >
              1V1
            </span>
          </div>
        </div>

        {/* ── Scoreboard counter — bottom right corner ── */}
        <div className="counter-area absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-0">
          <div className="flex items-center gap-1">
            {digitColumn(hundredsRef)}
            {digitColumn(tensRef)}
            {digitColumn(onesRef)}
          </div>
          {/* Progress line under counter */}
          <div className="w-full h-[1px] bg-white/10">
            <div
              ref={progressRef}
              className="h-full bg-accent/50 origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
