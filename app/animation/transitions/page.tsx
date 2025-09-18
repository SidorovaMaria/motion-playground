"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRightFromSquare, ChevronDown, Loader } from "lucide-react";
import PropsListItem from "@/components/cards_tags/PropsListItem";
import { Links } from "@/utils/links";
import { usePathname } from "next/navigation";
import { usePersistentBoolean } from "@/utils/usePersistentBoolean";
import {
  EASE_SOUL_OF_TWEEN,
  KEYFRAME_DANGER,
  MOTION_CONFIG_DANGER,
  SPRING_DANGER,
  SPRING_PROPERTIES,
  TRANSFORM_ORIGIN_DANGER,
  TRANSFORM_ORIGIN_PROPERTIES,
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
import { animate } from "motion";

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
          Let&apos;s explore the transition prop together with practical examples and copy-paste
          snippets.
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
        {/* What is a tween */}
        <InViewArticle
          id="what-is-tween"
          ariaLabelledby="what-is-tween"
          title='What a "tween" actually is'
        >
          <div className="[&>p]:text-base! [&>p]:u-paragraph spacey-y-1">
            <p>
              <span className="font-bold">&quot;Tween&quot;</span> is short for{" "}
              <span className="italic font-bold">in-betweening</span> — the old animation term for
              drawing the frames between two key poses. In Motion, a tween transitoin simply says:{" "}
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
        {/* Tween dangers */}
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

      {/* SPRING */}
      <InViewSection id="spring" aria-label="Spring Transitions" title="Spring">
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div ... transition={{type:'spring'}}/>`}</CodeHighliter>
        </LazyMount>
        {/* Spring Physics */}
        <InViewArticle
          id="spring-physics"
          ariaLabelledby="spring-physics"
          title={`What a "spring" actually is`}
        >
          <div className="[&>p]:text-base! paragraph">
            <p>
              A <code>{`"spring"`}</code> in Motion is all about physics over math. Instead of just
              tweening linearly over time, it behaves like a real spring system: it gets pulled
              toward the target, overshoots, and then settles. Josh Comeau explain it with a great
              example on his{" "}
              <a
                target="_blank"
                href="https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/"
                className=" font-bold text-secondary hover:underline"
              >
                blog. <ArrowUpRightFromSquare className="inline small-icon text-secondary" />
              </a>{" "}
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
        {/* SPRING CORE */}
        <InViewArticle
          id="spring-core-props"
          ariaLabelledby="spring-core-props"
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

        {/* When to use spring */}
        <InViewArticle
          id="when-spring"
          ariaLabelledby="when-spring"
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
        <InViewArticle
          id="spring-look-out-for"
          ariaLabelledby="spring-look-out-for"
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
      {/* Transform Origin */}
      <InViewSection
        id="transform-origin"
        aria-labelledby="transform-origin"
        title="Changing Transform Origin"
      >
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div style={{ originX: 0.5 }} />`}</CodeHighliter>
        </LazyMount>
        <InViewArticle
          id="what-is-transform-origin"
          ariaLabelledby="what-is-transform-origin"
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
        <InViewArticle
          id="transform-origin-props"
          ariaLabelledby="transform-origin-props"
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
        <InViewArticle
          id="when-transform-origin"
          ariaLabelledby="when-transform-origin"
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
        <InViewArticle
          id="tween-look-out-for"
          ariaLabelledby="tween-look-out-for"
          title="What to look out for with tween"
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
      {/* Per Value Ovverrides */}
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
        <InViewArticle
          id="core-props-per-value-overrides"
          ariaLabelledby="core-props-per-value-overrides"
          title="Core idea"
        >
          <p className="paragraph text-base">
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
        <InViewArticle
          id="when-overridden"
          ariaLabelledby="when-per-value-overrides"
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
      {/* KEYFRAMES */}
      <InViewSection
        id="keyframes"
        aria-labelledby="keyframes"
        title="Keyframes - Multi-step motion"
      >
        <LazyMount block="code">
          <CodeHighliter>{`<motion.div ... transition={{times:[0,0.2,0.5,1], ease:['easeIn','easeOut','easeInOut']}}/>`}</CodeHighliter>
        </LazyMount>
        <InViewArticle id="keyframes-core" ariaLabelledby="keyframes-core" title="Core idea">
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
        {/* When to use keyframes */}
        <InViewArticle
          id="when-keyframes"
          ariaLabelledby="when-keyframes"
          title="When to reach for keyframes"
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
        {/* Dangers with keyframes */}
        <InViewArticle
          id="keyframes-look-out-for"
          ariaLabelledby="keyframes-look-out-for"
          title="What to look out for with keyframes"
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
      {/* Motion Config */}
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
        <InViewArticle
          id="what-is-motion-config"
          ariaLabelledby="what-is-motion-config"
          title="Core idea"
        >
          <p className="paragraph text-base">
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
        <InViewArticle
          id="when-motion-config"
          ariaLabelledby="when-motion-config"
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
        <InViewArticle
          id="spring-look-out-for"
          ariaLabelledby="spring-look-out-for"
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
  const prefersReduced = useReducedMotion();
  const pathname = usePathname(); // make the key per-page
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
  const prefersReduced = useReducedMotion();
  return (
    <motion.article
      id={id}
      aria-labelledby={ariaLabelledby}
      role="article"
      initial={prefersReduced ? { opacity: 0, y: 0 } : { opacity: 0, y: -25 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
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
