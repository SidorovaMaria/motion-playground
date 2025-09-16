import CodeHighliter from "@/components/codeExamples/CodeHighliter";
import {
  DelayExamples,
  DurationExamples,
  EaseExamples,
  RepeatExamples,
} from "@/components/properties/Properties";

import PropertyShowcase from "@/components/properties/PropertyShowcase";
import TransitionPropertySection from "@/components/properties/TransitionPropertySection";
import { label } from "motion/react-client";
import React from "react";

const TransitionProperties = () => {
  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto space-y-2 ">
        <h1 className="main-heading">Transition Properties</h1>
        <p className="subheading">
          There are several transition properties you can use to customize the animation behavior in
          Framer Motion. Here we explore all of them with tiny exmaples to understand how they work.
        </p>
      </header>
      <TransitionPropertySection
        id="duration"
        title="Duration"
        description={
          <>
            <code className="code pl-0">duration</code> is your time dial. It’s the simplest way to
            control pace and timing, especially powerful when combined with easing, delays, repeats,
            and keyframes.
          </>
        }
        snippet={`<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.8 }}
/>`}
        overview={[
          { label: "What", content: <>How long the animation runs (seconds).</> },
          {
            label: "Default",
            content: (
              <>
                {" "}
                <code className="code-a">0.3</code> (for tweens)
              </>
            ),
          },
          { label: "Options", content: <>Any positive number.</> },
          { label: "Effect", content: <>Larger = smoother/slower, smaller = snappier.</> },
          {
            label: "Note",
            content: (
              <>
                On springs, <code className="code-a">duration</code> only works when you use a
                duration-based spring. Physics springs ignore it.
              </>
            ),
          },
        ]}
        examples={<DurationExamples />}
      />

      <TransitionPropertySection
        id="ease"
        title="Ease"
        description={
          <>
            <code className="code pl-0">ease</code> defines the <em>rhythm</em> of your animation —
            how progress speeds up or slows down between start and end. It’s the personality of a
            tween: the same duration can feel snappy, smooth, or playful depending on the easing
            curve you pick. Combine it with <code className="code">duration</code>, keyframes, and
            repeats to fine-tune the flow of motion.
          </>
        }
        snippet={`<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.8, ease: "backInOut" }}
/>`}
        overview={[
          { label: "What", content: <>The progress curve from start &#10153; end.</> },
          {
            label: "Default",
            content: (
              <>
                <code className="code-a">{`"easeOut"`}</code>
              </>
            ),
          },
          {
            label: "Options",
            content: (
              <>
                <ul className=" list-decimal list-inside p-2 text-sm props space-y-2">
                  <li>
                    <span>String:</span>
                    <code className="code-a text-xs leading-6 inline">{`"linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" |  "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" `}</code>
                  </li>
                  <li>
                    <span>Cubic-bezier array: </span>
                    <code className="code-a text-xs leading-6 inline">[x1, y1, x2, y2] </code> (e.g.
                    [0.33, 1, 0.68, 1])
                  </li>
                  <li>
                    <span>Function: </span>(t: number) &#10153; number (advanced)
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        examples={<EaseExamples />}
      />
      <TransitionPropertySection
        id="delay"
        title="Delay"
        description={
          <>
            <code className="code pl-0">delay</code> offsets when an animation begins. Positive
            values wait; negative values start part-way through the timeline. Pair with{" "}
            <code className="code">duration</code>, <code className="code">ease</code>, repeats, and
            keyframes to choreograph sequences.
          </>
        }
        snippet={`<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 1, delay: -0.3 }} // start 0.3s into the motion
/>`}
        overview={[
          { label: "What", content: <>Start offset in seconds (can be negative).</> },
          { label: "Default", content: <code className="code-a">0</code> },
          {
            label: "Options",
            content: (
              <>
                Any number (e.g. <code className="code-a">-0.3</code>,{" "}
                <code className="code-a">0.2</code>).
              </>
            ),
          },
          {
            label: "Effect",
            content: <>Delay &gt; 0 waits; Delay &lt; 0 seeks into the animation.</>,
          },
          {
            label: "Gotchas",
            content: (
              <>
                If <code className="code-a">abs(delay) ≥ duration</code> and no repeat, it ends
                instantly. With repeats, you start mid-cycle. For springs, negative delay doesn’t
                “pre-simulate” physics—prefer tweens/keyframes when you need seeking.
              </>
            ),
          },
        ]}
        examples={<DelayExamples />}
      />
      <TransitionPropertySection
        id="repeat"
        title="Repeat"
        description={<>{/* TODO */}</>}
        snippet={`<motion.div
  animate={{ scale: 1.1 }}
  transition={{ type: "tween", duration: 0.8, repeat: Infinity }}
/>`}
        overview={[
          {
            label: "What",
            content: (
              <>Number of times to repeat the transition or Infinity for perpetual repetition.</>
            ),
          },
          { label: "Default", content: <code className="code-a">0</code> },
          {
            label: "Options",
            content: (
              <>
                Integer <code className="code-a"> ≥0</code> or{" "}
                <code className="code-a">Infinity</code>
              </>
            ),
          },
          {
            label: "Effect",
            content: (
              <>
                Loops the animation. Combine with <code className="code-a">repeatType</code> for
                behavior.
              </>
            ),
          },
          {
            label: "Gotchas",
            content: (
              <>
                Repeat counts exclude the first run.
                <code className="code-a ">Infinity</code> means forever. Will not stop unless you
                unmount or change the <code className="code-a">animate </code>prop. Works only with
                tween/keyframes, not physics-based transitions (spring, inertia).
              </>
            ),
          },
        ]}
        examples={<RepeatExamples />}
      />
    </main>
  );
};

export default TransitionProperties;
