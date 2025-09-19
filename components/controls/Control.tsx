import { INITIAL_STATE, TransformState } from "@/app/animate-transition/playground/page";
import { ControlsExplain } from "@/utils/utils";
import { revealToBottom } from "@/variants/TextVariants";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
type ControlProps = {
  label: string;
  value: number;
  dispatchValue?: keyof TransformState;
  setValue?: (v: number) => void;
  dispatch?: React.Dispatch<{ type: "set"; key: keyof TransformState; value: number }>;
  min: number;
  max: number;
  step: number;
  small?: boolean;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const Control = ({
  label,
  value,
  setValue,
  min,
  max,
  step,
  dispatch,
  dispatchValue,
  small = false,
  Icon,
}: ControlProps) => (
  <div className="flex flex-col gap-2">
    <div className={`flex items-center gap-2 w-full`}>
      {Icon && <Icon className="text-secondary stroke-3 icon" />}
      <label
        className={`text-sm text-foreground font-display tracking-wide ${
          small ? "text-xs text-center" : ""
        }`}
      >
        {label}
      </label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          if (setValue) {
            setValue(Number(e.target.value));
          }
          if (dispatch && dispatchValue) {
            dispatch({
              type: "set",
              key: dispatchValue,
              value: Number(e.target.value),
            });
          }
        }}
        className={`rounded-md border border-primary/20 bg-background-muted px-1 py-1.5 text-sm text-center no-spinner font-display
                ${small ? "px-0! text-xs! border-none" : ""}
                $`}
        style={{
          color: dispatchValue
            ? value !== INITIAL_STATE[dispatchValue]
              ? "var(--color-accent)"
              : "inherit"
            : "inherit",
        }}
      />

      <motion.div
        initial="hidden"
        whileHover="hovered"
        whileFocus="hovered"
        className={`text-secondary/80 hover:text-secondary cursor-pointer transition relative  flex items-center justify-center ${
          small ? "small-icon ml-auto mr-2" : "icon"
        }`}
        title="Info"
      >
        <Info className="" />
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            variants={revealToBottom}
            className="text-xs leading-relaxed font-sans absolute top-full left-1/2 -translate-x-1/2 bg-background text-foreground p-2 rounded-md w-64 text-center pointer-events-none"
          >
            {ControlsExplain[label as keyof typeof ControlsExplain]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>

    <input
      type="range"
      min={min}
      max={max}
      tabIndex={-1}
      step={step}
      value={value}
      onChange={(e) => {
        if (setValue) {
          setValue(Number(e.target.value));
        }
        if (dispatch && dispatchValue) {
          dispatch({
            type: "set",
            key: dispatchValue,
            value: Number(e.target.value),
          });
        }
      }}
      className="w-full h-3 mt-1 bg-background-muted border border-primary/20 rounded-lg appearance-none cursor-pointer range-slider focus:ring-0 focus:outline-none active:bg-background-muted accent-primary"
    />
  </div>
);
export default Control;
