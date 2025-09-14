"use client";
import { revealSpanVariant } from "@/variants/buttonVariants";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AnimationPage = () => {
  const router = useRouter();
  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto text-cente space-y-1 ">
        <h1 className="main-heading">Animation Basics</h1>
        <p className="subheading">
          What is motion&apos;s <code className="code">animate </code>? + Transforms & Transitions
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
            <li> What you can animate (transforms, opacity, filters, shadows, and more)</li>
            <li>How to tune the transition (timing, easing, spring physics, repeats)</li>
          </ul>
        </div>
      </section>
      {/* Meet the Motion component  */}
      <section aria-label="Meet the Motion component" className="mt-12 max-w-4xl mx-auto">
        <h2 className="heading mb-4">Meet the Motion component</h2>
        <p className="paragraph text-left max-w-3xl">
          The <code className="code text-xs">{`<motion />`}</code> component is an enhanced version
          of every HTML and SVG element, giving them powerful animation capabilities. You can use a
          variety of{" "}
          <a href="./animation-props" className="text-primary/90 font-semibold hover:underline">
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
          <div className="code-block text-xs rounded-2xl p-4 ">
            <code>
              {`<motion.div animate={{ border-radius: '100%' }} transition={{ duration: 2 }} />`}
              <span className="comment block mt-2">
                {" "}
                #animates to border-radius: {"100%"} in 2 seconds{" "}
                {`<- refresh browser to see the effect`}
              </span>
            </code>
          </div>
          <motion.div
            animate={{ borderRadius: "100%" }}
            initial={{ borderRadius: "0" }}
            transition={{ duration: 2 }}
            className=" w-24 h-24 bg-primary/80 rounded-lg shrink-0"
          />
        </div>
      </section>
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
              <li className="">
                Move: <code className="code">x, y, z</code>
              </li>
              <li>
                Scale: <code className="code">scale, scaleX, scaleY</code>
              </li>
              <li>
                Rotate: <code className="code">rotate, rotateX, rotateY, rotateZ</code>
              </li>
              <li>
                Skew: <code className="code">skew, skewX, skewY</code>
              </li>
              <li>
                Origin: <code className="code">originX, originY, originZ</code>
              </li>
              <li>
                Depth: <code className="code">transformPerspective</code>
              </li>
            </ul>
            <motion.button
              initial="rest"
              whileHover="hovered"
              whileFocus="hovered"
              animate="rest"
              onClick={() => router.push("/animation/playground")}
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
              <li className="">
                Opacity: <code className="code">opacity</code>
              </li>
              <li>
                Color: <code className="code">color, borderColor</code>
              </li>
              <li>
                Corners: <code className="code">borderRadius</code>
              </li>
              <li>
                Shadows: <code className="code">boxShadow, textShadow</code>
              </li>
              <li>
                Background Color: <code className="code">background-color</code>
              </li>
              <li>
                Filters: <code className="code">blur, brightness, contrast</code>
              </li>
            </ul>
            <p className="paragraph text-left">And many more...</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnimationPage;
