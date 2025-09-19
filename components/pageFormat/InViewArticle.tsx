import { motion, useReducedMotion } from "motion/react";
/**
 * InViewArticle — Animated article section
 *
 * Purpose:
 * - Wraps article-like content in a motion container that animates into view as
 *   the user scrolls, improving readability and visual flow.
 * - Respects reduced-motion preferences by disabling entrance animations when requested.
 *
 * How it works:
 * - Uses `motion.article` with `whileInView` to fade and slide in content once
 *   it enters the viewport (20% visibility threshold).
 * - Applies a spring-based transition for smooth entrance unless reduced motion is enabled.
 *
 * Props:
 * - title (string): Heading text for the article (rendered as `<h3>`).
 * - ariaLabelledBy (string): ID used to connect the `<h3>` with the article via `aria-labelledby`.
 * - children (React.ReactNode): Content inside the article.
 * - id (string): Unique identifier for the `<article>` element.
 * - className? (string): Additional styles for the wrapper.
 * - …props: Forwarded to the root `<motion.article>`.
 *
 * Accessibility:
 * - Marks content with `role="article"` and links it to its heading with `aria-labelledby`.
 * - Respects reduced motion, ensuring accessibility for motion-sensitive users.
 *
 * Example usage:
 * ```tsx
 * <InViewArticle id="intro" title="Introduction" ariaLabelledBy="intro-heading">
 *   <p>This section explains the basics of transitions in Motion.</p>
 * </InViewArticle>
 * ```
 */

const InViewArticle = ({
  title,
  children,
  id,
  className,
  ariaLabelledBy,
  ...props
}: {
  title: string;
  ariaLabelledBy: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  // Reduced-motion: disable entrance motion; keep state transitions instant.
  const prefersReduced = useReducedMotion();
  return (
    <motion.article
      id={id}
      aria-labelledby={ariaLabelledBy}
      role="article"
      initial={prefersReduced ? { opacity: 0, y: 0 } : { opacity: 0, y: -25 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
      className={`mt-8 space-y-2 max-w-4xl mx-auto ${className}`}
      {...props}
    >
      <h3 id={ariaLabelledBy} className="heading text-xl mb-4">
        {title}
      </h3>

      {children}
    </motion.article>
  );
};
export default InViewArticle;
