import { Transition } from "motion";

// utils/motion.ts
export const deriveDefaultSpring = (reduced: boolean): Transition =>
  reduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20 };
