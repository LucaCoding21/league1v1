"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    number: "01",
    title: "WEIGHT CLASSES",
    description:
      "Fair fights only. You compete against players your size, your build, your speed. No mismatches. No excuses.",
  },
  {
    number: "02",
    title: "PURE SKILL",
    description:
      "No screens. No plays. No teammates to bail you out. Just handles, footwork, and heart.",
  },
  {
    number: "03",
    title: "ONE WINNER",
    description:
      "Every matchup ends with someone walking off the court crowned. No draws. No participation trophies.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const video1ContainerRef = useRef<HTMLDivElement>(null);
  const video2ContainerRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Section label entrance ──
      gsap.fromTo(
        ".about-label",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Video 1 expands ──
      gsap.fromTo(
        video1ContainerRef.current,
        {
          clipPath: "inset(12% 8% 12% 8% round 12px)",
          scale: 0.92,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top 55%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // ── Video 2 expands (slight delay) ──
      gsap.fromTo(
        video2ContainerRef.current,
        {
          clipPath: "inset(12% 8% 12% 8% round 12px)",
          scale: 0.92,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top 48%",
            end: "center 38%",
            scrub: 1,
          },
        }
      );

      // ── Video overlay labels ──
      gsap.fromTo(
        ".video-label",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "25% center",
          },
        }
      );

      // ── Manifesto word-by-word reveal ──
      const words = manifestoRef.current?.querySelectorAll(".reveal-word");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.08 },
          {
            opacity: 1,
            stagger: 0.04,
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 65%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );
      }

      // ── Description paragraph fade in ──
      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
          },
        }
      );

      // ── Pillar divider lines ──
      gsap.fromTo(
        ".pillar-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Pillar content stagger ──
      gsap.fromTo(
        ".pillar-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="reveal-word inline-block mr-[0.3em]">
        {word}
      </span>
    ));

  return (
    <section id="about" ref={sectionRef}>
      {/* ═══════════════════════════════════════
          ACT 1 — VIDEO DIPTYCH
          ═══════════════════════════════════════ */}
      <div
        ref={videoSectionRef}
        className="bg-dark relative pt-20 md:pt-40 pb-16 md:pb-32"
      >
        {/* Section label */}
        <div className="about-label text-center mb-10 md:mb-20">
          <span className="text-light/30 text-[0.65rem] tracking-[0.3em] uppercase font-medium">
            The League
          </span>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-6 md:px-10 max-w-[1400px] mx-auto">
          {/* Video 1 */}
          <div
            ref={video1ContainerRef}
            className="relative overflow-hidden aspect-[3/2] md:aspect-[4/5]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/highlight1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/10 to-transparent" />
            <div className="video-label absolute top-8 left-8 md:top-12 md:left-12">
              <span
                className="font-display text-light block"
                style={{
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  lineHeight: 0.9,
                }}
              >
                ALL
              </span>
              <span
                className="font-display text-light block"
                style={{
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  lineHeight: 0.9,
                }}
              >
                SKILL
              </span>
            </div>
          </div>

          {/* Video 2 */}
          <div
            ref={video2ContainerRef}
            className="relative overflow-hidden aspect-[3/2] md:aspect-[4/5]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/highlight2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/10 to-transparent" />
            <div className="video-label absolute top-8 right-8 md:top-12 md:right-12 text-right">
              <span
                className="font-display text-light block"
                style={{
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  lineHeight: 0.9,
                }}
              >
                NO
              </span>
              <span
                className="font-display text-light block"
                style={{
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  lineHeight: 0.9,
                }}
              >
                MERCY
              </span>
            </div>
          </div>
        </div>

        {/* Accent line */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-10 md:mt-16">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ACT 2 — MANIFESTO + PILLARS
          ═══════════════════════════════════════ */}
      <div className="bg-cream relative py-20 md:py-56 px-6 md:px-10">
        {/* Manifesto */}
        <div className="max-w-[1100px] mx-auto text-center">
          <div
            ref={manifestoRef}
            className="font-display text-ink"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 5rem)",
              lineHeight: 1.1,
            }}
          >
            <div className="mb-2">
              {renderWords("WE DIDN'T BUILD THIS FOR TEAMS.")}
            </div>
            <div className="mb-2">
              {renderWords("WE BUILT IT FOR THE ONES WHO")}
            </div>
            <div>{renderWords("SAY 'RUN IT BACK' AND MEAN IT.")}</div>
          </div>

          <p
            ref={descRef}
            className="text-ink-muted mt-10 md:mt-16 max-w-[580px] mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
          >
            League 1V1 is basketball stripped to its purest form. Weight classes.
            Tournament brackets. No screens to hide behind, no teammates to
            blame. Just you, your handles, and the truth.
          </p>
        </div>

        {/* Pillars */}
        <div
          ref={pillarsRef}
          className="max-w-[1200px] mx-auto mt-16 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PILLARS.map((pillar, i) => (
            <div key={i}>
              <div className="pillar-line h-[2px] bg-ink/10 mb-5 md:mb-8 origin-left" />
              <div className="pillar-content">
                <span className="text-accent text-xs font-bold tracking-[0.25em]">
                  {pillar.number}
                </span>
                <h3 className="font-display text-ink text-2xl md:text-3xl mt-3 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-ink-muted text-sm leading-relaxed max-w-[320px]">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
