import { GiCctvCamera } from "react-icons/gi"
import { 
  StatusDisplay, 
  StatusButton, 
  KeyboardShortcut 
} from './styles/GameControls.styled'

export function ReadyStatus({ ready, onToggleReady }) {
  return (
    <>
      <StatusDisplay width="200px">
        <GiCctvCamera />
        <span>Status: {ready ? 'Ready' : 'Not Ready'}</span>
      </StatusDisplay>
      <StatusButton 
        isReady={ready} 
        onClick={onToggleReady}
      >
        <span>Toggle ready</span>
        <KeyboardShortcut>r</KeyboardShortcut>
      </StatusButton>
    </>
  )
}
