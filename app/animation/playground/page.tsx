"use client";
import Image from "next/image";
import React, { useMemo, useReducer, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { PersonStanding } from "lucide-react";
import {
  ComboAnimation,
  ComboAnimationPresets,
  SimpleAnimation,
  SimpleAnimationPresets,
} from "@/utils/utils";

import SpringPlayground, { INITIAL_PARAMS, SpringPhysicsParams } from "./springPlayground";
import TweenPlayground, { EaseName, EASES } from "./TweenPlayground";

const AnimationPlayground = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const animateProps = useMemo(
    () => ({
      x: state.x,
      y: state.y,
      z: state.z,
      scale: state.scale,
      scaleX: state.scaleX,
      scaleY: state.scaleY,
      scaleZ: state.scaleZ,
      rotate: state.rotate,
      rotateX: state.rotateX,
      rotateY: state.rotateY,
      rotateZ: state.rotateZ,
      skewX: state.skewX,
      skewY: state.skewY,
      transformPerspective: state.perspective,
    }),
    [state]
  );
  const [AnimationFunction, setAnimationFunction] = useState<AnimationFunction>("tween");
  //For Spring Animation
  const [params, setParams] = useState<SpringPhysicsParams>(INITIAL_PARAMS);
  // For Tween Animation
  const [ease, setEase] = React.useState<EaseName>("easeIn");
  const [duration, setDuration] = React.useState<number>(0.3);
  const derivedTransition = useMemo(() => {
    if (AnimationFunction === "spring") {
      return {
        type: "spring" as const,
        stiffness: params.stiffness,
        damping: params.damping,
        mass: params.mass,
      };
    } else if (AnimationFunction === "tween") {
      return { type: "tween" as const, duration: duration, ease: EASES[ease] };
    }
    return { type: "tween" as const, duration: 0.3 };
  }, [AnimationFunction, params, ease, duration]);

  const applyPreset = (preset: SimpleAnimation | ComboAnimation) =>
    dispatch({ type: "applyPreset", preset });
  const resetValues = () => dispatch({ type: "reset" });

  const renderAnimationControls = () => {
    if (AnimationFunction === "spring") {
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
    } else if (AnimationFunction === "tween") {
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
    } else {
      throw new Error("Unsupported Animation Function");
    }
  };
  return (
    <main className="relative max-w-7xl mx-auto px-6  py-10">
      <div role="heading" aria-level={2} className="flex items-center gap-3">
        <div className="color-icon w-8 h-8">
          <Image src="/icons/motion.svg" alt="Motion Logo" fill />
        </div>
        <div>
          <h1 className="text-2xl font-display text-gradient">Motion Animation Playground</h1>
          <p className="paragraph">
            Explore the world of motion transformation with this interactive playground.
          </p>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* Playground View */}
        <aside className="bg-background-muted rounded-2xl p-12 flex items-center justify-center h-full relative overflow-hidden border border-primary/30">
          <motion.div
            animate={animateProps}
            transition={derivedTransition}
            className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center"
          >
            <PersonStanding className="icon text-background w-8 h-8" />
          </motion.div>
        </aside>

        <div>
          {/* Simple Animation */}
          <div>
            <h3 className="text-lg font-display">Simple Animation Presets</h3>
            <p className="paragraph">Applying only one transformation at a time.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
              {SimpleAnimationPresets.map((preset) => (
                <AnimationPresetBtn
                  key={preset.name}
                  preset={preset}
                  applyPreset={applyPreset}
                  resetValues={resetValues}
                  activePreset={activePreset}
                  setActivePreset={setActivePreset}
                />
              ))}
            </div>
          </div>
          {/* Combo Animation */}
          <div>
            <h3 className="text-lg font-display">Combo Animation Presets</h3>
            <p className="paragraph">Applying multiple transformations at once.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
              {ComboAnimationPresets.map((preset) => (
                <AnimationPresetBtn
                  key={preset.name}
                  preset={preset}
                  applyPreset={applyPreset}
                  resetValues={resetValues}
                  activePreset={activePreset}
                  setActivePreset={setActivePreset}
                />
              ))}
            </div>
          </div>
          {/* Reset Button */}
          {/* <button onClick={resetValues} className="w-full button-outline py-1.5 ">
            <RefreshCcw className="small-icon inline-flex mr-2" />
            Reset All
          </button> */}
        </div>
        {/* Transition Function Tabs */}
      </section>
      <section className="mt-8">
        {/* Only the tab row participates in shared layout */}
        <LayoutGroup id="anim-tabs">
          <div className="grid grid-cols-2">
            {AnimationFunctionTabs.map((tab) => {
              const active = AnimationFunction === tab;
              return (
                <motion.button
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
              transition-colors focus:outline-none cursor-pointer rounded-t-xl
              active:outline-none active:ring-0 active:border-none  focus:border-none focus:ring-0 hover:bg-gradient-to-r hover:from-primary/40 hover:to-accent/40
              bg-gradient-to-r from-primary/20 to-accent/20
              ${active ? "text-background" : "text-foreground"}
            `}
                >
                  {active && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0
                           bg-gradient-to-r from-primary to-accent pointer-events-none opacity-90 rounded-tl-xl rounded-tr-xl"
                      transition={{ type: "spring", stiffness: 220, damping: 40, mass: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {renderAnimationControls()}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default AnimationPlayground;

type TransformState = {
  x: number;
  y: number;
  z: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  skewX: number;
  skewY: number;
  perspective: number;
};

const INITIAL_STATE: TransformState = {
  x: 0,
  y: 0,
  z: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  skewX: 0,
  skewY: 0,
  perspective: 0,
};
type Action =
  | { type: "set"; key: keyof TransformState; value: number }
  | { type: "applyPreset"; preset: SimpleAnimation | ComboAnimation }
  | { type: "reset" };

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

type AnimationPresetBtnProps = {
  preset: SimpleAnimation | ComboAnimation;
  applyPreset: (preset: SimpleAnimation | ComboAnimation) => void;
  resetValues: () => void;
  activePreset: string | null;
  setActivePreset: React.Dispatch<React.SetStateAction<string | null>>;
};

const AnimationPresetBtn: React.FC<AnimationPresetBtnProps> = ({
  preset,
  applyPreset,
  resetValues,
  activePreset,
  setActivePreset,
}) => {
  const isActive = activePreset === preset.name;

  const handleClick = () => {
    if (isActive) {
      resetValues();
      setActivePreset(null);
    } else {
      applyPreset(preset);
      setActivePreset(preset.name);
    }
  };
  const Icon = preset.icon;

  return (
    <button
      type="button"
      className={`font-display capitalize button-outline border-foreground/30! p-2 text-xs tracking-wider ${
        isActive
          ? "bg-gradient-to-r from-primary to-accent text-background  active:border-none active:outline-none focus:border-none focus:ring-0"
          : ""
      }`}
      onClick={handleClick}
    >
      <Icon className={`small-icon inline-flex mr-2 ${isActive ? "text-background" : ""}`} />
      {preset.name}
    </button>
  );
};
const AnimationFunctionTabs = ["spring", "tween"] as const;
type AnimationFunction = (typeof AnimationFunctionTabs)[number];
