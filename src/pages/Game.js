import { useState, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { useKey } from 'react-use'
import { Scene } from "../components/Scene"
import { useBoulePositions } from "../hooks/useBoulePositions"
import { CameraControls } from '../components/CameraControls'
import { ReadyStatus } from '../components/ReadyStatus'
import { ControlsContainer, Divider } from '../components/styles/GameControls.styled'




export function Game() {
  const cameras = ['main', 'top', 'side', 'player', 'dramatic', 'ground', 'cochonette-ultra', 'cochonette-close', 'cochonette-medium']
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
	setReady(!ready)
  })

  return (
    <>
      <ControlsContainer>
        <CameraControls 
          activeCamera={activeCamera} 
          onCameraSwitch={() => {
            const currentIndex = cameras.indexOf(activeCamera)
            const nextIndex = (currentIndex + 1) % cameras.length
            setActiveCamera(cameras[nextIndex])
          }}
        />
        <Divider />
        <ReadyStatus 
          ready={ready}
          onToggleReady={() => setReady(!ready)}
        />
      </ControlsContainer>
      
      <Canvas camera={false}>
        <Scene 
          activeCamera={activeCamera}
          ready={ready}
          setReady={setReady}
          boules={boules}
          cochonette={cochonette}
        />
      </Canvas>
    </>
  )
}
