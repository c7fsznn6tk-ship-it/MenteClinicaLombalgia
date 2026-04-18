import type { Group } from '../types'

type ScoreBoardProps = {
  groups: Group[]
  currentGroupId?: string
}

export function ScoreBoard({ groups, currentGroupId }: ScoreBoardProps) {
  return (
    <section className="panel scoreboard">
      <div className="section-header">
        <h2>Placar</h2>
        <span>{groups.length} grupos</span>
      </div>

      <div className="scoreboard-grid">
        {groups.map((group) => (
          <article
            key={group.id}
            className={`score-card ${currentGroupId === group.id ? 'is-current' : ''}`}
          >
            <h3>{group.nome}</h3>
            <strong>{group.pontuacao} pts</strong>
            <div className="score-meta">
              <span>Acertos: {group.acertos}</span>
              <span>Desafios: {group.desafiosUsados}/2</span>
              <span>Altos: {group.acertosAltos}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
