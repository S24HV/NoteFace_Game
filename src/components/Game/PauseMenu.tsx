type Props = {
    onContinue: () => void
    onMenu: () => void
}

export default function PauseMenu({ onContinue, onMenu }: Props) {
    return (
        <div className="modal">
            <h2>Пауза</h2>
            <button onClick={onContinue}>Продолжить</button>
            <button className="modal__alt" onClick={onMenu}>В главное меню</button>
        </div>
    )
}
