import { GiCctvCamera } from "react-icons/gi"
import { StatusDisplay, SwitchCameraButton, KeyboardShortcut } from './styles/GameControls.styled'

export function CameraControls({ activeCamera, onCameraSwitch }) {
  return (
    <>
      <StatusDisplay width="200px">
        <GiCctvCamera />
        <span style={{ textTransform: 'capitalize' }}>{activeCamera} camera</span>
      </StatusDisplay>
      <SwitchCameraButton onClick={onCameraSwitch}>
        <span style={{ paddingRight: '2px' }}>Switch camera</span>
        <KeyboardShortcut>c</KeyboardShortcut>
      </SwitchCameraButton>
    </>
  )
}
