"use client";

import Image from "next/image";
import React, { useMemo, useReducer, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowLeft, ArrowRight, PersonStanding } from "lucide-react";

import { ComboAnimation, SimpleAnimation } from "@/utils/utils";

import SpringPlayground, { INITIAL_PARAMS, SpringPhysicsParams } from "./springPlayground";
import TweenPlayground, { EaseName, EASES } from "./TweenPlayground";
import Presets from "./Presets";
import PlaygroundControls from "./PlaygroundControls";
import { useRouter } from "next/navigation";
import { revealSpanVariant } from "@/variants/buttonVariants";

/**
 * Types & Constants
 */
const AnimationFunctionTabs = ["tween", "spring"] as const;
type AnimationFunction = (typeof AnimationFunctionTabs)[number];
export type Mode = "presets" | "manual";

export type TransformState = {
  x: number;
  y: number;
  z: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  skewX: number;
  skewY: number;
  perspective: number;
};

export const INITIAL_STATE: TransformState = {
  x: 0,
  y: 0,
  z: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
  skewY: 0,
  perspective: 0,
};

export type Action =
  | { type: "set"; key: keyof TransformState; value: number }
  | { type: "applyPreset"; preset: SimpleAnimation | ComboAnimation }
  | { type: "reset" };

/**
 * Reducer keep the state predicatable
 * - 'set' tweek a single transform field
 * - "applyPreset": start from a clean base + the preset (so combos don't stack)
 * - "reset": reset all transform fields to their initial values
 */
function reducer(state: TransformState, action: Action): TransformState {
  switch (action.type) {
    case "set":
      return { ...state, [action.key]: action.value };
    case "applyPreset":
      return { ...INITIAL_STATE, ...action.preset };
    case "reset":
      return INITIAL_STATE;
    default:
      return state;
  }
}

/**
 * ----------------------------------------
 * Main Page Component
 * ----------------------------------------
 */

const AnimationPlayground = () => {
  //Router for navigation
  const router = useRouter();
  //Mode Manual / Presets
  const [mode, setMode] = useState<Mode>("presets");

  // Transform State (drives the animate square in the playground)
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Which preset is currently active (for button highlight)
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Which Animation Function is currently selected
  const [animationFunction, setAnimationFunction] = useState<AnimationFunction>("tween");

  //Spring Animation State
  const [params, setParams] = useState<SpringPhysicsParams>(INITIAL_PARAMS);

  //Tween Control Props
  const [ease, setEase] = React.useState<EaseName>("linear");
  const [duration, setDuration] = React.useState<number>(0.3);

  /**
   * Memoized animate props to avoid re-renders on unrelated state changes.
   * Note: `transformPerspective` is applied via style, not animate.
   */
  const animateProps = useMemo(
    () => ({
      x: state.x,
      y: state.y,
      z: state.z,
      scale: state.scale,
      scaleX: state.scaleX,
      scaleY: state.scaleY,
      rotate: state.rotate,
      rotateX: state.rotateX,
      rotateY: state.rotateY,
      skewX: state.skewX,
      skewY: state.skewY,
      transformPerspective: state.perspective,
    }),
    [state]
  );
  /**
   * Derived Transition Object based on selected Animation Function and its params
   * Note: useMemo to avoid re-renders on unrelated state changes.
   */
  const derivedTransition = useMemo(() => {
    if (animationFunction === "spring") {
      return {
        type: "spring" as const,
        stiffness: params.stiffness,
        damping: params.damping,
        mass: params.mass,
      };
    }
    //tween
    return { type: "tween" as const, duration: duration, ease: EASES[ease] };
  }, [animationFunction, params, ease, duration]);
  /**
   * Handlers
   */
  // Apply a preset by dispatching an action to the reducer
  const applyPreset = (preset: SimpleAnimation | ComboAnimation) =>
    dispatch({ type: "applyPreset", preset });
  const resetValues = () => dispatch({ type: "reset" });

  /**
   * Render Animation Controls based on selected Animation Function
   */
  const renderAnimationControls = () => {
    if (animationFunction === "spring") {
      return (
        <motion.div
          key="spring"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        >
          <SpringPlayground params={params} setParams={setParams} />;
        </motion.div>
      );
    }

    //Tween
    return (
      <motion.div
        key="tween"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      >
        <TweenPlayground
          ease={ease}
          setEase={setEase}
          duration={duration}
          setDuration={setDuration}
        />
      </motion.div>
    );
  };
  const renderMode = () => {
    if (mode === "manual") {
      return (
        <PlaygroundControls
          states={state}
          dispatch={dispatch}
          reset={resetValues}
          changeMode={setMode}
        />
      );
    } else {
      return (
        <Presets
          applyPreset={applyPreset}
          resetValues={resetValues}
          activePreset={activePreset}
          setActivePreset={setActivePreset}
          changeMode={setMode}
        />
      );
    }
  };
  return (
    <main className="relative max-w-7xl mx-auto px-6 py-4">
      {/* Header */}
      <motion.button
        initial="rest"
        whileHover="hovered"
        whileFocus="hovered"
        animate="rest"
        onClick={() => router.back()}
        aria-label="Go back to previous page"
        className="primary-button rounded-md flex items-center text-sm px-3 py-1! mb-4"
      >
        <motion.span variants={revealSpanVariant} className="text-background bounce-left">
          <ArrowLeft />
        </motion.span>
        <p>Go back</p>
      </motion.button>
      <div role="heading" aria-level={2} className="flex items-center gap-3">
        <div className="color-icon w-8 h-8">
          <Image src="/icons/motion.svg" alt="Motion Logo" fill />
        </div>
        <div>
          <h1 className="text-xl font-display text-gradient">
            Motion Transforms and Transition Playground
          </h1>
          <p className="paragraph">
            Explore the world of motion transformation with this interactive playground.
          </p>
        </div>
      </div>
      {/* Main Grid */}
      <section className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-6 mt-8">
        {/* Playground View */}
        <aside
          className="bg-background-muted rounded-2xl p-12 flex items-center justify-center h-full relative overflow-hidden border border-primary/30"
          aria-label="Animation Playground Preview"
        >
          <motion.div
            animate={animateProps}
            transition={derivedTransition}
            className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center"
          >
            <PersonStanding className="icon text-background w-8 h-8" />
          </motion.div>
        </aside>
        {/* Presets Section */}
        <div>{renderMode()}</div>

        {/* Transition Function Tabs + Controls */}
      </section>
      <section className="mt-16">
        {/* Only the tab row participates in shared layout */}
        <LayoutGroup id="anim-tabs">
          <div className="grid grid-cols-2 gap-3">
            {AnimationFunctionTabs.map((tab) => {
              const active = animationFunction === tab;
              return (
                <motion.button
                  aria-pressed={active}
                  aria-label={`Select ${tab} animation function`}
                  key={tab}
                  type="button"
                  layout="position" // smoother width/position changes
                  onClick={() => {
                    setAnimationFunction(tab);
                    setActivePreset(null);
                    dispatch({ type: "reset" });
                  }}
                  className={`
              relative font-display capitalize p-3 text-xs tracking-wider
              transition-colors focus:outline-none cursor-pointer rounded-xl
              active:outline-none active:ring-0 active:border-none  focus:border-none focus:ring-0 hover:bg-gradient-to-r hover:from-primary/40 hover:to-accent/40
           ${active ? "text-background" : "text-foreground"}
            `}
                >
                  {active && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0
                           bg-gradient-to-r from-primary to-accent pointer-events-none opacity-90 rounded-xl"
                      transition={{ type: "spring", stiffness: 220, damping: 40, mass: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className=" ">
          <AnimatePresence mode="popLayout" initial={false}>
            {renderAnimationControls()}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default AnimationPlayground;
