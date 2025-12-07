import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "15 Years Together - An Interactive Memory Journey",
  description: "A beautiful, immersive web experience celebrating 15 years of love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

