//All button effects would have a rest and hovered state

import { Variants } from "motion";

const shimmerSpanVariant: Variants = {
  rest: {
    left: "-100%",
    // Shimmer effect
    transform: "skewX(-20deg)",
    transition: { type: "spring", stiffness: 100 },
  },
  hovered: {
    // Move to off-screen right
    left: "100%",
    transform: "skewX(-20deg)",
    transition: { type: "tween", duration: 1 },
  },
};
const QuickShimmer: Variants = {
  rest: {
    left: "-100%",
    width: "100%",
    height: "100%",
    transform: "skewX(-20deg)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  hovered: {
    position: "absolute",
    // Move to off-screen right
    left: "100%",
    top: 0,
    width: "100%",
    height: "100%",
    transform: "skewX(-20deg)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
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

export { shimmerSpanVariant, revealSpanVariant, QuickShimmer };
