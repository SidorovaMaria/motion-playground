"use client";
import React from "react";
import {
  AnimatePresence,
  motion,
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
};
const MotionExample = ({ initial, animate, transition, className }: MotionExampleProps) => {
  const [useAnimate, setUseAnimate] = React.useState(false);
  return (
    <div className={`flex items-center justify-center w-64  rounded-lg ${className}`}>
      <div className="relative">
        <motion.div
          initial={initial}
          animate={useAnimate ? animate : undefined}
          transition={transition}
          className="w-20 h-20 bg-gradient-to-b from-primary to-secondary rounded-lg flex items-center justify-center text-white relative isolate"
        />
        <button
          type="button"
          onClick={() => setUseAnimate(!useAnimate)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 text-sm rounded-full flex items-center bg-background
                 justify-center w-8 h-8 cursor-pointer hover:bg-accent transition-all group"
        >
          {useAnimate ? (
            <RefreshCcw className="w-5 h-5 group-hover:text-background transition-colors" />
          ) : (
            <ArrowBigRightDash className="w-5 h-5 group-hover:text-background transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MotionExample;
