import type { Projectile, SoundWave } from '../../types/game'

type Props = {
    symbols: string[]
    targetIndex: number
    completed: string[]
    waves: SoundWave[]
    projectiles: Projectile[]
}

export default function Boss({ symbols, targetIndex, completed, waves, projectiles }: Props) {
    return (
        <>
            <div className="boss-runes">
                {symbols.map((symbol, index) => (
                    <div
                        key={symbol}
                        className={`rune ${index === targetIndex ? 'rune--target' : ''} ${completed.includes(symbol) ? 'rune--done' : ''}`}
                    >
                        {symbol}
                    </div>
                ))}
            </div>

            {waves.map(wave => (
                <div
                    key={wave.id}
                    className="sound-wave"
                    style={{
                        left: `${wave.x}%`,
                        top: `${wave.y}%`,
                        width: `${Math.max(25, Math.min(100, (wave.x - 20) * 2.2))}px`,
                    }}
                />
            ))}

            {projectiles.map(projectile => (
                <div
                    key={projectile.id}
                    className="boss-projectile"
                    style={{ left: `${projectile.x}%`, top: `${projectile.y}%` }}
                />
            ))}
        </>
    )
}
