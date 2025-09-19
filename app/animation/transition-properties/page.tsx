import CodeHighliter from "@/components/codeExamples/CodeHighliter";
import {
  DelayExamples,
  DurationExamples,
  EaseExamples,
  RepeatDelayExamples,
  RepeatExamples,
  RepeatTypeExamples,
  StiffnessExamples,
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
      {/**
       * DURATION
       * Overview of the property
       * Code snippet
       * Examples
       */}
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
      {/**
       * EASE
       * Overview of the property
       * Code snippet
       * Examples
       */}
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
                    <span>String &#10145; </span>
                    <code className="code-a text-xs leading-6 inline">{`"linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" |  "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" `}</code>
                  </li>
                  <li>
                    <span>Cubic-bezier array &#10145; </span>
                    <code className="code-a text-xs leading-6 inline">[x1, y1, x2, y2] </code> (e.g.
                    [0.33, 1, 0.68, 1])
                  </li>
                  <li>
                    <span>Function &#10145; </span>(t: number) &#10153; number (advanced)
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        examples={<EaseExamples />}
      />
      {/**
       * DELAY
       * Overview of the property
       * Code snippet
       * Examples
       */}
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
            label: "Traps",
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
      {/**
       * REPEAT
       * Overview of the property
       * Code snippet
       * Examples
       */}
      <TransitionPropertySection
        id="repeat"
        title="Repeat"
        description={
          <>
            <code className="code pl-0">repeat</code> controls how many extra times an animation
            plays after its first run. By default it runs once (
            <code className="code">repeat: 0</code>). Setting a number like{" "}
            <code className="code">2</code> makes it run three times in total, while{" "}
            <code className="code">Infinity</code> loops it forever. Combine it with{" "}
            <code className="code">repeatType</code> (<code>loop</code>, <code>reverse</code>, or{" "}
            <code>mirror</code>) and <code className="code">repeatDelay</code> to shape how each
            cycle behaves. Great for loaders, pulsing buttons, or any motion that needs to keep
            going without manual triggers.
          </>
        }
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
            label: "Traps",
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
      {/**
       * REPEAT TYPE
       * Overview of the property
       * Code snippet
       * Examples
       */}
      <TransitionPropertySection
        id="repeatType"
        title="Repeat Type"
        description={
          <>
            {" "}
            <code className="code pl-0">repeatType</code> defines <em>how</em> an animation behaves
            when it repeats. By default it uses <code className="code">{`"loop"`}</code>, which
            snaps back to the start each cycle. Use <code className="code">{`"reverse"`}</code> to
            make the animation run backwards every other cycle (a ping-pong effect), or
            <code className="code">{`"mirror"`}</code> to reverse while also mirroring the easing
            curve for smoother, more symmetrical motion. Best used with
            <code className="code">repeat</code> or <code className="code">Infinity</code> to create
            back-and-forth motions, bouncing effects, or looping loaders that feel polished.
          </>
        }
        snippet={`<motion.div
  animate={{ scale: 1.1 }}
  transition={{ type: "tween", duration: 0.8, repeat: Infinity }}
/>`}
        overview={[
          {
            label: "What",
            content: <>How repeats play.</>,
          },
          { label: "Default", content: <code className="code-a">{'"loop"'}</code> },
          {
            label: "Options",
            content: (
              <>
                <ul className=" list-decimal list-inside p-2 text-sm props space-y-2 [&>li>span]:text-secondary">
                  <li>
                    <span>{`"loop"`} &#10145; </span>
                    Repeats the animation from the start.
                  </li>
                  <li>
                    <span>{`"reverse"`} &#10145; </span>
                    Alternates between forward and backwards playback.
                  </li>
                  <li>
                    <span>{`"mirror"`} &#10145; </span>Switches animation origin and target on each
                    iteration.
                  </li>
                </ul>
              </>
            ),
          },

          {
            label: "Traps",
            content: (
              <>
                Needs repeat to do anything. Not all transitions support it equally, since spring
                physics don’t naturally “ping-pong.”
              </>
            ),
          },
        ]}
        examples={<RepeatTypeExamples />}
      />
      {/**
       * REPEAT DELAY
       * Overview of the property
       * Code snippet
       * Examples
       */}
      <TransitionPropertySection
        id="repeatDelay"
        title="Repeat Delay"
        description={<>{/* TODO */}</>}
        snippet={`<motion.div
  animate={{ rotate: 360 }}
  transition={{
    type: "tween",
    duration: 1.2,
    repeat: Infinity,
    repeatDelay: 0.4,
    ease: "linear",
  }}
/>`}
        overview={[
          {
            label: "What",
            content: <>Pause between repeats (seconds).</>,
          },
          { label: "Default", content: <code className="code-a">{"0"}</code> },
          {
            label: "Options",
            content: (
              <>
                Any number <code className="code-a">≥ 0</code>
              </>
            ),
          },

          {
            label: "Traps",
            content: (
              <>
                Doesn&apos;t affect the first playthrough, only repeats. Works only with
                tween/keyframes. Counts towards total time, If you set{" "}
                <code className="code-a">duration: 1.2 </code>and{" "}
                <code className="code-a">repeatDelay: 0.4 </code>, each cycle effectively lasts
                1.6s. No negative values. Spring don’t support it well.
              </>
            ),
          },
        ]}
        examples={<RepeatDelayExamples />}
      />
      {/**
       * STIFFNESS
       * Overview of the property
       * Code snippet
       * Examples
       */}
      <TransitionPropertySection
        id="stiffness"
        examples={<StiffnessExamples />}
        title="Stiffness"
        snippet="<motion.div
  animate={{ x: 100 }}
  transition={{ type: 'spring', stiffness: 200 }}
/>"
        description={
          <>
            It defines how strong the spring’s restoring force is. A higher value means the spring
            yanks the animated value back faster and with more force, creating a tighter, snappier
            feel. A lower value means the spring is looser, slower to settle, and feels “heavier.”
          </>
        }
        overview={[
          {
            label: "What",
            content: <>Strength of the spring’s pull toward the target.</>,
          },
          {
            label: "Default",
            content: (
              <>
                <code className="code-a">100</code>
              </>
            ),
          },
          {
            label: "Options",
            content: (
              <>
                Any positive number (commonly <code className="code-a">50–500</code>)
              </>
            ),
          },
          {
            label: "Effect",
            content: (
              <>
                Larger &#10142; snappier, bouncier, settles quickly. | Smaller &#10142; looser,
                floatier, takes longer to reach target.
              </>
            ),
          },

          {
            label: "Traps",
            content: (
              <>
                Works only in physics-mode springs. If you switch to a duration-based spring,
                stiffness is ignored.
              </>
            ),
          },
        ]}
      />
    </main>
  );
};

export default TransitionProperties;
