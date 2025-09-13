"use client";
import React, { useCallback, useMemo } from "react";
import {
  easeIn,
  easeOut,
  easeInOut,
  circIn,
  circOut,
  circInOut,
  backIn,
  backOut,
  backInOut,
  anticipate,
  cubicBezier,
} from "motion/react";
import { smoothPath } from "@/utils/graphs/smoothPath";
import { createScales, fitRanges } from "@/utils/graphs/scales";
import Control from "@/components/controls/Control";
import Link from "next/link";
import { SquareArrowUpRight } from "lucide-react";

export const EASES: Record<string, (t: number) => number> = {
  easeIn,
  easeOut,
  easeInOut,
  circIn,
  circOut,
  circInOut,
  backIn,
  backOut,
  backInOut,
  anticipate,
};
export type EaseName = keyof typeof EASES;

const TweenPlayground = ({
  ease,
  setEase,
  duration,
  setDuration,
}: {
  ease: EaseName;
  setEase: React.Dispatch<React.SetStateAction<EaseName>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const samples = useMemo(() => {
    const f = EASES[ease];
    const N = 300;
    return Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1);
      return { t, x: f(t) };
    });
  }, [ease]);
  const graphRanges = useMemo(() => {
    return fitRanges(samples);
  }, [samples]);
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
      <h2 className="text-lg font-display">Animation Type: Tween </h2>
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
        <div className="grid grid-cols-3 gap-4 items-center justify-center ">
          {Object.keys(EASES).map((ename) => (
            <EaseButton
              key={ename}
              ease={ename as EaseName}
              isActive={ename === ease}
              onClick={setEase}
            />
          ))}
          <Link
            href="https://motion.dev/docs/react-transitions#tween"
            className="font-display capitalize button-outline border-foreground/30! p-2 text-xs tracking-wider col-span-2 justify-center flex items-center"
          >
            <SquareArrowUpRight className="small-icon inline-flex mr-2 text-foreground" />
            See Motion Docs
          </Link>
          <div className="col-span-3">
            <Control
              label="Tween Duration"
              value={duration}
              setValue={(v) => setDuration(v)}
              min={0.1}
              max={5}
              step={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweenPlayground;

const EaseButton = ({
  ease,
  isActive,
  onClick,
}: {
  ease: EaseName;
  isActive: boolean;
  onClick: (ease: EaseName) => void;
}) => {
  return (
    <button
      className={` font-display capitalize button-outline border-foreground/30! p-2 text-xs tracking-wider   ${
        isActive
          ? "bg-gradient-to-r from-primary to-accent text-background  active:border-none active:outline-none focus:border-none focus:ring-0"
          : ""
      }`}
      onClick={() => onClick(ease)}
    >
      {ease}
    </button>
  );
};
