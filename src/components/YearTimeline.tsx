"use client";

interface YearTimelineProps {
  totalYears: number;
  currentYear: number;
  onYearClick: (year: number) => void;
}

export function YearTimeline({
  totalYears,
  currentYear,
  onYearClick,
}: YearTimelineProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-md border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
        <div className="flex gap-2 md:gap-4 justify-center items-center min-w-max">
          {Array.from({ length: totalYears }, (_, i) => i + 1).map((year) => (
            <button
              key={year}
              onClick={() => onYearClick(year)}
              className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 min-w-[60px] md:min-w-[80px] ${
                currentYear === year
                  ? "bg-pink-500 text-white scale-110 shadow-lg"
                  : "bg-white/20 text-white/80 hover:bg-white/30 hover:scale-105"
              }`}
              aria-label={`Go to year ${year}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

