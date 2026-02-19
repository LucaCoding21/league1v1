import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6">
      <h1
        className="font-display text-light"
        style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.9 }}
      >
        404
      </h1>
      <p className="text-light/50 mt-6 text-lg tracking-wide">
        Nothing here but empty court.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 px-8 py-3 border border-light/30 text-light text-xs tracking-[0.15em] uppercase hover:border-accent hover:text-accent transition-all duration-300"
      >
        Back to court
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7h12M8 2l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
