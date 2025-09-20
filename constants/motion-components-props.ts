export type ListContent = {
  label: string;
  content?: string;
  contentArray?: {
    label: string;
    content: string;
  }[];
}[];

export type MotionProp = {
  id: string;
  snippet: string;
  title: string;
  coreProps?: ListContent;
  whyMatters?: ListContent;
  tips_and_notes?: ListContent;
  when?: ListContent;
};
export const initialMProp: MotionProp = {
  id: "initial-overview",
  title: "initial",
  snippet: `<motion.div 
  initial={{ opacity: 0 }} 
  // Set the initial state before the animation starts
  initial={false} 
  // Skip the initial animation
  initial={'hidden'} 
  // Set the initial state to 'hidden' via variable
  //  defined in 'variants' prop -> later we'll cover them
/>`,
  coreProps: [
    {
      label: "Values",
      contentArray: [
        {
          label: "Animatable properties",
          content: "numbers, transforms, colors, opacity, shadows, etc.",
        },
        {
          label: "Variants",
          content: "you can pass a variant key string instead of raw values.",
        },
      ],
    },
    {
      label: "Special cases",
      contentArray: [
        {
          label: "`initial={false}`",
          content: "skips the initial state, starts directly at animate.",
        },
        {
          label: "`initial={true}`",
          content: "applies defined initial values on mount.",
        },
      ],
    },
  ],
  whyMatters: [
    {
      label: "Controlled entrances",
      content: "Slide/fade/scale elements into view smoothly.",
    },
    {
      label: "Consistency",
      content:
        "Ensures animations start from predictable values, not whatever the DOM happens to have.",
    },
    {
      label: "Replayability",
      content: "If `animate` is removed, Motion falls back to `initial` while still mounted.",
    },
    {
      label: "Lifecycle clarity",
      content:
        "It’s the “spawn point” of the motion lifecycle: `initial &#10142; animate &#10142; exit.`",
    },
  ],
  tips_and_notes: [
    {
      label: "Initial vs Animate",
      content: "`initial` sets the starting state; `animate` drives updates.",
    },
    {
      label: "Variants",
      content:
        "`initial` can also be set to a variant label (string) to pull in predefined states from a `variants` prop. Will explore that soon",
    },

    {
      label: "Pairs with Exit",
      content:
        "Together, `initial` and `exit` give you full enter/leave control. Later on we'll cover `exit`.",
    },
    {
      label: "CSS interplay",
      content: "If CSS sets a `style`, `initial` will override it when provided",
    },
    {
      label: "Accessibility",
      content: "Use with `useReducedMotion` to skip heavy entrances if users prefer less motion.",
    },
  ],
  when: [
    {
      label: "Page loads and entrances",
      content: " give content a natural arrival.",
    },
    {
      label: "Interactive UI",
      content: " modals, dropdowns, or buttons that should “pop” into view.",
    },
    {
      label: "Coordinated reveals",
      content: " staggered lists, cards, or hero animations.",
    },
    {
      label: "Resettable states",
      content: " acts as a baseline if animate is removed.",
    },
  ],
};

export const animateMProp: MotionProp = {
  id: "animate-overview",
  title: "animate",
  snippet: `<motion.div 
  animate={{ opacity: 1 }} 
  // Animate to an opacity of 1
  animate={{ x: 100 }} 
  // Animate to an x position of 100px
  animate={'visible'} 
  // Animate to the 'visible' variant defined in 'variants' prop -> later we'll cover them
/>`,
  coreProps: [
    {
      label: "Values",
      contentArray: [
        {
          label: "Animatable properties",
          content: "numbers, transforms, colors, opacity, shadows, etc.",
        },
        {
          label: "Timing",
          content:
            "runs whenever the `animate` prop changes. If a new object is passed, Motion animates smoothly from the current value to the new target",
        },
        {
          label: "Default behavior",
          content:
            "if `initial` is not provided, Motion uses the element’s current DOM values as the starting point. Not included properties in `animate` stay where they are (DOM defaults/CSS or initial)",
        },
      ],
    },
  ],
  whyMatters: [
    {
      label: "The main driver",
      content: "It’s the prop that actually makes things move.",
    },
    {
      label: "Interruptible and smooth",
      content:
        "mid-animation updates don’t snap back; they continue fluidly toward the new target..",
    },
    {
      label: "Choreography-ready",
      content:
        "With variants, you can coordinate multiple elements cleanly instead of juggling raw values",
    },
    {
      label: "Flexible targeting",
      content:
        "Works with single values, arrays (keyframes), or variant names for orchestrated motion.",
    },
  ],
  tips_and_notes: [
    {
      label: "Dynamic updates",
      content: "Any time the animate object changes, Motion interpolates to the new target",
    },
    {
      label: "Pairs with Initial",
      content:
        "Together, `initial` and `animate` define the full lifecycle of an element's motion.",
    },
    {
      label: "Variants",
      content:
        "`animate` can also be set to a variant label (string) to pull in predefined states from a `variants` prop. Will explore that soon",
    },
    {
      label: "Arrays for keyframes",
      content:
        "You can pass arrays of values to create simple keyframe animations (e.g., `animate={{ x: [0, 100, 50, 100] }}`)",
    },
    {
      label: "CSS interplay",
      content:
        "If CSS sets a `style`, `animate` will override it when provided. This ensures your animations take precedence.",
    },
    {
      label: "Performance",
      content:
        "Keep the animate object as simple as possible. Complex objects or frequent changes can impact performance.",
    },
  ],
  when: [
    {
      label: "State-driven UI",
      content: "(menus, modals, toggles).",
    },
    {
      label: "Responsive design",
      content: "Change animations when layout shifts.",
    },
    {
      label: "Interactive feedback",
      content: "buttons, cards, or other elements that respond to user input.",
    },
    {
      label: "Complex choreography",
      content: "When multiple elements need to move in a coordinated way.",
    },
  ],
};
export const exitMProp: MotionProp = {
  id: "exit-overview",
  title: "exit",
  snippet: `<AnimatePresence>
  {isVisible && (
    <motion.div 
      exit={{ opacity: 0 }} 
      // Animate to an opacity of 0 on unmount
      exit={{ x: 100 }} 
      // Animate to an x position of 100px on unmount
      exit={'hidden'} 
      // Animate to the 'hidden' variant defined in 'variants' prop -> later we'll cover them
    />
  )}
</AnimatePresence>`,
  coreProps: [
    {
      label: "Values",
      contentArray: [
        {
          label: "Animatable properties",
          content: "numbers, transforms, colors, opacity, shadows, etc.",
        },
        {
          label: "Variants",
          content: "you can pass a variant key string instead of raw values.",
        },
      ],
    },
    {
      label: "When it runs",
      content:
        "Runs when the component is removed from the React tree and wrapped in <AnimatePresence>. Without AnimatePresence, exit is ignored",
    },
    {
      label: "Default behavior",
      content: "If no exit is defined, the element disappears instantly when unmounted.",
    },
  ],
  whyMatters: [
    {
      label: "Smooth removals",
      content: "Instead of elements “popping off,” they animate out gracefully",
    },
    {
      label: "UI clarity",
      content: "Helps users track disappearing content (e.g., modals, toasts, dropdowns)",
    },
    {
      label: "Lifecycle symmetry",
      content: "Completes the trio: initial (enter) → animate (present) → exit (leave)",
    },
  ],
  tips_and_notes: [
    {
      label: "Needs `AnimatePresence`",
      content:
        "Exit animations won’t run unless the component is inside <AnimatePresence> in React tree.",
    },
    {
      label: "One-way only",
      content:
        "Exit only applies when leaving; you can’t “replay” it without unmounting/remounting.",
    },
    {
      label: "varinats",
      content: "Exit can also use variant names, allowing coordinated group exits",
    },
  ],
  when: [
    {
      label: "Modals/dialogs",
      content: "fade or slide them away for polish..",
    },
    {
      label: "Lists/tables",
      content: "animate rows/cards out when items are removed.",
    },
    {
      label: "Notifications/toasts/alerts",
      content: "Disappear smoothly instead of vanishing",
    },
    {
      label: "Complex UIs",
      content: "Build clear, staged lifecycle flows: elements enter, live, and exit with purpose.",
    },
  ],
};

export const variantsMProp: MotionProp = {
  id: "variants-overview",
  title: "variants",
  snippet: `const boxVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } },
  exit: { x: 50, opacity: 0 }
};

<motion.div
  variants={boxVariants} // Reuse the defined states
  // OR (inline) — not recommended, harder to reuse:
  // variants={{
  //   hidden: { x: -50, opacity: 0 },
  //   visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } },
  //   exit: { x: 50, opacity: 0 }
  // }}
  
  // Pick which state to apply
  initial="hidden"   // Start from 'hidden'
  animate="visible"  // Animate to 'visible'
  exit="exit"        // Animate out with 'exit'
/>
`,
  whyMatters: [
    {
      label: "Centralized control",
      content:
        "Instead of repeating initial, animate, and exit on each component, variants let you define named states once and reuse them.",
    },
    {
      label: "Consistency",
      content:
        "Multiple components can share the same hidden, visible, or exit states, ensuring they animate the same way",
    },
    {
      label: "Coordination",
      content:
        "Variants enable parent &#10142; child orchestration, so a parent can trigger all children to enter or exit together.",
    },
    {
      label: "Cleaner code",
      content:
        "Reduces prop clutter on motion components, making your codebase easier to read and maintain.",
    },
    {
      label: "Scalability",
      content:
        "As your animations grow (lists, modals, sections), variants keep code organized and easy to maintain",
    },
  ],
  when: [
    {
      label: "Reusable states",
      content:
        "When multiple components should share the same animation logic (e.g., list items that all fade in).",
    },
    {
      label: "Complex lifecycles",
      content:
        "When you want one object to handle `initial`, `animate`, and `exit` states together",
    },
    {
      label: "Orchestrated motion",
      content:
        "When a parent component should control the animation flow of its children with `staggerChildren` or `delayChildren` (later).",
    },
    {
      label: "Theming/modes",
      content:
        "When you need to toggle groups of animations together (e.g., light/dark mode transitions).",
    },
  ],
  tips_and_notes: [
    {
      label: "Variant names are strings",
      content:
        "The animate, initial, and exit props just take the name ('hidden', 'visible', etc.), not an object",
    },
    {
      label: "Per-property overrides",
      content:
        "You can still pass a direct object to animate or initial if you need to override part of the variants.",
    },
    {
      label: "Transitions live inside variants",
      content:
        "You can define transition inside each variant state, so different states can have different timings.",
    },
    {
      label: "AnimatePresence required",
      content: "Exit variants only work if the component is inside `<AnimatePresence>`",
    },
    {
      label: "Debugging",
      content: "If nothing animates, check for typos in variant names — they must match exactly.",
    },
  ],
};

export const onUpdateMProp: MotionProp = {
  id: "onUpdate-overview",
  title: "onUpdate",
  snippet: `<motion.div 
    animate={{ x: 100 }}
    onUpdate={(latest) => console.log(latest)}
/>
`,
  coreProps: [
    {
      label: "Values",
      content: "A callback function that receives the latest animation values on each frame.",
    },
    {
      label: "Scope",
      content:
        "Runs for all properties being animated on that component `(e.g., x, opacity, scale)`.",
    },
    {
      label: "Timing",
      content: "Fires continuously during an animation until it finishes",
    },
    {
      label: "Signature",
      content: "`(latest: { [key: string]: number }) => void`",
    },
  ],
  whyMatters: [
    {
      label: "Live feedback",
      content:
        "lets you keep UI elements (like text labels, progress counters, or charts) perfectly in sync with an animation",
    },
    {
      label: "Debugging tool",
      content: "Useful to log/inspect values when tuning transitions.",
    },
    {
      label: "Custom logics",
      content:
        "Lets you drive side effects based on animation progress (e.g., trigger sounds, change styles outside Motion, or sync with external libraries).",
    },
  ],
  when: [
    {
      label: "Dynamic UIs",
      content: "When you need to update the UI based on the current animation state.",
    },
    {
      label: "Complext choreography",
      content: "use animation progress to drive other elements or effects",
    },
    {
      label: "Accessibility feedback",
      content: "provide real-time updates for screen readers or other assistive technologies.",
    },
  ],
  tips_and_notes: [
    {
      label: "Performance considerations",
      content: "Be mindful of performance when using onUpdate, as it runs on every frame.",
    },
    {
      label: "Runs every frame",
      content: "Keep the callback lightweight. Heavy logic here can cause janky animations.",
    },
    {
      label: "Use for side effects only",
      content:
        "Don’t try to set React state every frame unless necessary; prefer refs or MotionValues to avoid extra renders",
    },
    {
      label: "Pairs well with MotionValues",
      content:
        "For smoother tracking, bind values with `useMotionValue` and `useTransform` instead of recalculating inside `onUpdate`",
    },
    {
      label: "Cleanup not needed",
      content: "Framer Motion automatically stops firing once the animation completes.",
    },
  ],
};
export const onAnimationStartMProp: MotionProp = {
  id: "onAnimationStart-overview",
  title: "onAnimationStart",
  snippet: `<motion.div 
  animate={{ x: 100, opacity: 1 }}
  onAnimationStart={(definition) => console.log("Animation started:", definition)}
/>
`,
  coreProps: [
    {
      label: "Values",
      content:
        "A callback function that fires the moment an animation begins for a property or variant.",
    },
    {
      label: "Scope",
      content:
        "Runs for all properties being animated on the component (e.g., `x`, `opacity`, `scale`) or when switching between variants.",
    },
    {
      label: "Timing",
      content: "Fires once at the very start of an animation, after any `delay` has finished.",
    },
    {
      label: "Signature",
      content: "`(definition: any) => void` — receives the target definition or variant key.",
    },
  ],
  whyMatters: [
    {
      label: "Precise hooks",
      content:
        "Lets you run logic exactly when an animation begins (e.g., play a sound, set a flag, start a timer).",
    },
    {
      label: "UI synchronization",
      content:
        "Perfect for flipping UI states like showing a loading spinner or disabling buttons during motion.",
    },
    {
      label: "Choreography",
      content: "Helps coordinate side effects or parallel animations right as Motion kicks off.",
    },
  ],
  when: [
    {
      label: "Orchestration",
      content:
        "When you need to trigger external effects (sounds, data fetches, timers) at the exact start of an animation.",
    },
    {
      label: "User feedback",
      content: "Announce animation start with ARIA live messages or visual cues for accessibility.",
    },
    {
      label: "Debugging",
      content: "Check logs to see which variant or definition is launching.",
    },
  ],
  tips_and_notes: [
    {
      label: "Multiple fires",
      content:
        "If multiple properties animate, this can fire for each one. Keep your handler idempotent.",
    },
    {
      label: "Delayed animations",
      content: "With `delay`, the callback fires only after the delay period ends.",
    },
    {
      label: "Keep it light",
      content:
        "Do minimal work in the handler to avoid blocking the animation loop. Heavy logic should be deferred.",
    },
    {
      label: "Pair with onAnimationComplete",
      content:
        "Use `onAnimationStart` to lock or cue UI, and `onAnimationComplete` to unlock or finalize.",
    },
    {
      label: "Reduced motion",
      content:
        "Even with `duration: 0` for reduced motion, this still fires — treat it as a state-change cue, not purely visual.",
    },
  ],
};

export const onAnimationCompleteMProp: MotionProp = {
  id: "onAnimationComplete-overview",
  title: "onAnimationComplete",
  snippet: `<motion.div 
  animate={{ x: 100 }}
  onAnimationComplete={() => console.log("Animation finished!")}
/>
`,
  coreProps: [
    {
      label: "Values",
      content: "A callback function that fires when an animation finishes on the component.",
    },
    {
      label: "Scope",
      content:
        "Runs for all animated properties on that component `(e.g., x, opacity, scale)` once they’ve reached their final values.",
    },
    {
      label: "Timing",
      content:
        "Fires exactly once at the end of an animation cycle. If multiple properties animate together, it runs when all are complete.",
    },
    {
      label: "Signature",
      content: "`() => void` — no arguments are passed in by default.",
    },
  ],
  whyMatters: [
    {
      label: "Chaining animations",
      content: "Lets you start a new animation or sequence only after a previous one has finished.",
    },
    {
      label: "Cleanup logic",
      content: "Useful for hiding loaders, stopping timers, or cleaning up temporary UI state.",
    },
    {
      label: "User feedback",
      content:
        "Helps you trigger confirmations (e.g., ✅ checkmark) only when the animation has fully completed.",
    },
  ],
  when: [
    {
      label: "Sequential motion",
      content:
        "When you want animations to happen in order — e.g., a fade-in followed by a scale-up.",
    },
    {
      label: "UI lock/unlock",
      content:
        "When you need to block user actions until an animation has fully resolved, then re-enable them.",
    },
    {
      label: "Final state syncing",
      content:
        "When you want to update app state or trigger side effects only after the element visually settles.",
    },
  ],
  tips_and_notes: [
    {
      label: "Runs once per animation",
      content:
        "If animate changes again, onAnimationComplete will re-fire after that new animation ends.",
    },
    {
      label: "No parameters",
      content:
        "Unlike `onUpdate`, this callback doesn’t receive values — it just signals that the animation is done.",
    },
    {
      label: "Group animations",
      content:
        "If multiple properties animate, the callback waits until *all* have completed before firing.",
    },
    {
      label: "Performance safe",
      content:
        "Since it runs only once per animation cycle, you can safely trigger state updates here without worrying about extra renders.",
    },
    {
      label: "Pairs with onAnimationStart",
      content:
        "Together they form lifecycle bookends — use them to bracket setup and teardown logic around an animation.",
    },
  ],
};

export const whileHoverMProp: MotionProp = {
  id: "whileHover-overview",
  title: "whileHover",
  snippet: `<motion.div 
  whileHover={{ scale: 1.1, rotate: 10 }}
>
  Hover me
</motion.div>`,
  coreProps: [
    {
      label: "Values",
      contentArray: [
        {
          label: "Animatable properties",
          content: "numbers, transforms, colors, opacity, shadows, etc.",
        },
        {
          label: "Variants",
          content: "you can pass a variant key string instead of raw values.",
        },
      ],
    },
    {
      label: "Scope",
      content:
        "Applies only while the pointer is over the element. Once hover ends, Motion animates back to the previous state.",
    },
    {
      label: "Timing",
      content: "Triggers immediately on hover-in and reverts smoothly on hover-out.",
    },
    {
      label: "Signature",
      content: "`whileHover={{ ...properties }}`",
    },
  ],
  whyMatters: [
    {
      label: "Interactive feedback",
      content: "Reinforces that an element is clickable or interactive, guiding the user.",
    },
    {
      label: "Micro-interactions",
      content: "Turns static UI into tactile, responsive components.",
    },
    {
      label: "Accessibility",
      content: "Pairs well with `whileFocus` for keyboard users, ensuring consistent feedback.",
    },
  ],
  when: [
    {
      label: "Buttons & links",
      content: "Make them feel more clickable with subtle scaling or color shifts.",
    },
    {
      label: "Cards or tiles",
      content: "Highlight hovered content for discoverability.",
    },
    {
      label: "Icons",
      content: "Add playful motion (like bounce or rotate) when hovered.",
    },
  ],
  tips_and_notes: [
    {
      label: "Keep it subtle",
      content: "Overly large hover animations can feel distracting — small changes go a long way.",
    },
    {
      label: "Accessible pairing",
      content: "Always mirror hover effects with `whileFocus` so keyboard users aren’t left out.",
    },
    {
      label: "Reverts automatically",
      content:
        "You don’t need to define an explicit 'rest' state — Motion animates back once hover ends.",
    },
  ],
};
export const onHoverMProp: MotionProp = {
  id: "onHover-overview",
  title: "onHoverStart / onHoverEnd",
  snippet: `<motion.div
  whileHover={{ scale: 1.1, rotate: 10 }}
  onHoverStart={() => console.log("Hover began")}
  onHoverEnd={() => console.log("Hover ended")}
/>`,
  coreProps: [
    {
      label: "Trigger",
      content:
        "`onHoverStart` Callback function that fires when a pointer starts hovering over the component.",
    },
    {
      label: "Release",
      content:
        "`onHoverEnd` Callback function that fires when a pointer stops hovering over the component.",
    },
    {
      label: "Signature",
      content: "`(event: MouseEvent, info: EventInfo) => void`",
    },
    {
      label: "Scope",
      content:
        "Only triggers when the element is interactable (not disabled, pointer-events enabled).",
    },
  ],
  whyMatters: [
    {
      label: "Extra logic on hover",
      content:
        "Lets you trigger side effects (analytics, sounds, tooltips) right as hover begins/ends.",
    },
    {
      label: "Separation of concerns",
      content:
        "`whileHover` handles the visual animation, while callbacks handle logic — keeping clean separation.",
    },
    {
      label: "Fine-grained control",
      content:
        "You can delay, count, or react differently on hover start vs. hover end, beyond what `whileHover` alone provides.",
    },
  ],
  when: [
    {
      label: "Interactive UI",
      content:
        "When you want hover to affect more than just styling — e.g., counters, analytics, sidebars.",
    },
    {
      label: "Tooltips & helpers",
      content: "Show/hide tooltips, previews, or context menus exactly on hover start/end.",
    },
    {
      label: "Game-like feedback",
      content: "For hover-driven experiences (e.g., charging a bar while hovering).",
    },
  ],
  tips_and_notes: [
    {
      label: "Don’t overuse",
      content:
        "Not every hover needs callbacks; use them for logic, not simple styling (leave visuals to `whileHover`).",
    },
    {
      label: "Combine smartly",
      content:
        "Pair with `whileHover` to keep visuals separate from logic. This makes your code easier to maintain.",
    },
    {
      label: "Clean up side effects",
      content:
        "If you start timers/intervals in `onHoverStart`, always clear them in `onHoverEnd` to avoid leaks.",
    },
    {
      label: "Event info",
      content:
        "The second argument gives useful pointer info (like position/velocity) if you need advanced interactions.",
    },
    {
      label: "Accessibility",
      content:
        "Hover doesn’t exist for keyboard/touch users; make sure critical logic isn’t hover-only.",
    },
  ],
};
export const whileTapMProp: MotionProp = {
  id: "whileTap-overview",
  title: "whileTap",
  snippet: `<motion.button
  whileTap={{ scale: 0.96, opacity: 0.95, y: 1 }}
>
  Press me
</motion.button>`,
  coreProps: [
    {
      label: "Values",
      contentArray: [
        {
          label: "Animatable properties",
          content: "numbers, transforms, colors, opacity, shadows, etc.",
        },
        {
          label: "Variants",
          content: "you can pass a variant key string instead of raw values.",
        },
      ],
    },
    {
      label: "Scope",
      content:
        "Affects just this component’s animated style during the press. Reverts instantly on release/cancel.",
    },
    {
      label: "Timing",
      content:
        "Activates on pointer/touch down; deactivates on up/cancel. Motion handles the enter/exit transition.",
    },
    {
      label: "Works with",
      content:
        "`onTapStart`, `onTap`, `onTapCancel` for logic; `transition` to fine-tune feel (e.g., shorter duration).",
    },
  ],
  whyMatters: [
    {
      label: "Tactile feedback",
      content: "Communicates ‘press’ state clearly on both desktop and touch devices.",
    },
    {
      label: "Polished UX",
      content: "Press states that spring in and out feel more responsive than static CSS :active.",
    },
    {
      label: "Separation of concerns",
      content: "Keep visuals in `whileTap`, keep actions in `onTap` (or native button behaviors).",
    },
  ],
  when: [
    {
      label: "Buttons & CTAs",
      content: "Provide a pressed feel (slight scale down, darker tint).",
    },
    {
      label: "Cards & list items",
      content: "Make tap targets feel alive without committing navigation yet.",
    },
    {
      label: "Mobile-first UIs",
      content: "Gives immediate visual confirmation of touch interaction.",
    },
  ],
  tips_and_notes: [
    {
      label: "Prefer transform properties",
      content: "Use `scale`, `y`, or `brightness()` for smooth, GPU-friendly feedback.",
    },
    {
      label: "Mind accessibility",
      content:
        "Use semantic elements (`<button>`, `<a>`) so keyboard users still get native focus/activation. `whileTap` doesn’t run for keyboard by itself.",
    },
    {
      label: "Keep it subtle",
      content:
        "Tiny scale (0.96–0.98) or 1–2px `y` shift usually feels best; big changes can look jittery.",
    },
    {
      label: "Coordinate with haptics",
      content:
        "If you use haptics/analytics, trigger them in `onTapStart`/`onTap`, not in `whileTap`.",
    },
    {
      label: "Avoid double handlers",
      content:
        "If you also handle `onClick`, ensure you don’t fire actions twice. Prefer `onTap` as the single activation source.",
    },
  ],
};
export const onTapMProp: MotionProp = {
  id: "onTap-overview",
  title: "onTap / onTapStart / onTapCancel",
  snippet: `<motion.button
  whileTap={{ scale: 0.96, opacity: 0.95, y: 1 }}
  onTap={() => console.log("Button tapped")}
  onTapStart={() => console.log("Tap started")}
  onTapCancel={() => console.log("Tap cancelled")}
/>`,
  coreProps: [
    {
      label: "Triggers",
      content:
        "`onTap` Callback function that fires when a tap/click is completed (pointer down + up within the element).",
    },
    {
      label: "Start",
      content:
        "`onTapStart` Callback function that fires immediately when a pointer goes down on the element.",
    },
    {
      label: "Cancel",
      content:
        "`onTapCancel` Callback function that fires if the pointer goes down but then moves away or is released outside the element.",
    },
    {
      label: "Signature",
      content: "`(event: MouseEvent | TouchEvent, info: EventInfo) => void`",
    },
    {
      label: "Scope",
      content:
        "Only triggers when the element is interactable (not disabled, pointer-events enabled).",
    },
  ],
  whyMatters: [
    {
      label: "Custom actions",
      content:
        "Lets you define exactly what happens on tap without relying solely on native click behavior.",
    },
    {
      label: "Fine-grained control",
      content:
        "Separate logic for tap start, completion, and cancellation allows nuanced interactions (e.g., loading states, analytics).",
    },
    {
      label: "Separation of concerns",
      content:
        "Keep visual feedback in `whileTap`, and action logic in these callbacks for cleaner code.",
    },
  ],
  when: [
    {
      label: "Buttons & interactive elements",
      content:
        "When you need to handle taps/clicks with custom logic (e.g., forms, modals, navigation).",
    },
    {
      label: "Game-like interactions",
      content:
        "When tap start vs. completion should trigger different effects (e.g., charging, aiming).",
    },
    {
      label: "Analytics & tracking",
      content:
        "Log user interactions precisely, distinguishing between starts, completions, and cancellations.",
    },
  ],
  tips_and_notes: [
    {
      label: "Use semantic elements",
      content:
        "Prefer `<button>`, `<a>`, or other native interactive elements to ensure keyboard accessibility. `onTap` doesn’t handle keyboard by itself.",
    },
    {
      label: "Avoid double handlers",
      content:
        "If you also handle `onClick`, ensure you don’t fire actions twice. Prefer `onTap` as the single activation source.",
    },
    {
      label: "Event info",
      content:
        "The second argument provides useful pointer info (like position/velocity) if you need advanced interactions.",
    },
    {
      label: "Coordinate with whileTap",
      content:
        "Use `whileTap` for visual feedback, and these callbacks for logic — keeping a clean separation of concerns.",
    },
    {
      label: "Cleanup in onTapCancel",
      content:
        "If you start timers/intervals in `onTapStart`, always clear them in `onTapCancel` to avoid leaks.",
    },
  ],
};
