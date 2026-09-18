import gameBackground from "../../assets/game-scene-clean.png";

import "./LevelSelect.scss";

type LevelSelectProps = {
  onBack: () => void;
  onSelect: () => void;
};

export default function LevelSelect({
  onBack,
  onSelect,
}: LevelSelectProps) {
  return (
    <main className="level-select">
      <img
        src={gameBackground}
        className="level-select__background"
        alt=""
        draggable={false}
      />

      <section className="level-select__content">
        <h1>SELECT LEVEL</h1>

        <button onClick={onSelect}>
          CHAPTER 01
        </button>

        <button onClick={onSelect}>
          CHAPTER 02
        </button>

        <button onClick={onSelect}>
          CHAPTER 03
        </button>

        <button
          className="level-select__back"
          onClick={onBack}
        >
          ← BACK
        </button>
      </section>
    </main>
  );
}