"use client";

import { Memory } from "@/types/memory";
import Image from "next/image";

interface MemoryCardProps {
  memory: Memory;
  isActive: boolean;
}

export function MemoryCard({ memory, isActive }: MemoryCardProps) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <Image
            src={memory.imageUrl}
            alt={`${memory.year} years - ${memory.title}`}
            fill
            className="object-cover"
            priority={isActive}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="text-4xl md:text-6xl font-bold text-pink-200">
                Year {memory.year}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              {memory.title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md max-w-2xl">
              {memory.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

