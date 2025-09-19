/**
 * Transition property reference data for Motion docs/UI
 *
 * Purpose:
 * - Provides a typed, render-ready catalogue of transition properties (tween + spring)
 *   used to generate docs, tooltips, or property reference UIs.
 * - Each item includes a short code `snippet`, a human-readable `description`,
 *   and an `overview` list of labeled facts (with either simple text or key/value bullets).
 *
 */
/**
 * Types:
 * - PropertyOverviewItem:
 *   - id: Stable slug (e.g., "duration", "stiffness"). Used as React keys or URL anchors.
 *   - title: Human-readable display name for the property.
 *   - snippet: Example code snippet (string). Intended for rendering in a code block.
 *   - description: Explanatory text (may include backticks/markdown for inline code).
 *   - overview: Array of labeled rows describing details of the property.
 *       Each row can include:
 *         - { label, content }                        // single line of text
 *         - { label, contentArray: [{ label, content }] } // nested bullet points
 *         - or both at once (content + contentArray), which is intentional —
 *           allows a row to show a summary plus a detailed list under the same label.
 */

export type PropertyOverviewItem = {
  id: string;
  title: string;
  snippet: string;
  description: string;
  overview: {
    label: string;
    content?: string;
    contentArray?: { label: string; content: string }[];
  }[];
};

const durationProperty: PropertyOverviewItem = {
  id: "duration",
  title: "Duration",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.8 }}
/>`,
  description:
    "`duration` is your time dial. It’s the simplest way to control pace and timing, especially powerful when combined with easing, delays, repeats, and keyframes",
  overview: [
    { label: "What", content: "How long the animation runs (seconds)" },
    { label: "Default", content: "`0.3` seconds" },
    { label: "Options", content: "Any positive number (seconds)" },
    {
      label: "Effect",
      contentArray: [
        { label: "Larger values", content: "smoother,slower" },
        { label: "Smaller values", content: "snappier,faster" },
      ],
    },
    {
      label: "Common uses",
      content: "Adjusting speed of entrance/exit, hover, tap, drag animations",
    },
    {
      label: "Note",
      content:
        "When using keyframes, `duration` sets the total time for the entire sequence, not per keyframe.",
    },
  ],
};

const easeProperty: PropertyOverviewItem = {
  id: "ease",
  title: "Ease",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 0.8, ease: "backInOut" }}
/>`,
  description:
    "`ease` shapes the speed curve of a tweened animation. It maps linear time onto a curve, controlling how quickly or slowly values move between start and end. That curve defines the rate of change — whether motion accelerates, decelerates, or does both. By adjusting easing, the same `0.5s` tween can feel sharp, soft, or natural. Motion provides built-in presets like `linear`, `easeIn`, `easeOut`, and `easeInOut`, and you can also define custom `cubic-bezier` or `step` curves for precise control.",
  overview: [
    { label: "What", content: "The progress curve from start &#10142; end." },
    { label: "Default", content: "`easeInOut`" },
    {
      label: "Options",
      contentArray: [
        {
          label: "Sring",
          content:
            "`linear`, `easeIn`, `easeOut`, `easeInOut`, `circIn`, `circOut`, `circInOut`, `backIn`, `backOut`, `backInOut`, `anticipate`",
        },
        {
          label: "Cubic Bezier Array",
          content: "`[x1, y1, x2, y2]` (e.g. [0.33, 1, 0.68, 1])",
        },
        {
          label: "Function",
          content: "(t: number) ➩ number (advanced)",
        },
      ],
    },
    {
      label: "Effect",
      content:
        "Different easings give the same duration a different feel: `linear` = robotic, `easeOut` = natural deceleration, `backIn` = playful overshoot",
    },
    {
      label: "Note",
      content:
        "Easing only applies to time-based tweens and duration-based springs. Pure physics springs `(stiffness/damping)` ignore easing",
    },
  ],
};
const delayProperty: PropertyOverviewItem = {
  id: "delay",
  title: "Delay",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ duration: 1, delay: -0.3 }} // start 0.3s into the motion
/>`,
  description:
    "`delay` offsets when an animation begins. Positive values wait; negative values start part-way through the timeline. Pair with `duration`, `ease`, repeats, and keyframes to choreograph sequences",
  overview: [
    { label: "What", content: "Start offset in seconds" },
    { label: "Default", content: "`0` seconds" },
    { label: "Options", content: "Any number (e.g. `-0.3`,` 0.2`)." },
    {
      label: "Effect",

      contentArray: [
        { label: "Delay > 0 ", content: "Waits before starting the animation." },
        { label: "Delay < 0 ", content: "Starts part-way through the animation." },
      ],
    },
    {
      label: "Note",
      content:
        "If `abs(delay) ≥ duration `and no repeat, it ends instantly. With repeats, you start mid-cycle. For springs, negative delay doesn’t “pre-simulate” physics—prefer tweens/keyframes when you need seeking",
    },
  ],
};
const repeatProperty: PropertyOverviewItem = {
  id: "repeat",
  title: "Repeat",
  description:
    "`repeat` controls how many extra times an animation plays after its first run. Setting a number like `2` makes it run three times in total, while `Infinity` loops it forever. Combine it with `repeatType (loop, reverse, or mirror)` and `repeatDelay` to shape how each cycle behaves. Great for loaders, pulsing buttons, or any motion that needs to keep going without manual triggers.",
  snippet: `<motion.div
  animate={{ scale: 1.1 }}
  transition={{ type: "tween", duration: 0.8, repeat: Infinity }}
/>`,
  overview: [
    {
      label: "What",
      content: "Number of times to repeat the transition or Infinity for perpetual repetition.",
    },
    { label: "Default", content: "`0` (no repeat)" },
    { label: "Options", content: "Integer `≥ 0` or `Infinity`" },
    {
      label: "Effect",
      content: "Repeats the animation the specified number of times.",
    },
    {
      label: "Note",
      content:
        "`Repeat` counts exclude the first run. `Infinity` means forever. Will not stop unless you unmount or change the `animate` prop. Works only with tween/keyframes, not physics-based transitions (spring, inertia)",
    },
  ],
};
const repeatTypeProperty: PropertyOverviewItem = {
  id: "repeatType",
  title: "Repeat Type",
  snippet: `<motion.div
    animate={{ x: 100 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
  />`,
  description:
    "`repeatType` defines how an animation behaves when it repeats. By default it uses `'loop'`, which snaps back to the start each cycle. Use `'reverse'` to make the animation run backwards every other cycle (a ping-pong effect), or `'mirror'` to reverse while also mirroring the easing curve for smoother, more symmetrical motion. Best used with `repeat` or `Infinity` to create back-and-forth motions, bouncing effects, or looping loaders that feel polished.",
  overview: [
    {
      label: "What",
      content: "How repeats play.",
    },
    {
      label: "Default",
      content: "`'loop'`",
    },
    {
      label: "Options",
      contentArray: [
        { label: "`'loop'`", content: "Repeats the animation from the start." },
        { label: "`'reverse'`", content: "Alternates between forward and backwards playback." },
        {
          label: "`'mirror'`",
          content: "Switches animation origin and target on each iteration.",
        },
      ],
    },
    {
      label: "Effect",
      contentArray: [
        { label: "`'loop'`", content: "mechanical playback." },
        { label: "`'reverse'`", content: "ping-pong effect." },
        { label: "`'mirror'`", content: "smoother bidirectional feel." },
      ],
    },
    {
      label: "Note",
      content:
        "Only relevant if `repeat` is greater than 0. Combine with `repeatDelay` for pauses between cycles.",
    },
  ],
};
const repeatDelayProperty: PropertyOverviewItem = {
  id: "repeatDelay",
  title: "Repeat Delay",
  snippet: `<motion.div
  animate={{ rotate: 360 }}
  transition={{
    type: "tween",
    duration: 1.2,
    repeat: Infinity,
    repeatDelay: 0.4,
    ease: "linear",
  }}
/>`,
  description:
    "`repeatDelay` adds a pause between animation cycles. By default, animations repeat immediately after finishing. With `repeatDelay`, you can insert a gap in seconds before the next repeat begins",
  overview: [
    { label: "What", content: "Pause between repeats (seconds)" },
    { label: "Default", content: "`0` seconds (no pause)" },
    { label: "Options", content: "Any non-negative number (seconds)" },
    {
      label: "Effect",
      content: "Larger values creates bigger pauses between repeats.",
    },
    {
      label: "Note",
      content:
        "Doesn't affect the first playthrough, only repeats. Works only with tween/keyframes. Counts towards total time, If you set `duration: 1.2` and `repeatDelay: 0.4`, each cycle effectively lasts `1.6s`. No negative values. Spring don’t support it well.",
    },
  ],
};
const stiffnessProperty: PropertyOverviewItem = {
  id: "stiffness",
  title: "Stiffness",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 200 }}
/>`,
  description:
    "`stiffness` is the tension dial of a spring animation. It controls how strongly the spring pulls the animated value back toward its target. Higher stiffness makes motion snappier and quicker to settle, while lower stiffness creates looser, more relaxed movement. Think of it as the difference between a taut rubber band and a soft bungee cord.",
  overview: [
    { label: "What", content: "Strength of the spring’s pull toward the target" },
    { label: "Default", content: "`100`" },
    { label: "Options", content: " Any positive number (commonly `50–500`)" },
    {
      label: "Effect",
      contentArray: [
        { label: "Higher values", content: "Tighter, snappier motion, settles faster." },
        { label: "Lower values", content: "Looser, more relaxed motion, settles slower." },
      ],
    },
    {
      label: "Note",
      content:
        "Works only with physics-mode springs. If you’re using a duration-based spring, `stiffness` is ignored. Extremely high stiffness values can make motion jittery unless paired with enough damping",
    },
  ],
};
const dampingProperty: PropertyOverviewItem = {
  id: "damping",
  title: "Damping",
  description:
    "`damping` is the brake pedal of a spring animation. It controls how quickly the motion loses energy as it approaches the target. Higher damping means the spring settles smoothly with little or no bounce. Lower damping lets it overshoot, oscillate, and wobble before coming to rest. Think of it as the difference between a door that swings shut quietly versus one that rattles on its hinges",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", damping: 10 }}
/>`,
  overview: [
    {
      label: "What",
      content: "Controls how quickly the spring’s energy is absorbed (resistance to oscillation).",
    },
    { label: "Default", content: "`10`" },
    { label: "Options", content: "Any non-negative number (commonly 5–40)" },
    {
      label: "Effect",
      contentArray: [
        { label: "Lower values", content: "bouncier, more oscillation before settling" },
        { label: "Higher values", content: "smoother, less bounce, settles quickly." },
      ],
    },
    {
      label: "Note",
      content:
        "Extremely low damping can create endless wobble; extremely high damping can feel heavy or unresponsive unless balanced with `stiffness`.",
    },
  ],
};
const massProperty: PropertyOverviewItem = {
  id: "mass",
  title: "Mass",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", mass: 1 }}
/>`,
  description:
    "`mass` is the weight dial of a spring animation. It defines how heavy the animated object feels. A higher mass makes the spring move more slowly and overshoot with greater momentum, like a heavy pendulum swinging. A lower mass feels light and quick, snapping to the target with less inertia.",
  overview: [
    { label: "What", content: "The simulated weight of the object being animated" },
    { label: "Default", content: "`1`" },
    { label: "Options", content: "Any positive number (commonly `0.1–10`)" },
    {
      label: "Effect",
      contentArray: [
        { label: "Lower values", content: "light, quick, responsive motion" },
        { label: "Higher values", content: "heavier, slower, with more pronounced overshoot" },
      ],
    },
    {
      label: "Note",
      content:
        "Mass works in tandem with `stiffness` and `damping` in physics-based animations. A high mass without enough damping can feel sluggish or wobble excessively; low mass with high stiffness can feel twitchy.",
    },
  ],
};
const velocityProperty: PropertyOverviewItem = {
  id: "velocity",
  title: "Velocity",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 200, damping: 20, velocity: 5 }}
/>`,
  description:
    "`velocity` sets the spring’s starting speed. Instead of beginning at rest, the animation can launch with an initial push, like throwing an object toward its target. Positive values push in the same direction as the animation, while negative values push against it, creating a rebound effect before it settles.",
  overview: [
    { label: "What", content: "Initial speed (px/s) of the spring when the animation starts." },
    { label: "Default", content: "`0` (no extra push)" },
    { label: "Options", content: "Any number (positive or negative)" },
    {
      label: "Effect",
      contentArray: [
        { label: "Positive", content: "animation start faster, overshoots more" },
        { label: "Negative", content: "motion kicks backward before heading to the target" },
      ],
    },
    {
      label: "Note",
      content:
        "Works only with physics-based springs. It's especially useful when carrying over momentum from gestures (e.g. drag, flick)",
    },
  ],
};
const bounceProperty: PropertyOverviewItem = {
  id: "bounce",
  title: "Bounce",
  snippet: `<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
/>`,
  description:
    "`bounce` is the overshoot dial of a duration-based spring. Instead of simulating real physics with stiffness and damping, it adds a playful rebound at the end of an animation. A low bounce value means a subtle overshoot; higher values exaggerate the effect, making the motion feel elastic and lively.",
  overview: [
    {
      label: "What",
      content: "Controls overshoot amount in duration-mode springs.",
    },
    { label: "Default", content: "`0` (no overshoot)" },
    { label: "Options", content: "Any number between `0` and `1`" },
    {
      label: "Effect",
      contentArray: [
        { label: "Lower values", content: "little to no rebound, feels clean and direct." },
        { label: "Higher values", content: "more elastic, bouncy end motion." },
      ],
    },
    {
      label: "Note",
      content:
        "Only works in duration-based springs (`duration` set). Ignored in physics-based ( `stiffness`, `damping`,`mass`)",
    },
  ],
};
const timesProperty: PropertyOverviewItem = {
  id: "times",
  title: "Times",
  snippet: `<motion.div
  animate={{ x: [0, 150, 75, 150] }}
  transition={{
    duration: 2,
    ease: ["easeIn", "easeOut", "easeInOut"],
    times: [0, 0.4, 0.7, 1]
  }}
/>`,
  description:
    "`times` lets you choreograph when each keyframe happens along the animation’s timeline. Instead of evenly distributing keyframes, you provide an array of values between `0` and `1` that map each keyframe to a specific fraction of the total duration. This gives you precise control over pacing, pauses, and emphasis in multi-step animations.",
  overview: [
    {
      label: "What",
      content: "Array of normalised time fractions mapping keyframes to the animation's duration",
    },
    { label: "Default", content: "Even distribution across all keyframes" },
    {
      label: "Options",
      content: "Array of numbers between `0` and `1`, same length as the keyframe array",
    },
    {
      label: "Effect",
      content: "Uneven values let you hold longer on some frames and rush through others",
    },
    {
      label: "Note",
      content:
        "The first value should be `0` and the last `1`. If mismatched with keyframe length, Motion will throw an error or ignore extras",
    },
  ],
};
const visualDurationProperty: PropertyOverviewItem = {
  id: "visualDuration",
  title: "Visual Duration",
  snippet: `<motion.div
  animate={{ rotate: 90 }}
  transition={{
    type: "spring",
    visualDuration: 0.5,
    bounce: 0.25
  }}
/>`,
  description:
    "`visualDuration` sets the perceived finish line for a spring animation. Instead of waiting for the full physics to settle, Motion makes the element appear to reach its target by this time. Any overshoot or bounce happens afterward, but feels secondary. This makes it easier to coordinate springs with time-based animations like tweens or keyframes.",
  overview: [
    {
      label: "What",
      content: "How long (seconds) it should look like the spring has reached its target",
    },
    { label: "Default", content: "Not set. Springs settle according to physics" },
    { label: "Options", content: "Any positive number (seconds)" },
    {
      label: "Effect",
      contentArray: [
        { label: "", content: "Main motion completes by this time" },
        {
          label: "",
          content: "Bounce/overshoot gets pushed after the finsih.",
        },
        { label: "", content: "feel more predictable than raw physics timing" },
      ],
    },
    {
      label: "Interactions",
      contentArray: [
        { label: "With `duration`", content: "`visualDuration` takes priority" },
        {
          label: "With keyframes/tweens",
          content: "allows springs to sync neatly with fixed time animations",
        },
        {
          label: "With bounce",
          content: "can dial in playful overshoot without worrying it will delay percieved arrival",
        },
      ],
    },
    {
      label: "Note",
      contentArray: [
        {
          label: "",
          content:
            "Physics settings (high stiffness + low damping) can make post-duration bounce more noticeable than expected.",
        },
        {
          label: "",
          content:
            "If overused, all springs may start to feel “fake-timed” instead of naturally physical.",
        },
      ],
    },
  ],
};
const restSpeedProperty: PropertyOverviewItem = {
  id: "restSpeed",
  title: "Rest Speed",
  snippet: `<motion.div
  animate={{ rotate: 180 }}
  transition={{
    type: "spring",
    restSpeed: 0.5 // animation ends once rotation slows below 0.5°/s
  }}
/>`,
  description:
    "`restSpeed` defines the minimum velocity (in units per second) that a spring must fall below before it can be considered “at rest.” It’s basically the cutoff for motion: once the element is moving slower than this threshold and also within `restDelta` of the target, the animation stops. Think of it as: “Don’t waste cycles animating microscopic jitters — if it’s slower than this, call it done.” It’s a safeguard against endless microscopic wiggles.",
  overview: [
    {
      label: "What",
      content: "Speed threshold (units per second) under which the spring is allowed to stop",
    },
    {
      label: "Default",
      content: "`0.1`",
    },
    { label: "Options", content: "Any positive number" },
    {
      label: "Effect",
      contentArray: [
        { label: "Higher values", content: "the animation ends sooner (snappier, less precise)" },
        {
          label: "Lower values",
          content: "the animation runs longer, chasing tiny movements",
        },
      ],
    },
    {
      label: "Note",
      contentArray: [
        {
          label: "restDelta",
          content:
            "Works together with restDelta: both conditions must be satisfied for the spring to end",
        },
        {
          label: "Too high",
          content: "can feel like the spring “snaps off” before it truly settles.",
        },
        { label: "Too low", content: "can cause endless microscopic jitter." },
      ],
    },
  ],
};
const restDeltaProperty: PropertyOverviewItem = {
  id: "restDelta",
  title: "Rest Delta",
  snippet: `<motion.div
  animate={{ x: 200 }}
  transition={{
    type: "spring",
    restDelta: 0.5 // animation ends once x is within 0.5px of 200
  }}
/>`,
  description:
    "`restDelta` sets the distance threshold between the animated value and its target. If the element is within this distance and its velocity is below restSpeed, the spring is considered finished. Think of it as the “how close is close enough?” dial. Without it, a spring could spend forever chasing mathematical perfection.",
  overview: [
    {
      label: "What",
      content: "Minimum distance from the target required before a spring can stop.",
    },
    { label: "Default", content: "`0.01`" },
    { label: "Options", content: "Any positive number" },
    {
      label: "Effect",
      contentArray: [
        { label: "Higher values", content: "stops sooner, even if slightly off target" },
        {
          label: "Lower values",
          content: "continues longer to land with greater precision",
        },
      ],
    },
    {
      label: "Note",
      contentArray: [
        {
          label: "restSpeed",
          content: "Always paired with restSpeed: both must be satisfied for the spring to end",
        },
        {
          label: "Larger values",
          content: "can be useful for big movements where tiny sub-pixel accuracy doesn’t matter.",
        },
        { label: "Too low", content: "can waste CPU cycles on imperceptible settling" },
      ],
    },
  ],
};
/** Ordered list of all documented transition properties used to build the reference UI. */
export const transitionProps: PropertyOverviewItem[] = [
  durationProperty,
  easeProperty,
  delayProperty,
  repeatProperty,
  repeatTypeProperty,
  repeatDelayProperty,
  stiffnessProperty,
  dampingProperty,
  massProperty,
  velocityProperty,
  restSpeedProperty,
  visualDurationProperty,
  bounceProperty,
  timesProperty,
  restDeltaProperty,
];
