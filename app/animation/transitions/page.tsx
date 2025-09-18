"use client";
/**
 * Transitions (Motion) — teaching page
 *
 * Purpose:
 * - Explain Motion transitions (tween, spring, keyframes, per-value overrides, transform origin).
 * - Provide runnable micro-demos via <MotionExample/> and animate properties as a copy-paste code via <CodeHighliter/>.
 * - Respect reduced-motion and keep perf sensible with lazy/conditional rendering.
 *
 */

import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { motion, MotionConfig, Transition, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRightFromSquare, CheckCircle2, ChevronDown, Loader, XCircle } from "lucide-react";
import PropsListItem from "@/components/cards_tags/PropsListItem";
import { Links } from "@/utils/links";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { usePersistentBoolean } from "@/utils/usePersistentBoolean";
import {
  EASE_SOUL_OF_TWEEN,
  KEYFRAME_DANGER,
  MOTION_CONFIG_DANGER,
  MOTION_CONFIG_PROPERTIES,
  MOTION_CONFIG_REDUCED_MOTION,
  SPRING_DANGER,
  SPRING_PROPERTIES,
  TRANSFORM_ORIGIN_DANGER,
  TRANSFORM_ORIGIN_PROPERTIES,
  TRANSITION_OVERVIEW,
  TWEEN_DANGER,
  TWEEN_PROPERTIES,
  WHEN_KEYFRAMES,
  WHEN_PER_VALUE,
  WHEN_TO_USE_MOTION_CONFIG,
  WHEN_TO_USE_SPRING,
  WHEN_TO_USE_TWEEN,
  WHEN_TRANSFORM_ORIGIN,
} from "@/constants/transitions";
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

/**
 * <Transitions/>
 * Top-level page that stitches together narrative sections and demos.
 * - Uses semantic landmarks (<main>, <section>, <article>) for screen readers.
 * - Keeps headings strictly h1 → h2 → h3 for accessible outline.
 * - All heavy code blocks and demos are lazy to reduce TTI and layout thrash.
 *
 * Authoring guide:
 * - When adding a new subsection, prefer <InViewSection> → <InViewArticle> nesting.
 * - Link to constants in "@/constants/transitions" to keep prose and lists single-sourced.
 */
const Transitions = () => {
  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto space-y-2 ">
        <h1 className="main-heading"> Motion Transitions - The Beginning</h1>
        <p className="subheading">
          Let&apos;s explore the transition prop together with practical examples and copy-paste
          snippets.
        </p>
      </header>
      {/* /**
       * Animation Overview
       * Sets reader expectations and internal navigation anchors.
       * If more sections are added, update this overview.
       */}
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
          <ul className="grid grid-cols-3 gap-4">
            {/**
             * Transition overview cards as links to the specific sections below.
             * If needed to add more sections, update the TRANSITION_OVERVIEW constant in constants/transitions.ts
             *
             */}
            {TRANSITION_OVERVIEW.map(({ title, link, description }) => (
              <Link
                role="listitem"
                href={link}
                key={title}
                className="px-4 py-1.5 rounded-md border border-foreground/20 font-display text-sm 
                   text-foreground/90 font-medium hover:border-accent 
                   transition-colors duration-200 capitalize flex flex-col items-center gap-2 last:col-span-3 group"
              >
                <p className="group-hover:underline text-primary">{title}</p>
                <p className="font-sans text-xs  text-center font-medium tracking-wide">
                  {description}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      </section>
      {/* /**
       * Transition Types
       * One-liner mental model: tween = time-based curve, spring = physics, inertia = momentum (later).
       * The code fence shows the API shape; demos below do the teaching.
       */}
      <section aria-label="Transition Types" className="mt-12 max-w-4xl mx-auto ">
        <h2 className="heading ">Transition Types</h2>
        <LazyMount block="code">
          <CodeHighliter>
            {`<motion.div ... transition={{type:'spring / tween / inertia / " "'}}/> // Default: dynamic (based on values being animated)`}
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
      {/* TWEEN */}
      <InViewSection id="tween" aria-label="Tween Transitions" title="Tween">
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div ... transition={{type:'tween'}}/>`}</CodeHighliter>
        </LazyMount>
        {/**
         * Tween: concept intro
         * Keep the concept separate from props to reduce cognitive load:
         * - Concept = frames between A → B
         * - Props = duration/ease/repeat
         */}
        <InViewArticle
          id="what-is-tween"
          ariaLabelledBy="what-is-tween"
          title='What a "tween" actually is'
        >
          <div className="[&>p]:text-base! [&>p]:u-paragraph space-y-1">
            <p>
              <span className="font-bold">&quot;Tween&quot;</span> is short for{" "}
              <span className="italic font-bold">in-betweening</span> — the old animation term for
              drawing the frames between two key poses. In Motion, a tween transition simply says:{" "}
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
        {/* /**
         * Tween core props
         * Example intentionally uses both position and meta controls (delay, repeat) to show breadth.
         * PropsListItem pulls descriptions from constants to ensure consistency across the site.
         * Direct to the docs for deeper dives on each prop.
         */}
        <InViewArticle
          id="tween-core-props"
          ariaLabelledBy="tween-core-props"
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
              {TWEEN_PROPERTIES.map(({ property, link, description }) => (
                <PropsListItem
                  key={property}
                  href={`${Links.animation.transitionProperties}${link}`}
                  title={property}
                  description={description}
                />
              ))}
            </ul>
          </div>
        </InViewArticle>
        {/**
         * Easing guide
         * What each easing feels like.
         *
         */}
        <InViewArticle
          ariaLabelledBy="easing-curves"
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
        {/**
         * Tween: usage
         * When to use
         */}
        <InViewArticle
          id="when-tween"
          ariaLabelledBy="when-tween"
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
        {/**
         * Tween: dangers
         * What to look out for when using tween, what might go wrong.
         */}
        <InViewArticle
          id="tween-look-out-for"
          ariaLabelledBy="tween-look-out-for"
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
      {/* END TWEEN */}

      {/* SPRING */}
      <InViewSection id="spring" aria-label="Spring Transitions" title="Spring">
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div ... transition={{type:'spring'}}/>`}</CodeHighliter>
        </LazyMount>
        {/**
         * Spring: concept intro
         * Two modes:
         * - Physics mode (stiffness/damping/mass/velocity) → interactive feel.
         * - Duration mode (duration/bounce) → predictable timing with spring character.
         * Default for transforms is spring: feels “alive” out of the box.
         */}
        <InViewArticle
          id="spring-physics"
          ariaLabelledBy="spring-physics"
          title={`What a "spring" actually is`}
        >
          <div className="[&>p]:text-base! paragraph">
            <p>
              A <code>{`"spring"`}</code> in Motion is all about physics over math. Instead of just
              tweening linearly over time, it behaves like a real spring system: it gets pulled
              toward the target, overshoots, and then settles. Josh Comeau explain it with a great
              example on his{" "}
              <a
                href="https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="A friendly introduction to spring physics by Josh Comeau (opens in a new tab)"
                className="font-bold text-secondary hover:underline"
              >
                blog.{" "}
                <ArrowUpRightFromSquare className="inline small-icon text-secondary" aria-hidden />
              </a>
              <br />
              That’s why transform properties <code>(x, y, scale, rotate)</code> use spring by
              default — it makes UIs feel natural, not robotic.
            </p>
            <hr className="my-3 border-foreground/50" />
            <p>In Motion, a spring can run in two modes:</p>
            <ul className="[&>li>code]:text-xs [&>li>code]:code list-disc space-y-1 list-inside my-2 text-foreground/80 ">
              <li>
                <span>Physics Mode (default) </span> &#10142; shaped by{" "}
                <code>stiffness, damping </code> and <code>mass</code>
              </li>
              <li>
                <span>Duration Mode </span> &#10142; shaped by <code>duration</code> and optionally
                <code>bounce</code> skipping raw physics math.
              </li>
            </ul>
            <p className="paragraph">
              Both modes create springy, natural motion. Duration mode is often easier to reason
              about, while physics mode can create more complex interactions (like heavy objects
              feeling weighty). We’ll explore both in this section.
            </p>
          </div>
        </InViewArticle>
        {/**
         * Spring core props
         * The demo uses physics mode for educational value. Duration/bounce are commented in as hints.
         * PropsListItem pulls descriptions from constants to ensure consistency across the site.
         * Direct to the docs for deeper dives on each prop.
         */}
        <InViewArticle
          id="spring-core-props"
          ariaLabelledBy="spring-core-props"
          title="Core properties of a spring"
        >
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-[2fr_1fr_2fr] ">
            <LazyMount block="code">
              <CodeHighliter>
                {`<motion.div
  animate={{ y: 80 }}
  transition={{
    type: "spring",
    stiffness: 150,  // pull strength
    damping: 20,     // friction
    mass: 1,         // weight
    velocity: 2,     // carry motion from gestures (not used for example below)
    duration: 0.8,   // switch to duration mode (not used for example below)
    bounce: 0.4,     // overshoot in duration mode (not used for example below)
  }}
/>`}
              </CodeHighliter>
            </LazyMount>
            <LazyMount>
              <MotionExample
                className="h-fit w-full"
                initial={{ y: 0 }}
                animate={{ y: 80 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 14,
                  mass: 1,
                  // velocity: 2,
                  // duration: 0.8,
                  // bounce: 0.4,
                }}
              />
            </LazyMount>
            <ul className="list-disc space-y-2 list-inside my-4 py-2 w-full text-left">
              {SPRING_PROPERTIES.map(({ property, link, description }) => (
                <PropsListItem
                  key={property}
                  href={`${Links.animation.transitionProperties}${link}`}
                  title={property}
                  description={description}
                />
              ))}
            </ul>
          </div>
        </InViewArticle>

        {/**
         * Spring: usage
         * Rule of thumb:
         * - Movement (x/y/scale/rotate) → spring
         * - Visibility (opacity) → tween
         * Physics note: stiffness × mass ≈ frequency, damping controls overshoot/settling.
         */}
        <InViewArticle
          id="when-spring"
          ariaLabelledBy="when-spring"
          title="When to reach for a spring"
        >
          <ul
            className="list-disc space-y-2 list-inside  w-full 
            [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            {WHEN_TO_USE_SPRING.map(({ title, description }) => (
              <li key={title}>
                <span>{title}</span> - {description}
              </li>
            ))}
          </ul>
        </InViewArticle>
        {/**
         * Spring: pitfalls
         * Common issues to watch out for:
         * - Overusing spring for everything can lead to a sluggish feel.
         * - Not accounting for gesture velocity can make interactions feel disconnected.
         * - Using spring for opacity changes can lead to unexpected results.
         */}
        <InViewArticle
          id="spring-look-out-for"
          ariaLabelledBy="spring-look-out-for"
          title="What to look out for with spring"
        >
          <ul className="danger-list">
            {SPRING_DANGER.map((section) => (
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
      {/* END SPRING */}

      {/* TRANSFORM ORIGIN */}
      <InViewSection
        id="transform-origin"
        aria-labelledby="transform-origin"
        title="Changing Transform Origin"
      >
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div style={{ originX: 0.5 }} />`}</CodeHighliter>
        </LazyMount>
        {/**
         * Transform Origin
         * Not an animation type—just the pivot for scale/rotate/skew.
         * Small intro on what it is and why we might want to change it.
         */}
        <InViewArticle
          id="what-is-transform-origin"
          ariaLabelledBy="what-is-transform-origin"
          title=" What “transform origin” means?"
        >
          <div className="[&>p]:text-base! paragraph">
            <p>
              <code>Transform Origin </code>in Motion is the pivot point for transforms like scale,
              rotate, or skew. It’s not an animation type, but a reference point. Instead of always
              rotating or scaling from the middle, you can hinge an element from the edge, a corner,
              or even a custom spot.
            </p>
            <p>No movement on its own, just a reference point for transforms.</p>
          </div>
        </InViewArticle>
        {/**
         * Transform origin core props
         * Example shows a hinge effect by rotating from left edge.
         * PropsListItem pulls descriptions from constants to ensure consistency across the site.
         * No direct link to docs, as these are no other use for these props.*/}
        <InViewArticle
          id="transform-origin-props"
          ariaLabelledBy="transform-origin-props"
          title="Usage of transform origin"
        >
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-3 ">
            <LazyMount block="code">
              <CodeHighliter>
                {`<motion.div
  animate={{ scale: 1.2, rotate: 45 }}
  style={{
    originX: 0,   // left edge
    originY: 0.5, // vertical center
    originZ: 20,  // hinge 20px towards viewer
  }}
  className="origin-[0%_50%_20px]" // if using tailwind, pure css
/>`}
              </CodeHighliter>
            </LazyMount>
            <LazyMount>
              <MotionExample
                className="w-full  h-fit"
                initial={{ scale: 1, rotate: 0 }}
                animate={{ scale: 1.2, rotate: 45 }}
                styles={{ originX: 0, originY: 0.5, originZ: 20 }}
              />
            </LazyMount>
            <ul className="list-disc space-y-2 list-inside my-4 py-2 w-full text-left">
              {TRANSFORM_ORIGIN_PROPERTIES.map(({ property, description }) => (
                <PropsListItem key={property} title={property} description={description} />
              ))}
            </ul>
          </div>
        </InViewArticle>
        {/**
         * Transform origin: usage
         * When to use
         * - You want to change the pivot point of a transform
         * - You need more control over the animation's origin
         * - You want to create more complex animations
         */}
        <InViewArticle
          id="when-transform-origin"
          ariaLabelledBy="when-transform-origin"
          title=" When to reach for a transform origin"
        >
          <ul
            className="list-disc space-y-2 list-inside  w-full 
            [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            {WHEN_TRANSFORM_ORIGIN.map(({ title, description }) => (
              <li key={title}>
                <span>{title}</span> - {description}
              </li>
            ))}
          </ul>
        </InViewArticle>
        {/**
         * Transform origin: dangers
         * What to look out for when using transform origin, what might go wrong.
         */}
        <InViewArticle
          id="transform-origin-look-out-for"
          ariaLabelledBy="transform-origin-look-out-for"
          title="What to look out for with transform origin"
        >
          <ul className="danger-list">
            {TRANSFORM_ORIGIN_DANGER.map((section) => (
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
      {/* END TRANSFORM ORIGIN */}

      {/* PER VALUE OVERRIDES */}
      <InViewSection
        id="per-value-overrides"
        aria-labelledby="per-value-overrides"
        title="Per-value overrides — mix feels per property"
      >
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div
  transition={{ default: {type:'spring'},
    opacity:{type:'tween', ease:'linear', duration:0.2}}
    }
  />`}</CodeHighliter>
        </LazyMount>
        {/**
         * Core idea of how one will use per-value overrides
         * Example shows a spring for position and a quick linear tween for opacity.
         * Paragraph explains what happenes in the example.
         */}
        <InViewArticle
          id="core-props-per-value-overrides"
          ariaLabelledBy="core-props-per-value-overrides"
          title="Core idea"
        >
          <p className="paragraph">
            A transition doesn’t have to be one-size-fits-all. You can give everything a general
            timing and easing, then fine-tune individual properties with their own rules. For
            example, let opacity fade on a quick linear tween while scale bounces on a spring. The
            <code className="code">default</code> key sets the baseline feel, and naming a property
            inside <code className="code">transition</code> lets you override just that one.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] items-center">
            <LazyMount block="code">
              <CodeHighliter>
                {`<motion.div
  initial={{ y: 0, opacity: 0 }}
  animate={{
    y: -80,
    opacity: 1,
    transition: {
      default: { type: "spring", stiffness: 220, damping: 24 },
      opacity: { type: "tween", ease: "linear", duration: 0.2 }
    }
  }}
/>`}
              </CodeHighliter>
            </LazyMount>
            <LazyMount>
              <MotionExample
                size="small"
                className="h-fit w-full"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -80, opacity: 1 }}
                transition={{
                  default: { type: "spring", stiffness: 220, damping: 24 },
                  opacity: { type: "tween", ease: "linear", duration: 0.2 },
                }}
              />
            </LazyMount>
            <p className="paragraph text-sm lg:text-right">
              In this example, the position change on the x-axis uses a spring so the movement feels
              physical, like the element is being pulled into place and settling naturally. At the
              same time, opacity is given its own override: instead of following the spring, it
              fades in quickly with a simple linear tween over 0.2 seconds.
            </p>
          </div>
        </InViewArticle>
        {/** Per Value overrides: Usage
         * When to use per-value overrides
         * Examples include, hierarchy, staggered animations, mixed property types.
         *
         */}

        <InViewArticle
          id="when-overridden"
          ariaLabelledBy="when-per-value-overrides"
          title="When to use per-value overrides"
        >
          <ul
            className="list-disc space-y-2 list-inside  w-full 
            [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            {WHEN_PER_VALUE.map(({ title, description }) => (
              <li key={title}>
                <span>{title}</span> - {codeFromBackticks(description)}
              </li>
            ))}
          </ul>
        </InViewArticle>
      </InViewSection>
      {/* END PER VALUE OVERRIDES */}
      {/* KEYFRAMES */}
      <InViewSection
        id="keyframes"
        aria-labelledby="keyframes"
        title="Keyframes - Multi-step motion"
      >
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div ... transition={{times:[0,0.2,0.5,1], ease:['easeIn','easeOut','easeInOut']}}/>`}</CodeHighliter>
        </LazyMount>
        {/**
         * Keyframes
         * Allows multi-step motion and timing via `times` (0..1).
         * Example shows a y animation with multiple waypoints and easing curves.
         * Paragraph explains what happens in the example.
         */}
        <InViewArticle id="keyframes-core" ariaLabelledBy="keyframes-core" title="Core idea">
          <div className="paragraph space-y-2">
            <p>
              Keyframes allow you to animate a property through multiple intermediate values rather
              than just start → end. Think of them like waypoints along the animation timeline. With
              keyframes you can:
            </p>
            <ul className="list-disc space-y-1 list-inside my-1 ">
              <li>Define keyframes for each stage of the animation.</li>
              <li>
                Optionally specify times (fractions between 0 and 1) to control when each waypoint
                happens.
              </li>
              <li>Combine with easing, delay, repeat, etc.</li>
            </ul>
            <p>
              They let you build motions that aren’t monotonic (just linear or spring from A to B),
              but more complex: overshoot, bounce, flip, wiggle, etc
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-[2fr_1fr_2fr] ">
            <LazyMount block="code">
              <CodeHighliter>
                {`<motion.div
  animate={{ y: [0, -100, -50, -100] }}
  transition={{
    duration: 2,
    ease: ["easeIn", "easeOut", "easeInOut"],
    times: [0, 0.4, 0.7, 1]
  }}
/>`}
              </CodeHighliter>
            </LazyMount>
            <LazyMount>
              <MotionExample
                size="small"
                className="h-fit w-full"
                initial={{ y: 0 }}
                animate={{ y: [0, -100, -50, -100] }}
                transition={{
                  duration: 2,
                  ease: ["easeIn", "easeOut", "easeInOut"],
                  times: [0, 0.4, 0.7, 1],
                }}
              />
            </LazyMount>
            <p className="paragraph text-sm lg:text-right">
              Here the element animates in multiple stages: it moves from 0 to 100, back to 50, and
              then to 100 again. The full sequence takes two seconds, with different easing curves
              shaping each segment. The times array decides how much of the timeline each step
              occupies.
            </p>
          </div>
        </InViewArticle>
        {/**
         * Keyframes: usage
         * When would someone want to use keyframes?
         */}
        <InViewArticle
          id="when-keyframes"
          ariaLabelledBy="when-keyframes"
          title="When to reach for Keyframes"
        >
          <ul
            className="list-disc space-y-2 list-inside  w-full 
            [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            {WHEN_KEYFRAMES.map(({ title, description }) => (
              <li key={title}>
                <span>{title}</span> - {codeFromBackticks(description)}
              </li>
            ))}
          </ul>
        </InViewArticle>
        {/**
         * Keyframes: dangers
         * What to look out for when using keyframes, what might go wrong.
         */}
        <InViewArticle
          id="keyframes-look-out-for"
          ariaLabelledBy="keyframes-look-out-for"
          title="What to look out for with Keyframes"
        >
          <ul className="danger-list">
            {KEYFRAME_DANGER.map(({ title, items }) => (
              <li key={title}>
                <span>{title}</span>
                <ul className="list-disc space-y-1 list-inside my-1">
                  {items.map((item) => (
                    <li key={item}>{codeFromBackticks(item)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </InViewArticle>
      </InViewSection>
      {/* END KEYFRAMES */}

      {/* MOTION CONFIG */}
      <InViewSection
        id="motion-config"
        aria-labelledby="motion-config"
        title="Project defaults with MotionConfig"
      >
        <LazyMount block="code">
          <CodeHighliter>{`<MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
  <App />
</MotionConfig>`}</CodeHighliter>
        </LazyMount>
        {/** CORE Idea of motionConfig
         * What it is and why we might want to use it.
         * Example shows two squares with different transition feels: one using the shared defaults from MotionConfig, the other overriding them.
         * Paragraph explains what happens in the example.
         */}
        <InViewArticle
          id="what-is-motion-config"
          ariaLabelledBy="what-is-motion-config"
          title="Core idea"
        >
          <p className="paragraph">
            <code>MotionConfig</code> is a top-level wrapper component that lets you define defaults
            and global policies for all <code>motion</code> components inside its tree. Instead of
            repeating transition settings everywhere, you set a baseline once. It also handles
            accessibility / user preferences like “reduced motion” in a centralized place.
          </p>
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-[2fr_1fr_2fr] ">
            <LazyMount block="code">
              <CodeHighliter>
                {`import { MotionConfig, motion } from "motion/react";

<MotionConfig 
  transition={{ duration: 0.8, ease: "easeInOut" }}
  reducedMotion="user"
>
  <motion.div
    initial={{ y: 50 }}
    whileHover={{ y: 0 }}
                />
  <motion.div
    initial={{ y: 50 }}
    whileHover={{ y: 0 }}
    transition={{ type: "tween", ease: "backInOut", duration: 2 }}
    />
</MotionConfig>`}
              </CodeHighliter>
            </LazyMount>
            <div className="flex justify-center gap-10 max-md:pb-12">
              <MotionConfig transition={{ duration: 0.8, ease: "easeInOut" }} reducedMotion="user">
                <motion.div
                  initial={{ y: 50 }}
                  whileHover={{ y: 0 }}
                  className="w-10 h-10 bg-gradient-to-b from-primary to-secondary rounded-md cursor-pointer"
                />
                <motion.div
                  initial={{ y: 50 }}
                  whileHover={{ y: 0 }}
                  transition={{ type: "tween", ease: "backInOut", duration: 2 }}
                  className="w-10 h-10 bg-gradient-to-b from-primary to-secondary rounded-md cursor-pointer"
                />
              </MotionConfig>
            </div>
            <p className="paragraph text-sm lg:text-right">
              Both squares animate upward on hover, but their motion feels different. The first uses
              the shared transition defaults from <code className="code">MotionConfig</code>, while
              the second overrides them with its own easing and duration.
            </p>
          </div>
        </InViewArticle>
        {/** MotionConfig properties
         * The three key props: transition, reducedMotion, nonce.
         * Reduced motion gets a deeper dive since it’s important for accessibility.
         * Nonce gets a brief explanation since it’s more niche (CSP).
         * PropsListItem pulls descriptions from constants to ensure consistency across the site.
         * Direct to the docs on the same page for deeper dives on each prop.
         */}
        <InViewArticle
          id="motion-config-properties"
          ariaLabelledBy="motion-config-properties"
          title="MotionConfig properties"
        >
          <div className="space-y-2">
            <p className="paragraph">
              <code className="code">MotionConfig</code> has three key properties that let you
              control how animations behave across everything inside it. These are:
            </p>
            <ul className="list-disc space-y-2 list-inside  w-full text-left">
              {MOTION_CONFIG_PROPERTIES.map((item) => (
                <PropsListItem
                  key={item.property}
                  href={
                    "link" in item && item.link
                      ? `${Links.animation.motionTransition}${item.link}`
                      : undefined
                  }
                  title={item.property}
                  description={item.description}
                />
              ))}
            </ul>
          </div>
          <div className="mt-4 space-y-2" id="reducedMotion">
            <h4 className="font-display text-lg">Reduced Motion</h4>
            <p className="paragraph">
              One of MotionConfig’s most important jobs is respecting Reduced Motion. It accepts
              three modes:
            </p>
            <ul role="list" className="mt-4 space-y-4 ">
              {MOTION_CONFIG_REDUCED_MOTION.map((item) => (
                <li key={item.function} className="pl-6 ">
                  <div className="flex flex-col gap-1">
                    <p className="font-display text-sm font-semibold text-foreground">
                      {`"${item.function}"`}
                    </p>
                    <p className="text-sm text-foreground/80">{codeFromBackticks(item.content)}</p>
                  </div>

                  {/* Pros / Cons chips */}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {item.advantage && (
                      <div className="inline-flex items-center gap-2 rounded-lg border border-green-400/20 bg-green-500/10 px-2.5 py-1.5 text-sm text-green-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                        <span className="text-justify">{item.advantage}</span>
                      </div>
                    )}

                    {"disadvantage" in item && item.disadvantage && (
                      <div className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-400/10 px-2.5 py-1.5 text-sm text-red-400">
                        <XCircle className="h-4 w-4 shrink-0" aria-hidden />
                        <span className="text-justify">{item.disadvantage}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id="nonce" className="mt-4 space-y-2">
            <h4 className="font-display text-lg">Nonce</h4>
            <p className="paragraph">
              Unlike <code>transition</code> and <code>reducedMotion</code>, the nonce prop isn’t
              about feel or accessibility — it’s about security. Specifically, it helps Motion work
              inside environments with a strict <b>Content Security Policy (CSP).</b>
            </p>
            <p className="paragraph">
              CSP is a browser feature that prevents malicious scripts/styles from running by
              blocking inline code unless it has a trusted signature. Motion generates inline styles
              dynamically (to power animations), and without a nonce those styles can get blocked.
            </p>
            <p className="paragraph">
              The <code>nonce</code> is a unique one-time token (usually generated by your server
              for each request). By passing it to MotionConfig, Motion attaches it to the runtime
              <code> {`<style>`}</code> tags it injects. This way, the browser knows those styles
              are allowed, and your animations keep running.
            </p>
          </div>
        </InViewArticle>

        {/**
         * MotionConfig: usage
         * When to use motion config and why it matters.
         */}
        <InViewArticle
          id="when-motion-config"
          ariaLabelledBy="when-motion-config"
          title="When to reach for a motion config"
        >
          <ul
            className="list-disc space-y-2 list-inside  w-full 
            [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            {WHEN_TO_USE_MOTION_CONFIG.map(({ title, description }) => (
              <li key={title}>
                <span>{title}</span> - {description}
              </li>
            ))}
          </ul>
        </InViewArticle>
        {/**
         * MotionConfig: dangers
         * What to look out for when using motion config, what might go wrong.
         */}
        <InViewArticle
          id="spring-look-out-for"
          ariaLabelledBy="spring-look-out-for"
          title="What to look out for with spring"
        >
          <ul className="danger-list">
            {MOTION_CONFIG_DANGER.map((section) => (
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
      {/* END MOTION CONFIG */}
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
/**
 * <InViewArticle/>
 * Smaller content unit revealed when scrolled into view.
 * - Same entrance semantics as <InViewSection> for consistency.
 * - Use for conceptual chunks, not interactive state.
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
