"use client";

import { useState, useEffect } from "react";

interface PhotoData {
  photos: string[];
  year: number;
  actualYear: number;
}

export function usePhotos(year: number) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actualYear, setActualYear] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(`/api/photos?year=${year}`);
        const data: PhotoData = await response.json();
        setPhotos(data.photos || []);
        setActualYear(data.actualYear || null);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [year]);

  return { photos, loading, actualYear };
}

