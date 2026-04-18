import type { MatchSettings } from '../types'

type SettingsModalProps = {
  isOpen: boolean
  settings: MatchSettings
  onClose: () => void
  onSave: (settings: Partial<MatchSettings>) => void
}

export function SettingsModal({ isOpen, settings, onClose, onSave }: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="section-header">
          <h2>Configurações da partida</h2>
        </div>

        <div className="two-columns">
          <label className="field">
            <span>Tempo por turno</span>
            <select
              value={settings.tempoTurno}
              onChange={(event) =>
                onSave({
                  tempoTurno: Number(event.target.value) as MatchSettings['tempoTurno'],
                })
              }
            >
              {[15, 30, 45, 60].map((value) => (
                <option key={value} value={value}>
                  {value} segundos
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Penalidade por erro</span>
            <select
              value={settings.modoPenalidadeErro}
              onChange={(event) =>
                onSave({
                  modoPenalidadeErro: event.target.value as MatchSettings['modoPenalidadeErro'],
                })
              }
            >
              <option value="manual">Manual</option>
              <option value="automatico">Automática</option>
            </select>
          </label>

          <label className="field">
            <span>Seleção do desafio</span>
            <select
              value={settings.tempoDesafioSelecao}
              onChange={(event) =>
                onSave({
                  tempoDesafioSelecao: Number(event.target.value),
                })
              }
            >
              {[15, 20, 30, 45].map((value) => (
                <option key={value} value={value}>
                  {value} segundos
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Resposta do desafio</span>
            <select
              value={settings.tempoDesafioResposta}
              onChange={(event) =>
                onSave({
                  tempoDesafioResposta: Number(event.target.value),
                })
              }
            >
              {[20, 30, 45, 60].map((value) => (
                <option key={value} value={value}>
                  {value} segundos
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="switch-list">
          <label className="switch-card">
            <input
              type="checkbox"
              checked={settings.bonus.primeiraDica}
              onChange={(event) =>
                onSave({
                  bonus: {
                    ...settings.bonus,
                    primeiraDica: event.target.checked,
                  },
                })
              }
            />
            <span>Bônus de primeira dica</span>
          </label>

          <label className="switch-card">
            <input
              type="checkbox"
              checked={settings.bonus.sequencia}
              onChange={(event) =>
                onSave({
                  bonus: {
                    ...settings.bonus,
                    sequencia: event.target.checked,
                  },
                })
              }
            />
            <span>Bônus de sequência</span>
          </label>
        </div>

        <button type="button" className="ghost-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  )
}
