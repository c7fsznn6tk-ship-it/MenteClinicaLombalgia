import { useEffect } from 'react'
import type React from 'react'
import { AnswerModal } from './components/AnswerModal'
import { ChallengeModal } from './components/ChallengeModal'
import { FinalRanking } from './components/FinalRanking'
import { GameBoard } from './components/GameBoard'
import { ModeratorControls } from './components/ModeratorControls'
import { ScoreBoard } from './components/ScoreBoard'
import { SettingsModal } from './components/SettingsModal'
import { SetupScreen } from './components/SetupScreen'
import { Toast } from './components/Toast'
import { useGameStore } from './store/useGameStore'
import { GAME_TITLE } from './utils/constants'

function App() {
  const {
    status,
    groups,
    settings,
    turnIndex,
    board,
    activeSlotId,
    answerModal,
    challenge,
    finalSummary,
    toast,
    openSettingsModal,
    initializeMatch,
    revealNextHint,
    selectCard,
    advanceTurn,
    registerErrorForCurrentGroup,
    applyManualPenaltyToCurrentGroup,
    openAnswerModal,
    closeAnswerModal,
    confirmCorrectGroup,
    startChallenge,
    cancelChallenge,
    setChallengeParticipants,
    chooseChallengeQuestion,
    chooseChallengeWager,
    resolveChallenge,
    tickChallengeTimer,
    finishMatch,
    restartMatch,
    resetAll,
    exportSnapshot,
    importSnapshot,
    clearToast,
    updateSettings,
    setOpenSettingsModal,
  } = useGameStore()

  const currentGroup = groups[turnIndex]
  const answerCard = board.find((slot) => slot.slotId === answerModal.slotId) ?? null

  useEffect(() => {
    const interval = window.setInterval(() => {
      tickChallengeTimer()
    }, 1000)
    return () => window.clearInterval(interval)
  }, [tickChallengeTimer])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => clearToast(), 2500)
    return () => window.clearTimeout(timeout)
  }, [toast, clearToast])

  function handleCardClick(slotId: number) {
    selectCard(slotId)
    revealNextHint(slotId)
  }

  function handleExportState() {
    const snapshot = exportSnapshot()
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'mente-clinica-estado.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function handleImportState(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (!importSnapshot(parsed)) {
          window.alert('Arquivo inválido para importação.')
        }
      } catch {
        window.alert('Não foi possível importar o arquivo informado.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  if (status === 'setup') {
    return (
      <main className="app-shell">
        <SetupScreen onStart={initializeMatch} />
      </main>
    )
  }

  if (status === 'finished' && finalSummary) {
    return (
      <main className="app-shell">
        <FinalRanking summary={finalSummary} onRestart={restartMatch} onReset={resetAll} />
      </main>
    )
  }

  return (
    <main className="app-shell app-shell-wide">
      <Toast toast={toast} />

      <header className="topbar">
        <div>
          <span className="eyebrow">Jogo educacional</span>
          <h1>{GAME_TITLE}</h1>
        </div>
        <div className="topbar-meta">
          <div className="turn-card">
            <span>Grupo da vez</span>
            <strong>{currentGroup?.nome ?? 'Sem grupo'}</strong>
          </div>
        </div>
      </header>

      <ScoreBoard groups={groups} currentGroupId={currentGroup?.id} />

      <GameBoard
        board={board}
        activeSlotId={activeSlotId}
        onCardClick={handleCardClick}
        onShowAnswer={(slotId) => openAnswerModal(slotId)}
      />

      <ModeratorControls
        onAdvanceTurn={() => advanceTurn()}
        onRegisterError={registerErrorForCurrentGroup}
        onApplyManualPenalty={applyManualPenaltyToCurrentGroup}
        onStartChallenge={startChallenge}
        onFinish={finishMatch}
        onRestart={restartMatch}
        onOpenSettings={() => setOpenSettingsModal(true)}
        onExportState={handleExportState}
        onImportState={handleImportState}
        settings={settings}
      />

      <AnswerModal
        isOpen={answerModal.isOpen}
        activeCard={answerCard}
        groups={groups}
        onClose={closeAnswerModal}
        onConfirm={confirmCorrectGroup}
      />

      <ChallengeModal
        challenge={challenge}
        groups={groups}
        onCancel={cancelChallenge}
        onSetParticipants={setChallengeParticipants}
        onChooseQuestion={chooseChallengeQuestion}
        onChooseWager={chooseChallengeWager}
        onResolve={resolveChallenge}
      />

      <SettingsModal
        isOpen={openSettingsModal}
        settings={settings}
        onClose={() => setOpenSettingsModal(false)}
        onSave={updateSettings}
      />
    </main>
  )
}

export default App
