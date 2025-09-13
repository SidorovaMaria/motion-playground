import React from "react";
import { TransformState } from "./page";
import Control from "@/components/controls/Control";
import { motion } from "motion/react";
import { revealFromBottom } from "@/variants/TextVariants";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpNarrowWide,
  FoldHorizontal,
  FoldVertical,
  Maximize,
  Pointer,
  RefreshCcw,
  Rotate3D,
  RotateCcw,
  RotateCw,
  Search,
  SearchCheck,
  SearchX,
} from "lucide-react";
type Props = {
  reset: () => void;
  states: Record<string, number>;
  dispatch: React.Dispatch<{ type: "set"; key: keyof TransformState; value: number }>;
  changeMode: (mode: "manual" | "presets") => void;
};
const PlaygroundControls = ({ states, dispatch, reset, changeMode }: Props) => {
  const { x, y, z, scale, scaleX, scaleY, rotate, rotateX, rotateY, skewX, skewY, perspective } =
    states;
  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-display">
          <motion.span
            initial="hidden"
            whileHover="hovered"
            className="text-gradient relative cursor-pointer"
          >
            Manual Controls
            <motion.span
              variants={revealFromBottom}
              className="text-xs absolute left-1/2 -translate-x-1/2 bg-foreground/80 text-background px-2 py-1 bottom-[70%] rounded-md w-64 text-center pointer-events-none"
            >
              For smoother animations, use the &apos;tween&apos; transition with a linear easing.
            </motion.span>
            <Pointer className="text-foreground inline-block absolute -top-1 -right-12 -rotate-90 bounce-up" />
          </motion.span>
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => changeMode("presets")}
            className="text-xs px-3 py-2 font-display bg-secondary text-foreground rounded-md display flex items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <ArrowLeft className="small-icon mr-2 text-foreground stroke-3" />
            <p>Switch to Preset Mode</p>
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform "
          >
            <RefreshCcw className="w-5 h-5 text-foreground stroke-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
        <Control
          label="X Position"
          value={x}
          dispatch={dispatch}
          dispatchValue="x"
          min={-200}
          max={200}
          step={1}
          small
          Icon={ArrowRightLeft}
        />
        <Control
          label="Y Position"
          value={y}
          dispatch={dispatch}
          dispatchValue="y"
          min={-200}
          max={200}
          step={1}
          small
          Icon={ArrowDownUp}
        />
        <Control
          label="Z Position"
          value={z}
          dispatch={dispatch}
          dispatchValue="z"
          min={-200}
          max={200}
          step={1}
          small
          Icon={ArrowUpNarrowWide}
        />
        <Control
          label="Scale"
          value={scale}
          dispatch={dispatch}
          dispatchValue="scale"
          min={0.1}
          max={2}
          step={0.1}
          small
          Icon={Search}
        />
        <Control
          label="Scale X"
          value={scaleX}
          dispatch={dispatch}
          dispatchValue="scaleX"
          min={0}
          max={2}
          step={0.1}
          small
          Icon={SearchX}
        />
        <Control
          label="Scale Y"
          value={scaleY}
          dispatch={dispatch}
          dispatchValue="scaleY"
          min={0}
          max={2}
          step={0.1}
          small
          Icon={SearchCheck}
        />
        <Control
          label="Rotate"
          value={rotate}
          dispatch={dispatch}
          dispatchValue="rotate"
          min={-360}
          max={360}
          step={1}
          small
          Icon={RotateCcw}
        />
        <Control
          label="Rotate X"
          value={rotateX}
          dispatch={dispatch}
          dispatchValue="rotateX"
          min={-360}
          max={360}
          step={1}
          small
          Icon={RotateCw}
        />
        <Control
          label="Rotate Y"
          value={rotateY}
          dispatch={dispatch}
          dispatchValue="rotateY"
          min={-360}
          max={360}
          step={1}
          small
          Icon={Rotate3D}
        />

        <Control
          label="Skew X"
          value={skewX}
          dispatch={dispatch}
          dispatchValue="skewX"
          min={-90}
          max={90}
          step={1}
          small
          Icon={FoldVertical}
        />
        <Control
          label="Skew Y"
          value={skewY}
          dispatch={dispatch}
          dispatchValue="skewY"
          min={-90}
          max={90}
          step={1}
          small
          Icon={FoldHorizontal}
        />
        <Control
          label="Perspective"
          value={perspective}
          dispatch={dispatch}
          dispatchValue="perspective"
          min={0}
          max={1000}
          step={1}
          small
          Icon={Maximize}
        />
      </div>
    </div>
  );
};

export default PlaygroundControls;
