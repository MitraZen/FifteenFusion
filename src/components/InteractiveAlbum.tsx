"use client";

import { useState, useEffect, useCallback } from "react";
import { Memory } from "@/types/memory";
import { StoryCard } from "./StoryCard";
import { YearTimeline } from "./YearTimeline";
import { NavigationArrows } from "./NavigationArrows";
import { FloatingHearts } from "./FloatingHearts";
import { baseMemories } from "@/data/memories";

interface InteractiveAlbumProps {
  initialMemories?: Memory[];
}

const WEDDING_YEAR = 2009;

function getActualYear(anniversaryYear: number): number {
  return WEDDING_YEAR + anniversaryYear - 1;
}

export function InteractiveAlbum({ initialMemories }: InteractiveAlbumProps) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const minSwipeDistance = 50;

  // Load photos for all years on mount
  useEffect(() => {
    async function loadAllPhotos() {
      try {
        const response = await fetch("/api/photos");
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        const allPhotos: Record<number, string[]> = await response.json();
        
        console.log("Loaded photos from API:", allPhotos);

        const loadedMemories: Memory[] = baseMemories.map((base) => {
          const actualYear = getActualYear(base.year);
          const photos = allPhotos[base.year] || [];
          
          console.log(`Year ${base.year}: Found ${photos.length} photos`, photos);
          
          // Always ensure we have at least the fallback imageUrl
          const finalPhotos = photos.length > 0 ? photos : (base.imageUrl ? [base.imageUrl] : []);
          
          const memory: Memory = {
            ...base,
            photos: finalPhotos,
            actualYear,
            // Use first photo as main image if available
            imageUrl: finalPhotos.length > 0 ? finalPhotos[0] : base.imageUrl,
          };
          
          console.log(`Created memory for year ${base.year}:`, memory);
          return memory;
        });

        console.log("Loaded memories:", loadedMemories);
        console.log("Total memories:", loadedMemories.length);
        setMemories(loadedMemories);
        setLoading(false);
      } catch (error) {
        console.error("Error loading photos:", error);
        // Fallback to base memories with imageUrl as photos
        const fallbackMemories: Memory[] = baseMemories.map((base) => ({
          ...base,
          photos: base.imageUrl ? [base.imageUrl] : [],
          actualYear: getActualYear(base.year),
        }));
        console.log("Using fallback memories:", fallbackMemories);
        setMemories(fallbackMemories);
        setLoading(false);
      }
    }

    loadAllPhotos();
  }, []);

  const goToYear = useCallback(
    (year: number) => {
      const index = memories.findIndex((m) => m.year === year);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    },
    [memories]
  );

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < memories.length - 1 ? prev + 1 : prev));
  }, [memories.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500">
        <div className="text-center text-white">
          <div className="text-2xl mb-4">Loading your memories...</div>
          <div className="animate-pulse">❤️</div>
        </div>
      </div>
    );
  }

  const currentMemory = memories[currentIndex] || (memories.length > 0 ? memories[0] : null);

  return (
    <div
      className="relative w-full min-h-screen"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <FloatingHearts />

      <div className="relative w-full">
        {memories.map((memory, index) => (
          <StoryCard
            key={memory.year}
            memory={memory}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <NavigationArrows
          onPrevious={goToPrevious}
          onNext={goToNext}
          canGoPrevious={currentIndex > 0}
          canGoNext={currentIndex < memories.length - 1}
        />

        {currentMemory && (
          <YearTimeline
            totalYears={memories.length}
            currentYear={currentMemory.year}
            onYearClick={goToYear}
          />
        )}
      </div>
    </div>
  );
}
