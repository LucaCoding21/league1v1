"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6">
      <h1
        className="font-display text-light"
        style={{ fontSize: "clamp(2rem, 8vw, 6rem)", lineHeight: 0.9 }}
      >
        FOUL PLAY
      </h1>
      <p className="text-light/50 mt-6 text-lg tracking-wide">
        Something went wrong. Let&apos;s run it back.
      </p>
      <button
        onClick={reset}
        className="mt-10 inline-flex items-center gap-3 px-8 py-3 border border-light/30 text-light text-xs tracking-[0.15em] uppercase hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
