"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AnimationPage = () => {
  const router = useRouter();
  return (
    <main className="relative max-w-7xl mx-auto px-6 py-8">
      <button className="primary-button" onClick={() => router.push("/animation/playground")}>
        Go to the Playground
      </button>
    </main>
  );
};

export default AnimationPage;
