import { useEffect, useState } from "react";

import menuBackground from "../../assets/menu-bg.png";

import "./MainMenu.scss";

type MainMenuProps = {
  onNewGame: () => void;
  onContinue: () => void;
  onLoad: () => void;
  onOptions: () => void;
};

export default function MainMenu({
  onNewGame,
  onContinue,
  onLoad,
  onOptions,
}: MainMenuProps) {
  const [selected, setSelected] = useState(0);

  const menuItems = [
    { name: "New Game", action: onNewGame },
    { name: "Continue", action: onContinue },
    { name: "Load", action: onLoad },
    { name: "Options", action: onOptions },
    {
      name: "Exit",
      action: () => window.close(),
    },
  ];

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelected((current) =>
          current >= menuItems.length - 1
            ? 0
            : current + 1
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelected((current) =>
          current <= 0
            ? menuItems.length - 1
            : current - 1
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();

        menuItems[selected].action();
      }
    };

    window.addEventListener(
      "keydown",
      keyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        keyDown
      );
    };
  }, [selected]);

  return (
    <main className="main-menu">
      <img
        src={menuBackground}
        className="main-menu__background"
        alt=""
        draggable={false}
      />

      <section className="main-menu__content">
        <div className="main-menu__logo">
          <span>Note</span>
          <span>face</span>
        </div>

        <nav className="main-menu__items">
          {menuItems.map(
            (item, index) => (
              <button
                key={item.name}
                type="button"
                className={
                  selected === index
                    ? "main-menu__item main-menu__item--active"
                    : "main-menu__item"
                }
                onMouseEnter={() =>
                  setSelected(index)
                }
                onClick={item.action}
              >
                {item.name}
              </button>
            )
          )}
        </nav>
      </section>
    </main>
  );
}