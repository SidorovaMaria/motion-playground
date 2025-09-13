import { ControlsExplain } from "@/utils/utils";
import { revealToBottom } from "@/variants/TextVariants";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
type ControlProps = {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
};
const Control = ({ label, value, setValue, min, max, step }: ControlProps) => (
  <div className="flex flex-col gap-2">
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
      step={step}
      value={value}
      onChange={(e) => {
        setValue(Number(e.target.value));
      }}
      className="accent-accent cursor-pointer rounded-md focus:ring-primary  focus:outline-none active:ring-0 active:border-none"
    />
  </div>
);
export default Control;
