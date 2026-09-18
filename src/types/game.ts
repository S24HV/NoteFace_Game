export type Screen = 'menu' | 'levels' | 'settings' | 'game'

export type PlayerState = 'idle' | 'run' | 'attack' | 'hit' | 'dead'

export type Position = {
    x: number
    y: number
}

export type Projectile = {
    id: number
    x: number
    y: number
}

export type SoundWave = {
    id: number
    x: number
    y: number
}
