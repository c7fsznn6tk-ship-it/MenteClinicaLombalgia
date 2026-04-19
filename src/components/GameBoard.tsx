import type { CardInPlay } from '../types'
import { CardTile } from './CardTile'

type GameBoardProps = {
  board: CardInPlay[]
  activeSlotId: number | null
  currentGroupName?: string | null
  onCardClick: (slotId: number) => void
  onShowAnswer: (slotId: number) => void
  onExpandCard: (slotId: number) => void
}

export function GameBoard({
  board,
  activeSlotId,
  currentGroupName,
  onCardClick,
  onShowAnswer,
  onExpandCard,
}: GameBoardProps) {
  return (
    <section className="panel board-panel">
      <div className="section-header">
        <h2>Cartas em jogo</h2>
        <div className="board-status">
          <span className="board-current-group">
            {currentGroupName ? `Grupo jogando: ${currentGroupName}` : 'Aguardando primeira dica'}
          </span>
          <span>{board.length} posições</span>
        </div>
      </div>

      <div className="board-grid">
        {board.map((slot) => (
          <CardTile
            key={`${slot.slotId}-${slot.cardId}`}
            slot={slot}
            isActive={activeSlotId === slot.slotId}
            onClick={() => onCardClick(slot.slotId)}
            onShowAnswer={() => onShowAnswer(slot.slotId)}
            onExpand={() => onExpandCard(slot.slotId)}
          />
        ))}
      </div>
    </section>
  )
}
