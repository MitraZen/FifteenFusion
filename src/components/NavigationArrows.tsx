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
    <div className="flex justify-center gap-4 mb-4 px-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 text-white transition-all duration-300 ${
          canGoPrevious
            ? "hover:bg-black/60 hover:scale-110 cursor-pointer"
            : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Previous memory"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
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
        className={`p-3 md:p-4 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/30 text-white transition-all duration-300 ${
          canGoNext
            ? "hover:bg-black/60 hover:scale-110 cursor-pointer"
            : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Next memory"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
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
    </div>
  );
}

