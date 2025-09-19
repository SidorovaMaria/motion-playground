import React, { useCallback, useMemo } from "react";
import { Action, Mode, TransformState } from "./page";
import Control from "@/components/controls/Control";
import { motion } from "motion/react";
import { revealFromBottom } from "@/variants/TextVariants";
import {
  ArrowDownUp,
  ArrowLeft,
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
  //Reset all transform values to initial state
  reset: () => void;
  //Current transform values
  states: Record<keyof TransformState, number>;
  //Dispatch to update the transform values //using the set action
  dispatch: React.Dispatch<Action>;
  //Change the mode to manual
  changeMode: (mode: Mode) => void;
};
const PlaygroundControls = ({ states, dispatch, reset, changeMode }: Props) => {
  const { x, y, z, scale, scaleX, scaleY, rotate, rotateX, rotateY, skewX, skewY, perspective } =
    states;

  //Declarative controls definition =>  easier to read and maintain
  const controls = useMemo<
    Array<{
      label: string;
      key: keyof TransformState;
      value: number;
      min: number;
      max: number;
      step: number;
      Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }>
  >(
    () => [
      {
        label: "X Position",
        key: "x",
        value: x,
        min: -200,
        max: 200,
        step: 1,
        Icon: ArrowRightLeft,
      },
      { label: "Y Position", key: "y", value: y, min: -200, max: 200, step: 1, Icon: ArrowDownUp },
      {
        label: "Z Position",
        key: "z",
        value: z,
        min: -200,
        max: 200,
        step: 1,
        Icon: ArrowUpNarrowWide,
      },
      { label: "Scale", key: "scale", value: scale, min: 0.1, max: 2, step: 0.1, Icon: Search },
      { label: "Scale X", key: "scaleX", value: scaleX, min: 0, max: 2, step: 0.1, Icon: SearchX },
      {
        label: "Scale Y",
        key: "scaleY",
        value: scaleY,
        min: 0,
        max: 2,
        step: 0.1,
        Icon: SearchCheck,
      },
      {
        label: "Rotate",
        key: "rotate",
        value: rotate,
        min: -360,
        max: 360,
        step: 1,
        Icon: RotateCcw,
      },
      {
        label: "Rotate X",
        key: "rotateX",
        value: rotateX,
        min: -360,
        max: 360,
        step: 1,
        Icon: RotateCw,
      },
      {
        label: "Rotate Y",
        key: "rotateY",
        value: rotateY,
        min: -360,
        max: 360,
        step: 1,
        Icon: Rotate3D,
      },
      {
        label: "Skew X",
        key: "skewX",
        value: skewX,
        min: -90,
        max: 90,
        step: 1,
        Icon: FoldVertical,
      },
      {
        label: "Skew Y",
        key: "skewY",
        value: skewY,
        min: -90,
        max: 90,
        step: 1,
        Icon: FoldHorizontal,
      },
      {
        label: "Perspective",
        key: "perspective",
        value: perspective,
        min: 0,
        max: 1000,
        step: 1,
        Icon: Maximize,
      },
    ],
    [x, y, z, scale, scaleX, scaleY, rotate, rotateX, rotateY, skewX, skewY, perspective]
  );
  const handleSwitchToPresets = useCallback(() => changeMode("presets"), [changeMode]);
  const handleReset = useCallback(() => reset(), [reset]);

  return (
    <div className="" aria-labelledby="manual-controls-title">
      <div role="heading" aria-level={3} className="flex w-full items-center justify-between">
        <h3 id="manual-controls-title" className="text-lg font-display">
          <motion.span
            initial="hidden"
            whileHover="hovered"
            className="text-gradient relative cursor-pointer"
            aria-label="Manual Controls"
          >
            Manual Controls
            <motion.span
              variants={revealFromBottom}
              className="text-xs absolute left-1/2 -translate-x-1/2 bg-foreground/80 text-background px-2 py-1 bottom-[70%] rounded-md w-64 text-center pointer-events-none"
              role="tooltip"
            >
              For smoother animations, use the &apos;tween&apos; transition with a linear easing.
            </motion.span>
            <Pointer
              aria-hidden="true"
              className="text-foreground inline-block absolute -top-1 -right-12 -rotate-90 bounce-up"
            />
          </motion.span>
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSwitchToPresets}
            className="text-xs px-3 py-2 font-display bg-secondary text-foreground rounded-md display flex items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            aria-label="Switch to Preset Mode"
          >
            <ArrowLeft className="small-icon mr-2 text-foreground stroke-3" />
            <p>Switch to Preset Mode</p>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform "
            aria-label="Reset all values to initial state"
            title="Reset all values to initial state"
          >
            <RefreshCcw className="w-5 h-5 text-foreground stroke-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
        {controls.map(({ label, key, value, min, max, step, Icon }) => (
          <Control
            key={key}
            label={label}
            value={value}
            dispatch={dispatch}
            dispatchValue={key}
            min={min}
            max={max}
            step={step}
            small
            Icon={Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaygroundControls;
