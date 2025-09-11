//All button effects would have a rest and hovered state

import { Variants } from "motion";

const shimmerSpanVariant: Variants = {
  rest: {
    position: "absolute",
    // Initial position off-screen to the left
    left: "-100%",
    top: 0,
    width: "100%",
    height: "100%",
    // Shimmer effect
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
    transform: "skewX(-20deg)",
    transition: { type: "spring", stiffness: 100 },
  },
  hovered: {
    position: "absolute",
    // Move to off-screen right
    left: "100%",
    top: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
    transform: "skewX(-20deg)",
    transition: { type: "tween", duration: 1 },
  },
};
const revealSpanVariant: Variants = {
  rest: {
    width: 0,
    opacity: 0,
    transition: { type: "spring", stiffness: 100 },
  },
  hovered: {
    width: "auto",
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export { shimmerSpanVariant, revealSpanVariant };
