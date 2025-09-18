import PropsListItem from "@/components/cards_tags/PropsListItem";
import CodeAndExample from "@/components/codeExamples/CodeAndExample";
import CodeHighliter from "@/components/codeExamples/CodeHighliter";
import MotionExample from "@/components/codeExamples/MotionExample";
import { Links } from "@/utils/links";
import { ArrowUpRightFromSquare } from "lucide-react";
import React from "react";

const MotionTransitionPage = () => {
  return (
    <main className="relative max-w-7xl mx-auto px-10 py-12">
      <header className="font-display max-w-4xl mx-auto space-y-2 ">
        <h1 className="main-heading">Deep Dive into Motion Transition</h1>
        <p className="subheading">
          Lets explore the transition prop together with practical examples and copy-paste snippets.
        </p>
      </header>

      <section aria-label="Animation Overview" className="mt-3 max-w-4xl mx-auto">
        <p className="paragraph text-left max-w-3xl ">
          If you’ve tried the playground, you’ve already felt how spring physics and tween easing
          shape motion. This section goes deeper with a practical tour of Motion transitions—clear
          explanations, small demos, and copy–paste snippets. We’ll cover what’s available, explain
          each transition prop, when to use it, and how to tune the feel in real components, plus
          quick exercises with repeats and keyframes to build confident, polished motion.
        </p>
        <div className="text-left space-y-2 mt-6 text-foreground">
          <p className="font-display text-sm ">
            Overview of what you&apos;ll learn in this section:
          </p>
          <ul className="list-disc list-inside space-y-1 text-base text-foreground/80 font-bold">
            <li>
              Transition types — what is <code className="code">spring</code> /{" "}
              <code className="code">tween</code>
              <span className="opacity-75 text-xs">
                ( Inertia exists too; we’ll hit it when we learn drag.)
              </span>
            </li>
            <li>Changing transform Origin</li>
            <li>Per-value overrides - Mix feels per property</li>
            <li>
              Keyframes basics -Multi-step motion with arrays (and optional{" "}
              <code className="code">times</code>) for staged changes.
            </li>

            <li>
              Project defaults with <code className="code">MotionConfig</code> - Set app-wide
              transition defaults (and respect user preferences like reduced motion) in one place.
            </li>
          </ul>
        </div>
      </section>
      {/* Transition Types*/}
      <section aria-label="Transition Types" className="mt-12 max-w-4xl mx-auto">
        <h2 className="heading ">Transition Types</h2>
        <div className="code-block">
          <CodeHighliter>
            {`<motion.div ... transiton={{type:'spring / tween / inertia / " "'}}/> // Default: dynamic (based on values being animated)`}
          </CodeHighliter>
        </div>
        <p className="paragraph">
          Motion gives us three main flavors of animation: <code className="code">tween</code>,
          <code className="code">spring</code>, and <code className="code">inertia</code>.
          <code className="code">tween</code> is all about timing—you pick a duration and easing
          curve (built-in or custom). <code className="code">spring</code> is driven by physics,
          where stiffness, damping, and mass create that natural “springy” feel. Springs can also be
          configured by
          <em>duration</em> instead of raw physics, and you can dial in extra character with the{" "}
          <code className="code">bounce</code> option (we’ll play with that in this section). Later
          on, when we get into drag and gestures, we’ll meet <code className="code">inertia</code>,
          which are more suitable for it.
        </p>
      </section>
      {/* Tween Transition */}
      <section
        id="tween"
        aria-label="Tween Transition"
        className="mt-12 max-w-4xl mx-auto bg-background-muted p-6 border-l-4 border-accent/70 rounded-lg rounded-l-none"
      >
        <h2 className="heading ">Tween</h2>
        <div className="code-block">
          <CodeHighliter>{`<motion.div ... transition={{type:'tween'}}/>`}</CodeHighliter>
        </div>
        {/* What is a tween? */}
        <article
          role="article"
          aria-labelledby="what-is-a-tween"
          className="mt-2 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="what-is-a-tween" className="heading text-lg mb-4">
            What a “tween” actually is
          </h3>
          <div className="[&>p]:text-base!">
            <p className="paragraph">
              <span className="font-bold">&quot;Tween&quot;</span> is short for{" "}
              <span className="italic font-bold">in-betweening</span> — the old animation term for
              drawing the frames between two key poses. In Motion, a tewen transitoin simply says:{" "}
              <em>
                I&lsquo;ll handle the frames between start and finish over a set time with a chosen
                easing function.
              </em>
            </p>
            <p className="paragraph mt-2">No physics here, just math: =)</p>
            <ul className="list-disc space-y-2 list-inside my-4 font-display text-foreground/80 text-sm">
              <li>Start value &#8658; End Value</li>
              <li>Duration (how long it takes)</li>
              <li>
                Easing (the curve of progress: linear, ease-in, ease-out, custom cubic-bezier, etc.)
              </li>
            </ul>
            <p className="paragraph ">
              The library interpolates every frame until the value arrives at the target.
            </p>
          </div>
        </article>
        {/* Core properties of a tween */}
        <article
          role="article"
          aria-labelledby="tween-core-props"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="tween-core-props" className="heading text-lg mb-2">
            Core properties of a tween
          </h3>
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-3 ">
            <CodeHighliter>
              {`<motion.div
  animate={{ y: -80, x: 80 }}
  transition={{
    type: "tween",
    duration: 1,       // seconds
    delay: 0.2,          // start later
    ease: "easeInOut",   // built-in
    repeat: 2,           // run 2 extra times
    repeatType: "mirror" // mirror = forward, backward, forward…
    repeatDelay: 0.5,    // wait before next cycle
  }}
/>`}
            </CodeHighliter>
            <MotionExample
              className="w-full  h-fit"
              initial={{ y: 0, x: 0 }}
              animate={{ y: -80, x: 80 }}
              transition={{
                type: "tween",
                duration: 1, // seconds
                delay: 0.2, // start later
                ease: "easeInOut", // built-in
                repeat: 2, // run 2 extra times
                repeatType: "mirror", // mirror = forward, backward, forward…
                repeatDelay: 0.5, // wait before next cycle
              }}
            />
            <ul className="list-disc space-y-2 list-inside my-4 py-2 w-full text-left">
              <PropsListItem
                href={`${Links.animation.transitionProperties}#duration`}
                title="duration"
                description="Seconds to run."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#ease`}
                title="ease"
                description="Progress curve."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#delay`}
                title="delay"
                description="Wait before start."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#repeat`}
                title="repeat"
                description="Times to repeat."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#repeatType`}
                title="repeatType"
                description="Loop style."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#repeatDelay`}
                title="repeatDelay"
                description="Pause before the next cycle"
              />
            </ul>
          </div>
        </article>
        {/* Easing Curves */}
        <article
          role="article"
          aria-labelledby="easing-curves"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="easing-curves" className="heading text-lg mb-2">
            Easing curves (the soul of tween)
          </h3>
          <p className="paragraph">
            Easing defines how you get from A to B. It shapes the progress of a tween over time,
            creating different feels. Motion has a few built-in easings, but you can also define
            custom curves with cubic-bezier or steps functions.
          </p>
          <div className="code-block">
            <CodeHighliter>{`<motion.div ... transition={{type:'tween',ease:'easeInOut/easeIn/backOut/...'}}/>`}</CodeHighliter>
          </div>

          <ul
            className="grid grid-cols-3 gap-x-8  space-y-2 list-inside py-2 w-full [&>li>span]:text-sm text-center
         paragraph leading-normal [&>li]:border-b [&>li]:border-foreground/10 [&>li]:pb-2"
          >
            <li>
              <code className="code">{"'linear'"}</code> – steady, constant speed. Robotic, great
              for loaders.
            </li>
            <li>
              <code className="code">{"'easeIn'"}</code>– starts gently, then accelerates. Builds
              momentum.
            </li>
            <li>
              <code className="code">{"'easeOut'"}</code> – fast at the start, slows into place.
              Perfect for UI polish.
            </li>
            <li>
              <code className="code">{"'easeInOut'"}</code> – slow → fast → slow. Balanced, the
              “default dance” of easing.
            </li>
            <li>
              <code className="code">{"'circIn'"}</code> - very gentle at the start, then
              accelerates like a marble rolling downhill.
            </li>
            <li>
              <code className="code">{"'circOut'"}</code> – launches quickly, then glides smoothly
              to a stop.
            </li>
            <li>
              <code className="code">{"'backIn'"}</code> – pulls back slightly before moving
              forward. Like winding up.
            </li>
            <li>
              <code className="code">{"'backOut'"}</code> – overshoots its target, then settles
              back. Playful without going full spring.
            </li>
            <li>
              <code className="code">{"'backInOut'"}</code> – combines both: a little wind-up at the
              start, a playful overshoot at the end.
            </li>
            <li>
              <code className="code">{"'anticipate'"}</code> – winds up in the opposite direction
              before moving forward. Perfect for expressive, character-like motion.
            </li>
            <li>
              <code className="code">{"cubicBezier(x1, y1, x2, y2)"}</code> – define your own custom
              curve for complete control and unique motion signatures.
            </li>
            <li className="flex items-center justify-center text-foreground font-display text-sm">
              If not yet explored them all, check out the playground
              {/* TODO Playground link */}
            </li>
          </ul>
        </article>
        {/* When to use a tween */}
        <article
          role="article"
          aria-labelledby="When-tween"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-tween" className="heading text-lg mb-2">
            When to reach for a tween
          </h3>
          <ul
            className="list-disc space-y-2 list-inside  py-2 w-full 
          [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            <li>
              <span>UI choreography</span> - modals, tooltips, menus - where predictability matters
            </li>
            <li>
              <span>Sequences </span> - syncing multiple elements (e.g., a staggered fade-in).
            </li>
            <li>
              <span>Stylistic polish</span> - when you want perfect timing (a progress bar that
              fills in exactly 2 seconds).
            </li>
            <li>
              <span>Colors, opacity, shadows</span> - anything not naturally “springy.”
            </li>
          </ul>
        </article>
        {/* Tween Look Out For */}
        <article
          role="article"
          aria-labelledby="When-tween"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-tween" className="heading from-red-500 text-lg mb-2">
            What to look out for with tweens
          </h3>
          <ul className="danger-list  ">
            <li>
              <span>Not physics-aware</span>
              <ul>
                <li>
                  Tweens are purely time-based. They don’t respond to velocity, drag, or momentum.
                </li>
                <li>
                  If you animate something draggable with a tween, it will feel stiff and “dead”
                  compared to a spring.
                </li>
              </ul>
            </li>
            <li>
              <span>Easing is everything</span>
              <ul>
                <li>
                  If you forget to set <code className="code">ease</code>, the default{" "}
                  <code className="code">(easeOut)</code>
                  kicks in.
                </li>
                <li>
                  Some easings like <code className="code">backIn</code> or{" "}
                  <code className="code">anticipate</code>overshoot, which might surprise you if you
                  expected a clean stop.
                </li>
              </ul>
            </li>
            <li>
              <span>Linear feels robotic</span>
              <ul>
                <li>
                  ease:<code className="code">{` "linear"`}</code> runs at constant speed. Perfect
                  for loaders/spinners, but usually too mechanical for UI polish.
                </li>
              </ul>
            </li>
            <li>
              <span>Loops can look unnatural</span>
              <ul>
                <li>
                  With <code className="code"> repeat: Infinity</code>, tweens just jump back to the
                  start of each cycle unless you add{" "}
                  <code className="code">{`repeatType: "mirror" or "reverse"`}.</code>
                </li>
              </ul>
            </li>
            <li>
              <span>Keyframes + easing arrays</span>
              <ul>
                <li>
                  When you use multiple keyframes, remember: if you pass an easing array, each
                  easing only applies to the segment before the next keyframe.
                </li>
                <li>
                  Forgetting this often makes animations look “wrong” because you think it applies
                  globally.
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </section>
      {/* Spring Transition */}
      <section
        id="spring"
        aria-label="Spring Transition"
        className="mt-12 max-w-4xl mx-auto bg-background-muted p-6 border-l-4 border-accent/70 rounded-lg rounded-l-none"
      >
        <h2 className="heading ">Spring</h2>
        <div className="code-block">
          <CodeHighliter>{`<motion.div ... transition={{type:'spring'}}/>`}</CodeHighliter>
        </div>
        {/* Spring Overview */}
        <article
          role="article"
          aria-labelledby="spring-physics"
          className="mt-2 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="what-is-a-spring" className="heading text-lg mb-4">
            What spring are we talking about?
          </h3>

          <div className="[&>p]:text-base!">
            <p className="paragraph">
              A <code className="code text-xs">{`"spring"`}</code> in Motion is all about physics
              over math. Instead of just tweening linearly over time, it behaves like a real spring
              system: it gets pulled toward the target, overshoots, and then settles. Josh Comeau
              explain it with a great example on his{" "}
              <a
                target="_blank"
                href="https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/"
                className=" font-bold text-secondary hover:underline"
              >
                blog. <ArrowUpRightFromSquare className="inline small-icon text-secondary" />
              </a>{" "}
              <br />
              That’s why transform properties{" "}
              <code className="code p-0 text-xs">(x, y, scale, rotate)</code> use spring by default
              — it makes UIs feel natural, not robotic.
            </p>
            <hr className="my-3 border-foreground/50" />
            <p>In Motion, a spring can run in two modes:</p>
            <ul className="[&>li>code]:text-xs [&>li>code]:code list-disc space-y-1 list-inside my-2 text-foreground/80 ">
              <li>
                <span>Physics Mode (default) </span> &#10142; shaped by{" "}
                <code>stiffness, damping </code> and <code>mass</code>
              </li>
              <li>
                <span>Duration Mode </span> &#10142; shaped by <code>duration</code> and optionally
                <code>bounce</code> skipping raw physics math.
              </li>
            </ul>
            <p className="paragraph">
              Both modes create springy, natural motion. Duration mode is often easier to reason
              about, while physics mode can create more complex interactions (like heavy objects
              feeling weighty). We’ll explore both in this section.
            </p>
          </div>
        </article>
        {/* Core properties of a spring */}
        <article
          role="article"
          aria-labelledby="spring-core-props"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="spring-core-props" className="heading text-lg mb-2">
            Core properties of a spring
          </h3>
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-[2fr_1fr_2fr] ">
            <CodeHighliter>
              {`<motion.div
  animate={{ y: 80 }}
  transition={{
    type: "spring",
    stiffness: 150,  // pull strength
    damping: 20,     // friction
    mass: 1,         // weight
    velocity: 2,     // carry motion from gestures (not used for example below)
    duration: 0.8,   // switch to duration mode (not used for example below)
    bounce: 0.4,     // overshoot in duration mode (not used for example below)
  }}
/>`}
            </CodeHighliter>
            <MotionExample
              className="h-fit w-full"
              initial={{ y: 0 }}
              animate={{ y: 80 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 14,
                mass: 1,
                // velocity: 2,
                // duration: 0.8,
                // bounce: 0.4,
              }}
            />
            <ul className="list-disc space-y-2 list-inside my-4 py-2 w-full text-left">
              <PropsListItem
                href={`${Links.animation.transitionProperties}#stiffness`}
                title="stiffness"
                description="How hard the spring pulls toward target."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#damping`}
                title="damping"
                description="Resistance/friction of the spring."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#mass`}
                title="mass"
                description="Heaviness of the object."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#velocity`}
                title="velocity"
                description="Start speed, great for drag/gestures."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#duration`}
                title="duration"
                description="Overrides physics — fixed time instead."
              />
              <PropsListItem
                href={`${Links.animation.transitionProperties}#bounce`}
                title="bounce"
                description="Adds elastic overshoot (only in duration mode)."
              />
            </ul>
          </div>
        </article>
        {/* When to use a spring */}
        <article
          role="article"
          aria-labelledby="When-spring"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-spring" className="heading text-lg mb-2">
            When to reach for a spring
          </h3>
          <ul
            className="list-disc space-y-2 list-inside  py-2 w-full 
          [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            <li>
              <span>Natural UI feedback</span> - buttons, toggles, hover interactions.
            </li>
            <li>
              <span>Transform-heavy motion </span> - scaling cards, moving panels, flipping items.
            </li>
            <li>
              <span>Gestures</span> - drag-and-drop, swiping, inertia carry-through.
            </li>
            <li>
              <span>Layout transitions</span> - items reflowing smoothly instead of snapping.
            </li>
          </ul>
        </article>
        {/* Spring look out for */}
        <article
          role="article"
          aria-labelledby="When-tween"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-tween" className="heading from-red-500 text-lg mb-2">
            What to look out for with spring
          </h3>
          <ul className=" danger-list">
            <li>
              <span>Duration is not default</span>
              <ul>
                <li>By default, springs use physics (stiffness, damping, mass)</li>
                <li>
                  If you set <code className="code">duration</code>, Motion switches into duration
                  mode — but then you lose the natural velocity-based feel. Easy to forget when
                  tweaking.
                </li>
              </ul>
            </li>
            <li>
              <span>Overdamping vs underdamping</span>
              <ul>
                <li>
                  Too much <code className="code">damping</code> = animation stops abruptly, no
                  life.
                </li>
                <li>Too little = endless jitter or bounce that never quite settles.</li>
              </ul>
            </li>
            <li>
              <span>Bounce ≠ physics</span>
              <ul>
                <li>
                  The <code className="code">bounce</code> prop only works in duration mode.
                </li>
                <li>
                  If you’re using a physics spring, <code className="code">bounce</code> is ignored
                  (leading to confusion if you expect elastic overshoot).
                </li>
              </ul>
            </li>
            <li>
              <span>Velocity carries over</span>
              <ul>
                <li>
                  Springs pay attention to initial velocity — especially when chained with gestures
                  like drag.
                </li>
                <li>
                  That means sometimes your animation zooms off way faster than expected because of
                  a leftover flick velocity.
                </li>
              </ul>
            </li>
            <li>
              <span>Infinite wiggle bug</span>
              <ul>
                <li>
                  If your stiffness/damping/mass combo doesn’t converge mathematically, the spring
                  never really settles.
                </li>
                <li>
                  The element just keeps wiggling at sub-pixel levels, which looks jittery on sharp
                  UIs.
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </section>
      {/* Transform Origin */}
      <section
        id="spring"
        aria-label="Spring Transition"
        className="mt-12 max-w-4xl mx-auto bg-background-muted p-6 border-l-4 border-accent/70 rounded-lg rounded-l-none"
      >
        <h2 className="heading ">Transform Origin</h2>
        <div className="code-block">
          <CodeHighliter>{`<motion.div style={{ originX: 0.5 }} />`}</CodeHighliter>
        </div>
        {/* What is transform origin? */}
        <article
          role="article"
          aria-labelledby="what-is-transform-origin"
          className="mt-2 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="what-is-transform-origin" className="heading text-lg mb-4">
            What “transform origin” means?
          </h3>
          <div className="[&>p]:text-base!">
            <p className="paragraph">
              <code className="code p-0">Transform Origin </code>in Motion is the pivot point for
              transforms like scale, rotate, or skew. It’s not an animation type, but a reference
              point. Instead of always rotating or scaling from the middle, you can hinge an element
              from the edge, a corner, or even a custom spot.
            </p>
            <p className="paragraph mt-2">
              No movement on its own, just a reference point for transforms.
            </p>
          </div>
        </article>
        {/* Core properties of transform origin */}
        <article
          role="article"
          aria-labelledby="transform-orgin-core-props"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="transform-origin-core-props" className="heading text-lg mb-2">
            Core properties of transformOrigin
          </h3>
          <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-3 ">
            <CodeHighliter>
              {`<motion.div
  animate={{ scale: 1.2, rotate: 45 }}
  style={{
    originX: 0,   // left edge
    originY: 0.5, // vertical center
    originZ: 20,  // hinge 20px towards viewer
  }}
  className="origin-[0%_50%_20px]" // if using tailwind, pure css
/>`}
            </CodeHighliter>
            <MotionExample
              className="w-full  h-fit"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: 1.2, rotate: 45 }}
              styles={{ originX: 0, originY: 0.5, originZ: 20 }}
            />
            <ul className="list-disc space-y-2 list-inside my-4 py-2 w-full text-left">
              <PropsListItem
                title="originX"
                description="horizontal pivot (0 = left, 0.5 = center, 1 = right)"
              />
              <PropsListItem
                title="originY"
                description="vertical pivot (0 = top, 0.5 = center, 1 = bottom)"
              />
              <PropsListItem
                title="originZ"
                description="depth pivot in pixels, used for 3D rotations"
              />
              <PropsListItem
                title="transformOrigin"
                description={`CSS string alternative ( "top left" , "25% 75%" )`}
              />
            </ul>
          </div>
        </article>
        {/* When to use a transform origin */}
        <article
          role="article"
          aria-labelledby="When-transform-origin"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-transform-origin" className="heading text-lg mb-2">
            When to reach for a transform origin
          </h3>
          <ul
            className="list-disc space-y-2 list-inside  py-2 w-full 
          [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            <li>
              <span>Scaling panels/cards</span> - grow from an edge or corner instead of the center
            </li>
            <li>
              <span>Hinge effects</span> - fold menus down from the top, flip cards from a side
            </li>
            <li>
              <span>3D illusions</span> - fwith perspective +{" "}
              <code className="code-a">originY: 0,</code> you can create book/page turns
            </li>
            <li>
              <span>SVG pivots</span> - rotate shapes around custom anchors for icon animations
            </li>
          </ul>
        </article>
        {/* What to look out for with transform origin */}
        <article
          role="article"
          aria-labelledby="When-not-tween"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-tween" className="heading from-red-500 text-lg mb-2">
            What to look out for with spring
          </h3>
          <ul className="danger-list ">
            <li>
              <span>No movement on its own</span>
              <ul>
                <li>
                  Changing origin doesn’t move the element — it only changes how transforms apply.)
                </li>
              </ul>
            </li>
            <li>
              <span>Translate ignores it</span>
              <ul>
                <li>
                  <code className="code">x</code> and <code className="code">y</code> translations
                  don’t care about origin; only scale/rotate/skew do.
                </li>
              </ul>
            </li>
            <li>
              <span>3D needs perspective</span>
              <ul>
                <li>
                  Rotating in 3D without perspective looks flat. Add perspective on a parent for
                  realism.
                </li>
              </ul>
            </li>
            <li>
              <span>Default is always center</span>
              <ul>
                <li>
                  If you don’t set it, it’s<code className="code"> (0.5, 0.5)</code>. Easy to forget
                  why your flip isn’t working!
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </section>
      {/* Per Value Overrides */}
      <section
        id="Per-value-overrides"
        aria-label="Per-value-overrides"
        className="mt-12 max-w-4xl mx-auto bg-background-muted p-6 border-l-4 border-accent/70 rounded-lg rounded-l-none"
      >
        <h2 className="heading ">Per-value overrides — mix feels per property</h2>
        {/* Core idea of value overrides */}
        <article
          role="article"
          aria-labelledby="core-idea-per-value-overrides"
          className="mt-4 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="core-idea-per-value-overrides" className="heading text-lg mb-4">
            Core idea
          </h3>
          <div className="[&>p]:text-base!">
            <p className="paragraph">
              A transition doesn’t have to be one-size-fits-all. You can give everything a general
              timing and easing, then fine-tune individual properties with their own rules. For
              example, let opacity fade on a quick linear tween while scale bounces on a spring. The
              <code className="code">default</code> key sets the baseline feel, and naming a
              property inside <code className="code">transition</code> lets you override just that
              one.
            </p>
          </div>
          <div className="grid grid-cols-[2fr_1fr_1fr] items-center">
            <CodeHighliter>
              {`<motion.div
  initial={{ y: 0, opacity: 0 }}
  animate={{
    y: -80,
    opacity: 1,
    transition: {
      default: { type: "spring", stiffness: 220, damping: 24 },
      opacity: { type: "tween", ease: "linear", duration: 0.2 }
    }
  }}
/>`}
            </CodeHighliter>
            <MotionExample
              size="small"
              className="h-fit w-full"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -80, opacity: 1 }}
              transition={{
                default: { type: "spring", stiffness: 220, damping: 24 },
                opacity: { type: "tween", ease: "linear", duration: 0.2 },
              }}
            />
            <p className="paragraph text-xs text-right">
              In this example, the position change on the x-axis uses a spring so the movement feels
              physical, like the element is being pulled into place and settling naturally. At the
              same time, opacity is given its own override: instead of following the spring, it
              fades in quickly with a simple linear tween over 0.2 seconds.
            </p>
          </div>
        </article>
        {/* When to use per-value overrides */}
        <article
          role="article"
          aria-labelledby="When-per-value-overrides"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-per-value-overrides" className="heading text-lg mb-2">
            When to use per-value overrides
          </h3>
          <ul
            className="list-disc space-y-2 list-inside  py-2 w-full 
          [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            <li>
              <span>Staggered perception</span> - make motion feel fast (spring) while fades stay
              instant/linear.
            </li>
            <li>
              <span>Hierarchy of motion </span> - slarge transforms = spring; micro-tweaks
              (opacity/filter) = quick tween.
            </li>
            <li>
              <span>Keyframe choreography</span> - <code className="code">times</code> + per-segment
              <code className="code">ease</code> to shape arcs and pauses precisely.
            </li>
          </ul>
        </article>
      </section>
      {/* Keyframes - Multi Step motion with arrays */}
      <section
        id="keyframes"
        aria-label="keyframes"
        className="mt-12 max-w-4xl mx-auto bg-background-muted p-6 border-l-4 border-accent/70 rounded-lg rounded-l-none"
      >
        <h2 className="heading ">Keyframes — multi-step motion with arrays</h2>
        {/* Core idea of keyframes */}
        <article
          role="article"
          aria-labelledby="core-idea-keyframes"
          className="mt-4 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="core-idea-keyframes" className="heading text-lg mb-4">
            Core idea
          </h3>
          <div className="[&>p]:text-base!">
            <p className="paragraph">
              Keyframes allow you to animate a property through multiple intermediate values rather
              than just start → end. Think of them like waypoints along the animation timeline. With
              keyframes you can:
            </p>
            <ul className="list-disc space-y-1 list-inside my-1 paragraph">
              <li>Define keyframes for each stage of the animation.</li>
              <li>
                Optionally specify times (fractions between 0 and 1) to control when each waypoint
                happens.
              </li>
              <li>Combine with easing, delay, repeat, etc.</li>
            </ul>
            <p className="paragraph">
              They let you build motions that aren’t monotonic (just linear or spring from A to B),
              but more complex: overshoot, bounce, flip, wiggle, etc
            </p>
          </div>
          <div className="grid grid-cols-[2fr_1fr_1fr] items-center">
            <CodeHighliter>
              {`<motion.div
  animate={{ y: [0, -100, -50, -100] }}
  transition={{
    duration: 2,
    ease: ["easeIn", "easeOut", "easeInOut"],
    times: [0, 0.4, 0.7, 1]
  }}
/>`}
            </CodeHighliter>
            <MotionExample
              size="small"
              className="h-fit w-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -100, -50, -100] }}
              transition={{
                duration: 2,
                ease: ["easeIn", "easeOut", "easeInOut"],
                times: [0, 0.4, 0.7, 1],
              }}
            />
            <p className="paragraph text-xs text-right">
              Here the element animates in multiple stages: it moves from 0 to 100, back to 50, and
              then to 100 again. The full sequence takes two seconds, with different easing curves
              shaping each segment. The times array decides how much of the timeline each step
              occupies.
            </p>
          </div>
        </article>
        {/* When to use keyframes */}
        <article
          role="article"
          aria-labelledby="When-to-use-keyframes"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-to-use-keyframes" className="heading text-lg mb-2">
            When to use keyframes
          </h3>
          <ul
            className="list-disc space-y-2 list-inside  py-2 w-full 
          [&>li>span]:font-display [&>li>span]:text-sm [&>li>span]:text-foreground paragraph"
          >
            <li>
              <span>Multi-step motions</span> - Where you want the object to go through several
              states: e.g. slide right → overshoot left → settle in middle → go right again.
            </li>
            <li>
              <span>Looping animations </span> - Repeating cycles where each cycle has distinct
              phases or “poses” (e.g. bouncing, pulse). Blogs often use keyframes for short
              repeating movements
            </li>
            <li>
              <span>Nonlinear timing:</span> - You want certain parts of the movement to go
              faster/slower (e.g. accelerate at first, pause in middle, finish fast). Using the
              <code className="code">times</code> array you can cluster keyframes early or late
            </li>
            <li>
              <span>Expressiveness</span> - Animations like shakes, wobble, pulsing, elastic effects
              that need multiple checkpoints.
            </li>
          </ul>
        </article>
        <article
          role="article"
          aria-labelledby="When-not-tween"
          className="mt-6 space-y-2 max-w-4xl mx-auto"
        >
          <h3 id="when-tween" className="heading from-red-500 text-lg mb-2">
            What to look out for with keyframes
          </h3>
          <ul className=" danger-list ">
            <li>
              <span>Mismatch between value count and times count</span>
              <ul>
                <li>
                  If you supply <code className="code">times</code>, its length needs to match
                  (number of keyframes) appropriately (often the number of values minus 1 or exactly
                  values count depending on API). If mismatched the behavior can be unexpected.
                </li>
              </ul>
            </li>
            <li>
              <span>Visual jump / snapping if values differ wildly</span>
              <ul>
                <li>
                  If keyframes hop between very different numerical values, without easing or times
                  carefully set, motion can feel janky.
                </li>
              </ul>
            </li>
            <li>
              <span>Over-using keyframes can hurt clarity</span>
              <ul>
                <li>
                  More keyframes = more complexity. If you use many, maintenance / tweaking becomes
                  harder. Better reserve them for motions that need them.
                </li>
              </ul>
            </li>
            <li>
              <span>Performance considerations</span>
              <ul>
                <li>
                  Animations with many keyframes, or animated large elements, or expensive CSS
                  properties (e.g. shadows, filters), can lead to performance drops.
                </li>
              </ul>
            </li>
            <li>
              <span>Interpolating non-numeric values</span>
              <ul>
                <li>
                  If your keyframe values are mixed types (e.g., numbers and strings or units),
                  ensure consistency or Motion may fail or do strange interpolations.
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default MotionTransitionPage;
