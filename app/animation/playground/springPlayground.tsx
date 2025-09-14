"use client";
import { smoothPath } from "@/utils/graphs/smoothPath";
import { RefreshCcw, SquareArrowUpRight } from "lucide-react";
import React, { useCallback, useMemo, useRef } from "react";
import { createScales, fitRanges, Sample } from "@/utils/graphs/scales";
import Link from "next/link";
import Control from "@/components/controls/Control";

/**
 * Spring Physics Model ( Classic 1D mass-spring-damper)
 *
 * Original Model
 * ---------------------------------
 * mx'' = cx' + k(x - xTarget) = 0
 * --------------------------------
 * Rearranged
 * ---------------------------------
 * x'' = -(k/m) * (x - xTarget) - (c/m) * x'
 *---------------------------------
 *
 * Each value explained:
 *   x    = current position
 *   x'   = current velocity (dx/dt)
 *   x''  = acceleration
 *   xTarget = target position
 *   m    = mass
 *   k    = stiffness of the spring
 *   c    = damping coefficient (friction)
 * ---------------------------------
 *  Critically damped: c = 2 * sqrt(k * m)
 *  Underdamped:      c <  2 * sqrt(k * m)
 *  Overdamped:       c >  2 * sqrt(k * m)
 */
export type SpringPhysicsParams = {
  stiffness: number; // k
  damping: number; // c
  mass: number; // m
};
type SpringSimOptions = {
  x0?: number; // initial position
  v0?: number; // initial velocity
  target?: number; // final rest position ( normalize to 1 by default)
  dt?: number; // time step for the simulation (in seconds)
  maxTime?: number; // maximum time to simulate (in seconds)
  settleVel?: number; // velocity threshold to consider as settled <- stop when near zero velocity
  settlePosEps?: number; // position threshold to consider as settled <- stop when near target
  settleHold?: number; // time to hold within thresholds before considering settled
};

function simulateSpring(
  params: SpringPhysicsParams,
  {
    x0 = 0,
    v0 = 0,
    target = 1,
    dt = 1 / 240,
    maxTime = 5,
    settleVel = 0.001,
    settlePosEps = 0.001,
    settleHold = 0.2,
  }: SpringSimOptions = {}
): Sample[] {
  //Getting physics parameters from the input
  const { stiffness: k, damping: c, mass: m } = params;

  //Guard against invalid parameters
  if (m <= 0 || !isFinite(m) || !isFinite(k) || !isFinite(c)) {
    return [{ t: 0, x: 0, v: 0 }];
  }
  let x = x0;
  let v = v0;
  let t = 0;
  let settedFor = 0;

  const out: Sample[] = [{ t, x, v }];

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
const SVG_W = 500;
const SVG_H = 250;
const SVG_PAD = 8;
type SpringPlaygroundProps = {
  params: SpringPhysicsParams;
  setParams: React.Dispatch<React.SetStateAction<SpringPhysicsParams>>;
};

const SpringPlayground = ({ params, setParams }: SpringPlaygroundProps) => {
  const durRef = useRef(1);

  const { samples, duration, graphRanges, toXY, toPY, pathD } = useMemo(() => {
    const s = simulateSpring(params);
    const ranges = fitRanges(s);
    //Build Pixel mapping
    const { toXY, toPY } = createScales({ SVG_W, SVG_H, SVG_PAD }, ranges);
    const pathD = (() => {
      if (s.length < 2) return "";
      const pts = s.map((s) => {
        const { px, py } = toXY(s.t, s.x);
        return { x: px, y: py };
      });
      return smoothPath(pts, 0.9);
    })();
    durRef.current = Math.min(s[s.length - 1]?.t || 1e-6, 5);
    return {
      samples: s,
      duration: durRef.current,
      graphRanges: ranges,
      toXY,
      toPY,
      pathD,
    };
  }, [params]);
  const onReset = useCallback(() => {
    setParams(INITIAL_PARAMS);
  }, [setParams]);

  const setStiffness = useCallback(
    (v: number) => setParams((p) => ({ ...p, stiffness: v })),
    [setParams]
  );
  const setDamping = useCallback(
    (v: number) => setParams((p) => ({ ...p, damping: v })),
    [setParams]
  );
  const setMass = useCallback((v: number) => setParams((p) => ({ ...p, mass: v })), [setParams]);

  return (
    <div className="w-full p-4 ">
      <h2 className="text-lg font-display">Animation Type: Spring</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mt-4 ">
        {/* Graph */}
        <div className="background-muted border border-primary/30 rounded-xl p-4 flex items-center justify-center">
          <svg width={SVG_W} height={SVG_H} role="img" aria-label="Spring Animation Graph">
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
            setValue={setStiffness}
            min={20}
            max={1000}
            step={1}
          />
          <Control
            label="Damping"
            value={params.damping}
            setValue={setDamping}
            min={1}
            max={100}
            step={1}
          />
          <Control
            label="Mass"
            value={params.mass}
            setValue={setMass}
            min={0.1}
            max={5}
            step={0.1}
          />
          <p className="paragraph font-bold">
            Calculated duration: {duration.toFixed(2)}s{" "}
            <span className="opacity-70">(cap 5.00s)</span>
          </p>
          <button
            type="button"
            aria-disabled={JSON.stringify(params) === JSON.stringify(INITIAL_PARAMS)}
            aria-label="Reset spring parameters"
            title="Reset spring parameters"
            onClick={onReset}
            disabled={JSON.stringify(params) === JSON.stringify(INITIAL_PARAMS)}
            className="w-full button-outline py-1.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
          >
            <RefreshCcw className="small-icon inline-flex mr-2" />
            Reset All
          </button>
          <Link
            href="https://motion.dev/docs/react-transitions#spring"
            className="w-full primary-button opacity-80 py-1.5 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
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
