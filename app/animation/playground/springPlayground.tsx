"use client";
import { smoothPath } from "@/utils/graphs";
import { Info, RefreshCcw } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { revealToBottom } from "@/variants/TextVariants";
import { ControlsExplain } from "@/utils/utils";
// Spring Physics Model
// Classic 1D mass-spring-damper:
// Original Model
// mx'' = cx' + k(x - xTarget) = 0
// Rearranged
// x'' = -(k/m) * (x - xTarget) - (c/m) * x'
//
// Each value explained:
//   x    = current position
//   x'   = current velocity (dx/dt)
//   x''  = acceleration
//   xTarget = target position
//   m    = mass
//   k    = stiffness of the spring
//   c    = damping coefficient (friction)
//
// Critically damped: c = 2 * sqrt(k * m)
// Underdamped:      c <  2 * sqrt(k * m)
// Overdamped:       c >  2 * sqrt(k * m)
//
export type SpringPhysicsParams = {
  stiffness: number; // k
  damping: number; // c
  mass: number; // m
};
type Sample = {
  t: number; //the time (in seconds)=> normalized 0-> 1 for the plotting
  x: number; // the position at time t -> between 0 and 1, maybe overshooting > 1
  v: number; // the velocity at time t
};
function simulateSpring(
  params: SpringPhysicsParams,
  {
    x0 = 0, //initial position
    v0 = 0, // initial velocity
    target = 1, // final rest position ( normalize to 1 by default)
    dt = 1 / 240, // 240 Hz for smoothness
    maxTime = 3, // seconds cap to avoid infinite loops
    settleVel = 0.001, // velocity threshold to consider as settled <- stop when near zero velocity
    settlePosEps = 0.001, // position threshold to consider as settled <- stop when near target
    settleHold = 0.2, // time to hold within thresholds before considering settled
  } = {}
): Sample[] {
  //Getting physics parameters from the input
  const { stiffness: k, damping: c, mass: m } = params;
  let x = x0;
  let v = v0;
  let t = 0;
  const out: Sample[] = [{ t, x, v }];
  let settedFor = 0;
  while (t < maxTime) {
    //acceleration
    const a = (-k / m) * (x - target) - (c / m) * v;

    //integrate velocity and position using Euler method
    v += a * dt;
    x += v * dt;
    t += dt;
    out.push({ t, x, v });

    const nearPos = Math.abs(x - target) < settlePosEps;
    const slow = Math.abs(v) < settleVel;
    if (nearPos && slow) {
      settedFor += dt;
      if (settedFor >= settleHold) {
        break;
      }
    } else {
      settedFor = 0;
    }
  }
  return out;
}
//helper clamp function
// function clamp(num: number, min: number, max: number) {
//   return Math.min(Math.max(num, min), max);
// }
export const INITIAL_PARAMS: SpringPhysicsParams = {
  stiffness: 100,
  damping: 10,
  mass: 1,
};

const SpringPlayground = ({
  params,
  setParams,
}: {
  params: SpringPhysicsParams;
  setParams: React.Dispatch<React.SetStateAction<SpringPhysicsParams>>;
}) => {
  const durRef = useRef(1);
  const samples = useMemo(() => {
    // locked: x0=0, v0=0, target=1
    const s = simulateSpring(params);
    durRef.current = s[s.length - 1]?.t || 1e-6; // seconds
    return s;
  }, [params]);

  const onReset = () => {
    setParams(INITIAL_PARAMS);
  };
  //Graph Box + auto fit Y to data
  const SVG_W = 500;
  const SVG_H = 250;
  const SVG_PAD = 8;
  const { t0, t1, xMin, xMax } = useMemo(() => {
    if (!samples.length) return { t0: 0, t1: 1, xMin: -0.2, xMax: 1.2 };
    const t0 = samples[0].t;
    const t1 = samples[samples.length - 1].t;
    let lo = Infinity,
      hi = -Infinity;
    for (const s of samples) {
      if (s.x < lo) lo = s.x;
      if (s.x > hi) hi = s.x;
    }
    lo = Math.min(lo, 1);
    hi = Math.max(hi, 1); // include target line (1)
    const pad = (hi - lo || 1) * 0.1;
    return { t0, t1, xMin: lo - pad, xMax: hi + pad };
  }, [samples]);
  const toXY = useCallback(
    (t: number, x: number) => {
      const px = SVG_PAD + ((t - t0) / (t1 - t0 || 1)) * (SVG_W - SVG_PAD * 2);
      const py = SVG_PAD + (1 - (x - xMin) / (xMax - xMin || 1)) * (SVG_H - SVG_PAD * 2);
      return { px, py };
    },
    [t0, t1, xMin, xMax]
  );
  const pathD = useMemo(() => {
    if (samples.length < 2) return "";
    const pts = samples.map((s) => {
      const { px, py } = toXY(s.t, s.x);
      return { x: px, y: py };
    });
    return smoothPath(pts, 0.9);
  }, [samples, toXY]);

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-display">Animation Type: Spring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mt-4 ">
        {/* Graph */}
        <div className="background-muted border border-primary/30 rounded-xl p-4 flex items-center justify-center">
          <svg width={SVG_W} height={SVG_H}>
            {/* Soft grid */}
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" className="stroke-primary/10" strokeWidth={1} fill="none" />
              </pattern>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-accent)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            {/* curve */}
            <path d={pathD} stroke="url(#grad)" strokeWidth="3" fill="none" />
          </svg>
        </div>
        {/* Controls */}
        <div className="flex flex-col gap-8 justify-center">
          <Control
            label="Stiffness"
            value={params.stiffness}
            setValue={(v) => setParams((p) => ({ ...p, stiffness: v }))}
            min={20}
            max={1000}
            step={1}
          />
          <Control
            label="Damping"
            value={params.damping}
            setValue={(v) => setParams((p) => ({ ...p, damping: v }))}
            min={1}
            max={100}
            step={1}
          />
          <Control
            label="Mass"
            value={params.mass}
            setValue={(v) => setParams((p) => ({ ...p, mass: v }))}
            min={0.1}
            max={5}
            step={0.1}
          />
          <button
            onClick={onReset}
            disabled={JSON.stringify(params) === JSON.stringify(INITIAL_PARAMS)}
            className="w-full button-outline py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCcw className="small-icon inline-flex mr-2" />
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpringPlayground;

type ControlProps = {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
};
const Control = ({ label, value, setValue, min, max, step }: ControlProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2 w-full">
      <label className="text-sm text-foreground font-display tracking-wide">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        className="rounded-md border border-primary/20 bg-background-muted px-3 py-1.5 text-sm text-center no-spinner font-display"
      />
      <motion.div
        initial="hidden"
        whileHover="hovered"
        whileFocus="hovered"
        className="icon text-accent/80 hover:text-accent cursor-pointer transition relative"
        title="Info"
      >
        <Info className="" />
        <motion.div
          variants={revealToBottom}
          className="text-xs leading-relaxed font-sans absolute top-full left-1/2 -translate-x-1/2 bg-background text-foreground p-2 rounded-md w-64 text-center pointer-events-none"
        >
          {ControlsExplain[label as keyof typeof ControlsExplain]}
        </motion.div>
      </motion.div>
    </div>

    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => {
        setValue(Number(e.target.value));
      }}
      className="accent-accent cursor-pointer rounded-md focus:ring-primary  focus:outline-none active:ring-0 active:border-none"
    />
  </div>
);
