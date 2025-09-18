import { desc } from "motion/react-client";

export type WhenToUse = {
  title: string;
  description: string;
};

export type DangerSection = {
  title: string;
  items: string[];
};

export type PropertyItem = {
  property: string;
  description: string;
  link?: string;
};

export type EaseDef = {
  function: string;
  content: string;
};
type T_OVERVIEW = {
  title: string;
  link: string;
};

export const TRANSITION_OVERVIEW = [
  {
    title: "Transition Types",
    link: "#transition-types",
    description: "The main kinds of transitions Motion supports and how they differ.",
  },
  {
    title: "Tween Transitions",
    link: "#tween",
    description: "What tweens are, their core props, when to use them—and when not to.",
  },
  {
    title: "Spring Transitions",
    link: "#spring",
    description: "How springs work, their properties, and when physics feels better than timing.",
  },
  {
    title: "Transform Origin",
    link: "#transform-origin",
    description: "Control the pivot point for scale, rotate, and 3D effects.",
  },
  {
    title: "Per-Value Overrides",
    link: "#per-value-overrides",
    description: "Mix transition types per property for more natural, layered motion.",
  },
  {
    title: "Keyframes",
    link: "#keyframes",
    description: "Stage animations in multiple steps to add life and complexity.",
  },
  {
    title: "MotionConfig",
    link: "#motion-config",
    description: "Set global defaults and reduced-motion rules across a subtree.",
  },
] as const;

const EASE_SOUL_OF_TWEEN = [
  { function: "linear", content: "steady, constant speed. Robotic, great for loaders." },
  { function: "easeIn", content: "starts gently, then accelerates. Builds momentum." },
  {
    function: "easeOut",
    content: "fast at the start, slows into place. Perfect for UI polish.",
  },
  {
    function: "easeInOut",
    content: "slow → fast → slow. Balanced, the “default dance” of easing.",
  },
  {
    function: "circIn",
    content: "very gentle at the start, then accelerates like a marble rolling downhill.",
  },
  { function: "circOut", content: "launches quickly, then glides smoothly to a stop." },
  {
    function: "backIn",
    content: "pulls back slightly before moving forward. Like winding up.",
  },
  {
    function: "backOut",
    content: "overshoots its target, then settles back. Playful without going full spring.",
  },
  {
    function: "backInOut",
    content: "combines both: a little wind-up at the start, a playful overshoot at the end.",
  },
  {
    function: "anticipate",
    content:
      "winds up in the opposite direction before moving forward. Perfect for expressive, character-like motion.",
  },
  {
    function: "cubicBezier(x1, y1, x2, y2)",
    content: "define your own custom curve for complete control and unique motion signatures.",
  },
] as const satisfies EaseDef[];
const WHEN_TO_USE_TWEEN = [
  {
    title: "UI choreography",
    description: " modals, tooltips, menus - where predictability matters",
  },
  { title: "Sequences", description: " syncing multiple elements (e.g., a staggered fade-in)." },
  {
    title: "Stylistic polish",
    description: " when you want perfect timing (a progress bar that fills in exactly 2 seconds).",
  },
  { title: "Colors, opacity, shadows", description: " anything not naturally “springy.”" },
] as const satisfies WhenToUse[];

const TWEEN_DANGER = [
  {
    title: "Not physics-aware",
    items: [
      "Tweens are purely time-based. They don’t respond to velocity, drag, or momentum.",
      "If you animate something draggable with a tween, it will feel stiff and “dead” compared to a spring.",
    ],
  },
  {
    title: "Easing is everything",
    items: [
      "If you forget to set `ease`, the default `easeOut` kicks in.",
      "Some easings like `backIn` or `anticipate` overshoot, which might surprise you if you expected a clean stop.",
    ],
  },
  {
    title: "Linear feels robotic",
    items: [
      '`ease: "linear"` runs at constant speed. Perfect for loaders/spinners, but usually too mechanical for UI polish.',
    ],
  },
  {
    title: "Loops can look unnatural",
    items: [
      'With `repeat: Infinity`, tweens just jump back to the start of each cycle unless you add `repeatType: "mirror"` or `"reverse"`.',
    ],
  },
  {
    title: "Keyframes + easing arrays",
    items: [
      "When you use multiple keyframes, remember: if you pass an easing array, each easing only applies to the segment before the next keyframe.",
      "Forgetting this often makes animations look “wrong” because you think it applies globally.",
    ],
  },
] as const satisfies DangerSection[];
const TWEEN_PROPERTIES = [
  {
    property: "duration",
    link: "#duration",
    description: "How long the animation should take, in seconds.",
  },
  {
    property: "ease",
    link: "#ease",
    description: "Progress curve of the animation over time.",
  },
  {
    property: "delay",
    link: "#delay",
    description: "Delay before the animation starts, in seconds.",
  },
  {
    property: "repeat",
    link: "#repeat",
    description: "Number of times to repeat the animation.",
  },
  {
    property: "repeatType",
    link: "#repeatType",
    description: "How to repeat the animation.",
  },
  {
    property: "repeatDelay",
    link: "#repeatDelay",
    description: "Delay between each repetition, in seconds.",
  },
] as const satisfies PropertyItem[];

const SPRING_PROPERTIES = [
  {
    property: "stiffness",
    link: "#stiffness",
    description: "How hard the spring pulls toward target.",
  },
  {
    property: "damping",
    link: "#damping",
    description: "Resistance/friction of the spring.",
  },
  {
    property: "mass",
    link: "#mass",
    description: "Heaviness of the object.",
  },
  {
    property: "velocity",
    link: "#velocity",
    description: "Start speed, great for drag/gestures.",
  },
  {
    property: "duration",
    link: "#duration",
    description: "Overrides physics — fixed time instead.",
  },
  {
    property: "bounce",
    link: "#bounce",
    description: "Adds elastic overshoot (only in duration mode).",
  },
] as const satisfies PropertyItem[];
const WHEN_TO_USE_SPRING = [
  { title: "Natural UI feedback", description: "buttons, toggles, hover interactions." },
  {
    title: "Transform-heavy motion ",
    description: "scaling cards, moving panels, flipping items.",
  },
  { title: "Gestures", description: "drag-and-drop, swiping, inertia carry-through." },
  { title: "Layout transitions", description: "items reflowing smoothly instead of snapping." },
] as const satisfies WhenToUse[];
const SPRING_DANGER = [
  {
    title: "Duration is not default",
    items: [
      "By default, springs use physics (stiffness, damping, mass)",
      "If you set `duration`, Motion switches into duration mode — but then you lose the natural velocity-based feel. Easy to forget when tweaking.",
    ],
  },
  {
    title: "Overdamping vs underdamping",
    items: [
      "Too much `damping` = animation stops abruptly, no life.",
      "Too little = endless jitter or bounce that never quite settles.",
    ],
  },
  {
    title: "Bounce ≠ physics",
    items: [
      "The `bounce` prop only works in duration mode.",
      "If you’re using a physics spring, `bounce` is ignored (leading to confusion if you expect elastic overshoot).",
    ],
  },
  {
    title: "Velocity carries over",
    items: [
      "Springs pay attention to initial velocity — especially when chained with gestures like drag.",
      "That means sometimes your animation zooms off way faster than expected because of a leftover flick velocity.",
    ],
  },
  {
    title: "Infinite wiggle bug",
    items: [
      "If your stiffness/damping/mass combo doesn’t converge mathematically, the spring never really settles.",
      "The element just keeps wiggling at sub-pixel levels, which looks jittery on sharp UIs.",
    ],
  },
] as const satisfies DangerSection[];
const TRANSFORM_ORIGIN_PROPERTIES = [
  {
    property: "originX",
    description: "horizontal pivot (0 = left, 0.5 = center, 1 = right)",
  },
  {
    property: "originY",
    description: "vertical pivot (0 = top, 0.5 = center, 1 = bottom)",
  },
  {
    property: "originZ",
    description: "depth pivot in pixels, used for 3D rotations",
  },
  {
    property: "transformOrigin",
    description: `CSS string alternative ( "top left" , "25% 75%" )`,
  },
] as const satisfies PropertyItem[];
const WHEN_TRANSFORM_ORIGIN = [
  {
    title: "Pivoting elements",
    description: "grow from an edge or corner instead of the center",
  },
  { title: "Hinge effects", description: "fold menus down from the top, flip cards from a side" },
  {
    title: "3D illusions",
    description: "with perspective you can create book/page turns",
  },
  { title: "SVG pivots", description: "rotate shapes around custom anchors for icon animations" },
] as const satisfies WhenToUse[];
const TRANSFORM_ORIGIN_DANGER = [
  {
    title: "No movement on its own",
    items: ["Changing origin doesn’t move the element — it only changes how transforms apply.)"],
  },
  {
    title: "Translate ignores it",
    items: ["x and y translations don’t care about origin; only scale/rotate/skew do."],
  },
  {
    title: "3D needs perspective",
    items: [
      "Rotating in 3D without perspective looks flat. Add perspective on a parent for realism.",
    ],
  },
  {
    title: "Default is always center",
    items: ["If you don’t set it, it’s (0.5, 0.5). Easy to forget why your flip isn’t working!"],
  },
] as const satisfies DangerSection[];

const WHEN_PER_VALUE = [
  {
    title: "Staggered perception",
    description: "make motion feel fast (spring) while fades stay instant/linear",
  },
  {
    title: "Hierarchy of motion ",
    description: "large transforms = spring; micro-tweaks (opacity/filter) = quick tween.",
  },
  {
    title: "Keyframe choreography",
    description: "`times` + per-segment `ease` to shape arcs and pauses precisely.",
  },
] as const satisfies WhenToUse[];

const WHEN_KEYFRAMES = [
  {
    title: "Multi-step motions",
    description:
      "Where you want the object to go through several states: e.g. slide right → overshoot left → settle in middle → go right again.",
  },
  {
    title: "Looping animations ",
    description:
      "Repeating cycles where each cycle has distinct phases or “poses” (e.g. bouncing, pulse). Blogs often use keyframes for short repeating movements",
  },
  {
    title: "Nonlinear timing:",
    description:
      "You want certain parts of the movement to go faster/slower (e.g. accelerate at first, pause in middle, finish fast). Using the `times` array you can cluster keyframes early or late",
  },
  {
    title: "Expressiveness",
    description:
      "Animations like shakes, wobble, pulsing, elastic effects that need multiple checkpoints.",
  },
] as const satisfies WhenToUse[];
const KEYFRAME_DANGER = [
  {
    title: "Mismatch between value count and times count",
    items: [
      "If you supply `times`, its length needs to match (number of keyframes) appropriately (often the number of values minus 1 or exactly values count depending on API). If mismatched the behavior can be unexpected.",
    ],
  },
  {
    title: "Visual jump / snapping if values differ",
    items: [
      "If keyframes hop between very different numerical values, without easing or times carefully set, motion can feel janky.",
    ],
  },
  {
    title: "Over-using keyframes can hurt clarity",
    items: [
      "More keyframes = more complexity. If you use many, maintenance / tweaking becomes harder. Better reserve them for motions that need them.",
    ],
  },
  {
    title: "Performance considerations",
    items: [
      "Animations with many keyframes, or animated large elements, or expensive CSS properties (e.g. shadows, filters), can lead to performance drops.",
    ],
  },
  {
    title: "Interpolating non-numeric values",
    items: [
      "If your keyframe values are mixed types (e.g., numbers and strings or units), ensure consistency or Motion may fail or do strange interpolations.",
    ],
  },
] as const satisfies DangerSection[];

const MOTION_CONFIG_PROPERTIES = [
  {
    property: "transition",

    description: "fallback for all child motions (duration, easing, etc.",
  },
  {
    property: "reducedMotion",
    link: "#reducedMotion",
    description:
      "global policy for respecting or forcing reduced motion (“user” / “always” / “never”)",
  },
  {
    property: "nonce",
    link: "#nonce",
    description: "for CSP compliance if needed",
  },
] as const satisfies readonly PropertyItem[];

const WHEN_TO_USE_MOTION_CONFIG = [
  {
    title: "Consistent animation behavior",
    description:
      "Apply the same default durations and easing across your app so everything feels coherent.",
  },
  {
    title: "Accessibility from the start",
    description:
      "With reducedMotion='user', MotionConfig respects system preferences for reduced motion without extra checks.",
  },
  {
    title: "Simplified maintenance",
    description:
      "Cut down on repeated transition props; update defaults in one place instead of every component.",
  },
  {
    title: "Global policies",
    description:
      "Enforce minimal motion for performance or visual comfort across large component trees.",
  },
] as const satisfies readonly WhenToUse[];

const MOTION_CONFIG_DANGER = [
  {
    title: "Local overrides still win",
    items: [
      "Any transition set directly on a motion element overrides the global defaults.",
      "Easy to forget when debugging why one element doesn’t follow the shared config.",
    ],
  },
  {
    title: "Springs ignore global easing",
    items: [
      "By default, transforms like `x` or `scale` animate with springs.",
      "Global `ease` and `duration` won’t apply unless you switch them to tween or duration mode.",
    ],
  },
  {
    title: "One size doesn’t fit all",
    items: [
      "Global defaults help with consistency, but sometimes you’ll still need per-element tuning.",
      "Don’t overuse MotionConfig if different sections need very different feels.",
    ],
  },
  {
    title: "Accessibility isn’t automatic everywhere",
    items: [
      "`reducedMotion='user'` respects system preferences, but you still need to design graceful fallbacks.",
      "Animations that convey meaning (like error shakes) might need custom handling even with MotionConfig.",
    ],
  },
] as const satisfies readonly DangerSection[];

export type PropertiesWith = {
  function: string;
  content: string;
  advantage?: string;
  disadvantage?: string;
};
const MOTION_CONFIG_REDUCED_MOTION = [
  {
    function: "user",
    content:
      "Follows the user’s system setting `(prefers-reduced-motion)`. If they’ve said reduce, Motion disables transform/layout animations and keeps only safe ones (like opacity).",
    advantage: "Best default — builds accessibility in without extra work.",
  },
  {
    function: "always",
    content: "always applies reduced motion (disables all animations)",
    advantage:
      "Useful in environments where heavy motion is distracting (dashboards, performance-critical UIs, kiosk apps).",
    disadvantage: "Removes a lot of polish if your design relies on expressive motion.",
  },
  {
    function: "never",
    content: "Ignores user preference, always runs full animations.",
    advantage: "Handy for prototypes, marketing demos, or when you’re stress-testing animations.",
    disadvantage:
      "Not recommended for production: it overrides user accessibility choices, which can harm UX.",
  },
] as const satisfies PropertiesWith[];
export {
  EASE_SOUL_OF_TWEEN,
  WHEN_TO_USE_TWEEN,
  TWEEN_DANGER,
  TWEEN_PROPERTIES,
  SPRING_PROPERTIES,
  WHEN_TO_USE_SPRING,
  SPRING_DANGER,
  TRANSFORM_ORIGIN_PROPERTIES,
  WHEN_TRANSFORM_ORIGIN,
  TRANSFORM_ORIGIN_DANGER,
  WHEN_PER_VALUE,
  WHEN_KEYFRAMES,
  KEYFRAME_DANGER,
  MOTION_CONFIG_PROPERTIES,
  WHEN_TO_USE_MOTION_CONFIG,
  MOTION_CONFIG_DANGER,
  MOTION_CONFIG_REDUCED_MOTION,
};
