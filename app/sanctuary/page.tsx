"use client";

import { useState, useEffect } from "react";
import { useAudioMixer } from "@/hooks/useAudioMixer";
import { Preset } from "@/types";
import { ContributeModal } from "./components/ContributeModal";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { SanctuaryHeader } from "./components/SanctuaryHeader";
import { PresetList } from "./components/PresetList";
import { SoundGrid } from "./components/SoundGrid";
import { ControlBar } from "./components/ControlBar";

const page = () => {
  const {
    activeSounds,
    masterVolume,
    setMasterVolume,
    isGlobalPlaying,
    toggleGlobal,
    toggleSound,
    updateSoundVolume,
    setPreset,
    stopAll,
  } = useAudioMixer();

  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [isControlsExpanded, setIsControlsExpanded] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tranquil-user-presets");
    if (saved) setUserPresets(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tranquil-user-presets", JSON.stringify(userPresets));
  }, [userPresets]);

  const saveCurrentAsPreset = () => {
    if (activeSounds.length === 0) return;
    const name = prompt(
      "Enter preset name:",
      `My Sanctuary ${userPresets.length + 1}`,
    );
    if (name) {
      const newPreset: Preset = {
        id: Date.now().toString(),
        name,
        description: "Organic blend",
        sounds: [...activeSounds],
      };
      setUserPresets([...userPresets, newPreset]);
    }
  };

  const deletePreset = (id: string) => {
    setUserPresets((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    if (activeSounds.length === 0) {
      setActivePresetId(null);
      if (isGlobalPlaying) {
        toggleGlobal();
      }
    }
  }, [activeSounds, isGlobalPlaying, toggleGlobal]);

  const handleSetPreset = (preset: Preset) => {
    if (activePresetId === preset.id) {
       stopAll();
       return;
    }
    setPreset(preset.sounds);
    setActivePresetId(preset.id);
  };

  return (
    <div className="min-h-screen animate-fade-in pb-40 md:pb-56 selection:bg-moss-500/30">
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
      />

      <BackgroundEffects activeCount={activeSounds.length} />

      <SanctuaryHeader
        onContributeClick={() => setIsContributeOpen(true)}
        onTimerComplete={stopAll}
        onTimerFade={(p) => setMasterVolume(p * masterVolume)}
        isGlobalPlaying={isGlobalPlaying}
      />

      <main className="pt-28 md:pt-44 max-w-350 mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 relative z-10">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <PresetList
            activePresetId={activePresetId}
            userPresets={userPresets}
            activeSounds={activeSounds}
            onSetPreset={handleSetPreset}
            onSavePreset={saveCurrentAsPreset}
            onDeletePreset={deletePreset}
          />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-9">
          <SoundGrid
            activeSounds={activeSounds}
            isGlobalPlaying={isGlobalPlaying}
            onToggleSound={toggleSound}
            onUpdateVolume={updateSoundVolume}
            onSetActivePresetId={setActivePresetId}
            onToggleGlobal={toggleGlobal}
          />
        </div>
      </main>

      <ControlBar
        isExpanded={isControlsExpanded}
        onToggleExpand={() => setIsControlsExpanded(!isControlsExpanded)}
        isGlobalPlaying={isGlobalPlaying}
        onToggleGlobal={toggleGlobal}
        activeSounds={activeSounds}
        masterVolume={masterVolume}
        onSetMasterVolume={setMasterVolume}
      />
    </div>
  );
};

export default page;
