import { useState } from "react";

import MainMenu from "./components/MainMenu/MainMenu";
import LevelSelect from "./components/LevelSelect/LevelSelect";
import Settings from "./components/Settings/Settings";
import GameScene from "./components/Game/GameScene";

type Screen =
  | "menu"
  | "levels"
  | "settings"
  | "game";

export default function App() {
  const [screen, setScreen] =
    useState<Screen>("menu");

  const startGame = () => {
    setScreen("game");
  };

  const openLevels = () => {
    setScreen("levels");
  };

  const openSettings = () => {
    setScreen("settings");
  };

  const backToMenu = () => {
    setScreen("menu");
  };

  if (screen === "game") {
    return (
      <GameScene
        onMenu={backToMenu}
      />
    );
  }

  if (screen === "levels") {
    return (
      <LevelSelect
        onBack={backToMenu}
        onSelect={startGame}
      />
    );
  }

  if (screen === "settings") {
    return (
      <Settings
        onBack={backToMenu}
      />
    );
  }

  return (
    <MainMenu
      onNewGame={startGame}
      onContinue={startGame}
      onLoad={openLevels}
      onOptions={openSettings}
    />
  );
}