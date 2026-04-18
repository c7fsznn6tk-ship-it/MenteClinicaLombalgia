import type { CardInPlay } from '../types'
import { CardTile } from './CardTile'

type GameBoardProps = {
  board: CardInPlay[]
  activeSlotId: number | null
  onCardClick: (slotId: number) => void
  onShowAnswer: (slotId: number) => void
}

export function GameBoard({ board, activeSlotId, onCardClick, onShowAnswer }: GameBoardProps) {
  return (
    <section className="panel board-panel">
      <div className="section-header">
        <h2>Cartas em jogo</h2>
        <span>{board.length} posições</span>
      </div>

      <div className="board-grid">
        {board.map((slot) => (
          <CardTile
            key={`${slot.slotId}-${slot.cardId}`}
            slot={slot}
            isActive={activeSlotId === slot.slotId}
            onClick={() => onCardClick(slot.slotId)}
            onShowAnswer={() => onShowAnswer(slot.slotId)}
          />
        ))}
      </div>
    </section>
  )
}
