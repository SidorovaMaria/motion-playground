import {
  ComboAnimation,
  ComboAnimationPresets,
  SimpleAnimation,
  SimpleAnimationPresets,
} from "@/utils/utils";
import { ArrowRight } from "lucide-react";
import React, { memo, useCallback } from "react";
import { Mode } from "./page";
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
// UI Functional Component for Animation Preset Button
//So only re-renders when activePreset or preset changes
const AnimationPresetBtn: React.FC<AnimationPresetBtnProps> = memo(
  ({ preset, applyPreset, resetValues, activePreset, setActivePreset }) => {
    const isActive = activePreset === preset.name;
    const Icon = preset.icon;
    // Toggle preset application
    const handleToggle = useCallback(() => {
      if (isActive) {
        resetValues();
        setActivePreset(null);
      } else {
        applyPreset(preset);
        setActivePreset(preset.name);
      }
    }, [isActive, applyPreset, preset, resetValues, setActivePreset]);
    // Handle keyboard interaction for accessibility
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    return (
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-pressed={isActive}
        title={`${preset.name} preset`}
        className={`
          font-display capitalize button-outline p-2 text-xs tracking-wider transition
          border border-foreground/30 rounded-lg
          hover:scale-[1.02] active:scale-95
          ${
            isActive
              ? "bg-gradient-to-r from-primary to-accent text-background outline-none"
              : "bg-transparent text-foreground"
          }
        `}
      >
        {Icon && (
          <Icon className={`small-icon inline-flex mr-2 ${isActive ? "text-background" : ""}`} />
        )}
        {preset.name}
      </button>
    );
  }
);
AnimationPresetBtn.displayName = "AnimationPresetBtn";

type PropsPresets = {
  applyPreset: (preset: SimpleAnimation | ComboAnimation) => void;
  resetValues: () => void;
  activePreset: string | null;
  setActivePreset: React.Dispatch<React.SetStateAction<string | null>>;
  changeMode: (mode: Mode) => void;
};
const Presets = ({
  applyPreset,
  resetValues,
  activePreset,
  setActivePreset,
  changeMode,
}: PropsPresets) => {
  const switchToManual = useCallback(() => changeMode("manual"), [changeMode]);
  return (
    <div>
      {/* Simple Animation */}
      <section aria-labelledby="simple-animation-title">
        <div className="flex items-center justify-between">
          <div className="">
            <h3 id="simple-animation-title" className="text-lg font-display">
              Simple Animation Presets
            </h3>
            <p className="paragraph">Applying only one transformation at a time.</p>
          </div>
          <button
            type="button"
            onClick={switchToManual}
            className="text-xs px-3 py-2 font-display bg-secondary text-foreground rounded-md display flex items-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            aria-label="Switch to Manual Mode"
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
      </section>
      {/* Combo Animation */}
      <section aria-labelledby="combo-animation-title" className="mt-8">
        <h3 id="combo-animation-title" className="text-lg font-display">
          Combo Animation Presets
        </h3>
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
      </section>
    </div>
  );
};

export default Presets;
