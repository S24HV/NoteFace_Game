import { useCallback, useEffect, useRef } from 'react'
import type { PlayerState, Position } from '../../types/game'

type Props = {
    running: boolean
    position: Position
    setPosition: React.Dispatch<React.SetStateAction<Position>>
    setState: React.Dispatch<React.SetStateAction<PlayerState>>
    onAttack: () => void
}

export default function PlayerController({ running, position, setPosition, setState, onAttack }: Props) {
    const keys = useRef<Record<string, boolean>>({})
    const current = useRef(position)

    useEffect(() => { current.current = position }, [position])

    const move = useCallback(() => {
        let direction = 0
        if (keys.current.ArrowUp || keys.current.KeyW) direction -= 1
        if (keys.current.ArrowDown || keys.current.KeyS) direction += 1

        if (running && direction !== 0) {
            current.current = {
                x: current.current.x,
                y: Math.max(13, Math.min(87, current.current.y + direction * 0.78)),
            }
            setPosition(current.current)
            setState(value => value === 'attack' || value === 'hit' ? value : 'run')
        } else if (running) {
            setState(value => value === 'run' ? 'idle' : value)
        }
    }, [running, setPosition, setState])

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            keys.current[event.code] = true
            if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS', 'Space'].includes(event.code)) event.preventDefault()
            if (event.code === 'Space' && running) onAttack()
        }
        const up = (event: KeyboardEvent) => { keys.current[event.code] = false }

        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)

        let frame = 0
        const tick = () => {
            move()
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
        }
    }, [move, onAttack, running])

    return null
}
