import {
  ComboAnimation,
  ComboAnimationPresets,
  SimpleAnimation,
  SimpleAnimationPresets,
} from "@/utils/utils";
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
};
const Presets = ({ applyPreset, resetValues, activePreset, setActivePreset }: PropsPresets) => {
  return (
    <div>
      {/* Simple Animation */}
      <div>
        <h3 className="text-lg font-display">Simple Animation Presets</h3>
        <p className="paragraph">Applying only one transformation at a time.</p>
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
