import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

// Map anniversary year to actual calendar year
// Assuming wedding was in 2009
const WEDDING_YEAR = 2009;

function getActualYear(anniversaryYear: number): number {
  return WEDDING_YEAR + anniversaryYear - 1;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");

    if (!year) {
      // Return all years
      const allYears: Record<number, string[]> = {};
      
      for (let anniversaryYear = 1; anniversaryYear <= 15; anniversaryYear++) {
        const actualYear = getActualYear(anniversaryYear);
        const yearPath = join(process.cwd(), "public", "photos", actualYear.toString());
        
        try {
          const files = await readdir(yearPath);
          const imageFiles = files
            .filter((file) => {
              const ext = file.toLowerCase();
              return ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".png") || ext.endsWith(".JPG") || ext.endsWith(".JPEG") || ext.endsWith(".PNG");
            })
            .map((file) => {
              // Return path as-is - Next.js will handle URL encoding when serving
              // But we need to handle special characters in the path
              return `/photos/${actualYear}/${file}`;
            });
          
          if (imageFiles.length > 0) {
            allYears[anniversaryYear] = imageFiles;
          }
        } catch (error) {
          // Year folder doesn't exist or is empty
          continue;
        }
      }

      return NextResponse.json(allYears);
    }

    // Return photos for specific year
    const anniversaryYear = parseInt(year);
    const actualYear = getActualYear(anniversaryYear);
    const yearPath = join(process.cwd(), "public", "photos", actualYear.toString());

    try {
      const files = await readdir(yearPath);
      const imageFiles = files
        .filter((file) => {
          const ext = file.toLowerCase();
          return ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".png") || ext.endsWith(".JPG") || ext.endsWith(".JPEG") || ext.endsWith(".PNG");
        })
        .map((file) => {
          // Return path as-is - Next.js will handle URL encoding when serving
          return `/photos/${actualYear}/${file}`;
        });

      return NextResponse.json({ photos: imageFiles, year: anniversaryYear, actualYear });
    } catch (error) {
      return NextResponse.json({ photos: [], year: anniversaryYear, actualYear }, { status: 200 });
    }
  } catch (error) {
    console.error("Error reading photos:", error);
    return NextResponse.json({ error: "Failed to read photos" }, { status: 500 });
  }
}

