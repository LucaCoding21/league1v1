"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  preloaderDone: boolean;
}

export default function Hero({ preloaderDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Set initial hidden state via GSAP (before paint, no React inline conflict)
  useLayoutEffect(() => {
    gsap.set(line1Ref.current, { yPercent: 110 });
    gsap.set(line2Ref.current, { yPercent: 110 });
    gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });
  }, []);

  // Text reveal after preloader
  useEffect(() => {
    if (!preloaderDone) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(line1Ref.current, {
      yPercent: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        line2Ref.current,
        { yPercent: 0, duration: 0.8, ease: "power3.out" },
        "-=0.55"
      )
      .to(
        subtitleRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .to(
        scrollRef.current,
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [preloaderDone]);

  // Scroll parallax
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        scale: 1.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text parallax — move text up faster than scroll
      gsap.to(".hero-content", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "60% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-100"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="video-overlay absolute inset-0 z-10" />

      {/* Content */}
      <div className="hero-content absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        {/* Main headline */}
        <div className="text-center">
          {/* Line 1 */}
          <div className="line-wrapper">
            <div
              ref={line1Ref}
              className="line-inner font-display text-light"
              style={{
                fontSize: "clamp(3.2rem, 11.5vw, 11.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
              }}
            >
              ONE COURT
            </div>
          </div>

          {/* Line 2 — outlined/hollow text */}
          <div className="line-wrapper mt-1 md:mt-2 py-1">
            <div
              ref={line2Ref}
              className="line-inner font-display cd-title-stroke"
              style={{
                fontSize: "clamp(3.2rem, 11.5vw, 11.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
              }}
            >
              ONE CROWN
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-6 md:mt-10">
          <p
            className="text-light/60 tracking-[0.3em] uppercase text-center"
            style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.8rem)" }}
          >
            1V1 Basketball &nbsp;&middot;&nbsp; Weight Classes
            &nbsp;&middot;&nbsp; One Winner
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-light/30 text-[0.6rem] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-light/50 to-transparent" />
      </div>
    </section>
  );
}
