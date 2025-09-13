import {
  ComboAnimation,
  ComboAnimationPresets,
  SimpleAnimation,
  SimpleAnimationPresets,
} from "@/utils/utils";
import { ArrowRight } from "lucide-react";
import React from "react";
/**
 *  UI: Preset Button
 */
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
    // Toggle behavior
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
      type="button"
      className={`font-display capitalize button-outline border-foreground/30! p-2 text-xs tracking-wider ${
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
type PropsPresets = {
  applyPreset: (preset: SimpleAnimation | ComboAnimation) => void;
  resetValues: () => void;
  activePreset: string | null;
  setActivePreset: React.Dispatch<React.SetStateAction<string | null>>;
  changeMode: (mode: "manual" | "presets") => void;
};
const Presets = ({
  applyPreset,
  resetValues,
  activePreset,
  setActivePreset,
  changeMode,
}: PropsPresets) => {
  return (
    <div>
      {/* Simple Animation */}
      <div>
        <div className="flex items-center justify-between">
          <div className="">
            <h3 className="text-lg font-display">Simple Animation Presets</h3>
            <p className="paragraph">Applying only one transformation at a time.</p>
          </div>
          <button
            type="button"
            onClick={() => changeMode("manual")}
            className="text-xs px-3 py-2 font-display bg-secondary text-foreground rounded-md display flex items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <p>Switch to Manual Mode</p>
            <ArrowRight className="small-icon ml-2 text-foreground stroke-3" />
          </button>
        </div>
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
    </div>
  );
};

export default Presets;
