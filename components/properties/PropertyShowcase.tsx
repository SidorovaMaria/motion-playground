"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

type PropertyShowcaseProps = {
  id: string;
  examples: ReactNode;
  defaultOpen?: boolean;
};
const PropertyShowcase = ({ id, examples, defaultOpen }: PropertyShowcaseProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <aside id={id} className="p-2 w-full">
      <button
        type="button"
        className="flex items-center justify-between my-3 p-4 cursor-pointer w-full rounded-md"
        aria-expanded={open}
        title={`show-${id}`}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="subheading text-lg ">Quick examples</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "tween", duration: 0.2 }}
          aria-hidden="true"
          className=""
        >
          <ChevronDown className="w-6 h-6 stroke-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="mt-4 overflow-hidden"
          >
            {examples}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default PropertyShowcase;
