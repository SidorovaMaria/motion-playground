import { Loader } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * LazyMount — Utility component
 *
 * Purpose:
 * - Defers rendering of heavy or secondary content (e.g., code blocks, images, long text)
 *   until the section scrolls into view, improving performance and initial page load.
 *
 * How it works:
 * - Uses `useInView` from Motion to detect when the component is visible in the viewport.
 * - While off-screen, displays a centered loader spinner with accessible "Loading block…" text.
 * - Once visible, it mounts and renders the children exactly once (`once: true`).
 *
 * Props:
 * - children: The content to lazy-load and render.
 * - className?: Optional styling classes passed to the wrapper `<section>`.
 * - block?: If `"code"`, adds a `code-block` class for custom styling; otherwise ignored.
 *
 * Example usage:
 * ```tsx
 * <LazyMount block="code">
 *   <CodeBlock code={exampleCode} />
 * </LazyMount>
 * ```
 */

const LazyMount = ({
  children,
  className,
  block,
}: {
  children: React.ReactNode;
  className?: string;
  block?: "code" | null;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className={` ${className} ${block === "code" && "code-block"}`}>
      {inView ? (
        children
      ) : (
        <div className="flex w-full items-center justify-center h-24">
          <Loader className="animate-spin" aria-hidden />
          <span className="sr-only">Loading block…</span>
        </div>
      )}
    </section>
  );
};

export default LazyMount;
