"use client";

import { Memory } from "@/types/memory";
import Image from "next/image";
import { useState } from "react";

interface StoryCardProps {
  memory: Memory;
  isActive: boolean;
}

export function StoryCard({ memory, isActive }: StoryCardProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  
  // Ensure we always have at least one photo to display
  const photos = memory.photos && memory.photos.length > 0 
    ? memory.photos 
    : (memory.imageUrl ? [memory.imageUrl] : []);

  // Create a collage layout - show up to 12 photos in a grid
  const displayPhotos = photos.slice(0, 12);
  const remainingCount = photos.length - 12;

  // Debug: Log if no photos
  if (photos.length === 0 && isActive) {
    console.warn(`No photos found for Year ${memory.year}`, memory);
  }

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 overflow-y-auto ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      }`}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500">
        {/* Header Section */}
        <div className="sticky top-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/20 px-4 md:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-2">
              <span className="text-3xl md:text-5xl font-bold text-pink-200">
                Year {memory.year}
              </span>
              {memory.actualYear && (
                <span className="text-xl md:text-2xl font-light text-white/70 ml-3">
                  ({memory.actualYear})
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
              {memory.title}
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md max-w-3xl">
              {memory.description}
            </p>
            {photos.length > 1 && (
              <div className="mt-3 text-sm text-white/70">
                {photos.length} beautiful memories captured this year
              </div>
            )}
          </div>
        </div>

        {/* Photo Collage Grid */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {displayPhotos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white/70 text-lg mb-4">No photos found for this year</div>
              <div className="text-white/50 text-sm">Photos will appear here once added to the year folder</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {displayPhotos.map((photo, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo}
                  alt={`${memory.year} - Photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onError={(e) => {
                    console.error(`Failed to load image: ${photo}`, e);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Photo {index + 1}
                </div>
              </div>
              ))}
              
              {/* Show remaining count if more than 12 photos */}
              {remainingCount > 0 && (
                <div className="relative aspect-square rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-all duration-300">
                  <div className="text-center text-white">
                    <div className="text-3xl md:text-4xl font-bold mb-1">+{remainingCount}</div>
                    <div className="text-xs md:text-sm">more photos</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Full Photo Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <Image
                src={selectedPhoto}
                alt="Full size photo"
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-all"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
