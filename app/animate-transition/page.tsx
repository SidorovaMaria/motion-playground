"use client";
import CodeAndExample from "@/components/codeExamples/CodeAndExample";
import CodeHighliter from "@/components/codeExamples/CodeHighliter";

import { Links } from "@/constants/links";
import { revealSpanVariant } from "@/variants/buttonVariants";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import LazyMount from "@/utils/LazyMount";

const AnimationPage = () => {
  const router = useRouter();

  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto text-cente space-y-1 ">
        <h1 className="main-heading">Animation Basics</h1>
        <p className="subheading">
          Meet Motion’s <code className="code">animate</code>: declare the target, let Motion drive
          the frames. This page orients you to what you can animate and how transitions shape the
          feel.
        </p>
      </header>
      <section aria-label="Animation Overview" className="mt-3 max-w-4xl mx-auto">
        <p className="paragraph text-left max-w-3xl ">
          Animations are just change over time. In Motion, you declare the target visual state with
          the <code className="code text-xs">animate</code> prop and let the library drive the
          frames. You don’t micromanage <code className="code text-xs">requestAnimationFrame</code>.
          <br />
          You say where to go, Motion figures out how to get there. When the values in animate
          change, the component animates.
        </p>

        <div className="text-left space-y-4 mt-4 text-foreground">
          <p className="font-display text-sm ">
            Overview of what you&apos;ll learn in this section:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-foreground/80 font-bold">
            <li>
              See how to swap any element for its motion equivalent (
              <code className="code">motion.div</code>, <code className="code">motion.a</code>, …).
            </li>
            <li>
              Learn what’s animatable: transforms (<code className="code">x</code>,{" "}
              <code className="code">scale</code>, <code className="code">rotate</code>, …) and
              common CSS (opacity, color, filters, shadows).
            </li>
            <li>
              Understand transitions at a glance: <strong>tween</strong> (duration/ease) vs{" "}
              <strong>spring</strong> (stiffness/damping/bounce).
            </li>
            <li>Quick look/examples into animate transitions</li>
          </ul>
        </div>
      </section>
      {/* Meet the Motion component  Basic */}
      <section aria-label="Meet the Motion component" className="mt-12 max-w-4xl mx-auto">
        <h2 className="heading mb-4">Meet the Motion component</h2>
        <p className="paragraph text-left max-w-3xl">
          The <code className="code text-xs">{`<motion />`}</code> component is an enhanced version
          of every HTML and SVG element, giving them powerful animation capabilities. You can use a
          variety of{" "}
          <a
            href={Links["animate-transition"].transitionProperties}
            className="text-primary/90 font-semibold hover:underline"
          >
            animation props{" "}
          </a>
          provided by the library by simply replacing a standard HTML element with its motion
          equivalent.
        </p>
        <div className="code-block text-xs mt-5">
          <code>
            {"<div> -> <motion.div /> "}
            <span className="comment"> #div element with motion abilities </span>
          </code>
        </div>
        <div className="code-block text-xs mt-2.5">
          <code>
            {"<a> -> <motion.a /> "}
            <span className="comment"> #a element with motion abilities </span>
          </code>
        </div>
        <p className="paragraph  mt-5">
          The most common animation prop is <code className="code text-xs">animate</code>. When we
          pass values to the element it will automatically animate to those values.
        </p>
        <div className="flex gap-7 items-center justify-center mt-4">
          <div className="w-full ">
            <LazyMount>
              <CodeHighliter>
                {`<motion.div 
  animate={{ borderRadius: '100%' }} 
  transition={{ duration: 2 }} 
/> 
// animates to border-radius: "100%" in 2 seconds 
// <- refresh browser to see the effect`}
              </CodeHighliter>
            </LazyMount>
          </div>
          <motion.div
            animate={{ borderRadius: "100%" }}
            initial={{ borderRadius: "0" }}
            transition={{ duration: 2, delay: 0.5 }}
            className=" w-24 h-24 bg-primary/80 rounded-lg shrink-0"
          />
        </div>
      </section>
      {/* What can you animate? */}
      <section aria-label="What can you animate?" className="mt-12 max-w-4xl mx-auto">
        <h2 className="heading mb-4">What can you animate?</h2>
        <p className="paragraph text-left max-w-2xl">
          Motion can animate <b>transforms</b> and “regular” CSS. That includes opacity, colors,
          filters, even some things browsers don’t normally tween (like certain images), thanks to
          Motion’s rendering layer
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-display mt-6 mb-2 text-left">Transforms</h3>
            <p className="paragraph text-left">
              Transforms are the most powerful and performant way to animate things on screen. They
              allow you to move, scale, rotate, and skew elements in 2D or 3D space.
            </p>
            <ul
              aria-label="Transforms list"
              className="list-disc list-inside space-y-2 mt-4 text-base text-foreground [&>li]:text-sm font-display"
            >
              {transformProperties.map(({ label, codes }) => (
                <li key={label}>
                  {label}: <code className="code">{codes.join(", ")}</code>
                </li>
              ))}
            </ul>
            <motion.button
              initial="rest"
              whileHover="hovered"
              whileFocus="hovered"
              animate="rest"
              onClick={() => router.push(Links["animate-transition"].playground)}
              className="primary-button flex items-center text-sm py-1 px-3! mt-4"
            >
              <p>Explore Playground to learn more</p>
              <motion.span variants={revealSpanVariant} className="text-background bounce-right">
                <ArrowRight />
              </motion.span>
            </motion.button>
          </div>
          <div>
            <h3 className="text-lg font-display mt-6 mb-2 text-left">CSS Properties</h3>
            <p className="paragraph text-left">
              CSS properties can also be animated, allowing for a wide range of visual effects. It
              can even animate values that aren&apos;t normally animatable by browsers, will learn
              about them later on.
            </p>
            <ul
              aria-label="CSS list"
              className="list-disc list-inside space-y-2 my-4 text-base text-foreground [&>li]:text-sm font-display"
            >
              {CSSProperties.map(({ label, codes }) => (
                <li key={label}>
                  {label}: <code className="code">{codes.join(", ")}</code>
                </li>
              ))}
            </ul>

            <p className="paragraph text-left">And many more...</p>
          </div>
        </div>
      </section>
      {/* What values are animatable in Motion? */}
      <section
        aria-label="What values are animatable in Motion?"
        className="mt-12 max-w-4xl mx-auto"
      >
        <h2 className="heading mb-4">What values are animatable in Motion?</h2>
        <p className="paragraph text-left max-w-2xl">
          Motion can animate with a variety of value types, including numbers, strings, hex colors,
          rgba colors and even complex values like shadows and arrays.
        </p>
        <ul
          aria-label="Transforms list"
          className="list-disc list-inside space-y-2 mt-4 text-base text-foreground [&>li]:text-sm font-display"
        >
          {AnimatableValues.map(({ label, codes }) => (
            <li key={label}>
              {label}: <code className="code">{codes.join(", ")}</code>
            </li>
          ))}
        </ul>
      </section>
      {/* Motion Transition */}
      <hr className="max-w-4xl mx-auto my-12 border-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />

      <section aria-label="Motion Transition" className=" max-w-4xl mx-auto ">
        <h2 className="main-heading">Motion Transition</h2>
        {/* Transition - What are they? */}
        <section
          aria-label="Transitions - What are they?"
          className="mt-12 max-w-4xl mx-auto mb-20 space-y-2"
        >
          <h2 className="heading"> Transitions - What are they?</h2>
          <h3 className="text-sm text-foreground/80 font-display">
            Motion transitions are the animations that occur when a component changes from one state
            to another.
          </h3>
          <aside className="aside-block">
            <h4 className="aside-title">How to define a transition</h4>
            <p className="paragraph text-sm mt-2">
              You can define a transition by passing a{" "}
              <code className="code text-xs">transition</code> prop to any motion component. This
              prop accepts an object that specifies the type of transition for the overall
              animation, or a specific prop, its duration, easing function, and other parameters.
            </p>
            <div className="">
              <h5 className="aside-title text-base mt-4 mb-2">Animation Props available:</h5>
              <ul className="list-disc list-inside space-y-2 mt-4 mb-2 text-base text-foreground [&>li]:text-sm font-display paragraph">
                {AnimationProps.map((item, idx) =>
                  item.children ? (
                    <li key={item.label + idx}>
                      {item.label}
                      <ul className="list-disc list-inside ml-4 text-sm space-y-2 pt-2">
                        {item.children.map((child, cidx) => (
                          <li key={child.label + cidx}>
                            {child.label} <code>{child.codes.join(", ")}</code>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.label + idx}>
                      {item.label}
                      {item.codes.length > 0 && (
                        <>
                          {" "}
                          <code>{item.codes.join(", ")}</code>
                        </>
                      )}
                    </li>
                  )
                )}
              </ul>
              <p className="paragraph text-left max-w-2xl">
                This is the starter kit, not the whole toolbox. Motion also offers advanced spring
                tuning, keyframes, inertia for gestures, AnimatePresence (enter/exit), layout, and
                motion values. We’ll explore each in its own chapter as you progress through the
                website
              </p>
            </div>
            <div className="mt-4">
              <CodeAndExample
                codeText={`<motion.div
  animate={{ rotate: 90 }}
  transition={{ type: "spring", stiffness: 100, damping: 10 }}
/>
// Moves to rotate:90 using a spring`}
                motionProps={{
                  initial: { rotate: 0 },
                  animate: { rotate: 90 },
                  transition: { type: "spring", stiffness: 100, damping: 10 },
                }}
              />
              <CodeAndExample
                codeText={`<motion.div
  animate={{ boxShadow: "8px 4px 10px rgba(255, 255, 0, 1)" }}
  transition={{ type: "tween", ease: "easeIn", duration: 1 }}
  />
  // Moves to x:100 using a spring`}
                motionProps={{
                  initial: { boxShadow: "0 0px 0px rgba(0, 0, 0, 0)" },
                  animate: { boxShadow: "8px 4px 8px rgba(255,255,0,1)" },
                  transition: { type: "tween", ease: "easeIn", duration: 1 },
                }}
              />
              <CodeAndExample
                codeText={`<motion.div
  animate={{ x: 50, opacity: 1 }}
  transition={{
    default: { type: "spring", stiffness: 180, damping: 20,
      repeat: 2, repeatType: "mirror", repeatDelay: 0.5 }, // applies to x
    opacity: { type: "tween", ease: "easeIn", duration: 1.5 } // override for opacity
    }}
/>
// x uses a spring; opacity uses an easeIn tween`}
                motionProps={{
                  initial: { x: 0, opacity: 0.2 },
                  animate: { x: 50, opacity: 1 },
                  transition: {
                    default: {
                      type: "spring",
                      stiffness: 180,
                      damping: 20,
                      repeat: 2,
                      repeatType: "mirror",
                      repeatDelay: 0.5,
                    },
                    opacity: { type: "tween", ease: "easeIn", duration: 1.5 },
                  },
                }}
              />
              <motion.button
                initial="rest"
                whileHover="hovered"
                whileFocus="hovered"
                animate="rest"
                onClick={() => router.push(Links["animate-transition"].playground)}
                className="primary-button flex items-center text-base py-2 px-3! my-8 mx-auto"
              >
                <p>Play around in the playground </p>
                <motion.span variants={revealSpanVariant} className="text-background bounce-right">
                  <ArrowRight />
                </motion.span>
              </motion.button>
            </div>
          </aside>
        </section>
        {/* Motion default transitions */}
        <section
          aria-label="Motion default transitions"
          className="mt-12 max-w-4xl mx-auto space-y-2"
        >
          <h2 className="heading">
            Motion Transitions - <span className="text-lg">What happens if you do nothing?</span>
          </h2>
          <p className="paragraph">
            Motion has good instincts. It chooses a default transition that makes sense for the type
            of value you’re animating. But you can always customize it to suit your needs.
          </p>
          <p className="paragraph">
            Moving something around the screen or changing its size?
            <code className="code text-xs">x, y, scale</code>? It’ll reach for a spring—because
            physics feels natural.
          </p>
          <p className="paragraph ">
            Fading or tinting colors? <code className="code text-xs">opacity, backgroundColor</code>{" "}
            That’s handled with a clean, time-based easing curve. Different motions, different
            rhythms.
          </p>
        </section>
      </section>
      {/* Motion Transition Deep Dive */}

      <motion.button
        initial="rest"
        whileHover="hovered"
        whileFocus="hovered"
        animate="rest"
        onClick={() => router.push(Links["animate-transition"].motionTransition)}
        className="primary-button flex items-center text-base font-display tracking-wide font-normal p-4! mx-auto w-full max-w-4xl rounded-md mt-12 "
      >
        <p>Deep dive Into the Motion Transition </p>
        <motion.span variants={revealSpanVariant} className="text-background bounce-right ml-auto">
          <ArrowRight className="" />
        </motion.span>
      </motion.button>
    </main>
  );
};

export default AnimationPage;
const transformProperties = [
  {
    label: "Move",
    codes: ["x", "y", "z"],
  },
  {
    label: "Scale",
    codes: ["scale", "scaleX", "scaleY"],
  },
  {
    label: "Rotate",
    codes: ["rotate", "rotateX", "rotateY", "rotateZ"],
  },
  {
    label: "Skew",
    codes: ["skew", "skewX", "skewY"],
  },
  {
    label: "Origin",
    codes: ["originX", "originY", "originZ"],
  },
  {
    label: "Depth",
    codes: ["transformPerspective"],
  },
];
const CSSProperties = [
  {
    label: "Opacity",
    codes: ["opacity"],
  },
  {
    label: "Color",
    codes: ["color", "borderColor"],
  },
  {
    label: "Corners",
    codes: ["borderRadius"],
  },
  {
    label: "Shadows",
    codes: ["boxShadow", "textShadow"],
  },
  {
    label: "Background Color",
    codes: ["background-color"],
  },
  {
    label: "Filters",
    codes: ["blur", "brightness", "contrast"],
  },
];
const AnimatableValues = [
  {
    label: "Numbers",
    codes: ["0", "1", "100", "etc"],
    description: "",
  },
  {
    label: "String containing numbers",
    codes: ['"0vh"', '"55px"', '"15%"', "etc"],
    description: "",
  },
  {
    label: "Colors",
    codes: ['HEX -> "#fff"', 'RGBA -> "rgba(255, 255, 255, 1)"', 'HSLA -> "hsla(0, 0%, 100%, 1)"'],
    description: "",
  },
  {
    label: "Complex Strings like box-shadow",
    codes: ['"0 4px 8px rgba(0, 0, 0, 0.1)"'],
    description: "",
  },
  {
    label: "Visibility",
    codes: ['"hidden"', '"visible"'],
    description: "",
  },
  {
    label: "Display",
    codes: ['"none"', '"block"'],
    description: "",
  },
  {
    label: "Width/Height",
    codes: ['"auto"', '"block"'],
    description: "",
  },
];

const AnimationProps = [
  {
    label: "Type",
    codes: ['"spring"', '"tween"'],
    description: "Transition type",
  },
  {
    label: "Timing/Physics",
    codes: [],
    description: "",
    children: [
      {
        label: "Tween",
        codes: ['"duration"', '"delay"', '"ease"'],
        description: "Tween timing options",
      },
      {
        label: "Spring",
        codes: ['"stiffness"', '"damping"', '"mass"', '"bounce"'],
        description: "Spring physics options",
      },
    ],
  },
  {
    label: "Repeat Controls",
    codes: ['"repeat"', '"repeatType"', '"repeatDelay"'],
    description: "Repeat animation options",
  },
  {
    label: "Per-value overrides",
    codes: ["transition={{ default: {…}, opacity: {…} }}"],
    description: "Override transition per property",
  },
];
