"use client";
import { smoothPath } from "@/utils/graphs/smoothPath";
import { Info, RefreshCcw, SquareArrowUpRight } from "lucide-react";
import React, { useMemo, useRef } from "react";
import { motion } from "motion/react";
import { revealToBottom } from "@/variants/TextVariants";
import { ControlsExplain } from "@/utils/utils";
import { createScales, fitRanges, Sample } from "@/utils/graphs/scales";
import Link from "next/link";
import Control from "@/components/controls/Control";
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

function simulateSpring(
  params: SpringPhysicsParams,
  {
    x0 = 0, //initial position
    v0 = 0, // initial velocity
    target = 1, // final rest position ( normalize to 1 by default)
    dt = 1 / 240, // 240 Hz for smoothness
    maxTime = 5, // seconds cap to avoid infinite loops
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
  const graphRanges = useMemo(() => {
    return fitRanges(samples);
  }, [samples]);

  //   //Graph Box + auto fit Y to data
  const SVG_W = 500;
  const SVG_H = 250;
  const SVG_PAD = 8;

  const { toXY, toPY } = useMemo(
    () => createScales({ SVG_W: SVG_W, SVG_H: SVG_H, SVG_PAD: SVG_PAD }, graphRanges),
    [graphRanges]
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
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mt-4 ">
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
            {/* Target Guide */}
            <line
              x1={SVG_PAD}
              y1={toPY(1)}
              x2={SVG_W - SVG_PAD}
              y2={toPY(1)}
              className="stroke-red-700"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            {/* curve */}
            <path d={pathD} stroke="url(#grad)" strokeWidth="3" fill="none" />
          </svg>
        </div>
        {/* Controls */}
        <div className="flex flex-col gap-4 justify-center">
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
          <p className="paragraph fotn-bold">
            Calculated Duration of the animation: {durRef.current.toFixed(2)}s (max 5.00s)
          </p>
          <button
            onClick={onReset}
            disabled={JSON.stringify(params) === JSON.stringify(INITIAL_PARAMS)}
            className="w-full button-outline py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCcw className="small-icon inline-flex mr-2" />
            Reset All
          </button>
          <Link
            href="https://motion.dev/docs/react-transitions#spring"
            className="w-full primary-button opacity-80 py-1.5 flex items-center justify-center"
          >
            <SquareArrowUpRight className="small-icon inline-flex mr-2 text-background" />
            See Motion Docs
          </Link>
        </div>
        {/* Other Values that can be accepted by Spring Animation */}
        <div>
          <h3 className="font-display text-base mb-2">Other Spring Values</h3>

          <ul className="flex flex-col gap-2">
            <li>
              <p className="text-sm font-display text-primary">Velocity</p>
              <p className="paragraph">
                Initial velocity of the animation, in pixels per second.
                <br />
                <span className="font-bold brightness-110"> Default 0.</span>
              </p>
            </li>
            <li>
              <p className="text-sm font-display text-primary">Rest Speed</p>
              <p className="paragraph">
                End animation if absolute speed (in units per second) drops below this value and
                delta is smaller than restDelta.
                <br /> <span className="font-bold brightness-110">Default 0.1</span>
              </p>
            </li>
            <li>
              <p className="text-sm font-display text-primary">Rest Delta</p>
              <p className="paragraph">
                End animation if distance to destination is below this value and speed is below
                restSpeed.
                <br />
                <span className="font-bold brightness-110">Default 0.01</span>
              </p>
            </li>
            <li>
              <p className="text-sm font-display text-primary">Bounce</p>
              <p className="paragraph">
                Determines the bounciness of a spring animation.
                <br /> <span className="font-bold brightness-110">Default 0.25</span>
              </p>
              <p className="text-xs italic text-red-400">
                This is not physics application to the animation. Therefore passing stiffness,
                damping and mass will not affect the bounce value.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpringPlayground;
