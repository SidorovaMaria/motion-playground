"use client";
import React from "react";
import {
  AnimatePresence,
  motion,
  MotionStyle,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "framer-motion";
import { ArrowBigRightDash, PersonStanding, RefreshCcw } from "lucide-react";
export type MotionExampleProps = {
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
  animate: boolean | TargetAndTransition | VariantLabels | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition?: Transition<any> | undefined;
  className?: string;
  size?: "small" | "extra-small";
  styles?: MotionStyle | undefined;
};
const MotionExample = ({
  initial,
  animate,
  transition,
  className,
  size,
  styles,
}: MotionExampleProps) => {
  const [useAnimate, setUseAnimate] = React.useState(false);
  return (
    <div
      className={`flex items-center justify-center w-64 rounded-lg ${className} ${
        size && size === "small" && "w-auto!"
      }`}
    >
      <div className="relative">
        <motion.div
          initial={initial}
          animate={useAnimate ? animate : undefined}
          transition={transition}
          style={styles}
          className={`w-20 h-20 bg-gradient-to-b from-primary to-secondary rounded-lg flex items-center justify-center text-white relative isolate ${
            size && size === "small" && "w-14! h-14! "
          }`}
        />
        <button
          type="button"
          onClick={() => setUseAnimate(!useAnimate)}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 text-sm rounded-full flex items-center bg-background
                 justify-center w-8 h-8 cursor-pointer hover:bg-accent transition-all group ${
                   size && size === "small" && "w-6! h-6!"
                 }`}
        >
          {useAnimate ? (
            <RefreshCcw
              className={`w-5 h-5 group-hover:text-background transition-colors ${
                size && size === "small" && "w-4! h-4!"
              }`}
            />
          ) : (
            <ArrowBigRightDash
              className={`w-5 h-5 group-hover:text-background transition-colors ${
                size && size === "small" && "w-4! h-4!"
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default MotionExample;
