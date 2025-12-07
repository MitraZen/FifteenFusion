"use client";

import { useState } from "react";
import { InteractiveAlbum } from "@/components/InteractiveAlbum";
import { WelcomeScreen } from "@/components/WelcomeScreen";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  return (
    <main className="min-h-screen">
      {showWelcome ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <InteractiveAlbum />
      )}
    </main>
  );
}

