export type LevelDefinition = {
    id: number
    title: string
    boss: string
    bossId: string
    unlocked: boolean
}

export type BossDefinition = {
    id: string
    name: string
    maxHp: number
    symbols: string[]
    projectileInterval: number
    projectileSpeed: number
}

export const LEVELS: LevelDefinition[] = [
    { id: 1, title: 'RED RESONANCE', boss: 'THE WATCHER', bossId: 'watcher', unlocked: true },
    { id: 2, title: '???', boss: '???', bossId: '', unlocked: false },
    { id: 3, title: '???', boss: '???', bossId: '', unlocked: false },
    { id: 4, title: '???', boss: '???', bossId: '', unlocked: false },
]

export const BOSSES: Record<string, BossDefinition> = {
    watcher: {
        id: 'watcher',
        name: 'THE WATCHER',
        maxHp: 8,
        symbols: ['◇', '✦', '☍', '△', '◈', '✧'],
        projectileInterval: 850,
        projectileSpeed: 0.34,
    },
}
