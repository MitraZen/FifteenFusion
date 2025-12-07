export interface Memory {
  year: number;
  title: string;
  description: string;
  imageUrl: string; // Main/featured image
  photos: string[]; // All photos for this year
  actualYear: number; // The actual calendar year (e.g., 2010, 2011)
}
