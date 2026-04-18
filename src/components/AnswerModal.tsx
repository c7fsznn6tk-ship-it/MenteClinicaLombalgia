import { getCardDetails } from '../store/useGameStore'
import type { CardInPlay, Group } from '../types'

type AnswerModalProps = {
  isOpen: boolean
  activeCard: CardInPlay | null
  groups: Group[]
  onClose: () => void
  onConfirm: (groupId: string) => void
}

export function AnswerModal({ isOpen, activeCard, groups, onClose, onConfirm }: AnswerModalProps) {
  if (!isOpen || !activeCard) return null

  const card = getCardDetails(activeCard.cardId)
  if (!card) return null

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="section-header">
          <h2>Mostrar resposta</h2>
          <span>Carta {activeCard.slotId}</span>
        </div>
        <p className="answer-text">{card.resposta}</p>
        <p className="support-text">Qual grupo acertou?</p>
        <div className="option-list">
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              className="option-button"
              onClick={() => onConfirm(group.id)}
            >
              {group.nome}
            </button>
          ))}
        </div>
        <button type="button" className="ghost-button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
