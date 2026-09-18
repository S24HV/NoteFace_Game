import { useState } from "react";

import gameBackground from "../../assets/game-scene-clean.png";

import "./Settings.scss";

type SettingsProps = {
  onBack: () => void;
};

export default function Settings({
  onBack,
}: SettingsProps) {
  const [music, setMusic] =
    useState(70);

  const [sound, setSound] =
    useState(80);

  const [cameraShake, setCameraShake] =
    useState(true);

  return (
    <main className="settings">
      <img
        src={gameBackground}
        className="settings__background"
        alt=""
      />

      <div className="settings__dark" />

      <section className="settings__panel">
        <h1>
          OPTIONS
        </h1>

        <div className="settings__list">
          <div className="settings__option">
            <div className="settings__header">
              <span>
                MUSIC
              </span>

              <span>
                {music}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={music}
              onChange={(event) =>
                setMusic(
                  Number(
                    event.target.value
                  )
                )
              }
            />
          </div>

          <div className="settings__option">
            <div className="settings__header">
              <span>
                SOUND
              </span>

              <span>
                {sound}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sound}
              onChange={(event) =>
                setSound(
                  Number(
                    event.target.value
                  )
                )
              }
            />
          </div>

          <button
            type="button"
            className="settings__toggle"
            onClick={() =>
              setCameraShake(
                (current) =>
                  !current
              )
            }
          >
            <span>
              CAMERA SHAKE
            </span>

            <span
              className={
                cameraShake
                  ? "settings__toggle-value settings__toggle-value--active"
                  : "settings__toggle-value"
              }
            >
              {cameraShake
                ? "ON"
                : "OFF"}
            </span>
          </button>
        </div>

        <button
          type="button"
          className="settings__back"
          onClick={onBack}
        >
          ← BACK
        </button>
      </section>
    </main>
  );
}