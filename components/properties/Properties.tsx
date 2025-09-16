import CodeHighliter from "../codeExamples/CodeHighliter";
import MotionExample from "../codeExamples/MotionExample";
import { motion } from "motion/react";
export function DurationExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Fast (spring by default, short) */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ duration: 0.2 }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ duration: 0.2 }}
        />
        <p className="paragraph text-sm mt-4 text-center">
          Quick snap: 50&nbsp;px in <code className="code text-xs">0.2s</code>. Since{" "}
          <code className="code text-xs">x</code> is a transform, Motion uses a spring by default—
          compressed into a snappy burst.
        </p>
      </div>

      {/* Slow (spring by default, longer) */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ duration: 1 }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ duration: 1 }}
        />
        <p className="paragraph text-sm mt-4 text-center">
          <strong>Default spring, but slower:</strong> same move over{" "}
          <code className="code text-xs">1s</code> with that natural spring ease-in/out curve.
        </p>
      </div>

      {/* Tween override (time-based, backIn) */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ duration: 1, type: 'tween', ease: 'backIn' }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ duration: 1, type: "tween", ease: "backIn" }}
        />
        <p className="paragraph text-sm mt-4 text-center">
          <strong>Tween override:</strong> force a time-based curve (
          <code className="code text-xs">backIn</code>) for a wind-up feel—no spring physics.
        </p>
      </div>

      {/* Keyframes + times distribution */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: [50, 80, 100] }}
  transition={{ duration: 2, times: [0, 0.2, 1] }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: [50, 80, 100] }}
          transition={{ duration: 2, times: [0, 0.2, 1] }}
        />
        <p className="paragraph text-sm mt-4 text-center">
          Keyframes with timing control: reach 80&nbsp;px quickly (first 20%), then take the
          remaining 80% to glide toward 100. <code className="code text-xs">times</code> shapes
          rhythm inside one animation.
        </p>
      </div>

      {/* Spring duration mode + bounce (short) */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.7 }}
        />
        <p className="paragraph text-sm mt-4 text-center">
          Spring in duration mode: fixed <code className="code text-xs">0.5s</code> with{" "}
          <code className="code text-xs">bounce</code> for elastic overshoot and settle.
        </p>
      </div>

      {/* Spring duration mode + bounce (long) */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ type: 'spring', duration: 2, bounce: 0.7 }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ type: "spring", duration: 2, bounce: 0.7 }}
        />
        <p className="paragraph text-sm mt-4 text-center">
          Same spring, stretched: <code className="code text-xs">2s</code> amplifies that playful,
          elastic feel before it settles.
        </p>
      </div>
    </div>
  );
}

export function EaseExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Linear Transition */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ duration: 1, ease: "linear" }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ duration: 1, ease: "linear" }}
        />
        <p className="example-paragraph">
          <code>linear</code>: the box moves at a perfectly steady pace from start to finish. No
          acceleration or slowdown—just a constant, mechanical glide that feels rigid and
          predictable.
        </p>
      </div>

      {/* Anticipate variant */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{ duration: 1, ease: "anticipate" }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ duration: 1, ease: "anticipate" }}
        />
        <p className="example-paragraph">
          <code>anticipate</code>: the box briefly shifts backward before moving forward, like a
          wind-up. This little fake-out adds energy and makes the motion feel more expressive and
          playful than a standard ease.
        </p>
      </div>

      {/* Keyframes + times distribution */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div
  animate={{
    x: [0, 100, 0],
    transition: 
    { ease: ["easeIn", "easeOut"], duration: 1}
  }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: [0, 100, 0] }}
          transition={{ ease: ["easeIn", "easeOut"], duration: 1 }}
        />
        <p className="example-paragraph">
          Keyframes with per-segment easing: the path <code>0 &#10145; 100 &#10145; 0</code>
          runs in <code>1s</code> total. Because there are 3 keyframes, there are 2 segments—so the
          easing array maps to them: <code>{`"easeIn"`}</code> for 0 &#10142; 100, then{" "}
          <code>{`"easeOut"`}</code> for 100 &#10142; 0. With no
          <code>times</code> specified, each segment gets half the duration ( ≈0.5s each). Use{" "}
          <code>times</code> if you want uneven timing.
        </p>
      </div>
      {/* Cubic Bezier */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div 
  animate={{ x: 50 }}
  transition={{
    duration: 0.8,
    ease: [0.68, -0.85, 0.27, 1.55], // dramatic overshoot
  }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{
            duration: 1,
            ease: [0.68, -0.85, 0.27, 1.55],
          }}
        />
        <p className="example-paragraph">
          <code>cubic-bezier</code>: supply four control points
          <code>[x1, y1, x2, y2]</code>. This example uses
          <code>[0.68, -0.85, 0.27, 1.55]</code>, creating an exaggerated overshoot before settling.
          Great for signature motion.
        </p>
      </div>

      {/* Function */}
    </div>
  );
}

export function DelayExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/*  Delay by 0.5s*/}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div
  animate={{ x: 50 }} 
  transition={{ type: "tween", duration: 1, delay: 0.5 }} />
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ type: "tween", duration: 1, delay: 0.5 }}
        />
        <p className="example-paragraph">
          <code>delay: 0.5</code> pauses the start for half a second, then runs the tween over{" "}
          <code>1s</code>. Perfect for staggering multiple elements so they don’t all animate at
          once.
        </p>
      </div>
      {/* Delay in inside the transiton */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div
  animate={{ x: 50 }} 
  transition={{ type: "tween", duration: 1 delay: -0.5 }} />
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ type: "tween", duration: 1, delay: -0.5 }}
        />
        <p className="example-paragraph">
          <code>delay: -0.5</code> tells Motion to start the tween as if it began half a second ago.
          The box jumps straight into the motion partway through, finishing in the remaining{" "}
          <code>0.5s</code>. Useful for syncing or offsetting animations on load.
        </p>
      </div>
    </div>
  );
}

export function RepeatExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Basic 2 times*/}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div
  animate={{ x: 50 }}
  transition={{ type: "tween", duration: 0.5, repeat: 2 }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ type: "tween", duration: 0.5, repeat: 2 }}
        />
        <p className="example-paragraph">
          <code>repeat: 2</code> means the animation runs 3 times total: the original pass plus two
          repeats. Each cycle lasts <code>0.5s</code>, so the box moves right, snaps back, and does
          it again twice before stopping.
        </p>
      </div>
      {/* REverse direction each cycle */}
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div
  animate={{ x: 50 }}
  transition={{ type: "tween", duration: 0.6,
   repeat: 3, repeatType: "reverse" }}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ x: 0 }}
          animate={{ x: 50 }}
          transition={{ type: "tween", duration: 0.6, repeat: 3, repeatType: "reverse" }}
        />
        <p className="example-paragraph">
          Adding <code>repeatType: {"reverse"}</code> makes each cycle play in the opposite
          direction. These box moves 4 times(1 original + 3 repeats), alternating right then left.
          This creates a natural back-and-forth motion instead of always snapping back to the start.
        </p>
      </div>
      <div className="grid sm:grid-cols-[2fr_1fr] md:grid-cols-1">
        <CodeHighliter>{`<motion.div
 initial={{ rotate: 0 }}
 animate={{rotate: 180,transition: 
 { type: "tween", duration: 1, ease: "linear",  repeat: Infinity },
}}
/>`}</CodeHighliter>
        <MotionExample
          size="small"
          initial={{ rotate: 0 }}
          animate={{
            rotate: 180,
            transition: { type: "tween", duration: 1, ease: "linear", repeat: Infinity },
          }}
        />
        <p className="example-paragraph">
          Here the <code>transition</code> lives inside the
          <code>animate</code> prop instead of being passed globally. That way the infinite loop
          only runs while
          <code>animate</code> is active. Once you toggle it off, the animation stops
          cleanly—perfect for start/stop controls or play–pause buttons.
        </p>
      </div>
    </div>
  );
}
