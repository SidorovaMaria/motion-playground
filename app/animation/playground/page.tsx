"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { motion } from "motion/react";
import { PersonStanding, RefreshCcw } from "lucide-react";
import {
  ComboAnimation,
  ComboAnimationPresets,
  SimpleAnimation,
  SimpleAnimationPresets,
} from "@/utils/utils";

import SpringPlayground, { INITIAL_PARAMS, SpringPhysicsParams } from "./springPlayground";

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
  const [AnimationFunction, setAnimationFunction] = useState<AnimationFunction>("Spring");
  //For Spring Animation
  const [params, setParams] = useState<SpringPhysicsParams>(INITIAL_PARAMS);
  const derivedTransition = useMemo(() => {
    if (AnimationFunction === "Spring") {
      return {
        type: "spring" as const,
        stiffness: params.stiffness,
        damping: params.damping,
        mass: params.mass,
      };
    }
    return { type: "tween" as const, duration: 0.5 };
  }, [AnimationFunction, params]);

  const applyPreset = (preset: SimpleAnimation | ComboAnimation) =>
    dispatch({ type: "applyPreset", preset });
  const resetValues = () => dispatch({ type: "reset" });
  useEffect(() => {
    console.log(derivedTransition);
  }, [derivedTransition]);
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
        <SpringPlayground params={params} setParams={setParams} />
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
      className={`button-outline px-2 py-1 text-sm ${
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
const AnimationFunctionTabs = ["Spring", "Tween", "Easing", "Inertia"] as const;
type AnimationFunction = (typeof AnimationFunctionTabs)[number];

const AnimationFunctionTab = () => {};
