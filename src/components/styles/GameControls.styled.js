import styled from 'styled-components'

export const ControlsContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: solid black 1px;
`

export const StatusDisplay = styled.div`
  padding: 8px 12px;
  min-width: ${props => props.width || '150px'};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Divider = styled.div`
  border-left: 1px solid #ccc;
  height: 24px;
  margin: 0 8px;
`

export const SwitchCameraButton = styled.button`
  padding: 8px 12px;
  background: pink;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #ff9999;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`

export const StatusButton = styled(SwitchCameraButton)`
  background: ${props => props.isReady ? '#98FB98' : '#FFB6C1'};
  
  &:hover {
    background: ${props => props.isReady ? '#90EE90' : '#FFA0B4'};
  }
`

export const KeyboardShortcut = styled.kbd`
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid #ccc;
  background: #f7f7f7;
  box-shadow: 0 1px 0 rgba(0,0,0,0.2);
  font-size: 0.9em;
  font-family: monospace;
`
