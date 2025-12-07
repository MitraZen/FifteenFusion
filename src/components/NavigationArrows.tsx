"use client";

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationArrows({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationArrowsProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 text-white transition-all duration-300 ${
          canGoPrevious
            ? "hover:bg-black/60 hover:scale-110 cursor-pointer"
            : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Previous memory"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 text-white transition-all duration-300 ${
          canGoNext
            ? "hover:bg-black/60 hover:scale-110 cursor-pointer"
            : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Next memory"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </>
  );
}

