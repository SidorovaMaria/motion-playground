"use client";
import React, { ReactNode } from "react";
import CodeHighliter from "../codeExamples/CodeHighliter";
import PropertyShowcase from "./PropertyShowcase";
import { motion, Transition, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { usePersistentBoolean } from "@/utils/usePersistentBoolean";
type overviewItem = {
  label: string;
  content: ReactNode;
};
type Props = {
  id: string;
  title: string;
  description: ReactNode;
  snippet: string;
  overview: overviewItem[];
  examples: ReactNode;
  defaultOpenExamples?: boolean;
  defaultOpen?: boolean;
};
const TransitionPropertySection = ({
  id,
  title,
  description,
  snippet,
  overview,
  examples,
  defaultOpenExamples = false,
  defaultOpen = false,
}: Props) => {
  const prefersReduced = useReducedMotion();
  const baseTransition = prefersReduced
    ? { duration: 0 }
    : ({ type: "tween" as const, duration: 0.5, ease: ["easeInOut"] } as Transition);
  const pathname = usePathname(); // make the key per-page
  // Persist open/closed state per-page; safe for route changes.
  const storageKey = `mp:section:${pathname}:${id}`;
  const [open, setOpen] = usePersistentBoolean(storageKey, defaultOpen);
  return (
    <motion.section id={id} className="bordered-section">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => setOpen((prev) => !prev)}
        className="group flex w-full items-center justify-between cursor-pointer p-2 rounded-md "
      >
        <h2 className="heading mb-2">{title}</h2>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={
            prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 10 }
          }
        >
          <ChevronDown className="w-8 h-8 stroke-4 text-foreground/70 group-hover:text-foreground/100" />
        </motion.span>
      </button>
      <motion.div
        id={`${id}-content`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={baseTransition}
        style={{ transformOrigin: "top", willChange: "height, opacity" }}
        className="overflow-hidden "
        // onAnimationComplete={() => {
        //   if (open && ref.current) {
        //     ref.current.focus({ preventScroll: true });
        //     ref.current.scrollIntoView({
        //       behavior: "smooth",

        //       block: "nearest",
        //     });
        //   }
        // }}
      >
        <div className="pt-4">
          <p className="paragraph">{description}</p>
          {snippet && (
            <div className="code-block">
              <CodeHighliter>{snippet}</CodeHighliter>
            </div>
          )}
          {overview.length > 0 && (
            <>
              <h5 className="subheading text-lg my-2">Quick Overview</h5>
              <ul className="space-y-2 py-1 w-full [&>li>span]:font-display [&>li>span]:text-base props ">
                {overview.map((item, i) => (
                  <li key={i}>
                    <span>{item.label}:</span> {item.content}
                  </li>
                ))}
              </ul>
            </>
          )}
          {examples && (
            <PropertyShowcase
              id={`${id}-examples`}
              defaultOpen={defaultOpenExamples}
              examples={examples}
            />
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default TransitionPropertySection;
