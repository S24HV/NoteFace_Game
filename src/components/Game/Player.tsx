import type { PlayerState, Position } from '../../types/game'

type Props = {
    position: Position
    state: PlayerState
}

export default function Player({ position, state }: Props) {
    return (
        <div
            className={`player player--${state}`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            aria-hidden="true"
        >
            <div className="player__hair" />
            <div className="player__head">
                <div className="player__mask">
                    <i className="player__eye player__eye--a" />
                    <i className="player__eye player__eye--b" />
                </div>
            </div>
            <div className="player__body" />
            <div className="player__arm player__arm--a" />
            <div className="player__arm player__arm--b" />
            <div className="player__leg player__leg--a" />
            <div className="player__leg player__leg--b" />
            <div className="player__guitar" />
        </div>
    )
}
