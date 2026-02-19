"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INQUIRY_TYPES = [
  "I want to compete",
  "Brand partnership",
  "Media inquiry",
  "General",
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/league1v1/" },
  { label: "YouTube", href: "https://www.youtube.com/@Abrahamtwins" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Heading text reveal ──
      gsap.fromTo(
        ".contact-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Info column items ──
      gsap.fromTo(
        ".contact-info-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
          },
        }
      );

      // ── Form fields stagger ──
      gsap.fromTo(
        ".form-field",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: selectedType, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-dark relative pt-20 md:pt-40 pb-16 md:pb-32"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-12 md:mb-28">
          <div className="line-wrapper">
            <div
              className="contact-line line-inner font-display text-light"
              style={{
                fontSize: "clamp(3rem, 10vw, 10rem)",
                lineHeight: 0.9,
              }}
            >
              WANT
            </div>
          </div>
          <div className="line-wrapper mt-1 md:mt-2 py-1">
            <div
              className="contact-line line-inner font-display cd-title-stroke"
              style={{
                fontSize: "clamp(3rem, 10vw, 10rem)",
                lineHeight: 0.9,
              }}
            >
              IN?
            </div>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — Info */}
          <div ref={infoRef}>
            <p className="contact-info-item text-light/60 text-lg leading-relaxed max-w-[480px]">
              Whether you&rsquo;re a baller ready to prove something, a brand
              that gets it, or just want courtside seats to the future of
              basketball &mdash; we&rsquo;re listening.
            </p>

            <div className="contact-info-item mt-10 md:mt-16">
              <span className="text-light/30 text-[0.6rem] tracking-[0.3em] uppercase block mb-4">
                Email
              </span>
              <a
                href="mailto:westcanbasketball@gmail.com"
                className="text-light hover:text-accent transition-colors duration-300 text-lg"
              >
                westcanbasketball@gmail.com
              </a>
            </div>

            <div className="contact-info-item mt-10">
              <span className="text-light/30 text-[0.6rem] tracking-[0.3em] uppercase block mb-5">
                Follow the movement
              </span>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-5 py-2.5 border border-light/25 text-light/80 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/10 flex items-center gap-2"
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <path
                        d="M1 9L9 1M9 1H3M9 1v6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-info-item mt-10">
              <span className="text-light/30 text-[0.6rem] tracking-[0.3em] uppercase block mb-4">
                Location
              </span>
              <p className="text-light/50 text-sm leading-relaxed">
                Vancouver, BC
                <br />
                The court is everywhere.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[280px] md:min-h-[400px]">
                <span className="font-display text-accent text-4xl md:text-5xl">
                  WE SEE YOU.
                </span>
                <p className="text-light/50 mt-4 text-lg">
                  We&rsquo;ll be in touch soon. Stay ready.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8"
              >
                <div className="form-field">
                  <label className="text-light/50 text-[0.6rem] tracking-[0.3em] uppercase block mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-light/30 text-light py-3 text-lg focus:outline-none focus:border-accent transition-colors duration-300 placeholder:text-light/30"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-field">
                  <label className="text-light/50 text-[0.6rem] tracking-[0.3em] uppercase block mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-light/30 text-light py-3 text-lg focus:outline-none focus:border-accent transition-colors duration-300 placeholder:text-light/30"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-field">
                  <label className="text-light/50 text-[0.6rem] tracking-[0.3em] uppercase block mb-3">
                    I am a...
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`px-5 py-2.5 border text-xs tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
                          selectedType === type
                            ? "border-accent text-accent bg-accent/10"
                            : "border-light/25 text-light/60 hover:border-accent/50 hover:text-light/80"
                        }`}
                        onClick={() => setSelectedType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label className="text-light/50 text-[0.6rem] tracking-[0.3em] uppercase block mb-3">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-light/30 text-light py-3 text-lg focus:outline-none focus:border-accent transition-colors duration-300 placeholder:text-light/30 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {error && (
                  <p className="form-field text-red-400 text-sm">{error}</p>
                )}

                <div className="form-field pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cta-button-light disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send it"}
                    {!loading && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M1 7h12M8 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
