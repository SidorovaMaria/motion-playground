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
];
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
];

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
];

export { EASE_SOUL_OF_TWEEN, WHEN_TO_USE_TWEEN, TWEEN_DANGER };
