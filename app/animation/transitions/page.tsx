"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ChevronDown, Loader } from "lucide-react";
import PropsListItem from "@/components/cards_tags/PropsListItem";
import { Links } from "@/utils/links";
import { usePathname } from "next/navigation";
import { usePersistentBoolean } from "@/utils/usePersistentBoolean";
import { EASE_SOUL_OF_TWEEN, TWEEN_DANGER, WHEN_TO_USE_TWEEN } from "@/constants";
import { codeFromBackticks } from "@/utils/textFormat";

//Lazy loading for extra components
const CodeHighliter = dynamic(() => import("@/components/codeExamples/CodeHighliter"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});
const MotionExample = dynamic(() => import("@/components/codeExamples/MotionExample"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});
const Transitions = () => {
  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto space-y-2 ">
        <h1 className="main-heading"> Motion Transitions - The Beginning</h1>
        <p className="subheading">
          Lets explore the transition prop together with practical examples and copy-paste snippets.
        </p>
      </header>
      {/* Animation Overview */}
      {/* TODO LINKS */}
      <section aria-label="Animation Overview" className="mt-3 max-w-4xl mx-auto">
        <p className="paragraph text-left max-w-3xl ">
          If you’ve tried the playground, you’ve already felt how spring physics and tween easing
          shape motion. This section goes deeper with a practical tour of Motion transitions—clear
          explanations, small demos, and copy–paste snippets. We’ll cover what’s available, explain
          each transition prop, when to use it, and how to tune the feel in real components.
        </p>
        <div className="text-left space-y-2 mt-6 text-foreground">
          <p className="font-display text-sm ">
            Overview of what you&apos;ll learn in this section:
          </p>
          <ul className="list-disc list-inside space-y-1 text-base text-foreground/80 font-bold">
            <li>
              Transition types — what is{" "}
              <Link href="#spring">
                <code className="code">spring </code>
              </Link>
              /
              <Link href="#tween">
                <code className="code">tween</code>
              </Link>
              <span className="opacity-75 text-xs ">
                ( Inertia exists too; we’ll hit it when we learn drag.)
              </span>
            </li>
            <li>Changing transform Origin</li>
            <li>Per-value overrides - Mix feels per property</li>
            <li>
              Keyframes basics - Multi-step motion with arrays (and optional{" "}
              <code className="code">times</code>) for staged changes.
            </li>

            <li>
              Project defaults with <code className="code">MotionConfig</code> - Set app-wide
              transition defaults (and respect user preferences like reduced motion) in one place.
            </li>
          </ul>
        </div>
      </section>
      {/* Transition Types */}
      <section aria-label="Transition Types" className="mt-12 max-w-4xl mx-auto ">
        <h2 className="heading ">Transition Types</h2>
        <LazyMount block="code">
          <CodeHighliter>
            {`<motion.div ... transiton={{type:'spring / tween / inertia / " "'}}/> // Default: dynamic (based on values being animated)`}
          </CodeHighliter>
        </LazyMount>
        <p className="paragraph">
          Motion gives us three main flavors of animation: <code>tween</code>,<code>spring</code>,
          and <code>inertia</code>.<code>tween</code> is all about timing—you pick a duration and
          easing curve (built-in or custom).
          <code>spring</code> is driven by physics, can also be configured by
          <em>duration</em> instead of raw physics, and you can dial in extra character with the{" "}
          <code>bounce</code> option (we’ll play with that in this section). Later on, when we get
          into drag and gestures, we’ll meet <code>inertia</code>, which are more suitable for it.
        </p>
      </section>
      {/* NOTE : TWEEN */}
      <InViewSection id="tween" aria-label="Tween Transitions" title="Tween">
        {/* What is a tween */}
        <InViewArticle
          id="what-is-tween"
          ariaLabelledby="what-is-tween"
          title='What a "tween" actually is'
          className="mt-0!"
        >
          <div className="[&>p]:text-base! [&>p]:u-paragraph spacey-y-1">
            <p>
              <span className="font-bold">&quot;Tween&quot;</span> is short for{" "}
              <span className="italic font-bold">in-betweening</span> — the old animation term for
              drawing the frames between two key poses. In Motion, a tewen transitoin simply says:{" "}
              <em>
                I&lsquo;ll handle the frames between start and finish over a set time with a chosen
                easing function.
              </em>
            </p>
            <p className="">No physics here, just math: =)</p>
            <ul className="list-disc space-y-2 list-inside my-2 font-display text-foreground/80 text-sm">
              <li>Start value &#8658; End Value</li>
              <li>Duration (how long it takes)</li>
              <li>
                Easing (the curve of progress: linear, ease-in, ease-out, custom cubic-bezier, etc.)
              </li>
            </ul>
            <p className="paragraph ">
              The library interpolates every frame until the value arrives at the target.
            </p>
          </div>
        </InViewArticle>
        {/* Core props of a tween */}
        <InViewArticle
          id="tween-core-props"
          ariaLabelledby="tween-core-props"
          title="Core properties of a tween"
        >
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-3 ">
            <LazyMount block="code">
              <CodeHighliter>
                {`<motion.div
  animate={{ y: -80, x: 80 }}
  transition={{
    type: "tween",
    duration: 1,       // seconds
    delay: 0.2,          // start later
    ease: "easeInOut",   // built-in
    repeat: 2,           // run 2 extra times
    repeatType: "mirror" // mirror = forward, backward, forward…
    repeatDelay: 0.5,    // wait before next cycle
  }}
/>`}
              </CodeHighliter>
            </LazyMount>
            <LazyMount>
              <MotionExample
                className="w-full  h-fit"
                initial={{ y: 0, x: 0 }}
                animate={{ y: -80, x: 80 }}
                transition={{
                  type: "tween",
                  duration: 1, // seconds
                  delay: 0.2, // start later
                  ease: "easeInOut", // built-in
                  repeat: 2, // run 2 extra times
                  repeatType: "mirror", // mirror = forward, backward, forward…
                  repeatDelay: 0.5, // wait before next cycle
                }}
              />
            </LazyMount>
            <ul className="list-disc space-y-2 list-inside my-4 py-2 w-full text-left">
              <PropsListItem
                href={`${Links.animation.transitionProperties}#duration`}
                title="duration"
                description="Seconds to run."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#ease`}
                title="ease"
                description="Progress curve."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#delay`}
                title="delay"
                description="Wait before start."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#repeat`}
                title="repeat"
                description="Times to repeat."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#repeatType`}
                title="repeatType"
                description="Loop style."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#repeatDelay`}
                title="repeatDelay"
                description="Pause before the next cycle"
              />
            </ul>
          </div>
        </InViewArticle>
        {/* Tween Easing Curves */}
        <InViewArticle
          ariaLabelledby="easing-curves"
          id="easing-curves"
          title="Easing curves (the soul of tween)"
        >
          <p className="paragraph">
            Easing defines how you get from A to B. It shapes the progress of a tween over time,
            creating different feels. Motion has a few built-in easings, but you can also define
            custom curves with cubic-bezier or steps functions.
          </p>
          <LazyMount block="code">
            <CodeHighliter>{`<motion.div ... transition={{type:'tween',ease:'easeInOut/easeIn/backOut/...'}}/>`}</CodeHighliter>
          </LazyMount>
          <ul
            className="grid grid-cols-3 gap-x-8  space-y-2 list-inside py-2 w-full [&>li>span]:text-sm text-center [&>li]:text-sm
         paragraph leading-normal [&>li]:border-b [&>li]:border-foreground/10 [&>li]:pb-2 [&>code]:code [&>code]:p-0"
          >
            {EASE_SOUL_OF_TWEEN.map(({ function: func, content }) => (
              <li key={func}>
                <code>{`'${func}'`}</code> - {content}
              </li>
            ))}
            <li className="flex items-center justify-center text-foreground font-display text-sm">
              If not yet explored them all, check out the playground
              {/* TODO Playground link */}
            </li>
          </ul>
        </InViewArticle>
        {/* When to use a tween */}
        <InViewArticle
          id="when-tween"
          ariaLabelledby="when-tween"
          title="When to reach for a tween"
        >
          <ul
            className="list-disc space-y-2 list-inside  w-full 
          [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            {WHEN_TO_USE_TWEEN.map(({ title, description }) => (
              <li key={title}>
                <span>{title}</span> - {description}
              </li>
            ))}
          </ul>
        </InViewArticle>
        <InViewArticle
          id="tween-look-out-for"
          ariaLabelledby="tween-look-out-for"
          title="What to look out for with tween"
        >
          <ul className="danger-list">
            {TWEEN_DANGER.map((section) => (
              <li key={section.title}>
                <span>{section.title}</span>
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>{codeFromBackticks(item)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </InViewArticle>
      </InViewSection>
    </main>
  );
};

export default Transitions;

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
    <section ref={ref} className={`${className} ${block === "code" && "code-block"}`}>
      {inView ? (
        children
      ) : (
        <div className="flex w-full items-center justify-center h-24 ">
          <Loader className="animate-spin" />
        </div>
      )}
    </section>
  );
};
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
  const pathname = usePathname(); // make the key per-page
  const storageKey = `mp:section:${pathname}:${id}`;
  const [open, setOpen] = usePersistentBoolean(storageKey, defaultOpen);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      id={id}
      role="region"
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
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
        <ChevronDown
          className={`w-8 h-8 stroke-4 text-foreground/70 group-hover:text-foreground/100 transition ${
            open && "rotate-180"
          }`}
        />
      </button>

      <motion.div
        id={`${id}-content`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
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
const InViewArticle = ({
  title,
  children,
  id,
  className,
  ariaLabelledby,
  ...props
}: {
  title: string;
  ariaLabelledby: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  return (
    <motion.article
      id={id}
      aria-labelledby={ariaLabelledby}
      role="article"
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
      className={`mt-8 space-y-2 max-w-4xl mx-auto ${className}`}
      {...props}
    >
      <h3 id={ariaLabelledby} className="heading text-xl mb-4">
        {title}
      </h3>

      {children}
    </motion.article>
  );
};
