"use client";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 animate-fade-in">
      <div className="text-center px-4 animate-slide-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
          15 Years Together
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
          An Interactive Memory Journey
        </p>
        <button
          onClick={onEnter}
          className="px-8 py-4 bg-white/20 backdrop-blur-md text-white text-lg font-semibold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Begin the Journey →
        </button>
      </div>
    </div>
  );
}

