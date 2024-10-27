import { useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { useKey } from 'react-use'
import { Scene } from "../components/Scene"
import { useBoulePositions } from "../hooks/useBoulePositions"
import { FaCameraRetro } from 'react-icons/fa';
import { GiCctvCamera } from "react-icons/gi";
import styled from 'styled-components'




export function Game() {
  const cameras = ['main', 'top', 'side', 'player', 'dramatic', 'ground']
  const [activeCamera, setActiveCamera] = useState(cameras[0])
  const [ready, setReady] = useState(false)
  
  const { boules, cochonette } = useMemo(() => useBoulePositions({ amount: 5 }), [])

  useKey('c', () => {
    setActiveCamera(prev => {
      const currentIndex = cameras.indexOf(prev)
      const nextIndex = (currentIndex + 1) % cameras.length
      return cameras[nextIndex]
    })
  })

  useKey('r', () => {
    setReady(true)
  })

  const SwitchCameraButton = styled.button`
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

  const StatusButton = styled(SwitchCameraButton)`
  background: ${props => props.isReady ? '#98FB98' : '#FFB6C1'};
  
  &:hover {
    background: ${props => props.isReady ? '#90EE90' : '#FFA0B4'};
  }
`

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 1000,
        padding: '10px 10px',
        background: 'white',
        borderRadius: '4px',
        border: 'solid black 1px',
      }}>
        <div style={{
          padding: '8px 12px',
          minWidth: '200px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <GiCctvCamera />
          <span style={{ textTransform: 'capitalize' }}>{activeCamera} camera</span>
        </div>
        <SwitchCameraButton 
          onClick={() => {
            const currentIndex = cameras.indexOf(activeCamera)
            const nextIndex = (currentIndex + 1) % cameras.length
            setActiveCamera(cameras[nextIndex])
          }}
        >
          <span style={{
            paddingRight: '2px'
          }}>Switch camera</span> 
          <kbd style={{
            padding: '2px 6px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            background: '#f7f7f7',
            boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
            fontSize: '0.9em',
            fontFamily: 'monospace'
          }}>c</kbd>
        </SwitchCameraButton>
        <div style={{
          borderLeft: '1px solid #ccc',
          height: '24px',
          margin: '0 8px',
        }} />
        <div style={{
          padding: '8px 12px',
          minWidth: '150px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <GiCctvCamera />
          <span>Status: {ready ? 'Ready' : 'Not Ready'}</span>
        </div>
        <StatusButton 
          isReady={ready}
          onClick={() => setReady(!ready)}
        >
          <span style={{
            paddingRight: '2px'
          }}>Toggle ready</span> 
          <kbd style={{
            padding: '2px 6px',
            borderRadius: '3px',
            border: '1px solid #ccc',
            background: '#f7f7f7',
            boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
            fontSize: '0.9em',
            fontFamily: 'monospace'
          }}>r</kbd>
        </StatusButton>
      </div>
      
      <Canvas camera={false}>
        <Scene 
          activeCamera={activeCamera}
          ready={ready}
          boules={boules}
          cochonette={cochonette}
        />
      </Canvas>
    </>
  )
}
