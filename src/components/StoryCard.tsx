"use client";

import { Memory } from "@/types/memory";
import Image from "next/image";
import { useState } from "react";

interface StoryCardProps {
  memory: Memory;
  isActive: boolean;
}

export function StoryCard({ memory, isActive }: StoryCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = memory.photos.length > 0 ? memory.photos : [memory.imageUrl];

  // Auto-advance photos every 4 seconds if multiple photos
  // useEffect(() => {
  //   if (!isActive || photos.length <= 1) return;
  //   const interval = setInterval(() => {
  //     setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [isActive, photos.length]);

  const currentPhoto = photos[currentPhotoIndex] || memory.imageUrl;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <div className="relative w-full h-full">
        {/* Main Photo Background */}
        <div className="absolute inset-0">
          <Image
            src={currentPhoto}
            alt={`${memory.year} years - ${memory.title} - Photo ${currentPhotoIndex + 1}`}
            fill
            className="object-cover"
            priority={isActive}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        </div>

        {/* Photo Gallery Thumbnails (if multiple photos) */}
        {photos.length > 1 && (
          <div className="absolute top-4 left-4 right-4 z-30">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentPhotoIndex
                      ? "border-pink-400 scale-110 shadow-lg"
                      : "border-white/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
            <div className="text-white/80 text-sm mt-2 text-center">
              Photo {currentPhotoIndex + 1} of {photos.length}
            </div>
          </div>
        )}

        {/* Photo Navigation Arrows (if multiple photos) */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-black/60 transition-all"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white hover:bg-black/60 transition-all"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Story Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="text-4xl md:text-6xl font-bold text-pink-200">
                Year {memory.year}
              </span>
              {memory.actualYear && (
                <span className="text-2xl md:text-3xl font-light text-white/70 ml-3">
                  ({memory.actualYear})
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              {memory.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md max-w-2xl">
              {memory.description}
            </p>
            {photos.length > 1 && (
              <div className="mt-4 text-sm text-white/70">
                {photos.length} beautiful memories captured this year
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

