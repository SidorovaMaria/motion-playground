"use client";
import CodeHighliter from "@/components/codeExamples/CodeHighliter";
import InViewArticle from "@/components/pageFormat/InViewArticle";
import InViewSection from "@/components/pageFormat/InViewSection";
import MotionPropertyOverview from "@/components/properties/MotionPropertyOverview";
import { Links } from "@/constants/links";
import {
  animateMProp,
  exitMProp,
  initialMProp,
  onAnimationCompleteMProp,
  onAnimationStartMProp,
  onUpdateMProp,
  variantsMProp,
} from "@/constants/motion-components-props";
import LazyMount from "@/utils/LazyMount";
import { deriveDefaultSpring } from "@/utils/motion";
import { revealSpanVariant } from "@/variants/buttonVariants";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useCallback } from "react";

const MotionComponentPage = () => {
  const router = useRouter();
  return (
    <main className=" max-w-7xl mx-auto px-10 py-12">
      {/* Page header: short pitch, keeps the reader oriented */}
      <header className="font-display max-w-4xl mx-auto text-cente space-y-1 ">
        <h1 className="main-heading">Motion Component</h1>
        <p className="subheading">
          Meet the Motion component, your gateway to creating stunning animations in React
          applications.
        </p>
      </header>
      {/* Intro: sets context + links back to the earlier “Animate & Transitions” lesson */}
      <InViewArticle
        title="Motion Components: First Steps"
        ariaLabelledBy="motion-component-first-steps"
        id="motion-component-first-steps"
      >
        <p className="paragraph">
          As you saw in{" "}
          <Link
            href={Links["animate-transition"].default}
            className="text-secondary hover:underline"
          >
            Animate & Transitions
            <ArrowUpRightFromSquare className="inline ml-1 h-4 w-4" />
          </Link>{" "}
          , Motion can upgrade any HTML or SVG element into something far more powerful — a motion
          component. By swapping <code>{`<div> `}</code>for <code>{`<motion.div>`}</code>, honestly
          you don’t just get the <code>animate</code> prop; you unlock a whole set of props designed
          for building rich, interactive animations.
        </p>
        <p className="paragraph">
          These cover everything from animation foundations to user-driven behavior and
          viewport-aware triggers. Together, they’re the building blocks for richer, more polished
          interactions.
        </p>
        <p className="paragraph">Think of them in three broad groups:</p>

        <ul
          aria-label="Use cases for motion components"
          className="list-disc list-inside space-y-2  paragraph [&>li]:text-sm font-display [&>li>span]:text-foreground/100"
        >
          <li>
            <span>Animation purposes</span> &#10142; (making elements move, fade, scale, rotate)
          </li>
          <li>
            <span>User behavior</span> &#10142; (responding to hover, tap, drag, or scroll)
          </li>
          <li>
            <span>Complex interactions</span> &#10142; (coordinating entrances, exits, and layout
            changes)
          </li>
        </ul>
        <p className="paragraph">What are they? Continue reading to find out.</p>
      </InViewArticle>
      <section
        id="animation-props"
        className="mt-12 max-w-4xl mx-auto"
        aria-labelledby="animation-props"
      >
        <h2 className="heading mb-4">Core Animation Props</h2>
        <div className="space-y-2 paragraph">
          <p>
            Core animation props are the props that form the backbone of Motion. They tell an
            element where to begin, where to end up, and how to travel between those points. With
            them, you can define an element’s lifecycle in motion — from its very first frame on
            screen to the way it exits, and everything in between.
          </p>
          <p>At their simplest, core props answer three questions:</p>
          <ul
            aria-label="Use cases for motion components"
            className="list-disc list-inside space-y-2  paragraph [&>li]:text-sm font-display [&>li>span]:text-foreground/100 [&>li>span]:mr-2"
          >
            <li>
              <span>Where does it start?</span>
              <code>`initial`</code>
            </li>
            <li>
              <span>Where does it go?</span>
              <code>`animate`</code>
            </li>{" "}
            <li>
              <span>How does it leave?</span>
              <code>`exit`</code>
            </li>
          </ul>
          <p>
            But the set goes further. <code>variants</code> let you reuse states across multiple
            components,
            <code>style</code> makes inline styles animatable, and callbacks like{" "}
            <code>onUpdate</code>, <code>onAnimationStart</code>, and
            <code>onAnimationComplete</code> let you hook into the animation’s lifecycle for extra
            control.
          </p>
        </div>
        {/* 'Initial' Section */}
        <InViewSection
          id="initial"
          title="'Initial' — Setting The Starting Line"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
        >
          <div className="paragraph space-y-2 ">
            <p>
              When you give a motion component an animate value, it heads straight to the target.
              But what about where it starts?
              <br /> That’s where <code>initial</code> comes in: it defines the element’s state
              before any animation begins.
            </p>
            <p>
              You might have already noticed this in earlier examples. Imagine a button that
              animates upward when clicked. If you never set an initial, Motion assumes the DOM’s
              current style is the start point. But by explicitly setting initial, you control how
              the animation begins — whether that’s offscreen, transparent, smaller, or rotated.
            </p>
          </div>
          <InitialExample />
          <MotionPropertyOverview overview={initialMProp} />
        </InViewSection>
        {/* 'Animate' Section */}
        <InViewSection
          id="animate"
          title="'Animate' — Defining The Target State"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
          contentClassName="pt-2! pb-4!"
        >
          <div className="paragraph space-y-2 ">
            <p>
              Once an element has its starting point, <code>animate</code> takes over. It declares
              the destination state your motion component should move toward.
            </p>
            <p>
              Without <code>animate</code>, nothing actually animates — the element simply remains
              at its <code>initial</code> (or DOM/CSS default) values. By setting{" "}
              <code>animate</code>, you define exactly where the element should end up: a new
              position, size, color, opacity, or any other animatable value. Motion then handles
              every frame in between.
            </p>
            <p>
              Think of <code>animate</code> as the “destination” in your animation. Whether the
              journey uses a time-based tween, a physics spring, or a sequence of keyframes,{" "}
              <code>animate</code> always describes the final state.
            </p>
          </div>

          <AnimateExample />
          <MotionPropertyOverview overview={animateMProp} />
        </InViewSection>
        {/* 'Exit' Section */}
        <InViewSection
          id="exit"
          title="'Exit' — Defining The Exit State"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
          contentClassName="pt-2! pb-4!"
        >
          <div className="paragraph space-y-2 ">
            <p>
              When it’s time for an element to leave, <code>exit</code> defines how it should
              disappear. Instead of vanishing instantly, the component animates out with the
              properties you specify.
            </p>
            <p>
              Without <code>exit</code>, elements are simply removed from the DOM the moment React
              unmounts them. By providing an <code>exit</code> state (and wrapping in{" "}
              <code>AnimatePresence</code>), you control the visual “goodbye” — whether that’s
              fading, sliding, shrinking, or rotating away.
            </p>
            <p>
              Think of <code>exit</code> as the “farewell” of your animation lifecycle. Where{" "}
              <code>initial</code> is the entrance and <code>animate</code> is the present,
              <code>exit</code> completes the story by giving every element a graceful way to leave.
            </p>
            <p>
              Important: Owing to React limitations, the component being removed must be a direct
              child of{" "}
              <Link href="#" className="text-secondary hover:underline">
                AnimatePresence
              </Link>{" "}
              to enable this animation.
            </p>
          </div>
          {/* Example exit animation */}
          <ExitExample />
          <MotionPropertyOverview overview={exitMProp} />
        </InViewSection>
        {/* 'Variants' Section */}
        <InViewSection
          id="variants"
          title="'Variants' — Naming and Orchestrating States"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
          contentClassName="pt-2! pb-4!"
        >
          <div className="paragraph space-y-2 ">
            <p>
              Variants let you name animation states (like{" "}
              <code>{`"hidden", "visible", "exit"`}</code>) and apply them to many elements at once.
              Instead of hard-coding values in every component, you declare a small set of reusable
              poses and switch between them by name. Parents can trigger children, children can
              inherit timing, and whole sections of UI can move in sync—all with a single state
              change.
            </p>
            <p>
              Without variants, each element manages its own <code>initial/animate </code> object,
              which gets repetitive and easy to desync. With variants, you centralize intent: “this
              group is visible” becomes a single command that coordinates stagger, delays, and
              per-element differences.
            </p>
            <p>
              Think of variants as the choreography layer in your animation system. Where{" "}
              <code>initial</code>
              defines the entrance pose and <code>animate</code> defines the present pose for a
              single element, <code>variants</code> give those poses names, share them across
              components, and orchestrate them as a team—including exits.
            </p>
          </div>
          <VariantsExample />
          <MotionPropertyOverview overview={variantsMProp} />
        </InViewSection>
        {/* 'onUpdate' Section */}
        <InViewSection
          id="onUpdate"
          title="'onUpdate' — Responding to Animation Changes"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
          contentClassName="pt-2! pb-4!"
        >
          <div className="paragraph space-y-2">
            <p>
              While <code>animate</code> defines <em>where</em> an element should move,{" "}
              <code>onUpdate</code> gives you access to the values <em>as they change</em>
              during the animation. It fires every frame, passing the latest animated values.
            </p>
            <p>
              This is especially useful when you want to sync Motion’s animation with something
              outside of the element itself — like updating a progress bar, changing text,
              triggering side effects, or debugging how values evolve in real-time.
            </p>
            <p>
              Think of <code>onUpdate</code> as a live feed of Motion’s animation loop: it doesn’t
              just tell you the start and end, it lets you watch and react to the journey.
            </p>
          </div>
          <ProgressExample />
          <MotionPropertyOverview overview={onUpdateMProp} />
        </InViewSection>
        {/* 'onAnimationStart' Section */}
        <InViewSection
          id="onAnimationStart"
          title="'onAnimationStart' — Catching the First Frame"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4 border-2! border-foreground/20! rounded-xl!"
          contentClassName="pt-2! pb-4!"
        >
          <div className="paragraph space-y-2">
            <p>
              While <code>onUpdate</code> reports values on every frame,{" "}
              <code>onAnimationStart</code> is about the <em>very beginning</em> of an animation. It
              fires once when Motion starts animating toward a new target.
            </p>
            <p>
              This makes it ideal for side effects that need to happen right as movement begins —
              like logging, changing UI state, triggering sounds, or starting a timer in sync with
              an animation.
            </p>
            <p>
              Think of <code>onAnimationStart</code> as the opening cue in an animation’s lifecycle:
              it’s Motion telling you, “the journey has begun.” Paired with{" "}
              <code>onAnimationComplete</code>, it gives you clear bookends around each animation.
            </p>
          </div>
          {/* Example component goes here */}
          <OnAnimationStartExample />
          <MotionPropertyOverview overview={onAnimationStartMProp} />
        </InViewSection>
        <InViewSection
          id="onAnimationComplete"
          title="'onAnimationComplete' — Celebrating the Finish Line"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4 border-2! border-foreground/20! rounded-xl!"
          contentClassName="pt-2! pb-4!"
        >
          <div className="paragraph space-y-2">
            <p>
              If <code>onAnimationStart</code> is the opening cue, <code>onAnimationComplete</code>{" "}
              is the closing note. It fires once an animation has fully finished, after all frames
              and delays have resolved.
            </p>
            <p>
              This makes it perfect for actions that should only occur after motion is done — like
              re-enabling UI controls, triggering follow-up animations, updating data, or running
              cleanup logic.
            </p>
            <p>
              Think of <code>onAnimationComplete</code> as Motion’s way of saying, “the journey has
              ended.” Used together with <code>onAnimationStart</code>, it gives you clear bookends
              for orchestrating side effects around your animations.
            </p>
          </div>
          {/* Example component goes here */}
          <OnAnimationCompleteExample />
          <MotionPropertyOverview overview={onAnimationCompleteMProp} />
        </InViewSection>
      </section>
      <motion.button
        initial="rest"
        whileHover="hovered"
        whileFocus="hovered"
        animate="rest"
        onClick={() => router.push(Links["motion-component"].hover_focus)}
        className="primary-button flex items-center text-base font-display tracking-wide font-normal p-4! mx-auto w-full max-w-4xl rounded-md mt-12 capitalize"
      >
        <p>Explore Motion’s Interactive Features </p>
        <motion.span variants={revealSpanVariant} className="text-background bounce-right ml-auto">
          <ArrowRight className="" />
        </motion.span>
      </motion.button>
    </main>
  );
};

export default MotionComponentPage;

const InitialExample = () => {
  const [open, setOpen] = React.useState(false);
  // Inside your component
  const prefersReduced = useReducedMotion();
  const spring = React.useMemo(
    () => deriveDefaultSpring(prefersReduced ?? false),
    [prefersReduced]
  );
  const onToggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between px-10">
        <div className="relative">
          <motion.div
            initial={{ x: 80, opacity: 0.5 }}
            animate={open ? { x: 0, opacity: 1 } : {}}
            className="w-20 h-20 bg-gradient-to-br from-secondary to-primary flex items-center justify-center rounded-md text-xs font-display cursor-pointer relative z-10 "
            transition={spring}
            onClick={onToggle}
          >
            Click me
          </motion.div>
          <div className="w-20 h-20 absolute inset-0 border rounded-md text-[10px] text-center pointer-events-none flex flex-col items-center justify-center">
            <p>The original position of the div in the document flow</p>
          </div>
        </div>
        <div className="justify-end flex flex-col items-end max-w-[60%]">
          {open ? (
            <>
              <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
                The box is now at its target (x:0, opacity:1).
                <br /> Click to send it back.
              </p>
            </>
          ) : (
            <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
              {" "}
              The box is at its initial state (x:80, opacity:0.5).
              <br />
              Click to animate it in.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`<motion.div
        initial={{ x: 80, opacity: 0.5 }} // Start 80px to the right and half-transparent
        animate={open ? { x: 0, opacity: 1 } : undefined} // Animate to original position and full opacity when 'open' is true
        transition={
      prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20 }
        }
        onClick={() => setOpen((o) => !o)} // Toggle 'open' state on click
      >
        Click me
      </motion.div>`}
          </CodeHighliter>
        </LazyMount>
        <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
          This example shows how initial works both as the starting state on mount and as a fallback
          whenever animate is removed. The box begins at x: 80, opacity: 0.5, animates to x: 0,
          opacity: 1 when open, and “returns” to initial once animate is undefined. Useful as a
          baseline, but for a reliable back-and-forth toggle you should define both states
          explicitly in animate.
        </p>
      </div>
    </div>
  );
};
const AnimateExample = () => {
  const [open, setOpen] = React.useState(false);
  const prefersReduced = useReducedMotion();
  const spring = React.useMemo(
    () => deriveDefaultSpring(prefersReduced ?? false),
    [prefersReduced]
  );
  const onToggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between px-10">
        <div className="relative">
          <motion.div
            // animate is reactive: it always points to the "current destination"
            // If open is true → animate to { x: 0, opacity: 1 }
            // If open is false → animate to { x: 80, opacity: 0.5 }
            animate={open ? { x: 0, opacity: 1 } : { x: 80, opacity: 0.5 }}
            className="w-20 h-20 bg-gradient-to-br from-secondary to-primary flex items-center justify-center rounded-md text-xs font-display cursor-pointer relative z-10 "
            // Use a spring transition unless reduced motion is preferred
            transition={spring}
            // Toggle the state on click, which triggers a new animation
            onClick={onToggle}
          >
            Click me
          </motion.div>

          {/* Static overlay just to show where the element sits in normal flow */}
          <div className="w-20 h-20 absolute inset-0 border rounded-md text-[10px] text-center pointer-events-none flex flex-col items-center justify-center">
            <p>The original position of the div in the document flow</p>
          </div>
        </div>

        {/* Text feedback depending on the current state */}
        <div className="justify-end flex flex-col items-end max-w-[60%]">
          {open ? (
            <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
              Animate has moved the box to its target (x:0, opacity:1) when <code>open</code> is
              true.
              <br /> Click to animate it back out.
            </p>
          ) : (
            <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
              Animate sets the destination (x:80, opacity:0.5). When <code>open</code> is false, the
              box will animate to this state.
              <br /> Click to bring the box in again.
            </p>
          )}
        </div>
      </div>

      {/* Example code block with comments */}
      <div className="flex flex-col">
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`<motion.div
  animate={open ? { x: 0, opacity: 1 } : { x: 80, opacity: 0.5 }} 
  // animate always defines the current destination
  // Reacting to 'open' changing triggers smooth transitions
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  onClick={() => setOpen((o) => !o)} // toggles the state, which updates animate
>
  Click me
</motion.div>`}
          </CodeHighliter>
        </LazyMount>

        {/* Teaching point under the demo */}
        <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
          This example highlights how <code>animate</code> is reactive: whenever its values change,
          Motion smoothly drives the element to the new destination. Unlike <code>initial</code>,
          which only runs on mount, <code>animate</code> keeps responding to state updates.
        </p>
      </div>
    </div>
  );
};

const ExitExample = () => {
  const [open, setOpen] = React.useState(false);
  const prefersReduced = useReducedMotion();
  const spring = React.useMemo(
    () => deriveDefaultSpring(prefersReduced ?? false),
    [prefersReduced]
  );
  const [exit, setExit] = React.useState(false);
  const onToggle = useCallback(() => setOpen((o) => !o), []);
  const onExit = useCallback(() => setExit((e) => !e), []);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between px-10">
        <div className="relative">
          <AnimatePresence>
            {!exit && (
              <>
                <motion.div
                  initial={{ x: 80, opacity: 0.5 }}
                  animate={open ? { x: 0, opacity: 1 } : {}}
                  exit={{ y: -80, opacity: 0 }}
                  className="w-20 h-20 bg-gradient-to-br from-secondary to-primary flex items-center justify-center rounded-md text-xs font-display cursor-pointer relative z-10 "
                  transition={spring}
                  onClick={onToggle}
                >
                  Click me
                </motion.div>
                <div className="w-20 h-20 absolute inset-0 border rounded-md text-[10px] text-center pointer-events-none flex flex-col items-center justify-center">
                  <p>The original position of the div in the document flow</p>
                </div>
              </>
            )}
          </AnimatePresence>
          <div className=" mt-4 gap-1 flex flex-col items-center">
            <button
              className=" button-outline py-2! disabled:cursor-not-allowed disabled:opacity-50 text-sm!"
              onClick={onExit}
            >
              {exit ? "Bring it back" : "Remove element"}
            </button>
          </div>
        </div>

        <div className="justify-end flex flex-col items-end max-w-[60%]">
          {exit ? (
            <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
              The box is leaving with its <code>exit</code> animation (moving up and fading out)
              before being removed from the DOM.
              <br /> Use {`"Bring it back"`} to re-mount it.
            </p>
          ) : open ? (
            <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
              The box has reached its <code>animate</code> target (x:0, opacity:1).
              <br /> Click it to send it back, or remove it entirely with the button below.
            </p>
          ) : (
            <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
              The box is at its <code>initial</code> state (x:80, opacity:0.5).
              <br /> Click it to animate in, or remove it completely.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`<AnimatePresence>
{!exit && (  // Conditionally render the motion.div
    <motion.div
      initial={{ x: 80, opacity: 0.5 }}
      animate={open ? { x: 0, opacity: 1 } : {}}
      exit={{ y: -80, opacity: 0 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 200, damping: 20 }
      }
      onClick={() => setOpen((o) => !o)}
    >
      Click me
    </motion.div>
)}
 </AnimatePresence>`}
          </CodeHighliter>
        </LazyMount>
        <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
          This example highlights the full lifecycle: <code>initial</code> defines the starting
          pose, <code>animate</code> moves the box into place when state changes, and{" "}
          <code>exit</code> handles removal. Notice the difference: the motion box animates up and
          fades out before being unmounted, while the static border div disappears instantly because
          it has no <code>exit</code> behavior. Together, these show how Motion extends React’s
          normal mount/unmount with graceful, state-driven transitions.
        </p>
      </div>
    </div>
  );
};
const VariantsExample = () => {
  const [open, setOpen] = React.useState(false);
  const prefersReduced = useReducedMotion();
  const spring = React.useMemo(
    () => deriveDefaultSpring(prefersReduced ?? false),
    [prefersReduced]
  );
  const [exit, setExit] = React.useState(false);
  const onToggle = useCallback(() => setOpen((o) => !o), []);
  const onExit = useCallback(() => setExit((e) => !e), []);
  const boxVariant = {
    hidden: { x: 80, opacity: 0.5 },
    visible: { x: 0, opacity: 1 },
    exit: { y: -80, opacity: 0 },
  };
  return (
    <div className="my-5">
      <div className="flex items-center justify-between px-10">
        <div className="relative min-h-20">
          <AnimatePresence>
            {!exit && (
              <motion.div
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                exit="exit"
                variants={boxVariant}
                className="w-20 h-20 bg-gradient-to-br from-secondary to-primary flex items-center justify-center rounded-md text-xs font-display cursor-pointer relative z-10 "
                // Use a spring transition unless reduced motion is preferred
                transition={spring}
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="justify-end flex flex-col gap-2 items-center text-center">
          <button className="button-outline py-1! text-sm" onClick={onToggle}>
            Animate
          </button>
          <button className="button-outline py-1! text-sm" onClick={onExit}>
            {exit ? "Bring it back" : "Remove element"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] mt-4 gap-6">
        <div className="grid grid-cols-1 grid-row-2 items-center place-content-center">
          <div className="paragraph text-sm text-foreground/70 text-left italic leading-tight">
            {exit ? (
              <p>
                The box is using its <code>{`"exit"`}</code> variant — it animates out before React
                removes it from the DOM.
              </p>
            ) : open ? (
              <p>
                The box is using its <code>{`"visible"`}</code> variant — it has reached the target
                state.
                <br /> Click to send it back, or remove it entirely with the button below.
              </p>
            ) : (
              <p>
                The box is using its <code>{`"hidden"`}</code> variant — the starting state.
                <br /> Click to animate it in, or remove it completely.
              </p>
            )}
          </div>
          <LazyMount>
            <CodeHighliter fontSize={10} lineHeight={14}>
              {`const boxVariant = {
  hidden: { x: 80, opacity: 0.5 },
  visible: { x: 0, opacity: 1 },
  exit: { y: -80, opacity: 0 },
};`}
            </CodeHighliter>
          </LazyMount>
        </div>
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`<AnimatePresence>
  {!exit && (
    <motion.div
      initial="hidden" 
      animate={open ? "visible" : "hidden"} /
      exit="exit" 
      variants={boxVariant} 
    >
      Click me
    </motion.div>
  )}
</AnimatePresence>
`}
          </CodeHighliter>
        </LazyMount>
      </div>
      <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
        This example shows how <code>variants</code> group multiple states into a single object,
        making animations easier to manage and reuse. Instead of writing separate objects for{" "}
        <code>initial</code>,<code>animate</code>, and <code>exit</code>, you define named states (
        <code>{`"hidden"`}</code>,<code>{`"visible"`}</code>, <code>{`"exit"`}</code>) once, and
        simply reference them by name. This keeps your animations consistent, scalable, and much
        clearer when coordinating multiple components.
      </p>
    </div>
  );
};
const ProgressExample = () => {
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col  gap-3">
          <motion.div
            className={`h-3 bg-secondary  rounded-full ${
              open ? "border-foreground/80" : "border-transparent"
            } border`}
            initial={{ width: "0%" }}
            animate={open ? { width: "100%" } : {}}
            transition={{ duration: 8, type: "tween", ease: "linear" }}
            style={{ originX: 0 }}
            onUpdate={(latest) => {
              const pct =
                typeof latest.width === "number" ? latest.width : parseFloat(latest.width) || 0;
              setProgress(Math.min(100, Math.round(pct)));
            }}
          />
          <p className="text-sm text-foreground/70">Progress: {progress}%</p>
          <button
            onClick={() => setOpen(!open)}
            className="button-outline py-2! px-3!  text-sm
            disabled:cursor-not-allowed disabled:opacity-50"
            disabled={(open && progress < 100) || (!open && progress > 0)}
          >
            {open ? "Reverse Progress" : "Start Progress"}
          </button>
        </div>
        <div className="paragraph text-sm text-foreground/70 text-right italic leading-relaxed">
          {open ? (
            <p className="">
              The bar is expanding toward <code>width: 100%</code>.
              <br /> Each frame, <code>onUpdate</code> reports the current width so the text stays
              in sync.
            </p>
          ) : (
            <p className="">
              The bar is collapsing towards<code> {`'initial'`} </code> state where{" "}
              <code>width: 0%</code>.
              <br /> Click to animate it forward again.
            </p>
          )}
        </div>
      </div>
      <LazyMount>
        <CodeHighliter fontSize={10} lineHeight={14}>
          {`<motion.div
  initial={{ width: "0%" }}
  animate={open ? { width: "100%" } : {}}
  transition={{ duration: 8, type: "tween", ease: "linear" }}
  style={{ originX: 0 }}
  onUpdate={(latest) => {
    const pct = typeof latest.width === "number" ? latest.width : parseFloat(latest.width) || 0;
    setProgress(Math.min(100, Math.round(pct)));
  }}
/>
`}
        </CodeHighliter>
      </LazyMount>
      {/* Teaching point under the demo */}
      <p className=" text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto [&>code]:p-0 [&>code]:pr-1 [&>code]:code">
        This example shows how <code>onUpdate</code> gives you live access to animation values on
        every frame. Here it tracks the bar’s <code>width</code> and converts it into a percentage
        label, keeping the UI in sync with the animation itself. Unlike <code>animate</code>, which
        only defines the destination, <code>onUpdate</code> lets you react to the journey as it
        happens.
      </p>
    </div>
  );
};
const OnAnimationStartExample = () => {
  const [open, setOpen] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between px-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={open ? { scale: 1.2, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
          transition={{ duration: 1 }}
          onAnimationStart={() => {
            setStarted(true);
            // Auto-clear the flag after a short delay, simulating a brief "started" message
            setTimeout(() => setStarted(false), 1000);
          }}
          className="w-20 h-20 bg-gradient-to-br from-secondary to-primary flex items-center justify-center rounded-md text-xs font-display cursor-pointer"
          onClick={() => setOpen((o) => !o)}
        >
          Click me
        </motion.div>

        <div className="flex flex-col items-end gap-2 max-w-[50%]">
          <div className="min-h-[1.5rem]">
            <AnimatePresence>
              {started && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-green-500 italic"
                  transition={{ duration: 0.05 }}
                >
                  🚀 Animation started!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
            The box {open ? "expands" : "shrinks"} when you click.
            <br /> <code className="code">onAnimationStart</code> fires the instant the animation
            begins.
          </p>
        </div>
      </div>

      <LazyMount block="code">
        <CodeHighliter fontSize={10} lineHeight={14}>
          {`<motion.div
  initial={{ scale: 0.8, opacity: 0.5 }}
  animate={open ? { scale: 1.2, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
  transition={{ duration: 1 }}
  onAnimationStart={() => {
    setStarted(true);
    setTimeout(() => setStarted(false), 800);
  }}
>
  Click me
</motion.div>`}
        </CodeHighliter>
      </LazyMount>

      {/* Teaching point */}
      <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
        This demo shows how <code>onAnimationStart</code> can trigger side effects right at the
        beginning of motion. Here it briefly displays a “started” message whenever the box begins
        scaling, proving that you can synchronize external UI or events with animation lifecycles.
      </p>
    </div>
  );
};
const OnAnimationCompleteExample = () => {
  const [open, setOpen] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  return (
    <div className="my-5">
      <div className="flex items-center justify-between px-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={open ? { scale: 1.2, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            setCompleted(true);
            // Auto-hide the message after a short delay
            setTimeout(() => setCompleted(false), 1200);
          }}
          className="w-20 h-20 bg-gradient-to-br from-secondary to-primary flex items-center justify-center rounded-md text-xs font-display cursor-pointer"
          onClick={() => setOpen((o) => !o)}
        >
          Click me
        </motion.div>

        <div className="flex flex-col items-end gap-2 max-w-[50%]">
          <div className="min-h-[1.5rem]">
            <AnimatePresence>
              {completed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-blue-500 italic"
                  transition={{ duration: 0.05 }}
                >
                  🚀 Animation completed!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <p className="text-sm text-foreground/70 text-right italic leading-relaxed">
            The box {open ? "expands" : "shrinks"} when you click.
            <br /> <code className="code">onAnimationComplete</code> fires once the animation is
            fully finished.
          </p>
        </div>
      </div>

      <LazyMount block="code">
        <CodeHighliter fontSize={10} lineHeight={14}>
          {`<motion.div
  initial={{ scale: 0.8, opacity: 0.5 }}
  animate={open ? { scale: 1.2, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
  transition={{ duration: 1 }}
  onAnimationComplete={() => {
    setCompleted(true);
    setTimeout(() => setCompleted(false), 1200);
  }}
>
  Click me
</motion.div>`}
        </CodeHighliter>
      </LazyMount>

      {/* Teaching point */}
      <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
        This demo shows how <code>onAnimationComplete</code> can trigger side effects once motion
        ends. Here it briefly displays a “completed” message after the box finishes scaling, proving
        that you can synchronize cleanup, unlock UI actions, or chain animations to run only after
        one has fully completed.
      </p>
    </div>
  );
};
