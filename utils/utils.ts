import {
  ArrowRight,
  ArrowUp,
  CornerUpRight,
  Expand,
  GalleryHorizontal,
  Layers2,
  Maximize2,
  RotateCcw,
  RotateCwSquare,
  Shell,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { desc } from "motion/react-client";

export const SimpleAnimationPresets = [
  {
    name: "Slide Right",
    x: 100,
    icon: ArrowRight,
  },
  {
    name: "Slide Up",
    y: -100,
    icon: ArrowUp,
  },
  {
    name: "Scale Up",
    scale: 1.5,
    icon: ZoomIn,
  },
  {
    name: "Rotate",
    rotate: 90,
    icon: RotateCcw,
  },
  {
    name: "SkewX",
    skewX: 34,
    icon: Layers2,
  },
  {
    name: "ZoomOut",
    scale: 0.7,
    perspective: 500,
    icon: ZoomOut,
  },
];
type SimpleAnimation = (typeof SimpleAnimationPresets)[number];
export type { SimpleAnimation };
export const ComboAnimationPresets = [
  {
    name: "Flip Card",
    rotateY: 180,
    perspective: 800,
    icon: GalleryHorizontal,
  },
  {
    name: "Helicopter Spin",
    rotateZ: 720,
    scale: 1.2,
    icon: Shell,
  },
  {
    name: "Stretch X",
    scaleX: 0,
    scaleY: 2,
    icon: Maximize2,
  },
  {
    name: "Spiral Out",
    rotateZ: 1080,
    scale: 0.3,
    x: 200,
    y: -200,
    icon: RotateCwSquare,
  },
  {
    name: "Diagonal Dash",
    x: 200,
    y: -200,
    rotate: 45,
    icon: CornerUpRight,
  },
  {
    name: "Zoom & Flip",
    scale: 2,
    rotateY: 360,
    perspective: 600,
    icon: Expand,
  },
];
type ComboAnimation = (typeof ComboAnimationPresets)[number];
export type { ComboAnimation };
export const AnimationFunctions = [
  "linear",
  "easeIn",
  "easeOut",
  "easeInOut",
  "circIn",
  "circOut",
  "circInOut",
  "backIn",
  "backOut",
  "backInOut",
  "anticipate",
] as const;
export type AnimationFunction = (typeof AnimationFunctions)[number];

export const ControlsExplain = {
  Stiffness:
    "Controls the stiffness of the spring. Higher value make the spring stiffer, and create more sudden movements.",
  Damping:
    "Controls the strength of the opposing force. Higher value make the spring stop sooner, reducing oscillation. Zero will result in infinite oscillation.",
  Mass: "Controls the mass of the object. Higher value make the object heavier, and create slower movements.",
  "Tween Duration": "Controls how long the animation should take to complete, in seconds.",
};
