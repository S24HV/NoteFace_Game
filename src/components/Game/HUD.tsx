type Props = {
    lives: number
    bossHp: number
    bossMaxHp: number
    onPause: () => void
    onMenu: () => void
}

export default function HUD({ lives, bossHp, bossMaxHp, onPause, onMenu }: Props) {
    return (
        <>
            <div className="boss-bar">
                <i style={{ width: `${(bossHp / bossMaxHp) * 100}%` }} />
            </div>

            <div className="hud">
                <div className="hearts">
                    {[0, 1, 2].map(index => (
                        <span key={index} className={index >= lives ? 'heart heart--empty' : 'heart'}>♥</span>
                    ))}
                </div>

                <div className="hud-actions">
                    <button onClick={onPause}>Ⅱ</button>
                    <button onClick={onMenu}>Меню</button>
                </div>
            </div>
        </>
    )
}
