type Props = {
    win: boolean
    onRestart: () => void
    onMenu: () => void
}

export default function ResultScreen({ win, onRestart, onMenu }: Props) {
    return (
        <div className="modal">
            <h2>{win ? 'Печать разрушена' : 'Тишина...'}</h2>
            <p>{win
                ? 'Глаз затихает. Первый уровень завершён.'
                : 'Гитара падает на пол. Коридор снова становится тёмным.'}</p>
            <button onClick={onRestart}>{win ? 'Сыграть снова' : 'Повторить бой'}</button>
            <button className="modal__alt" onClick={onMenu}>В главное меню</button>
        </div>
    )
}
