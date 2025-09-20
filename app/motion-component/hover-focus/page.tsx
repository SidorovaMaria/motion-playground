"use client";
import InViewSection from "@/components/pageFormat/InViewSection";
import { deriveDefaultSpring } from "@/utils/motion";
import { useReducedMotion } from "motion/react";
import React, { useCallback, useMemo } from "react";
import { motion } from "motion/react";
import LazyMount from "@/utils/LazyMount";
import dynamic from "next/dynamic";
import MotionPropertyOverview from "@/components/properties/MotionPropertyOverview";
import {
  onHoverMProp,
  onTapMProp,
  whileHoverMProp,
  whileTapMProp,
} from "@/constants/motion-components-props";
const CodeHighliter = dynamic(() => import("@/components/codeExamples/CodeHighliter"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse rounded-md bg-foreground/5" />,
});

const InteractiveMotionComponent = () => {
  return (
    <main className=" max-w-7xl mx-auto px-10 py-12">
      <section
        id="animation-props"
        className="mt-12 max-w-4xl mx-auto"
        aria-labelledby="animation-props"
      >
        <h2 className="heading mb-4">Interactive Props - Animating User Input</h2>
        <div className="space-y-2 paragraph">
          <p>
            Interaction props let your components respond directly to what the user does. Instead of
            only defining where an element starts or ends, these props trigger motion based on input
            — like hovering, focusing, or tapping.
          </p>
          <p>At their simplest, interaction props answer questions like:</p>
          <ul
            aria-label="Use cases for motion components"
            className="list-disc list-inside space-y-2  paragraph [&>li]:text-sm font-display [&>li>span]:text-foreground/100 [&>li>span]:mr-2"
          >
            <li>
              <span>What happens when the user hovers?</span>
              <code>`whileHover`, `onHoverStart`, `onHoverEnd`</code>
            </li>
            <li>
              <span>What happens when the element is focused?</span>
              <code>`whileFocus`</code>
            </li>{" "}
            <li>
              <span>What happens when the user taps?</span>
              <code>`whileTap`, `onTapStart`, `onTapEnd`</code>
            </li>
          </ul>
          <p>
            These props make UI feel alive and tactile — buttons grow when hovered, cards highlight
            on focus, icons bounce when tapped. They’re what transform animations from just visual
            polish into interactive feedback.
          </p>
          <p className="italic text-sm">
            (We’ll explore dragging props separately later, since they unlock a different class of
            motion interactions.)
          </p>
        </div>
        <InViewSection
          id="whileHover"
          title="'While Hover' — Animate on Hover"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
        >
          <div className="paragraph space-y-2 ">
            <p>
              Unlike <code>animate</code>, which runs whenever state changes,
              <code>whileHover</code> only applies while the user’s pointer is over the element. The
              moment hover begins, Motion animates to the values you set.
            </p>
            <p>
              This makes it perfect for interactive feedback. A button might grow slightly, a card
              might lift with a shadow, or an icon might spin. When the pointer leaves, Motion
              smoothly reverts the element to its previous state.
            </p>
          </div>
          <WhileHoverExample />
          <MotionPropertyOverview overview={whileHoverMProp} />
        </InViewSection>
        <InViewSection
          id="onHoverStart"
          title="'On Hover Start/End' — Callbacks on Hover"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
        >
          <div className="paragraph space-y-2">
            <p>
              While <code>whileHover</code> applies styles for the entire hover state,
              <code>onHoverStart</code> and <code>onHoverEnd</code> give you precise entry/exit
              moments. They fire once when the pointer enters/leaves the element, making them ideal
              for side effects that don’t belong inside animation props.
            </p>
            <p>
              Use them to open/close tooltips, kick off analytics, preload content, start/stop
              sounds, or toggle UI state without fighting continuous updates.
            </p>
          </div>
          <HoverCallbacksExample />
          <MotionPropertyOverview overview={onHoverMProp} />
        </InViewSection>
        <InViewSection
          id="whileTap"
          title="'While Tap' — Animate on Tap"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
        >
          <div className="paragraph space-y-2">
            <p>
              <code>whileTap</code> defines how an element should look and feel while it’s actively
              being pressed. As soon as the user’s pointer goes down, Motion applies these styles,
              and removes them the moment the press ends.
            </p>
            <p>
              It’s like a supercharged <code>:active</code> state from CSS — but fully animatable.
              You can make buttons shrink, icons tilt, or cards darken, giving users instant visual
              feedback that something is happening.
            </p>
          </div>

          <WhileTapExample />
          <MotionPropertyOverview overview={whileTapMProp} />
        </InViewSection>
        <InViewSection
          id="onTap/Start/End"
          title="'On Tap and onTapStart/End' — Callbacks on Tap"
          className="bg-background [&>button>h2]:text-lg! [&>button]:rounded-xl [&>button]:py-4  border-2! border-foreground/20! rounded-xl!"
        >
          <div className="paragraph space-y-2 ">
            <p>
              While <code>whileTap</code> handles how an element looks during a press, the tap
              callbacks (<code>onTapStart</code>, <code>onTap</code>, <code>onTapCancel</code>, and{" "}
              give you precise control over the tap lifecycle.
            </p>
            <p>
              They fire at key moments: when the press begins, when it’s released, if it’s canceled
              (pointer moved off). This makes them ideal for triggering side effects that don’t
              belong inside animation props.
            </p>
            <p>
              Use them for actions like firing analytics events, playing sounds, submitting forms,
              toggling state, or adding haptic feedback — all in sync with the user’s tap.
            </p>
          </div>
          <TapLifecycleExample />
          <MotionPropertyOverview overview={onTapMProp} />
        </InViewSection>
      </section>
    </main>
  );
};

export default InteractiveMotionComponent;

const WhileHoverExample = () => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-center px-10">
        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="example-box">
          Hover me
        </motion.div>
      </div>
      <div className="flex flex-col">
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {` <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="example-box">
    Hover me
</motion.div>`}
          </CodeHighliter>
        </LazyMount>
        <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
          This example shows how <code>whileHover</code> creates instant interactivity. When you
          hover over the box, it scales up slightly and rotates by 10 degrees. The effect only lasts
          as long as the pointer is inside — once you leave, the box smoothly reverts to its normal
          state. Unlike <code>animate</code>, which depends on React state, <code>whileHover</code>{" "}
          responds directly to user behavior, making it perfect for buttons, cards, and other
          interactive UI.
        </p>
      </div>
    </div>
  );
};
const HoverCallbacksExample = () => {
  const [count, setCount] = React.useState(0);
  const intervalRef = React.useRef<number | null>(null);

  const clear = React.useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleHoverStart = React.useCallback(() => {
    clear();
    // Count up while hovering
    intervalRef.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, [clear]);

  const handleHoverEnd = React.useCallback(() => {
    clear();
    // Count down after leaving until 0
    intervalRef.current = window.setInterval(() => {
      setCount((c) => {
        if (c <= 0) {
          clear();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [clear]);

  React.useEffect(() => () => clear(), [clear]);

  return (
    <div className="my-5">
      <div className="flex items-center justify-center px-10">
        <motion.div
          className="example-box text-center select-none text-xs! font-sans!"
          whileHover={{ scale: 1.2, rotate: -10 }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          {`Been hovering for  ${count} ${count === 1 ? "second" : "seconds"}`}
        </motion.div>
      </div>
      <div className="grid grid-cols-1">
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`<motion.div
    className="example-box text-center select-none"
    whileHover={{ scale: 1.1 }}
    onHoverStart={handleHoverStart}
    onHoverEnd={handleHoverEnd} >
    {\`Been hovering for \${count} \${count === 1 ? "second" : "seconds"}\`}
</motion.div>`}
          </CodeHighliter>
        </LazyMount>
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`const handleHoverStart = React.useCallback(() => {
    clear();
    // Count up while hovering
    intervalRef.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 500);
  }, [clear]);
`}
          </CodeHighliter>
        </LazyMount>
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`const handleHoverEnd = React.useCallback(() => {
    clear();
    // Count down after leaving until 0
    intervalRef.current = window.setInterval(() => {
      setCount((c) => {
        if (c <= 0) {
          clear();
          return 0;
        }
        return c - 1;
      });
    }, 500);
  }, [clear]);
`}
          </CodeHighliter>
        </LazyMount>
      </div>
      <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
        This example shows how <code>onHoverStart</code> and <code>onHoverEnd</code> can trigger
        side effects. When you hover over the box, it starts counting up every second. Once you
        leave, it counts back down to zero. Unlike <code>whileHover</code>, which applies styles
        continuously while hovering, these callbacks fire only once at the start and end of the
        hover, making them perfect for things like tooltips, analytics, or any effect that needs a
        clear entry and exit point.
      </p>
    </div>
  );
};
const WhileTapExample = () => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-center px-10">
        <motion.div
          whileTap={{ scale: 0.9, backgroundColor: "var(--color-secondary)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-20 h-20 rounded-xl border flex items-center justify-center focus:ring-0 cursor-pointer select-none text-xs font-display"
        >
          Tap me
        </motion.div>
      </div>
      <div className="flex flex-col">
        <LazyMount block="code">
          <CodeHighliter fontSize={10} lineHeight={14}>
            {`<motion.div
    whileTap={{ scale: 0.9, backgroundColor: "var(--color-secondary)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}    
>
    Tap me
</motion.div>`}
          </CodeHighliter>
        </LazyMount>
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
          This example shows how <code>whileTap</code> creates instant feedback when you tap or
          click the box. The scale and background color change immediately, providing a responsive
          feel that enhances the user experience.
        </p>
      </div>
    </div>
  );
};
const TapLifecycleExample = () => {
  const [log, setLog] = React.useState<string[]>([]);

  const addLog = React.useCallback((msg: string) => {
    setLog((prev) => [...prev.slice(-4), msg]); // keep last 5 logs
  }, []);

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactive button */}
        <div className="flex flex-col items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.9, backgroundColor: "var(--color-secondary)" }}
            className="px-3 py-1 rounded-md bg-primary/70 text-white font-display cursor-pointer text-sm"
            onTapStart={(event, info) => {
              addLog(`🔵 Tap started at x:${info.point.x}, y:${info.point.y}`);
            }}
            onTapCancel={(event, info) =>
              addLog(`⚠️ Tap canceled at x:${info.point.x}, y:${info.point.y}`)
            }
            onTap={(event, info) =>
              addLog(`✅ Tap completed at x:${info.point.x}, y:${info.point.y}`)
            }
          >
            Tap me
          </motion.button>

          <div className="paragraph text-sm text-foreground/70 italic mt-4 max-w-md mx-auto text-left px-4">
            <p>
              Each callback has access to the raw <code>event</code> and <code>info</code> object.
              <br />
              <code>info.point</code> gives the pointer position when the event fired — useful for
              analytics, gestures, or context menus.
              <br />
              Try pressing, moving off the button, or releasing inside to see how the lifecycle
              differs.
            </p>
          </div>
        </div>

        {/* Event log */}
        <div className="text-sm text-foreground/70 font-mono bg-muted p-3 rounded-md">
          <p className="font-display mb-1">Event log:</p>
          <ul className=" list-disc pl-5 space-y-1 text-xs italic">
            {log.length === 0 && (
              <li className="paragraph">No events yet. Try tapping the button!</li>
            )}
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code block */}
      <LazyMount block="code">
        <CodeHighliter fontSize={10} lineHeight={14}>
          {`<motion.button
      whileTap={{ scale: 0.9, backgroundColor: "#6366f1" }}
      onTapStart={(event, info) => {
        addLog(\`🔵 Tap started at x:\${info.point.x}, y:\${info.point.y}\`);
      }}
      onTapCancel={(event, info) =>
        addLog(\`⚠️ Tap canceled at x:\${info.point.x}, y:\${info.point.y}\`)
      }
      onTap={(event, info) =>
        addLog(\`✅ Tap completed at x:\${info.point.x}, y:\${info.point.y}\`)
      }
    >
      Tap me
    </motion.button>`}
        </CodeHighliter>
      </LazyMount>

      {/* Teaching point */}
      <p className="text-xs text-center text-foreground/70 italic mt-2 max-w-2xl mx-auto">
        This demo highlights the <strong>tap lifecycle</strong>. <code>onTapStart</code> fires when
        pressing begins, <code>onTap</code> when it completes, and <code>onTapCancel</code> if
        aborted. Each callback provides both the raw DOM <code>event</code> and Motion’s{" "}
        <code>info</code> object — including pointer position — giving you precise control for
        analytics, gestures, or contextual UI logic.
      </p>
    </div>
  );
};
