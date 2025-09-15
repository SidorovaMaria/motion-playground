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
};
const MotionExample = ({ initial, animate, transition }: MotionExampleProps) => {
  const [useAnimate, setUseAnimate] = React.useState(false);
  return (
    <div className="flex items-center justify-center w-64 relative rounded-lg">
      <motion.div
        initial={initial}
        animate={useAnimate ? animate : undefined}
        transition={transition}
        className="w-20 h-20 bg-gradient-to-b from-primary to-secondary rounded-lg flex items-center justify-center text-white"
      >
        <PersonStanding />
      </motion.div>

      <button
        type="button"
        onClick={() => setUseAnimate(!useAnimate)}
        className="absolute left-5 -top-10 text-sm border-2 border-foreground/50 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-primary transition-all focus:ring-0"
      >
        {useAnimate ? (
          <RefreshCcw className="w-5 h-5" />
        ) : (
          <ArrowBigRightDash className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default MotionExample;
