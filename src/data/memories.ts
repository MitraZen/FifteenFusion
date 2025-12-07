import { Memory } from "@/types/memory";

// Base memory data - photos will be automatically loaded from year folders
// The actualYear will be calculated automatically (2009 + year - 1)
export const baseMemories: Omit<Memory, "photos" | "actualYear">[] = [
  {
    year: 1,
    title: "The Beginning",
    description: "Our first year together, filled with discovery and endless conversations. Every moment felt like a dream.",
    imageUrl: "/photos/2010/OOty_Bench.JPG", // Fallback if no photos found
  },
  {
    year: 2,
    title: "Growing Together",
    description: "Year two brought us closer. We learned each other's quirks and fell deeper in love every day.",
    imageUrl: "/photos/2010/Ooty1_Boat.JPG",
  },
  {
    year: 3,
    title: "Adventures Begin",
    description: "Our first big adventure together. We explored new places and created memories that would last forever.",
    imageUrl: "/photos/2011/DInner_Date.JPG",
  },
  {
    year: 4,
    title: "Building Dreams",
    description: "Year four was about building our future together. We made plans and watched them come to life.",
    imageUrl: "/photos/2012/Beatiful_Trips.jpg",
  },
  {
    year: 5,
    title: "Milestone Moments",
    description: "Five years of love, laughter, and growth. We celebrated how far we'd come and looked forward to forever.",
    imageUrl: "/photos/2013/ABInbev_Tour.jpg",
  },
  {
    year: 6,
    title: "New Horizons",
    description: "We embraced change and new opportunities. Together, we faced every challenge with strength and love.",
    imageUrl: "/photos/2014/2014_Anniv.JPG",
  },
  {
    year: 7,
    title: "Deeper Connection",
    description: "Seven years in, our bond grew even stronger. We found new ways to love and support each other.",
    imageUrl: "/photos/2015/Our_3rd_Card.jpg",
  },
  {
    year: 8,
    title: "Shared Dreams",
    description: "Year eight brought shared dreams to reality. We built something beautiful together, one day at a time.",
    imageUrl: "/photos/2016/Jan2016.jpg",
  },
  {
    year: 9,
    title: "Cherished Moments",
    description: "Nine years of creating beautiful memories. Each moment more precious than the last.",
    imageUrl: "/photos/2016/July2016.jpg",
  },
  {
    year: 10,
    title: "A Decade of Love",
    description: "Ten years together! A decade of love, growth, and countless beautiful moments. Here's to many more.",
    imageUrl: "/photos/2015/Washington_DC.jpg",
  },
  {
    year: 11,
    title: "Continued Journey",
    description: "Year eleven showed us that love only gets better with time. We continued our beautiful journey together.",
    imageUrl: "/photos/2015/Niagra.jpg",
  },
  {
    year: 12,
    title: "New Adventures",
    description: "Twelve years brought new adventures and experiences. We explored life together with open hearts.",
    imageUrl: "/photos/2014/US.jpg",
  },
  {
    year: 13,
    title: "Growing Stronger",
    description: "Thirteen years of growing stronger together. Our love became the foundation for everything we built.",
    imageUrl: "/photos/2015/Springfield_US.jpg",
  },
  {
    year: 14,
    title: "Beautiful Moments",
    description: "Year fourteen was filled with beautiful moments. We cherished every day and every memory we created.",
    imageUrl: "/photos/2016/Oct2016.jpg",
  },
  {
    year: 15,
    title: "Fifteen Years Together",
    description: "Fifteen years of love, laughter, and beautiful memories. Here's to our incredible journey and to many more years of happiness together. I love you more than words can express.",
    imageUrl: "/photos/2014/Skydeck.jpg",
  },
];

// This will be populated dynamically
export const memories: Memory[] = [];
