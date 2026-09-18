import { useCallback, useEffect, useRef, useState } from 'react'
import scene from '../../assets/game-scene-clean.png'
import { BOSSES } from '../../data/gameData'
import type { PlayerState, Position, Projectile, SoundWave } from '../../types/game'
import Boss from './Boss'
import HUD from './HUD'
import PauseMenu from './PauseMenu'
import Player from './Player'
import PlayerController from './PlayerController'
import ResultScreen from './ResultScreen'

type Props = {
    onMenu: () => void
}

export default function GameScene({ onMenu }: Props) {
    const boss = BOSSES.watcher
    const [paused, setPaused] = useState(false)
    const [lives, setLives] = useState(3)
    const [bossHp, setBossHp] = useState(boss.maxHp)
    const [position, setPosition] = useState<Position>({ x: 24, y: 52 })
    const [playerState, setPlayerState] = useState<PlayerState>('idle')
    const [waves, setWaves] = useState<SoundWave[]>([])
    const [projectiles, setProjectiles] = useState<Projectile[]>([])
    const [completed, setCompleted] = useState<string[]>([])
    const [targetIndex, setTargetIndex] = useState(0)
    const [message, setMessage] = useState('')
    const [result, setResult] = useState<'win' | 'dead' | null>(null)

    const id = useRef(0)
    const lastShot = useRef(performance.now())
    const lastFrame = useRef(performance.now())

    const running = !paused && !result && lives > 0 && bossHp > 0

    const toast = useCallback((value: string) => {
        setMessage(value)
        window.setTimeout(() => setMessage(''), 1300)
    }, [])

    const attack = useCallback(() => {
        if (!running) return
        setPlayerState('attack')
        setWaves(current => [...current, {
            id: id.current++,
            x: position.x + 4,
            y: position.y,
        }])
        window.setTimeout(() => setPlayerState(current => current === 'attack' ? 'idle' : current), 220)
    }, [position, running])

    const damagePlayer = useCallback(() => {
        setLives(current => {
            const next = Math.max(0, current - 1)
            if (next === 0) {
                setPlayerState('dead')
                setResult('dead')
            } else {
                setPlayerState('hit')
                window.setTimeout(() => setPlayerState(currentState => currentState === 'hit' ? 'idle' : currentState), 260)
            }
            return next
        })
    }, [])

    // Boss projectiles and wave movement share one animation loop.
    useEffect(() => {
        if (!running) return

        let frame = 0
        const tick = (now: number) => {
            const dt = Math.min(2, (now - lastFrame.current) / 16.67)
            lastFrame.current = now

            if (now - lastShot.current >= boss.projectileInterval) {
                lastShot.current = now
                setProjectiles(current => [...current, {
                    id: id.current++,
                    x: 84,
                    y: 17 + Math.random() * 66,
                }])
            }

            setProjectiles(current => current
                .map(item => ({ ...item, x: item.x - boss.projectileSpeed * dt }))
                .filter(item => item.x > 3)
            )

            setWaves(current => current
                .map(item => ({ ...item, x: item.x + 0.9 * dt }))
                .filter(item => item.x < 100)
            )

            frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [boss, running])

    // Projectile/player collision.
    useEffect(() => {
        if (!running) return
        const hit = projectiles.find(item =>
            Math.abs(item.x - position.x) < 3.5 &&
            Math.abs(item.y - position.y) < 5
        )
        if (!hit) return

        setProjectiles(current => current.filter(item => item.id !== hit.id))
        damagePlayer()
    }, [position, projectiles, running, damagePlayer])

    // Wave/sigil collision and symbol matching.
    useEffect(() => {
        if (!running || waves.length === 0) return

        const hit = waves.find(item =>
            item.x >= 65 &&
            item.x <= 79 &&
            Math.abs(item.y - 50) <= 25
        )
        if (!hit) return

        setWaves(current => current.filter(item => item.id !== hit.id))

        const symbol = boss.symbols[targetIndex]
        const next = [...completed, symbol]
        setCompleted(next)
        toast(`Символ совпал: ${symbol}`)

        const isLastSymbol = targetIndex === boss.symbols.length - 1
        if (isLastSymbol) {
            setCompleted([])
            setTargetIndex(0)
            setBossHp(current => {
                const nextHp = Math.max(0, current - 1)
                if (nextHp === 0) setResult('win')
                return nextHp
            })
            toast('Печать пробита!')
        } else {
            setTargetIndex(current => current + 1)
        }
    }, [boss.symbols, completed, running, targetIndex, toast, waves])

    useEffect(() => {
        const escape = (event: KeyboardEvent) => {
            if (event.code === 'Escape' && !result) setPaused(value => !value)
        }
        window.addEventListener('keydown', escape)
        return () => window.removeEventListener('keydown', escape)
    }, [result])

    function restart() {
        setPaused(false)
        setLives(3)
        setBossHp(boss.maxHp)
        setPosition({ x: 24, y: 52 })
        setPlayerState('idle')
        setWaves([])
        setProjectiles([])
        setCompleted([])
        setTargetIndex(0)
        setResult(null)
        lastShot.current = performance.now()
    }

    return (
        <main className="game-scene">
            <img className="game-scene__bg" src={scene} alt="" />
            <div className="game-scene__shade" />
            <div className="game-scene__vignette" />
            <div className="game-scene__grain" />

            <Boss
                symbols={boss.symbols}
                targetIndex={targetIndex}
                completed={completed}
                waves={waves}
                projectiles={projectiles}
            />

            <Player position={position} state={playerState} />
            <PlayerController
                running={running}
                position={position}
                setPosition={setPosition}
                setState={setPlayerState}
                onAttack={attack}
            />

            <HUD
                lives={lives}
                bossHp={bossHp}
                bossMaxHp={boss.maxHp}
                onPause={() => setPaused(true)}
                onMenu={onMenu}
            />

            <div className="game-hint">W / ↑ — вверх · S / ↓ — вниз · SPACE — звуковой удар · ESC — пауза</div>

            {message && <div className="game-message">{message}</div>}

            {paused && !result && (
                <PauseMenu onContinue={() => setPaused(false)} onMenu={onMenu} />
            )}

            {result && (
                <ResultScreen win={result === 'win'} onRestart={restart} onMenu={onMenu} />
            )}
        </main>
    )
}
