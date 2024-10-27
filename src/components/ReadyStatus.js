import { GiCctvCamera } from "react-icons/gi"
import { StatusDisplay, StatusButton, KeyboardShortcut } from './styles/GameControls.styled'

export function ReadyStatus({ ready, onToggleReady }) {
  return (
    <>
      <StatusDisplay>
        <GiCctvCamera />
        <span>Status: {ready ? 'Ready' : 'Not Ready'}</span>
      </StatusDisplay>
      <StatusButton isReady={ready} onClick={onToggleReady}>
        <span style={{ paddingRight: '2px' }}>Toggle ready</span>
        <KeyboardShortcut>r</KeyboardShortcut>
      </StatusButton>
    </>
  )
}
