// src/hooks/useHideOnScroll.ts
import { useEffect, useMemo, useState } from "react";
import { useScroll, useVelocity, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";

type Options = {
  /** How far to slide the element when hidden (px). */
  slideDistance?: number;
  speed?: number;
  /** Require upward velocity more negative than this to reveal again. */
  threshold?: number;
  /** Optional spring config for the returned `y`. */
  spring?: Parameters<typeof useSpring>[1];
};

type Return = {
  /** Spring-animated translateY for your header/nav. */
  y: MotionValue<number>;
};

export function useSlideOnScroll(options: Options = {}): Return {
  const {
    slideDistance = 80,
    threshold = 200,
    speed = 0.15,
    spring: springConfig = { stiffness: 600, damping: speed * 1000, mass: 1 },
  } = options;

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [isScrollingBack, setIsScrollingBack] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Detect scroll direction/velocity (negative = upward)
  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (latest > threshold) {
      setIsScrollingBack(false);
      return;
    }
    if (latest < -threshold) {
      setIsScrollingBack(true);
      return;
    }
  });

  // Track if we're at the top
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest <= 0);
  });

  const isInView = useMemo(() => isAtTop || isScrollingBack, [isAtTop, isScrollingBack]);

  // Expose a spring y = 0 when in view, -slideDistance when hidden
  const y = useSpring(isInView ? 0 : -slideDistance, springConfig);

  // Update the spring target when state changes
  useEffect(() => {
    y.set(isInView ? 0 : -slideDistance);
  }, [isInView, slideDistance, y]);

  return { y };
}
