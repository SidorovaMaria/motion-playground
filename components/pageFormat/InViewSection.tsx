import { useRef } from "react";
import { motion, Transition, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { usePersistentBoolean } from "@/utils/usePersistentBoolean";
/**
 * InViewSection — Expandable content section with entrance animation
 *
 * Purpose:
 * - Displays a titled section that animates into view when scrolled into the viewport.
 * - Provides a collapsible/expandable content area with persisted open/closed state.
 * - Respects user “reduced motion” preferences for accessibility.
 *
 * How it works:
 * - Uses `motion.section` and `whileInView` for entrance animations.
 * - `usePersistentBoolean` stores the toggle state (open/closed) in localStorage,
 *   keyed by route + section ID, so state persists per-page across navigation.
 * - A button toggles open/closed state, rotating the chevron icon accordingly.
 * - The children are revealed with a height + opacity animation (or instant transition if reduced motion).
 *
 * Props:
 * - title (string): Section heading, displayed in the toggle button.
 * - children (React.ReactNode): Content rendered inside the expandable region.
 * - defaultOpen? (boolean): Initial state, defaults to false.
 * - id (string): Unique identifier used for ARIA attributes and storage key.
 * - className? (string): Extra styles for the wrapper `<section>`.
 * - …props: Spread onto the root motion.section for flexibility.
 *
 * Accessibility:
 * - `aria-expanded` and `aria-controls` wired to the toggle button for screen readers.
 * - Section is labeled by its title, role="region" marks it as a landmark.
 * - Reduced motion disables animation timings for users who prefer instant transitions.
 *
 * Example usage:
 * ```tsx
 * <InViewSection id="faq-1" title="What is Framer Motion?" defaultOpen>
 *   <p>Framer Motion is a production-ready animation library for React.</p>
 * </InViewSection>
 * ```
 */

const InViewSection = ({
  title,
  children,
  defaultOpen = false,
  id,
  className,
  ...props
}: {
  title: string;

  children: React.ReactNode;
  defaultOpen?: boolean;
  id: string;
  className?: string;
}) => {
  // Reduced-motion: disable entrance motion; keep state transitions instant.
  const prefersReduced = useReducedMotion();
  const baseTransition = prefersReduced
    ? { duration: 0 }
    : ({ type: "tween" as const, duration: 0.5, ease: ["easeInOut"] } as Transition);
  const pathname = usePathname(); // make the key per-page
  // Persist open/closed state per-page; safe for route changes.
  const storageKey = `mp:section:${pathname}:${id}`;
  const [open, setOpen] = usePersistentBoolean(storageKey, defaultOpen);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      id={id}
      role="region"
      initial={prefersReduced ? { opacity: 0, y: 0 } : { opacity: 0, y: -25 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
      className={`mt-12 max-w-4xl mx-auto bg-background-muted  border-l-4 border-accent/70 rounded-lg rounded-l-none ${className}`}
      {...props}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => setOpen((prev) => !prev)}
        className="group flex w-full items-center justify-between cursor-pointer p-6"
      >
        <h2 className="heading">{title}</h2>
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
        <div ref={ref} className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default InViewSection;
